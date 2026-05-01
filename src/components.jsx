// Composants : ProjectCard, ProjectModal, TripCalendar, ItineraryStrip, AddProjectModal
import { Fragment, useEffect, useState } from 'react';
import { TRIP } from './data.js';

export const PRIO_INFO = {
  MUST:  { label:'MUST',  color:'#ff3ea5', textColor:'#fff' },
  NICE:  { label:'NICE',  color:'#fff200', textColor:'#111' },
  MAYBE: { label:'MAYBE', color:'#22d3ee', textColor:'#111' },
};
export const STATUS_INFO = {
  SHORTLIST: { label:'SHORTLIST', emoji:'📝', color:'#e5e7eb' },
  TODO:      { label:'À FAIRE',   emoji:'⭐', color:'#fff200' },
  DONE:      { label:'FAIT',      emoji:'✅', color:'#10b981' },
  CANCELED:  { label:'ANNULÉ',    emoji:'❌', color:'#9ca3af' },
};

export function fmtMoney(jpy) {
  if (!jpy) return '—';
  return `¥${jpy.toLocaleString()}`;
}
export function fmtDateShort(iso) {
  const d = new Date(iso);
  return `${d.getDate()}/${d.getMonth()+1}`;
}
export function dayInTrip(iso, tripStart) {
  const d = new Date(iso); const s = new Date(tripStart);
  return Math.floor((d - s) / 86400000) + 1;
}

// =====================================================
// CARTE D'UN PROJET (ce qu'on voit dans la grid)
// =====================================================
export function ProjectCard({ p, city, cat, onClick, cardStyle, photo }) {
  const prio = PRIO_INFO[p.priority] || PRIO_INFO.MAYBE;
  const st = STATUS_INFO[p.status] || STATUS_INFO.TODO;
  const tilt = cardStyle === 'tilted' ? (parseInt(p.id.replace(/\D/g,''))%2 ? 'tilt-l':'tilt-r') : '';
  const bg = cardStyle === 'color' ? city.color2 : (cardStyle === 'bold' ? city.color : '#fff');
  const txt = cardStyle === 'bold' ? '#fff' : 'var(--ink)';
  return (
    <div className={`card event-card ${tilt} ${cardStyle||''} ${p.status==='DONE'?'done':''}`}
         onClick={onClick}
         style={{ background: bg, color: txt, opacity: p.status==='CANCELED'?0.5:1 }}>
      {cardStyle !== 'flat' && <div className="washi pink" style={{top:-12, left:14, transform:'rotate(-3deg)'}}/>}

      <div style={{display:'flex', alignItems:'flex-start', gap:12}}>
        {/* category emoji block */}
        <div style={{
          minWidth: 64, textAlign:'center',
          border: '2.5px solid var(--ink)', borderRadius: 10,
          background: cardStyle === 'bold' ? '#fff' : cat.color, color: '#fff',
          padding: '8px 6px',
        }}>
          <div style={{fontSize:30, lineHeight:1}}>{cat.emoji}</div>
          <div className="font-mono" style={{fontSize:9, color:'#fff', opacity:.95, marginTop:4}}>{cat.jp}</div>
        </div>
        <div style={{flex:1, minWidth:0}}>
          <div style={{display:'flex', gap:6, marginBottom:6, flexWrap:'wrap'}}>
            <span className="sticker" style={{background: prio.color, color: prio.textColor}}>★ {prio.label}</span>
            <span className="sticker">{city.sticker} {city.name}</span>
            {p.booking && <span className="sticker yellow">🎫 réserv.</span>}
            {p.scheduledDate && <span className="sticker cyan">📅 {fmtDateShort(p.scheduledDate)}</span>}
          </div>
          <div className="font-display" style={{fontSize:17, lineHeight:1.15, marginBottom:2, textDecoration: p.status==='DONE'?'line-through':'none'}}>
            {p.name}
          </div>
          {p.nameJp && <div className="font-jp" style={{fontSize:12, opacity:.75, marginBottom:6}}>{p.nameJp}</div>}
          <div style={{fontSize:12, opacity:.85, marginBottom:6, lineHeight:1.4,
            display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden'}}>
            {p.notes}
          </div>
          <div style={{display:'flex', gap:6, alignItems:'center', flexWrap:'wrap', fontSize:11}}>
            <span className="font-mono">{st.emoji} {st.label}</span>
            <span style={{opacity:.5}}>·</span>
            <span className="font-mono">{fmtMoney(p.budget)}</span>
            {p.hours && <><span style={{opacity:.5}}>·</span><span className="font-mono" style={{fontSize:10, opacity:.7}}>⏰ {p.hours}</span></>}
          </div>
        </div>
      </div>
      {photo && <div style={{
        marginTop:10, height:80, borderRadius:6, border:'2px solid var(--ink)',
        backgroundImage:`url(${photo})`, backgroundSize:'cover', backgroundPosition:'center'
      }}/>}
    </div>
  );
}

// =====================================================
// MODAL DÉTAIL D'UN PROJET (avec édition)
// =====================================================
export function ProjectModal({ p, city, cat, onClose, onUpdate, onDelete, photos, onAddPhoto }) {
  if (!p) return null;
  const [draft, setDraft] = useState(p);
  useEffect(() => setDraft(p), [p?.id]);

  const save = (patch) => {
    const next = { ...draft, ...patch };
    setDraft(next);
    onUpdate(next);
  };

  const onFile = (e) => {
    const f = e.target.files[0]; if (!f) return;
    const r = new FileReader();
    r.onload = () => onAddPhoto(p.id, r.result);
    r.readAsDataURL(f);
  };

  const photo = photos[p.id];

  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="card slide-in" onClick={e=>e.stopPropagation()} style={{
        maxWidth: 720, width:'100%', padding:0, overflow:'hidden', position:'relative',
        maxHeight:'92vh', overflowY:'auto'
      }}>
        <div className="washi pink" style={{top:-14, left:30, transform:'rotate(-4deg)'}}/>
        <div className="washi cyan" style={{top:-14, right:50, transform:'rotate(6deg)'}}/>

        <button onClick={onClose} className="btn sm" style={{
          position:'absolute', top:14, right:14, zIndex:5, padding:'4px 10px', fontSize:18
        }}>✕</button>

        {/* Hero */}
        <div className="halftone" style={{
          background: `linear-gradient(135deg, ${cat.color} 0%, ${city.color2} 100%)`,
          padding: '36px 24px 22px', borderBottom:'3px solid var(--ink)', position:'relative'
        }}>
          <div style={{display:'flex', gap:8, marginBottom:10, flexWrap:'wrap'}}>
            <span className="sticker" style={{background: PRIO_INFO[draft.priority].color, color: PRIO_INFO[draft.priority].textColor}}>
              ★ {PRIO_INFO[draft.priority].label}
            </span>
            <span className="sticker">{cat.emoji} {cat.fr}</span>
            <span className="sticker ink">{city.sticker} {city.name}</span>
            {draft.booking && <span className="sticker yellow">🎫 réservation</span>}
          </div>
          <div style={{fontSize:48, marginBottom:6}}>{cat.emoji}</div>
          <input
            value={draft.name}
            onChange={e=>save({name: e.target.value})}
            className="font-display"
            style={{fontSize:30, lineHeight:1.05, color:'#fff', WebkitTextStroke:'2px var(--ink)',
              background:'transparent', border:'none', outline:'none', width:'100%', fontFamily:'Bagel Fat One, system-ui'}}
          />
          {draft.nameJp && <div className="font-jp" style={{fontSize:18, marginTop:4}}>{draft.nameJp}</div>}
        </div>

        {/* Body */}
        <div style={{padding:'20px 24px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:16}}>

          {/* Photo */}
          <div style={{gridColumn:'1 / -1'}}>
            <div className="font-mono" style={{fontSize:10, opacity:.6, marginBottom:6}}>// PHOTO</div>
            {photo ? (
              <div style={{position:'relative'}}>
                <img src={photo} style={{width:'100%', height:200, objectFit:'cover', border:'3px solid var(--ink)', borderRadius:8}}/>
                <button className="btn sm" style={{position:'absolute', top:8, right:8}}
                  onClick={()=>onAddPhoto(p.id, null)}>✕ retirer</button>
              </div>
            ) : (
              <label className="btn sm" style={{display:'inline-block', cursor:'pointer'}}>
                📷 Ajouter une photo
                <input type="file" accept="image/*" onChange={onFile} style={{display:'none'}}/>
              </label>
            )}
          </div>

          {/* Priority */}
          <div>
            <div className="font-mono" style={{fontSize:10, opacity:.6, marginBottom:4}}>// PRIORITÉ</div>
            <div style={{display:'flex', gap:6}}>
              {Object.entries(PRIO_INFO).map(([k, info]) => (
                <button key={k} className="btn sm" style={{
                  background: draft.priority===k ? info.color : '#fff',
                  color: draft.priority===k ? info.textColor : 'var(--ink)',
                  flex:1
                }} onClick={()=>save({priority: k})}>{info.label}</button>
              ))}
            </div>
          </div>

          {/* Status */}
          <div>
            <div className="font-mono" style={{fontSize:10, opacity:.6, marginBottom:4}}>// STATUT</div>
            <select className="btn sm" value={draft.status} onChange={e=>save({status: e.target.value})}
              style={{width:'100%'}}>
              {Object.entries(STATUS_INFO).map(([k, info]) => (
                <option key={k} value={k}>{info.emoji} {info.label}</option>
              ))}
            </select>
          </div>

          {/* Budget */}
          <div>
            <div className="font-mono" style={{fontSize:10, opacity:.6, marginBottom:4}}>// BUDGET (¥)</div>
            <input type="number" value={draft.budget||0} onChange={e=>save({budget: parseInt(e.target.value)||0})}
              className="btn sm" style={{width:'100%', fontFamily:'DotGothic16, monospace'}}/>
            <div className="font-mono" style={{fontSize:10, opacity:.6, marginTop:2}}>
              ≈ {((draft.budget||0)*TRIP.jpyToEur).toFixed(2)}€
            </div>
          </div>

          {/* Hours */}
          <div>
            <div className="font-mono" style={{fontSize:10, opacity:.6, marginBottom:4}}>// HORAIRES</div>
            <input type="text" value={draft.hours||''} onChange={e=>save({hours: e.target.value})}
              placeholder="ex: 09:00-17:00"
              className="btn sm" style={{width:'100%', fontFamily:'DotGothic16, monospace'}}/>
          </div>

          {/* Scheduled date */}
          <div style={{gridColumn:'1 / -1'}}>
            <div className="font-mono" style={{fontSize:10, opacity:.6, marginBottom:4}}>// JOUR PRÉVU (optionnel)</div>
            <input type="date" value={draft.scheduledDate || ''}
              min={TRIP.startDate} max={TRIP.endDate}
              onChange={e=>save({scheduledDate: e.target.value})}
              className="btn sm" style={{width:'100%', fontFamily:'DotGothic16, monospace'}}/>
            {draft.scheduledDate && (
              <button className="btn sm" style={{marginTop:4, fontSize:10}} onClick={()=>save({scheduledDate: null})}>✕ retirer date</button>
            )}
          </div>

          {/* Booking */}
          <div style={{gridColumn:'1 / -1', display:'flex', alignItems:'center', gap:8}}>
            <input type="checkbox" id="bk" checked={!!draft.booking} onChange={e=>save({booking: e.target.checked})}
              style={{width:18, height:18}}/>
            <label htmlFor="bk" className="font-mono" style={{fontSize:12}}>🎫 Réservation requise</label>
          </div>

          {/* Notes */}
          <div style={{gridColumn:'1 / -1'}}>
            <div className="font-mono" style={{fontSize:10, opacity:.6, marginBottom:4}}>// NOTES</div>
            <textarea value={draft.notes||''} onChange={e=>save({notes: e.target.value})}
              rows={5}
              className="btn sm" style={{width:'100%', fontFamily:'Inter', fontSize:13, lineHeight:1.5, padding:10, textAlign:'left'}}/>
          </div>

          {/* Maps link */}
          <div style={{gridColumn:'1 / -1', display:'flex', gap:8, flexWrap:'wrap'}}>
            <button className="btn pink" onClick={()=>{
              const q = encodeURIComponent(draft.nameJp || draft.name);
              window.open(`https://maps.google.com/?q=${q}`, '_blank');
            }}>🗺 Ouvrir dans Google Maps</button>
            {draft.gmaps && <button className="btn cyan" onClick={()=>window.open(draft.gmaps, '_blank')}>🔗 Lien direct</button>}
            <span style={{flex:1}}/>
            <button className="btn" style={{background:'#fee2e2'}} onClick={()=>{
              if (confirm(`Supprimer "${draft.name}" ?`)) { onDelete(p.id); onClose(); }
            }}>🗑 Supprimer</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// =====================================================
// AJOUTER UN PROJET
// =====================================================
export function AddProjectModal({ cities, categories, onClose, onCreate }) {
  const [draft, setDraft] = useState({
    name:'', nameJp:'', city:'tokyo', cat:'resto',
    priority:'NICE', status:'SHORTLIST', budget:0, hours:'', notes:'', booking:false
  });
  const update = (patch) => setDraft(d => ({...d, ...patch}));
  const submit = () => {
    if (!draft.name.trim()) { alert('Donne-lui au moins un nom 🙏'); return; }
    const id = 'p_'+Math.random().toString(36).slice(2,9);
    onCreate({ ...draft, id });
    onClose();
  };
  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="card slide-in" onClick={e=>e.stopPropagation()} style={{
        maxWidth: 600, width:'100%', padding:24, position:'relative',
        maxHeight:'92vh', overflowY:'auto'
      }}>
        <div className="washi" style={{top:-14, left:30, transform:'rotate(-3deg)'}}/>
        <button onClick={onClose} className="btn sm" style={{position:'absolute', top:14, right:14}}>✕</button>
        <div className="font-display" style={{fontSize:30, lineHeight:1}}>＋ Nouveau projet</div>
        <div className="font-jp" style={{fontSize:14, opacity:.7}}>新しい計画</div>

        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginTop:16}}>
          <div style={{gridColumn:'1 / -1'}}>
            <div className="font-mono" style={{fontSize:10, opacity:.6}}>// NOM *</div>
            <input value={draft.name} onChange={e=>update({name: e.target.value})}
              className="btn sm" style={{width:'100%', fontFamily:'Inter', fontSize:14}} placeholder="ex: Ramen Ichiran Shibuya"/>
          </div>
          <div style={{gridColumn:'1 / -1'}}>
            <div className="font-mono" style={{fontSize:10, opacity:.6}}>// NOM JP (optionnel)</div>
            <input value={draft.nameJp} onChange={e=>update({nameJp: e.target.value})}
              className="btn sm" style={{width:'100%', fontFamily:'Zen Maru Gothic', fontSize:14}} placeholder="例: 一蘭 渋谷"/>
          </div>
          <div>
            <div className="font-mono" style={{fontSize:10, opacity:.6}}>// VILLE</div>
            <select value={draft.city} onChange={e=>update({city: e.target.value})}
              className="btn sm" style={{width:'100%'}}>
              {Object.entries(cities).map(([k,c])=><option key={k} value={k}>{c.sticker} {c.name}</option>)}
            </select>
          </div>
          <div>
            <div className="font-mono" style={{fontSize:10, opacity:.6}}>// CATÉGORIE</div>
            <select value={draft.cat} onChange={e=>update({cat: e.target.value})}
              className="btn sm" style={{width:'100%'}}>
              {Object.entries(categories).map(([k,c])=><option key={k} value={k}>{c.emoji} {c.fr}</option>)}
            </select>
          </div>
          <div>
            <div className="font-mono" style={{fontSize:10, opacity:.6}}>// PRIORITÉ</div>
            <select value={draft.priority} onChange={e=>update({priority: e.target.value})}
              className="btn sm" style={{width:'100%'}}>
              {Object.entries(PRIO_INFO).map(([k,i])=><option key={k} value={k}>★ {i.label}</option>)}
            </select>
          </div>
          <div>
            <div className="font-mono" style={{fontSize:10, opacity:.6}}>// BUDGET (¥)</div>
            <input type="number" value={draft.budget} onChange={e=>update({budget: parseInt(e.target.value)||0})}
              className="btn sm" style={{width:'100%', fontFamily:'DotGothic16, monospace'}}/>
          </div>
          <div>
            <div className="font-mono" style={{fontSize:10, opacity:.6}}>// HORAIRES</div>
            <input value={draft.hours} onChange={e=>update({hours: e.target.value})}
              className="btn sm" style={{width:'100%', fontFamily:'DotGothic16, monospace'}} placeholder="09:00-17:00"/>
          </div>
          <div style={{gridColumn:'1 / -1', display:'flex', alignItems:'center', gap:8}}>
            <input type="checkbox" id="newbk" checked={draft.booking} onChange={e=>update({booking: e.target.checked})} style={{width:18,height:18}}/>
            <label htmlFor="newbk" className="font-mono" style={{fontSize:12}}>🎫 Réservation requise</label>
          </div>
          <div style={{gridColumn:'1 / -1'}}>
            <div className="font-mono" style={{fontSize:10, opacity:.6}}>// NOTES</div>
            <textarea value={draft.notes} onChange={e=>update({notes: e.target.value})}
              rows={3}
              className="btn sm" style={{width:'100%', fontFamily:'Inter', fontSize:13, padding:10, textAlign:'left'}}/>
          </div>
          <div style={{gridColumn:'1 / -1', display:'flex', gap:8}}>
            <button className="btn pink" onClick={submit} style={{flex:1}}>＋ Ajouter</button>
            <button className="btn" onClick={onClose}>Annuler</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// =====================================================
// CALENDRIER MENSUEL avec projets schedulés
// =====================================================
export function TripCalendar({ projects, cities, categories, year, month, setMonth, setYear, onPickProject, itinerary }) {
  const first = new Date(year, month, 1);
  const startDay = first.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7) cells.push(null);

  // Projets schedulés par jour
  const byDay = {};
  projects.forEach(p => {
    if (!p.scheduledDate) return;
    const d = new Date(p.scheduledDate);
    if (d.getMonth() === month && d.getFullYear() === year) {
      (byDay[d.getDate()] = byDay[d.getDate()] || []).push(p);
    }
  });

  // Quelle ville chaque jour ?
  const cityForDay = (d) => {
    const date = new Date(year, month, d);
    for (const it of itinerary) {
      const f = new Date(it.from), t = new Date(it.to);
      if (date >= f && date < t) return it.city;
    }
    return null;
  };

  const isInTrip = (d) => {
    const date = new Date(year, month, d);
    return date >= new Date(TRIP.startDate) && date <= new Date(TRIP.endDate);
  };

  const monthName = ['Jan','Fév','Mar','Avr','Mai','Juin','Juil','Août','Sept','Oct','Nov','Déc'][month];
  const monthJp = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'][month];

  return (
    <div className="card" style={{padding:20, position:'relative'}}>
      <div className="washi" style={{top:-14, right:30, transform:'rotate(4deg)'}}/>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16, flexWrap:'wrap', gap:10}}>
        <div>
          <div className="font-jp" style={{fontSize:24, lineHeight:1}}>{year}年 {monthJp}</div>
          <div className="font-display" style={{fontSize:36, lineHeight:1}}>{monthName} {year}</div>
        </div>
        <div style={{display:'flex', gap:8}}>
          <button className="btn sm" onClick={()=>{ if(month===0){setMonth(11);setYear(year-1);}else setMonth(month-1); }}>← 前</button>
          <button className="btn sm yellow" onClick={()=>{ setMonth(4); setYear(2026); }}>27/05</button>
          <button className="btn sm" onClick={()=>{ if(month===11){setMonth(0);setYear(year+1);}else setMonth(month+1); }}>次 →</button>
        </div>
      </div>
      <div style={{display:'grid', gridTemplateColumns:'repeat(7, 1fr)', gap:6, marginBottom:6}}>
        {['日','月','火','水','木','金','土'].map((d,i)=>(
          <div key={d} className="font-display" style={{
            textAlign:'center', padding:'6px 0', fontSize:14,
            color: i===0 ? 'var(--pink)' : i===6 ? 'var(--cyan)' : 'var(--ink)'
          }}>{d}</div>
        ))}
      </div>
      <div style={{display:'grid', gridTemplateColumns:'repeat(7, 1fr)', gap:6}}>
        {cells.map((d, i) => {
          if (!d) return <div key={i} className="cal-day muted"/>;
          const projs = byDay[d] || [];
          const cid = cityForDay(d);
          const c = cid ? cities[cid] : null;
          const inTrip = isInTrip(d);
          return (
            <div key={i} className={`cal-day ${inTrip?'has-events':''}`}
                 style={{ background: c ? c.color2 : (inTrip?undefined:'#fff'), opacity: inTrip?1:0.4 }}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
                <div className="font-display" style={{fontSize:18, lineHeight:1}}>{d}</div>
                {c && <div style={{
                  fontSize:9, background:c.color, color:'#fff',
                  padding:'1px 5px', borderRadius:6, fontFamily:'DotGothic16, monospace'
                }}>{c.sticker}</div>}
              </div>
              <div style={{marginTop:4, display:'flex', flexDirection:'column', gap:2}}>
                {projs.slice(0,3).map(p=>{
                  const cat = categories[p.cat];
                  return <div key={p.id} onClick={()=>onPickProject(p.id)} style={{
                    fontSize:9, background: cat.color, color:'#fff',
                    padding:'1px 4px', borderRadius:3, border:'1px solid var(--ink)',
                    overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap',
                    fontFamily:'DotGothic16, monospace', cursor:'pointer'
                  }}>{cat.emoji} {p.name}</div>;
                })}
                {projs.length>3 && <div style={{fontSize:9, opacity:.6}}>+{projs.length-3}</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// =====================================================
// BANDE D'ITINÉRAIRE EN HAUT (segments visuels)
// =====================================================
export function ItineraryStrip({ itinerary, cities, currentCity, setCurrentCity, projects }) {
  const total = itinerary.reduce((s, it) => s + it.nights, 0);
  return (
    <div className="card" style={{padding:14, marginBottom:18, position:'relative', overflow:'hidden'}}>
      <div className="washi pink" style={{top:-12, right:30, transform:'rotate(3deg)'}}/>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:10, flexWrap:'wrap', gap:8}}>
        <div>
          <div className="font-display" style={{fontSize:18, lineHeight:1}}>★ ROAD TRIP</div>
          <div className="font-mono" style={{fontSize:11, opacity:.7}}>27 mai → 17 juin · {total} nuits · {itinerary.length} étapes</div>
        </div>
        <div className="font-mono" style={{fontSize:11, opacity:.6}}>// clique une ville pour filtrer</div>
      </div>
      <div style={{display:'flex', gap:0, alignItems:'stretch', overflowX:'auto', paddingBottom:4}}>
        {itinerary.map((it, i) => {
          const c = cities[it.city];
          const projCount = projects.filter(p => p.city === it.city).length;
          const isActive = currentCity === it.city;
          return (
            <Fragment key={i}>
              <div onClick={()=>setCurrentCity(isActive ? null : it.city)} style={{
                flex: `${it.nights} 0 auto`, minWidth: 110, padding:'10px 12px',
                background: isActive ? c.color : c.color2,
                border:'2.5px solid var(--ink)', borderRadius: 8, cursor:'pointer',
                color: isActive ? '#fff' : 'var(--ink)',
                boxShadow: isActive ? '4px 4px 0 var(--ink)' : 'none',
                transform: isActive ? 'translate(-1px, -1px)' : 'none',
                transition:'all .15s'
              }}>
                <div style={{fontSize:18, lineHeight:1}}>{c.sticker}</div>
                <div className="font-display" style={{fontSize:14, lineHeight:1.1, marginTop:2}}>{c.name}</div>
                <div className="font-jp" style={{fontSize:10, opacity:.85}}>{c.nameJp}</div>
                <div className="font-mono" style={{fontSize:10, marginTop:4, opacity:.85}}>
                  {it.nights}n · {projCount} projets
                </div>
              </div>
              {i < itinerary.length-1 && <div style={{display:'flex', alignItems:'center', padding:'0 4px', fontSize:18, color:'var(--ink)'}}>→</div>}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
