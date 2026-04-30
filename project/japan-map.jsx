// Carte du Japon DETAILLÉE — utilise d3-geo + topojson-client depuis CDN
// pour fiabilité maximale.

const TOPO_URLS = [
  'https://cdn.jsdelivr.net/gh/dataofjapan/land/japan.topojson',
  'https://raw.githubusercontent.com/dataofjapan/land/master/japan.topojson',
];

const PREF_REGION = {
  1:'hokkaido',
  2:'tohoku',3:'tohoku',4:'tohoku',5:'tohoku',6:'tohoku',7:'tohoku',
  8:'kanto',9:'kanto',10:'kanto',11:'kanto',12:'kanto',13:'kanto',14:'kanto',
  15:'chubu',16:'chubu',17:'chubu',18:'chubu',19:'chubu',20:'chubu',21:'chubu',22:'chubu',23:'chubu',
  24:'kansai',25:'kansai',26:'kansai',27:'kansai',28:'kansai',29:'kansai',30:'kansai',
  31:'chugoku',32:'chugoku',33:'chugoku',34:'chugoku',35:'chugoku',
  36:'shikoku',37:'shikoku',38:'shikoku',39:'shikoku',
  40:'kyushu',41:'kyushu',42:'kyushu',43:'kyushu',44:'kyushu',45:'kyushu',46:'kyushu',
  47:'okinawa',
};

const REGION_TINT = {
  hokkaido: '#fff5d9', tohoku: '#ffe9b3', kanto: '#ffd9a3',
  chubu: '#ffe9b3', kansai: '#ffd9a3', chugoku: '#ffe9b3',
  shikoku: '#fff5d9', kyushu: '#ffd9a3', okinawa: '#fff5d9',
};

const CITY_COORDS = {
  tokyo: [35.68, 139.76], osaka: [34.69, 135.50], kyoto: [35.01, 135.77],
  nagoya: [35.18, 136.91], yokohama: [35.44, 139.64], fukuoka: [33.59, 130.40],
  sapporo: [43.06, 141.35], sendai: [38.27, 140.87], hiroshima: [34.39, 132.46],
  okinawa: [26.21, 127.68], kobe: [34.69, 135.20], niigata: [37.90, 139.02],
};

const VIEWBOX_W = 1000, VIEWBOX_H = 1100;

// Load d3-geo + topojson-client dynamically once
let _libsPromise = null;
function loadLibs() {
  if (_libsPromise) return _libsPromise;
  _libsPromise = new Promise((resolve, reject) => {
    const load = (src) => new Promise((res, rej) => {
      const s = document.createElement('script'); s.src = src;
      s.onload = res; s.onerror = () => rej(new Error('failed '+src));
      document.head.appendChild(s);
    });
    Promise.all([
      load('https://unpkg.com/d3-array@3'),
      load('https://unpkg.com/d3-geo@3'),
      load('https://unpkg.com/topojson-client@3'),
    ]).then(resolve, reject);
  });
  return _libsPromise;
}

function JapanMap({ events, groups, venues, cities, onPick, hoveredCity, setHoveredCity, animations }) {
  const [paths, setPaths] = React.useState(null); // {main:[{d, id}], inset:[...]}
  const [pinPositions, setPinPositions] = React.useState({});
  const [err, setErr] = React.useState(null);
  const [t, setT] = React.useState(0);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        await loadLibs();
        let topo;
        for (const url of TOPO_URLS) {
          try { topo = await fetch(url).then(r => r.ok ? r.json() : Promise.reject()); break; }
          catch {}
        }
        if (!topo) throw new Error('topo fetch failed');
        if (cancelled) return;

        const featCol = window.topojson.feature(topo, topo.objects.japan);
        const allFeatures = featCol.features;
        const mainFeats = allFeatures.filter(f => (f.properties?.id ?? f.id) !== 47);
        const okFeats = allFeatures.filter(f => (f.properties?.id ?? f.id) === 47);

        // Main projection — fit mainland to most of viewbox
        const mainW = VIEWBOX_W, mainH = VIEWBOX_H - 60;
        const projMain = window.d3.geoMercator().fitExtent(
          [[60, 60], [mainW - 60, mainH - 60]],
          { type:'FeatureCollection', features: mainFeats }
        );
        const pathMain = window.d3.geoPath(projMain);

        // Inset projection — Okinawa in bottom-left rect
        const insetW = 220, insetH = 160;
        const insetX = 40, insetY = VIEWBOX_H - insetH - 40;
        const projInset = window.d3.geoMercator().fitExtent(
          [[insetX + 12, insetY + 12], [insetX + insetW - 12, insetY + insetH - 12]],
          { type:'FeatureCollection', features: okFeats.length ? okFeats : mainFeats }
        );
        const pathInset = window.d3.geoPath(projInset);

        const mainPaths = mainFeats.map(f => ({
          d: pathMain(f),
          id: f.properties?.id ?? f.id,
          name: f.properties?.nam_ja || f.properties?.nam || '',
        })).filter(p => p.d);
        const insetPaths = okFeats.map(f => ({
          d: pathInset(f),
          id: f.properties?.id ?? f.id,
        })).filter(p => p.d);

        // Compute pin positions
        const pp = {};
        Object.entries(CITY_COORDS).forEach(([cid, [lat, lng]]) => {
          if (cid === 'okinawa') {
            const [x,y] = projInset([lng, lat]) || [0,0];
            pp[cid] = [x, y];
          } else {
            const [x,y] = projMain([lng, lat]) || [0,0];
            pp[cid] = [x, y];
          }
        });

        if (!cancelled) {
          setPaths({ main: mainPaths, inset: insetPaths, insetRect: {x:insetX, y:insetY, w:insetW, h:insetH} });
          setPinPositions(pp);
        }
      } catch (e) {
        if (!cancelled) setErr(e.message);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  React.useEffect(() => {
    if (!animations) return;
    let id, start = performance.now();
    const tick = () => { setT((performance.now() - start) / 1000); id = requestAnimationFrame(tick); };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [animations]);

  const byCity = {};
  events.forEach(ev => {
    const v = venues[ev.venue]; if (!v) return;
    (byCity[v.city] = byCity[v.city] || []).push(ev);
  });

  return (
    <div style={{position:'relative', width:'100%', height:'100%'}}>
      <svg viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`} preserveAspectRatio="xMidYMid meet"
           style={{width:'100%', height:'100%', display:'block'}}>
        <defs>
          <pattern id="dots" width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.2" fill="rgba(0,0,0,.22)"/>
          </pattern>
          <pattern id="wave" width="60" height="14" patternUnits="userSpaceOnUse">
            <path d="M0 7 Q 15 0 30 7 T 60 7" fill="none" stroke="rgba(34,211,238,.45)" strokeWidth="1.5"/>
          </pattern>
        </defs>

        <rect width={VIEWBOX_W} height={VIEWBOX_H} fill="url(#dots)" opacity="0.55"/>
        <rect width={VIEWBOX_W} height={VIEWBOX_H} fill="url(#wave)" opacity="0.4"/>

        {Array.from({length: 26}).map((_, i) => {
          const x = (i*53 + 30) % (VIEWBOX_W-20);
          const y = (i*97 + 40) % (VIEWBOX_H-20);
          const rot = (i*37) + (animations ? t*10 : 0);
          return <g key={i} transform={`translate(${x} ${y}) rotate(${rot})`} opacity="0.4" style={{pointerEvents:'none'}}>
            <path d="M0 -4 C2 -4 4 -2 4 0 C4 2 2 4 0 4 C-2 4 -4 2 -4 0 C-4 -2 -2 -4 0 -4Z" fill="#ff8fb8"/>
          </g>;
        })}

        <g transform="translate(70 75) rotate(-6)" style={{pointerEvents:'none'}}>
          <rect x="-8" y="-28" width="240" height="60" fill="#fff200" stroke="#111" strokeWidth="3" rx="4"/>
          <text x="112" y="10" fontFamily="'Bagel Fat One', system-ui" fontSize="34" textAnchor="middle" fill="#111">JAPAN MAP</text>
        </g>
        <g transform="translate(90 135) rotate(2)" style={{pointerEvents:'none'}}>
          <rect x="-4" y="-18" width="200" height="36" fill="#ff3ea5" stroke="#111" strokeWidth="3" rx="4"/>
          <text x="96" y="8" fontFamily="'Zen Maru Gothic', system-ui" fontSize="22" fontWeight="900" textAnchor="middle" fill="#fff">アイドル全国MAP</text>
        </g>

        {!paths && !err && (
          <g style={{pointerEvents:'none'}}>
            <text x="500" y="540" textAnchor="middle" fontFamily="'DotGothic16', monospace" fontSize="20" fill="#111">// loading map data...</text>
            <text x="500" y="570" textAnchor="middle" fontFamily="'Zen Maru Gothic', system-ui" fontSize="16" fill="#888">読込中...</text>
          </g>
        )}
        {err && (
          <g style={{pointerEvents:'none'}}>
            <text x="500" y="540" textAnchor="middle" fontFamily="'DotGothic16', monospace" fontSize="14" fill="#ff3ea5">// map data unavailable: {err}</text>
          </g>
        )}

        {paths && paths.main.map((p, i) => (
          <path key={'sh-'+i} d={p.d} fill="#111" opacity="0.16" transform="translate(4 6)"/>
        ))}
        {paths && paths.main.map((p, i) => {
          const region = PREF_REGION[p.id] || 'tohoku';
          const fill = REGION_TINT[region] || '#fff5d9';
          return <path key={'p-'+i} d={p.d} fill={fill} stroke="#111" strokeWidth="1.4" strokeLinejoin="round"/>;
        })}

        {paths && (
          <g transform={`translate(${paths.insetRect.x-6} ${paths.insetRect.y-6})`} style={{pointerEvents:'none'}}>
            <rect width={paths.insetRect.w+12} height={paths.insetRect.h+12} fill="#fff" stroke="#111" strokeWidth="2.5" rx="6" strokeDasharray="4 4"/>
            <text x="10" y="-6" fontFamily="'DotGothic16', monospace" fontSize="11" fill="#111">沖縄 / OKINAWA</text>
          </g>
        )}
        {paths && paths.inset.map((p, i) => (
          <g key={'ok-'+i}>
            <path d={p.d} fill="#111" opacity="0.16" transform="translate(2 3)"/>
            <path d={p.d} fill="#fff5d9" stroke="#111" strokeWidth="1.4" strokeLinejoin="round"/>
          </g>
        ))}

        {paths && Object.entries(cities).map(([cid, c]) => {
          const evs = byCity[cid] || [];
          if (!evs.length) return null;
          const pos = pinPositions[cid];
          if (!pos) return null;
          const [px, py] = pos;
          const isHover = hoveredCity === cid;
          const count = evs.length;
          const groupIds = [...new Set(evs.map(e => e.group))];
          const colors = groupIds.map(g => groups.find(x => x.id === g)?.color).filter(Boolean);
          const main = colors[0] || '#ff3ea5';
          const pulse = animations ? (1 + Math.sin(t*3 + px*0.01) * 0.06) : 1;
          return (
            <g key={cid} transform={`translate(${px} ${py}) scale(${isHover ? 1.25 : pulse})`}
               style={{cursor:'pointer', transition:'transform .2s'}}
               onMouseEnter={() => setHoveredCity(cid)} onMouseLeave={() => setHoveredCity(null)}
               onClick={() => onPick(cid)}>
              {animations && <circle r="22" fill={main} opacity="0.3">
                <animate attributeName="r" values="18;32;18" dur="2s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite"/>
              </circle>}
              <ellipse cx="3" cy="28" rx="12" ry="2.5" fill="rgba(0,0,0,.3)"/>
              <path d="M0 -24 C14 -24 19 -12 19 -2 C19 12 7 22 0 30 C-7 22 -19 12 -19 -2 C-19 -12 -14 -24 0 -24Z"
                    fill={main} stroke="#111" strokeWidth="3"/>
              <rect x="-10" y="-19" width="5" height="2.5" fill="rgba(255,255,255,.9)" rx="1"/>
              <circle r="9.5" fill="#fff200" stroke="#111" strokeWidth="2.2"/>
              <text textAnchor="middle" y="3.5" fontFamily="'Bagel Fat One', system-ui" fontSize="12" fill="#111">{count}</text>
              {colors[1] && <circle cx="15" cy="-15" r="5" fill={colors[1]} stroke="#111" strokeWidth="2"/>}
              {colors[2] && <circle cx="-15" cy="-15" r="4.5" fill={colors[2]} stroke="#111" strokeWidth="2"/>}
              <g transform="translate(0 46)">
                <rect x="-36" y="-11" width="72" height="20" fill="#fff" stroke="#111" strokeWidth="2" rx="4"/>
                <text textAnchor="middle" y="3" fontFamily="'Zen Maru Gothic', system-ui" fontSize="12" fontWeight="900" fill="#111">{c.name}</text>
              </g>
              {isHover && (
                <g transform="translate(0 74)">
                  <rect x="-44" y="-10" width="88" height="20" fill="#111" rx="4"/>
                  <text textAnchor="middle" y="4" fontFamily="'DotGothic16', monospace" fontSize="11" fill="#fff200">▶ {count} EVENTS</text>
                </g>
              )}
            </g>
          );
        })}

        <g transform="translate(870 950) rotate(8)" style={{pointerEvents:'none'}}>
          <rect x="-60" y="-30" width="120" height="60" fill="#22d3ee" stroke="#111" strokeWidth="3" rx="6"/>
          <text textAnchor="middle" y="-8" fontFamily="'Bagel Fat One', system-ui" fontSize="18" fill="#111">★ KENI ★</text>
          <text textAnchor="middle" y="14" fontFamily="'DotGothic16', monospace" fontSize="11" fill="#111">7 dates JP</text>
        </g>
        <g transform="translate(900 90)" style={{pointerEvents:'none'}}>
          <circle r="26" fill="#fff" stroke="#111" strokeWidth="2.5"/>
          <path d="M0 -18 L4 0 L0 18 L-4 0Z" fill="#ff3ea5" stroke="#111" strokeWidth="1.5"/>
          <text textAnchor="middle" y="-30" fontFamily="'DotGothic16', monospace" fontSize="11" fill="#111">N</text>
        </g>
        <g transform="translate(500 1085)" style={{pointerEvents:'none'}}>
          <text textAnchor="middle" fontFamily="'DotGothic16', monospace" fontSize="9" fill="#111" opacity="0.4">
            data: 地球地図日本 / GSI of Japan · projection: d3-geo mercator
          </text>
        </g>
      </svg>
    </div>
  );
}

window.JapanMap = JapanMap;
