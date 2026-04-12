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

  const DetailModal = ({ data, onClose }: { data: DetailData; onClose: () => void }) => {
    const accentMap: Record<string, { border: string; bg: string; text: string; dot: string }> = {
      green:  { border: 'border-green-500/40', bg: 'bg-green-900/20', text: 'text-green-400', dot: 'bg-green-400' },
      amber:  { border: 'border-amber-500/40', bg: 'bg-amber-900/20', text: 'text-amber-400', dot: 'bg-amber-400' },
      blue:   { border: 'border-blue-500/40',  bg: 'bg-blue-900/20',  text: 'text-blue-400',  dot: 'bg-blue-400'  },
      orange: { border: 'border-orange-500/40', bg: 'bg-orange-900/20', text: 'text-orange-400', dot: 'bg-orange-400' },
    };
    const a = accentMap[data.accent] || accentMap.green;
    return (
      <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="bg-[#0d1f0d] border border-green-800/50 rounded-2xl max-w-3xl w-full shadow-2xl max-h-[90vh] overflow-y-auto anim-fadeSlideUp" onClick={e => e.stopPropagation()}>
          <div className="flex items-start justify-between p-6 pb-4 border-b border-green-900/30">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{data.icon}</span>
              <div>
                <h3 className="text-xl font-black text-white">{data.title}</h3>
                <p className={`text-xs font-bold tracking-widest uppercase mt-1 ${a.text}`}>Enterprise Intelligence Module</p>
              </div>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-white hover:rotate-90 transition text-2xl leading-none transform ml-4">&times;</button>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <p className={`text-xs font-black tracking-widest uppercase mb-3 ${a.text}`}>Overview</p>
              <p className="text-gray-300 text-sm leading-relaxed">{data.overview}</p>
            </div>
            <div>
              <p className={`text-xs font-black tracking-widest uppercase mb-3 ${a.text}`}>Key Metrics</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {data.metrics.map((m, i) => (
                  <div key={i} className={`border ${a.border} rounded-xl p-3 text-center ${a.bg} hover:scale-105 transition`}>
                    <div className={`text-lg font-black ${a.text}`}>{m.value}</div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className={`text-xs font-black tracking-widest uppercase mb-3 ${a.text}`}>Platform Capabilities</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {data.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${a.dot}`} />
                    <span className="text-gray-400 text-xs leading-relaxed">{f}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className={`text-xs font-black tracking-widest uppercase mb-3 ${a.text}`}>Enterprise Use Cases</p>
              <div className="space-y-2">
                {data.useCases.map((u, i) => (
                  <div key={i} className="flex items-start gap-2 bg-white/[0.02] border border-green-900/15 rounded-lg px-3 py-2">
                    <span className={`text-xs mt-0.5 ${a.text}`}>&rarr;</span>
                    <span className="text-gray-300 text-xs">{u}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={`border ${a.border} rounded-xl p-4 ${a.bg}`}>
              <p className="text-gray-400 text-xs italic">{data.clients}</p>
            </div>
            <div className="flex gap-3">
              <a href={WA} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-xl font-bold text-sm hover:bg-[#1fbb59] transition">&#x1F4F1; Discuss This Module</a>
              <button onClick={onClose} className="px-6 border border-green-800/40 text-gray-500 py-3 rounded-xl hover:bg-green-900/20 transition font-semibold text-sm">Close</button>
            </div>
          </div>
        </div>
      </div>
    );
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
                  <span className="text-2xl font-black text-white tracking-tight">Trade</span>
                  <span className="text-2xl font-black text-green-400 tracking-tight">Fokus</span>
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
                    <span className="text-white">Trade</span>
                    <span className="text-green-400" style={{ textShadow: '0 0 40px rgba(34,197,94,0.45)' }}>Fokus</span>
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
                        <button key={i}
                          onClick={() => openDetail(text as string, platformDetails)}
                          className="flex items-center gap-3 group cursor-pointer w-full text-left hover:bg-green-900/20 rounded-lg px-2 py-1 -mx-2 transition"
                          style={{ animation: `fadeSlideUp 0.5s ease ${i * 0.08}s both` }}>
                          <span className="text-lg transition-transform group-hover:scale-125">{icon}</span>
                          <span className="text-gray-300 text-sm transition-colors group-hover:text-green-400 flex-1">{text}</span>
                          <span className="text-green-500/0 group-hover:text-green-500/80 text-xs transition-all">Details &rarr;</span>
                        </button>
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
                      <button key={i} onClick={() => openDetail(item.t, agriFeatureDetails)}
                        className="border border-green-800/25 rounded-xl p-5 hover:border-green-500/50 hover:bg-green-900/15 hover:-translate-y-1 transition group cursor-pointer text-left">
                        <h4 className="text-green-300 font-bold text-sm mb-2 group-hover:text-green-200">{item.t}</h4>
                        <p className="text-gray-600 text-xs leading-relaxed mb-2">{item.d}</p>
                        <span className="text-green-500/0 group-hover:text-green-500 text-xs font-bold transition-all">Click for details &rarr;</span>
                      </button>
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
                            <span className="text-white font-bold text-sm">{item.price}<span className="text-gray-600 text-xs ml-0.5">{item.unit}</span></span>
                            <span className={`text-sm font-bold w-16 text-right flex items-center gap-0.5 justify-end ${item.change > 0 ? 'text-green-400' : item.change < 0 ? 'text-red-400' : 'text-gray-500'}`}>
                              {item.change > 0 ? '\u25b2' : item.change < 0 ? '\u25bc' : '\u2013'} {Math.abs(item.change).toFixed(1)}%
                            </span>
                          </div>
                        </div>
                        {hoveredRow === i && item.origin && (
                          <div className="px-3 pb-3 grid grid-cols-2 sm:grid-cols-3 gap-2 anim-fadeSlideUp">
                            <div className="bg-green-900/20 border border-green-900/30 rounded-lg px-2.5 py-1.5">
                              <div className="text-[9px] text-gray-600 uppercase tracking-wider">Origin</div>
                              <div className="text-gray-300 text-xs font-semibold">{item.origin}</div>
                            </div>
                            <div className="bg-green-900/20 border border-green-900/30 rounded-lg px-2.5 py-1.5">
                              <div className="text-[9px] text-gray-600 uppercase tracking-wider">Grade</div>
                              <div className="text-gray-300 text-xs font-semibold">{item.grade}</div>
                            </div>
                            <div className="bg-green-900/20 border border-green-900/30 rounded-lg px-2.5 py-1.5">
                              <div className="text-[9px] text-gray-600 uppercase tracking-wider">Min Order</div>
                              <div className="text-gray-300 text-xs font-semibold">{item.moq}</div>
                            </div>
                            <div className="bg-green-900/20 border border-green-900/30 rounded-lg px-2.5 py-1.5">
                              <div className="text-[9px] text-gray-600 uppercase tracking-wider">52W Range</div>
                              <div className="text-gray-300 text-xs font-semibold">{item.range52w}</div>
                            </div>
                            <div className="bg-green-900/20 border border-green-900/30 rounded-lg px-2.5 py-1.5">
                              <div className="text-[9px] text-gray-600 uppercase tracking-wider">Packaging</div>
                              <div className="text-gray-300 text-xs font-semibold">{item.packaging}</div>
                            </div>
                            <a href={WA} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center bg-[#25D366]/20 border border-[#25D366]/40 rounded-lg px-2.5 py-1.5 text-[#25D366] text-xs font-bold hover:bg-[#25D366]/30 transition">&#x1F4F1; Enquire</a>
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
                      <p className="text-gray-600 text-xs leading-relaxed mb-2">{item.d}</p>
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
