'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Menu, X, ChevronDown, Package, ShieldCheck, MapPin, TrendingUp, FileText } from 'lucide-react';

interface NavItemProps {
  label: string;
  icon?: React.ComponentType<{ size: number }>;
  children?: React.ReactNode;
}

const NavItem = ({ label, icon: Icon, children }: NavItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="nav-item-wrapper"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="nav-link">
        {Icon && <Icon size={16} />}
        {label}
        {children && <ChevronDown size={14} className={`chevron ${isOpen ? 'rotate' : ''}`} />}
      </button>
      
      <AnimatePresence>
        {isOpen && children && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="dropdown glass"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface NavbarProps {
  theme?: 'earth' | 'fire' | 'galaxy';
}

const Navbar = ({ theme = 'earth' }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const themeColors = {
    earth: { primary: 'var(--color-primary)', fire: '#ff0000', galaxy: '#9d00ff' },
    fire: { primary: '#ff0000', fire: '#ff0000', galaxy: '#9d00ff' },
    galaxy: { primary: '#9d00ff', fire: '#ff0000', galaxy: '#9d00ff' }
  };

  const getThemeColor = (type: 'primary' | 'fire' | 'galaxy') => {
    return themeColors[theme][type];
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled glass' : ''} theme-${theme}`}>
      <div className="container nav-content">
        <div className="logo-section">
          <Globe className="logo-icon" size={32} style={{ color: getThemeColor('primary') }} />
          <div className="logo-text">
            <span className="brand">Tradefokus</span>
            <span className="tagline">Powered by VersaVerde</span>
          </div>
        </div>

        <div className="desktop-menu">
          <NavItem label="Commodities" icon={Package}>
            <div className="dropdown-grid">
              <a href="#agri" className="dropdown-item">
                <div className="item-icon agri" style={{ background: theme === 'fire' ? 'rgba(255, 0, 0, 0.15)' : theme === 'galaxy' ? 'rgba(157, 0, 255, 0.15)' : '' }}><Package size={20} /></div>
                <div>
                  <h6 style={{ color: theme === 'fire' ? '#ff0000' : theme === 'galaxy' ? '#9d00ff' : '' }}>Agri Portal</h6>
                  <p>Grains, Spices, Oilseeds</p>
                </div>
              </a>
              <a href="#non-agri" className="dropdown-item">
                <div className="item-icon non-agri" style={{ background: theme === 'fire' ? 'rgba(255, 51, 51, 0.15)' : theme === 'galaxy' ? 'rgba(0, 242, 255, 0.15)' : '' }}><ShieldCheck size={20} /></div>
                <div>
                  <h6 style={{ color: theme === 'fire' ? '#ff3333' : theme === 'galaxy' ? '#00f2ff' : '' }}>Non-Agri Portal</h6>
                  <p>Metals, Minerals, Chemicals</p>
                </div>
              </a>
            </div>
          </NavItem>
          
          <NavItem label="Supply Chain" icon={MapPin}>
            <div className="dropdown-list">
              <a href="#tracking" className="dropdown-item-simple">Real-time Tracking</a>
              <a href="#logistics" className="dropdown-item-simple">Freight Management</a>
              <a href="#quality" className="dropdown-item-simple">Quality Inspection</a>
            </div>
          </NavItem>

          <a href="#intelligence" className="nav-link"><TrendingUp size={16} /> Market Intel</a>
          <a href="#docs" className="nav-link"><FileText size={16} /> Documents</a>
          <a href="#about" className="nav-link">About</a>
        </div>

        <div className="nav-actions">
          <button className="btn btn-outline btn-sm hide-mobile" style={{ borderColor: theme === 'fire' ? 'rgba(255, 0, 0, 0.3)' : theme === 'galaxy' ? 'rgba(157, 0, 255, 0.3)' : '' }}>Enquire</button>
          <button 
            className="btn btn-primary btn-sm" 
            style={{ 
              background: theme === 'fire' ? 'linear-gradient(90deg, #ff0000, #ff5555)' : 
                          theme === 'galaxy' ? 'linear-gradient(90deg, #9d00ff, #00f2ff)' : '',
              color: theme === 'fire' ? 'white' : ''
            }}
          >
            Get Started
          </button>
          <button className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
