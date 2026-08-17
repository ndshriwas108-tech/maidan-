import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowLeft, ArrowRight, BadgeCheck, CalendarDays, Check, ChevronDown,
  Clock3, Heart, Home, IndianRupee, Info, MapPin, Minus, Search,
  ShieldCheck, Star, Trophy, Users, WalletCards, Zap
} from 'lucide-react';
import './styles.css';

const turfs = [
  {
    id: 'crossover', name: 'The Crossover Turf', area: 'Dhantoli', distance: '2.4 km',
    price: '₹1,200–1,800', from: 1200, slots: 3, sport: 'Football · Box cricket',
    image: '/images/crossover-demo.jpg', seen: '12 Aug', rating: 4.6, reviews: 38,
    note: 'The surface is even and quick, with clear side netting and strong light across both goal mouths. Parking is tight after 8 pm—two-wheelers fit easily, but cars should use the lane near the hospital. Drinking water is available; changing space is basic and does not have a shower.',
    scores: { Floodlights: 9, 'Grass today': 8, 'Parking truth': 5, Changing: 4, Water: 8, Gear: 7 },
  },
  {
    id: 'wings', name: 'WINGS Sports Centre', area: 'Sadar', distance: '4.8 km',
    price: '₹1,000–1,600', from: 1000, slots: 2, sport: 'Box cricket · Football',
    image: '/images/wings-demo.jpg', seen: '09 Aug', rating: 4.4, reviews: 24,
  },
  {
    id: 'divine', name: 'Divine Sports Turf', area: 'Jaripatka', distance: '6.1 km',
    price: '₹900–1,400', from: 900, slots: 5, sport: 'Football · Box cricket',
    image: '/images/divine-demo.jpg', seen: '05 Aug', rating: 4.2, reviews: 19,
  },
];

const slotGroups = [
  { label: 'Morning', slots: [{ time: '7:00 AM', price: 1200, kind: 'off' }, { time: '8:00 AM', price: 1200, kind: 'off' }, { time: '9:00 AM', price: 1200, kind: 'gone' }] },
  { label: 'Evening', slots: [{ time: '6:00 PM', price: 1600, kind: 'gone' }, { time: '7:00 PM', price: 1800, kind: 'peak' }, { time: '8:00 PM', price: 1800, kind: 'peak' }, { time: '9:00 PM', price: 1600, kind: 'peak' }, { time: '10:00 PM', price: 1400, kind: 'off' }] },
];

function Logo({ onClick }) {
  return <button className="logo" onClick={onClick} aria-label="Maidaan home"><span className="logo-ball">M</span><span>MAIDAAN<small>NAGPUR</small></span></button>;
}

function PrototypeBanner() {
  return <div className="prototype"><Info size={14} /> UI prototype · sample availability and demo images, not scout-verified listings</div>;
}

function Header({ navigate }) {
  return <>
    <PrototypeBanner />
    <header className="header">
      <Logo onClick={() => navigate('home')} />
      <nav><button onClick={() => navigate('home')}>Find a turf</button><button>Open games</button><button>Orange Box League</button></nav>
      <button className="location"><MapPin size={16} /> Nagpur <ChevronDown size={14} /></button>
    </header>
  </>;
}

function SearchPanel() {
  const [sport, setSport] = useState('Football');
  return <div className="search-panel">
    <div className="search-top"><span><Search size={18} /> Find a live slot</span><span className="live-dot">Nagpur · live</span></div>
    <div className="search-fields">
      <label><span>SPORT</span><select value={sport} onChange={e => setSport(e.target.value)}><option>Football</option><option>Box cricket</option><option>Multi-sport</option></select></label>
      <label><span>AREA</span><select><option>Near me</option><option>Dhantoli</option><option>Jaripatka</option><option>KT Nagar</option></select></label>
      <label><span>DATE</span><button><CalendarDays size={17} /> Tonight</button></label>
      <label><span>TIME</span><button><Clock3 size={17} /> After 7 PM</button></label>
      <button className="search-button"><Search size={19} /><span>Show live turfs</span></button>
    </div>
  </div>;
}

function TurfCard({ turf, navigate }) {
  const [saved, setSaved] = useState(false);
  return <article className="turf-card" onClick={() => navigate('detail', turf)}>
    <div className="turf-image-wrap">
      <img src={turf.image} alt={`Demo view representing ${turf.name}; not a scout photograph`} />
      <span className="demo-label">DEMO IMAGE</span>
      <button className={`heart ${saved ? 'saved' : ''}`} aria-label="Save turf" onClick={e => { e.stopPropagation(); setSaved(!saved); }}><Heart size={20} fill={saved ? 'currentColor' : 'none'} /></button>
      <span className="slot-pill"><Zap size={13} fill="currentColor" /> {turf.slots} left tonight</span>
    </div>
    <div className="turf-card-body">
      <div className="card-eyebrow"><span>{turf.sport}</span><span><Star size={14} fill="currentColor" /> {turf.rating} <em>({turf.reviews})</em></span></div>
      <h3>{turf.name}</h3>
      <p className="area"><MapPin size={15} /> {turf.area} · {turf.distance}</p>
      <div className="card-footer">
        <div className="seen"><BadgeCheck size={18} /><span><small>DEMO BADGE</small>Seen {turf.seen}</span></div>
        <strong>{turf.price}<small>/ hour</small></strong>
      </div>
    </div>
  </article>;
}

function OpenGame({ time, place, seats, sport }) {
  return <article className="game-card">
    <div className="game-date"><strong>18</strong><span>AUG</span></div>
    <div className="game-info"><span className="level">INTERMEDIATE</span><h3>{sport}</h3><p>{time} · {place}</p><div className="players"><span>AK</span><span>RJ</span><span>+{seats}</span> seats open</div></div>
    <div className="game-price"><strong>₹240</strong><span>/ player</span><button>View game <ArrowRight size={15} /></button></div>
  </article>;
}

function HomePage({ navigate }) {
  return <main>
    <section className="hero shell">
      <div className="hero-copy"><p className="kicker">NAGPUR'S VERIFIED TURF BOOKER</p><h1>Actually free.<br/><em>Actually looks like this.</em></h1><p>Every ground visited by a Maidaan scout. Pick a live slot, pay by UPI, walk in with a code.</p></div>
      <div className="hero-stamp"><span>SEEN</span><strong>THIS<br/>MONTH</strong><small>BY A HUMAN</small></div>
      <SearchPanel />
    </section>

    <section className="section shell">
      <div className="section-head"><div><p className="kicker">DON'T START ANOTHER WHATSAPP POLL</p><h2>Filling up tonight</h2></div><button>All Nagpur turfs <ArrowRight size={17}/></button></div>
      <div className="turf-grid">{turfs.map(t => <TurfCard key={t.id} turf={t} navigate={navigate} />)}</div>
    </section>

    <section className="trust-band">
      <div className="shell trust-grid"><div><span>01</span><h3>We ride there.</h3><p>Day and night photographs taken by our scout—not sent by the owner.</p></div><div><span>02</span><h3>We score honestly.</h3><p>Lights, grass, parking, changing, water and gear. A 3 stays a 3.</p></div><div><span>03</span><h3>You book once.</h3><p>Live slot, UPI and gate code. After that, the owner can keep you as a regular.</p></div></div>
    </section>

    <section className="section shell games-section">
      <div className="section-head"><div><p className="kicker">SHORT A COUPLE OF SHIRTS?</p><h2>Open games near you</h2></div><button>Browse all games <ArrowRight size={17}/></button></div>
      <div className="games-grid"><OpenGame sport="5-a-side football" time="8:00 PM" place="Dhantoli" seats="2"/><OpenGame sport="Box cricket" time="9:00 PM" place="Jaripatka" seats="3"/></div>
    </section>

    <section className="league-strip"><div className="shell"><div><Trophy size={28}/><span>THE ORANGE BOX LEAGUE</span></div><h2>One city. Eight teams.<br/>No soft fixtures.</h2><button>Register your team <ArrowRight size={17}/></button></div></section>
  </main>;
}

function Score({ label, score }) {
  return <div className="score-row"><div><span>{label}</span><strong>{score}/10</strong></div><div className="score-track"><i style={{width: `${score * 10}%`}} /></div></div>;
}

function DetailPage({ turf, navigate, selected, setSelected }) {
  const t = turf || turfs[0];
  return <main className="detail-page">
    <div className="shell breadcrumb"><button onClick={() => navigate('home')}><ArrowLeft size={17}/> All turfs</button><span>Nagpur / {t.area} / {t.name}</span></div>
    <section className="detail-hero shell">
      <div className="detail-photo"><img src={t.image} alt={`Demo view representing ${t.name}; not a scout photograph`} /><span className="demo-label">DEMO IMAGE · NOT A SCOUT PHOTO</span><button className="all-photos">View all 8 photos</button></div>
      <div className="detail-intro">
        <div className="detail-tags"><span>{t.sport}</span><span><Star size={14} fill="currentColor"/> {t.rating} ({t.reviews})</span></div>
        <h1>{t.name}</h1><p className="detail-area"><MapPin size={17}/>{t.area}, Nagpur · {t.distance} away</p>
        <div className="verified-card"><BadgeCheck size={29}/><div><small>DEMO VERIFICATION BADGE</small><strong>Seen {t.seen} 2026</strong><p>Sample content for the product prototype.</p></div></div>
        <div className="price-line"><span>From</span><strong>₹{t.from.toLocaleString('en-IN')}</strong><span>/ hour</span></div>
      </div>
    </section>

    <div className="detail-layout shell">
      <div className="detail-content">
        <section className="detail-section"><p className="kicker">THE HONEST SCORECARD</p><h2>What it's like today</h2><div className="scores">{Object.entries(t.scores || turfs[0].scores).map(([k,v]) => <Score key={k} label={k} score={v}/>)}</div></section>
        <section className="field-note"><span>FIELD NOTE · MAIDAAN SCOUT</span><p>“{t.note || turfs[0].note}”</p><small>Prototype note · Scout identity will appear after a real visit.</small></section>
        <section className="detail-section slot-section"><p className="kicker">LIVE AVAILABILITY</p><h2>Pick your hour</h2><div className="date-tabs"><button className="active"><small>TODAY</small>Mon, 17 Aug</button><button><small>TOMORROW</small>Tue, 18 Aug</button><button><small>WED</small>19 Aug</button></div>
          <div className="slot-legend"><span><i className="off"/>Off-peak</span><span><i className="peak"/>Peak</span><span><i className="gone"/>Gone</span></div>
          {slotGroups.map(group => <div className="slot-group" key={group.label}><h4>{group.label}</h4><div className="slots">{group.slots.map(slot => <button key={slot.time} disabled={slot.kind === 'gone'} onClick={() => setSelected(slot)} className={`${slot.kind} ${selected?.time === slot.time ? 'selected' : ''}`}><span>{slot.time}</span><strong>₹{slot.price.toLocaleString('en-IN')}</strong>{selected?.time === slot.time && <Check size={16}/>}</button>)}</div></div>)}
        </section>
      </div>
      <aside className="booking-card"><p>MONDAY · 17 AUGUST</p>{selected ? <><h3>{selected.time} – {selected.time.replace(/^(\d+):/, (_,n) => `${Number(n)+1}:`)}</h3><span>1 hour · Main turf</span><div className="mini-total"><span>Turf price</span><strong>₹{selected.price.toLocaleString('en-IN')}</strong></div><button className="primary" onClick={() => navigate('checkout', t)}>Continue to checkout <ArrowRight size={17}/></button><small><ShieldCheck size={14}/> Held for 5 minutes at checkout</small></> : <><h3>Choose a live slot</h3><span>You'll see the full price before paying.</span><button className="primary muted">Select a time below</button></>}</aside>
    </div>
    {selected && <div className="mobile-bookbar"><div><small>{selected.time} · 1 hour</small><strong>₹{selected.price.toLocaleString('en-IN')}</strong></div><button onClick={() => navigate('checkout', t)}>Continue <ArrowRight size={17}/></button></div>}
  </main>;
}

function CheckoutPage({ turf, selected, navigate }) {
  const t = turf || turfs[0]; const slot = selected || {time:'8:00 PM',price:1800};
  const gst = 5.22; const total = slot.price + 29 + gst;
  const [split, setSplit] = useState(false); const [players, setPlayers] = useState(6); const [paid, setPaid] = useState(false);
  if (paid) return <main className="confirmation shell"><div className="success-mark"><Check size={34}/></div><p className="kicker">BOOKING CONFIRMED</p><h1>You're on the maidaan.</h1><p>Your gate code and booking details are ready. In production, both you and the owner receive this on WhatsApp.</p><div className="gate-code"><span>GATE CODE</span><strong>NGP-4821</strong></div><div className="confirm-details"><div><Clock3/><span><small>MONDAY, 17 AUGUST</small>{slot.time} · 1 hour</span></div><div><MapPin/><span><small>TURF</small>{t.name}, {t.area}</span></div></div><button className="primary" onClick={() => navigate('home')}>Back to home</button></main>;
  return <main className="checkout-page shell">
    <button className="back" onClick={() => navigate('detail', t)}><ArrowLeft size={18}/> Back to slots</button>
    <div className="checkout-title"><p className="kicker">SECURE CHECKOUT</p><h1>One tap from the turf.</h1><span><ShieldCheck size={16}/> Your slot is held for <strong>04:42</strong></span></div>
    <div className="checkout-grid"><div className="checkout-main">
      <section className="checkout-block"><div className="number">1</div><div className="block-content"><h2>Your details</h2><label>WHATSAPP NUMBER<div className="phone-input"><span>+91</span><input type="tel" inputMode="numeric" placeholder="98765 43210" /></div></label><p>We'll send the gate code and reminder here.</p></div></section>
      <section className="checkout-block"><div className="number">2</div><div className="block-content"><h2>Pay your way</h2><label className="payment-option selected"><span className="upi">UPI</span><div><strong>UPI · Recommended</strong><small>Google Pay, PhonePe, BHIM or any UPI app</small></div><Check size={18}/></label><label className="payment-option"><WalletCards size={23}/><div><strong>Debit / credit card</strong><small>Card MDR added to player total</small></div><span className="radio"/></label>
      <label className="split-toggle"><div><Users size={20}/><span><strong>Split with the squad</strong><small>Send everyone their UPI link</small></span></div><input type="checkbox" checked={split} onChange={e => setSplit(e.target.checked)}/><i/></label>
      {split && <div className="split-panel"><span>How many players?</span><div><button onClick={() => setPlayers(Math.max(2, players-1))}><Minus size={16}/></button><strong>{players}</strong><button onClick={() => setPlayers(Math.min(12, players+1))}>+</button></div><p>₹{Math.ceil(total/players)} each · Captain pays any remainder</p></div>}
      </div></section>
    </div><aside className="order-card"><img src={t.image} alt="Demo turf image"/><div className="order-turf"><span>MONDAY · 17 AUGUST</span><h3>{t.name}</h3><p>{slot.time} · 1 hour · {t.area}</p></div><div className="costs"><p><span>Turf slot</span><strong>₹{slot.price.toLocaleString('en-IN')}</strong></p><p><span>Maidaan desk fee <Info size={13}/></span><strong>₹29.00</strong></p><p><span>GST (18% on fee only)</span><strong>₹{gst.toFixed(2)}</strong></p></div><div className="grand-total"><span>Total</span><strong>₹{total.toLocaleString('en-IN',{minimumFractionDigits:2})}</strong></div><button className="primary pay" onClick={() => setPaid(true)}><span>Pay securely with UPI</span><strong>₹{total.toLocaleString('en-IN',{minimumFractionDigits:2})}</strong></button><small><ShieldCheck size={14}/> Free cancellation until 6 hours before</small></aside></div>
  </main>;
}

function BottomNav({ page, navigate }) {
  return <nav className="bottom-nav"><button className={page==='home'?'active':''} onClick={() => navigate('home')}><Home/><span>Home</span></button><button className={page==='detail'?'active':''} onClick={() => navigate('detail', turfs[0])}><Search/><span>Turfs</span></button><button><Users/><span>Games</span></button><button><Trophy/><span>League</span></button><button><IndianRupee/><span>Owners</span></button></nav>;
}

function App() {
  const [page, setPage] = useState('home'); const [turf, setTurf] = useState(turfs[0]); const [selected, setSelected] = useState(null);
  const navigate = (next, item) => { if(item) setTurf(item); setPage(next); window.scrollTo({top:0,behavior:'smooth'}); };
  useEffect(() => { const fn = () => { const p = location.hash.slice(1); if(['home','detail','checkout'].includes(p)) setPage(p); }; fn(); addEventListener('hashchange', fn); return () => removeEventListener('hashchange', fn); }, []);
  useEffect(() => { if(location.hash !== `#${page}`) history.replaceState(null,'',`#${page}`); }, [page]);
  return <><Header navigate={navigate}/>{page==='home' && <HomePage navigate={navigate}/>} {page==='detail' && <DetailPage turf={turf} navigate={navigate} selected={selected} setSelected={setSelected}/>} {page==='checkout' && <CheckoutPage turf={turf} selected={selected} navigate={navigate}/>}<BottomNav page={page} navigate={navigate}/></>;
}

createRoot(document.getElementById('root')).render(<App />);
