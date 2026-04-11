'use client';

import { useState, useEffect, useRef } from 'react';

interface CommodityRate {
  name: string;
  unit: string;
  price: string;
  change: number;
}

const cssStyles = `
  @keyframes floatY {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-16px); }
  }
  @keyframes marquee {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes radarPing {
    0%   { transform: scale(1); opacity: 0.9; }
    100% { transform: scale(4.5); opacity: 0; }
  }
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes pulseBorder {
    0%, 100% { box-shadow: 0 0 0   2px rgba(34,197,94,0.25); }
    50%       { box-shadow: 0 0 20px 6px rgba(34,197,94,0.55); }
  }
  @keyframes shipSail {
    0%   { transform: translateX(0);     opacity: 0; }
    4%   { opacity: 1; }
    92%  { opacity: 1; }
    100% { transform: translateX(110vw); opacity: 0; }
  }
  @keyframes fadeRoute {
    0%   { opacity: 0; }
    100% { opacity: 0.12; }
  }
  @keyframes barWave {
    0%, 100% { height: 3px; }
    50%       { height: 18px; }
  }

  .marquee-inner        { animation: marquee 34s linear infinite; will-change: transform; }
  .marquee-inner:hover  { animation-play-state: paused; }
  .anim-floatY          { animation: floatY 4s ease-in-out infinite; }
  .anim-ship            { animation: shipSail 30s linear 6s infinite; }
  .anim-radarPing       { animation: radarPing 2s ease-out infinite; }
  .anim-fadeSlideUp     { animation: fadeSlideUp 0.7s ease forwards; }
  .anim-glow            { animation: pulseBorder 2.6s ease-in-out infinite; }
  .anim-fadeRoute       { animation: fadeRoute 3s ease forwards; opacity: 0; }

  .bar { display:inline-block; width:3px; background:#22c55e; border-radius:2px;
         margin:0 1px; animation: barWave 1.2s ease-in-out infinite; }
  .bar:nth-child(2) { animation-delay:0.15s; }
  .bar:nth-child(3) { animation-delay:0.30s; }
  .bar:nth-child(4) { animation-delay:0.45s; }
  .bar:nth-child(5) { animation-delay:0.60s; }
`;

const commodityRates: CommodityRate[] = [
  { name: 'Rice (IR 64)',    unit: '/qtl', price: '\u20b92,180',  change:  1.2  },
  { name: 'Pepper (Black)',  unit: '/MT',  price: '\u20b955,000', change:  0.8  },
  { name: 'Maize',           unit: '/qtl', price: '\u20b91,890',  change: -0.4  },
  { name: 'Sugar (S30)',     unit: '/qtl', price: '\u20b93,640',  change:  0.6  },
  { name: 'Copper Cathode',  unit: '/MT',  price: '$8,942',       change:  0.3  },
  { name: 'Aluminium Ingot', unit: '/MT',  price: '$2,350',       change: -0.9  },
  { name: 'Palm Oil (CPO)',  unit: '/qtl', price: '\u20b98,800',  change:  1.5  },
  { name: 'Teak (Grade A)',  unit: '/CBM', price: '$920',         change:  0.0  },
  { name: 'Cashew',          unit: '/kg',  price: '\u20b9450',    change:  5.89 },
];

const tradeActivities = [
  { flag: '🇨🇳', text: 'Rice \u00b7 500 MT \u00b7 Booked \u2192 Guangzhou',          time: 'just now'  },
  { flag: '🇩🇪', text: 'Copper Cathode \u00b7 20 MT \u00b7 Shipped \u2192 Hamburg',   time: '2 min ago' },
  { flag: '🇸🇬', text: 'Pepper \u00b7 5 MT \u00b7 Confirmed \u2192 Singapore',        time: '4 min ago' },
  { flag: '🇦🇪', text: 'Cashew \u00b7 10 MT \u00b7 Delivered \u2192 Dubai',           time: '6 min ago' },
  { flag: '🇳🇱', text: 'Aluminium \u00b7 25 MT \u00b7 Loaded at Kakinada Port',       time: '9 min ago' },
  { flag: '🇲🇾', text: 'Palm Oil \u00b7 100 MT \u00b7 FOB Confirmed \u2190 Malaysia', time: '11 min ago'},
  { flag: '🇬🇧', text: 'Teak A \u00b7 80 CBM \u00b7 Vessel at Vizag Port',           time: '14 min ago'},
  { flag: '🇯🇵', text: 'Sugar S30 \u00b7 200 MT \u00b7 Customs Cleared \u2192 Tokyo', time: '18 min ago'},
];

const WA = 'https://wa.me/918838442155';

export default function Home() {
  const [showQuoteForm,  setShowQuoteForm]  = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [agriOpen,       setAgriOpen]       = useState(false);
  const [nonAgriOpen,    setNonAgriOpen]    = useState(false);
  const [logisticsOpen,  setLogisticsOpen]  = useState(false);
  const [liveActivity,   setLiveActivity]   = useState(0);
  const [actVisible,     setActVisible]     = useState(true);
  const [typeText,       setTypeText]       = useState('');
  const [flashRow,       setFlashRow]       = useState<number | null>(null);
  const [statsCounts,    setStatsCounts]    = useState({ cats: 0, comm: 0 });
  const [statsStarted,   setStatsStarted]   = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const phrase = 'From Farm Gate to Destination Port.';
    let i = 0;
    const t = setInterval(() => { setTypeText(phrase.slice(0, ++i)); if (i >= phrase.length) clearInterval(t); }, 55);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setActVisible(false);
      setTimeout(() => { setLiveActivity(p => (p + 1) % tradeActivities.length); setActVisible(true); }, 260);
    }, 3600);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (statsStarted) return;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      setStatsStarted(true);
      let s = 0;
      const t = setInterval(() => {
        s++;
        setStatsCounts({ cats: Math.min(Math.round((s / 15) * 2), 2), comm: Math.min(Math.round((s / 15) * 50), 50) });
        if (s >= 15) clearInterval(t);
      }, 70);
    }, { threshold: 0.6 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, [statsStarted]);

  useEffect(() => {
    const t = setInterval(() => {
      const row = Math.floor(Math.random() * commodityRates.length);
      setFlashRow(row);
      setTimeout(() => setFlashRow(null), 900);
    }, 2800);
    return () => clearInterval(t);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false); setAgriOpen(false); setNonAgriOpen(false); setLogisticsOpen(false);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: cssStyles }} />
      <div className="bg-[#0d1f0d] text-white min-h-screen overflow-x-hidden">

        {/* AMBIENT ORBS */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-green-900/15 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/2 -right-40 w-96 h-96 bg-green-800/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }} />
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '6s' }} />
          <div className="anim-ship absolute top-[52%] text-3xl" style={{ left: '-80px' }}>&#x1F6A2;</div>
        </div>

        {/* FLOATING WHATSAPP BUTTON */}
        <a href={WA} target="_blank" rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white pl-4 pr-5 py-3.5 rounded-full shadow-2xl font-black text-sm hover:scale-110 transition-transform anim-glow">
          <span className="text-xl leading-none">&#x1F4F1;</span>
          Chat on WhatsApp
        </a>

        <div className="relative z-10">
          {/* NAV */}
          <nav className="fixed w-full bg-[#0a1a0a]/95 backdrop-blur-md border-b border-green-900/30 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <button onClick={() => scrollTo('hero')} className="flex items-center hover:opacity-80 transition">
                  <span className="text-2xl font-black text-white tracking-tight">TRADE</span>
                  <span className="text-2xl font-black text-green-400 tracking-tight">FOKUS</span>
                </button>
                <div className="hidden lg:flex items-center gap-7 text-sm font-medium">
                  <button onClick={() => scrollTo('hero')} className="text-gray-400 hover:text-green-400 transition">Home</button>
                  <div className="relative" onMouseEnter={() => setAgriOpen(true)} onMouseLeave={() => setAgriOpen(false)}>
                    <button className="text-gray-400 hover:text-green-400 transition flex items-center gap-1">Agri Commodities <span className="text-[10px]">&#9660;</span></button>
                    {agriOpen && (
                      <div className="absolute top-full left-0 mt-1 w-52 bg-[#0d1f0d] border border-green-800/50 rounded-xl shadow-2xl py-2 z-50">
                        {['Rice & Grains','Spices & Seasonings','Edible Oils & Oilseeds','Sugar & Sweeteners','Cocoa & Cashew'].map(i => (
                          <button key={i} onClick={() => scrollTo('agri')} className="block w-full text-left px-4 py-2.5 text-sm text-gray-300 hover:text-green-400 hover:bg-green-900/30 transition">{i}</button>
                        ))}
                        <div className="border-t border-green-900/30 mt-1 pt-2 px-4">
                          <button onClick={() => scrollTo('agri')} className="text-green-400 text-xs font-bold">View All Agri &#8594;</button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="relative" onMouseEnter={() => setNonAgriOpen(true)} onMouseLeave={() => setNonAgriOpen(false)}>
                    <button className="text-gray-400 hover:text-green-400 transition flex items-center gap-1">Non-Agri <span className="text-[10px]">&#9660;</span></button>
                    {nonAgriOpen && (
                      <div className="absolute top-full left-0 mt-1 w-52 bg-[#0d1f0d] border border-green-800/50 rounded-xl shadow-2xl py-2 z-50">
                        {['Metals (Copper, Aluminium)','Minerals & Ores','Industrial Chemicals','Timber & Wood Products','Energy Commodities'].map(i => (
                          <button key={i} onClick={() => scrollTo('non-agri')} className="block w-full text-left px-4 py-2.5 text-sm text-gray-300 hover:text-green-400 hover:bg-green-900/30 transition">{i}</button>
                        ))}
                        <div className="border-t border-green-900/30 mt-1 pt-2 px-4">
                          <button onClick={() => scrollTo('non-agri')} className="text-green-400 text-xs font-bold">View All Non-Agri &#8594;</button>
                        </div>
                      </div>
                    )}
                  </div>
                  <button onClick={() => scrollTo('rates')} className="text-gray-400 hover:text-green-400 transition">Market Prices</button>
                  <div className="relative" onMouseEnter={() => setLogisticsOpen(true)} onMouseLeave={() => setLogisticsOpen(false)}>
                    <button className="text-gray-400 hover:text-green-400 transition flex items-center gap-1">Logistics <span className="text-[10px]">&#9660;</span></button>
                    {logisticsOpen && (
                      <div className="absolute top-full left-0 mt-1 w-52 bg-[#0d1f0d] border border-green-800/50 rounded-xl shadow-2xl py-2 z-50">
                        {['Inland Freight Listing','Ocean Freight Rates','Warehouse Locator','Live Tracking','Freight Forwarder Directory'].map(i => (
                          <button key={i} onClick={() => scrollTo('logistics')} className="block w-full text-left px-4 py-2.5 text-sm text-gray-300 hover:text-green-400 hover:bg-green-900/30 transition">{i}</button>
                        ))}
                        <div className="border-t border-green-900/30 mt-1 pt-2 px-4">
                          <button onClick={() => scrollTo('logistics')} className="text-amber-400 text-xs font-bold">Book Freight &#8594;</button>
                        </div>
                      </div>
                    )}
                  </div>
                  <button onClick={() => scrollTo('documentation')} className="text-gray-400 hover:text-green-400 transition">Documentation</button>
                  <button onClick={() => scrollTo('about')} className="text-gray-400 hover:text-green-400 transition">About</button>
                </div>
                <div className="flex items-center gap-3">
                  <a href={WA} target="_blank" rel="noopener noreferrer"
                    className="hidden sm:flex items-center gap-1.5 bg-[#25D366] text-white px-3 py-1.5 rounded-full text-xs font-bold hover:bg-[#1fbb59] transition">
                    &#x1F4F1; WhatsApp
                  </a>
                  <button onClick={() => setShowQuoteForm(true)} className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-400 transition font-bold text-sm">Enquiry</button>
                  <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden text-green-400">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </div>
              {mobileMenuOpen && (
                <div className="lg:hidden border-t border-green-900/30 py-4 space-y-1">
                  {[
                    { label: 'Home', id: 'hero' }, { label: '🌾 Agri Commodities', id: 'agri' },
                    { label: '🏭 Non-Agri Commodities', id: 'non-agri' }, { label: '📊 Market Prices', id: 'rates' },
                    { label: '🚢 Logistics', id: 'logistics' }, { label: '📄 Documentation', id: 'documentation' },
                    { label: 'About Us', id: 'about' },
                  ].map(item => (
                    <button key={item.id} onClick={() => scrollTo(item.id)}
                      className="block w-full text-left text-gray-300 py-2.5 px-2 hover:text-green-400 hover:bg-green-900/20 rounded-lg transition text-sm">{item.label}</button>
                  ))}
                  <button onClick={() => { setShowQuoteForm(true); setMobileMenuOpen(false); }}
                    className="block w-full bg-green-500 text-white py-3 rounded-xl font-bold mt-3 text-sm">Send Enquiry</button>
                </div>
              )}
            </div>
          </nav>

          {/* HERO */}
          <section id="hero" className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M-50,200 Q350,80 750,280 T1700,220" stroke="#22c55e" strokeWidth="1.5" fill="none" strokeDasharray="7 5" className="anim-fadeRoute" style={{ animationDelay: '0s' }} />
              <path d="M-50,360 Q300,200 700,400 T1700,360" stroke="#3b82f6" strokeWidth="1" fill="none" strokeDasharray="5 9" className="anim-fadeRoute" style={{ animationDelay: '0.8s' }} />
              <path d="M180,-20 Q560,200 940,100 T1700,310" stroke="#f59e0b" strokeWidth="1" fill="none" strokeDasharray="4 11" className="anim-fadeRoute" style={{ animationDelay: '1.6s' }} />
              <circle r="4" fill="#22c55e" opacity="0.7">
                <animateMotion dur="8s" repeatCount="indefinite" path="M-50,200 Q350,80 750,280 T1700,220" />
              </circle>
              <circle r="3" fill="#3b82f6" opacity="0.6">
                <animateMotion dur="12s" repeatCount="indefinite" begin="3s" path="M-50,360 Q300,200 700,400 T1700,360" />
              </circle>
              <circle r="3" fill="#f59e0b" opacity="0.5">
                <animateMotion dur="10s" repeatCount="indefinite" begin="6s" path="M180,-20 Q560,200 940,100 T1700,310" />
              </circle>
            </svg>
            <div className="max-w-7xl mx-auto relative">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h1 className="text-7xl md:text-8xl font-black leading-none tracking-tight mb-4 anim-fadeSlideUp"
                    style={{ textShadow: '0 0 60px rgba(34,197,94,0.18)' }}>
                    <span className="text-white">TRADE</span><br />
                    <span className="text-green-400" style={{ textShadow: '0 0 40px rgba(34,197,94,0.45)' }}>FOKUS</span>
                  </h1>
                  <p className="text-xl font-bold text-white mb-1">End-to-End Supply Chain Intelligence</p>
                  <p className="text-base text-green-400 font-semibold mb-6 min-h-[1.5rem]">
                    {typeText}<span className="text-green-300 animate-pulse">|</span>
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-lg">
                    A next-generation commodity trading platform bridging buyers and suppliers — farmers, producers, mills, manufacturers — with complete end-to-end trade facilitation under one roof.
                  </p>
                  {/* Live trade activity feed */}
                  <div className="mb-8 flex items-start gap-3 bg-black/50 border border-green-900/40 rounded-xl px-4 py-3 backdrop-blur-sm">
                    <div className="relative flex-shrink-0 mt-1">
                      <div className="w-2.5 h-2.5 bg-green-400 rounded-full" />
                      <div className="absolute inset-0 w-2.5 h-2.5 bg-green-400 rounded-full anim-radarPing" />
                    </div>
                    <div className={`transition-all duration-300 ${actVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                      <p className="text-green-400 text-xs font-black tracking-widest mb-0.5">LIVE TRADE ACTIVITY</p>
                      <p className="text-white text-sm font-semibold">{tradeActivities[liveActivity].flag} {tradeActivities[liveActivity].text}</p>
                      <p className="text-gray-600 text-xs mt-0.5">{tradeActivities[liveActivity].time}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <button onClick={() => scrollTo('agri')}
                      className="bg-green-500 text-white px-7 py-3.5 rounded-lg font-black hover:bg-green-400 transition hover:shadow-lg hover:shadow-green-500/40 transform hover:scale-105 text-sm active:scale-95">
                      AGRI COMMODITIES
                    </button>
                    <button onClick={() => scrollTo('non-agri')}
                      className="border-2 border-amber-500 text-amber-400 px-7 py-3.5 rounded-lg font-black hover:bg-amber-500/10 transition transform hover:scale-105 text-sm active:scale-95">
                      NON-AGRI COMMODITIES
                    </button>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -top-8 -left-4 text-3xl anim-floatY pointer-events-none" style={{ animationDelay: '0s' }}>&#x1F33E;</div>
                  <div className="absolute top-6 -right-4 text-2xl anim-floatY pointer-events-none" style={{ animationDelay: '1.4s' }}>&#x2699;&#xFE0F;</div>
                  <div className="absolute -bottom-6 left-10 text-2xl anim-floatY pointer-events-none" style={{ animationDelay: '2.8s' }}>&#x1F4E6;</div>
                  <div className="absolute bottom-8 -right-2 text-2xl anim-floatY pointer-events-none" style={{ animationDelay: '0.7s' }}>&#x1F69B;</div>
                  <div className="bg-[#162616]/85 border border-green-800/40 rounded-2xl p-8 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-green-400 text-xs font-black tracking-widest uppercase">Platform Highlights</span>
                      <div className="flex items-end gap-px" style={{ height: '18px' }}>
                        <span className="bar" />
                        <span className="bar" />
                        <span className="bar" />
                        <span className="bar" />
                        <span className="bar" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      {[
                        ['🌐', 'Live Market Prices \u2013 Agri & Non-Agri'],
                        ['📦', 'Full Supply Chain Management'],
                        ['🚂', 'Inland & International Freight Listing'],
                        ['📡', 'Real-Time Shipment Tracking'],
                        ['📄', 'End-to-End Trade Documentation'],
                        ['🔍', 'Quality Inspection Coordination'],
                        ['🤖', 'AI Supply & Demand Predictions'],
                        ['🤝', 'Verified Buyer\u2013Supplier Matching'],
                      ].map(([icon, text], i) => (
                        <div key={i}
                          className="flex items-center gap-3 group cursor-default"
                          style={{ animation: `fadeSlideUp 0.5s ease ${i * 0.08}s both` }}>
                          <span className="text-lg transition-transform group-hover:scale-125">{icon}</span>
                          <span className="text-gray-300 text-sm transition-colors group-hover:text-green-400">{text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* STATS with CountUp */}
          <div ref={statsRef} className="py-6 px-4 bg-[#162616]/60 border-y border-green-900/30">
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { val: statsCounts.cats.toString(),  label: 'Commodity Categories' },
                { val: `${statsCounts.comm}+`,       label: 'Commodities Listed'   },
                { val: '360\u00b0',                  label: 'Trade Coverage'        },
                { val: '1',                          label: 'Platform. Everything.' },
              ].map(({ val, label }, i) => (
                <div key={i} className="group cursor-default">
                  <div className="text-3xl font-black text-green-400 group-hover:scale-110 transition-transform tabular-nums"
                    style={{ textShadow: '0 0 20px rgba(34,197,94,0.4)' }}>{val}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* INFINITE MARQUEE TICKER */}
          <div className="py-3 bg-black/60 border-b border-green-900/20 overflow-hidden">
            <div className="flex items-center gap-2 px-4 mb-2">
              <div className="relative flex-shrink-0">
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                <div className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full anim-radarPing" />
              </div>
              <span className="text-green-400 text-xs font-bold tracking-widest whitespace-nowrap">
                LIVE PRICES &middot; NCDEX / MCX / LME / APEDA &middot; Updated every 15 min
              </span>
            </div>
            <div className="overflow-hidden">
              <div className="flex gap-3 marquee-inner" style={{ width: 'max-content' }}>
                {[...commodityRates, ...commodityRates].map((item, i) => (
                  <div key={i}
                    className="flex-shrink-0 flex items-center gap-2 bg-[#162616]/70 px-3 py-1.5 rounded-lg border border-green-900/20 hover:border-green-500/50 transition cursor-default group">
                    <span className="text-white text-xs font-semibold whitespace-nowrap group-hover:text-green-300 transition">{item.name}</span>
                    <span className="text-white text-xs font-bold">{item.price}<span className="text-gray-500 text-[10px]">{item.unit}</span></span>
                    <span className={`text-xs font-bold flex items-center gap-0.5 ${item.change > 0 ? 'text-green-400' : item.change < 0 ? 'text-red-400' : 'text-gray-500'}`}>
                      {item.change > 0 ? '\u25b2' : item.change < 0 ? '\u25bc' : '\u2013'} {Math.abs(item.change).toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* WHAT IS TRADEFOKUS */}
          <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-black mb-3">WHAT IS TRADEFOKUS?</h2>
              <p className="text-gray-500 max-w-3xl mb-12 text-sm leading-relaxed">
                A next-generation commodity trading platform bridging buyers and suppliers &mdash; farmers, producers, mills, manufacturers &mdash; with complete end-to-end trade facilitation under one roof.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {[
                  { label: 'CONNECT',    border: 'border-green-600', bg: 'bg-green-900/40', color: 'text-green-300', icon: '🔗', delay: '0s',   desc: 'Match verified buyers with trusted suppliers, farmers & producers globally.' },
                  { label: 'FACILITATE', border: 'border-amber-600', bg: 'bg-amber-900/20', color: 'text-amber-300', icon: '\u2699\uFE0F', delay: '1.2s', desc: 'Manage documentation, inspections, freight, and compliance in one platform.' },
                  { label: 'DELIVER',    border: 'border-green-400', bg: 'bg-green-800/30', color: 'text-green-200', icon: '🚢', delay: '2.4s', desc: 'Track real-time shipment from source to port or final destination.' },
                ].map((item, i) => (
                  <div key={i} className={`relative border-2 ${item.border} ${item.bg} rounded-xl p-8 hover:scale-105 transition-transform group cursor-default`}>
                    {i > 0 && <span className="hidden md:block absolute -left-5 top-1/2 -translate-y-1/2 text-amber-500 text-2xl font-black">&rarr;</span>}
                    <span className="text-4xl mb-3 block anim-floatY" style={{ animationDelay: item.delay }}>{item.icon}</span>
                    <h3 className={`text-xl font-black tracking-widest ${item.color} mb-3`}>{item.label}</h3>
                    <div className="w-10 h-0.5 bg-green-700 mb-4 group-hover:w-20 transition-all duration-500" />
                    <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* AGRI */}
          <section id="agri" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0a1a0a]">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-2 bg-[#0d1f0d] border border-green-800/40 rounded-2xl p-8">
                  <h2 className="text-5xl font-black text-white leading-none">AGRI</h2>
                  <h2 className="text-5xl font-black text-green-400 leading-none mb-2">COMMODITIES</h2>
                  <p className="text-green-400 italic text-sm mb-8">Farm-Fresh. Compliant. Delivered.</p>
                  <div className="space-y-3">
                    {[
                      { cat: 'GRAINS & CEREALS', items: 'Rice \u00b7 Wheat \u00b7 Maize \u00b7 Millets',         icon: '🌾' },
                      { cat: 'SPICES',           items: 'Pepper \u00b7 Cardamom \u00b7 Turmeric \u00b7 Chilli',  icon: '🌶' },
                      { cat: 'OILSEEDS & OILS',  items: 'Groundnut \u00b7 Sunflower \u00b7 Coconut \u00b7 Palm', icon: '🫒' },
                      { cat: 'CASH CROPS',       items: 'Sugar \u00b7 Cotton \u00b7 Cocoa \u00b7 Cashew',        icon: '🥜' },
                    ].map((c, i) => (
                      <div key={i} className="border border-green-800/40 rounded-lg px-4 py-3 hover:border-green-500/60 hover:bg-green-900/30 transition group cursor-default flex items-start gap-3">
                        <span className="text-xl flex-shrink-0 group-hover:scale-125 transition-transform">{c.icon}</span>
                        <div>
                          <div className="text-green-400 text-xs font-black tracking-widest mb-1">{c.cat}</div>
                          <div className="text-gray-300 text-sm">{c.items}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="lg:col-span-3">
                  <p className="text-green-400 text-xs font-black tracking-widest uppercase mb-6">What You Get on Agri Portal</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { t: 'Live FOB & Local Prices',      d: 'Real-time price feed for all listed agri commodities by market/region.' },
                      { t: 'Buyer-Farmer Direct Connect',  d: 'Bypass middlemen with verified farmer & mill profiles listed on platform.' },
                      { t: 'Grade & Quality Specs',        d: 'Standardized spec tables: moisture, broken %, foreign matter, FSSAI compliance.' },
                      { t: 'Document Pack Generator',      d: 'Auto-generate Phytosanitary, Fumigation, COA, Invoice, Packing List templates.' },
                      { t: 'Pre-Shipment Inspection',      d: 'Coordinate third-party inspection agencies at farm or mill level.' },
                      { t: 'Seasonal Supply Forecast',     d: 'AI-driven seasonal harvest predictions for demand planning.' },
                    ].map((item, i) => (
                      <div key={i} className="border border-green-800/25 rounded-xl p-5 hover:border-green-500/50 hover:bg-green-900/15 hover:-translate-y-1 transition group cursor-default">
                        <h4 className="text-green-300 font-bold text-sm mb-2 group-hover:text-green-200">{item.t}</h4>
                        <p className="text-gray-600 text-xs leading-relaxed">{item.d}</p>
                      </div>
                    ))}
                    <div className="sm:col-span-2 border border-amber-700/30 rounded-xl p-5 hover:bg-amber-900/10 hover:-translate-y-1 transition cursor-default">
                      <h4 className="text-amber-400 font-bold text-sm mb-1">APEDA / FSSAI Compliance Guide</h4>
                      <p className="text-gray-600 text-xs leading-relaxed">Step-by-step regulatory checklist for each commodity export.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* NON-AGRI */}
          <section id="non-agri" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0d1525]">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3 order-2 lg:order-1">
                  <p className="text-blue-400 text-xs font-black tracking-widest uppercase mb-6">What You Get on Non-Agri Portal</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { t: 'LME & Spot Price Tracker',      d: 'Live London Metal Exchange & international spot price updates.' },
                      { t: 'Industrial Buyer Network',       d: 'Verified manufacturers, importers and industrial buyers listed.' },
                      { t: 'Technical Spec Sheets',          d: 'Detailed purity %, grade, packaging specs and test certificates.' },
                      { t: 'Dangerous Goods Compliance',     d: 'MSDS, IMDG, HSN code support for hazardous commodity shipments.' },
                      { t: 'Freight & Bulk Carrier Listing', d: 'Bulk vessel availability, container options and freight rate listings.' },
                      { t: 'Demand Forecasting',             d: 'Sector-level industrial demand analytics for procurement planning.' },
                    ].map((item, i) => (
                      <div key={i} className="border border-blue-800/25 rounded-xl p-5 hover:border-blue-400/40 hover:bg-blue-900/10 hover:-translate-y-1 transition group cursor-default">
                        <h4 className="text-blue-300 font-bold text-sm mb-2 group-hover:text-blue-200">{item.t}</h4>
                        <p className="text-gray-600 text-xs leading-relaxed">{item.d}</p>
                      </div>
                    ))}
                    <div className="sm:col-span-2 border border-amber-700/30 rounded-xl p-5 hover:bg-amber-900/10 hover:-translate-y-1 transition cursor-default">
                      <h4 className="text-amber-400 font-bold text-sm mb-1">Port & Customs Assistance</h4>
                      <p className="text-gray-600 text-xs leading-relaxed">Port clearance docs, HS code filing, and customs agent directory.</p>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-2 bg-[#0d1525] border border-blue-800/40 rounded-2xl p-8 order-1 lg:order-2">
                  <h2 className="text-5xl font-black text-white leading-none">NON-AGRI</h2>
                  <h2 className="text-5xl font-black text-blue-400 leading-none mb-2">COMMODITIES</h2>
                  <p className="text-blue-400 italic text-sm mb-8">Industrial-Grade. Globally Sourced.</p>
                  <div className="space-y-3">
                    {[
                      { cat: 'METALS',      items: 'Copper Cathode \u00b7 Aluminium Ingots \u00b7 Zinc', icon: '🔩' },
                      { cat: 'MINERALS',    items: 'Iron Ore \u00b7 Silica Sand \u00b7 Barite',          icon: '\u26cf\uFE0F' },
                      { cat: 'CHEMICALS',   items: 'Caustic Soda \u00b7 Soda Ash \u00b7 Urea',           icon: '🧪' },
                      { cat: 'WOOD/TIMBER', items: 'Teak \u00b7 Hardwood \u00b7 Wood Pellets',           icon: '🪵' },
                    ].map((c, i) => (
                      <div key={i} className="border border-blue-800/40 rounded-lg px-4 py-3 hover:border-blue-500/60 hover:bg-blue-900/25 transition group cursor-default flex items-start gap-3">
                        <span className="text-xl flex-shrink-0 group-hover:scale-125 transition-transform">{c.icon}</span>
                        <div>
                          <div className="text-amber-400 text-xs font-black tracking-widest mb-1">{c.cat}</div>
                          <div className="text-gray-300 text-sm">{c.items}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SUPPLY CHAIN */}
          <section id="supply-chain" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0a1a0a]">
            <div className="max-w-7xl mx-auto">
              <div className="bg-[#162616] rounded-t-2xl px-8 py-5">
                <h2 className="text-xl md:text-2xl font-black">END-TO-END SUPPLY CHAIN MANAGEMENT</h2>
              </div>
              <div className="bg-white/5 border border-t-0 border-green-900/20 rounded-b-2xl p-8">
                <div className="relative">
                  <div className="hidden md:block absolute top-7 left-7 right-7 h-0.5"
                    style={{ background: 'linear-gradient(90deg,#14532d,#ca8a04,#1e3a5f)', animation: 'fadeSlideUp 1.5s ease forwards' }} />
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-6 mb-8 relative z-10">
                    {[
                      { num: '01', label: 'PROCUREMENT',   color: 'bg-green-900',  ring: 'ring-green-700',  icon: '🤝' },
                      { num: '02', label: 'INSPECTION',    color: 'bg-green-700',  ring: 'ring-green-500',  icon: '🔍' },
                      { num: '03', label: 'DOCUMENTATION', color: 'bg-green-500',  ring: 'ring-green-300',  icon: '📄' },
                      { num: '04', label: 'LOGISTICS',     color: 'bg-amber-600',  ring: 'ring-amber-400',  icon: '🚛' },
                      { num: '05', label: 'LIVE TRACKING', color: 'bg-orange-600', ring: 'ring-orange-400', icon: '📡' },
                      { num: '06', label: 'DELIVERY',      color: 'bg-blue-800',   ring: 'ring-blue-500',   icon: '🏁' },
                    ].map((step, i) => (
                      <div key={i} className="text-center group cursor-default"
                        style={{ animation: `fadeSlideUp 0.5s ease ${i * 0.12}s both` }}>
                        <div className={`w-14 h-14 ${step.color} ring-2 ${step.ring} ring-offset-2 ring-offset-transparent rounded-full flex items-center justify-center text-xl mx-auto mb-3 group-hover:scale-125 transition-transform shadow-lg`}>
                          {step.icon}
                        </div>
                        <div className="text-xs font-black tracking-wide text-gray-300 mb-2">{step.label}</div>
                        <div className="text-[10px] text-gray-600">Step {step.num}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-[#0d1f0d] border border-green-900/30 rounded-xl p-4 text-center">
                  <p className="text-green-300 text-sm italic">VersaVerde acts as your single point of contact across all 6 stages &mdash; eliminating coordination gaps, reducing delays, and minimising trade risk.</p>
                </div>
              </div>
            </div>
          </section>

          {/* LIVE MARKET INTELLIGENCE */}
          <section id="rates" className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
                <div>
                  <h2 className="text-3xl font-black">LIVE MARKET INTELLIGENCE</h2>
                  <p className="text-green-400 text-sm mt-1 font-semibold">Real-Time &middot; AI-Powered &middot; Transparent</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                    <div className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full anim-radarPing" />
                  </div>
                  <span className="text-gray-600 text-xs ml-1">Updated every 15 min &middot; NCDEX, MCX, LME, APEDA</span>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3 bg-[#162616]/50 border border-green-900/30 rounded-2xl p-6">
                  <p className="text-green-400 text-xs font-black tracking-widest uppercase mb-5">Live Commodity Price Feed</p>
                  <div className="space-y-1">
                    {commodityRates.map((item, i) => (
                      <div key={i}
                        className="flex items-center justify-between py-3 px-3 rounded-lg hover:bg-green-900/25 transition border-b border-green-900/10 last:border-0 cursor-default"
                        style={{ backgroundColor: flashRow === i ? 'rgba(34,197,94,0.12)' : '', transition: 'background-color 0.5s' }}>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-300 text-sm">{item.name}</span>
                          {flashRow === i && <span className="text-green-400 text-xs animate-pulse font-bold">&oplus; live</span>}
                        </div>
                        <div className="flex items-center gap-5">
                          <span className="text-white font-bold text-sm">{item.price}<span className="text-gray-600 text-xs ml-0.5">{item.unit}</span></span>
                          <span className={`text-sm font-bold w-16 text-right flex items-center gap-0.5 justify-end ${item.change > 0 ? 'text-green-400' : item.change < 0 ? 'text-red-400' : 'text-gray-500'}`}>
                            {item.change > 0 ? '\u25b2' : item.change < 0 ? '\u25bc' : '\u2013'} {Math.abs(item.change).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="lg:col-span-2 space-y-4">
                  {[
                    { accent: 'border-green-500',  icon: '🤖', t: 'Supply & Demand Prediction', d: 'AI models trained on 5-year trade data, weather patterns, and seasonal cycles forecast commodity availability and price direction 30\u201390 days ahead.' },
                    { accent: 'border-amber-500',  icon: '📊', t: 'Market Sentiment Indicator',  d: 'Aggregated signals from government policies, global trade news, and commodity exchange movements \u2014 giving a real-time sentiment score.' },
                    { accent: 'border-blue-500',   icon: '🔔', t: 'Price Alert Engine',          d: 'Set custom price thresholds and receive instant SMS/email alerts when your target commodity hits your buy or sell trigger price.' },
                    { accent: 'border-orange-500', icon: '📈', t: 'Historical Trend Charts',     d: 'Interactive 1W/1M/6M/1Y price charts with volume overlay and moving averages for informed procurement decisions.' },
                  ].map((item, i) => (
                    <div key={i}
                      className={`border-l-4 ${item.accent} bg-[#162616]/40 rounded-r-xl p-5 hover:bg-green-900/15 hover:translate-x-1 transition group cursor-default`}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">{item.icon}</span>
                        <h4 className="text-white font-bold text-sm">{item.t}</h4>
                      </div>
                      <p className="text-gray-600 text-xs leading-relaxed">{item.d}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* PROBLEMS WE SOLVE */}
          <section id="problems" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0a1a0a]">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row justify-between items-start mb-10 gap-2">
                <h2 className="text-3xl font-black">PROBLEMS WE SOLVE</h2>
                <span className="text-green-400 text-sm italic font-semibold">Before &amp; After Tradefokus</span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3 space-y-3">
                  <div className="grid grid-cols-2 gap-4 mb-2">
                    <div className="bg-red-900/30 border border-red-800/40 rounded-lg px-4 py-2.5 text-center">
                      <span className="text-red-400 font-black text-xs tracking-wide">&#x2717; WITHOUT TRADEFOKUS</span>
                    </div>
                    <div className="bg-green-900/30 border border-green-700/40 rounded-lg px-4 py-2.5 text-center">
                      <span className="text-green-400 font-black text-xs tracking-wide">&#x2713; WITH TRADEFOKUS</span>
                    </div>
                  </div>
                  {[
                    { w: 'Buyers rely on unknown middlemen with no accountability',    t: 'Verified supplier network with ratings, trade history & certifications' },
                    { w: 'Pricing opacity \u2014 no real-time market reference',       t: 'Live commodity price feed updated every 15 mins from NCDEX, MCX, LME' },
                    { w: 'Documentation errors cause shipment delays & penalties',     t: 'Auto-generated document packs with compliance checklists' },
                    { w: 'No visibility into shipment status after booking',           t: 'Real-time inland GPS + AIS vessel tracking dashboard' },
                    { w: 'Manual freight booking \u2014 time-consuming & expensive',   t: 'Compare inland + ocean freight rates in one click' },
                    { w: 'Supply shortages surprise buyers, lead to production halts', t: 'AI 30\u201390 day supply forecasting and price alerts' },
                  ].map((row, i) => (
                    <div key={i} className="grid grid-cols-2 gap-4 group cursor-default">
                      <div className="bg-red-950/30 border border-red-900/20 rounded-lg px-4 py-3 group-hover:border-red-700/40 transition">
                        <p className="text-gray-500 text-xs leading-relaxed">{row.w}</p>
                      </div>
                      <div className="bg-green-950/30 border border-green-900/20 rounded-lg px-4 py-3 group-hover:border-green-700/40 transition">
                        <p className="text-gray-300 text-xs leading-relaxed">{row.t}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  <p className="text-gray-600 text-xs font-black tracking-widest uppercase mb-4">Impact Metrics</p>
                  {[['40%','Faster Documentation'],['25%','Lower Freight Cost'],['60%','Fewer Trade Disputes'],['3x','More Supplier Options'],['90%','On-Time Delivery']].map(([val, label], i) => (
                    <div key={i}
                      className="bg-[#162616]/60 border border-green-900/30 rounded-xl p-4 text-center hover:border-green-600/60 hover:bg-green-900/20 hover:scale-105 transition group cursor-default anim-glow">
                      <div className="text-3xl font-black text-green-400 group-hover:scale-110 transition-transform"
                        style={{ textShadow: '0 0 16px rgba(34,197,94,0.4)' }}>{val}</div>
                      <div className="text-xs text-gray-600 mt-1">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* FREIGHT & LOGISTICS */}
          <section id="logistics" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0d1525]/80">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-black mb-10">FREIGHT & LOGISTICS MANAGEMENT</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="bg-[#162616] border border-green-800/40 rounded-t-xl px-6 py-4">
                    <h3 className="text-green-400 font-black text-sm tracking-widest">&#x1F69B; INLAND LOGISTICS</h3>
                  </div>
                  <div className="border border-t-0 border-green-900/20 rounded-b-xl divide-y divide-green-900/10">
                    {[
                      { t: 'Truck & Container Booking', d: 'Compare available trucks, mini-trucks & containers from verified transport partners across AP, Telangana, Tamil Nadu.', icon: '🚛' },
                      { t: 'Warehouse Locator',         d: 'Find bonded and cold-storage warehouses near origin or port \u2014 with capacity, certification and rate comparison.',  icon: '🏪' },
                      { t: 'Inland Freight Rate Board', d: 'Live freight rates from origin to nearest rail head, port, or CFS/ICD \u2014 updated daily by lane.',                    icon: '💹' },
                      { t: 'GPS Tracking Dashboard',    d: 'Real-time truck GPS tracking with geofence alerts, ETAs, and driver contact \u2014 visible to buyer and seller.',        icon: '📡' },
                      { t: 'Port Gate-In Assistance',   d: 'Coordinate port delivery orders, weighbridge, port health clearances, and container stuffing appointments.',            icon: '🏗\uFE0F' },
                    ].map((item, i) => (
                      <div key={i} className="px-6 py-4 hover:bg-green-900/15 hover:translate-x-1 transition group cursor-default flex items-start gap-3">
                        <span className="text-lg flex-shrink-0 mt-0.5 group-hover:scale-125 transition-transform">{item.icon}</span>
                        <div>
                          <h4 className="text-white font-semibold text-sm mb-1 group-hover:text-green-300 transition">{item.t}</h4>
                          <p className="text-gray-600 text-xs leading-relaxed">{item.d}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="bg-[#0d1525] border border-blue-800/40 rounded-t-xl px-6 py-4">
                    <h3 className="text-blue-400 font-black text-sm tracking-widest">&#x1F6A2; OVERSEAS FREIGHT</h3>
                  </div>
                  <div className="border border-t-0 border-blue-900/20 rounded-b-xl divide-y divide-blue-900/10">
                    {[
                      { t: 'Freight Rate Comparison',   d: 'Compare FCL/LCL rates from Maersk, MSC, CMA CGM and more on major trade lanes.',       icon: '\u2696\uFE0F' },
                      { t: 'Vessel & Sailing Schedule', d: 'Check sailing schedules, transit times, vessel ETD/ETA from Indian ports to global destinations.', icon: '🗓\uFE0F' },
                      { t: 'Freight Forwarder Connect', d: 'Access vetted freight forwarders and NVOCCs for sea, air, and multimodal cargo.',         icon: '🤝' },
                      { t: 'Live AIS Vessel Tracking',  d: 'Real-time AIS-based ship tracking \u2014 know exactly where your cargo is on the ocean.', icon: '🛰\uFE0F' },
                      { t: 'BL & Shipping Documents',   d: 'Digital Bill of Lading issuance coordination, e-BL support, document courier tracking.',  icon: '📋' },
                    ].map((item, i) => (
                      <div key={i} className="px-6 py-4 hover:bg-blue-900/10 hover:translate-x-1 transition group cursor-default flex items-start gap-3">
                        <span className="text-lg flex-shrink-0 mt-0.5 group-hover:scale-125 transition-transform">{item.icon}</span>
                        <div>
                          <h4 className="text-white font-semibold text-sm mb-1 group-hover:text-blue-300 transition">{item.t}</h4>
                          <p className="text-gray-600 text-xs leading-relaxed">{item.d}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* TRADE DOCUMENTATION */}
          <section id="documentation" className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-black mb-3">TRADE DOCUMENTATION & COMPLIANCE</h2>
              <p className="text-gray-600 text-sm mb-10 max-w-2xl">Tradefokus eliminates paperwork chaos. Every document your trade needs \u2014 generated, tracked, and archived in one place.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                  { title: 'PROCUREMENT DOCS',    hdr: 'bg-green-500',  dot: 'bg-green-400',  border: 'border-green-500/20',  items: ['Purchase Order (PO)', 'Proforma Invoice', 'Sales Contract', 'Letter of Intent (LOI)', 'Letter of Credit (LC) Guidance'] },
                  { title: 'QUALITY & INSPECTION',hdr: 'bg-amber-500',  dot: 'bg-amber-400',  border: 'border-amber-500/20',  items: ['Pre-Shipment Inspection (PSI)', 'Certificate of Analysis (COA)', 'Phytosanitary Certificate', 'Fumigation Certificate', 'Lab Test Report Coordination'] },
                  { title: 'SHIPPING DOCUMENTS',  hdr: 'bg-blue-500',   dot: 'bg-blue-400',   border: 'border-blue-500/20',   items: ['Bill of Lading / e-BL', 'Packing List', 'Commercial Invoice', 'Certificate of Origin', 'Freight & Insurance Docs'] },
                  { title: 'CUSTOMS & REGULATORY',hdr: 'bg-orange-500', dot: 'bg-orange-400', border: 'border-orange-500/20', items: ['Shipping Bill / Bill of Entry', 'HS Code Classification', 'APEDA / FSSAI Registration', 'IEC Code Assistance', 'Port Health & Fumigation NOC'] },
                ].map((col, i) => (
                  <div key={i} className={`border ${col.border} rounded-xl overflow-hidden hover:scale-105 hover:shadow-xl transition-transform`}>
                    <div className={`${col.hdr} px-4 py-3`}>
                      <h3 className="text-white font-black text-xs tracking-widest">{col.title}</h3>
                    </div>
                    <div className="p-4 space-y-3 bg-[#0d1f0d]/40">
                      {col.items.map((item, j) => (
                        <div key={j} className="flex items-start gap-2 group cursor-default">
                          <div className={`w-2 h-2 ${col.dot} rounded-full mt-1.5 flex-shrink-0 group-hover:scale-150 transition-transform`} />
                          <span className="text-gray-400 text-xs group-hover:text-gray-200 transition">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* INNOVATIONS */}
          <section id="innovations" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0a1a0a]">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-black mb-10">INNOVATIONS ABSENT IN EXISTING MARKET</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                  { badge: 'MARKET FIRST', badgeCls: 'bg-[#162616] text-green-400 border border-green-700', title: 'Unified Agri + Industrial Platform', titleCls: 'text-white',    icon: '🌐', desc: 'No existing platform combines agricultural and industrial commodity trading, compliance, freight, and live pricing in a single UX. Tradefokus does.' },
                  { badge: 'UNIQUE',       badgeCls: 'bg-green-500/20 text-green-300 border border-green-500', title: 'Farm-to-Port Visibility',        titleCls: 'text-green-400', icon: '🚀', desc: 'End-to-end tracking from farm gate pickup \u2192 inland transit \u2192 CFS stuffing \u2192 vessel departure \u2192 destination port. Not offered by any Indian B2B platform today.' },
                  { badge: 'PROPRIETARY', badgeCls: 'bg-amber-500/20 text-amber-300 border border-amber-600', title: 'Broker Intelligence Layer',       titleCls: 'text-amber-400', icon: '🧠', desc: 'In-house brokerage intelligence powers smart buyer-seller matching based on commodity type, grade, volume, and delivery preference.' },
                  { badge: 'AI-POWERED',  badgeCls: 'bg-[#0d1525] text-blue-400 border border-blue-700',     title: 'AI Harvest & Price Forecasting', titleCls: 'text-white',    icon: '🤖', desc: '30\u201390 day price and supply forecasting using satellite imagery, APMC data, and historical trade volumes \u2014 helping buyers lock prices early.' },
                  { badge: 'TIME-SAVING', badgeCls: 'bg-orange-500/20 text-orange-300 border border-orange-600', title: 'Live Freight Rate Comparison', titleCls: 'text-orange-400',icon: '\u26a1',    desc: 'Compare inland truck rates AND ocean freight rates in real time from within the trade enquiry flow \u2014 saving hours of manual coordination.' },
                  { badge: 'EFFICIENCY',  badgeCls: 'bg-blue-500/20 text-blue-300 border border-blue-600',   title: 'One-Click Document Pack',        titleCls: 'text-blue-400', icon: '📄', desc: 'Generate a complete shipment document pack from a single confirmed order \u2014 Invoice, PL, COA, BL draft, shipping bill \u2014 in under 3 minutes.' },
                ].map((item, i) => (
                  <div key={i}
                    className="bg-[#162616]/30 border border-green-900/30 rounded-xl p-6 hover:border-green-700/60 hover:bg-green-900/15 hover:-translate-y-1 transition group cursor-default">
                    <div className="flex justify-between items-start mb-4 gap-3">
                      <div className="flex items-center gap-2 flex-1">
                        <span className="text-2xl anim-floatY" style={{ animationDelay: `${i * 0.4}s` }}>{item.icon}</span>
                        <h4 className={`font-black text-base ${item.titleCls}`}>{item.title}</h4>
                      </div>
                      <span className={`text-xs font-black px-2 py-1 rounded whitespace-nowrap ${item.badgeCls}`}>{item.badge}</span>
                    </div>
                    <div className="w-8 h-0.5 bg-green-800 mb-4 group-hover:w-full transition-all duration-700" />
                    <p className="text-gray-600 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* WHY CHOOSE */}
          <section id="why" className="py-20 px-4 sm:px-6 lg:px-8 bg-green-500/5 border-y border-green-900/20">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-black mb-10">WHY CHOOSE TRADEFOKUS</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { icon: '💼', title: 'For Buyers',              border: 'border-amber-500/20',  titleCls: 'text-amber-400',  delay: '0s',   items: ['Access verified suppliers globally', 'Transparent live pricing \u2014 no hidden markups', 'Full visibility into shipment at every stage', 'One platform for sourcing, logistics & documents'] },
                  { icon: '🌾', title: 'For Suppliers & Farmers', border: 'border-green-500/20',  titleCls: 'text-green-400',  delay: '0.9s', items: ['Direct reach to premium buyers worldwide', 'Fair price discovery based on market data', 'Documentation help \u2014 no expert needed', 'Faster payment cycles via secure escrow'] },
                  { icon: '🏭', title: 'For Manufacturers',       border: 'border-blue-500/20',   titleCls: 'text-blue-400',   delay: '1.8s', items: ['Steady raw material procurement pipelines', 'Demand forecasting for production planning', 'Industrial-grade spec verification', 'Bulk vessel & container rate comparison'] },
                  { icon: '🚀', title: 'Platform Benefits',       border: 'border-purple-500/20', titleCls: 'text-purple-400', delay: '2.7s', items: ['Zero commission \u2014 pay per lead/service', '24x7 support from trade experts', 'APEDA/FSSAI/IEC compliance embedded', "Built for India's export growth ambition"] },
                ].map((card, i) => (
                  <div key={i}
                    className={`bg-[#0d1f0d]/60 border ${card.border} rounded-xl p-8 hover:bg-green-900/10 hover:scale-[1.02] hover:-translate-y-1 transition group cursor-default`}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl anim-floatY" style={{ animationDelay: card.delay }}>{card.icon}</span>
                      <h3 className={`font-black text-lg ${card.titleCls}`}>{card.title}</h3>
                    </div>
                    <div className="w-12 h-0.5 bg-green-900 mb-5 group-hover:w-24 transition-all duration-500" />
                    <ul className="space-y-2">
                      {card.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-gray-400 text-sm hover:text-gray-200 transition">
                          <span className="text-green-500 mt-0.5 flex-shrink-0">&rarr;</span>{item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#162616] relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-green-900/10 via-transparent to-blue-900/10 animate-pulse" style={{ animationDuration: '5s' }} />
            <div className="max-w-3xl mx-auto text-center relative">
              <div className="text-6xl mb-4 anim-floatY">&#x1F30D;</div>
              <h2 className="text-4xl font-black mb-4">Ready to Trade Smarter?</h2>
              <p className="text-gray-400 mb-8 text-sm leading-relaxed">50+ commodities. Zero MOQ. End-to-end supply chain from India to the world.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={() => setShowQuoteForm(true)}
                  className="bg-green-500 text-white px-10 py-4 rounded-xl font-black text-lg hover:bg-green-400 transition hover:shadow-xl hover:shadow-green-500/40 transform hover:scale-105 active:scale-95 anim-glow">
                  Send Enquiry
                </button>
                <a href={WA} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-10 py-4 rounded-xl font-black text-lg hover:bg-[#1fbb59] transition transform hover:scale-105 active:scale-95">
                  &#x1F4F1; Chat on WhatsApp
                </a>
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="bg-black border-t border-green-900/20 py-14 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
                <div>
                  <div className="text-2xl font-black mb-1"><span className="text-white">TRADE</span><span className="text-green-400">FOKUS</span></div>
                  <p className="text-gray-700 text-xs leading-relaxed mb-3">End-to-End Supply Chain Intelligence.</p>
                  <p className="text-gray-700 text-xs">www.tradefokus.com</p>
                </div>
                <div>
                  <h4 className="text-white font-black text-xs tracking-widest uppercase mb-4">Agri</h4>
                  <ul className="space-y-2">
                    {['Rice & Grains','Spices','Oilseeds','Cash Crops','APEDA Compliance'].map(i => (
                      <li key={i}><button onClick={() => scrollTo('agri')} className="text-gray-700 hover:text-green-400 transition text-xs">{i}</button></li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-black text-xs tracking-widest uppercase mb-4">Non-Agri</h4>
                  <ul className="space-y-2">
                    {['Metals','Minerals','Chemicals','Timber','LME Tracker'].map(i => (
                      <li key={i}><button onClick={() => scrollTo('non-agri')} className="text-gray-700 hover:text-green-400 transition text-xs">{i}</button></li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-black text-xs tracking-widest uppercase mb-4">Services</h4>
                  <ul className="space-y-2">
                    {[['Market Prices','rates'],['Logistics','logistics'],['Documentation','documentation'],['Supply Chain','supply-chain'],['Innovations','innovations']].map(([label, id]) => (
                      <li key={id}><button onClick={() => scrollTo(id)} className="text-gray-700 hover:text-green-400 transition text-xs">{label}</button></li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="border-t border-green-900/15 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-gray-700 text-xs">&copy; 2026 tradeFokus. All rights reserved.</p>
                <div className="flex gap-6">
                  <a href="mailto:info@tradefokus.com" className="text-gray-700 hover:text-green-400 transition text-xs">info@tradefokus.com</a>
                  <a href="#" className="text-gray-700 hover:text-green-400 transition text-xs">Privacy Policy</a>
                  <a href="#" className="text-gray-700 hover:text-green-400 transition text-xs">Terms</a>
                </div>
              </div>
            </div>
          </footer>

          {/* ENQUIRY MODAL */}
          {showQuoteForm && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-[#0d1f0d] border border-green-800/50 rounded-2xl p-8 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto anim-fadeSlideUp">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-black">Send Enquiry</h3>
                    <p className="text-green-400 text-sm mt-1">We&apos;ll respond within 2 business hours</p>
                  </div>
                  <button onClick={() => setShowQuoteForm(false)}
                    className="text-gray-500 hover:text-white hover:rotate-90 transition text-3xl leading-none ml-4 transform">&#xD7;</button>
                </div>
                <form onSubmit={(e) => { e.preventDefault(); alert('Enquiry submitted! We will contact you shortly.'); setShowQuoteForm(false); }} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" placeholder="Your Name *" required
                      className="bg-[#162616] border border-green-800/40 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-green-500 focus:outline-none text-sm transition" />
                    <input type="email" placeholder="Email Address *" required
                      className="bg-[#162616] border border-green-800/40 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-green-500 focus:outline-none text-sm transition" />
                  </div>
                  <input type="tel" placeholder="Phone / WhatsApp Number"
                    className="w-full bg-[#162616] border border-green-800/40 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-green-500 focus:outline-none text-sm" />
                  <select className="w-full bg-[#162616] border border-green-800/40 rounded-lg px-4 py-3 text-gray-400 focus:border-green-500 focus:outline-none text-sm">
                    <option value="">Select Commodity / Service</option>
                    <optgroup label="Agri Commodities">
                      <option>Rice &amp; Grains</option>
                      <option>Spices &amp; Seasonings</option>
                      <option>Oilseeds &amp; Oils</option>
                      <option>Cash Crops (Cashew, Sugar, Cotton)</option>
                    </optgroup>
                    <optgroup label="Non-Agri Commodities">
                      <option>Metals (Copper, Aluminium)</option>
                      <option>Minerals &amp; Ores</option>
                      <option>Industrial Chemicals</option>
                      <option>Timber &amp; Wood Products</option>
                    </optgroup>
                    <option>Freight / Logistics</option>
                    <option>Documentation Support</option>
                    <option>Other</option>
                  </select>
                  <input type="text" placeholder="Quantity Required (e.g. 10 MT, 500 kg)"
                    className="w-full bg-[#162616] border border-green-800/40 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-green-500 focus:outline-none text-sm" />
                  <textarea placeholder="Additional details (destination, grade, packaging, etc.)" rows={3}
                    className="w-full bg-[#162616] border border-green-800/40 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-green-500 focus:outline-none text-sm resize-none" />
                  <div className="flex gap-3">
                    <button type="submit" className="flex-1 bg-green-500 text-white py-3 rounded-lg hover:bg-green-400 transition font-black text-sm hover:shadow-lg hover:shadow-green-500/30">Submit Enquiry</button>
                    <button type="button" onClick={() => setShowQuoteForm(false)}
                      className="px-6 border border-green-800/40 text-gray-500 py-3 rounded-lg hover:bg-green-900/20 transition font-semibold text-sm">Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
