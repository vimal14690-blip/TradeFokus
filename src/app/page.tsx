'use client';

import { useState, useEffect, useRef } from 'react';

interface CommodityRate {
  name: string;
  unit: string;
  price: string;
  change: number;
  origin?: string;
  grade?: string;
  moq?: string;
  range52w?: string;
  packaging?: string;
}

interface DetailData {
  title: string;
  icon: string;
  accent: 'green' | 'amber' | 'blue' | 'orange';
  overview: string;
  metrics: { label: string; value: string }[];
  features: string[];
  useCases: string[];
  clients: string;
}

const ACCENT = {
  green:  { grad: 'from-green-900/80 to-green-950/95', border: 'border-green-400/50', ring: 'ring-green-400/40', text: 'text-green-400', badgeBg: 'bg-green-500/20', dot: 'bg-green-400', bar: 'bg-green-400', metricBg: 'bg-green-900/40', numGlow: 'drop-shadow-[0_0_12px_rgba(34,197,94,1)] drop-shadow-[0_0_24px_rgba(34,197,94,0.5)]' },
  amber:  { grad: 'from-amber-900/80 to-[#0d1f0d]/95',  border: 'border-amber-400/50', ring: 'ring-amber-400/40',  text: 'text-amber-400', badgeBg: 'bg-amber-500/20',  dot: 'bg-amber-400',  bar: 'bg-amber-400',  metricBg: 'bg-amber-900/40',  numGlow: 'drop-shadow-[0_0_12px_rgba(245,158,11,1)] drop-shadow-[0_0_24px_rgba(245,158,11,0.5)]' },
  blue:   { grad: 'from-blue-900/80 to-[#0d1525]/95',    border: 'border-blue-400/50',  ring: 'ring-blue-400/40',   text: 'text-blue-400',  badgeBg: 'bg-blue-500/20',   dot: 'bg-blue-400',   bar: 'bg-blue-400',   metricBg: 'bg-blue-900/40',   numGlow: 'drop-shadow-[0_0_12px_rgba(59,130,246,1)] drop-shadow-[0_0_24px_rgba(59,130,246,0.5)]' },
  orange: { grad: 'from-orange-900/80 to-[#0d1f0d]/95',  border: 'border-orange-400/50',ring: 'ring-orange-400/40', text: 'text-orange-400',badgeBg: 'bg-orange-500/20', dot: 'bg-orange-400', bar: 'bg-orange-400', metricBg: 'bg-orange-900/40', numGlow: 'drop-shadow-[0_0_12px_rgba(249,115,22,1)] drop-shadow-[0_0_24px_rgba(249,115,22,0.5)]' },
};

function DetailModal({ data, onClose, wa }: { data: DetailData; onClose: () => void; wa: string }) {
  const a = ACCENT[data.accent] || ACCENT.green;
  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-lg z-[60] flex items-center justify-center p-3 sm:p-6" onClick={onClose}>
      <div
        className={`relative bg-[#0b180b] border ${a.border} ring-1 ${a.ring} rounded-3xl max-w-2xl w-full shadow-[0_0_80px_rgba(0,0,0,0.8)] max-h-[92vh] overflow-y-auto`}
        style={{ animation: 'fadeSlideUp 0.35s cubic-bezier(0.16,1,0.3,1) forwards' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Gradient Header */}
        <div className={`bg-gradient-to-br ${a.grad} rounded-t-3xl p-6 pb-5 relative overflow-hidden`}>
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, white 0%, transparent 60%)' }} />
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition text-lg leading-none">&times;</button>
          <div className="flex items-center gap-4 pr-10">
            <div className={`w-14 h-14 rounded-2xl ${a.metricBg} border ${a.border} flex items-center justify-center text-3xl flex-shrink-0`}>{data.icon}</div>
            <div>
              <div className={`text-[10px] font-black tracking-[0.2em] uppercase ${a.text} mb-1`}>TradeFokus Intelligence</div>
              <h3 className="text-lg sm:text-xl font-black text-white leading-tight">{data.title}</h3>
            </div>
          </div>
          <p className="text-gray-300 text-xs leading-relaxed mt-4">{data.overview}</p>
        </div>

        <div className="p-5 space-y-5">
          {/* Metrics — 3 per row, big numbers */}
          <div>
            <div className={`text-[10px] font-black tracking-[0.15em] uppercase ${a.text} mb-3 flex items-center gap-2`}>
              <div className={`w-3 h-0.5 ${a.bar}`} /> Key Performance Metrics
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {data.metrics.map((m, i) => (
                <div key={i} className={`${a.metricBg} border ${a.border} rounded-2xl p-3 text-center hover:scale-105 transition-transform`}>
                  <div className={`text-xl sm:text-2xl font-black ${a.text} ${a.numGlow} leading-none mb-1`}>{m.value}</div>
                  <div className="text-[9px] text-gray-500 uppercase tracking-wider leading-tight">{m.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Features — numbered list */}
          <div>
            <div className={`text-[10px] font-black tracking-[0.15em] uppercase ${a.text} mb-3 flex items-center gap-2`}>
              <div className={`w-3 h-0.5 ${a.bar}`} /> Platform Capabilities
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {data.features.map((f, i) => (
                <div key={i} className="flex items-start gap-2.5 bg-white/[0.025] rounded-xl px-3 py-2.5 hover:bg-white/[0.04] transition">
                  <span className={`text-[10px] font-black ${a.text} mt-0.5 flex-shrink-0 w-4`}>0{i + 1}</span>
                  <span className="text-gray-300 text-xs leading-relaxed">{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Use Cases */}
          <div>
            <div className={`text-[10px] font-black tracking-[0.15em] uppercase ${a.text} mb-3 flex items-center gap-2`}>
              <div className={`w-3 h-0.5 ${a.bar}`} /> Real-World Use Cases
            </div>
            <div className="space-y-1.5">
              {data.useCases.map((u, i) => (
                <div key={i} className="flex items-start gap-2.5 bg-white/[0.02] border border-white/[0.04] rounded-xl px-3 py-2.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${a.dot} mt-1.5 flex-shrink-0`} />
                  <span className="text-gray-300 text-xs leading-relaxed">{u}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Client strip */}
          <div className={`${a.badgeBg} border ${a.border} rounded-2xl p-4 flex items-start gap-3`}>
            <span className="text-xl flex-shrink-0">&#x1F3C6;</span>
            <p className="text-gray-300 text-xs italic leading-relaxed">{data.clients}</p>
          </div>

          {/* CTAs */}
          <div className="flex gap-3 pt-1">
            <a href={`https://wa.me/918838442155?text=${encodeURIComponent(`Hi TradeFokus! I'm interested in: ${data.title}. Please share detailed pricing, specs, and how this can help my business.`)}`} target="_blank" rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white py-3.5 rounded-2xl font-black text-sm hover:bg-[#20c05c] transition hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(37,211,102,0.3)]">
              &#x1F4F1; Discuss with Expert
            </a>
            <button onClick={onClose}
              className="px-5 border border-white/10 text-gray-500 py-3.5 rounded-2xl hover:bg-white/5 hover:text-gray-300 transition font-semibold text-sm">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
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
  @keyframes spinGlobe {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  @keyframes orbitDot {
    0% { transform: rotate(0deg) translateX(110px) rotate(0deg); opacity:0.7; }
    50% { opacity:1; }
    100% { transform: rotate(360deg) translateX(110px) rotate(-360deg); opacity:0.7; }
  }
  @keyframes neonPulse {
    0%, 100% { opacity: 0.6; filter: blur(25px); }
    50% { opacity: 1; filter: blur(35px); }
  }
  @keyframes floatSlow {
    0%, 100% { transform: translateY(0px) translateX(0px); }
    25% { transform: translateY(-8px) translateX(4px); }
    75% { transform: translateY(6px) translateX(-3px); }
  }
  .anim-spinGlobe { animation: spinGlobe 40s linear infinite; }
  .anim-orbit1 { animation: orbitDot 10s linear infinite; }
  .anim-orbit2 { animation: orbitDot 14s linear reverse infinite; }
  .anim-orbit3 { animation: orbitDot 18s linear infinite; }
  .neon-glow { animation: neonPulse 3s ease-in-out infinite; }
  .anim-floatSlow { animation: floatSlow 8s ease-in-out infinite; }

  @keyframes connectPulse {
    0%, 100% { transform: scale(0.6); opacity: 0.2; box-shadow: 0 0 5px currentColor; }
    50% { transform: scale(1.4); opacity: 1; box-shadow: 0 0 25px currentColor, 0 0 50px currentColor; }
  }
  @keyframes dataFlow {
    0% { transform: translateY(100px); opacity: 0; }
    15% { opacity: 0.9; }
    85% { opacity: 0.6; }
    100% { transform: translateY(-200px); opacity: 0; }
  }
  @keyframes networkBeam {
    0% { opacity: 0; clip-path: inset(0 100% 0 0); }
    30% { opacity: 0.7; clip-path: inset(0 30% 0 0); }
    60% { opacity: 0.4; clip-path: inset(0 0 0 0); }
    100% { opacity: 0; clip-path: inset(0 0 0 100%); }
  }
  @keyframes colorShift {
    0% { filter: hue-rotate(0deg) brightness(1); }
    33% { filter: hue-rotate(120deg) brightness(1.3); }
    66% { filter: hue-rotate(240deg) brightness(1.1); }
    100% { filter: hue-rotate(360deg) brightness(1); }
  }
  @keyframes globePulse {
    0%, 100% { box-shadow: 0 0 30px rgba(34,197,94,0.3), 0 0 60px rgba(59,130,246,0.1), inset 0 0 30px rgba(139,92,246,0.05); }
    33% { box-shadow: 0 0 50px rgba(59,130,246,0.5), 0 0 100px rgba(236,72,153,0.2), inset 0 0 50px rgba(139,92,246,0.1); }
    66% { box-shadow: 0 0 40px rgba(139,92,246,0.4), 0 0 80px rgba(34,197,94,0.15), inset 0 0 40px rgba(59,130,246,0.08); }
  }
  @keyframes starTwinkle {
    0%, 100% { opacity: 0.15; transform: scale(0.6); }
    50% { opacity: 1; transform: scale(1.4); }
  }
  @keyframes dotPing {
    0% { transform: scale(1); opacity: 0.8; }
    100% { transform: scale(3.5); opacity: 0; }
  }
  @keyframes ringExpand {
    0% { transform: scale(0.5); opacity: 0.6; }
    100% { transform: scale(2.5); opacity: 0; }
  }
  @keyframes trippyBg {
    0% { background-position: 0% 50%; filter: hue-rotate(0deg); }
    50% { background-position: 100% 50%; filter: hue-rotate(180deg); }
    100% { background-position: 0% 50%; filter: hue-rotate(360deg); }
  }
  .anim-connectPulse { animation: connectPulse 2.5s ease-in-out infinite; }
  .anim-dataFlow { animation: dataFlow 3s linear infinite; }
  .anim-networkBeam { animation: networkBeam 4s ease infinite; }
  .anim-colorShift { animation: colorShift 12s linear infinite; }
  .anim-globePulse { animation: globePulse 5s ease-in-out infinite; }
  .anim-star { animation: starTwinkle 2s ease-in-out infinite; }
  .anim-dotPing { animation: dotPing 2s ease-out infinite; }
  .anim-ring { animation: ringExpand 3s ease-out infinite; }
  .anim-trippyBg { background-size: 300% 300%; animation: trippyBg 8s ease infinite; }
`;

const commodityRates: CommodityRate[] = [
  { name: 'Rice (IR 64)',    unit: '/qtl', price: '\u20b92,180',  change:  1.2,  origin: 'Andhra Pradesh, India', grade: 'IR 64 \u2013 5% Broken', moq: '25 MT', range52w: '\u20b91,950 \u2013 \u20b92,400', packaging: '25/50 kg PP Bags' },
  { name: 'Pepper (Black)',  unit: '/MT',  price: '\u20b955,000', change:  0.8,  origin: 'Kerala / Karnataka', grade: 'ASTA Grade 550 GL', moq: '5 MT', range52w: '\u20b948,000 \u2013 \u20b962,000', packaging: 'Double-layer jute bags' },
  { name: 'Maize',           unit: '/qtl', price: '\u20b91,890',  change: -0.4,  origin: 'Karnataka / Bihar', grade: 'Yellow Maize, 14% Moisture', moq: '50 MT', range52w: '\u20b91,680 \u2013 \u20b92,100', packaging: '50 kg PP bags' },
  { name: 'Sugar (S30)',     unit: '/qtl', price: '\u20b93,640',  change:  0.6,  origin: 'Maharashtra / UP', grade: 'S-30, ICUMSA 100\u2013150', moq: '100 MT', range52w: '\u20b93,200 \u2013 \u20b93,900', packaging: '50 kg HDPE bags' },
  { name: 'Copper Cathode',  unit: '/MT',  price: '$8,942',       change:  0.3,  origin: 'Chile / Zambia', grade: 'LME Grade A (99.99%)', moq: '20 MT', range52w: '$7,800 \u2013 $9,400', packaging: 'Bundled on pallets' },
  { name: 'Aluminium Ingot', unit: '/MT',  price: '$2,350',       change: -0.9,  origin: 'India / Middle East', grade: 'P1020A (99.7%)', moq: '25 MT', range52w: '$2,100 \u2013 $2,600', packaging: 'Ingot bundles, strapped' },
  { name: 'Palm Oil (CPO)',  unit: '/qtl', price: '\u20b98,800',  change:  1.5,  origin: 'Malaysia / Indonesia', grade: 'Crude Palm Oil, FFA 5% max', moq: '100 MT', range52w: '\u20b97,500 \u2013 \u20b99,800', packaging: 'Flexitank / ISO tank' },
  { name: 'Teak (Grade A)',  unit: '/CBM', price: '$920',         change:  0.0,  origin: 'Myanmar / Ghana', grade: 'Grade A, KD 12%', moq: '40 CBM', range52w: '$850 \u2013 $1,050', packaging: 'Sawn timber bundles' },
  { name: 'Cashew',          unit: '/kg',  price: '\u20b9450',    change:  5.89, origin: 'Andhra Pradesh / Odisha', grade: 'W320, W240', moq: '10 MT', range52w: '\u20b9380 \u2013 \u20b9520', packaging: '11.34 kg tins (50 lbs)' },
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

const platformDetails: Record<string, DetailData> = {
  'Live Market Prices \u2013 Agri & Non-Agri': { title:'Live Market Prices \u2013 Agri & Non-Agri', icon:'\uD83C\uDF10', accent:'green', overview:'Real-time commodity price intelligence aggregated from NCDEX, MCX, LME, APEDA, and direct market feeds. Prices update every 15 minutes across 50+ commodities spanning grains, spices, metals, chemicals, and timber.', metrics:[{label:'Commodities Tracked',value:'50+'},{label:'Update Frequency',value:'15 min'},{label:'Data Sources',value:'6+'},{label:'Price History',value:'5 Years'},{label:'Alert Types',value:'SMS/Email'},{label:'Accuracy',value:'99.2%'}], features:['NCDEX/MCX/LME live feed integration','APEDA export price benchmarks','Mandi-level price aggregation for agri commodities','Custom price alerts via SMS and email','Historical trend charts with moving averages','Multi-currency support (INR, USD, EUR, GBP)'], useCases:['Procurement teams benchmarking supplier quotes against live market','Export houses tracking FOB price competitiveness','CFOs monitoring commodity exposure and hedging triggers','Farmers checking fair price before selling to aggregators'], clients:'Trusted by procurement teams at Nestl\u00e9, HAVI, and leading FMCG commodity desks for daily price validation.'},
  'Full Supply Chain Management': { title:'Full Supply Chain Management', icon:'\uD83D\uDCE6', accent:'green', overview:'End-to-end orchestration from procurement to delivery. TradeFokus manages the entire trade lifecycle \u2014 sourcing, quality inspection, documentation, inland logistics, ocean freight, and final-mile delivery tracking.', metrics:[{label:'Trade Stages',value:'6'},{label:'Avg. Lead Time Reduction',value:'40%'},{label:'Document Automation',value:'95%'},{label:'Partner Network',value:'200+'},{label:'Active Routes',value:'80+'},{label:'Success Rate',value:'98.5%'}], features:['Unified dashboard for all trade stages','Automated milestone tracking and notifications','Integrated vendor and partner management','Real-time exception handling and escalation','Digital document generation and archival','Performance analytics and SLA monitoring'], useCases:['Multi-origin sourcing with consolidated shipment management','Complex multi-modal logistics (truck + rail + vessel)','Time-critical seasonal commodity procurement','Cross-border compliance with automated documentation'], clients:'Enterprise supply chain teams at Nestl\u00e9, HAVI, Olam, and ITC rely on structured trade execution for consistent delivery.'},
  'Inland & International Freight Listing': { title:'Inland & International Freight Listing', icon:'\uD83D\uDE82', accent:'amber', overview:'Compare and book inland trucking, rail, and international ocean freight from a single interface. Access verified transport partners, real-time rates, and sailing schedules for seamless cargo movement.', metrics:[{label:'Transport Partners',value:'150+'},{label:'Shipping Lines',value:'12+'},{label:'Route Coverage',value:'India + 40 countries'},{label:'Rate Updates',value:'Daily'},{label:'Booking Time',value:'< 3 min'},{label:'Cost Savings',value:'25%'}], features:['Inland truck and container rate comparison','Ocean FCL/LCL rate aggregation','Real-time sailing schedule lookup','Multi-modal route optimization','Digital booking and confirmation','Freight invoice reconciliation'], useCases:['Comparing inland freight from farm to nearest port','Booking ocean freight for bulk agri exports','Multi-modal routing for landlocked origin points','Consolidating LCL shipments for cost efficiency'], clients:'Logistics managers at global commodity traders use TradeFokus to cut freight procurement time by 60%.'},
  'Real-Time Shipment Tracking': { title:'Real-Time Shipment Tracking', icon:'\uD83D\uDCE1', accent:'blue', overview:'Track every shipment in real time \u2014 from farm gate pickup through inland transit, port operations, ocean voyage, to destination delivery. GPS tracking for trucks and AIS tracking for vessels.', metrics:[{label:'Tracking Points',value:'GPS + AIS'},{label:'Update Interval',value:'10 min'},{label:'Geofence Alerts',value:'Unlimited'},{label:'ETA Accuracy',value:'96%'},{label:'Vessel Coverage',value:'Global'},{label:'Transit Visibility',value:'100%'}], features:['Real-time GPS truck tracking with driver contact','AIS-based ocean vessel tracking','Automated ETA updates and delay alerts','Geofence entry/exit notifications','Multi-leg shipment visibility dashboard','Shareable tracking links for buyers'], useCases:['Buyers tracking perishable agri shipments with time-sensitive delivery','Operations teams monitoring multiple concurrent shipments','Sales teams sharing live tracking with end customers','Risk teams getting early warning on potential delays'], clients:'Visibility solutions trusted by Nestl\u00e9 supply chain, HAVI logistics teams, and Fortune 500 procurement divisions.'},
  'End-to-End Trade Documentation': { title:'End-to-End Trade Documentation', icon:'\uD83D\uDCC4', accent:'green', overview:'Auto-generate, manage, and archive every trade document \u2014 from proforma invoice to bill of lading. Built-in compliance checklists for APEDA, FSSAI, and customs regulations.', metrics:[{label:'Document Types',value:'25+'},{label:'Generation Time',value:'< 3 min'},{label:'Error Reduction',value:'92%'},{label:'Compliance Rate',value:'100%'},{label:'Archive Period',value:'7 Years'},{label:'Template Library',value:'50+'}], features:['One-click document pack generation','APEDA/FSSAI compliance wizards','HS code classification assistant','Digital signature and e-BL support','Automated document verification','Secure cloud archival with audit trail'], useCases:['First-time exporters needing guided documentation','Bulk commodity shipments requiring 15+ documents per consignment','Regulatory audits requiring instant document retrieval','Multi-country exports with varying compliance requirements'], clients:'Documentation teams at leading Indian export houses save 40+ hours per month using TradeFokus document automation.'},
  'Quality Inspection Coordination': { title:'Quality Inspection Coordination', icon:'\uD83D\uDD0D', accent:'amber', overview:'Coordinate pre-shipment inspections, lab testing, and quality certification through our vetted network of 50+ inspection agencies across India.', metrics:[{label:'Inspection Agencies',value:'50+'},{label:'Lab Partners',value:'30+'},{label:'Turnaround Time',value:'48\u201372 hrs'},{label:'Parameters Tested',value:'200+'},{label:'Certificate Types',value:'15+'},{label:'Pass Rate',value:'94%'}], features:['Pre-shipment inspection (PSI) booking','Certificate of Analysis (COA) coordination','Phytosanitary and fumigation scheduling','FSSAI and FDA compliance testing','Photo and video documentation of inspection','Digital certificate delivery and archival'], useCases:['Buyers requiring PSI before releasing payment','Exporters needing phytosanitary certificates for EU/US markets','Quality disputes requiring third-party verification','New supplier qualification through sample testing'], clients:'Quality assurance teams at Nestl\u00e9, Mars, and global retailers require TradeFokus-grade inspection coordination.'},
  'AI Supply & Demand Predictions': { title:'AI Supply & Demand Predictions', icon:'\uD83E\uDD16', accent:'blue', overview:'Machine learning models trained on 5 years of trade data, satellite imagery, weather patterns, APMC arrivals, and global demand signals to forecast commodity availability and price direction 30\u201390 days ahead.', metrics:[{label:'Forecast Horizon',value:'30\u201390 days'},{label:'Model Accuracy',value:'87%'},{label:'Data Points',value:'2M+'},{label:'Commodities Covered',value:'35+'},{label:'Update Cycle',value:'Weekly'},{label:'Signal Sources',value:'12+'}], features:['Price direction forecasting with confidence intervals','Seasonal harvest prediction using satellite data','Demand trend analysis from import/export data','Weather impact modeling on crop yields','APMC arrival analytics and trend spotting','Custom forecast reports by commodity and region'], useCases:['Procurement teams planning 90-day forward purchases','CFOs hedging commodity price risk','Farmers deciding optimal harvest timing','Export houses projecting seasonal supply windows'], clients:'AI forecasting adopted by strategic sourcing teams at Nestl\u00e9, HAVI, and top-5 Indian spice exporters.'},
  'Verified Buyer\u2013Supplier Matching': { title:'Verified Buyer\u2013Supplier Matching', icon:'\uD83E\uDD1D', accent:'green', overview:'Smart matching engine that connects verified buyers with trusted suppliers based on commodity type, grade requirements, volume capacity, delivery preference, and trade history.', metrics:[{label:'Verified Suppliers',value:'500+'},{label:'Active Buyers',value:'200+'},{label:'Match Accuracy',value:'91%'},{label:'Avg. Response Time',value:'< 4 hrs'},{label:'Countries',value:'25+'},{label:'Trade Success',value:'89%'}], features:['Multi-parameter matching algorithm','Supplier verification with trade history and ratings','Buyer requirement broadcasting','Automated quote collection and comparison','Credit and compliance pre-screening','Direct messaging and negotiation tools'], useCases:['New buyers entering Indian commodity market','Suppliers seeking premium international buyers','Diversifying supplier base to reduce concentration risk','Emergency sourcing when primary supplier defaults'], clients:'Buyer-supplier matching trusted by enterprise procurement at Nestl\u00e9, Cargill, and regional commodity trading houses.'},
};

const agriFeatureDetails: Record<string, DetailData> = {
  'Live FOB & Local Prices': { title:'Live FOB & Local Prices', icon:'\uD83D\uDCB0', accent:'green', overview:'Real-time FOB and local mandi price feeds for all listed agricultural commodities, segmented by region, market, and grade. Prices sourced from APEDA, NCDEX, and direct market correspondents.', metrics:[{label:'Markets Tracked',value:'120+'},{label:'Price Points',value:'500+/day'},{label:'Regions',value:'All India'},{label:'FOB Ports',value:'12'},{label:'Grade Variants',value:'3\u20135 per commodity'},{label:'Latency',value:'< 15 min'}], features:['Mandi-wise price breakdown with daily highs/lows','FOB price calculation with freight and port charges','Price comparison across multiple mandis','Historical price charts by market','Export parity price calculator','SMS/email price alerts by commodity'], useCases:['Exporters calculating competitiveness of Indian origin','Farmers comparing mandi prices before selling','Procurement teams validating supplier price quotes','Trade analysts tracking regional price spreads'], clients:'Used by APEDA-registered exporters and Nestl\u00e9 India sourcing teams for daily price benchmarking.'},
  'Buyer-Farmer Direct Connect': { title:'Buyer-Farmer Direct Connect', icon:'\uD83E\uDD1D', accent:'green', overview:'Eliminate middlemen by connecting verified international buyers directly with farmers, FPOs, and mill operators. Transparent pricing, verified profiles, and platform-mediated negotiations.', metrics:[{label:'Registered Farmers',value:'2,000+'},{label:'FPOs',value:'150+'},{label:'Mill Partners',value:'80+'},{label:'Direct Trades',value:'500+/yr'},{label:'Margin Saved',value:'8\u201315%'},{label:'Response Time',value:'< 6 hrs'}], features:['Verified farmer and FPO profile directory','Direct price negotiation without brokers','Platform-mediated escrow payment','Quality verification at source','Volume aggregation from multiple small farmers','Multi-language support (Telugu, Hindi, Tamil, English)'], useCases:['International buyers sourcing directly from Indian farmers','FPOs accessing premium export markets','Mill operators finding consistent raw material supply','Organic/specialty crop buyers requiring traceability'], clients:'Buyer-farmer connectivity trusted by HAVI, Olam, and leading FPO aggregators across Andhra Pradesh and Tamil Nadu.'},
  'Grade & Quality Specs': { title:'Grade & Quality Specifications', icon:'\uD83D\uDCCB', accent:'amber', overview:'Standardized quality specification tables for every listed commodity \u2014 moisture content, broken percentage, foreign matter, purity, FSSAI compliance parameters, and export-grade benchmarks.', metrics:[{label:'Spec Parameters',value:'200+'},{label:'Commodities Covered',value:'50+'},{label:'Standards Referenced',value:'FSSAI/FDA/EU'},{label:'Spec Updates',value:'Monthly'},{label:'Lab Network',value:'30+'},{label:'Digital Certificates',value:'100%'}], features:['Commodity-specific quality parameter tables','FSSAI and export standard compliance indicators','Buyer-specific quality requirement matching','Digital Certificate of Analysis (COA) integration','Grade comparison tool across origins','Quality dispute resolution framework'], useCases:['Buyers setting quality specifications for procurement orders','Exporters ensuring compliance with destination country standards','Quality managers creating inspection checklists','New exporters understanding grade requirements for first shipment'], clients:'Quality teams at Nestl\u00e9, Mars, and multinational retailers reference TradeFokus spec sheets for procurement validation.'},
  'Document Pack Generator': { title:'Document Pack Generator', icon:'\uD83D\uDCC4', accent:'green', overview:'Auto-generate complete export documentation packs in under 3 minutes. Phytosanitary, fumigation, COA, commercial invoice, packing list \u2014 all pre-filled from your trade order.', metrics:[{label:'Document Types',value:'25+'},{label:'Generation Time',value:'< 3 min'},{label:'Error Rate',value:'< 1%'},{label:'Templates',value:'50+'},{label:'Compliance',value:'100%'},{label:'Archives',value:'7 Years'}], features:['One-click full document pack generation','Pre-filled templates from trade order data','APEDA/FSSAI compliance auto-check','Digital signature integration','Document version control and audit trail','Bulk document generation for multi-consignment orders'], useCases:['First-time exporters needing guided document preparation','High-volume traders automating repetitive paperwork','Compliance teams ensuring zero-error documentation','Banks requiring standardized LC documentation'], clients:'Document automation saves 40+ hours/month for export houses handling 20+ shipments monthly.'},
  'Pre-Shipment Inspection': { title:'Pre-Shipment Inspection (PSI)', icon:'\uD83D\uDD0D', accent:'amber', overview:'Book and coordinate pre-shipment inspections through our network of 50+ NABL-accredited inspection agencies. Ensure quality at source before goods move to port.', metrics:[{label:'Agencies',value:'50+'},{label:'Turnaround',value:'48\u201372 hrs'},{label:'Coverage',value:'All India'},{label:'Parameters',value:'200+'},{label:'Reports',value:'Digital + Physical'},{label:'Success Rate',value:'94%'}], features:['Online PSI booking with agency selection','Real-time inspection status tracking','Photo and video documentation','Digital certificate delivery','Re-inspection coordination if needed','Dispute mediation support'], useCases:['Buyers requiring PSI before payment release','Exporters demonstrating quality to overseas clients','Insurance companies requiring inspection documentation','New buyer-supplier relationships building trust'], clients:'Inspection coordination trusted by buyers at Nestl\u00e9, HAVI, and top global importers.'},
  'Seasonal Supply Forecast': { title:'Seasonal Supply Forecast', icon:'\uD83C\uDF31', accent:'green', overview:'AI-driven seasonal harvest and supply predictions using satellite imagery, historical APMC data, weather models, and government crop survey reports. Plan procurement 60\u201390 days ahead.', metrics:[{label:'Forecast Window',value:'60\u201390 days'},{label:'Crop Coverage',value:'25+'},{label:'Accuracy',value:'85%'},{label:'Data Sources',value:'8+'},{label:'Update Cycle',value:'Bi-weekly'},{label:'Regions',value:'All India'}], features:['Satellite-based crop health monitoring','APMC arrival trend analysis','Weather impact forecasting','State-wise production estimates','Kharif/Rabi seasonal planning calendars','Custom forecast subscriptions by commodity'], useCases:['Procurement teams planning seasonal forward contracts','Food companies forecasting raw material availability','Export houses timing shipments with harvest windows','Investors tracking agricultural commodity cycles'], clients:'Seasonal intelligence used by strategic procurement at Nestl\u00e9 India and HAVI Asia Pacific.'},
};

const marketIntelDetails: Record<string, DetailData> = {
  'Supply & Demand Prediction': { title:'AI Supply & Demand Prediction Engine', icon:'\uD83E\uDD16', accent:'green', overview:'Our proprietary ML engine processes 2M+ data points from trade records, satellite imagery, weather APIs, APMC arrivals, import/export statistics, and commodity exchange feeds to forecast price direction and supply availability 30\u201390 days ahead.', metrics:[{label:'Data Points',value:'2M+'},{label:'Forecast Horizon',value:'30\u201390 days'},{label:'Accuracy',value:'87%'},{label:'Commodities',value:'35+'},{label:'Model Updates',value:'Weekly'},{label:'Signal Sources',value:'12+'}], features:['Price direction forecasting with confidence bands','Supply shortage early warning system','Demand surge prediction from import data','Weather-adjusted yield modeling','APMC arrival pattern analysis','Exportable forecast reports (PDF/Excel)'], useCases:['Forward purchasing decisions for commodity buyers','Hedge timing for treasury and risk teams','Farmer advisory on optimal selling windows','Export planning based on predicted supply windows'], clients:'AI-powered forecasting adopted by strategic sourcing at Nestl\u00e9, HAVI, and top-5 Indian commodity exporters.'},
  'Market Sentiment Indicator': { title:'Market Sentiment Indicator', icon:'\uD83D\uDCCA', accent:'amber', overview:'Aggregated sentiment score derived from government policy signals, global trade news, commodity exchange movements, currency fluctuations, and geopolitical events. Updated in real-time for actionable trading intelligence.', metrics:[{label:'Signal Sources',value:'15+'},{label:'Update Frequency',value:'Real-time'},{label:'Sentiment Scale',value:'\u22125 to +5'},{label:'News Sources',value:'50+'},{label:'Policy Tracking',value:'8 countries'},{label:'Alert Speed',value:'< 5 min'}], features:['Composite sentiment score per commodity','Government policy impact analysis','Global trade news aggregation and scoring','Currency impact modeling on commodity prices','Geopolitical risk assessment','Custom watchlists with real-time alerts'], useCases:['Traders gauging market direction before placing orders','Risk managers monitoring geopolitical commodity exposure','Analysts preparing weekly market intelligence reports','Procurement teams timing large purchase decisions'], clients:'Sentiment intelligence reviewed daily by commodity desks at multinational trading houses and FMCG procurement teams.'},
  'Price Alert Engine': { title:'Price Alert Engine', icon:'\uD83D\uDD14', accent:'blue', overview:'Set custom price thresholds for any tracked commodity and receive instant notifications via SMS, email, or WhatsApp when your target price is hit. Configurable for buy triggers, sell triggers, and volatility alerts.', metrics:[{label:'Alert Channels',value:'SMS/Email/WA'},{label:'Trigger Types',value:'Buy/Sell/Vol'},{label:'Delivery Speed',value:'< 30 sec'},{label:'Commodities',value:'50+'},{label:'Active Alerts',value:'Unlimited'},{label:'History',value:'90 days'}], features:['Multi-channel alert delivery (SMS, email, WhatsApp)','Buy price and sell price triggers','Volatility spike detection alerts','Daily/weekly price summary digests','Batch alert configuration for multiple commodities','Alert performance analytics and hit rate tracking'], useCases:['Buyers waiting for target price to place forward orders','Sellers timing sales at peak price points','Risk managers monitoring unexpected price volatility','Analysts tracking price movements across commodity baskets'], clients:'Alert engine used by 200+ active traders and procurement professionals across India and Southeast Asia.'},
  'Historical Trend Charts': { title:'Historical Trend Charts', icon:'\uD83D\uDCC8', accent:'orange', overview:'Interactive price charts spanning 1W, 1M, 3M, 6M, and 1Y timeframes with volume overlay, 20/50-day moving averages, Bollinger bands, and custom annotations for informed procurement and trading decisions.', metrics:[{label:'Timeframes',value:'1W to 5Y'},{label:'Chart Types',value:'Line/Candle/Bar'},{label:'Indicators',value:'MA/BB/RSI'},{label:'Export Formats',value:'PNG/PDF/CSV'},{label:'Commodities',value:'50+'},{label:'Data Depth',value:'5 Years'}], features:['Interactive zoom and pan on price history','20-day and 50-day moving average overlays','Volume-weighted price analysis','Custom date range selection and comparison','Overlay multiple commodities for correlation','Exportable charts and data tables'], useCases:['Procurement teams analyzing seasonal price patterns','CFOs reviewing commodity cost trends for budgeting','Trade analysts identifying support and resistance levels','Presentation-ready charts for board and investor reports'], clients:'Charting tools referenced by finance teams at Nestl\u00e9, commodity research desks, and EXIM bank analysts.'},
};

const nonAgriFeatureDetails: Record<string, DetailData> = {
  'LME & Spot Price Tracker': { title:'LME & Spot Price Tracker', icon:'\uD83D\uDCCA', accent:'blue', overview:'Real-time London Metal Exchange and international spot price feeds for all industrial commodities. Track copper, aluminium, zinc, nickel, and more with live bid/ask spreads and historical volatility analysis.', metrics:[{label:'Metals Tracked',value:'20+'},{label:'Update Freq',value:'5 min'},{label:'Exchanges',value:'LME/COMEX/MCX'},{label:'History Depth',value:'10 Years'},{label:'Alert Types',value:'SMS/Email/WA'},{label:'Accuracy',value:'99.5%'}], features:['Live LME official and unofficial price feeds','COMEX and MCX futures price integration','Bid-ask spread monitoring for spot trades','Multi-currency conversion (USD/EUR/INR/GBP)','Custom price alerts with threshold triggers','Exportable price reports for procurement teams'], useCases:['Metal traders benchmarking supplier quotes against LME','Manufacturers tracking raw material cost fluctuations','Treasury teams monitoring commodity price exposure','Import houses calculating landed cost in real-time'], clients:'Trusted by metal trading desks at Tata Steel, Hindalco, and leading industrial commodity importers.'},
  'Industrial Buyer Network': { title:'Industrial Buyer Network', icon:'\uD83C\uDFED', accent:'blue', overview:'Access a verified network of industrial buyers, manufacturers, and importers across 25+ countries. Each buyer profile includes trade history, volume capacity, payment terms, and compliance certifications.', metrics:[{label:'Verified Buyers',value:'300+'},{label:'Countries',value:'25+'},{label:'Industries',value:'12+'},{label:'Avg. Deal Size',value:'$50K+'},{label:'Response Time',value:'< 8 hrs'},{label:'Match Rate',value:'88%'}], features:['Verified buyer profiles with trade history','Industry-specific buyer categorization','Direct RFQ broadcasting to matching buyers','Credit rating and compliance pre-screening','Multi-language communication support','Automated follow-up and negotiation tracking'], useCases:['Suppliers finding premium industrial buyers globally','Cross-border B2B matchmaking for metals and chemicals','Diversifying buyer base beyond domestic market','New market entry with pre-qualified buyer connections'], clients:'Industrial matchmaking trusted by exporters supplying to European and Middle Eastern manufacturing hubs.'},
  'Technical Spec Sheets': { title:'Technical Specification Sheets', icon:'\uD83D\uDCCB', accent:'amber', overview:'Comprehensive technical specification documents for every listed industrial commodity including purity percentages, grade classifications, test certificates, and international standard compliance (ISO, ASTM, BIS).', metrics:[{label:'Spec Parameters',value:'300+'},{label:'Standards',value:'ISO/ASTM/BIS'},{label:'Commodities',value:'40+'},{label:'Cert Types',value:'20+'},{label:'Updates',value:'Monthly'},{label:'Digital Certs',value:'100%'}], features:['Commodity-specific technical data sheets','International standard compliance mapping','Test certificate integration and verification','Grade comparison tools across origins','Custom spec requirement matching','Digital certificate delivery and archival'], useCases:['Buyers setting technical requirements for procurement','Quality teams verifying supplier test certificates','Engineers comparing material grades across sources','Compliance officers ensuring standard adherence'], clients:'Spec sheets referenced by engineering and quality teams at manufacturing enterprises across APAC.'},
  'Dangerous Goods Compliance': { title:'Dangerous Goods Compliance', icon:'\u2622\uFE0F', accent:'orange', overview:'Complete IMDG, MSDS, and hazardous material compliance management for chemical and industrial commodity shipments. Automated HS code classification and regulatory filing with customs authorities.', metrics:[{label:'MSDS Library',value:'500+'},{label:'Compliance Regs',value:'IMDG/ADR/IATA'},{label:'HS Codes',value:'5,000+'},{label:'Filing Speed',value:'< 1 hr'},{label:'Accuracy',value:'99.8%'},{label:'Countries',value:'30+'}], features:['Automated MSDS generation and management','IMDG code classification for ocean transport','HS code lookup with duty rate estimation','Customs declaration pre-filing assistance','Hazmat packaging specification guidance','Incident response planning documentation'], useCases:['Chemical exporters ensuring IMDG compliance','Importers clearing hazardous goods at customs','Logistics teams planning dangerous goods routing','Safety officers maintaining compliance documentation'], clients:'DG compliance solutions trusted by chemical traders and logistics companies handling hazardous cargo.'},
  'Freight & Bulk Carrier Listing': { title:'Freight & Bulk Carrier Listing', icon:'\uD83D\uDEA2', accent:'blue', overview:'Access bulk vessel availability, container options, and competitive freight rates for industrial commodity shipments. Compare break-bulk, dry bulk, and containerized options across major trade lanes.', metrics:[{label:'Vessel Types',value:'Bulk/Container/BB'},{label:'Trade Lanes',value:'60+'},{label:'Rate Updates',value:'Daily'},{label:'Partners',value:'40+'},{label:'Booking Time',value:'< 2 hrs'},{label:'Cost Savings',value:'20%'}], features:['Break-bulk and dry bulk vessel availability','Container FCL/LCL rate comparison','Multi-modal routing optimization','Charter party rate estimation','Vessel schedule and port rotation lookup','Digital booking with instant confirmation'], useCases:['Metal exporters booking bulk carriers for large orders','Chemical companies shipping in ISO tanks','Mineral traders comparing break-bulk vs container options','Manufacturers planning quarterly freight budgets'], clients:'Freight solutions used by industrial traders moving 100,000+ MT annually across global trade lanes.'},
  'Demand Forecasting': { title:'Industrial Demand Forecasting', icon:'\uD83E\uDD16', accent:'green', overview:'AI-driven sector-level demand analytics for industrial commodities using manufacturing PMI data, construction activity indices, automotive production data, and infrastructure spending projections.', metrics:[{label:'Forecast Window',value:'30\u201390 days'},{label:'Sectors Covered',value:'8+'},{label:'Accuracy',value:'84%'},{label:'Data Sources',value:'15+'},{label:'Reports',value:'Weekly'},{label:'Commodities',value:'25+'}], features:['Manufacturing PMI correlation analysis','Construction sector demand modeling','Automotive production impact forecasting','Infrastructure spending projection mapping','Seasonal demand pattern identification','Custom demand reports by sector and region'], useCases:['Commodity traders timing large purchase decisions','Manufacturers planning production schedules','Investors analyzing sector-wise commodity exposure','Export houses identifying emerging demand markets'], clients:'Demand intelligence adopted by strategic procurement teams at leading industrial conglomerates.'},
};

const supplyChainDetails: Record<string, DetailData> = {
  'PROCUREMENT': { title:'Smart Procurement Management', icon:'\uD83E\uDD1D', accent:'green', overview:'Intelligent procurement orchestration connecting you with verified suppliers based on commodity, grade, volume, and delivery requirements. Automated RFQ management, quote comparison, and order confirmation workflows.', metrics:[{label:'Verified Suppliers',value:'500+'},{label:'RFQ Response Time',value:'< 4 hrs'},{label:'Cost Savings',value:'12\u201318%'},{label:'Order Accuracy',value:'99.2%'},{label:'Commodities',value:'50+'},{label:'Countries',value:'25+'}], features:['Multi-supplier RFQ broadcasting','Automated quote comparison matrix','Supplier rating and performance scoring','Contract template library with e-sign','Order confirmation and advance tracking','Procurement analytics dashboard'], useCases:['Bulk commodity buyers sourcing from multiple origins','First-time importers needing supplier verification','Procurement teams standardizing vendor evaluation','Emergency sourcing when primary suppliers default'], clients:'Procurement automation trusted by buying desks at Nestl\u00e9, HAVI, and leading FMCG manufacturers.'},
  'INSPECTION': { title:'Quality Inspection & Verification', icon:'\uD83D\uDD0D', accent:'green', overview:'Coordinate pre-shipment inspections, lab testing, and grading through our network of 50+ NABL-accredited agencies. Ensure goods meet buyer specifications before they leave the origin.', metrics:[{label:'Agencies',value:'50+'},{label:'Lab Partners',value:'30+'},{label:'Turnaround',value:'48\u201372 hrs'},{label:'Parameters',value:'200+'},{label:'Pass Rate',value:'94%'},{label:'Coverage',value:'All India'}], features:['Pre-shipment inspection booking and scheduling','Certificate of Analysis coordination','Photo and video documentation at site','Digital inspection report delivery','Re-inspection and dispute mediation','Fumigation and phytosanitary certification'], useCases:['Buyers requiring PSI before payment release','Exporters demonstrating quality to overseas clients','New supplier qualification through sample testing','Insurance claims requiring inspection documentation'], clients:'Inspection coordination trusted by buyers at Nestl\u00e9, Mars, and top global commodity importers.'},
  'DOCUMENTATION': { title:'Trade Documentation Automation', icon:'\uD83D\uDCC4', accent:'green', overview:'Auto-generate complete export/import documentation packs in under 3 minutes. 25+ document types with built-in compliance checklists for APEDA, FSSAI, customs, and destination country requirements.', metrics:[{label:'Doc Types',value:'25+'},{label:'Generation Time',value:'< 3 min'},{label:'Error Rate',value:'< 1%'},{label:'Templates',value:'50+'},{label:'Compliance',value:'100%'},{label:'Archive',value:'7 Years'}], features:['One-click complete document pack generation','Pre-filled templates from trade order data','APEDA/FSSAI/customs compliance auto-check','Digital signature and e-BL support','Version control with audit trail','Bulk generation for multi-consignment orders'], useCases:['Exporters automating repetitive documentation','First-time traders needing guided preparation','Banks requiring standardized LC documentation','Compliance teams ensuring zero-error filing'], clients:'Document automation saves 40+ hrs/month for export houses handling 20+ shipments monthly.'},
  'LOGISTICS': { title:'Logistics & Freight Coordination', icon:'\uD83D\uDE9B', accent:'amber', overview:'Compare and book inland trucking, rail transport, and international ocean freight from a single interface. Access 150+ verified transport partners with real-time rates and capacity availability.', metrics:[{label:'Transport Partners',value:'150+'},{label:'Shipping Lines',value:'12+'},{label:'Route Coverage',value:'India + 40 countries'},{label:'Rate Updates',value:'Daily'},{label:'Booking Time',value:'< 3 min'},{label:'Cost Savings',value:'25%'}], features:['Inland truck and container rate comparison','Ocean FCL/LCL rate aggregation','Multi-modal route optimization','Real-time sailing schedule lookup','Digital booking and confirmation','Freight invoice reconciliation'], useCases:['Comparing inland freight from farm to nearest port','Booking ocean freight for bulk commodity exports','Multi-modal routing for landlocked origins','Consolidating LCL shipments for cost efficiency'], clients:'Logistics coordination used by exporters saving 25% on freight costs through platform rate comparison.'},
  'LIVE TRACKING': { title:'Real-Time Shipment Tracking', icon:'\uD83D\uDCE1', accent:'blue', overview:'Track every shipment in real time from farm gate pickup through inland transit, port operations, ocean voyage, to destination delivery. GPS for trucks, AIS for vessels, with automated ETA updates.', metrics:[{label:'Tracking',value:'GPS + AIS'},{label:'Update Interval',value:'10 min'},{label:'Geofence Alerts',value:'Unlimited'},{label:'ETA Accuracy',value:'96%'},{label:'Vessel Coverage',value:'Global'},{label:'Visibility',value:'100%'}], features:['Real-time GPS truck tracking with driver contact','AIS-based ocean vessel location tracking','Automated ETA updates and delay notifications','Geofence entry/exit alerts','Multi-leg shipment visibility dashboard','Shareable tracking links for buyers'], useCases:['Buyers tracking perishable shipments in transit','Operations teams monitoring concurrent shipments','Sales teams sharing live tracking with customers','Risk teams getting early delay warnings'], clients:'Visibility solutions trusted by supply chain teams at Nestl\u00e9, HAVI, and Fortune 500 procurement divisions.'},
  'DELIVERY': { title:'Delivery & Settlement', icon:'\uD83C\uDFC1', accent:'blue', overview:'Final-mile delivery coordination including destination port clearance, last-mile logistics, proof of delivery documentation, and trade settlement with automated payment milestone tracking.', metrics:[{label:'Delivery Success',value:'98.5%'},{label:'On-Time Rate',value:'94%'},{label:'Settlement Speed',value:'T+3 days'},{label:'Dispute Rate',value:'< 2%'},{label:'Ports Covered',value:'50+'},{label:'Payment Modes',value:'LC/TT/DA/DP'}], features:['Destination port customs clearance coordination','Last-mile delivery scheduling and tracking','Proof of delivery documentation','Automated payment milestone triggers','Trade settlement reconciliation','Post-delivery quality feedback loop'], useCases:['Importers coordinating destination port clearance','Exporters confirming delivery for payment release','Finance teams tracking trade settlement milestones','Customer success teams ensuring delivery satisfaction'], clients:'End-to-end delivery management trusted by enterprise trade operations across 40+ countries.'},
};

const freightInlandDetails: Record<string, DetailData> = {
  'Truck & Container Booking': { title:'Truck & Container Booking', icon:'\uD83D\uDE9B', accent:'green', overview:'Compare available trucks, mini-trucks, 20ft/40ft containers, and open-top trailers from verified transport partners across Andhra Pradesh, Telangana, Tamil Nadu, Karnataka, and Maharashtra.', metrics:[{label:'Transport Partners',value:'80+'},{label:'Vehicle Types',value:'15+'},{label:'Coverage',value:'Pan-India'},{label:'Booking Speed',value:'< 10 min'},{label:'GPS Tracked',value:'100%'},{label:'Rate Updates',value:'Daily'}], features:['Multi-vehicle type comparison and booking','Verified transporter profiles with ratings','Real-time vehicle availability check','Automated route and cost optimization','Digital booking confirmation and POD','Insurance and transit coverage options'], useCases:['Farm-to-port container movement for agri exports','Factory-to-CFS trucking for industrial goods','Multi-point pickup consolidation','Urgent last-minute vehicle requirement'], clients:'Inland transport booking trusted by 200+ exporters across South India.'},
  'Warehouse Locator': { title:'Warehouse & Cold Storage Locator', icon:'\uD83C\uDFEA', accent:'amber', overview:'Find bonded warehouses, cold storage facilities, and fumigation centers near your origin or port. Compare capacity, certifications, temperature range, and daily storage rates.', metrics:[{label:'Warehouses',value:'120+'},{label:'Cold Storages',value:'45+'},{label:'Ports Covered',value:'12'},{label:'Certifications',value:'FSSAI/APEDA'},{label:'Booking',value:'Online'},{label:'Rate Comparison',value:'Instant'}], features:['Search by location, capacity, and type','Cold storage temperature range filtering','FSSAI and APEDA certification verification','Real-time capacity availability','Online booking and payment','Storage rate comparison across facilities'], useCases:['Agri exporters needing cold storage near port','Importers requiring bonded warehouse space','Seasonal storage for harvest period commodities','Fumigation center booking before export'], clients:'Warehouse solutions used by exporters managing perishable commodity storage across Indian ports.'},
  'Inland Freight Rate Board': { title:'Inland Freight Rate Board', icon:'\uD83D\uDCB9', accent:'green', overview:'Live freight rates from origin to nearest railhead, port, CFS, or ICD updated daily by lane. Compare truck, rail, and multi-modal options for optimal cost and transit time.', metrics:[{label:'Trade Lanes',value:'200+'},{label:'Update Freq',value:'Daily'},{label:'Savings',value:'15\u201325%'},{label:'Modes',value:'Truck/Rail/Multi'},{label:'Rate History',value:'12 months'},{label:'Partners',value:'60+'}], features:['Lane-wise daily rate updates','Truck vs rail cost comparison','Multi-modal routing with time estimates','Seasonal rate trend analysis','Bulk booking discount visibility','Rate lock for advance bookings'], useCases:['Exporters comparing farm-to-port freight options','Cost optimization for high-volume commodity movement','Planning quarterly logistics budgets','Identifying cheapest lanes for new trade routes'], clients:'Rate intelligence used by logistics planners at major Indian commodity trading houses.'},
  'GPS Tracking Dashboard': { title:'GPS Tracking Dashboard', icon:'\uD83D\uDCE1', accent:'blue', overview:'Real-time GPS tracking for every inland shipment with live map view, geofence alerts, driver contact information, and automated ETA updates visible to both buyer and seller.', metrics:[{label:'Vehicles Tracked',value:'500+/month'},{label:'Update Interval',value:'2 min'},{label:'Geofences',value:'Unlimited'},{label:'ETA Accuracy',value:'93%'},{label:'Alert Channels',value:'SMS/Email/WA'},{label:'Map Coverage',value:'Pan-India'}], features:['Live map view with vehicle positions','Geofence entry/exit notifications','Driver contact and SOS alerts','Automated ETA calculation and updates','Route deviation detection','Trip history and analytics'], useCases:['Monitoring perishable cargo in transit','Multi-vehicle fleet visibility for consolidation','Providing real-time updates to overseas buyers','Detecting route deviations or unauthorized stops'], clients:'GPS tracking adopted by exporters requiring full inland visibility for compliance and buyer confidence.'},
  'Port Gate-In Assistance': { title:'Port Gate-In Assistance', icon:'\uD83C\uDFD7\uFE0F', accent:'amber', overview:'Coordinate port delivery orders, weighbridge appointments, port health clearances, and container stuffing at CFS/ICD. Digital tracking of all port-side processes with real-time status updates.', metrics:[{label:'Ports Covered',value:'12+'},{label:'CFS/ICD',value:'30+'},{label:'Process Steps',value:'8'},{label:'Digital Tracking',value:'100%'},{label:'Turnaround',value:'24\u201348 hrs'},{label:'Success Rate',value:'97%'}], features:['Port delivery order management','Weighbridge appointment scheduling','Port health clearance coordination','Container stuffing supervision','CFS/ICD gate-in tracking','Digital documentation for all processes'], useCases:['First-time exporters navigating port procedures','Coordinating container stuffing at CFS','Scheduling weighbridge for overweight cargo','Port health clearance for food commodities'], clients:'Port assistance used by exporters shipping from Kakinada, Vizag, Chennai, and Mundra ports.'},
};

const freightOverseasDetails: Record<string, DetailData> = {
  'Freight Rate Comparison': { title:'Ocean Freight Rate Comparison', icon:'\u2696\uFE0F', accent:'blue', overview:'Compare FCL and LCL rates from 12+ shipping lines including Maersk, MSC, CMA CGM, Hapag-Lloyd, and ONE on all major trade lanes from Indian ports to global destinations.', metrics:[{label:'Shipping Lines',value:'12+'},{label:'Trade Lanes',value:'60+'},{label:'Rate Updates',value:'Daily'},{label:'Savings',value:'15\u201330%'},{label:'Container Types',value:'20ft/40ft/HC/RF'},{label:'Booking Speed',value:'< 5 min'}], features:['Multi-carrier rate comparison matrix','FCL and LCL rate aggregation','Detention and demurrage fee visibility','BAF/CAF/THC surcharge breakdown','Rate trend analysis by trade lane','Instant digital booking confirmation'], useCases:['Exporters comparing rates for upcoming shipments','Procurement teams building annual freight budgets','Spot rate negotiation with market data backup','LCL consolidation for small volume shippers'], clients:'Freight comparison used by 300+ active shippers saving an average 20% on ocean freight costs.'},
  'Vessel & Sailing Schedule': { title:'Vessel & Sailing Schedule', icon:'\uD83D\uDCC5', accent:'green', overview:'Check real-time sailing schedules, transit times, vessel ETD/ETA from all major Indian ports to 200+ destination ports worldwide. Filter by shipping line, transit time, and transshipment options.', metrics:[{label:'Origin Ports',value:'12+'},{label:'Destinations',value:'200+'},{label:'Schedule Updates',value:'Real-time'},{label:'Shipping Lines',value:'15+'},{label:'Transit Options',value:'Direct/TS'},{label:'Data Source',value:'Carrier APIs'}], features:['Real-time sailing schedule search','Direct vs transshipment route comparison','Transit time calculator with port pair','Vessel details and capacity information','Schedule change alerts and notifications','Weekly schedule download in PDF/Excel'], useCases:['Exporters planning shipment timing around sailing schedules','Logistics teams coordinating cargo readiness with ETD','Buyers estimating arrival dates for production planning','Freight forwarders comparing routing options'], clients:'Sailing schedule data used by exporters planning 1,000+ container movements annually from Indian ports.'},
  'Freight Forwarder Connect': { title:'Freight Forwarder Connect', icon:'\uD83E\uDD1D', accent:'amber', overview:'Access vetted freight forwarders, NVOCCs, and customs brokers for sea, air, and multimodal cargo. Each partner is verified with trade history, specialization, and customer ratings.', metrics:[{label:'Forwarders',value:'60+'},{label:'Specializations',value:'Sea/Air/Multi'},{label:'Coverage',value:'40+ countries'},{label:'Avg Rating',value:'4.5/5'},{label:'Response Time',value:'< 2 hrs'},{label:'Verified',value:'100%'}], features:['Verified forwarder directory with ratings','Specialization-based search and matching','Direct RFQ broadcasting to forwarders','Quote comparison with service level details','Performance tracking and reviews','Dispute resolution support'], useCases:['Shippers finding specialized DG cargo forwarders','First-time exporters needing full-service forwarders','Comparing forwarder quotes for large tenders','Building reliable forwarder partnerships for regular trade'], clients:'Forwarder network trusted by shippers handling complex multi-modal and project cargo movements.'},
  'Live AIS Vessel Tracking': { title:'Live AIS Vessel Tracking', icon:'\uD83D\uDEF0\uFE0F', accent:'blue', overview:'Real-time AIS-based vessel tracking showing exact position, speed, heading, and estimated arrival time for your ocean cargo. Interactive map with port-to-port route visualization.', metrics:[{label:'Vessels Tracked',value:'Global Fleet'},{label:'Update Interval',value:'5 min'},{label:'Map Coverage',value:'Worldwide'},{label:'Port Data',value:'500+'},{label:'Alert Types',value:'ETA/Delay/Arrive'},{label:'Share Links',value:'Unlimited'}], features:['Interactive vessel position map','Port-to-port route visualization','ETA calculation with weather adjustments','Port congestion and delay indicators','Automated arrival/departure notifications','Shareable tracking dashboards for buyers'], useCases:['Buyers monitoring time-sensitive cargo on ocean','Operations teams tracking multiple vessels','Sales teams providing delivery updates to clients','Finance teams planning around vessel arrival for LC'], clients:'AIS tracking integrated by shippers managing global supply chains with real-time ocean visibility.'},
  'BL & Shipping Documents': { title:'Bill of Lading & Shipping Documents', icon:'\uD83D\uDCCB', accent:'green', overview:'Digital Bill of Lading issuance coordination including original BL, telex release, sea waybill, and e-BL support. Integrated document courier tracking and bank submission management.', metrics:[{label:'BL Types',value:'OBL/Telex/e-BL/SWB'},{label:'Processing',value:'< 24 hrs'},{label:'Courier Tracking',value:'Real-time'},{label:'Bank Submission',value:'Guided'},{label:'Archive',value:'7 Years'},{label:'Digital %',value:'80%'}], features:['Original BL draft review and approval','Telex release coordination','e-BL digital issuance support','Shipping document courier tracking','Bank document submission guidance','Secure digital archival with access control'], useCases:['Exporters managing BL issuance with shipping lines','Banks requiring original documents for LC negotiation','Importers coordinating telex release for cargo pickup','Finance teams tracking document courier status'], clients:'BL management used by trading houses processing 500+ Bills of Lading annually.'},
};

const documentationDetails: Record<string, DetailData> = {
  'PROCUREMENT DOCS': { title:'Procurement Documentation Suite', icon:'\uD83D\uDCDD', accent:'green', overview:'Complete procurement document management from Purchase Order creation to Letter of Credit guidance. Auto-generate POs, proforma invoices, sales contracts, and LOIs with pre-filled templates from your trade data.', metrics:[{label:'Document Types',value:'8+'},{label:'Generation Time',value:'< 2 min'},{label:'Templates',value:'25+'},{label:'LC Guidance',value:'Step-by-step'},{label:'E-Signature',value:'Supported'},{label:'Compliance',value:'100%'}], features:['Auto-generated Purchase Orders from trade enquiry','Proforma Invoice templates with Incoterms','Sales Contract drafting with legal review','Letter of Intent generation and tracking','Letter of Credit guidance and checklist','Amendment tracking and version control'], useCases:['Buyers issuing POs to verified suppliers','Exporters preparing proforma invoices for quotation','First-time traders needing LC guidance','Legal teams reviewing contract terms before signing'], clients:'Procurement documentation used by buying teams managing multi-supplier, multi-origin trade orders.'},
  'QUALITY & INSPECTION': { title:'Quality & Inspection Documents', icon:'\uD83D\uDD0D', accent:'amber', overview:'Coordinate all quality-related documentation including PSI reports, Certificates of Analysis, Phytosanitary certificates, Fumigation certificates, and laboratory test reports. One-click scheduling with our network of 50+ accredited agencies.', metrics:[{label:'Cert Types',value:'10+'},{label:'Lab Partners',value:'30+'},{label:'Turnaround',value:'48\u201372 hrs'},{label:'Accreditation',value:'NABL/ILAC'},{label:'Digital Delivery',value:'100%'},{label:'Re-inspection',value:'Free'}], features:['Pre-Shipment Inspection scheduling and tracking','Certificate of Analysis from accredited labs','Phytosanitary certificate coordination with NPPO','Fumigation certificate with MB/PH3 options','Lab test report management and archival','Digital certificate delivery to all parties'], useCases:['Exporters needing phytosanitary for EU/US markets','Buyers requiring COA before payment release','Quality disputes needing third-party verification','New product certification for market entry'], clients:'Quality documentation trusted by inspection and compliance teams at global food and commodity companies.'},
  'SHIPPING DOCUMENTS': { title:'Shipping Document Pack', icon:'\uD83D\uDEA2', accent:'blue', overview:'Generate complete shipping document packs including Bill of Lading, Packing List, Commercial Invoice, Certificate of Origin, and freight/insurance documents. All pre-filled from your confirmed trade order.', metrics:[{label:'Document Types',value:'12+'},{label:'Pack Generation',value:'< 3 min'},{label:'Error Rate',value:'< 0.5%'},{label:'e-BL Support',value:'Yes'},{label:'COO Types',value:'Preferential/Non-Pref'},{label:'Archive',value:'7 Years'}], features:['Bill of Lading draft preparation and review','Packing List with container stuffing details','Commercial Invoice with HS code classification','Certificate of Origin (preferential and non-preferential)','Freight and insurance document coordination','Consolidated document pack PDF generation'], useCases:['Exporters preparing document sets for LC negotiation','Shipping teams coordinating BL with freight forwarders','Banks verifying document compliance for LC payment','Importers receiving complete document packs digitally'], clients:'Shipping document automation saves 30+ hrs/month for active export houses.'},
  'CUSTOMS & REGULATORY': { title:'Customs & Regulatory Compliance', icon:'\u2696\uFE0F', accent:'orange', overview:'Full customs compliance support including Shipping Bill filing, HS code classification, APEDA/FSSAI registration guidance, IEC code assistance, and port health clearance coordination.', metrics:[{label:'HS Codes',value:'5,000+'},{label:'Filing Speed',value:'< 1 hr'},{label:'Accuracy',value:'99.5%'},{label:'Regulations',value:'Indian + Global'},{label:'Registration Types',value:'8+'},{label:'Support',value:'24x7'}], features:['Shipping Bill / Bill of Entry preparation','HS code classification with duty estimation','APEDA RCMC registration and renewal guidance','FSSAI license application support','IEC code registration assistance','Port health and fumigation NOC coordination'], useCases:['First-time exporters navigating customs procedures','Importers filing Bill of Entry for clearance','Companies needing APEDA/FSSAI registration','Customs duty estimation for new trade routes'], clients:'Customs compliance trusted by 400+ registered exporters and import houses across India.'},
};

const innovationDetails: Record<string, DetailData> = {
  'Unified Agri + Industrial Platform': { title:'Unified Agri + Industrial Platform', icon:'\uD83C\uDF10', accent:'green', overview:'No existing platform combines agricultural and industrial commodity trading, compliance, freight, and live pricing in a single UX. TradeFokus is the first platform to unify both verticals with shared infrastructure for documentation, logistics, and market intelligence.', metrics:[{label:'Commodity Types',value:'Agri + Industrial'},{label:'Verticals Combined',value:'2-in-1'},{label:'Services Unified',value:'6+'},{label:'Market Coverage',value:'50+ commodities'},{label:'User Types',value:'Buyer/Seller/Agent'},{label:'Industry First',value:'Yes'}], features:['Single dashboard for agri and industrial commodities','Shared documentation and compliance engine','Unified freight booking across both verticals','Cross-vertical market intelligence','Common buyer-seller matching algorithm','Integrated payment and settlement system'], useCases:['Conglomerates trading both agri and industrial commodities','Export houses with diversified commodity portfolios','Trading companies seeking operational consolidation','Investors monitoring cross-commodity opportunities'], clients:'Platform consolidation adopted by multi-commodity trading houses seeking operational efficiency.'},
  'Farm-to-Port Visibility': { title:'Farm-to-Port End-to-End Visibility', icon:'\uD83D\uDE80', accent:'green', overview:'Track commodities from farm gate pickup through inland transit, CFS stuffing, vessel departure, to destination port arrival. No other Indian B2B commodity platform offers this level of origin-to-destination traceability.', metrics:[{label:'Tracking Stages',value:'6'},{label:'GPS + AIS',value:'Combined'},{label:'Visibility',value:'100%'},{label:'Update Interval',value:'10 min'},{label:'Alert Types',value:'12+'},{label:'Industry First',value:'Yes'}], features:['Farm gate pickup confirmation with photo proof','Inland GPS tracking with geofence alerts','CFS/ICD stuffing supervision documentation','Port gate-in and vessel loading confirmation','Ocean voyage AIS tracking','Destination port arrival notification'], useCases:['Premium buyers requiring origin traceability','Organic certification requiring chain-of-custody proof','Insurance companies tracking cargo throughout transit','Regulatory bodies verifying commodity movement'], clients:'Farm-to-port visibility demanded by premium buyers at Nestl\u00e9, Whole Foods, and EU organic importers.'},
  'Broker Intelligence Layer': { title:'Proprietary Broker Intelligence Layer', icon:'\uD83E\uDDE0', accent:'amber', overview:'In-house brokerage intelligence powers smart buyer-seller matching based on commodity type, grade, volume, delivery preference, trade history, and creditworthiness. Unlike generic marketplaces, our matching considers real trade execution data.', metrics:[{label:'Data Points',value:'50+ per match'},{label:'Match Accuracy',value:'91%'},{label:'Trade History',value:'3 Years'},{label:'Credit Score',value:'Integrated'},{label:'Success Rate',value:'89%'},{label:'Proprietary',value:'Yes'}], features:['Multi-dimensional matching algorithm','Trade history-weighted scoring','Credit risk pre-assessment','Volume capacity verification','Delivery preference matching','Real-time match quality scoring'], useCases:['Buyers finding ideal suppliers for specific grades','Suppliers identifying high-value repeat buyers','Risk teams pre-screening new trading partners','Brokers optimizing their network connections'], clients:'Intelligence layer powering 500+ successful buyer-supplier matches annually.'},
  'AI Harvest & Price Forecasting': { title:'AI Harvest & Price Forecasting', icon:'\uD83E\uDD16', accent:'blue', overview:'30\u201390 day price and supply forecasting using satellite imagery, APMC arrival data, weather models, and historical trade volumes. Help buyers lock prices early and sellers time their sales optimally.', metrics:[{label:'Forecast Horizon',value:'30\u201390 days'},{label:'Accuracy',value:'87%'},{label:'Satellite Data',value:'Weekly'},{label:'APMC Sources',value:'500+ mandis'},{label:'Weather Models',value:'3'},{label:'Reports',value:'Bi-weekly'}], features:['Satellite-based crop health monitoring','APMC arrival trend forecasting','Weather-adjusted yield prediction','Price direction with confidence intervals','Regional supply surplus/deficit mapping','Actionable advisory reports'], useCases:['Buyers planning forward purchases at optimal prices','Farmers deciding best time to sell harvest','Export houses timing shipments with supply windows','Investors tracking agricultural commodity cycles'], clients:'AI forecasting adopted by strategic sourcing at Nestl\u00e9, HAVI, and top-5 Indian commodity exporters.'},
  'Live Freight Rate Comparison': { title:'Live Freight Rate Comparison Engine', icon:'\u26A1', accent:'orange', overview:'Compare inland truck rates AND ocean freight rates in real time from within the trade enquiry flow. Save hours of manual coordination by getting instant freight cost estimates alongside commodity pricing.', metrics:[{label:'Rate Sources',value:'200+'},{label:'Modes',value:'Truck/Rail/Ocean'},{label:'Update Freq',value:'Daily'},{label:'Time Saved',value:'80%'},{label:'Cost Savings',value:'15\u201325%'},{label:'In-flow',value:'Yes'}], features:['Integrated freight cost in trade enquiry','Truck + ocean rate comparison in one view','Multi-modal routing with time-cost tradeoff','Historical rate trend charts','Rate alert notifications','Bulk booking discount visibility'], useCases:['Traders calculating total landed cost instantly','Procurement teams comparing CIF vs FOB options','Logistics managers optimizing shipping routes','Finance teams forecasting trade cost accurately'], clients:'Integrated rate engine saves 4+ hours per trade enquiry for active commodity traders.'},
  'One-Click Document Pack': { title:'One-Click Document Pack Generation', icon:'\uD83D\uDCC4', accent:'blue', overview:'Generate a complete shipment document pack from a single confirmed order \u2014 Commercial Invoice, Packing List, COA, BL draft, Shipping Bill \u2014 all in under 3 minutes with 99%+ accuracy.', metrics:[{label:'Documents',value:'15+ per pack'},{label:'Time',value:'< 3 min'},{label:'Accuracy',value:'99.2%'},{label:'Templates',value:'50+'},{label:'Compliance',value:'Auto-checked'},{label:'Archive',value:'7 Years'}], features:['Single-click complete document generation','Pre-filled from confirmed trade order data','Automatic compliance verification','Multi-format output (PDF/Word/Excel)','Digital signature integration','Bulk generation for multi-consignment'], useCases:['High-volume exporters automating documentation','First-time traders generating compliant documents','Banks receiving standardized document packs','Customs brokers filing with pre-verified data'], clients:'One-click docs used by export houses processing 50+ document packs monthly.'},
};


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
  const [activeDetail,   setActiveDetail]   = useState<DetailData | null>(null);
  const [hoveredRow,     setHoveredRow]     = useState<number | null>(null);
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

  const openDetail = (key: string, map: Record<string, DetailData>) => { if (map[key]) setActiveDetail(map[key]); };

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
        <a href={`${WA}?text=${encodeURIComponent("Hi TradeFokus! I visited your website and I'm interested in exploring your commodity trading platform. Please share more details.")}`} target="_blank" rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white pl-4 pr-5 py-3.5 rounded-full shadow-2xl font-black text-sm hover:scale-110 transition-transform anim-glow shadow-[0_0_20px_rgba(37,211,102,0.4)]">
          <span className="text-xl leading-none">&#x1F4F1;</span>
          Chat on WhatsApp
        </a>

        <div className="relative z-10">
          {/* NAV */}
          <nav className="fixed w-full bg-[#0a1a0a]/95 backdrop-blur-md border-b border-green-900/30 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <button onClick={() => scrollTo('hero')} className="flex items-center hover:opacity-80 transition">
                  <span className="text-2xl font-black text-white tracking-tight">Trade</span>
                  <span className="text-2xl font-black text-green-400 tracking-tight" style={{ textShadow: '0 0 15px rgba(34,197,94,0.5)' }}>Fokus</span>
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
                  <a href={`${WA}?text=${encodeURIComponent("Hi TradeFokus! I'd like to discuss commodity trading opportunities. Please connect me with your team.")}`} target="_blank" rel="noopener noreferrer"
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
            {/* Animated Globe Background */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/4 lg:translate-x-0 pointer-events-none opacity-20 lg:opacity-30">
              <div className="relative w-[500px] h-[500px] lg:w-[600px] lg:h-[600px]">
                {/* Globe circle */}
                <div className="absolute inset-0 rounded-full border-2 border-green-500/30 anim-spinGlobe">
                  <div className="absolute inset-4 rounded-full border border-green-500/20" />
                  <div className="absolute inset-8 rounded-full border border-blue-500/15" />
                  {/* Latitude lines */}
                  <div className="absolute top-1/4 left-0 right-0 border-t border-green-500/10" />
                  <div className="absolute top-1/2 left-0 right-0 border-t border-green-400/20" />
                  <div className="absolute top-3/4 left-0 right-0 border-t border-green-500/10" />
                  {/* Longitude arcs */}
                  <div className="absolute inset-0 rounded-full border border-green-500/10" style={{ transform: 'rotateY(60deg)' }} />
                  <div className="absolute inset-0 rounded-full border border-amber-500/10" style={{ transform: 'rotateY(-60deg)' }} />
                </div>
                {/* Orbiting dots */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="anim-orbit1"><div className="w-3 h-3 bg-green-400 rounded-full shadow-[0_0_12px_rgba(34,197,94,0.8)]" /></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="anim-orbit2"><div className="w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]" /></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="anim-orbit3"><div className="w-2.5 h-2.5 bg-amber-400 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.8)]" /></div>
                </div>
                {/* Neon glow center */}
                <div className="absolute inset-[30%] rounded-full bg-green-500/10 neon-glow" />
              </div>
            </div>
            {/* Trade route SVG paths */}
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
                    <span className="text-white">Trade</span>
                    <span className="text-green-400" style={{ textShadow: '0 0 40px rgba(34,197,94,0.45)' }}>Fokus</span>
                  </h1>
                  <p className="text-xl font-bold text-white mb-1">End-to-End Supply Chain Intelligence</p>
                  <p className="text-base text-green-400 font-semibold mb-6 min-h-[1.5rem]">
                    {typeText}<span className="text-green-300 animate-pulse">|</span>
                  </p>
                  <p className="text-gray-300 text-sm leading-relaxed mb-8 max-w-lg">
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
                      <p className="text-gray-400 text-xs mt-0.5">{tradeActivities[liveActivity].time}</p>
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
                {/* Global Trade Network Banner */}
                <div className="relative flex items-center justify-center min-h-[420px] lg:min-h-[520px] overflow-hidden">
                  {/* Trippy background glow */}
                  <div className="absolute inset-0 anim-trippyBg opacity-15 rounded-3xl" style={{ background: 'linear-gradient(135deg, rgba(34,197,94,0.4), rgba(59,130,246,0.4), rgba(236,72,153,0.4), rgba(139,92,246,0.4), rgba(6,182,212,0.4), rgba(34,197,94,0.4))', backgroundSize: '300% 300%' }} />

                  {/* Starfield */}
                  {[...Array(30)].map((_, i) => (
                    <div key={i} className="absolute rounded-full anim-star" style={{ width: i % 4 === 0 ? 3 : i % 3 === 0 ? 2 : 1, height: i % 4 === 0 ? 3 : i % 3 === 0 ? 2 : 1, background: ['#22c55e','#3b82f6','#ec4899','#a855f7','#06b6d4','#f59e0b'][i % 6], top: `${(i * 31 + 7) % 97}%`, left: `${(i * 47 + 13) % 95}%`, animationDelay: `${i * 0.2}s`, animationDuration: `${1.2 + (i % 5) * 0.5}s` }} />
                  ))}

                  {/* Flowing data particles — vertical streams */}
                  {[...Array(10)].map((_, i) => (
                    <div key={`d${i}`} className="absolute w-0.5 rounded-full anim-dataFlow" style={{ height: 6 + (i % 4) * 4, left: `${8 + i * 9}%`, background: `linear-gradient(to top, transparent, ${['#22c55e','#3b82f6','#ec4899','#a855f7','#06b6d4','#f59e0b','#34d399','#fb7185','#818cf8','#22d3ee'][i]})`, animationDelay: `${i * 0.35}s`, animationDuration: `${2 + (i % 3) * 0.8}s` }} />
                  ))}

                  {/* Central Globe */}
                  <div className="relative w-52 h-52 sm:w-60 sm:h-60 lg:w-72 lg:h-72">
                    {/* Color-shifting outer aura */}
                    <div className="absolute -inset-20 rounded-full anim-colorShift opacity-20" style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.5), rgba(59,130,246,0.4), rgba(236,72,153,0.3), rgba(139,92,246,0.4), transparent 70%)' }} />

                    {/* Network rings — rotating dashed circles */}
                    <div className="absolute inset-[-25%] rounded-full border border-dashed border-green-400/25 anim-spinGlobe" style={{ animationDuration: '20s' }} />
                    <div className="absolute inset-[-40%] rounded-full border border-dashed border-blue-400/18 anim-spinGlobe" style={{ animationDuration: '30s', animationDirection: 'reverse' }} />
                    <div className="absolute inset-[-55%] rounded-full border border-dashed border-purple-400/12 anim-spinGlobe" style={{ animationDuration: '40s' }} />

                    {/* Network nodes pulsing on rings */}
                    {[
                      { t: '-15%', l: '50%', c: '#22c55e', d: '0s' },
                      { t: '50%', l: '-15%', c: '#3b82f6', d: '0.5s' },
                      { t: '110%', l: '50%', c: '#ec4899', d: '1s' },
                      { t: '50%', l: '110%', c: '#a855f7', d: '1.5s' },
                      { t: '-30%', l: '-20%', c: '#06b6d4', d: '0.3s' },
                      { t: '-30%', l: '115%', c: '#f59e0b', d: '0.8s' },
                      { t: '125%', l: '-20%', c: '#34d399', d: '1.3s' },
                      { t: '125%', l: '115%', c: '#fb7185', d: '1.8s' },
                    ].map((n, i) => (
                      <div key={`n${i}`} className="absolute" style={{ top: n.t, left: n.l, transform: 'translate(-50%,-50%)' }}>
                        <div className="relative">
                          <div className="w-3 h-3 rounded-full anim-connectPulse" style={{ background: n.c, color: n.c, animationDelay: n.d }} />
                          <div className="absolute inset-0 rounded-full anim-dotPing" style={{ border: `1px solid ${n.c}`, animationDelay: n.d }} />
                        </div>
                      </div>
                    ))}

                    {/* Connecting beams from center to nodes */}
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
                      <div key={`b${i}`} className="absolute top-1/2 left-1/2 h-[1px] anim-networkBeam" style={{ width: '55%', background: `linear-gradient(to right, ${['#22c55e','#3b82f6','#ec4899','#a855f7','#06b6d4','#f59e0b','#34d399','#fb7185'][i]}40, transparent)`, transformOrigin: '0 50%', transform: `rotate(${deg}deg)`, animationDelay: `${i * 0.5}s` }} />
                    ))}

                    {/* Network pulse rings expanding from globe */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full border border-green-400/30 anim-ring" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full border border-blue-400/25 anim-ring" style={{ animationDelay: '1s' }} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full border border-purple-400/20 anim-ring" style={{ animationDelay: '2s' }} />

                    {/* Earth sphere */}
                    <div className="absolute inset-0 rounded-full anim-globePulse overflow-hidden" style={{ background: 'radial-gradient(circle at 35% 35%, #1a3a4e 0%, #0d1828 40%, #0a0e1a 70%, #050810 100%)' }}>
                      <div className="absolute inset-0 anim-spinGlobe" style={{ animationDuration: '28s' }}>
                        <div className="absolute top-[20%] left-[15%] w-[30%] h-[25%] bg-green-500/25 rounded-[40%_60%_50%_70%] blur-sm" />
                        <div className="absolute top-[35%] left-[55%] w-[20%] h-[30%] bg-emerald-600/20 rounded-[60%_40%_70%_30%] blur-sm" />
                        <div className="absolute top-[55%] left-[25%] w-[25%] h-[20%] bg-green-500/18 rounded-[50%_50%_40%_60%] blur-sm" />
                        <div className="absolute top-[15%] left-[60%] w-[15%] h-[15%] bg-teal-700/22 rounded-[45%_55%_50%_50%] blur-sm" />
                      </div>
                      {/* Color shift overlay for trippy feel */}
                      <div className="absolute inset-0 rounded-full anim-colorShift opacity-25" style={{ background: 'radial-gradient(ellipse at 40% 40%, rgba(139,92,246,0.3) 0%, rgba(236,72,153,0.2) 30%, rgba(6,182,212,0.15) 60%, transparent 80%)' }} />
                      {/* Ocean shimmer */}
                      <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(ellipse at 30% 30%, rgba(59,130,246,0.18) 0%, transparent 50%)' }} />
                      {/* Atmosphere glow */}
                      <div className="absolute -inset-1 rounded-full" style={{ background: 'radial-gradient(circle, transparent 44%, rgba(34,197,94,0.12) 60%, rgba(59,130,246,0.1) 75%, rgba(139,92,246,0.06) 90%, transparent 100%)' }} />
                    </div>

                    {/* Orbiting trade connector icons */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="anim-orbit1" style={{ animationDuration: '8s' }}>
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg bg-green-900/70 border border-green-400/50 shadow-[0_0_20px_rgba(34,197,94,0.7)] backdrop-blur-sm">&#x1F91D;</div>
                      </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="anim-orbit2" style={{ animationDuration: '11s' }}>
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg bg-blue-900/70 border border-blue-400/50 shadow-[0_0_20px_rgba(59,130,246,0.7)] backdrop-blur-sm">&#x1F310;</div>
                      </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="anim-orbit3" style={{ animationDuration: '14s' }}>
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg bg-purple-900/70 border border-purple-400/50 shadow-[0_0_20px_rgba(139,92,246,0.7)] backdrop-blur-sm">&#x1F4CA;</div>
                      </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="anim-orbit1" style={{ animationDuration: '17s', animationDirection: 'reverse' }}>
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg bg-pink-900/70 border border-pink-400/50 shadow-[0_0_20px_rgba(236,72,153,0.7)] backdrop-blur-sm">&#x1F680;</div>
                      </div>
                    </div>
                  </div>

                  {/* Trade connection labels */}
                  <div className="absolute top-3 left-3 text-[10px] font-black tracking-[0.3em] anim-floatY" style={{ animationDelay: '0s', color: '#22c55e', textShadow: '0 0 12px rgba(34,197,94,0.6)' }}>CONNECT</div>
                  <div className="absolute top-3 right-3 text-[10px] font-black tracking-[0.3em] anim-floatY" style={{ animationDelay: '1s', color: '#3b82f6', textShadow: '0 0 12px rgba(59,130,246,0.6)' }}>TRADE</div>
                  <div className="absolute bottom-3 left-3 text-[10px] font-black tracking-[0.3em] anim-floatY" style={{ animationDelay: '2s', color: '#a855f7', textShadow: '0 0 12px rgba(139,92,246,0.6)' }}>DISCOVER</div>
                  <div className="absolute bottom-3 right-3 text-[10px] font-black tracking-[0.3em] anim-floatY" style={{ animationDelay: '3s', color: '#ec4899', textShadow: '0 0 12px rgba(236,72,153,0.6)' }}>GLOBAL</div>

                  {/* Floating trade icons */}
                  <div className="absolute top-7 left-1/2 -translate-x-1/2 text-2xl anim-floatY pointer-events-none" style={{ animationDelay: '0.5s' }}>&#x1F33E;</div>
                  <div className="absolute bottom-10 left-6 text-lg anim-floatY pointer-events-none" style={{ animationDelay: '1.2s' }}>&#x1F4E6;</div>
                  <div className="absolute bottom-10 right-6 text-lg anim-floatY pointer-events-none" style={{ animationDelay: '2.2s' }}>&#x1F6A2;</div>
                  <div className="absolute top-1/4 left-3 text-base anim-floatY pointer-events-none" style={{ animationDelay: '0.8s' }}>&#x1F4B9;</div>
                  <div className="absolute top-1/4 right-3 text-base anim-floatY pointer-events-none" style={{ animationDelay: '1.8s' }}>&#x1F517;</div>
                  <div className="absolute top-2/3 left-5 text-base anim-floatY pointer-events-none" style={{ animationDelay: '3.2s' }}>&#x1F30F;</div>
                  <div className="absolute top-2/3 right-5 text-base anim-floatY pointer-events-none" style={{ animationDelay: '2.8s' }}>&#x2728;</div>
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
                    style={{ textShadow: '0 0 20px rgba(34,197,94,0.6), 0 0 40px rgba(34,197,94,0.3)' }}>{val}</div>
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

          {/* PLATFORM HIGHLIGHTS + WHAT IS TRADEFOKUS - Side by Side */}
          <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
                {/* Left: What Is TradeFokus */}
                <div>
                  <h2 className="text-3xl md:text-4xl font-black mb-3" style={{ textShadow: '0 0 30px rgba(34,197,94,0.2)' }}>WHAT IS TRADEFOKUS?</h2>
                  <p className="text-gray-300 mb-8 text-sm leading-relaxed">
                    A next-generation commodity trading platform bridging buyers and suppliers &mdash; farmers, producers, mills, manufacturers &mdash; with complete end-to-end trade facilitation under one roof.
                  </p>
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
                      <button key={i}
                        onClick={() => openDetail(text as string, platformDetails)}
                        className="flex items-center gap-3 group cursor-pointer w-full text-left hover:bg-green-900/20 rounded-lg px-3 py-2 transition border border-transparent hover:border-green-800/30"
                        style={{ animation: `fadeSlideUp 0.5s ease ${i * 0.06}s both` }}>
                        <span className="text-lg transition-transform group-hover:scale-125">{icon}</span>
                        <span className="text-gray-300 text-sm transition-colors group-hover:text-green-400 flex-1">{text}</span>
                        <span className="text-green-500/0 group-hover:text-green-400 text-xs transition-all">Details &rarr;</span>
                      </button>
                    ))}
                  </div>
                </div>
                {/* Right: 3 Key Pillars */}
                <div className="flex flex-col justify-center">
                  <p className="text-green-400 text-xs font-black tracking-widest uppercase mb-6">HOW IT WORKS</p>
                  <div className="space-y-6">
                {[
                  { label: 'CONNECT',    border: 'border-green-600', bg: 'bg-green-900/40', color: 'text-green-300', icon: '🔗', delay: '0s',   desc: 'Match verified buyers with trusted suppliers, farmers & producers globally.' },
                  { label: 'FACILITATE', border: 'border-amber-600', bg: 'bg-amber-900/20', color: 'text-amber-300', icon: '\u2699\uFE0F', delay: '1.2s', desc: 'Manage documentation, inspections, freight, and compliance in one platform.' },
                  { label: 'DELIVER',    border: 'border-green-400', bg: 'bg-green-800/30', color: 'text-green-200', icon: '🚢', delay: '2.4s', desc: 'Track real-time shipment from source to port or final destination.' },
                ].map((item, i) => (
                    <div key={i} className={`relative border-2 ${item.border} ${item.bg} rounded-xl p-6 hover:scale-[1.02] transition-transform group cursor-default`}>
                      <div className="flex items-center gap-4">
                        <span className="text-3xl anim-floatY flex-shrink-0" style={{ animationDelay: item.delay }}>{item.icon}</span>
                        <div>
                          <h3 className={`text-lg font-black tracking-widest ${item.color} mb-1`}>{item.label}</h3>
                          <div className="w-10 h-0.5 bg-green-700 mb-2 group-hover:w-20 transition-all duration-500" />
                          <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* AGRI */}
          <section id="agri" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0a1a0a]">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-2 bg-[#0d1f0d] border border-green-800/40 rounded-2xl p-8">
                  <h2 className="text-5xl font-black text-white leading-none">AGRI</h2>
                  <h2 className="text-5xl font-black text-green-400 leading-none mb-2" style={{ textShadow: '0 0 30px rgba(34,197,94,0.4)' }}>COMMODITIES</h2>
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
                      <button key={i} onClick={() => openDetail(item.t, agriFeatureDetails)}
                        className="border border-green-800/25 rounded-xl p-5 hover:border-green-500/50 hover:bg-green-900/15 hover:-translate-y-1 transition group cursor-pointer text-left">
                        <h4 className="text-green-300 font-bold text-sm mb-2 group-hover:text-green-200">{item.t}</h4>
                        <p className="text-gray-300 text-xs leading-relaxed mb-2">{item.d}</p>
                        <span className="text-green-500/0 group-hover:text-green-500 text-xs font-bold transition-all">Click for details &rarr;</span>
                      </button>
                    ))}
                    <div className="sm:col-span-2 border border-amber-700/30 rounded-xl p-5 hover:bg-amber-900/10 hover:-translate-y-1 transition cursor-default">
                      <h4 className="text-amber-400 font-bold text-sm mb-1">APEDA / FSSAI Compliance Guide</h4>
                      <p className="text-gray-300 text-xs leading-relaxed">Step-by-step regulatory checklist for each commodity export.</p>
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
                      <button key={i} onClick={() => openDetail(item.t, nonAgriFeatureDetails)}
                        className="border border-blue-800/25 rounded-xl p-5 hover:border-blue-400/40 hover:bg-blue-900/10 hover:-translate-y-1 transition group cursor-pointer text-left">
                        <h4 className="text-blue-300 font-bold text-sm mb-2 group-hover:text-blue-200">{item.t}</h4>
                        <p className="text-gray-300 text-xs leading-relaxed mb-2">{item.d}</p>
                        <span className="text-blue-500/0 group-hover:text-blue-400 text-xs font-bold transition-all">Click for details &rarr;</span>
                      </button>
                    ))}
                    <div className="sm:col-span-2 border border-amber-700/30 rounded-xl p-5 hover:bg-amber-900/10 hover:-translate-y-1 transition cursor-default">
                      <h4 className="text-amber-400 font-bold text-sm mb-1">Port & Customs Assistance</h4>
                      <p className="text-gray-300 text-xs leading-relaxed">Port clearance docs, HS code filing, and customs agent directory.</p>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-2 bg-[#0d1525] border border-blue-800/40 rounded-2xl p-8 order-1 lg:order-2">
                  <h2 className="text-5xl font-black text-white leading-none">NON-AGRI</h2>
                  <h2 className="text-5xl font-black text-blue-400 leading-none mb-2" style={{ textShadow: '0 0 30px rgba(59,130,246,0.4)' }}>COMMODITIES</h2>
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
                <h2 className="text-xl md:text-2xl font-black" style={{ textShadow: '0 0 20px rgba(34,197,94,0.2)' }}>END-TO-END SUPPLY CHAIN MANAGEMENT</h2>
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
                      <button key={i} onClick={() => openDetail(step.label, supplyChainDetails)}
                        className="text-center group cursor-pointer"
                        style={{ animation: `fadeSlideUp 0.5s ease ${i * 0.12}s both` }}>
                        <div className={`w-14 h-14 ${step.color} ring-2 ${step.ring} ring-offset-2 ring-offset-transparent rounded-full flex items-center justify-center text-xl mx-auto mb-3 group-hover:scale-125 transition-transform shadow-lg shadow-green-500/20`}>
                          {step.icon}
                        </div>
                        <div className="text-xs font-black tracking-wide text-gray-300 mb-2 group-hover:text-green-400 transition">{step.label}</div>
                        <div className="text-[10px] text-gray-400">Step {step.num}</div>
                        <div className="text-green-500/0 group-hover:text-green-400 text-[9px] font-bold mt-1 transition-all">Details &rarr;</div>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="bg-[#0d1f0d] border border-green-900/30 rounded-xl p-4 text-center">
                  <p className="text-green-300 text-sm italic">TradeFokus acts as your single point of contact across all 6 stages &mdash; eliminating coordination gaps, reducing delays, and minimising trade risk.</p>
                </div>
              </div>
            </div>
          </section>

          {/* LIVE MARKET INTELLIGENCE */}
          <section id="rates" className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
                <div>
                  <h2 className="text-3xl font-black" style={{ textShadow: '0 0 20px rgba(34,197,94,0.2)' }}>LIVE MARKET INTELLIGENCE</h2>
                  <p className="text-green-400 text-sm mt-1 font-semibold">Real-Time &middot; AI-Powered &middot; Transparent</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                    <div className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full anim-radarPing" />
                  </div>
                  <span className="text-gray-400 text-xs ml-1">Updated every 15 min &middot; NCDEX, MCX, LME, APEDA</span>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3 bg-[#162616]/50 border border-green-900/30 rounded-2xl p-6">
                  <p className="text-green-400 text-xs font-black tracking-widest uppercase mb-5">Live Commodity Price Feed</p>
                  <div className="space-y-1">
                    {commodityRates.map((item, i) => (
                      <div key={i}
                        onMouseEnter={() => setHoveredRow(i)}
                        onMouseLeave={() => setHoveredRow(null)}
                        className="rounded-lg hover:bg-green-900/25 transition border-b border-green-900/10 last:border-0 cursor-default">
                        <div className="flex items-center justify-between py-3 px-3"
                          style={{ backgroundColor: flashRow === i ? 'rgba(34,197,94,0.12)' : '', transition: 'background-color 0.5s' }}>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-300 text-sm">{item.name}</span>
                            {flashRow === i && <span className="text-green-400 text-xs animate-pulse font-bold">&oplus; live</span>}
                          </div>
                          <div className="flex items-center gap-5">
                            <span className="text-white font-bold text-sm">{item.price}<span className="text-gray-500 text-xs ml-0.5">{item.unit}</span></span>
                            <span className={`text-sm font-bold w-16 text-right flex items-center gap-0.5 justify-end ${item.change > 0 ? 'text-green-400' : item.change < 0 ? 'text-red-400' : 'text-gray-500'}`}>
                              {item.change > 0 ? '\u25b2' : item.change < 0 ? '\u25bc' : '\u2013'} {Math.abs(item.change).toFixed(1)}%
                            </span>
                          </div>
                        </div>
                        {hoveredRow === i && item.origin && (
                          <div className="px-3 pb-3 grid grid-cols-2 sm:grid-cols-3 gap-2 anim-fadeSlideUp">
                            <div className="bg-green-900/20 border border-green-900/30 rounded-lg px-2.5 py-1.5">
                              <div className="text-[9px] text-gray-500 uppercase tracking-wider">Origin</div>
                              <div className="text-gray-300 text-xs font-semibold">{item.origin}</div>
                            </div>
                            <div className="bg-green-900/20 border border-green-900/30 rounded-lg px-2.5 py-1.5">
                              <div className="text-[9px] text-gray-500 uppercase tracking-wider">Grade</div>
                              <div className="text-gray-300 text-xs font-semibold">{item.grade}</div>
                            </div>
                            <div className="bg-green-900/20 border border-green-900/30 rounded-lg px-2.5 py-1.5">
                              <div className="text-[9px] text-gray-500 uppercase tracking-wider">Min Order</div>
                              <div className="text-gray-300 text-xs font-semibold">{item.moq}</div>
                            </div>
                            <div className="bg-green-900/20 border border-green-900/30 rounded-lg px-2.5 py-1.5">
                              <div className="text-[9px] text-gray-500 uppercase tracking-wider">52W Range</div>
                              <div className="text-gray-300 text-xs font-semibold">{item.range52w}</div>
                            </div>
                            <div className="bg-green-900/20 border border-green-900/30 rounded-lg px-2.5 py-1.5">
                              <div className="text-[9px] text-gray-500 uppercase tracking-wider">Packaging</div>
                              <div className="text-gray-300 text-xs font-semibold">{item.packaging}</div>
                            </div>
                            <a href={`${WA}?text=${encodeURIComponent(`Hi TradeFokus! I'm interested in ${item.name} (${item.grade || 'Standard Grade'}). Current price: ${item.price}${item.unit}. Please share: 1) Best FOB/CIF pricing 2) Available quantity & MOQ 3) Quality certificates 4) Delivery timeline`)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center bg-[#25D366]/20 border border-[#25D366]/40 rounded-lg px-2.5 py-1.5 text-[#25D366] text-xs font-bold hover:bg-[#25D366]/30 transition">&#x1F4F1; Enquire</a>
                          </div>
                        )}
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
                    <button key={i}
                      onClick={() => openDetail(item.t, marketIntelDetails)}
                      className={`border-l-4 ${item.accent} bg-[#162616]/40 rounded-r-xl p-5 hover:bg-green-900/15 hover:translate-x-1 transition group cursor-pointer text-left w-full`}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">{item.icon}</span>
                        <h4 className="text-white font-bold text-sm">{item.t}</h4>
                      </div>
                      <p className="text-gray-300 text-xs leading-relaxed mb-2">{item.d}</p>
                      <span className="text-green-500/0 group-hover:text-green-500 text-xs font-bold transition-all">View enterprise details &rarr;</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* PROBLEMS WE SOLVE */}
          <section id="problems" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0a1a0a]">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row justify-between items-start mb-10 gap-2">
                <h2 className="text-3xl font-black" style={{ textShadow: '0 0 20px rgba(34,197,94,0.2)' }}>PROBLEMS WE SOLVE</h2>
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
                        <p className="text-gray-300 text-xs leading-relaxed">{row.w}</p>
                      </div>
                      <div className="bg-green-950/30 border border-green-900/20 rounded-lg px-4 py-3 group-hover:border-green-700/40 transition">
                        <p className="text-gray-300 text-xs leading-relaxed">{row.t}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  <p className="text-gray-400 text-xs font-black tracking-widest uppercase mb-4">Impact Metrics</p>
                  {[['40%','Faster Documentation'],['25%','Lower Freight Cost'],['60%','Fewer Trade Disputes'],['3x','More Supplier Options'],['90%','On-Time Delivery']].map(([val, label], i) => (
                    <div key={i}
                      className="bg-[#162616]/60 border border-green-900/30 rounded-xl p-4 text-center hover:border-green-600/60 hover:bg-green-900/20 hover:scale-105 transition group cursor-default anim-glow">
                      <div className="text-3xl font-black text-green-400 group-hover:scale-110 transition-transform"
                        style={{ textShadow: '0 0 16px rgba(34,197,94,0.4)' }}>{val}</div>
                      <div className="text-xs text-gray-400 mt-1">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* FREIGHT & LOGISTICS */}
          <section id="logistics" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0d1525]/80">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-black mb-10" style={{ textShadow: '0 0 20px rgba(34,197,94,0.2)' }}>FREIGHT & LOGISTICS MANAGEMENT</h2>
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
                          <p className="text-gray-300 text-xs leading-relaxed">{item.d}</p>
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
                          <p className="text-gray-300 text-xs leading-relaxed">{item.d}</p>
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
              <h2 className="text-3xl font-black mb-3" style={{ textShadow: '0 0 20px rgba(34,197,94,0.2)' }}>TRADE DOCUMENTATION & COMPLIANCE</h2>
              <p className="text-gray-300 text-sm mb-10 max-w-2xl">Tradefokus eliminates paperwork chaos. Every document your trade needs \u2014 generated, tracked, and archived in one place.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                  { title: 'PROCUREMENT DOCS',    hdr: 'bg-green-500',  dot: 'bg-green-400',  border: 'border-green-500/20',  items: ['Purchase Order (PO)', 'Proforma Invoice', 'Sales Contract', 'Letter of Intent (LOI)', 'Letter of Credit (LC) Guidance'] },
                  { title: 'QUALITY & INSPECTION',hdr: 'bg-amber-500',  dot: 'bg-amber-400',  border: 'border-amber-500/20',  items: ['Pre-Shipment Inspection (PSI)', 'Certificate of Analysis (COA)', 'Phytosanitary Certificate', 'Fumigation Certificate', 'Lab Test Report Coordination'] },
                  { title: 'SHIPPING DOCUMENTS',  hdr: 'bg-blue-500',   dot: 'bg-blue-400',   border: 'border-blue-500/20',   items: ['Bill of Lading / e-BL', 'Packing List', 'Commercial Invoice', 'Certificate of Origin', 'Freight & Insurance Docs'] },
                  { title: 'CUSTOMS & REGULATORY',hdr: 'bg-orange-500', dot: 'bg-orange-400', border: 'border-orange-500/20', items: ['Shipping Bill / Bill of Entry', 'HS Code Classification', 'APEDA / FSSAI Registration', 'IEC Code Assistance', 'Port Health & Fumigation NOC'] },
                ].map((col, i) => (
                  <button key={i} onClick={() => openDetail(col.title, documentationDetails)}
                    className={`border ${col.border} rounded-xl overflow-hidden hover:scale-105 hover:shadow-xl hover:shadow-green-500/10 transition-transform cursor-pointer text-left`}>
                    <div className={`${col.hdr} px-4 py-3 flex items-center justify-between`}>
                      <h3 className="text-white font-black text-xs tracking-widest">{col.title}</h3>
                      <span className="text-white/60 text-xs">Details &rarr;</span>
                    </div>
                    <div className="p-4 space-y-3 bg-[#0d1f0d]/40">
                      {col.items.map((item, j) => (
                        <div key={j} className="flex items-start gap-2 group cursor-pointer">
                          <div className={`w-2 h-2 ${col.dot} rounded-full mt-1.5 flex-shrink-0 group-hover:scale-150 transition-transform`} />
                          <span className="text-gray-300 text-xs group-hover:text-white transition">{item}</span>
                        </div>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* INNOVATIONS */}
          <section id="innovations" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0a1a0a]">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-black mb-10" style={{ textShadow: '0 0 20px rgba(34,197,94,0.2)' }}>INNOVATIONS ABSENT IN EXISTING MARKET</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                  { badge: 'MARKET FIRST', badgeCls: 'bg-[#162616] text-green-400 border border-green-700', title: 'Unified Agri + Industrial Platform', titleCls: 'text-white',    icon: '🌐', desc: 'No existing platform combines agricultural and industrial commodity trading, compliance, freight, and live pricing in a single UX. Tradefokus does.' },
                  { badge: 'UNIQUE',       badgeCls: 'bg-green-500/20 text-green-300 border border-green-500', title: 'Farm-to-Port Visibility',        titleCls: 'text-green-400', icon: '🚀', desc: 'End-to-end tracking from farm gate pickup \u2192 inland transit \u2192 CFS stuffing \u2192 vessel departure \u2192 destination port. Not offered by any Indian B2B platform today.' },
                  { badge: 'PROPRIETARY', badgeCls: 'bg-amber-500/20 text-amber-300 border border-amber-600', title: 'Broker Intelligence Layer',       titleCls: 'text-amber-400', icon: '🧠', desc: 'In-house brokerage intelligence powers smart buyer-seller matching based on commodity type, grade, volume, and delivery preference.' },
                  { badge: 'AI-POWERED',  badgeCls: 'bg-[#0d1525] text-blue-400 border border-blue-700',     title: 'AI Harvest & Price Forecasting', titleCls: 'text-white',    icon: '🤖', desc: '30\u201390 day price and supply forecasting using satellite imagery, APMC data, and historical trade volumes \u2014 helping buyers lock prices early.' },
                  { badge: 'TIME-SAVING', badgeCls: 'bg-orange-500/20 text-orange-300 border border-orange-600', title: 'Live Freight Rate Comparison', titleCls: 'text-orange-400',icon: '\u26a1',    desc: 'Compare inland truck rates AND ocean freight rates in real time from within the trade enquiry flow \u2014 saving hours of manual coordination.' },
                  { badge: 'EFFICIENCY',  badgeCls: 'bg-blue-500/20 text-blue-300 border border-blue-600',   title: 'One-Click Document Pack',        titleCls: 'text-blue-400', icon: '📄', desc: 'Generate a complete shipment document pack from a single confirmed order \u2014 Invoice, PL, COA, BL draft, shipping bill \u2014 in under 3 minutes.' },
                ].map((item, i) => (
                  <button key={i} onClick={() => openDetail(item.title, innovationDetails)}
                    className="bg-[#162616]/30 border border-green-900/30 rounded-xl p-6 hover:border-green-700/60 hover:bg-green-900/15 hover:-translate-y-1 transition group cursor-pointer text-left">
                    <div className="flex justify-between items-start mb-4 gap-3">
                      <div className="flex items-center gap-2 flex-1">
                        <span className="text-2xl anim-floatY" style={{ animationDelay: `${i * 0.4}s` }}>{item.icon}</span>
                        <h4 className={`font-black text-base ${item.titleCls}`}>{item.title}</h4>
                      </div>
                      <span className={`text-xs font-black px-2 py-1 rounded whitespace-nowrap ${item.badgeCls}`}>{item.badge}</span>
                    </div>
                    <div className="w-8 h-0.5 bg-green-800 mb-4 group-hover:w-full transition-all duration-700" />
                    <p className="text-gray-300 text-xs leading-relaxed mb-2">{item.desc}</p>
                    <span className="text-green-500/0 group-hover:text-green-400 text-xs font-bold transition-all">Explore innovation &rarr;</span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* WHY CHOOSE */}
          <section id="why" className="py-20 px-4 sm:px-6 lg:px-8 bg-green-500/5 border-y border-green-900/20">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-black mb-10" style={{ textShadow: '0 0 20px rgba(34,197,94,0.2)' }}>WHY CHOOSE TRADEFOKUS</h2>
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
                <a href={`${WA}?text=${encodeURIComponent("Hi TradeFokus! I'm ready to start trading. Please help me with: 1) Available commodities & pricing 2) Supply chain services 3) Documentation support 4) Freight & logistics options")}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-10 py-4 rounded-xl font-black text-lg hover:bg-[#1fbb59] transition transform hover:scale-105 active:scale-95 shadow-[0_0_25px_rgba(37,211,102,0.3)]">
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
                  <div className="text-2xl font-black mb-1"><span className="text-white">Trade</span><span className="text-green-400">Fokus</span></div>
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
                <p className="text-gray-700 text-xs">&copy; 2026 TradeFokus. All rights reserved.</p>
                <div className="flex gap-6">
                  <a href="mailto:info@tradefokus.com" className="text-gray-700 hover:text-green-400 transition text-xs">info@tradefokus.com</a>
                  <a href="#" className="text-gray-700 hover:text-green-400 transition text-xs">Privacy Policy</a>
                  <a href="#" className="text-gray-700 hover:text-green-400 transition text-xs">Terms</a>
                </div>
              </div>
            </div>
          </footer>

          {/* ENQUIRY MODAL */}
          {activeDetail && <DetailModal data={activeDetail} onClose={() => setActiveDetail(null)} wa={WA} />}

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
