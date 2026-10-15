import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, ArrowUpRight, Leaf, Shield, Award, Instagram, Facebook, Linkedin, Youtube } from 'lucide-react';
import { EVENT_CONFIG, HOST_CITIES } from '../data/eventData';

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        background: '#050608',
        position: 'relative',
        borderTop: '1px solid rgba(229, 197, 131, 0.2)',
        overflow: 'hidden',
      }}
    >
      {/* Pre-footer Dramatic Banner */}
      <div
        style={{
          position: 'relative',
          padding: 'clamp(4rem, 8vw, 6.5rem) 0',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'linear-gradient(180deg, rgba(8,10,11,0.7) 0%, rgba(8,10,11,0.95) 100%)',
        }}
      >
        <img
          src="/images/sunset-runner.jpg"
          alt="Sunset marathon runner"
          loading="lazy"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.22,
            zIndex: 0,
          }}
        />
        <div
          className="container"
          style={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <div className="kicker">Edition 2027 · Limited Bib Slots</div>
          <h2
            className="heading-section"
            style={{
              maxWidth: '850px',
              marginBottom: '1.25rem',
            }}
          >
            Claim Your Spot on the <span className="font-serif-italic">Starting Line</span>
          </h2>
          <p
            className="text-muted"
            style={{
              maxWidth: '620px',
              fontSize: 'clamp(0.9375rem, 1.8vw, 1.125rem)',
              marginBottom: '2rem',
              lineHeight: 1.6,
            }}
          >
            Join 50,000+ runners across four historic cities in Bihar. Experience the energy, the riverfront sunrise, and the pride of crossing the finish arch.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/register" className="btn btn-gold">
              Reserve Your Bib Now
              <ArrowUpRight size={18} />
            </Link>
            <Link to="/categories" className="btn btn-outline-gold">
              Explore All 6 Races
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="container" style={{ padding: 'clamp(3rem, 6vw, 5rem) 1.5rem 3rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 'clamp(2rem, 4vw, 3.5rem)',
            marginBottom: '3.5rem',
          }}
        >
          {/* Col 1: Brand & Verified Details */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <img src="/pride-patna-marathon-logo.png" alt="Pride Patna Marathon" style={{ width: '150px', height: '72px', objectFit: 'contain' }} />
              <div>
                <div
                  className="font-editorial"
                  style={{ fontSize: '1.15rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-ivory)' }}
                >
                  {EVENT_CONFIG.company}
                </div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--gold-metallic)', fontWeight: 600, letterSpacing: '0.12em' }}>
                  {EVENT_CONFIG.edition}
                </div>
              </div>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Bihar’s marquee endurance festival. Certified by AFI & AIMS with high-standard medical protocols and zero single-use plastics.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                <MapPin size={16} style={{ color: 'var(--gold-metallic)', flexShrink: 0, marginTop: '3px' }} />
                <span>{EVENT_CONFIG.address}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Mail size={16} style={{ color: 'var(--gold-metallic)', flexShrink: 0 }} />
                <a href={`mailto:${EVENT_CONFIG.email}`} style={{ color: 'var(--text-ivory)' }}>
                  {EVENT_CONFIG.email}
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Phone size={16} style={{ color: 'var(--gold-metallic)', flexShrink: 0 }} />
                <span>{EVENT_CONFIG.phone}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4
              className="font-editorial"
              style={{
                fontSize: '0.875rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--gold-metallic)',
                marginBottom: '1.25rem',
              }}
            >
              Event Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.875rem' }}>
              <li>
                <Link to="/" style={{ color: 'var(--text-muted)' }}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/categories" style={{ color: 'var(--text-muted)' }}>
                  Races & Course Elevation
                </Link>
              </li>
              <li>
                <Link to="/register" style={{ color: 'var(--text-muted)' }}>
                  Bib Registration
                </Link>
              </li>
              <li>
                <Link to="/athlete" style={{ color: 'var(--text-muted)' }}>
                  Athlete Guide & Training Plans
                </Link>
              </li>
              <li>
                <Link to="/rules" style={{ color: 'var(--text-muted)' }}>
                  AFI Rules & Regulations
                </Link>
              </li>
              <li>
                <Link to="/expo" style={{ color: 'var(--text-muted)' }}>
                  Bib Expo & Logistics
                </Link>
              </li>
              <li>
                <Link to="/blog" style={{ color: 'var(--text-muted)' }}>
                  Journal & News
                </Link>
              </li>
              <li>
                <Link to="/admin" style={{ color: 'var(--text-dim)' }}>
                  Operations Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Host Cities & Sustainability */}
          <div>
            <h4
              className="font-editorial"
              style={{
                fontSize: '0.875rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--gold-metallic)',
                marginBottom: '1.25rem',
              }}
            >
              Host Cities in Bihar
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              {HOST_CITIES.map((city, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gold-metallic)' }} />
                  <span>{city}</span>
                </li>
              ))}
            </ul>

            <h4
              className="font-editorial"
              style={{
                fontSize: '0.875rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--accent-mint)',
                marginBottom: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <Leaf size={16} />
              Green Race Mandate
            </h4>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-dim)', lineHeight: 1.5 }}>
              Plantable wildflower seed bibs, 100% recycled finisher jerseys, and zero single-use plastic on route.
            </p>
          </div>

          {/* Col 4: Certifications & Recognition */}
          <div>
            <h4
              className="font-editorial"
              style={{
                fontSize: '0.875rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--gold-metallic)',
                marginBottom: '1.25rem',
              }}
            >
              Accreditation
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div
                style={{
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-charcoal)',
                  border: '1px solid var(--gold-border-subtle)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gold-light)', fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                  <Award size={16} />
                  AFI & AIMS Certified
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Athletics Federation of India recognized timing route for World Athletics global qualification.
                </div>
              </div>

              <div
                style={{
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-charcoal)',
                  border: '1px solid var(--gold-border-subtle)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cobalt)', fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                  <Shield size={16} />
                  Apollo Medical Cover
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Comprehensive paramedical squads, ambulances, and ice recovery zones on race day.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mockup Exact Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid rgba(221, 180, 107, 0.2)',
            paddingTop: '2rem',
            paddingBottom: '1rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            fontSize: '0.8125rem',
            color: 'var(--text-dim)',
          }}
        >
          {/* Left: (M) ASM VENTURES + Building healthier communities. One step at a time. */}
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  border: '1.2px solid var(--gold-metallic)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(229,197,131,0.1)',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 40 40" fill="none">
                  <path d="M10 26 L17 14 L22 22 L26 17 L30 26" stroke="#F5F0E7" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, letterSpacing: '0.14em', color: '#FFFFFF', fontSize: '0.9rem' }}>
                ASM VENTURES
              </span>
            </div>
            <span style={{ color: 'rgba(245, 240, 231, 0.5)', fontSize: '0.8125rem' }}>
              Building healthier communities. One step at a time.
            </span>
          </div>

          {/* Right: Social icons + Privacy Policy + Terms & Conditions */}
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '1.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                title="Instagram"
                style={{ color: 'var(--text-muted)', transition: 'color 0.2s', display: 'flex', alignItems: 'center' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold-metallic)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                <Instagram size={17} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                title="Facebook"
                style={{ color: 'var(--text-muted)', transition: 'color 0.2s', display: 'flex', alignItems: 'center' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold-metallic)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                <Facebook size={17} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                title="LinkedIn"
                style={{ color: 'var(--text-muted)', transition: 'color 0.2s', display: 'flex', alignItems: 'center' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold-metallic)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                <Linkedin size={17} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                title="YouTube"
                style={{ color: 'var(--text-muted)', transition: 'color 0.2s', display: 'flex', alignItems: 'center' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold-metallic)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                <Youtube size={17} />
              </a>
            </div>

            <div style={{ display: 'flex', gap: '1.25rem', fontSize: '0.8125rem' }}>
              <Link to="/rules" style={{ color: 'var(--text-dim)', transition: 'color 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold-metallic)')} onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-dim)')}>
                Privacy Policy
              </Link>
              <Link to="/rules" style={{ color: 'var(--text-dim)', transition: 'color 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold-metallic)')} onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-dim)')}>
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
