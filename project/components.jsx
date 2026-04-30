// Calendrier mensuel + Feed + Modal détail
// Utilise window.IDOL_GROUPS, EVENTS, VENUES, CITIES

const KIND_LABEL = {
  LIVE: { fr: 'CONCERT', jp: 'ライブ', color: 'pink' },
  THEATER: { fr: 'THÉÂTRE', jp: '劇場', color: 'cyan' },
  FANMEET: { fr: 'FAN MEET', jp: '握手会', color: 'yellow' },
  FESTIVAL: { fr: 'FESTIVAL', jp: 'フェス', color: 'cyan' },
  OVERSEAS: { fr: 'HORS JAPON', jp: '海外', color: 'yellow' },
};

function statusLabel(ev) {
  if (ev.status === 'PAST') return { txt: 'PASSÉ', cls: 'PAST' };
  if (ev.status === 'TBA') return { txt: 'À CONFIRMER', cls: 'TBA' };
  if (ev.status === 'INFO') return { txt: 'INFO', cls: 'INFO' };
  if (ev.sold >= 1) return { txt: 'SOLD OUT', cls: 'SOLDOUT' };
  if (ev.status === 'LOTTERY') return { txt: 'LOTERIE', cls: 'LOTTERY' };
  return { txt: 'OUVERT', cls: 'OPEN' };
}

function fmtDate(iso) {
  const d = new Date(iso);
  return { day: d.getDate(), m: d.getMonth(), y: d.getFullYear(),
    weekday: ['日','月','火','水','木','金','土'][d.getDay()],
    weekdayFr: ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'][d.getDay()],
    h: d.getHours(), min: d.getMinutes(),
    monthName: ['Jan','Fév','Mar','Avr','Mai','Juin','Juil','Août','Sept','Oct','Nov','Déc'][d.getMonth()],
    monthJp: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'][d.getMonth()],
    raw: d };
}

function Countdown({ iso, big = false }) {
  const [now, setNow] = React.useState(Date.now());
  React.useEffect(() => {
    const i = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(i);
  }, []);
  const ms = new Date(iso).getTime() - now;
  if (ms < 0) return <span className="font-mono" style={{color:'#999'}}>// passé</span>;
  const d = Math.floor(ms / 86400000);
  const h = Math.floor((ms % 86400000) / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  if (big) return (
    <div style={{display:'flex', gap:8, alignItems:'baseline', flexWrap:'wrap'}}>
      {[[d,'jours','日'], [h,'h','時'], [m,'min','分'], [s,'s','秒']].map(([n,fr,jp],i)=>(
        <div key={i} style={{textAlign:'center'}}>
          <div className="font-display" style={{fontSize:34, lineHeight:1, color:'var(--ink)', WebkitTextStroke:'1px transparent'}}>{String(n).padStart(2,'0')}</div>
          <div className="font-mono" style={{fontSize:10, opacity:.7}}>{jp}/{fr}</div>
        </div>
      ))}
    </div>
  );
  return <span className="font-mono">{d}d {String(h).padStart(2,'0')}:{String(m).padStart(2,'0')}:{String(s).padStart(2,'0')}</span>;
}

function EventCard({ ev, group, venue, city, onClick, isFav, onFav, cardStyle }) {
  const f = fmtDate(ev.date);
  const kind = KIND_LABEL[ev.kind] || KIND_LABEL.LIVE;
  const st = statusLabel(ev);
  const flagged = ev.fictional || ev.unverified;
  return (
    <div className={`card event-card ${cardStyle === 'tilted' ? (Math.random()>.5?'tilt-l':'tilt-r') : ''} ${cardStyle||''} ${flagged?'flagged':''}`}
         onClick={onClick}
         style={{
           background: cardStyle === 'color' ? group.color2 : (cardStyle === 'bold' ? group.color : '#fff'),
           color: cardStyle === 'bold' ? '#fff' : 'var(--ink)',
         }}>
      {cardStyle !== 'flat' && <div className="washi pink" style={{top:-12, left:14, transform:'rotate(-3deg)'}}/>}

      <div style={{display:'flex', alignItems:'flex-start', gap:12}}>
        {/* Date block */}
        <div style={{
          minWidth: 64, textAlign:'center',
          border: '2.5px solid var(--ink)', borderRadius: 10,
          background: cardStyle === 'bold' ? '#fff' : group.color, color: '#fff',
          padding: '6px 8px',
        }}>
          <div className="font-mono" style={{fontSize:10, color:'#fff', opacity:.9}}>{f.monthJp}</div>
          <div className="font-display" style={{fontSize:30, lineHeight:1, color:'#fff'}}>{f.day}</div>
          <div className="font-mono" style={{fontSize:10, color:'#fff', opacity:.9}}>{f.weekday}</div>
        </div>
        <div style={{flex:1, minWidth:0}}>
          <div style={{display:'flex', gap:6, marginBottom:6, flexWrap:'wrap'}}>
            <span className={`sticker ${kind.color}`}>● {kind.fr}</span>
            <span className="sticker">{venue ? venue.name : (ev.overseas || '—')}</span>
            {ev.fictional && <span className="sticker" style={{background:'#ff3ea5', color:'#fff'}}>⚠ FICTIF</span>}
            {ev.unverified && <span className="sticker" style={{background:'#fff200', color:'#111'}}>⚠ NON VÉRIFIÉ</span>}
          </div>
          <div className="font-jp" style={{fontSize:18, lineHeight:1.15, marginBottom:2}}>
            {group.nameJp}
          </div>
          <div className="font-display" style={{fontSize:18, lineHeight:1.1, marginBottom:6}}>
            {group.name}
          </div>
          <div style={{fontSize:12, opacity:.85, marginBottom:6}}>
            {ev.title} <span className="font-mono">— {city ? city.name : (ev.overseas || '?')} · {f.h}:{String(f.min).padStart(2,'0')}</span>
          </div>
          <div style={{display:'flex', gap:6, alignItems:'center', flexWrap:'wrap', fontSize:11}}>
            <span><span className={`status-dot status-${st.cls}`}/>
              <span className="font-mono">{st.txt}</span>
            </span>
            <span style={{opacity:.5}}>·</span>
            <span className="font-mono">{ev.priceFrom > 0 ? `¥${ev.priceFrom.toLocaleString()}` : '—'}</span>
            {ev.source && <><span style={{opacity:.5}}>·</span><span className="font-mono" style={{fontSize:9, opacity:.6}}>src: {ev.source}</span></>}
            <span style={{flex:1}}/>
            <button className="fav-btn" onClick={(e)=>{e.stopPropagation(); onFav();}}>
              {isFav ? <span style={{filter:'drop-shadow(0 0 0 #ff3ea5)'}}>💖</span> : '🤍'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MonthCalendar({ events, groups, venues, cities, year, month, setMonth, setYear, onPickEvent, animations }) {
  const first = new Date(year, month, 1);
  const startDay = first.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7) cells.push(null);

  const evByDay = {};
  events.forEach(ev => {
    const f = fmtDate(ev.date);
    if (f.m === month && f.y === year) (evByDay[f.day] = evByDay[f.day] || []).push(ev);
  });

  const today = new Date();
  const isToday = (d) => today.getDate() === d && today.getMonth() === month && today.getFullYear() === year;

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
          <button className="btn sm" onClick={()=>{
            if (month === 0) { setMonth(11); setYear(year-1); } else setMonth(month-1);
          }}>← 前</button>
          <button className="btn sm yellow" onClick={()=>{
            const t = new Date(); setMonth(t.getMonth()); setYear(t.getFullYear());
          }}>今日</button>
          <button className="btn sm" onClick={()=>{
            if (month === 11) { setMonth(0); setYear(year+1); } else setMonth(month+1);
          }}>次 →</button>
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
          const evs = evByDay[d] || [];
          return (
            <div key={i} className={`cal-day ${evs.length?'has-events':''} ${isToday(d)?'today':''}`}
                 onClick={()=> evs[0] && onPickEvent(evs[0].id)}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
                <div className="font-display" style={{fontSize:18, lineHeight:1}}>{d}</div>
                {evs.length>0 && <div style={{
                  fontSize:9, background:'var(--ink)', color:'var(--yellow)',
                  padding:'1px 5px', borderRadius:6, fontFamily:'DotGothic16, monospace'
                }}>×{evs.length}</div>}
              </div>
              <div style={{marginTop:4, display:'flex', flexDirection:'column', gap:2}}>
                {evs.slice(0,3).map(ev=>{
                  const g = groups.find(x=>x.id===ev.group);
                  return <div key={ev.id} style={{
                    fontSize:9, background:g.color, color:'#fff',
                    padding:'1px 4px', borderRadius:3, border:'1px solid var(--ink)',
                    overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap',
                    fontFamily:'DotGothic16, monospace'
                  }}>{g.name}</div>;
                })}
                {evs.length>3 && <div style={{fontSize:9, opacity:.6}}>+{evs.length-3}</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function EventModal({ ev, group, venue, city, onClose, isFav, onFav }) {
  if (!ev) return null;
  const f = fmtDate(ev.date);
  const kind = KIND_LABEL[ev.kind];
  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="card slide-in" onClick={e=>e.stopPropagation()} style={{
        maxWidth: 640, width:'100%', padding:0, overflow:'hidden', position:'relative',
      }}>
        <div className="washi pink" style={{top:-14, left:30, transform:'rotate(-4deg)'}}/>
        <div className="washi cyan" style={{top:-14, right:50, transform:'rotate(6deg)'}}/>

        <button onClick={onClose} className="btn sm" style={{
          position:'absolute', top:14, right:14, zIndex:5, padding:'4px 10px', fontSize:18
        }}>✕</button>

        {/* Hero */}
        <div className="halftone" style={{
          background: `linear-gradient(135deg, ${group.color} 0%, ${group.color2} 100%)`,
          padding: '40px 24px 24px', borderBottom:'3px solid var(--ink)', position:'relative'
        }}>
          <div style={{display:'flex', gap:8, marginBottom:10, flexWrap:'wrap'}}>
            <span className={`sticker ${kind.color}`}>● {kind.jp} / {kind.fr}</span>
            {group.featured && <span className="sticker pink">★ FEATURED</span>}
            {group.tags.map(t => <span key={t} className="sticker ink">{t}</span>)}
          </div>
          <div className="font-jp" style={{fontSize:32, lineHeight:1, color:'#fff', WebkitTextStroke:'2px var(--ink)'}}>
            {group.nameJp}
          </div>
          <div className="font-display" style={{fontSize:42, lineHeight:1, color:'#fff', WebkitTextStroke:'2px var(--ink)', marginTop:4}}>
            {group.name}
          </div>
          <div className="font-display" style={{fontSize:20, marginTop:14, color:'var(--ink)'}}>
            {ev.title}
          </div>
        </div>

        {/* Body */}
        <div style={{padding:'20px 24px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:18}}>
          <div>
            <div className="font-mono" style={{fontSize:10, opacity:.6, marginBottom:4}}>// QUAND / 日時</div>
            <div className="font-display" style={{fontSize:22}}>{f.day} {f.monthName} {f.y}</div>
            <div className="font-jp" style={{fontSize:14}}>({f.weekday}) {f.h}:{String(f.min).padStart(2,'0')} 開演</div>
          </div>
          <div>
            <div className="font-mono" style={{fontSize:10, opacity:.6, marginBottom:4}}>// OÙ / 会場</div>
            <div className="font-display" style={{fontSize:18, lineHeight:1.1}}>{venue ? venue.name : (ev.overseas || '—')}</div>
            {venue && <div className="font-jp" style={{fontSize:13}}>{venue.nameJp}</div>}
            <div className="font-mono" style={{fontSize:11, opacity:.7, marginTop:2}}>
              {venue ? `${city.name} (${city.nameJp}) · cap. ${venue.cap.toLocaleString()}` : (ev.overseas ? `⚠ hors Japon — ${ev.overseas}` : '')}
            </div>
          </div>
          <div style={{gridColumn:'1 / -1'}}>
            <div className="font-mono" style={{fontSize:10, opacity:.6, marginBottom:6}}>// COMPTE À REBOURS / カウントダウン</div>
            <Countdown iso={ev.date} big/>
          </div>
          <div style={{gridColumn:'1 / -1', borderTop:'2px dashed var(--ink)', paddingTop:14}}>
            <div className="font-mono" style={{fontSize:10, opacity:.6, marginBottom:6}}>// LE GROUPE / グループ</div>
            <div style={{fontSize:13, lineHeight:1.5}}>{group.bioFr}</div>
            <div style={{display:'flex', gap:14, marginTop:8, fontSize:11}} className="font-mono">
              <span>👥 {group.members} membres</span>
              <span>📅 depuis {group.debut}</span>
              <span>💗 {group.fans}</span>
            </div>
          </div>
          {(ev.fictional || ev.unverified) && (
            <div style={{gridColumn:'1 / -1', padding:'10px 12px', border:'2.5px dashed var(--ink)', borderRadius:8, background:'#fff200'}}>
              <div className="font-mono" style={{fontSize:11, fontWeight:700, color:'#111'}}>
                {ev.fictional ? '⚠ Cet événement est FICTIF (groupe démo).' : '⚠ Date NON VÉRIFIÉE officiellement — spéculatif.'}
              </div>
              {ev.source && <div className="font-mono" style={{fontSize:10, opacity:.7, marginTop:2}}>source: {ev.source}</div>}
            </div>
          )}
          <div style={{gridColumn:'1 / -1', display:'flex', gap:8, alignItems:'center', flexWrap:'wrap'}}>
            <div>
              <div className="font-mono" style={{fontSize:10, opacity:.6}}>// PRIX</div>
              <div className="font-display" style={{fontSize:24}}>{ev.priceFrom > 0 ? `¥${ev.priceFrom.toLocaleString()}+` : '—'}</div>
            </div>
            <div>
              <div className="font-mono" style={{fontSize:10, opacity:.6}}>// STATUT</div>
              <div className="font-display" style={{fontSize:14}}>
                <span className={`status-dot status-${statusLabel(ev).cls}`}/>
                {statusLabel(ev).txt}
              </div>
            </div>
            {ev.sold !== null && ev.sold !== undefined && (
              <div style={{flex:1}}>
                <div className="font-mono" style={{fontSize:10, opacity:.6, textAlign:'right'}}>{Math.round(ev.sold*100)}% rempli</div>
                <div style={{height:14, border:'2px solid var(--ink)', borderRadius:6, background:'#fff', overflow:'hidden'}}>
                  <div style={{height:'100%', width:`${ev.sold*100}%`, background:`repeating-linear-gradient(45deg, ${group.color}, ${group.color} 8px, ${group.color2} 8px, ${group.color2} 14px)`}}/>
                </div>
              </div>
            )}
          </div>
          <div style={{gridColumn:'1 / -1', display:'flex', gap:8, flexWrap:'wrap'}}>
            <button className="btn pink" onClick={()=>alert('Redirection vers billetterie partenaire (démo)')}>🎫 Réserver / 予約</button>
            <button className="btn yellow" onClick={onFav}>{isFav?'💖 Dans favoris':'🤍 Ajouter favori'}</button>
            <button className="btn cyan" onClick={()=>{
              const ics = makeICS(ev, group, venue);
              const blob = new Blob([ics], {type:'text/calendar'});
              const a = document.createElement('a');
              a.href = URL.createObjectURL(blob); a.download = `${ev.id}.ics`; a.click();
            }}>📅 Export .ics</button>
            <button className="btn" onClick={()=>{
              navigator.clipboard?.writeText(`${group.name} - ${ev.title} @ ${venue.name} (${f.day} ${f.monthName} ${f.y})`);
              alert('Lien copié !');
            }}>🔗 Partager</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function makeICS(ev, group, venue) {
  const d = new Date(ev.date);
  const end = new Date(d.getTime() + 3*3600*1000);
  const fmt = (x) => x.toISOString().replace(/[-:]/g,'').split('.')[0]+'Z';
  return `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
UID:${ev.id}@idol-jp
DTSTAMP:${fmt(new Date())}
DTSTART:${fmt(d)}
DTEND:${fmt(end)}
SUMMARY:${group.name} - ${ev.title}
LOCATION:${venue.name}
END:VEVENT
END:VCALENDAR`;
}

Object.assign(window, { EventCard, MonthCalendar, EventModal, Countdown, fmtDate, KIND_LABEL });
