'use client';

import React from 'react';
import { useLiveRates } from '../hooks/useLiveRates';

const RatesTicker = () => {
  const { rates, lastUpdated } = useLiveRates();

  // Duplicate for seamless scroll
  const items = [...rates, ...rates];

  return (
    <div className="rates-ticker">
      <div className="ticker-label">
        <span className="live-pulse" style={{ background: 'var(--color-primary)', boxShadow: '0 0 10px var(--color-primary)' }}></span>
        <span className="label-text" style={{ color: 'var(--color-primary)' }}>LIVE</span>
      </div>
      
      <div className="ticker-viewport">
        <div className="ticker-track">
          {items.map((r, i) => {
            const isUp = r.changePct >= 0;
            return (
              <div key={i} className="ticker-item">
                <span className="ticker-sym">{r.sym}</span>
                <span className="ticker-price">
                  {r.price.toLocaleString(undefined, { minimumFractionDigits: r.price > 100 ? 1 : 2 })}
                  <span className="ticker-unit">{r.unit}</span>
                </span>
                <span className={`ticker-change ${isUp ? 'up' : 'down'}`}>
                  {isUp ? '▲' : '▼'} {Math.abs(r.changePct).toFixed(2)}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="ticker-time">
        {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  );
};

export default RatesTicker;
