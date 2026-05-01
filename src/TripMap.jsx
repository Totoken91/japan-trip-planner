// Map zoomée sur Honshu central (Tokyo → Fuji → Nagano → Kanazawa → Kyoto)
import { useEffect, useRef, useState } from 'react';
import { geoMercator, geoPath } from 'd3-geo';
import { feature as topoFeature } from 'topojson-client';

const TRIP_TOPO_URLS = [
  'https://cdn.jsdelivr.net/gh/dataofjapan/land/japan.topojson',
  'https://raw.githubusercontent.com/dataofjapan/land/master/japan.topojson',
];

// Préfectures à mettre en avant (id japan.topojson)
// 13=Tokyo, 19=Yamanashi (Fuji), 20=Nagano, 17=Ishikawa (Kanazawa), 26=Kyoto
const TRIP_HIGHLIGHT = new Set([13, 19, 20, 17, 26]);
// Okinawa exclu pour ne pas tirer le cadrage trop au sud (en mode Honshu)
const SKIP_PREF = new Set([47]);
// Pour le mode Okinawa : ne garder QUE la pref 47 (île principale d'Okinawa).
// Yaeyama (Ishigaki) et Miyako ne sont pas dans ce topojson — leurs pins
// flotteront sur le fond, ce qui suffit visuellement.
const OKINAWA_PREF = new Set([47]);

const TMAP_W = 1000, TMAP_H = 900;

export function TripMap({ projects, cities, itinerary, onPickCity, hoveredCity, setHoveredCity, animations, mapFocus = 'honshu' }) {
  const [paths, setPaths] = useState(null);
  const [pinPos, setPinPos] = useState({});
  const [route, setRoute] = useState(null);
  const [err, setErr] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  // Refs for high-frequency updates (avoid React re-renders during gesture)
  const wrapperRef = useRef(null);
  const svgRef = useRef(null);
  const mapGRef = useRef(null);    // <g> contenant pays/route/sakura — couche stable
  const pinsGRef = useRef(null);   // <g> contenant uniquement les pins — couche secondaire
  const pinRefs = useRef(new Map()); // cid -> SVG <g>
  const footerRef = useRef(null);  // <text> du zoom × N (mise à jour DOM directe)
  const liveRef = useRef({ pan: { x: 0, y: 0 }, zoom: 1 });
  const pinPosRef = useRef({});
  const hoveredRef = useRef(null);
  const rafRef = useRef(0);

  // RAF-throttled DOM mutation : pan/zoom sur les 2 <g> frères + contre-scale
  // par pin. Le map layer ne mute jamais ses enfants → composite GPU pur.
  // Les pins forment une mini-couche séparée (6 éléments).
  const applyAll = () => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0;
      const { pan: p, zoom: z } = liveRef.current;
      const transform = `translate(${TMAP_W / 2 + p.x} ${TMAP_H / 2 + p.y}) scale(${z}) translate(${-TMAP_W / 2} ${-TMAP_H / 2})`;
      if (mapGRef.current) mapGRef.current.setAttribute('transform', transform);
      if (pinsGRef.current) pinsGRef.current.setAttribute('transform', transform);
      const inv = 1 / z;
      pinRefs.current.forEach((el, cid) => {
        if (!el) return;
        const pos = pinPosRef.current[cid]; if (!pos) return;
        const isHover = hoveredRef.current === cid;
        const s = (isHover ? 1.25 : 1) * inv;
        el.setAttribute('transform', `translate(${pos[0]} ${pos[1]}) scale(${s})`);
      });
      if (footerRef.current) {
        footerRef.current.textContent = `27 mai → 17 juin 2026 · 6 étapes · zoom×${z.toFixed(1)}`;
      }
    });
  };

  // Garde les refs en phase avec l'état React et redessine
  useEffect(() => { pinPosRef.current = pinPos; applyAll(); }, [pinPos]);
  useEffect(() => { hoveredRef.current = hoveredCity; applyAll(); }, [hoveredCity]);
  useEffect(() => { liveRef.current = { pan, zoom }; applyAll(); }, [pan, zoom]);

  // Bind pointer + wheel ONCE — toutes les mutations passent par liveRef + applyAll
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const pointers = new Map();
    let dragStart = null;
    let pinch = null;
    let wheelTimer = 0;

    const onWheel = (e) => {
      e.preventDefault();
      const delta = -e.deltaY * 0.0015;
      const newZoom = Math.max(0.6, Math.min(5, liveRef.current.zoom * (1 + delta)));
      liveRef.current = { ...liveRef.current, zoom: newZoom };
      // Active le mode "interaction" : strokes/highlights/ombres masqués via CSS,
      // SMIL pausé. Tout revient 220ms après la dernière rafale.
      el.classList.add('zooming');
      try { svgRef.current?.pauseAnimations?.(); } catch {}
      applyAll();
      clearTimeout(wheelTimer);
      wheelTimer = setTimeout(() => {
        el.classList.remove('zooming');
        try { svgRef.current?.unpauseAnimations?.(); } catch {}
      }, 220);
    };

    let isDragging = false;  // n'active la classe + pause SMIL qu'après mouvement réel
    const enterDragMode = () => {
      if (isDragging) return;
      isDragging = true;
      el.classList.add('dragging');
      // Geler les animations SMIL (halos pulsants + route shimmer) pour libérer le compositor
      try { svgRef.current?.pauseAnimations?.(); } catch {}
    };
    const exitDragMode = () => {
      if (!isDragging) return;
      isDragging = false;
      el.classList.remove('dragging');
      try { svgRef.current?.unpauseAnimations?.(); } catch {}
    };

    const onPointerDown = (e) => {
      if (e.target.closest('button, [data-no-pan]')) return;
      el.setPointerCapture(e.pointerId);
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pointers.size === 1) {
        dragStart = { x: e.clientX, y: e.clientY, panX: liveRef.current.pan.x, panY: liveRef.current.pan.y };
        pinch = null;
      } else if (pointers.size === 2) {
        const [a, b] = [...pointers.values()];
        pinch = { dist: Math.hypot(a.x - b.x, a.y - b.y), startZoom: liveRef.current.zoom };
        dragStart = null;
        enterDragMode(); // pinch = drag immédiat
      }
    };
    const onPointerMove = (e) => {
      if (!pointers.has(e.pointerId)) return;
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pointers.size === 2 && pinch) {
        const [a, b] = [...pointers.values()];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        const ratio = d / pinch.dist;
        liveRef.current = { ...liveRef.current, zoom: Math.max(0.6, Math.min(5, pinch.startZoom * ratio)) };
        applyAll();
      } else if (pointers.size === 1 && dragStart) {
        const dx = e.clientX - dragStart.x;
        const dy = e.clientY - dragStart.y;
        // Seuil 5 px : sans ça, simple click déclenche drag → casse le clic sur pin
        if (!isDragging && Math.hypot(dx, dy) < 5) return;
        enterDragMode();
        liveRef.current = { ...liveRef.current, pan: { x: dragStart.panX + dx, y: dragStart.panY + dy } };
        applyAll();
      }
    };
    const onPointerUp = (e) => {
      pointers.delete(e.pointerId);
      if (pointers.size < 2) pinch = null;
      if (pointers.size === 0) {
        dragStart = null;
        exitDragMode();
        // Commit final live → React (pour footer "zoom×N" + persistance)
        setZoom(liveRef.current.zoom);
        setPan(liveRef.current.pan);
      }
      if (pointers.size === 1) {
        const [p] = [...pointers.values()];
        dragStart = { x: p.x, y: p.y, panX: liveRef.current.pan.x, panY: liveRef.current.pan.y };
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('pointerdown', onPointerDown);
    el.addEventListener('pointermove', onPointerMove);
    el.addEventListener('pointerup', onPointerUp);
    el.addEventListener('pointercancel', onPointerUp);

    return () => {
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('pointerdown', onPointerDown);
      el.removeEventListener('pointermove', onPointerMove);
      el.removeEventListener('pointerup', onPointerUp);
      el.removeEventListener('pointercancel', onPointerUp);
      clearTimeout(wheelTimer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const resetView = () => { setZoom(1); setPan({ x: 0, y: 0 }); };

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        let topo;
        for (const url of TRIP_TOPO_URLS) {
          try { topo = await fetch(url).then(r => r.ok ? r.json() : Promise.reject()); break; } catch {}
        }
        if (!topo) throw new Error('topo fetch failed');
        if (cancelled) return;

        const featCol = topoFeature(topo, topo.objects.japan);
        const isOkinawa = mapFocus === 'okinawa';
        // Sélection des préfectures à dessiner selon le voyage
        const all = featCol.features.filter(f => {
          const id = f.properties?.id ?? f.id;
          return isOkinawa ? OKINAWA_PREF.has(id) : !SKIP_PREF.has(id);
        });
        // Cadrage : Honshu → sur l'ensemble des features ; Okinawa → sur les
        // points des villes (l'archipel Yaeyama/Miyako n'a pas de shape, on
        // veut juste que les pins rentrent dans le viewport).
        const fitTarget = isOkinawa
          ? {
              type: 'FeatureCollection',
              features: Object.values(cities).map(c => ({
                type: 'Feature',
                geometry: { type: 'Point', coordinates: [c.coords[1], c.coords[0]] },
              })),
            }
          : { type: 'FeatureCollection', features: all };
        const proj = geoMercator().fitExtent(
          [[60, 60], [TMAP_W - 60, TMAP_H - 60]],
          fitTarget
        );
        const path = geoPath(proj);
        const allPaths = all.map(f => {
          const id = f.properties?.id ?? f.id;
          const tier = TRIP_HIGHLIGHT.has(id) ? 'hl' : 'ctx';
          return {
            id, d: path(f), tier,
            name: f.properties?.nam_ja || f.properties?.nam || '',
          };
        }).filter(p => p.d);

        // Pins
        const pp = {};
        Object.entries(cities).forEach(([cid, c]) => {
          const [lat, lng] = c.coords;
          pp[cid] = proj([lng, lat]) || [0, 0];
        });

        // Route polyline (suit l'ordre de l'itinéraire)
        const routePts = itinerary.map(it => pp[it.city]).filter(Boolean);

        if (!cancelled) {
          setPaths(allPaths);
          setPinPos(pp);
          setRoute(routePts);
        }
      } catch (e) {
        if (!cancelled) setErr(e.message);
      }
    })();
    return () => { cancelled = true; };
  }, [cities, itinerary, mapFocus]);

  // Compte les projets par ville
  const byCity = {};
  projects.forEach(p => { (byCity[p.city] = byCity[p.city] || []).push(p); });

  return (
    <div ref={wrapperRef}
         className="trip-map-wrapper"
         style={{
           position: 'relative', width: '100%',
           aspectRatio: `${TMAP_W} / ${TMAP_H}`,
           maxHeight: 'min(80vh, 820px)',
           maxWidth: 'calc(min(80vh, 820px) * 1000 / 900)',
           margin: '0 auto',
           touchAction: 'none',
           userSelect: 'none', WebkitUserSelect: 'none',
         }}>
      {/* Zoom controls */}
      <div data-no-pan style={{ position: 'absolute', top: 10, right: 10, zIndex: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <button className="btn sm" onClick={() => setZoom(Math.min(5, liveRef.current.zoom * 1.3))} style={{ padding: '4px 10px', fontSize: 18, lineHeight: 1 }}>+</button>
        <button className="btn sm" onClick={() => setZoom(Math.max(0.6, liveRef.current.zoom / 1.3))} style={{ padding: '4px 10px', fontSize: 18, lineHeight: 1 }}>−</button>
        <button className="btn sm yellow" onClick={resetView} style={{ padding: '4px 8px', fontSize: 11 }}>↺</button>
      </div>
      <div style={{ position: 'absolute', bottom: 10, right: 10, zIndex: 10 }} className="font-mono">
        <span className="sticker">pinch / scroll = zoom · drag = bouger</span>
      </div>
      <svg ref={svgRef} viewBox={`0 0 ${TMAP_W} ${TMAP_H}`} preserveAspectRatio="xMidYMid meet"
           style={{ width: '100%', height: '100%', display: 'block', cursor: 'grab' }}>
        <defs>
          <pattern id="tdots" width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.2" fill="rgba(0,0,0,.18)" />
          </pattern>
          <pattern id="twave" width="60" height="14" patternUnits="userSpaceOnUse">
            <path d="M0 7 Q 15 0 30 7 T 60 7" fill="none" stroke="rgba(34,211,238,.4)" strokeWidth="1.5" />
          </pattern>
          <clipPath id="trip-clip">
            <rect x="-50" y="-50" width={TMAP_W + 100} height={TMAP_H + 100} />
          </clipPath>
        </defs>

        <rect width={TMAP_W} height={TMAP_H} fill="url(#tdots)" opacity="0.5" />
        <rect width={TMAP_W} height={TMAP_H} fill="url(#twave)" opacity="0.35" />
        {/* Couche pays/route/sakura — stable, willChange:transform composite GPU */}
        <g ref={mapGRef}
           style={{ willChange: 'transform' }}
           transform={`translate(${TMAP_W / 2 + pan.x} ${TMAP_H / 2 + pan.y}) scale(${zoom}) translate(${-TMAP_W / 2} ${-TMAP_H / 2})`}>
          <g clipPath="url(#trip-clip)">

            {!paths && !err && (
              <text x={TMAP_W/2} y={TMAP_H/2} textAnchor="middle" fontFamily="'DotGothic16', monospace" fontSize="18" fill="#111">// loading map...</text>
            )}
            {err && (
              <text x={TMAP_W/2} y={TMAP_H/2} textAnchor="middle" fontFamily="'DotGothic16', monospace" fontSize="14" fill="#ff3ea5">// {err}</text>
            )}

            {/* Country shadow — 1 seul opacity blend pour les 47 paths */}
            {paths && (
              <g className="map-shadow" opacity="0.14" transform="translate(4 5)">
                {paths.map((p, i) => (
                  <path key={'sh-' + i} d={p.d} fill="#111" />
                ))}
              </g>
            )}
            {/* Country fills with tier — préfectures du voyage en jaune saturé,
                les autres en cream. Pas d'outline pointillé : il créait des
                blobs roses moches sur les petites îles (Izu) et des bordures
                hachées sur les grosses préfectures. */}
            {paths && (
              <g className="map-fills">
                {paths.map((p, i) => {
                  const fill = p.tier === 'hl' ? '#fcd34d' : '#fff5d9';
                  return <path key={'p-' + i} d={p.d} fill={fill} stroke="#111" strokeWidth={0.6} strokeLinejoin="round" />;
                })}
              </g>
            )}

            {/* Route polyline */}
            {route && route.length > 1 && (
              <g className="map-route" style={{ pointerEvents: 'none' }}>
                <polyline
                  points={route.map(([x, y]) => `${x},${y}`).join(' ')}
                  fill="none" stroke="#111" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"
                />
                <polyline
                  points={route.map(([x, y]) => `${x},${y}`).join(' ')}
                  fill="none" stroke="#ff3ea5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                  strokeDasharray="10 6"
                >
                  {animations && <animate attributeName="stroke-dashoffset" from="0" to="-32" dur="1.2s" repeatCount="indefinite" />}
                </polyline>
              </g>
            )}

          </g>
        </g>

        {/* Couche pins — séparée pour que les mutations de contre-scale (zoom)
            n'invalident pas la couche pays */}
        <g ref={pinsGRef}
           style={{ willChange: 'transform' }}
           transform={`translate(${TMAP_W / 2 + pan.x} ${TMAP_H / 2 + pan.y}) scale(${zoom}) translate(${-TMAP_W / 2} ${-TMAP_H / 2})`}>
          <g clipPath="url(#trip-clip)">
            {paths && Object.entries(cities).map(([cid, c]) => {
              const pos = pinPos[cid];
              if (!pos) return null;
              const [px, py] = pos;
              const isHover = hoveredCity === cid;
              const count = (byCity[cid] || []).length;
              const main = c.color;
              const seg = c.segment;
              const inv = 1 / zoom;
              const finalScale = (isHover ? 1.25 : 1) * inv;
              return (
                <g key={cid}
                   ref={(el) => {
                     if (el) pinRefs.current.set(cid, el);
                     else pinRefs.current.delete(cid);
                   }}
                   className="trip-pin"
                   transform={`translate(${px} ${py}) scale(${finalScale})`}
                   style={{ cursor: 'pointer', transition: 'transform .2s', willChange: 'transform' }}
                   onMouseEnter={() => setHoveredCity(cid)} onMouseLeave={() => setHoveredCity(null)}
                   onClick={() => onPickCity(cid)}>
                  {animations && <circle r="22" fill={main} opacity="0.3">
                    <animate attributeName="r" values="18;32;18" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite" />
                  </circle>}
                  <ellipse cx="3" cy="28" rx="12" ry="2.5" fill="rgba(0,0,0,.3)" />
                  <path d="M0 -24 C14 -24 19 -12 19 -2 C19 12 7 22 0 30 C-7 22 -19 12 -19 -2 C-19 -12 -14 -24 0 -24Z"
                        fill={main} stroke="#111" strokeWidth="3" />
                  <rect x="-10" y="-19" width="5" height="2.5" fill="rgba(255,255,255,.9)" rx="1" />
                  <circle r="11" fill="#fff200" stroke="#111" strokeWidth="2.2" />
                  <text textAnchor="middle" y="4" fontFamily="'Bagel Fat One', system-ui" fontSize="13" fill="#111">{seg}</text>
                  <g transform="translate(0 46)">
                    <rect x="-46" y="-12" width="92" height="22" fill="#fff" stroke="#111" strokeWidth="2.2" rx="5" />
                    <text textAnchor="middle" y="3" fontFamily="'Zen Maru Gothic', system-ui" fontSize="13" fontWeight="900" fill="#111">{c.name}</text>
                  </g>
                  <g transform="translate(22 -22)">
                    <circle r="11" fill="#111" stroke="#fff200" strokeWidth="2" />
                    <text textAnchor="middle" y="3.5" fontFamily="'Bagel Fat One', system-ui" fontSize="11" fill="#fff200">{count}</text>
                  </g>
                  {isHover && (
                    <g transform="translate(0 78)">
                      <rect x="-70" y="-12" width="140" height="24" fill="#111" rx="5" />
                      <text textAnchor="middle" y="4" fontFamily="'DotGothic16', monospace" fontSize="11" fill="#fff200">▶ {count} projets · {c.suggestedDays}</text>
                    </g>
                  )}
                </g>
              );
            })}
          </g>
        </g>

        {/* Title stickers — fixes, hors zoom, en surcouche pour ne pas être masqués par le pays */}
        <g transform="translate(30 760) rotate(-5)" style={{ pointerEvents: 'none' }}>
          <rect x="-8" y="-26" width="240" height="50" fill="#fff200" stroke="#111" strokeWidth="3" rx="4" />
          <text x="112" y="8" fontFamily="'Bagel Fat One', system-ui" fontSize="26" textAnchor="middle" fill="#111">OUR TRIP MAP</text>
        </g>
        <g transform="translate(40 810) rotate(2)" style={{ pointerEvents: 'none' }}>
          <rect x="-4" y="-15" width="210" height="28" fill="#ff3ea5" stroke="#111" strokeWidth="3" rx="4" />
          <text x="101" y="6" fontFamily="'Zen Maru Gothic', system-ui" fontSize="17" fontWeight="900" textAnchor="middle" fill="#fff">日本旅行ルート</text>
        </g>

        {/* Compass — fixe, hors zoom */}
        <g transform="translate(60 95)" style={{ pointerEvents: 'none' }}>
          <circle r="22" fill="#fff" stroke="#111" strokeWidth="2.5" />
          <path d="M0 -16 L4 0 L0 16 L-4 0Z" fill="#ff3ea5" stroke="#111" strokeWidth="1.5" />
          <text textAnchor="middle" y="-26" fontFamily="'DotGothic16', monospace" fontSize="11" fill="#111">N</text>
        </g>

        {/* Footer — texte mis à jour en live via footerRef pendant le wheel zoom */}
        <g transform={`translate(${TMAP_W / 2} ${TMAP_H - 12})`} style={{ pointerEvents: 'none' }}>
          <text ref={footerRef} textAnchor="middle" fontFamily="'DotGothic16', monospace" fontSize="9" fill="#111" opacity="0.4">
            27 mai → 17 juin 2026 · 6 étapes · zoom×{zoom.toFixed(1)}
          </text>
        </g>
      </svg>
    </div>
  );
}
