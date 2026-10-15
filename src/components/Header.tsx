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
    { label: 'Home', path: '/' },
    { label: 'Races & Routes', path: '/categories' },
    { label: 'About', path: '/about' },
    { label: 'Athlete Guide', path: '/athlete' },
    { label: 'Rules & FAQ', path: '/rules' },
    { label: 'Expo & Contact', path: '/expo' },
    { label: 'Journal', path: '/blog' },
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
          ? 'rgba(8, 10, 11, 0.88)'
          : 'linear-gradient(180deg, rgba(8, 10, 11, 0.95) 0%, rgba(8, 10, 11, 0.4) 100%)',
        backdropFilter: isScrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
        borderBottom: isScrolled
          ? '1px solid rgba(221, 180, 107, 0.2)'
          : '1px solid rgba(255, 255, 255, 0.05)',
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
        {/* Brand Logo & Title */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.85rem',
            textDecoration: 'none',
          }}
          aria-label="ASM Ventures Marathon Home"
        >
          <img
            src="/logo.svg"
            alt="ASM Ventures Emblem"
            style={{ width: '40px', height: '40px', borderRadius: '10px' }}
          />
          <div>
            <div
              className="font-editorial"
              style={{
                fontSize: '1.125rem',
                fontWeight: 800,
                letterSpacing: '0.04em',
                lineHeight: 1.1,
                color: 'var(--text-ivory)',
                textTransform: 'uppercase',
              }}
            >
              ASM Ventures
            </div>
            <div
              style={{
                fontSize: '0.6875rem',
                fontWeight: 600,
                color: 'var(--gold-metallic)',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
              }}
            >
              Marathon 2027 · Patna
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          style={{ display: 'none' }}
          className="desktop-nav"
          aria-label="Primary Navigation"
        >
          <ul
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.75rem',
              listStyle: 'none',
            }}
          >
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    style={{
                      fontFamily: 'var(--font-editorial)',
                      fontSize: '0.875rem',
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? 'var(--gold-light)' : 'var(--text-muted)',
                      letterSpacing: '0.02em',
                      position: 'relative',
                      padding: '0.5rem 0',
                    }}
                  >
                    {link.label}
                    {isActive && (
                      <span
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          width: '100%',
                          height: '2px',
                          background: 'var(--gold-metallic)',
                          borderRadius: '2px',
                        }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Desktop CTA & Admin shortcut */}
        <div
          style={{ display: 'none', alignItems: 'center', gap: '1rem' }}
          className="desktop-cta"
        >
          <Link
            to="/admin"
            style={{
              color: 'var(--text-dim)',
              fontSize: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              padding: '0.4rem 0.6rem',
              borderRadius: 'var(--radius-sm)',
            }}
            title="Operations Portal"
          >
            <Shield size={14} />
            <span>Admin</span>
          </Link>

          <Link
            to="/register"
            className="btn btn-gold"
            style={{
              fontSize: '0.8125rem',
              padding: '0.625rem 1.35rem',
              minHeight: '42px',
            }}
          >
            Register Now
            <ChevronRight size={16} />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          className="mobile-toggle"
          style={{
            background: 'none',
            border: '1px solid var(--gold-border)',
            borderRadius: 'var(--radius-sm)',
            padding: '0.5rem',
            color: 'var(--gold-metallic)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '44px',
            minWidth: '44px',
          }}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            top: '76px',
            height: 'calc(100vh - 76px)',
            background: 'rgba(8, 10, 11, 0.98)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            zIndex: 99,
            overflowY: 'auto',
            padding: '2rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderTop: '1px solid var(--gold-border)',
          }}
        >
          <nav aria-label="Mobile Navigation">
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      style={{
                        fontFamily: 'var(--font-editorial)',
                        fontSize: '1.35rem',
                        fontWeight: 700,
                        color: isActive ? 'var(--gold-metallic)' : 'var(--text-ivory)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.5rem 0',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                      }}
                    >
                      <span>{link.label}</span>
                      <ChevronRight size={18} style={{ opacity: 0.5 }} />
                    </Link>
                  </li>
                );
              })}
              <li>
                <Link
                  to="/admin"
                  style={{
                    fontFamily: 'var(--font-editorial)',
                    fontSize: '1rem',
                    color: 'var(--text-dim)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 0',
                  }}
                >
                  <Shield size={16} />
                  <span>Operations / Admin Portal</span>
                </Link>
              </li>
            </ul>
          </nav>

          <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Link
              to="/register"
              className="btn btn-gold"
              style={{ width: '100%', minHeight: '50px' }}
            >
              Reserve Your Bib
              <ChevronRight size={18} />
            </Link>
            <div style={{ textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.8125rem' }}>
              {EVENT_CONFIG.venue} · {EVENT_CONFIG.dateFormatted}
            </div>
          </div>
        </div>
      )}

      {/* Media query styling for header responsiveness */}
      <style>{`
        @media (min-width: 1024px) {
          .desktop-nav {
            display: block !important;
          }
          .desktop-cta {
            display: flex !important;
          }
          .mobile-toggle {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};
