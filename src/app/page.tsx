'use client';

import { useState } from 'react';

interface CommodityRate {
  name: string;
  unit: string;
  price: number;
  change: number;
  changePercent: number;
}

export default function Home() {
  const [commodityRates] = useState<CommodityRate[]>([
    { name: 'Cashew', unit: '/kg', price: 450.0, change: 25.0, changePercent: 5.89 },
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
