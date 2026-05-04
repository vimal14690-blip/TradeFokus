'use client';

import { useState } from 'react';
import Link from 'next/link';

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

function DetailModal({ data, onClose }: { data: DetailData; onClose: () => void }) {
  const a = ACCENT[data.accent] || ACCENT.green;
  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-lg z-[60] flex items-center justify-center p-3 sm:p-6" onClick={onClose}>
      <div
        className={`relative bg-[#0b180b] border ${a.border} ring-1 ${a.ring} rounded-3xl max-w-2xl w-full shadow-[0_0_80px_rgba(0,0,0,0.8)] max-h-[92vh] overflow-y-auto`}
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

const marketHighlights = [

  { title: '50+ commodities listed', description: 'Agri and non-agri coverage across verified trade lanes.' },
  { title: '15-minute update window', description: 'Market intelligence aligned with NCDEX, MCX, LME and APEDA sources.' },
  { title: 'Compliance-first workflow', description: 'Documentation, inspection, customs, and regulatory support in one platform.' },
  { title: 'End-to-end trade visibility', description: 'From supplier discovery to freight coordination and delivery tracking.' },
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
  const [activeDetail,   setActiveDetail]   = useState<DetailData | null>(null);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false); setAgriOpen(false); setNonAgriOpen(false); setLogisticsOpen(false);
  };

  const openDetail = (key: string, map: Record<string, DetailData>) => { if (map[key]) setActiveDetail(map[key]); };

  return (
    <>
      <div className="bg-[#0d1f0d] text-white min-h-screen overflow-x-hidden">

        {/* AMBIENT ORBS */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-green-900/15 rounded-full blur-3xl " />
          <div className="absolute top-1/2 -right-40 w-96 h-96 bg-green-800/10 rounded-full blur-3xl " />
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl " />
          <div className=" absolute top-[52%] text-3xl" style={{ left: '-80px' }}>&#x1F6A2;</div>
        </div>

        {/* FLOATING WHATSAPP BUTTON */}
        <a href={`${WA}?text=${encodeURIComponent("Hi TradeFokus! I visited your website and I'm interested in exploring your commodity trading platform. Please share more details.")}`} target="_blank" rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white pl-4 pr-5 py-3.5 rounded-full shadow-2xl font-black text-sm hover:scale-110 transition-transform  shadow-[0_0_20px_rgba(37,211,102,0.4)]">
          <span className="text-xl leading-none">&#x1F4F1;</span>
          Chat on WhatsApp
        </a>

        <div className="relative z-10">
          {/* NAV */}
          <nav className="fixed w-full bg-[#06120f]/95 backdrop-blur-xl border-b border-green-900/20 z-50 shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
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
                  <Link href="/portal" className="text-green-400 hover:text-green-300 transition font-bold border border-green-400/40 px-3 py-1 rounded-full text-xs">Portal</Link>
                </div>
                <div className="flex items-center gap-3">
                  <a href={`${WA}?text=${encodeURIComponent("Hi TradeFokus! I'd like to discuss commodity trading opportunities. Please connect me with your team.")}`} target="_blank" rel="noopener noreferrer"
                    className="hidden sm:flex items-center gap-1.5 bg-[#25D366] text-white px-3 py-1.5 rounded-full text-xs font-bold hover:bg-[#1fbb59] transition">
                    &#x1F4F1; WhatsApp
                  </a>
                  <button onClick={() => setShowQuoteForm(true)} className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-400 transition font-bold text-sm">Enquiry</button>
                  <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden text-green-400 p-2 rounded-full hover:bg-white/10 transition">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </div>
              {mobileMenuOpen && (
                <div className="lg:hidden border-t border-green-900/20 py-4 space-y-2 bg-[#06120f]/95 backdrop-blur-xl rounded-b-3xl shadow-2xl">
                  {[
                    { label: 'Home', id: 'hero' }, { label: '🌾 Agri Commodities', id: 'agri' },
                    { label: '🏭 Non-Agri Commodities', id: 'non-agri' }, { label: '📊 Market Prices', id: 'rates' },
                    { label: '🚢 Logistics', id: 'logistics' }, { label: '📄 Documentation', id: 'documentation' },
                    { label: 'About Us', id: 'about' },
                  ].map(item => (
                    <button key={item.id} onClick={() => scrollTo(item.id)}
                      className="block w-full text-left text-gray-300 py-2.5 px-2 hover:text-green-400 hover:bg-green-900/20 rounded-lg transition text-sm">{item.label}</button>
                  ))}
                  <Link href="/portal" className="block w-full text-left text-green-400 py-2.5 px-2 hover:bg-green-900/20 rounded-lg transition text-sm font-bold">{'\u{1F6AA}'} Trade Portal</Link>
                  <button onClick={() => { setShowQuoteForm(true); setMobileMenuOpen(false); }}
                    className="block w-full bg-green-500 text-white py-3 rounded-xl font-bold mt-3 text-sm">Send Enquiry</button>
                </div>
              )}
            </div>
          </nav>

          {/* HERO */}
          <section id="hero" className="pt-28 pb-20 sm:pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Animated Globe Background */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/4 lg:translate-x-0 pointer-events-none opacity-20 lg:opacity-30">
              <div className="relative w-[500px] h-[500px] lg:w-[600px] lg:h-[600px]">
                <div className="absolute inset-0 rounded-full border-2 border-slate-600/30" />
                <div className="absolute inset-12 rounded-full border border-slate-600/20" />
                <div className="absolute inset-24 rounded-full border border-sky-500/15" />
                <div className="absolute top-16 left-16 w-10 h-10 rounded-full bg-slate-500/15" />
                <div className="absolute bottom-20 right-24 w-8 h-8 rounded-full bg-sky-500/15" />
                <div className="absolute top-28 right-24 w-6 h-6 rounded-full bg-slate-400/15" />
              </div>
            </div>
            <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M-50,200 Q350,80 750,280 T1700,220" stroke="#60a5fa" strokeWidth="1.5" fill="none" strokeDasharray="7 5" />
              <path d="M-50,360 Q300,200 700,400 T1700,360" stroke="#94a3b8" strokeWidth="1" fill="none" strokeDasharray="5 9" />
              <path d="M180,-20 Q560,200 940,100 T1700,310" stroke="#475569" strokeWidth="1" fill="none" strokeDasharray="4 11" />
            </svg>
            <div className="max-w-7xl mx-auto relative">
              <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_minmax(320px,420px)] gap-12 items-center">
                <div className="max-w-3xl">
                  <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tight mb-4"
                    style={{ textShadow: '0 0 40px rgba(15,23,42,0.18)' }}>
                    <span className="text-white">Trade</span>
                    <span className="text-sky-300">Fokus</span>
                  </h1>
                  <div className="inline-flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-1.5 text-xs uppercase tracking-[0.3em] text-green-300 font-semibold mb-5 shadow-[0_12px_50px_-40px_rgba(37,211,102,0.9)]">
                    <span className="text-[14px]">✦</span>
                    Global commodity trade platform
                  </div>
                  <p className="text-xl md:text-2xl font-semibold text-white/95 mb-3">Enterprise commodity trade intelligence for verified sourcing, compliance and logistics execution.</p>
                  <p className="text-base md:text-lg text-slate-300 font-medium mb-6 max-w-xl leading-relaxed">
                    TradeFokus turns trade complexity into a polished platform experience for buyer, supplier and logistics teams.
                  </p>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-10 max-w-lg">
                    Market signals, compliance workflow and freight coordination in one modern interface designed for global commodity trade.
                  </p>
                  <div className="mb-8 rounded-3xl border border-slate-700 bg-slate-950/80 p-6">
                    <p className="text-slate-400 text-xs font-black tracking-widest uppercase mb-2">Platform overview</p>
                    <p className="text-gray-300 text-sm leading-relaxed">TradeFokus brings verified sourcing, export compliance and multi-modal logistics together in a polished enterprise experience.</p>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <button onClick={() => scrollTo('agri')}
                      className="bg-sky-600 text-white px-7 py-3.5 rounded-lg font-black hover:bg-sky-500 transition hover:shadow-lg hover:shadow-sky-500/30 transform hover:scale-105 text-sm active:scale-95">
                      Agri commodities
                    </button>
                    <button onClick={() => scrollTo('non-agri')}
                      className="border-2 border-slate-600 text-slate-200 px-7 py-3.5 rounded-lg font-black hover:bg-slate-700/40 transition transform hover:scale-105 text-sm active:scale-95">
                      Non-agri commodities
                    </button>
                  </div>
                </div>
                <div className="relative flex items-center justify-center min-h-[420px] lg:min-h-[520px]">
                  <div className="overflow-hidden rounded-[2rem] border border-slate-700/40 bg-gradient-to-br from-slate-950/95 via-slate-900/95 to-slate-950/95 shadow-[0_35px_80px_-30px_rgba(15,23,42,0.9)] w-full max-w-xl">
                    <div className="h-1 bg-gradient-to-r from-green-400 via-sky-400 to-blue-400" />
                    <div className="p-8">
                      <h3 className="text-3xl sm:text-4xl font-black text-white leading-tight">Enterprise platform for commodity trade</h3>
                      <p className="mt-4 text-gray-300 text-sm sm:text-base leading-relaxed">TradeFokus combines verified sourcing, compliance, freight and documentation into one modern workflow for buyer and supplier teams.</p>
                      <div className="grid gap-4 mt-8">
                        {[
                          { title: 'Verified trade network', detail: 'Supplier, buyer and logistics partner credentials validated for export-grade trade.' },
                          { title: 'Compliance-first workflows', detail: 'APEDA, FSSAI, customs and shipment documentation aligned with every transaction.' },
                          { title: 'Market intelligence', detail: 'Price benchmarks, rate insight and logistics visibility to support trade decisions.' },
                        ].map((item, idx) => (
                          <div key={idx} className="rounded-3xl border border-slate-700 bg-slate-950/90 p-5">
                            <p className="text-slate-400 text-xs uppercase tracking-[0.2em] mb-2">{item.title}</p>
                            <p className="text-gray-300 text-sm leading-relaxed">{item.detail}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* STATS with CountUp */}
          <div className="py-6 px-4 bg-slate-950/80 border-y border-slate-700">
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { val: '2',      label: 'Commodity Categories' },
                { val: '50+',    label: 'Commodities Listed' },
                { val: '360°',   label: 'Trade Coverage' },
                { val: '1',      label: 'Platform. Everything.' },
              ].map(({ val, label }, i) => (
                <div key={i} className="group cursor-default">
                  <div className="text-3xl font-black text-sky-300 group-hover:scale-110 transition-transform tabular-nums"
                    style={{ textShadow: '0 0 12px rgba(56, 189, 248, 0.24)' }}>{val}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* MARKET SUMMARY */}
          <div className="py-6 px-4 bg-slate-950/90 border-y border-slate-700">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-4 items-start lg:items-center">
              <div className="max-w-2xl">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400 mb-2">Market intelligence</p>
                <p className="text-gray-300 text-sm leading-relaxed">A refined overview of TradeFokus: price reference, compliance workflows, freight coordination and end-to-end trade visibility in a single site experience.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {marketHighlights.map((item, i) => (
                  <div key={i} className="rounded-3xl border border-slate-700 bg-slate-950/85 px-4 py-4">
                    <p className="text-white text-sm font-semibold">{item.title}</p>
                    <p className="text-gray-400 text-xs leading-relaxed mt-2">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* PLATFORM HIGHLIGHTS + WHAT IS TRADEFOKUS - Side by Side */}          {/* PLATFORM HIGHLIGHTS + WHAT IS TRADEFOKUS - Side by Side */}
          <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
                {/* Left: What Is TradeFokus */}
                <div>
                  <h2 className="text-3xl md:text-4xl font-black mb-3" style={{ textShadow: '0 0 20px rgba(15,23,42,0.16)' }}>WHAT IS TRADEFOKUS?</h2>
                  <p className="text-gray-300 mb-8 text-sm leading-relaxed">
                    A professional commodity trade platform for buyers, suppliers and logistics teams, delivering market intelligence, compliance and execution capability in a single workflow.
                  </p>
                  <div className="space-y-4">
                    {[
                      ['Live Market Prices – Agri & Non-Agri'],
                      ['Full Supply Chain Management'],
                      ['Inland & International Freight Listing'],
                      ['Real-Time Shipment Tracking'],
                      ['End-to-End Trade Documentation'],
                      ['Quality Inspection Coordination'],
                      ['AI Supply & Demand Predictions'],
                      ['Verified Buyer–Supplier Matching'],
                    ].map(([text], i) => (
                      <button key={i}
                        onClick={() => openDetail(text as string, platformDetails)}
                        className="flex items-center gap-3 group cursor-pointer w-full text-left hover:bg-slate-900 rounded-lg px-3 py-2 transition border border-slate-800 hover:border-slate-600">
                        <span className="text-lg transition-transform group-hover:scale-125">•</span>
                        <span className="text-gray-300 text-sm transition-colors group-hover:text-sky-300 flex-1">{text}</span>
                        <span className="text-slate-500 group-hover:text-sky-300 text-xs transition-all">Details →</span>
                      </button>
                    ))}
                  </div>
                </div>
                {/* Right: 3 Key Pillars */}
                <div className="flex flex-col justify-center">
                  <p className="text-slate-400 text-xs font-black tracking-widest uppercase mb-6">HOW IT WORKS</p>
                  <div className="space-y-6">
                {[
                  { label: 'CONNECT',    border: 'border-slate-600', bg: 'bg-slate-900/40', color: 'text-slate-300', icon: '•', desc: 'Match verified buyers with trusted suppliers, farmers and producers globally.' },
                  { label: 'FACILITATE', border: 'border-slate-600', bg: 'bg-slate-900/40', color: 'text-slate-300', icon: '•', desc: 'Manage documentation, inspections, freight, and compliance in one platform.' },
                  { label: 'DELIVER',    border: 'border-slate-600', bg: 'bg-slate-900/40', color: 'text-slate-300', icon: '•', desc: 'Track real-time shipment from source to port or final destination.' },
                ].map((item, i) => (
                    <div key={i} className={`relative border-2 ${item.border} ${item.bg} rounded-xl p-6 hover:scale-[1.02] transition-transform group cursor-default`}>
                      <div className="flex items-center gap-4">
                        <span className="text-3xl  flex-shrink-0">{item.icon}</span>
                        <div>
                          <h3 className={`text-lg font-black tracking-widest ${item.color} mb-1`}>{item.label}</h3>
                          <div className="w-10 h-0.5 bg-slate-500 mb-2 group-hover:w-20 transition-all duration-500" />
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
                    style={{ background: 'linear-gradient(90deg,#14532d,#ca8a04,#1e3a5f)' }} />
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
                        className="text-center group cursor-pointer">
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
                  <h2 className="text-3xl font-black">LIVE MARKET INTELLIGENCE</h2>
                  <p className="text-green-400 text-sm mt-1 font-semibold">Actionable commodity insight, priced for business decisions.</p>
                </div>
                <div className="text-gray-400 text-xs">Updated every 15 min · NCDEX, MCX, LME, APEDA</div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  {marketHighlights.map((item, i) => (
                    <div key={i} className="rounded-3xl border border-green-900/30 bg-[#071b0f] p-6">
                      <p className="text-xs uppercase tracking-[0.3em] text-green-400 mb-2">Market focus</p>
                      <h3 className="text-white text-xl font-black mb-3">{item.title}</h3>
                      <p className="text-gray-300 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
                <div className="rounded-3xl border border-green-900/30 bg-[#0a2110] p-8">
                  <h3 className="text-2xl font-black text-white mb-4">Why TradeFokus market intelligence matters</h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-6">Bridge commodity pricing and compliance in one business-grade workflow. TradeFokus helps buyer and seller teams evaluate options with confidence.</p>
                  {[
                    {title: 'Verified suppliers & buyers', detail: 'Supplier ratings, trade histories and compliance credentials in one place.'},
                    {title: 'Compliance-ready documentation', detail: 'APEDA, FSSAI and customs documentation integrated with every trade.'},
                    {title: 'Freight coordination and tracking', detail: 'Inland, ocean and multimodal logistics aligned with shipment visibility.'},
                  ].map((item, i) => (
                    <div key={i} className="rounded-3xl border border-green-900/20 bg-[#07170e] p-5 mb-4">
                      <p className="text-green-400 text-sm font-semibold mb-2">{item.title}</p>
                      <p className="text-gray-300 text-xs leading-relaxed">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
          {/* PROBLEMS WE SOLVE */}          {/* PROBLEMS WE SOLVE */}
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
                      className="bg-[#162616]/60 border border-green-900/30 rounded-xl p-4 text-center hover:border-green-600/60 hover:bg-green-900/20 hover:scale-105 transition group cursor-default ">
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
                        <span className="text-2xl ">{item.icon}</span>
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
                      <span className="text-2xl ">{card.icon}</span>
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
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-green-900/10 via-transparent to-blue-900/10 " />
            <div className="max-w-3xl mx-auto text-center relative">
              <div className="text-6xl mb-4 ">&#x1F30D;</div>
              <h2 className="text-4xl font-black mb-4">Ready to Trade Smarter?</h2>
              <p className="text-gray-400 mb-8 text-sm leading-relaxed">50+ commodities. Zero MOQ. End-to-end supply chain from India to the world.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={() => setShowQuoteForm(true)}
                  className="bg-green-500 text-white px-10 py-4 rounded-xl font-black text-lg hover:bg-green-400 transition hover:shadow-xl hover:shadow-green-500/40 transform hover:scale-105 active:scale-95 ">
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
          {activeDetail && <DetailModal data={activeDetail} onClose={() => setActiveDetail(null)} />}

          {showQuoteForm && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-[#0d1f0d] border border-green-800/50 rounded-2xl p-8 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto ">
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
