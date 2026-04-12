'use client';

import { useState } from 'react';
import Link from 'next/link';

const WA = 'https://wa.me/918838442155';

const roles = [
  {
    id: 'importer',
    icon: '\u{1F4E5}',
    title: 'Importer',
    tagline: 'Source quality commodities from verified Indian suppliers',
    color: '#3b82f6',
    border: 'border-blue-400/40',
    bg: 'bg-blue-950/40',
    glow: 'hover:shadow-[0_0_40px_rgba(59,130,246,0.3)]',
    benefits: [
      'Access 50+ verified agri & industrial commodities',
      'Real-time price tracking with NCDEX/LME feeds',
      'Quality reports & certifications shared upfront',
      'End-to-end logistics — FOB, CIF, CFR options',
      'Dedicated relationship manager',
      'Customs & documentation support',
    ],
    waMsg: 'Hi TradeFokus, I am an *Importer* interested in sourcing commodities from India. Please share details.',
  },
  {
    id: 'exporter',
    icon: '\u{1F4E4}',
    title: 'Exporter',
    tagline: 'Reach global buyers with verified demand signals',
    color: '#22c55e',
    border: 'border-green-400/40',
    bg: 'bg-green-950/40',
    glow: 'hover:shadow-[0_0_40px_rgba(34,197,94,0.3)]',
    benefits: [
      'Connect with authenticated global buyers',
      'AI-powered demand forecasting by region',
      'Freight booking — inland & overseas',
      'Full documentation — Shipping Bill, COO, Phyto',
      'APEDA & FSSAI registration guidance',
      'Real-time shipment tracking dashboard',
    ],
    waMsg: 'Hi TradeFokus, I am an *Exporter* looking to expand my global reach. Please connect.',
  },
  {
    id: 'supplier',
    icon: '\u{1F4E6}',
    title: 'Supplier',
    tagline: 'List your products and get matched with verified buyers',
    color: '#a855f7',
    border: 'border-purple-400/40',
    bg: 'bg-purple-950/40',
    glow: 'hover:shadow-[0_0_40px_rgba(168,85,247,0.3)]',
    benefits: [
      'List your product catalog for free',
      'Get matched with buyers by commodity & region',
      'Transparent pricing — no hidden commissions',
      'Quality inspection & certification assistance',
      'Payment facilitation via LC / TT / DA',
      'Logistics coordination from warehouse to port',
    ],
    waMsg: 'Hi TradeFokus, I am a *Supplier* looking to list my products and find buyers. Please share info.',
  },
  {
    id: 'farmer',
    icon: '\u{1F33E}',
    title: 'Farmer / Producer',
    tagline: 'Sell directly — skip middlemen, get fair prices',
    color: '#f59e0b',
    border: 'border-amber-400/40',
    bg: 'bg-amber-950/40',
    glow: 'hover:shadow-[0_0_40px_rgba(245,158,11,0.3)]',
    benefits: [
      'Direct connection with export buyers — no agents',
      'Fair price discovery via live APMC & mandi rates',
      'Harvest forecast & best-time-to-sell advisory',
      'Free quality testing & grading support',
      'Packaging & branding guidance for export',
      'Pick-up & transport from farm gate',
    ],
    waMsg: 'Hi TradeFokus, I am a *Farmer/Producer* and want to sell my produce directly. Please help.',
  },
  {
    id: 'manufacturer',
    icon: '\u{1F3ED}',
    title: 'Manufacturer',
    tagline: 'Procure raw materials and export finished goods',
    color: '#06b6d4',
    border: 'border-cyan-400/40',
    bg: 'bg-cyan-950/40',
    glow: 'hover:shadow-[0_0_40px_rgba(6,182,212,0.3)]',
    benefits: [
      'Bulk raw material sourcing at competitive prices',
      'Multi-origin procurement — India, SE Asia, Africa',
      'Quality specs & compliance check before dispatch',
      'Dangerous goods & hazmat logistics support',
      'Freight consolidation for reduced costs',
      'Trade finance facilitation',
    ],
    waMsg: 'Hi TradeFokus, I am a *Manufacturer* looking to procure raw materials. Please share options.',
  },
  {
    id: 'producer',
    icon: '\u{2699}\u{FE0F}',
    title: 'Mill / Processor',
    tagline: 'Source inputs and sell processed output globally',
    color: '#ec4899',
    border: 'border-pink-400/40',
    bg: 'bg-pink-950/40',
    glow: 'hover:shadow-[0_0_40px_rgba(236,72,153,0.3)]',
    benefits: [
      'Source grains, oilseeds & metals at mill-door prices',
      'Output placement to domestic & international buyers',
      'Seasonal planning with AI harvest predictions',
      'Custom packaging & private label export support',
      'Lab testing & certificate management',
      'End-to-end supply chain visibility',
    ],
    waMsg: 'Hi TradeFokus, I am a *Mill/Processor* interested in sourcing and selling through your platform. Please connect.',
  },
];

export default function PortalPage() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#060e06] text-white">
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatY {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        .anim-fadeUp { animation: fadeUp 0.7s ease forwards; }
        .anim-float { animation: floatY 4s ease-in-out infinite; }
        .anim-pulseGlow { animation: pulseGlow 2.5s ease-in-out infinite; }
      `}</style>

      {/* Nav */}
      <nav className="fixed w-full bg-[#0a1a0a]/95 backdrop-blur-md border-b border-green-900/30 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <span className="text-2xl font-black tracking-tight">
              Trade<span className="text-green-400">Fokus</span>
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-gray-400 hover:text-green-400 transition text-sm">
              Home
            </Link>
            <a
              href={`${WA}?text=${encodeURIComponent('Hi TradeFokus, I visited the Portal page and want to get started!')}`}
              target="_blank" rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-bold transition"
            >
              Get Started
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-green-400 text-xs font-black tracking-[0.3em] uppercase mb-4 anim-pulseGlow">
            Trade Portal
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            Your Gateway to<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400">
              Global Commodity Trade
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Whether you grow it, process it, manufacture it, supply it, export it, or import it {'\u2014'} TradeFokus connects you with the right partner.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            {roles.map(r => (
              <button key={r.id} onClick={() => document.getElementById(r.id)?.scrollIntoView({ behavior: 'smooth' })}
                className="px-4 py-2 rounded-full text-xs font-bold border transition hover:scale-105"
                style={{ borderColor: `${r.color}60`, color: r.color, background: `${r.color}10` }}
              >
                {r.icon} {r.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Role Cards */}
      <section className="pb-24 px-4">
        <div className="max-w-6xl mx-auto grid gap-8 md:gap-10">
          {roles.map((r, idx) => (
            <div
              key={r.id}
              id={r.id}
              className={`anim-fadeUp rounded-2xl border ${r.border} ${r.bg} ${r.glow} transition-all duration-500 overflow-hidden`}
              style={{ animationDelay: `${idx * 0.12}s`, opacity: 0 }}
              onMouseEnter={() => setHovered(r.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="p-6 sm:p-8 lg:p-10">
                {/* Header */}
                <div className="flex items-start gap-5 mb-6">
                  <div className="text-5xl anim-float" style={{ animationDelay: `${idx * 0.3}s` }}>
                    {r.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-black mb-1" style={{ color: r.color }}>
                      {r.title}
                    </h2>
                    <p className="text-gray-400 text-sm sm:text-base">{r.tagline}</p>
                  </div>
                </div>

                {/* Benefits Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
                  {r.benefits.map((b, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-3 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                      <span className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0"
                        style={{ background: `${r.color}25`, color: r.color }}>
                        {i + 1}
                      </span>
                      <span className="text-gray-300 text-sm leading-snug">{b}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex flex-wrap gap-3">
                  <a
                    href={`${WA}?text=${encodeURIComponent(r.waMsg)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white transition hover:scale-105 active:scale-95"
                    style={{ background: r.color }}
                  >
                    <span className="text-lg">{'\u{1F4AC}'}</span>
                    Chat on WhatsApp
                  </a>
                  <Link href="/"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm border transition hover:scale-105"
                    style={{ borderColor: `${r.color}50`, color: r.color }}
                  >
                    Explore Platform {'\u2192'}
                  </Link>
                </div>
              </div>

              {/* Bottom accent bar */}
              <div className="h-1 w-full transition-all duration-500"
                style={{ background: hovered === r.id ? `linear-gradient(to right, ${r.color}, transparent)` : `linear-gradient(to right, ${r.color}30, transparent)` }} />
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 px-4 bg-gradient-to-b from-green-950/30 to-[#060e06] border-t border-green-900/20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">
            Ready to Trade{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">Smarter</span>?
          </h2>
          <p className="text-gray-400 mb-8 text-lg">
            Join 400+ verified traders already on TradeFokus. No fees. No middlemen. Just direct connections.
          </p>
          <a
            href={`${WA}?text=${encodeURIComponent('Hi TradeFokus, I want to register on your portal. Please guide me!')}`}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-xl font-black text-lg transition hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(34,197,94,0.3)]"
          >
            <span className="text-2xl">{'\u{1F91D}'}</span>
            Start Your Journey
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-green-900/20 text-center">
        <p className="text-gray-600 text-sm">
          {'\u00A9'} {new Date().getFullYear()} TradeFokus {'\u2014'} VERSAVERDE LLP. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
