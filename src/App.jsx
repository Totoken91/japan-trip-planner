import { useEffect, useMemo, useState } from 'react';
import { TRIP, CITIES, ITINERARY, CATEGORIES, PROJECTS } from './data.js';
import {
  ProjectCard, ProjectModal, AddProjectModal,
  TripCalendar, ItineraryStrip,
  PRIO_INFO, STATUS_INFO,
} from './components.jsx';
import { TripMap } from './TripMap.jsx';
import {
  useTweaks, TweaksPanel, TweakSection,
  TweakSelect, TweakColor, TweakRadio, TweakToggle,
} from './TweaksPanel.jsx';

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "fontDisplay": "Bagel Fat One",
  "fontJp": "Zen Maru Gothic",
  "primary": "#ff3ea5",
  "accent": "#fff200",
  "accent2": "#22d3ee",
  "cardStyle": "tilted",
  "animations": true,
  "dark": false
}/*EDITMODE-END*/;

const FONT_DISPLAY_OPTIONS = ['Bagel Fat One','Reggae One','RocknRoll One','Yusei Magic'];
const FONT_JP_OPTIONS = ['Zen Maru Gothic','Reggae One','RocknRoll One','Yusei Magic'];

const LS_PROJECTS = 'jtp_projects_v1';
const LS_PHOTOS = 'jtp_photos_v1';
const LS_ITIN = 'jtp_itin_v1';

export default function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  const [view, setView] = useState('map');
  const [hoveredCity, setHoveredCity] = useState(null);
  const [currentCity, setCurrentCity] = useState(null);
  const [pickedId, setPickedId] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('all');
  const [filterPrio, setFilterPrio] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [calMonth, setCalMonth] = useState(4);
  const [calYear, setCalYear] = useState(2026);

  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem(LS_PROJECTS);
      return saved ? JSON.parse(saved) : PROJECTS;
    } catch { return PROJECTS; }
  });
  const [photos, setPhotos] = useState(() => {
    try { return JSON.parse(localStorage.getItem(LS_PHOTOS)||'{}'); } catch { return {}; }
  });
  const [itinerary] = useState(() => {
    try {
      const saved = localStorage.getItem(LS_ITIN);
      return saved ? JSON.parse(saved) : ITINERARY;
    } catch { return ITINERARY; }
  });

  useEffect(() => { localStorage.setItem(LS_PROJECTS, JSON.stringify(projects)); }, [projects]);
  useEffect(() => {
    try { localStorage.setItem(LS_PHOTOS, JSON.stringify(photos)); }
    catch (e) { console.warn('photos save failed (quota?)', e); }
  }, [photos]);

  useEffect(() => {
    document.body.dataset.theme = t.dark ? 'dark' : 'light';
    document.body.dataset.anim = t.animations ? 'on' : 'off';
    document.documentElement.style.setProperty('--pink', t.primary);
    document.documentElement.style.setProperty('--yellow', t.accent);
    document.documentElement.style.setProperty('--cyan', t.accent2);
  }, [t]);

  useEffect(() => {
    let s = document.getElementById('font-overrides');
    if (!s) { s = document.createElement('style'); s.id = 'font-overrides'; document.head.appendChild(s); }
    s.textContent = `.font-display{font-family:'${t.fontDisplay}',system-ui!important}
                     .font-jp{font-family:'${t.fontJp}',system-ui!important}`;
  }, [t.fontDisplay, t.fontJp]);

  const updateProject = (next) => setProjects(arr => arr.map(p => p.id === next.id ? next : p));
  const deleteProject = (id) => setProjects(arr => arr.filter(p => p.id !== id));
  const createProject = (p) => setProjects(arr => [...arr, p]);
  const setPhoto = (id, dataUrl) => setPhotos(o => {
    const next = {...o};
    if (dataUrl) next[id] = dataUrl; else delete next[id];
    return next;
  });

  const filtered = useMemo(() => {
    return projects.filter(p => {
      if (currentCity && p.city !== currentCity) return false;
      if (filterCat !== 'all' && p.cat !== filterCat) return false;
      if (filterPrio !== 'all' && p.priority !== filterPrio) return false;
      if (filterStatus !== 'all' && p.status !== filterStatus) return false;
      if (search) {
        const s = search.toLowerCase();
        const cat = CATEGORIES[p.cat];
        const cy = CITIES[p.city];
        if (!(p.name.toLowerCase().includes(s) ||
              (p.nameJp||'').includes(search) ||
              (p.notes||'').toLowerCase().includes(s) ||
              cy.name.toLowerCase().includes(s) ||
              cat.fr.toLowerCase().includes(s))) return false;
      }
      return true;
    });
  }, [projects, currentCity, filterCat, filterPrio, filterStatus, search]);

  const picked = pickedId ? projects.find(p => p.id === pickedId) : null;
  const pickedCity = picked && CITIES[picked.city];
  const pickedCat = picked && CATEGORIES[picked.cat];

  const stats = useMemo(() => {
    const total = projects.reduce((s,p) => s + (p.budget||0), 0);
    const done = projects.filter(p=>p.status==='DONE').length;
    const todo = projects.filter(p=>p.status==='TODO').length;
    const must = projects.filter(p=>p.priority==='MUST').length;
    const booking = projects.filter(p=>p.booking && p.status!=='DONE').length;
    return { total, done, todo, must, booking, count: projects.length };
  }, [projects]);

  const exportJSON = () => {
    const data = { trip: TRIP, itinerary, projects, photos };
    const blob = new Blob([JSON.stringify(data, null, 2)], {type:'application/json'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `japan-trip-backup-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
  };
  const importJSON = (e) => {
    const f = e.target.files[0]; if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      try {
        const data = JSON.parse(r.result);
        if (data.projects) setProjects(data.projects);
        if (data.photos) setPhotos(data.photos);
        alert('Import OK ! 🎉');
      } catch { alert('Fichier invalide'); }
    };
    r.readAsText(f);
  };
  const resetAll = () => {
    if (!confirm('Reset tous les projets aux valeurs par défaut ? Tes modifs seront perdues.')) return;
    setProjects(PROJECTS);
    setPhotos({});
  };

  const onPickCity = (cid) => { setCurrentCity(cid); setView('list'); };

  return (
    <div style={{minHeight:'100vh'}}>
      <div className={`marquee ${t.animations?'':'no-anim'}`}>
        <div className="marquee-track">
          ★ 日本旅行 ★ JAPAN TRIP 2026 ★ TOKYO → FUJI → MATSUMOTO → NAGANO → KANAZAWA → KYOTO ★ 27 MAI 〜 17 JUIN ★ {stats.count} PROJETS ★ {stats.booking} À RÉSERVER ★ {stats.done}/{stats.count} FAIT ★&nbsp;&nbsp;
          ★ 日本旅行 ★ JAPAN TRIP 2026 ★ TOKYO → FUJI → MATSUMOTO → NAGANO → KANAZAWA → KYOTO ★ 27 MAI 〜 17 JUIN ★ {stats.count} PROJETS ★ {stats.booking} À RÉSERVER ★ {stats.done}/{stats.count} FAIT ★&nbsp;&nbsp;
        </div>
      </div>

      <header className="app-header" style={{padding:'18px 24px'}}>
        <div style={{display:'flex', alignItems:'center', gap:18, flexWrap:'wrap', justifyContent:'space-between'}}>
          <div style={{display:'flex', alignItems:'center', gap:14}}>
            <div className={`logo-blob ${t.animations?'wiggle':''}`}>
              <div style={{
                background: 'var(--pink)', color:'#fff', border:'3px solid var(--ink)',
                padding:'6px 14px', fontFamily:'Bagel Fat One, system-ui', fontSize: 28, lineHeight:1,
                borderRadius: 10, transform:'rotate(-3deg)', boxShadow:'4px 4px 0 var(--ink)'
              }} className="font-display">日本旅</div>
              <div style={{
                background: 'var(--yellow)', color:'var(--ink)', border:'3px solid var(--ink)',
                padding:'6px 14px', fontFamily:'Bagel Fat One, system-ui', fontSize: 28, lineHeight:1,
                borderRadius: 10, transform:'rotate(2deg)', boxShadow:'4px 4px 0 var(--ink)',
                marginLeft: -6
              }} className="font-display">TRIP</div>
            </div>
            <div className="font-mono" style={{fontSize:11, opacity:.7, maxWidth:260, lineHeight:1.4}}>
              // notre voyage Japon mai-juin 2026<br/>
              // 東京・河口湖・松本・長野・金沢・京都
            </div>
          </div>

          <div className="header-search" style={{display:'flex', gap:8, alignItems:'center', flex: '1 1 200px', minWidth: 0, maxWidth: 480, position:'relative'}}>
            <span style={{position:'absolute', left: 12, top: '50%', transform:'translateY(-50%)', fontSize:18, zIndex:1, pointerEvents:'none'}}>🔍</span>
            <input
              value={search}
              onChange={e=>setSearch(e.target.value)}
              placeholder="検索 / Recherche resto, temple, ville…"
              style={{
                flex:1, padding:'12px 16px 12px 38px', border:'3px solid var(--ink)', borderRadius:10,
                fontFamily:'Inter', fontSize:14, background:'#fff',
                boxShadow:'4px 4px 0 var(--ink)', outline:'none', color:'var(--ink)'
              }}
            />
          </div>

          <div style={{display:'flex', gap:8, alignItems:'center'}}>
            <button className="btn sm pink" onClick={()=>setShowAdd(true)}>＋ Projet</button>
            <button className="btn sm yellow" onClick={()=>setTweak('dark', !t.dark)}>{t.dark?'☀️':'🌙'}</button>
          </div>
        </div>

        <div className="tabs" style={{marginTop:18}}>
          <button className={`tab ${view==='map'?'active':''}`} onClick={()=>setView('map')}>🗾 MAP / 地図</button>
          <button className={`tab ${view==='itinerary'?'active':''}`} onClick={()=>setView('itinerary')}>🚄 ITINÉRAIRE</button>
          <button className={`tab ${view==='calendar'?'active':''}`} onClick={()=>setView('calendar')}>📅 CAL / カレンダー</button>
          <button className={`tab ${view==='list'?'active':''}`} onClick={()=>setView('list')}>📋 PROJETS / 計画</button>
        </div>
      </header>

      <main style={{padding:'24px', maxWidth: 1400, margin:'0 auto'}}>

        {view !== 'map' && (
          <ItineraryStrip itinerary={itinerary} cities={CITIES}
            currentCity={currentCity} setCurrentCity={setCurrentCity}
            projects={projects}/>
        )}

        {view === 'list' && (
          <div style={{display:'flex', gap:6, marginBottom:18, flexWrap:'wrap', alignItems:'center'}}>
            <span className="font-mono" style={{fontSize:11, opacity:.6}}>// CAT:</span>
            <button className={`filter-chip ${filterCat==='all'?'active':''}`} onClick={()=>setFilterCat('all')}>tout</button>
            {Object.entries(CATEGORIES).map(([k,c])=>(
              <button key={k} className={`filter-chip ${filterCat===k?'active':''}`} onClick={()=>setFilterCat(k)}>{c.emoji} {c.fr}</button>
            ))}
            <span style={{flexBasis:'100%'}}/>
            <span className="font-mono" style={{fontSize:11, opacity:.6}}>// PRIO:</span>
            <button className={`filter-chip ${filterPrio==='all'?'active':''}`} onClick={()=>setFilterPrio('all')}>tout</button>
            {Object.entries(PRIO_INFO).map(([k,info])=>(
              <button key={k} className={`filter-chip ${filterPrio===k?'active':''}`} onClick={()=>setFilterPrio(k)}>★ {info.label}</button>
            ))}
            <span style={{width:14}}/>
            <span className="font-mono" style={{fontSize:11, opacity:.6}}>// STATUT:</span>
            <button className={`filter-chip ${filterStatus==='all'?'active':''}`} onClick={()=>setFilterStatus('all')}>tout</button>
            {Object.entries(STATUS_INFO).map(([k,info])=>(
              <button key={k} className={`filter-chip ${filterStatus===k?'active':''}`} onClick={()=>setFilterStatus(k)}>{info.emoji} {info.label}</button>
            ))}
            <span style={{flex:1}}/>
            <span className="sticker">{filtered.length} projets</span>
          </div>
        )}

        {view === 'map' && (
          <div style={{display:'grid', gridTemplateColumns:'minmax(0, 1fr) 320px', gap:20}} className="map-grid">
            <div className="card" style={{padding:8, position:'relative'}}>
              <TripMap projects={projects} cities={CITIES} itinerary={itinerary}
                onPickCity={onPickCity}
                hoveredCity={hoveredCity} setHoveredCity={setHoveredCity}
                animations={t.animations}/>
            </div>
            <div style={{display:'flex', flexDirection:'column', gap:14, minWidth:0}}>
              <div className="card" style={{padding:14}}>
                <div className="font-display" style={{fontSize:20}}>💰 BUDGET</div>
                <div className="font-mono" style={{fontSize:10, opacity:.6, marginBottom:10}}>// total prévu (à 2)</div>
                <div className="font-display" style={{fontSize:34, lineHeight:1}}>¥{stats.total.toLocaleString()}</div>
                <div className="font-mono" style={{fontSize:11, opacity:.7, marginTop:2}}>
                  ≈ {Math.round(stats.total*TRIP.jpyToEur).toLocaleString()}€ &nbsp;·&nbsp;
                  {Math.round(stats.total/2*TRIP.jpyToEur).toLocaleString()}€/personne
                </div>
                <div className="budget-bar" style={{marginTop:10}}>
                  <div className="fill" style={{width: `${Math.min(100, stats.done/stats.count*100)}%`}}/>
                </div>
                <div className="font-mono" style={{fontSize:10, opacity:.6, marginTop:4}}>
                  {stats.done}/{stats.count} projets faits
                </div>
              </div>

              <div className="card" style={{padding:14, background:'var(--yellow)'}}>
                <div className="font-display" style={{fontSize:18}}>★ 6 ÉTAPES</div>
                <div className="font-mono" style={{fontSize:11, marginTop:8, lineHeight:1.7}}>
                  {itinerary.map((it, i) => {
                    const c = CITIES[it.city];
                    return <div key={i}>
                      ▸ <span style={{fontWeight:700}}>{c.sticker} {c.name}</span> · {it.nights}n
                    </div>;
                  })}
                </div>
              </div>

              {stats.booking > 0 && (
                <div className="card" style={{padding:14, background:'var(--pink)', color:'#fff', transform:'rotate(-1deg)'}}>
                  <div className="font-display" style={{fontSize:16, color:'#fff'}}>🎫 À RÉSERVER</div>
                  <div className="font-mono" style={{fontSize:11, marginTop:6, lineHeight:1.5}}>
                    {stats.booking} projets nécessitent une réservation. Ne pas oublier (Ghibli museum, Shibuya Sky, ryokan…) !
                  </div>
                </div>
              )}

              <div className="card" style={{padding:14, transform:'rotate(.8deg)'}}>
                <div className="font-display" style={{fontSize:16}}>HOW TO USE</div>
                <ol className="font-mono" style={{fontSize:11, paddingLeft:16, lineHeight:1.6}}>
                  <li>Clique un pin → projets de la ville</li>
                  <li>Onglet <b>Itinéraire</b> pour la timeline</li>
                  <li>＋ Projet pour ajouter une envie</li>
                  <li>Statut MUST/NICE/MAYBE + TODO/FAIT</li>
                  <li><b>Tweaks</b> → typo, couleurs</li>
                </ol>
              </div>
            </div>
          </div>
        )}

        {view === 'itinerary' && (
          <div>
            {itinerary.map((it, i) => {
              const c = CITIES[it.city];
              const cityProjects = projects.filter(p => p.city === it.city);
              const must = cityProjects.filter(p=>p.priority==='MUST');
              const nice = cityProjects.filter(p=>p.priority==='NICE');
              const maybe = cityProjects.filter(p=>p.priority==='MAYBE');
              const cityBudget = cityProjects.reduce((s,p)=>s+(p.budget||0),0);
              return (
                <div key={i} className={`card ${i%2?'tilt-l':'tilt-r'}`} style={{padding:0, marginBottom:20, overflow:'hidden'}}>
                  <div className="halftone" style={{
                    background: `linear-gradient(135deg, ${c.color} 0%, ${c.color2} 100%)`,
                    padding:'18px 22px', borderBottom:'3px solid var(--ink)', position:'relative'
                  }}>
                    <div style={{display:'flex', alignItems:'center', gap:14, flexWrap:'wrap'}}>
                      <div style={{fontSize:54, lineHeight:1}}>{c.sticker}</div>
                      <div style={{flex:1, minWidth: 200}}>
                        <span className="sticker ink">ÉTAPE {c.segment}</span>
                        <div className="font-jp" style={{fontSize:24, color:'#fff', WebkitTextStroke:'2px var(--ink)', marginTop:4, lineHeight:1}}>{c.nameJp}</div>
                        <div className="font-display" style={{fontSize:'clamp(24px, 7vw, 38px)', color:'#fff', WebkitTextStroke:'2px var(--ink)', lineHeight:1}}>{c.name}</div>
                        <div className="font-mono" style={{fontSize:12, marginTop:4}}>{c.suggestedDays} · {it.nights} nuits</div>
                      </div>
                      <div className="card" style={{padding:10, minWidth:160, background:'#fff'}}>
                        <div className="font-mono" style={{fontSize:10, opacity:.6}}>// BUDGET ÉTAPE</div>
                        <div className="font-display" style={{fontSize:22}}>¥{cityBudget.toLocaleString()}</div>
                        <div className="font-mono" style={{fontSize:10, opacity:.7}}>{cityProjects.length} projets</div>
                      </div>
                    </div>
                    <div style={{fontSize:13, marginTop:10, opacity:.9}}>{c.desc}</div>
                  </div>
                  <div style={{padding:'16px 22px'}}>
                    {[['MUST',must],['NICE',nice],['MAYBE',maybe]].map(([prio, list]) => list.length > 0 && (
                      <div key={prio} style={{marginBottom:10}}>
                        <div style={{display:'flex', gap:8, alignItems:'center', marginBottom:6}}>
                          <span className="sticker" style={{background: PRIO_INFO[prio].color, color: PRIO_INFO[prio].textColor}}>★ {prio}</span>
                          <span className="font-mono" style={{fontSize:10, opacity:.6}}>{list.length} projets</span>
                        </div>
                        <div style={{display:'flex', flexWrap:'wrap', gap:6}}>
                          {list.map(p => {
                            const cat = CATEGORIES[p.cat];
                            return (
                              <button key={p.id} className="btn sm" onClick={()=>setPickedId(p.id)}
                                style={{
                                  background: p.status==='DONE' ? '#10b981' : '#fff',
                                  color: p.status==='DONE'?'#fff':'var(--ink)',
                                  textDecoration: p.status==='DONE'?'line-through':'none',
                                  opacity: p.status==='CANCELED'?0.5:1
                                }}>
                                {cat.emoji} {p.name}
                                {p.booking && ' 🎫'}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {view === 'calendar' && (
          <div style={{display:'grid', gridTemplateColumns:'minmax(0, 1fr) 320px', gap:20}} className="map-grid">
            <TripCalendar projects={projects} cities={CITIES} categories={CATEGORIES}
              year={calYear} month={calMonth}
              setMonth={setCalMonth} setYear={setCalYear}
              onPickProject={setPickedId} itinerary={itinerary}/>
            <div className="card" style={{padding:14, alignSelf:'flex-start'}}>
              <div className="font-display" style={{fontSize:18}}>LÉGENDE</div>
              <div className="font-mono" style={{fontSize:10, opacity:.7, marginTop:6}}>// fond = ville où on dort cette nuit</div>
              <div style={{marginTop:10, display:'flex', flexDirection:'column', gap:6}}>
                {Object.entries(CITIES).map(([k, c]) => (
                  <div key={k} style={{display:'flex', gap:8, alignItems:'center', fontSize:12}}>
                    <div style={{width:14, height:14, background:c.color2, border:'2px solid var(--ink)', borderRadius:3}}/>
                    <span>{c.sticker}</span>
                    <span style={{flex:1}}>{c.name}</span>
                  </div>
                ))}
              </div>
              <div style={{borderTop:'2px dashed var(--ink)', margin:'12px 0', paddingTop:10}}>
                <div className="font-mono" style={{fontSize:10, opacity:.6}}>// Astuce</div>
                <div style={{fontSize:11, marginTop:4, lineHeight:1.4}}>
                  Pour planifier un projet sur un jour précis, ouvre-le et choisis "Jour prévu".
                </div>
              </div>
            </div>
          </div>
        )}

        {view === 'list' && (
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(340px, 1fr))', gap: 18}}>
            {filtered.length === 0 && (
              <div className="card" style={{padding:30, textAlign:'center', gridColumn:'1 / -1'}}>
                <div className="font-display" style={{fontSize:40}}>(╥﹏╥)</div>
                <div className="font-jp" style={{fontSize:18, marginTop:6}}>結果なし</div>
                <div className="font-mono" style={{fontSize:11, marginTop:4, opacity:.6}}>// aucun projet avec ces filtres</div>
                <button className="btn pink sm" style={{marginTop:14}} onClick={()=>setShowAdd(true)}>＋ Ajouter un projet</button>
              </div>
            )}
            {filtered.map(p => (
              <ProjectCard key={p.id} p={p}
                city={CITIES[p.city]}
                cat={CATEGORIES[p.cat]}
                photo={photos[p.id]}
                onClick={()=>setPickedId(p.id)}
                cardStyle={t.cardStyle}/>
            ))}
          </div>
        )}

        <footer style={{marginTop: 40, padding: '20px 0', borderTop:'3px dashed var(--ink)'}}>
          <div style={{display:'flex', gap:8, flexWrap:'wrap', justifyContent:'center', marginBottom:14}}>
            <button className="btn sm cyan" onClick={exportJSON}>💾 Backup JSON</button>
            <label className="btn sm" style={{cursor:'pointer'}}>
              📂 Importer JSON
              <input type="file" accept="application/json" onChange={importJSON} style={{display:'none'}}/>
            </label>
            <button className="btn sm" onClick={resetAll} style={{background:'#fee2e2'}}>↺ Reset</button>
            <button className="btn sm" onClick={()=>window.print()}>🖨 Imprimer</button>
          </div>
          <div className="font-mono" style={{fontSize:11, opacity:.6, textAlign:'center'}}>
            // sauvegardé localement sur cet appareil — pense au backup JSON avant le voyage<br/>
            // 楽しい旅行を！ ─── made with ❤︎ for our trip ───
          </div>
        </footer>
      </main>

      {picked && (
        <ProjectModal p={picked} city={pickedCity} cat={pickedCat}
          onClose={()=>setPickedId(null)}
          onUpdate={updateProject}
          onDelete={deleteProject}
          photos={photos}
          onAddPhoto={setPhoto}/>
      )}

      {showAdd && (
        <AddProjectModal cities={CITIES} categories={CATEGORIES}
          onClose={()=>setShowAdd(false)}
          onCreate={createProject}/>
      )}

      <TweaksPanel title="Tweaks ✦">
        <TweakSection label="Typographie"/>
        <TweakSelect label="Display" value={t.fontDisplay} options={FONT_DISPLAY_OPTIONS} onChange={v=>setTweak('fontDisplay', v)}/>
        <TweakSelect label="Japonais" value={t.fontJp} options={FONT_JP_OPTIONS} onChange={v=>setTweak('fontJp', v)}/>

        <TweakSection label="Palette"/>
        <TweakColor label="Primaire" value={t.primary} onChange={v=>setTweak('primary', v)}/>
        <TweakColor label="Accent" value={t.accent} onChange={v=>setTweak('accent', v)}/>
        <TweakColor label="Accent 2" value={t.accent2} onChange={v=>setTweak('accent2', v)}/>

        <TweakSection label="Style cartes"/>
        <TweakRadio label="Style" value={t.cardStyle}
          options={[
            {value:'tilted', label:'Tilt'},
            {value:'flat', label:'Flat'},
            {value:'color', label:'Color'},
            {value:'bold', label:'Bold'},
          ]}
          onChange={v=>setTweak('cardStyle', v)}/>

        <TweakSection label="Affichage"/>
        <TweakToggle label="Animations" value={t.animations} onChange={v=>setTweak('animations', v)}/>
        <TweakToggle label="Mode sombre" value={t.dark} onChange={v=>setTweak('dark', v)}/>
      </TweaksPanel>
    </div>
  );
}
