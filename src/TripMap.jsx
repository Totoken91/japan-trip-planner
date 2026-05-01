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
// Préfectures voisines pour le contexte visuel — resserré sur Honshu central
const TRIP_CONTEXT = new Set([8, 9, 10, 11, 12, 14, 15, 16, 18, 21, 22, 23, 24, 25, 27, 28]);
// Préfectures utilisées UNIQUEMENT pour le cadrage (fitExtent) — resserre la vue
const TRIP_FRAME = new Set([13, 19, 20, 17, 26, 15, 16, 18, 21, 22, 23, 24, 25, 9, 10, 11, 12, 14, 8]);

const TMAP_W = 1000, TMAP_H = 600;

export function TripMap({ projects, cities, itinerary, onPickCity, hoveredCity, setHoveredCity, animations }) {
  const [paths, setPaths] = useState(null);
  const [pinPos, setPinPos] = useState({});
  const [route, setRoute] = useState(null);
  const [err, setErr] = useState(null);
  const [t, setT] = useState(0);
  // Zoom & pan
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragRef = useRef(null);
  const svgRef = useRef(null);

  const onWheel = (e) => {
    e.preventDefault();
    const delta = -e.deltaY * 0.0015;
    setZoom(z => Math.max(0.6, Math.min(5, z * (1 + delta))));
  };
  const onMouseDown = (e) => {
    dragRef.current = { x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y };
  };
  const onMouseMove = (e) => {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.x;
    const dy = e.clientY - dragRef.current.y;
    setPan({ x: dragRef.current.panX + dx, y: dragRef.current.panY + dy });
  };
  const onMouseUp = () => { dragRef.current = null; };
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
        const all = featCol.features;
        // Cadrage sur Honshu central uniquement
        const frame = all.filter(f => {
          const id = f.properties?.id ?? f.id;
          return TRIP_FRAME.has(id);
        });
        const proj = geoMercator().fitExtent(
          [[30, 50], [TMAP_W - 30, TMAP_H - 50]],
          { type: 'FeatureCollection', features: frame }
        );
        const path = geoPath(proj);
        // Render TOUTES les préfectures pour garder le contour du Japon, mais distinguer 3 tiers
        const allPaths = all.map(f => {
          const id = f.properties?.id ?? f.id;
          const tier = TRIP_HIGHLIGHT.has(id) ? 'hl' : (TRIP_CONTEXT.has(id) ? 'ctx' : 'far');
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
  }, [cities, itinerary]);

  useEffect(() => {
    if (!animations) return;
    let id, start = performance.now();
    const tick = () => { setT((performance.now() - start) / 1000); id = requestAnimationFrame(tick); };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [animations]);

  // Compte les projets par ville
  const byCity = {};
  projects.forEach(p => { (byCity[p.city] = byCity[p.city] || []).push(p); });

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}
         onWheel={onWheel}
         onMouseDown={onMouseDown}
         onMouseMove={onMouseMove}
         onMouseUp={onMouseUp}
         onMouseLeave={onMouseUp}>
      {/* Zoom controls */}
      <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <button className="btn sm" onClick={() => setZoom(z => Math.min(5, z * 1.3))} style={{ padding: '4px 10px', fontSize: 18, lineHeight: 1 }}>+</button>
        <button className="btn sm" onClick={() => setZoom(z => Math.max(0.6, z / 1.3))} style={{ padding: '4px 10px', fontSize: 18, lineHeight: 1 }}>−</button>
        <button className="btn sm yellow" onClick={resetView} style={{ padding: '4px 8px', fontSize: 11 }}>↺</button>
      </div>
      <div style={{ position: 'absolute', bottom: 10, right: 10, zIndex: 10 }} className="font-mono">
        <span className="sticker">scroll = zoom · drag = bouger</span>
      </div>
      <svg ref={svgRef} viewBox={`0 0 ${TMAP_W} ${TMAP_H}`} preserveAspectRatio="xMidYMid meet"
           style={{ width: '100%', height: '100%', display: 'block', cursor: dragRef.current ? 'grabbing' : 'grab' }}>
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
        <g transform={`translate(${TMAP_W / 2 + pan.x} ${TMAP_H / 2 + pan.y}) scale(${zoom}) translate(${-TMAP_W / 2} ${-TMAP_H / 2})`}>
          <g clipPath="url(#trip-clip)">

            {/* Sakura petals deco */}
            {Array.from({ length: 18 }).map((_, i) => {
              const x = (i * 73 + 30) % (TMAP_W - 20);
              const y = (i * 101 + 40) % (TMAP_H - 20);
              const rot = (i * 37) + (animations ? t * 8 : 0);
              return <g key={i} transform={`translate(${x} ${y}) rotate(${rot})`} opacity="0.35" style={{ pointerEvents: 'none' }}>
                <path d="M0 -4 C2 -4 4 -2 4 0 C4 2 2 4 0 4 C-2 4 -4 2 -4 0 C-4 -2 -2 -4 0 -4Z" fill="#ff8fb8" />
              </g>;
            })}

            {/* Title sticker */}
            <g transform="translate(70 60) rotate(-5)" style={{ pointerEvents: 'none' }}>
              <rect x="-8" y="-26" width="280" height="56" fill="#fff200" stroke="#111" strokeWidth="3" rx="4" />
              <text x="132" y="10" fontFamily="'Bagel Fat One', system-ui" fontSize="30" textAnchor="middle" fill="#111">OUR TRIP MAP</text>
            </g>
            <g transform="translate(80 110) rotate(2)" style={{ pointerEvents: 'none' }}>
              <rect x="-4" y="-16" width="240" height="32" fill="#ff3ea5" stroke="#111" strokeWidth="3" rx="4" />
              <text x="116" y="8" fontFamily="'Zen Maru Gothic', system-ui" fontSize="20" fontWeight="900" textAnchor="middle" fill="#fff">日本旅行ルート</text>
            </g>

            {!paths && !err && (
              <text x="500" y="350" textAnchor="middle" fontFamily="'DotGothic16', monospace" fontSize="18" fill="#111">// loading map...</text>
            )}
            {err && (
              <text x="500" y="350" textAnchor="middle" fontFamily="'DotGothic16', monospace" fontSize="14" fill="#ff3ea5">// {err}</text>
            )}

            {/* Country shadow */}
            {paths && paths.map((p, i) => (
              <path key={'sh-' + i} d={p.d} fill="#111" opacity="0.14" transform="translate(4 5)" />
            ))}
            {/* Country fills with tier */}
            {paths && paths.map((p, i) => {
              const fill = p.tier === 'hl' ? '#ffe9b3' : p.tier === 'ctx' ? '#fff5d9' : '#f5efde';
              const stroke = p.tier === 'far' ? '#9c8' : '#111';
              const sw = p.tier === 'far' ? 0.6 : 1.4;
              return <path key={'p-' + i} d={p.d} fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />;
            })}

            {/* Highlight outline on trip prefectures */}
            {paths && paths.filter(p => p.tier === 'hl').map((p, i) => (
              <path key={'hl-' + i} d={p.d} fill="none" stroke="#ff3ea5" strokeWidth="2.5" strokeDasharray="6 4" strokeLinejoin="round" opacity="0.85" />
            ))}

            {/* Route polyline */}
            {route && route.length > 1 && (
              <g style={{ pointerEvents: 'none' }}>
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

            {/* Pins */}
            {paths && Object.entries(cities).map(([cid, c]) => {
              const pos = pinPos[cid];
              if (!pos) return null;
              const [px, py] = pos;
              const isHover = hoveredCity === cid;
              const count = (byCity[cid] || []).length;
              const main = c.color;
              const seg = c.segment;
              const pulse = animations ? (1 + Math.sin(t * 3 + px * 0.01) * 0.06) : 1;
              // Counter-scale so pins stay visually constant size regardless of zoom
              const inv = 1 / zoom;
              const finalScale = (isHover ? 1.25 : pulse) * inv;
              return (
                <g key={cid} transform={`translate(${px} ${py}) scale(${finalScale})`}
                   style={{ cursor: 'pointer', transition: 'transform .2s' }}
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
        {/* Compass — fixe, hors zoom */}
        <g transform="translate(60 95)" style={{ pointerEvents: 'none' }}>
          <circle r="22" fill="#fff" stroke="#111" strokeWidth="2.5" />
          <path d="M0 -16 L4 0 L0 16 L-4 0Z" fill="#ff3ea5" stroke="#111" strokeWidth="1.5" />
          <text textAnchor="middle" y="-26" fontFamily="'DotGothic16', monospace" fontSize="11" fill="#111">N</text>
        </g>

        {/* Footer */}
        <g transform={`translate(${TMAP_W / 2} ${TMAP_H - 12})`} style={{ pointerEvents: 'none' }}>
          <text textAnchor="middle" fontFamily="'DotGothic16', monospace" fontSize="9" fill="#111" opacity="0.4">
            27 mai → 17 juin 2026 · 6 étapes · zoom×{zoom.toFixed(1)}
          </text>
        </g>
      </svg>
    </div>
  );
}
