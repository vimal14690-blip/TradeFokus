'use client';

import { useState } from 'react';
import Navbar from './components/Navbar';
import RatesTicker from './components/RatesTicker';
import Home from './components/Home';
import EarthBackground from './components/EarthBackground';

export default function Page() {
  const [activeSector, setActiveSector] = useState<string | null>(null);
  const [theme, setTheme] = useState<'earth' | 'fire' | 'galaxy'>('earth');

  return (
    <div className={`app-shell theme-${theme}`}>
      <div className="app-background" />
      <EarthBackground activeSector={activeSector} theme={theme} />


      <RatesTicker />
      <Navbar theme={theme} />
      
      {/* Theme Toggle Button */}
      <button 
        onClick={() => {
          const themes = ['earth', 'fire', 'galaxy'] as const;
          setTheme(themes[(themes.indexOf(theme) + 1) % themes.length]);
        }}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1000,
          background: theme === 'fire' ? 'rgba(255, 0, 0, 0.15)' : 
                     theme === 'galaxy' ? 'rgba(157, 0, 255, 0.15)' : 'rgba(255,255,255,0.1)',
          color: theme === 'fire' ? '#ff0000' : theme === 'galaxy' ? '#9d00ff' : 'var(--color-primary)',
          border: `1px solid ${theme === 'fire' ? 'rgba(255, 0, 0, 0.3)' : theme === 'galaxy' ? 'rgba(157, 0, 255, 0.3)' : 'rgba(255,255,255,0.2)'}`,
          padding: '0.75rem 1rem',
          borderRadius: '50px',
          cursor: 'pointer',
          fontWeight: '600',
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          transition: 'all 0.3s ease',
        } as React.CSSProperties}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = theme === 'fire' ? 'rgba(255, 0, 0, 0.25)' : 
                                            theme === 'galaxy' ? 'rgba(157, 0, 255, 0.25)' : 'rgba(255,255,255,0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = theme === 'fire' ? 'rgba(255, 0, 0, 0.15)' : 
                                            theme === 'galaxy' ? 'rgba(157, 0, 255, 0.15)' : 'rgba(255,255,255,0.1)';
        }}
      >
        {theme === 'earth' ? '🌍 THEME' : theme === 'fire' ? '🔥 THEME' : '🌌 THEME'}
      </button>

      <main>
        <Home setActiveSector={setActiveSector} theme={theme} />
      </main>
    </div>
  );
}
