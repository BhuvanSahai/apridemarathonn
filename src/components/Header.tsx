import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight, Shield } from 'lucide-react';
import { EVENT_CONFIG } from '../data/eventData';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Home', path: '/', hash: '#top' },
    { label: 'About', path: '/about', hash: '#about' },
    { label: 'Races', path: '/categories', hash: '#races' },
    { label: 'Gallery', path: '/#gallery', hash: '#gallery' },
    { label: 'Contact', path: '/expo', hash: '#contact' },
  ];

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 100,
        transition: 'all 0.3s ease',
        background: isScrolled
          ? 'rgba(5, 6, 8, 0.94)'
          : 'linear-gradient(180deg, rgba(5, 6, 8, 0.98) 0%, rgba(5, 6, 8, 0.75) 100%)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: isScrolled
          ? '1px solid rgba(229, 197, 131, 0.22)'
          : '1px solid rgba(255, 255, 255, 0.06)',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '76px',
        }}
      >
        {/* Brand Logo matching mockup: (M) A S M */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            textDecoration: 'none',
          }}
          aria-label="Pride Patna Marathon Home"
        >
<img src="/pride-patna-marathon-logo.png" alt="Pride Patna Marathon" style={{ width: 'min(22vw, 190px)', height: '54px', objectFit: 'contain', flexShrink: 0 }} />
        </Link>

        {/* Center Desktop Navigation Links */}
        <nav
          className="desktop-nav-menu"
          aria-label="Primary Navigation"
        >
          <ul
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2.25rem',
              listStyle: 'none',
              margin: 0,
              padding: 0,
            }}
          >
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path && !location.hash;
              return (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className={`header-nav-link ${isActive ? 'active' : ''}`}
                    onClick={(e) => {
                      if (link.hash && location.pathname === '/' && link.hash !== '#top') {
                        e.preventDefault();
                        const elem = document.querySelector(link.hash);
                        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right Actions: Register Now Button + Hamburger Menu */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <Link
            to="/register"
            className="btn-pill-gold"
          >
            <span>Register Now</span>
            <span style={{ fontSize: '1.1rem', lineHeight: 1 }}>→</span>
          </Link>

          {/* Hamburger Menu Toggle (Mockup 3 horizontal bars) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            style={{
              background: 'transparent',
              border: 'none',
              padding: '0.5rem',
              color: 'var(--gold-metallic)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '5px',
              width: '42px',
              height: '42px',
              borderRadius: '8px',
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(229,197,131,0.12)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            {mobileMenuOpen ? (
              <X size={26} color="var(--gold-metallic)" />
            ) : (
              <>
                <span style={{ display: 'block', width: '22px', height: '2px', background: 'var(--gold-metallic)', borderRadius: '2px', transition: 'all 0.2s ease' }} />
                <span style={{ display: 'block', width: '22px', height: '2px', background: 'var(--gold-metallic)', borderRadius: '2px', transition: 'all 0.2s ease' }} />
                <span style={{ display: 'block', width: '22px', height: '2px', background: 'var(--gold-metallic)', borderRadius: '2px', transition: 'all 0.2s ease' }} />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            top: '76px',
            height: 'calc(100vh - 76px)',
            background: 'rgba(5, 6, 8, 0.98)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            zIndex: 99,
            overflowY: 'auto',
            padding: '2rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderTop: '1px solid var(--gold-border)',
          }}
        >
          <nav aria-label="Navigation Menu">
            <div style={{ marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(229,197,131,0.2)' }}>
              <div style={{ color: 'var(--gold-metallic)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                Navigation & Events
              </div>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {[
                { label: 'Home', path: '/' },
                { label: 'Races & Categories (5K, 10K, 21K, 42K)', path: '/categories' },
                { label: 'About Pride Patna Marathon', path: '/about' },
                { label: 'Athlete Guide & Preparation', path: '/athlete' },
                { label: 'Rules, Waiver & FAQ', path: '/rules' },
                { label: 'Race Expo & Bib Pickup', path: '/expo' },
                { label: 'Journal & Stories', path: '/blog' },
                { label: 'Operations Portal (Admin)', path: '/admin' },
              ].map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.15rem',
                        fontWeight: 600,
                        color: isActive ? 'var(--gold-metallic)' : 'var(--text-ivory)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.45rem 0',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                        transition: 'color 0.2s ease',
                      }}
                    >
                      <span>{link.label}</span>
                      <ChevronRight size={18} style={{ opacity: 0.5, color: '#DDB46B' }} />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Link
              to="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-pill-gold"
              style={{ width: '100%', minHeight: '48px', fontSize: '1rem' }}
            >
              <span>Reserve Your Bib Now</span>
              <span>→</span>
            </Link>
            <div style={{ textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.8125rem' }}>
              {EVENT_CONFIG.venue} · {EVENT_CONFIG.dateFormatted}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
