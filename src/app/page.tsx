'use client';

import { useState } from 'react';

interface CommodityRate {
  name: string;
  unit: string;
  price: string;
  change: number;
}

export default function Home() {
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [agriOpen, setAgriOpen] = useState(false);
  const [nonAgriOpen, setNonAgriOpen] = useState(false);
  const [logisticsOpen, setLogisticsOpen] = useState(false);

  const commodityRates: CommodityRate[] = [
    { name: 'Rice (IR 64)', unit: '/qtl', price: '₹2,180', change: 1.2 },
    { name: 'Pepper (Black)', unit: '/MT', price: '₹55,000', change: 0.8 },
    { name: 'Maize', unit: '/qtl', price: '₹1,890', change: -0.4 },
    { name: 'Sugar (S30)', unit: '/qtl', price: '₹3,640', change: 0.6 },
    { name: 'Copper Cathode', unit: '/MT', price: '$8,942', change: 0.3 },
    { name: 'Aluminium Ingot', unit: '/MT', price: '$2,350', change: -0.9 },
    { name: 'Palm Oil (CPO)', unit: '/qtl', price: '₹8,800', change: 1.5 },
    { name: 'Teak (Grade A)', unit: '/CBM', price: '$920', change: 0.0 },
    { name: 'Cashew', unit: '/kg', price: '₹450', change: 5.89 },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
    setAgriOpen(false);
    setNonAgriOpen(false);
    setLogisticsOpen(false);
  };

  return (
    <div className="bg-[#0d1f0d] text-white min-h-screen">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-green-900/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-green-800/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }} />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-green-900/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '6s' }} />
      </div>
      <div className="relative z-10">

        {/* ── NAV ── */}
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
                  <button className="text-gray-400 hover:text-green-400 transition flex items-center gap-1">Agri Commodities <span className="text-[10px]">▼</span></button>
                  {agriOpen && (
                    <div className="absolute top-full left-0 mt-1 w-52 bg-[#0d1f0d] border border-green-800/50 rounded-xl shadow-2xl py-2 z-50">
                      {['Rice & Grains', 'Spices & Seasonings', 'Edible Oils & Oilseeds', 'Sugar & Sweeteners', 'Cocoa & Cashew'].map(i => (
                        <button key={i} onClick={() => scrollTo('agri')} className="block w-full text-left px-4 py-2.5 text-sm text-gray-300 hover:text-green-400 hover:bg-green-900/30 transition">{i}</button>
                      ))}
                      <div className="border-t border-green-900/30 mt-1 pt-2 px-4">
                        <button onClick={() => scrollTo('agri')} className="text-green-400 text-xs font-bold">View All Agri →</button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative" onMouseEnter={() => setNonAgriOpen(true)} onMouseLeave={() => setNonAgriOpen(false)}>
                  <button className="text-gray-400 hover:text-green-400 transition flex items-center gap-1">Non-Agri <span className="text-[10px]">▼</span></button>
                  {nonAgriOpen && (
                    <div className="absolute top-full left-0 mt-1 w-52 bg-[#0d1f0d] border border-green-800/50 rounded-xl shadow-2xl py-2 z-50">
                      {['Metals (Copper, Aluminium)', 'Minerals & Ores', 'Industrial Chemicals', 'Timber & Wood Products', 'Energy Commodities'].map(i => (
                        <button key={i} onClick={() => scrollTo('non-agri')} className="block w-full text-left px-4 py-2.5 text-sm text-gray-300 hover:text-green-400 hover:bg-green-900/30 transition">{i}</button>
                      ))}
                      <div className="border-t border-green-900/30 mt-1 pt-2 px-4">
                        <button onClick={() => scrollTo('non-agri')} className="text-green-400 text-xs font-bold">View All Non-Agri →</button>
                      </div>
                    </div>
                  )}
                </div>

                <button onClick={() => scrollTo('rates')} className="text-gray-400 hover:text-green-400 transition">Market Prices</button>

                <div className="relative" onMouseEnter={() => setLogisticsOpen(true)} onMouseLeave={() => setLogisticsOpen(false)}>
                  <button className="text-gray-400 hover:text-green-400 transition flex items-center gap-1">Logistics <span className="text-[10px]">▼</span></button>
                  {logisticsOpen && (
                    <div className="absolute top-full left-0 mt-1 w-52 bg-[#0d1f0d] border border-green-800/50 rounded-xl shadow-2xl py-2 z-50">
                      {['Inland Freight Listing', 'Ocean Freight Rates', 'Warehouse Locator', 'Live Tracking', 'Freight Forwarder Directory'].map(i => (
                        <button key={i} onClick={() => scrollTo('logistics')} className="block w-full text-left px-4 py-2.5 text-sm text-gray-300 hover:text-green-400 hover:bg-green-900/30 transition">{i}</button>
                      ))}
                      <div className="border-t border-green-900/30 mt-1 pt-2 px-4">
                        <button onClick={() => scrollTo('logistics')} className="text-amber-400 text-xs font-bold">Book Freight →</button>
                      </div>
                    </div>
                  )}
                </div>

                <button onClick={() => scrollTo('documentation')} className="text-gray-400 hover:text-green-400 transition">Documentation</button>
                <button onClick={() => scrollTo('about')} className="text-gray-400 hover:text-green-400 transition">About</button>
              </div>

              <div className="flex items-center gap-3">
                <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="hidden sm:flex items-center gap-1.5 bg-[#25D366] text-white px-3 py-1.5 rounded-full text-xs font-bold hover:bg-[#1fbb59] transition">
                  📱 WhatsApp
                </a>
                <button onClick={() => setShowQuoteForm(true)} className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-400 transition font-bold text-sm">
                  Enquiry
                </button>
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
                  <button key={item.id} onClick={() => scrollTo(item.id)} className="block w-full text-left text-gray-300 py-2.5 px-2 hover:text-green-400 hover:bg-green-900/20 rounded-lg transition text-sm">{item.label}</button>
                ))}
                <button onClick={() => { setShowQuoteForm(true); setMobileMenuOpen(false); }} className="block w-full bg-green-500 text-white py-3 rounded-xl font-bold mt-3 text-sm">Send Enquiry</button>
              </div>
            )}
          </div>
        </nav>

        {/* ── HERO ── */}
        <section id="hero" className="pt-28 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 bg-green-500/10 border border-green-600/30 rounded-full">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-400 text-xs font-bold tracking-widest">POWERED BY VERSAVERDE LLP · KAKINADA, INDIA</span>
                </div>
                <h1 className="text-7xl md:text-8xl font-black leading-none tracking-tight mb-4">
                  <span className="text-white">TRADE</span><br />
                  <span className="text-green-400">FOKUS</span>
                </h1>
                <p className="text-xl font-bold text-white mb-1">End-to-End Supply Chain Intelligence</p>
                <p className="text-base text-green-400 font-semibold mb-6">From Farm Gate to Destination Port</p>
                <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-lg">
                  A next-generation commodity trading and supply chain platform bridging the gap between buyers and suppliers — farmers, producers, mills, and manufacturers — offering complete end-to-end trade facilitation under one roof.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button onClick={() => scrollTo('agri')} className="bg-green-500 text-white px-7 py-3.5 rounded-lg font-black hover:bg-green-400 transition hover:shadow-lg hover:shadow-green-500/30 transform hover:scale-105 text-sm">
                    AGRI COMMODITIES
                  </button>
                  <button onClick={() => scrollTo('non-agri')} className="border-2 border-amber-500 text-amber-400 px-7 py-3.5 rounded-lg font-black hover:bg-amber-500/10 transition transform hover:scale-105 text-sm">
                    NON-AGRI COMMODITIES
                  </button>
                </div>
              </div>
              <div className="bg-[#162616]/80 border border-green-800/40 rounded-2xl p-8">
                <p className="text-green-400 text-xs font-black tracking-widest uppercase mb-6">Platform Highlights</p>
                <div className="space-y-4">
                  {[
                    ['🌐', 'Live Market Prices – Agri & Non-Agri'],
                    ['📦', 'Full Supply Chain Management'],
                    ['🚂', 'Inland & International Freight Listing'],
                    ['📡', 'Real-Time Shipment Tracking'],
                    ['📄', 'End-to-End Trade Documentation'],
                    ['🔍', 'Quality Inspection Coordination'],
                    ['🤖', 'AI Supply & Demand Predictions'],
                    ['🤝', 'Verified Buyer–Supplier Matching'],
                  ].map(([icon, text], i) => (
                    <div key={i} className="flex items-center gap-3 group">
                      <span className="text-lg">{icon}</span>
                      <span className="text-gray-300 text-sm group-hover:text-green-400 transition">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <div className="py-6 px-4 bg-[#162616]/60 border-y border-green-900/30">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[['2', 'Commodity Categories'], ['50+', 'Commodities Listed'], ['360°', 'Trade Coverage'], ['1', 'Platform. Everything.']].map(([val, label], i) => (
              <div key={i} className="group cursor-default">
                <div className="text-3xl font-black text-green-400 group-hover:scale-110 transition transform">{val}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── LIVE TICKER ── */}
        <div className="py-3 bg-black/50 border-b border-green-900/20 overflow-x-auto">
          <div className="flex items-center gap-2 px-4 mb-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse flex-shrink-0" />
            <span className="text-green-400 text-xs font-bold tracking-widest whitespace-nowrap">LIVE PRICES · NCDEX / MCX / LME / APEDA · Updated every 15 min</span>
          </div>
          <div className="flex gap-3 px-4 pb-1">
            {commodityRates.map((item, i) => (
              <div key={i} className="flex-shrink-0 flex items-center gap-2 bg-[#162616]/60 px-3 py-1.5 rounded-lg border border-green-900/20">
                <span className="text-white text-xs font-semibold whitespace-nowrap">{item.name}</span>
                <span className="text-white text-xs font-bold">{item.price}<span className="text-gray-500">{item.unit}</span></span>
                <span className={`text-xs font-bold ${item.change > 0 ? 'text-green-400' : item.change < 0 ? 'text-red-400' : 'text-gray-500'}`}>
                  {item.change > 0 ? '+' : ''}{item.change.toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── WHAT IS TRADEFOKUS ── */}
        <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black mb-3">WHAT IS TRADEFOKUS?</h2>
            <p className="text-gray-500 max-w-3xl mb-12 text-sm leading-relaxed">
              Tradefokus is a next-generation commodity trading and supply chain platform that bridges the gap between buyers and suppliers — including farmers, producers, mills, and manufacturers — offering complete end-to-end trade facilitation under one roof.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {[
                { label: 'CONNECT', border: 'border-green-600', bg: 'bg-green-900/40', color: 'text-green-300', desc: 'Match verified buyers with trusted suppliers, farmers & producers globally.' },
                { label: 'FACILITATE', border: 'border-amber-600', bg: 'bg-amber-900/20', color: 'text-amber-300', desc: 'Manage documentation, inspections, freight, and compliance in one platform.' },
                { label: 'DELIVER', border: 'border-green-400', bg: 'bg-green-800/30', color: 'text-green-200', desc: 'Track real-time shipment from source to port or final destination.' },
              ].map((item, i) => (
                <div key={i} className={`relative border-2 ${item.border} ${item.bg} rounded-xl p-8 hover:scale-105 transition transform`}>
                  {i > 0 && <span className="hidden md:block absolute -left-5 top-1/2 -translate-y-1/2 text-amber-500 text-2xl font-black">→</span>}
                  <h3 className={`text-xl font-black tracking-widest ${item.color} mb-3`}>{item.label}</h3>
                  <div className="w-10 h-0.5 bg-green-700 mb-4" />
                  <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── AGRI COMMODITIES ── */}
        <section id="agri" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0a1a0a]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-2 bg-[#0d1f0d] border border-green-800/40 rounded-2xl p-8">
                <h2 className="text-5xl font-black text-white leading-none">AGRI</h2>
                <h2 className="text-5xl font-black text-green-400 leading-none mb-2">COMMODITIES</h2>
                <p className="text-green-400 italic text-sm mb-8">Farm-Fresh. Compliant. Delivered.</p>
                <div className="space-y-3">
                  {[
                    { cat: 'GRAINS & CEREALS', items: 'Rice · Wheat · Maize · Millets' },
                    { cat: 'SPICES', items: 'Pepper · Cardamom · Turmeric · Chilli' },
                    { cat: 'OILSEEDS & OILS', items: 'Groundnut · Sunflower · Coconut Oil · Palm' },
                    { cat: 'CASH CROPS', items: 'Sugar · Cotton · Cocoa · Cashew' },
                  ].map((c, i) => (
                    <div key={i} className="border border-green-800/40 rounded-lg px-4 py-3 hover:border-green-500/50 hover:bg-green-900/20 transition">
                      <div className="text-green-400 text-xs font-black tracking-widest mb-1">{c.cat}</div>
                      <div className="text-gray-300 text-sm">{c.items}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-3">
                <p className="text-green-400 text-xs font-black tracking-widest uppercase mb-6">What You Get on Agri Portal</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { t: 'Live FOB & Local Prices', d: 'Real-time price feed for all listed agri commodities by market/region.' },
                    { t: 'Buyer-Farmer Direct Connect', d: 'Bypass middlemen with verified farmer & mill profiles listed on platform.' },
                    { t: 'Grade & Quality Specifications', d: 'Standardized spec tables: moisture, broken %, foreign matter, FSSAI compliance.' },
                    { t: 'Document Pack Generator', d: 'Auto-generate Phytosanitary, Fumigation, COA, Invoice, Packing List templates.' },
                    { t: 'Pre-Shipment Inspection', d: 'Coordinate third-party inspection agencies at farm or mill level.' },
                    { t: 'Seasonal Supply Forecast', d: 'AI-driven seasonal harvest predictions for demand planning.' },
                  ].map((item, i) => (
                    <div key={i} className="border border-green-800/25 rounded-xl p-5 hover:border-green-500/50 hover:bg-green-900/15 transition group">
                      <h4 className="text-green-300 font-bold text-sm mb-2 group-hover:text-green-200">{item.t}</h4>
                      <p className="text-gray-600 text-xs leading-relaxed">{item.d}</p>
                    </div>
                  ))}
                  <div className="sm:col-span-2 border border-amber-700/30 rounded-xl p-5 hover:bg-amber-900/10 transition">
                    <h4 className="text-amber-400 font-bold text-sm mb-1">APEDA / FSSAI Compliance Guide</h4>
                    <p className="text-gray-600 text-xs leading-relaxed">Step-by-step regulatory checklist for each commodity export.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── NON-AGRI ── */}
        <section id="non-agri" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0d1525]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-3 order-2 lg:order-1">
                <p className="text-blue-400 text-xs font-black tracking-widest uppercase mb-6">What You Get on Non-Agri Portal</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { t: 'LME & Spot Price Tracker', d: 'Live London Metal Exchange & international spot price updates.' },
                    { t: 'Industrial Buyer Network', d: 'Verified manufacturers, importers and industrial buyers listed.' },
                    { t: 'Technical Spec Sheets', d: 'Detailed purity %, grade, packaging specs and test certificates.' },
                    { t: 'Dangerous Goods Compliance', d: 'MSDS, IMDG, HSN code support for hazardous commodity shipments.' },
                    { t: 'Freight & Bulk Carrier Listing', d: 'Bulk vessel availability, container options and freight rate listings.' },
                    { t: 'Demand Forecasting', d: 'Sector-level industrial demand analytics for procurement planning.' },
                  ].map((item, i) => (
                    <div key={i} className="border border-blue-800/25 rounded-xl p-5 hover:border-blue-400/40 hover:bg-blue-900/10 transition group">
                      <h4 className="text-blue-300 font-bold text-sm mb-2 group-hover:text-blue-200">{item.t}</h4>
                      <p className="text-gray-600 text-xs leading-relaxed">{item.d}</p>
                    </div>
                  ))}
                  <div className="sm:col-span-2 border border-amber-700/30 rounded-xl p-5 hover:bg-amber-900/10 transition">
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
                    { cat: 'METALS', items: 'Copper Cathode · Copper Millberry · Aluminium Ingots · Zinc' },
                    { cat: 'MINERALS', items: 'Iron Ore · Silica Sand · Barite · Limestone' },
                    { cat: 'CHEMICALS', items: 'Caustic Soda · Soda Ash · Industrial Salt · Urea' },
                    { cat: 'WOOD & TIMBER', items: 'Teak · Hardwood · Plywood · Wood Pellets' },
                  ].map((c, i) => (
                    <div key={i} className="border border-blue-800/40 rounded-lg px-4 py-3 hover:border-blue-500/50 hover:bg-blue-900/20 transition">
                      <div className="text-amber-400 text-xs font-black tracking-widest mb-1">{c.cat}</div>
                      <div className="text-gray-300 text-sm">{c.items}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 6-STEP SUPPLY CHAIN ── */}
        <section id="supply-chain" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0a1a0a]">
          <div className="max-w-7xl mx-auto">
            <div className="bg-[#162616] rounded-t-2xl px-8 py-5">
              <h2 className="text-xl md:text-2xl font-black">END-TO-END SUPPLY CHAIN MANAGEMENT</h2>
            </div>
            <div className="bg-white/5 border border-t-0 border-green-900/20 rounded-b-2xl p-8">
              <div className="grid grid-cols-2 md:grid-cols-6 gap-6 mb-8">
                {[
                  { num: '01', label: 'PROCUREMENT', color: 'bg-green-900', desc: 'Supplier discovery, price negotiation, PO confirmation' },
                  { num: '02', label: 'INSPECTION', color: 'bg-green-700', desc: 'Pre-shipment quality inspection, lab testing, grade certification' },
                  { num: '03', label: 'DOCUMENTATION', color: 'bg-green-500', desc: 'Invoice, Packing List, BL, COA, Phyto, Customs Filing' },
                  { num: '04', label: 'LOGISTICS', color: 'bg-amber-600', desc: 'Inland transport, freight booking, container loading' },
                  { num: '05', label: 'LIVE TRACKING', color: 'bg-orange-600', desc: 'Real-time GPS & vessel tracking from origin to destination' },
                  { num: '06', label: 'DELIVERY', color: 'bg-blue-800', desc: 'Port clearance, final mile delivery or CFS handover confirmation' },
                ].map((step, i) => (
                  <div key={i} className="text-center group">
                    <div className={`w-14 h-14 ${step.color} rounded-full flex items-center justify-center text-white font-black text-lg mx-auto mb-3 group-hover:scale-110 transition transform shadow-lg`}>{step.num}</div>
                    <div className="text-xs font-black tracking-wide text-gray-300 mb-2">{step.label}</div>
                    <div className="text-xs text-gray-600 leading-relaxed">{step.desc}</div>
                  </div>
                ))}
              </div>
              <div className="bg-[#0d1f0d] border border-green-900/30 rounded-xl p-4 text-center">
                <p className="text-green-300 text-sm italic">VersaVerde acts as your single point of contact across all 6 stages — eliminating coordination gaps, reducing delays, and minimising trade risk.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── LIVE MARKET INTELLIGENCE ── */}
        <section id="rates" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
              <div>
                <h2 className="text-3xl font-black">LIVE MARKET INTELLIGENCE</h2>
                <p className="text-green-400 text-sm mt-1 font-semibold">Real-Time · AI-Powered · Transparent</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-gray-600 text-xs">Updated every 15 min · NCDEX, MCX, LME, APEDA</span>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-3 bg-[#162616]/50 border border-green-900/30 rounded-2xl p-6">
                <p className="text-green-400 text-xs font-black tracking-widest uppercase mb-5">Live Commodity Price Feed</p>
                <div className="space-y-1">
                  {commodityRates.map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-3 px-3 rounded-lg hover:bg-green-900/20 transition border-b border-green-900/10 last:border-0">
                      <span className="text-gray-300 text-sm">{item.name}</span>
                      <div className="flex items-center gap-6">
                        <span className="text-white font-bold text-sm">{item.price}<span className="text-gray-600 text-xs ml-0.5">{item.unit}</span></span>
                        <span className={`text-sm font-bold w-14 text-right ${item.change > 0 ? 'text-green-400' : item.change < 0 ? 'text-red-400' : 'text-gray-500'}`}>
                          {item.change > 0 ? '+' : ''}{item.change.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-2 space-y-4">
                {[
                  { accent: 'border-green-500', t: 'Supply & Demand Prediction', d: 'AI models trained on 5-year trade data, weather patterns, and seasonal cycles forecast commodity availability and price direction 30–90 days ahead.' },
                  { accent: 'border-amber-500', t: 'Market Sentiment Indicator', d: 'Aggregated signals from government policies, global trade news, and commodity exchange movements — giving a real-time sentiment score.' },
                  { accent: 'border-blue-500', t: 'Price Alert Engine', d: 'Set custom price thresholds and receive instant SMS/email alerts when your target commodity hits your buy or sell trigger price.' },
                  { accent: 'border-orange-500', t: 'Historical Trend Charts', d: 'Interactive 1W/1M/6M/1Y price charts with volume overlay and moving averages for informed procurement decisions.' },
                ].map((item, i) => (
                  <div key={i} className={`border-l-4 ${item.accent} bg-[#162616]/40 rounded-r-xl p-5 hover:bg-green-900/15 transition`}>
                    <h4 className="text-white font-bold text-sm mb-2">{item.t}</h4>
                    <p className="text-gray-600 text-xs leading-relaxed">{item.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── PROBLEMS WE SOLVE ── */}
        <section id="problems" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0a1a0a]">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start mb-10 gap-2">
              <h2 className="text-3xl font-black">PROBLEMS WE SOLVE</h2>
              <span className="text-green-400 text-sm italic font-semibold">Before & After Tradefokus</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3 space-y-3">
                <div className="grid grid-cols-2 gap-4 mb-2">
                  <div className="bg-red-900/30 border border-red-800/40 rounded-lg px-4 py-2.5 text-center">
                    <span className="text-red-400 font-black text-xs tracking-wide">✗ WITHOUT TRADEFOKUS</span>
                  </div>
                  <div className="bg-green-900/30 border border-green-700/40 rounded-lg px-4 py-2.5 text-center">
                    <span className="text-green-400 font-black text-xs tracking-wide">✓ WITH TRADEFOKUS</span>
                  </div>
                </div>
                {[
                  { w: 'Buyers rely on unknown middlemen with no accountability', t: 'Verified supplier network with ratings, trade history & certifications' },
                  { w: 'Pricing opacity — no real-time market reference', t: 'Live commodity price feed updated every 15 mins from NCDEX, MCX, LME' },
                  { w: 'Documentation errors cause shipment delays & penalties', t: 'Auto-generated document packs with compliance checklists' },
                  { w: 'No visibility into shipment status after booking', t: 'Real-time inland GPS + AIS vessel tracking dashboard' },
                  { w: 'Manual freight booking — time-consuming & expensive', t: 'Compare inland + ocean freight rates in one click' },
                  { w: 'Supply shortages surprise buyers, lead to production halts', t: 'AI 30-90 day supply forecasting and price alerts' },
                ].map((row, i) => (
                  <div key={i} className="grid grid-cols-2 gap-4">
                    <div className="bg-red-950/30 border border-red-900/20 rounded-lg px-4 py-3">
                      <p className="text-gray-500 text-xs leading-relaxed">{row.w}</p>
                    </div>
                    <div className="bg-green-950/30 border border-green-900/20 rounded-lg px-4 py-3">
                      <p className="text-gray-300 text-xs leading-relaxed">{row.t}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                <p className="text-gray-600 text-xs font-black tracking-widest uppercase mb-4">Impact Metrics</p>
                {[['40%', 'Faster Documentation'], ['25%', 'Lower Freight Cost'], ['60%', 'Reduced Trade Disputes'], ['3x', 'More Supplier Options'], ['90%', 'On-Time Delivery Rate']].map(([val, label], i) => (
                  <div key={i} className="bg-[#162616]/60 border border-green-900/30 rounded-xl p-4 text-center hover:border-green-600/50 transition group">
                    <div className="text-3xl font-black text-green-400 group-hover:scale-110 transition transform">{val}</div>
                    <div className="text-xs text-gray-600 mt-1">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── FREIGHT & LOGISTICS ── */}
        <section id="logistics" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0d1525]/80">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-black mb-10">FREIGHT & LOGISTICS MANAGEMENT</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="bg-[#162616] border border-green-800/40 rounded-t-xl px-6 py-4">
                  <h3 className="text-green-400 font-black text-sm tracking-widest">🚛 INLAND LOGISTICS</h3>
                </div>
                <div className="border border-t-0 border-green-900/20 rounded-b-xl divide-y divide-green-900/10">
                  {[
                    { t: 'Truck & Container Booking', d: 'List and compare available trucks, mini-trucks, and containers from verified transport partners across Andhra Pradesh, Telangana, Tamil Nadu and beyond.' },
                    { t: 'Warehouse Locator', d: 'Find bonded and cold-storage warehouses near procurement origin or port — with capacity, certification and rate comparison.' },
                    { t: 'Inland Freight Rate Board', d: 'Live freight rates from origin to nearest rail head, port, or CFS/ICD — updated daily by lane.' },
                    { t: 'GPS Tracking Dashboard', d: 'Real-time truck GPS tracking with geofence alerts, ETAs, and driver contact — visible to both buyer and seller.' },
                    { t: 'Port Gate-In Assistance', d: 'Coordinate port delivery orders, weighbridge, port health clearances, and container stuffing appointments.' },
                  ].map((item, i) => (
                    <div key={i} className="px-6 py-4 hover:bg-green-900/10 transition">
                      <h4 className="text-white font-semibold text-sm mb-1">{item.t}</h4>
                      <p className="text-gray-600 text-xs leading-relaxed">{item.d}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="bg-[#0d1525] border border-blue-800/40 rounded-t-xl px-6 py-4">
                  <h3 className="text-blue-400 font-black text-sm tracking-widest">🚢 OVERSEAS FREIGHT</h3>
                </div>
                <div className="border border-t-0 border-blue-900/20 rounded-b-xl divide-y divide-blue-900/10">
                  {[
                    { t: 'Freight Rate Comparison', d: 'Compare FCL/LCL rates from multiple shipping lines (Maersk, MSC, CMA CGM, etc.) on major trade lanes.' },
                    { t: 'Vessel & Sailing Schedule', d: 'Check sailing schedules, transit times, and vessel ETD/ETA from Indian ports to global destinations.' },
                    { t: 'Freight Forwarder Connect', d: 'Access vetted freight forwarders and NVOCCs for sea, air, and multimodal cargo movements.' },
                    { t: 'Live AIS Vessel Tracking', d: 'Real-time AIS-based ship tracking — know exactly where your cargo is on the ocean at any moment.' },
                    { t: 'BL & Shipping Documents', d: 'Digital Bill of Lading issuance coordination, e-BL support, and document courier tracking.' },
                  ].map((item, i) => (
                    <div key={i} className="px-6 py-4 hover:bg-blue-900/10 transition">
                      <h4 className="text-white font-semibold text-sm mb-1">{item.t}</h4>
                      <p className="text-gray-600 text-xs leading-relaxed">{item.d}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TRADE DOCUMENTATION ── */}
        <section id="documentation" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-black mb-3">TRADE DOCUMENTATION & COMPLIANCE</h2>
            <p className="text-gray-600 text-sm mb-10 max-w-2xl">Tradefokus eliminates paperwork chaos. Every document your trade needs — generated, tracked, and archived in one place.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { title: 'PROCUREMENT DOCS', hdr: 'bg-green-500', dot: 'bg-green-400', border: 'border-green-500/20', items: ['Purchase Order (PO)', 'Proforma Invoice', 'Sales Contract', 'Letter of Intent (LOI)', 'Letter of Credit (LC) Guidance'] },
                { title: 'QUALITY & INSPECTION', hdr: 'bg-amber-500', dot: 'bg-amber-400', border: 'border-amber-500/20', items: ['Pre-Shipment Inspection (PSI)', 'Certificate of Analysis (COA)', 'Phytosanitary Certificate', 'Fumigation Certificate', 'Lab Test Report Coordination'] },
                { title: 'SHIPPING DOCUMENTS', hdr: 'bg-blue-500', dot: 'bg-blue-400', border: 'border-blue-500/20', items: ['Bill of Lading / e-BL', 'Packing List', 'Commercial Invoice', 'Certificate of Origin', 'Freight & Insurance Docs'] },
                { title: 'CUSTOMS & REGULATORY', hdr: 'bg-orange-500', dot: 'bg-orange-400', border: 'border-orange-500/20', items: ['Shipping Bill / Bill of Entry', 'HS Code Classification', 'APEDA / FSSAI Registration', 'IEC Code Assistance', 'Port Health & Fumigation NOC'] },
              ].map((col, i) => (
                <div key={i} className={`border ${col.border} rounded-xl overflow-hidden hover:scale-105 transition transform`}>
                  <div className={`${col.hdr} px-4 py-3`}>
                    <h3 className="text-white font-black text-xs tracking-widest">{col.title}</h3>
                  </div>
                  <div className="p-4 space-y-3 bg-[#0d1f0d]/40">
                    {col.items.map((item, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <div className={`w-2 h-2 ${col.dot} rounded-full mt-1.5 flex-shrink-0`} />
                        <span className="text-gray-400 text-xs">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── INNOVATIONS ── */}
        <section id="innovations" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0a1a0a]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-black mb-10">INNOVATIONS ABSENT IN EXISTING MARKET</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { badge: 'MARKET FIRST', badgeCls: 'bg-[#162616] text-green-400 border border-green-700', title: 'Unified Agri + Industrial Platform', titleCls: 'text-white', desc: 'No existing platform combines agricultural and industrial commodity trading, compliance, freight, and live pricing in a single UX. Tradefokus does.' },
                { badge: 'UNIQUE', badgeCls: 'bg-green-500/20 text-green-300 border border-green-500', title: 'Farm-to-Port Visibility', titleCls: 'text-green-400', desc: 'End-to-end tracking from farm gate pickup → inland transit → CFS stuffing → vessel departure → destination port. Not offered by any Indian B2B platform today.' },
                { badge: 'PROPRIETARY', badgeCls: 'bg-amber-500/20 text-amber-300 border border-amber-600', title: 'Broker Intelligence Layer', titleCls: 'text-amber-400', desc: "VersaVerde's in-house brokerage intelligence powers smart buyer-seller matching based on commodity type, grade, volume, and delivery preference." },
                { badge: 'AI-POWERED', badgeCls: 'bg-[#0d1525] text-blue-400 border border-blue-700', title: 'AI Harvest & Price Forecasting', titleCls: 'text-white', desc: '30-90 day price and supply forecasting using satellite imagery, APMC data, and historical trade volumes — helping buyers lock prices early.' },
                { badge: 'TIME-SAVING', badgeCls: 'bg-orange-500/20 text-orange-300 border border-orange-600', title: 'Live Freight Rate Comparison', titleCls: 'text-orange-400', desc: 'Compare inland truck rates AND ocean freight rates in real time from within the trade enquiry flow — saving hours of manual coordination.' },
                { badge: 'EFFICIENCY', badgeCls: 'bg-blue-500/20 text-blue-300 border border-blue-600', title: 'One-Click Document Pack', titleCls: 'text-blue-400', desc: 'Generate a complete shipment document pack from a single confirmed order — Invoice, PL, COA, BL draft, shipping bill — in under 3 minutes.' },
              ].map((item, i) => (
                <div key={i} className="bg-[#162616]/30 border border-green-900/30 rounded-xl p-6 hover:border-green-700/50 hover:bg-green-900/10 transition">
                  <div className="flex justify-between items-start mb-4 gap-3">
                    <h4 className={`font-black text-base ${item.titleCls} flex-1`}>{item.title}</h4>
                    <span className={`text-xs font-black px-2 py-1 rounded whitespace-nowrap ${item.badgeCls}`}>{item.badge}</span>
                  </div>
                  <div className="w-8 h-0.5 bg-green-800 mb-4" />
                  <p className="text-gray-600 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY CHOOSE ── */}
        <section id="why" className="py-20 px-4 sm:px-6 lg:px-8 bg-green-500/5 border-y border-green-900/20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-black mb-10">WHY CHOOSE TRADEFOKUS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: '💼', title: 'For Buyers', border: 'border-amber-500/20', titleCls: 'text-amber-400', items: ['Access verified suppliers globally', 'Transparent live pricing — no hidden markups', 'Full visibility into shipment at every stage', 'One platform for sourcing, logistics & documents'] },
                { icon: '🌾', title: 'For Suppliers & Farmers', border: 'border-green-500/20', titleCls: 'text-green-400', items: ['Direct reach to premium buyers worldwide', 'Fair price discovery based on market data', 'Documentation help — no expert needed', 'Faster payment cycles via secure escrow'] },
                { icon: '🏭', title: 'For Manufacturers', border: 'border-blue-500/20', titleCls: 'text-blue-400', items: ['Steady raw material procurement pipelines', 'Demand forecasting for production planning', 'Industrial-grade spec verification', 'Bulk vessel & container rate comparison'] },
                { icon: '🚀', title: 'Platform Benefits', border: 'border-purple-500/20', titleCls: 'text-purple-400', items: ['Zero commission — pay per lead/service', '24x7 support from trade experts (VersaVerde)', 'APEDA/FSSAI/IEC compliance embedded', "Built for India's export growth ambition"] },
              ].map((card, i) => (
                <div key={i} className={`bg-[#0d1f0d]/60 border ${card.border} rounded-xl p-8 hover:bg-green-900/10 transition`}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{card.icon}</span>
                    <h3 className={`font-black text-lg ${card.titleCls}`}>{card.title}</h3>
                  </div>
                  <div className="w-12 h-0.5 bg-green-900 mb-5" />
                  <ul className="space-y-2">
                    {card.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-gray-400 text-sm">
                        <span className="text-green-500 mt-0.5 flex-shrink-0">→</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#162616]">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-black mb-4">Ready to Trade Smarter?</h2>
            <p className="text-gray-400 mb-8 text-sm leading-relaxed">50+ commodities. Zero MOQ. End-to-end supply chain from Kakinada, India to the world.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => setShowQuoteForm(true)} className="bg-green-500 text-white px-10 py-4 rounded-xl font-black text-lg hover:bg-green-400 transition hover:shadow-xl hover:shadow-green-500/30 transform hover:scale-105">
                Send Enquiry
              </button>
              <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-10 py-4 rounded-xl font-black text-lg hover:bg-[#1fbb59] transition transform hover:scale-105">
                📱 WhatsApp Us
              </a>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="bg-black border-t border-green-900/20 py-14 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
              <div>
                <div className="text-2xl font-black mb-1"><span className="text-white">TRADE</span><span className="text-green-400">FOKUS</span></div>
                <p className="text-green-400 text-xs mb-3 font-semibold">Powered by VersaVerde LLP</p>
                <p className="text-gray-700 text-xs leading-relaxed mb-3">End-to-End Supply Chain Intelligence. Kakinada, Andhra Pradesh, India.</p>
                <p className="text-gray-700 text-xs">www.tradefokus.com</p>
              </div>
              <div>
                <h4 className="text-white font-black text-xs tracking-widest uppercase mb-4">Agri</h4>
                <ul className="space-y-2">
                  {['Rice & Grains', 'Spices', 'Oilseeds', 'Cash Crops', 'APEDA Compliance'].map(i => (
                    <li key={i}><button onClick={() => scrollTo('agri')} className="text-gray-700 hover:text-green-400 transition text-xs">{i}</button></li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-white font-black text-xs tracking-widest uppercase mb-4">Non-Agri</h4>
                <ul className="space-y-2">
                  {['Metals', 'Minerals', 'Chemicals', 'Timber', 'LME Tracker'].map(i => (
                    <li key={i}><button onClick={() => scrollTo('non-agri')} className="text-gray-700 hover:text-green-400 transition text-xs">{i}</button></li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-white font-black text-xs tracking-widest uppercase mb-4">Services</h4>
                <ul className="space-y-2">
                  {[['Market Prices', 'rates'], ['Logistics', 'logistics'], ['Documentation', 'documentation'], ['Supply Chain', 'supply-chain'], ['Innovations', 'innovations']].map(([label, id]) => (
                    <li key={id}><button onClick={() => scrollTo(id)} className="text-gray-700 hover:text-green-400 transition text-xs">{label}</button></li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="border-t border-green-900/15 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-700 text-xs">&copy; 2026 tradeFokus. All rights reserved. | VERSAVERDE LLP | Kakinada, Andhra Pradesh 🇮🇳</p>
              <div className="flex gap-6">
                <a href="mailto:info@tradefokus.com" className="text-gray-700 hover:text-green-400 transition text-xs">info@tradefokus.com</a>
                <a href="#" className="text-gray-700 hover:text-green-400 transition text-xs">Privacy Policy</a>
                <a href="#" className="text-gray-700 hover:text-green-400 transition text-xs">Terms</a>
              </div>
            </div>
          </div>
        </footer>

        {/* ── ENQUIRY MODAL ── */}
        {showQuoteForm && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#0d1f0d] border border-green-800/50 rounded-2xl p-8 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-black">Send Enquiry</h3>
                  <p className="text-green-400 text-sm mt-1">We&apos;ll respond within 2 business hours</p>
                </div>
                <button onClick={() => setShowQuoteForm(false)} className="text-gray-500 hover:text-white transition text-3xl leading-none ml-4">×</button>
              </div>
              <form onSubmit={(e) => { e.preventDefault(); alert('Enquiry submitted! We will contact you shortly.'); setShowQuoteForm(false); }} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" placeholder="Your Name *" required className="bg-[#162616] border border-green-800/40 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-green-500 focus:outline-none text-sm" />
                  <input type="email" placeholder="Email Address *" required className="bg-[#162616] border border-green-800/40 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-green-500 focus:outline-none text-sm" />
                </div>
                <input type="tel" placeholder="Phone / WhatsApp Number" className="w-full bg-[#162616] border border-green-800/40 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-green-500 focus:outline-none text-sm" />
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
                <input type="text" placeholder="Quantity Required (e.g. 10 MT, 500 kg)" className="w-full bg-[#162616] border border-green-800/40 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-green-500 focus:outline-none text-sm" />
                <textarea placeholder="Additional details (destination, grade, packaging, etc.)" rows={3} className="w-full bg-[#162616] border border-green-800/40 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-green-500 focus:outline-none text-sm resize-none" />
                <div className="flex gap-3">
                  <button type="submit" className="flex-1 bg-green-500 text-white py-3 rounded-lg hover:bg-green-400 transition font-black text-sm">Submit Enquiry</button>
                  <button type="button" onClick={() => setShowQuoteForm(false)} className="px-6 border border-green-800/40 text-gray-500 py-3 rounded-lg hover:bg-green-900/20 transition font-semibold text-sm">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
    { name: 'Sugar', unit: '/kg', price: 28.0, change: 0.8, changePercent: 0.85 },
    { name: 'ToorDal', unit: '/kg', price: 125, change: 1.5, changePercent: 1.5 },
    { name: 'ChanaD', unit: '/kg', price: 88, change: -0.3, changePercent: -0.3 },
    { name: 'White Pepper', unit: '/kg', price: 659, change: 2.1, changePercent: 2.1 },
    { name: 'Cardamom', unit: '/kg', price: 2480, change: 50, changePercent: 2.06 },
  ]);

  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-green-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      <div className="relative z-10">
      {/* Navigation */}
      <nav className="fixed w-full backdrop-blur-md bg-black/80 border-b border-green-500/20 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <button onClick={() => scrollToSection('hero')} className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition">
              <span className="text-3xl font-bold">Trade</span>
              <span className="text-3xl font-bold text-green-400">fokus</span>
              <span className="text-xs text-gray-500 ml-4 hidden lg:inline">EST. 2025 · GLOBAL COMMODITY TRADE</span>
            </button>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 items-center">
              <button onClick={() => scrollToSection('hero')} className="text-gray-300 hover:text-green-400 transition">Home</button>
              <button onClick={() => scrollToSection('categories')} className="text-gray-300 hover:text-green-400 transition">About</button>
              <button onClick={() => scrollToSection('agri')} className="text-gray-300 hover:text-green-400 transition flex items-center gap-1">
                <span>🌾</span> Agri
              </button>
              <button onClick={() => scrollToSection('non-agri')} className="text-gray-300 hover:text-green-400 transition flex items-center gap-1">
                <span>🏭</span> Non-Agri
              </button>
              <button onClick={() => scrollToSection('rates')} className="text-gray-300 hover:text-green-400 transition">Rates</button>
              <button onClick={() => scrollToSection('how-it-works')} className="text-gray-300 hover:text-green-400 transition flex items-center gap-1">
                <span>📦</span> How it Works
              </button>
            </div>

            <div className="flex items-center gap-4">
              <button onClick={() => setShowQuoteForm(true)} className="hidden sm:inline-block bg-green-400 text-black px-6 py-2 rounded-full hover:bg-green-300 transition font-bold text-sm md:text-base">
                Get Quote
              </button>
              
              {/* Mobile Menu Button */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-green-400 hover:text-green-300 transition"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-6 space-y-3 animate-in">
              <button onClick={() => scrollToSection('hero')} className="block w-full text-left text-gray-300 hover:text-green-400 transition py-2">Home</button>
              <button onClick={() => scrollToSection('categories')} className="block w-full text-left text-gray-300 hover:text-green-400 transition py-2">About</button>
              <button onClick={() => scrollToSection('agri')} className="block w-full text-left text-gray-300 hover:text-green-400 transition py-2">🌾 Agri Commodities</button>
              <button onClick={() => scrollToSection('non-agri')} className="block w-full text-left text-gray-300 hover:text-green-400 transition py-2">🏭 Non-Agri Products</button>
              <button onClick={() => scrollToSection('rates')} className="block w-full text-left text-gray-300 hover:text-green-400 transition py-2">Live Rates</button>
              <button onClick={() => scrollToSection('how-it-works')} className="block w-full text-left text-gray-300 hover:text-green-400 transition py-2">📦 How It Works</button>
              <button onClick={() => scrollToSection('testimonials')} className="block w-full text-left text-gray-300 hover:text-green-400 transition py-2">Testimonials</button>
              <button onClick={() => { setShowQuoteForm(true); setMobileMenuOpen(false); }} className="w-full bg-green-400 text-black px-4 py-2 rounded-lg hover:bg-green-300 transition font-bold text-sm mt-4">
                Get Quote
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="pt-40 pb-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-block mb-6 px-4 py-2 bg-green-500/20 border border-green-400/50 rounded-full animate-bounce">
            <span className="text-green-300 text-sm font-semibold">🌍 TRADEFOKUS · EST. 2025 · VERSAVERDE LLP · INDIA</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in">
            <span className="text-white">Global Trade.</span>
            <br />
            <span className="bg-gradient-to-r from-green-300 to-cyan-300 bg-clip-text text-transparent">No Limits. No MOQ.</span>
            <br />
            <span className="text-gray-400">Connecting Traders Worldwide</span>
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-3xl leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Premium import-export mediation for 45+ agricultural & industrial commodities. Direct from verified suppliers near major Indian ports. Trusted by traders in 100+ countries. Fast logistics. Zero MOQ. Real partnerships.
          </p>
          <div className="bg-yellow-900/40 border border-yellow-600/50 rounded-lg p-4 mb-10 w-fit animate-shimmer">
            <span className="text-yellow-300 font-semibold">⭐ #1 Cashew Exporter Network · 30+ Agri Products · 15+ Industrial Materials</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-6">
            <button onClick={() => scrollToSection('agri')} className="bg-green-400 text-black px-8 py-4 rounded-full hover:bg-green-300 hover:shadow-2xl hover:shadow-green-500/50 transition duration-300 font-bold text-lg flex items-center gap-2 transform hover:scale-105">
              <span>🌾</span> Explore Agri
            </button>
            <button onClick={() => scrollToSection('non-agri')} className="bg-cyan-400 text-black px-8 py-4 rounded-full hover:bg-cyan-300 hover:shadow-2xl hover:shadow-cyan-500/50 transition duration-300 font-bold text-lg flex items-center gap-2 transform hover:scale-105">
              <span>🏭</span> Industrial Goods
            </button>
            <button onClick={() => setShowQuoteForm(true)} className="border-2 border-green-400 text-green-300 px-8 py-4 rounded-full hover:bg-green-500/10 transition duration-300 font-bold text-lg transform hover:scale-105">
              Get Live Quote →
            </button>
          </div>
        </div>
      </section>

      {/* Commodity Categories */}
      <section id="categories" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-green-950/20 to-transparent">
        <div className="max-w-7xl mx-auto">
          {/* Trust Section */}
          <div className="mb-20 text-center">
            <h2 className="text-4xl font-bold mb-6">Why Global Traders Trust tradeFokus</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { icon: '✓', label: '10K+ Successful Trades', detail: 'Verified transactions' },
                { icon: '🌍', label: '100+ Countries', detail: 'Global network' },
                { icon: '⚡', label: '5-15 Days', detail: 'Average delivery' },
                { icon: '💎', label: '100% Secure', detail: 'Verified suppliers' },
              ].map((item, idx) => (
                <div key={idx} className="bg-gray-900/50 border border-green-500/30 rounded-xl p-6 hover:border-green-400/50 hover:bg-green-950/20 transition duration-300 transform hover:-translate-y-2">
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <div className="font-bold text-green-300 mb-1">{item.label}</div>
                  <div className="text-sm text-gray-400">{item.detail}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Commodity Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Agricultural Commodities */}
            <div id="agri" className="bg-gradient-to-br from-green-900/40 to-green-950/40 border border-green-500/30 rounded-2xl p-10 hover:border-green-400/50 hover:shadow-2xl hover:shadow-green-500/20 transition duration-300 transform hover:-translate-y-4">
              <div className="text-6xl mb-6 animate-bounce">🌾</div>
              <h3 className="text-3xl font-bold mb-4 text-green-300">Agricultural Commodities</h3>
              <p className="text-gray-300 mb-6">Rice · Pulses · Lentils · <span className="text-green-400 font-bold">Cashew</span> · Coconut & Byproducts · Premium Nuts · Spices · Vegetables · Fruits · Sugar</p>
              <div className="text-green-400 text-sm font-semibold mb-4">🏆 30+ Products · Farm to Port · ISO Certified</div>
              <a onClick={() => scrollToSection('rates')} className="text-green-400 font-bold hover:text-green-300 transition cursor-pointer text-lg">EXPLORE AGRI →</a>
            </div>

            {/* Non-Agricultural Commodities */}
            <div id="non-agri" className="bg-gradient-to-br from-cyan-900/40 to-cyan-950/40 border border-cyan-500/30 rounded-2xl p-10 hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-500/20 transition duration-300 transform hover:-translate-y-4">
              <div className="text-6xl mb-6 animate-bounce" style={{ animationDelay: '0.5s' }}>🏭</div>
              <h3 className="text-3xl font-bold mb-4 text-cyan-300">Industrial Commodities</h3>
              <p className="text-gray-300 mb-6">Copper Cathode · Aluminium Ingots · All Scrap Categories · HMS · Stainless Steel · Rails · MS · LME Grade Materials</p>
              <div className="text-cyan-400 text-sm font-semibold mb-4">📊 15+ Products · LME Grade · Real-time Pricing</div>
              <a onClick={() => scrollToSection('rates')} className="text-cyan-400 font-bold hover:text-cyan-300 transition cursor-pointer text-lg">EXPLORE INDUSTRIAL →</a>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-950/20 to-cyan-950/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">45</div>
              <p className="text-gray-400">Commodities</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">0</div>
              <p className="text-gray-400">Min. Order Qty</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-cyan-400 mb-2">20%</div>
              <p className="text-gray-400">Cost Savings</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">Pan-India</div>
              <p className="text-gray-400">Global Export</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose tradeFokus?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '⚡',
                title: 'Fast Turnaround',
                desc: 'From port to your location in record time with optimized logistics'
              },
              {
                icon: '💰',
                title: 'Best Rates',
                desc: 'Direct from suppliers near ports. No middlemen. Best prices guaranteed'
              },
              {
                icon: '📦',
                title: 'Any Quantity',
                desc: 'No MOQ. Small orders clubbed with existing shipments for savings'
              },
              {
                icon: '🌍',
                title: 'Global Network',
                desc: 'Pan-India supplier base. Export to 100+ countries worldwide'
              },
              {
                icon: '📄',
                title: 'Documentation',
                desc: 'End-to-end export documentation and customs clearance support'
              },
              {
                icon: '✅',
                title: 'Quality Assured',
                desc: 'Lab tested, certified commodities with full traceability'
              },
            ].map((feature, idx) => (
              <div key={idx} className="bg-gray-900/50 border border-green-500/20 rounded-xl p-6 hover:border-green-400/50 transition duration-300">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-green-300">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Commodity Rates */}
      <section id="rates" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12">Live Commodity Rates</h2>
          <div className="bg-green-500 text-black font-bold px-4 py-3 rounded-lg mb-6 inline-block">
            ✓ LIVE RATES
          </div>
          <div className="overflow-x-auto">
            <div className="flex gap-6 pb-6 overflow-x-auto">
              {commodityRates.map((item, idx) => (
                <div key={idx} className="flex-shrink-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6 border border-green-500/20 hover:border-green-400/50 transition duration-300 min-w-max">
                  <div className="text-2xl font-bold mb-2">{item.name}</div>
                  <div className="text-3xl font-bold mb-2">₹{item.price}</div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-bold ${item.changePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {item.changePercent >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%
                    </span>
                    <span className="text-gray-500 text-sm">{item.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: 1, title: 'Browse Commodities', desc: 'Explore 45+ agricultural & industrial products' },
              { step: 2, title: 'Check Live Rates', desc: 'Real-time pricing updated every hour' },
              { step: 3, title: 'Request Quote', desc: 'Submit your requirement, any quantity' },
              { step: 4, title: 'Execute Trade', desc: 'Fast shipping, documentation & clearance' },
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="bg-green-500 text-black font-bold w-12 h-12 rounded-full flex items-center justify-center mb-4 text-lg">
                  {item.step}
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
                {idx < 3 && <div className="absolute top-6 left-16 w-12 h-1 bg-green-500 hidden md:block"></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trader Testimonials */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-green-950/20 to-transparent">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-green-300 to-cyan-300 bg-clip-text text-transparent">Trusted by Global Traders</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                name: 'Ahmed Hassan', 
                country: 'UAE',
                role: 'Commodity Importer',
                quote: 'Seamless experience. Got my first cashew shipment in 12 days. Professional team, transparent pricing.',
                trades: '50+ trades',
                rating: 5
              },
              { 
                name: 'Maria Santos', 
                country: 'Brazil',
                role: 'Trade Manager',
                quote: 'Finally a platform with NO MOQ. Small batch orders treated with same professionalism as large ones.',
                trades: '30+ trades',
                rating: 5
              },
              { 
                name: 'Raj Kumar', 
                country: 'Singapore',
                role: 'Buyer',
                quote: 'Real-time market data, verified suppliers, instant quotes. This is the future of commodity trading.',
                trades: '100+ trades',
                rating: 5
              },
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-gray-900/60 border border-green-500/20 rounded-xl p-8 hover:border-green-400/50 hover:bg-green-950/30 transition duration-300 transform hover:scale-105 group">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-400 to-cyan-400 flex items-center justify-center font-bold text-black text-lg">{testimonial.name[0]}</div>
                  <div>
                    <div className="font-bold text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.country} • {testimonial.role}</div>
                  </div>
                </div>
                <p className="text-gray-200 mb-4 italic leading-relaxed">"{testimonial.quote}"</p>
                <div className="flex items-center justify-between">
                  <div className="text-green-400 text-sm">{'★'.repeat(testimonial.rating)} {testimonial.trades}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Quote CTA */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-900/40 to-cyan-900/40">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">Ready to Trade Global Commodities?</h2>
          <p className="text-xl text-gray-300 mb-10">Get competitive quotes from verified suppliers. No MOQ. Any quantity welcome.</p>
          <button onClick={() => setShowQuoteForm(true)} className="bg-green-400 text-black px-12 py-4 rounded-full hover:bg-green-300 transition font-bold text-lg shadow-xl">
            Get a Quote Now
          </button>
        </div>
      </section>

      {/* Statistics & Credibility */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-900/40 to-cyan-900/40">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: '📦', label: 'Trades Completed', value: '10,000+' },
              { icon: '🌍', label: 'Countries Served', value: '100+' },
              { icon: '🏢', label: 'Verified Suppliers', value: '500+' },
              { icon: '✅', label: 'Success Rate', value: '99.8%' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center group">
                <div className="text-5xl mb-3 group-hover:scale-110 transition duration-300">{stat.icon}</div>
                <div className="text-3xl font-bold text-green-400 mb-1">{stat.value}</div>
                <div className="text-gray-300 text-sm font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: 'What is the minimum order quantity?', a: 'Zero! We accept any quantity. Small orders can be clubbed with existing shipments to reduce costs.' },
              { q: 'How long does delivery take?', a: 'Typically 5-15 days depending on commodity and destination. We have suppliers near major ports for fast turnaround.' },
              { q: 'Do you handle export documentation?', a: 'Yes, complete export documentation, customs clearance, and shipping coordination included.' },
              { q: 'Which countries do you export to?', a: 'We export to 100+ countries. Most exports go to Southeast Asia, Middle East, Africa, and Europe.' },
            ].map((item, idx) => (
              <div key={idx} className="bg-gray-900/50 border border-green-500/20 rounded-lg p-6 hover:border-green-400/50 transition duration-300">
                <h3 className="font-bold text-lg text-green-300 mb-2">{item.q}</h3>
                <p className="text-gray-400">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-green-500/20 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="text-2xl font-bold mb-2">
                <span>Trade</span>
                <span className="text-green-400">fokus</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">Global commodity trading platform connecting exporters with buyers worldwide. No MOQ. Direct supplier connections.</p>
              <div className="flex gap-3">
                <a href="https://www.linkedin.com/company/tradefokus" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center text-green-400 hover:bg-green-500/40 transition">📱</a>
                <a href="https://twitter.com/tradefokus" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center text-green-400 hover:bg-green-500/40 transition">🌐</a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Explore</h4>
              <ul className="space-y-2">
                <li><button onClick={() => scrollToSection('hero')} className="text-gray-400 hover:text-green-400 transition text-sm">Home</button></li>
                <li><button onClick={() => scrollToSection('categories')} className="text-gray-400 hover:text-green-400 transition text-sm">Categories</button></li>
                <li><button onClick={() => scrollToSection('rates')} className="text-gray-400 hover:text-green-400 transition text-sm">Live Rates</button></li>
                <li><button onClick={() => scrollToSection('how-it-works')} className="text-gray-400 hover:text-green-400 transition text-sm">How It Works</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><button onClick={() => scrollToSection('testimonials')} className="text-gray-400 hover:text-green-400 transition text-sm">Testimonials</button></li>
                <li><a href="mailto:info@tradefokus.com" className="text-gray-400 hover:text-green-400 transition text-sm">About Us</a></li>
                <li><a href="https://blog.tradefokus.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition text-sm">Blog</a></li>
                <li><a href="mailto:careers@tradefokus.com" className="text-gray-400 hover:text-green-400 transition text-sm">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="mailto:support@tradefokus.com" className="text-gray-400 hover:text-green-400 transition text-sm">📧 support@tradefokus.com</a></li>
                <li><a href="mailto:info@tradefokus.com" className="text-gray-400 hover:text-green-400 transition text-sm">📧 info@tradefokus.com</a></li>
                <li><a href="#" className="text-gray-400 hover:text-green-400 transition text-sm">Terms & Conditions</a></li>
                <li><a href="#" className="text-gray-400 hover:text-green-400 transition text-sm">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-green-500/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 text-sm">&copy; 2025 tradeFokus. All rights reserved.</p>
              <p className="text-gray-500 text-sm">VERSAVERDE LLP | EST. 2025 | INDIA 🇮🇳</p>
              <div className="text-xs text-gray-600 text-center md:text-right">
                <p>Connecting Global Traders Since 2025</p>
                <p>100+ Countries | 500+ Suppliers | 99.8% Success Rate</p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Quote Form Modal */}
      {showQuoteForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-2xl p-8 max-w-md w-full border border-green-500/20">
            <h3 className="text-2xl font-bold mb-6">Get a Free Quote</h3>
            <form onSubmit={(e) => { e.preventDefault(); alert('Quote request submitted!'); setShowQuoteForm(false); }} className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full bg-gray-800 border border-green-500/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-green-400 focus:outline-none"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-gray-800 border border-green-500/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-green-400 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Commodity/Product"
                className="w-full bg-gray-800 border border-green-500/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-green-400 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Quantity Required"
                className="w-full bg-gray-800 border border-green-500/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-green-400 focus:outline-none"
              />
              <textarea
                placeholder="Additional Details"
                rows={3}
                className="w-full bg-gray-800 border border-green-500/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-green-400 focus:outline-none resize-none"
              ></textarea>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-green-400 text-black px-4 py-2 rounded-lg hover:bg-green-300 transition font-bold"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setShowQuoteForm(false)}
                  className="flex-1 border border-green-500/20 text-green-400 px-4 py-2 rounded-lg hover:bg-green-500/10 transition font-bold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
