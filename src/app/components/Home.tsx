'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface HomeProps {
  setActiveSector?: (sector: string | null) => void;
  theme?: 'earth' | 'fire' | 'galaxy';
}

const Home = ({ setActiveSector, theme = 'earth' }: HomeProps) => {
  return (
    <div className="home-page">
      <section className="hero-centered">
        <div className="globe-spacer"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="hero-content-center"
        >
          <div className="badge" style={{ 
            color: 'var(--color-primary)', 
            borderColor: 'var(--color-glass-border)',
            background: 'var(--color-glass)'
          }}>
            {theme === 'earth' ? 'Trade Ecosystem v2.0' : theme === 'fire' ? 'Volcanic Energy Protocol' : 'Cosmic Pathway Node'}
          </div>
          
          <h1 className="hero-title">
            {theme === 'earth' ? (
              <>Global Trade <span className="gradient-text">Visualized</span></>
            ) : theme === 'fire' ? (
              <>Igniting the <span className="gradient-text" style={{ background: 'linear-gradient(90deg, #ff0000, #ff5555)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Fire Realm</span></>
            ) : (
              <>Exploring the <span className="gradient-text" style={{ background: 'linear-gradient(90deg, #9d00ff, #00f2ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Galaxy Realm</span></>
            )}
          </h1>
          
          <p className="hero-subtext">
            {theme === 'earth' 
              ? 'Real-time supply chain intelligence and commodity trading through our futuristic 3D ecosystem.'
              : theme === 'fire'
              ? 'Harnessing the raw power of the magma core for unprecedented resource optimization and industrial dominance.'
              : 'Navigating the cosmic pathways of trade across the infinite reaches of the digital frontier.'}
          </p>

          <div className="hero-actions">
            <button className="btn btn-primary">
              {theme === 'earth' ? 'Explore Global Markets' : theme === 'fire' ? 'Initialize Fire Protocol' : 'Enter Cosmic Portal'}
              <ArrowRight size={18} />
            </button>
            <button className="btn btn-outline">Live Data Feed</button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
