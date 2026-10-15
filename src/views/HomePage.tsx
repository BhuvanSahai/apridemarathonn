import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  Award,
  Sparkles,
  MapPin,
  Calendar,
  Layers,
  ChevronRight,
  ChevronDown,
  Compass,
  Play,
  X,
  Volume2,
  VolumeX,
  Check,
  Trophy,
  Users,
  ShoppingBag,
  Clock,
  Flame,
  Droplets,
  Share2,
} from 'lucide-react';
import {
  EVENT_CONFIG,
  RACE_CATEGORIES,
  SUSTAINABILITY_STATS,
  GREEN_PLEDGES,
  PARTNER_TIERS,
  FAQ_CATEGORIES,
} from '../data/eventData';
import { RaceCard } from '../components/RaceCard';
import { RouteMapModal } from '../components/RouteMapModal';
import { GalleryLightbox, GalleryImage } from '../components/GalleryLightbox';
import { RaceCategory } from '../types';

export const HomePage: React.FC = () => {
  const [selectedCategoryModal, setSelectedCategoryModal] = useState<RaceCategory | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [showPromoModal, setShowPromoModal] = useState<boolean>(false);
  const [showSaveDateModal, setShowSaveDateModal] = useState<boolean>(false);
  const [copiedDate, setCopiedDate] = useState<boolean>(false);
  const [isPromoMuted, setIsPromoMuted] = useState<boolean>(true);

  const galleryImages: GalleryImage[] = [
    { src: '/images/sunrise-runners.jpg', title: 'Ganga Pathway Dawn Runners', category: 'Community' },
    { src: '/images/road-stride.jpg', title: 'Half Marathon Pace Group in Motion', category: '21.1K Race' },
    { src: '/images/stairs-training.jpg', title: 'Pre-Race Mobility and Warmup', category: 'Training' },
    { src: '/images/lace-up.jpg', title: 'Athlete Zone Kit Preparation', category: 'Preparation' },
    { src: '/images/track-aerial.jpg', title: 'Gandhi Maidan Race Village Arena', category: 'Venue' },
    { src: '/images/stadium-sprint.jpg', title: 'Final Sprint to the Finish Arch', category: 'Sprint' },
    { src: '/images/night-run.jpg', title: '50K Ultra Midnight Flag-Off', category: 'Ultra Run' },
    { src: '/images/start-blocks.jpg', title: 'Timing Mat Start Line Corrals', category: 'Start Line' },
  ];

  const filteredRaces =
    activeCategoryFilter === 'all'
      ? RACE_CATEGORIES
      : RACE_CATEGORIES.filter((r) => r.code === activeCategoryFilter);

  // Calendar handlers
  const handleGoogleCalendar = () => {
    const gcalUrl =
      'https://calendar.google.com/calendar/render?action=TEMPLATE&text=ASM+Ventures+Marathon+2027+-+Patna&dates=20270214T050000/20270214T120000&details=ASM+Ventures+Patna+Marathon+2027.+Gandhi+Maidan,+Patna.+Every+Mile+Matters!&location=Gandhi+Maidan,+Patna,+Bihar';
    window.open(gcalUrl, '_blank');
  };

  const handleDownloadIcs = () => {
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//ASM Ventures//Marathon 2027//EN',
      'BEGIN:VEVENT',
      'SUMMARY:ASM Ventures Marathon 2027 — Every Mile Matters',
      'DESCRIPTION:Patna flagship marathon festival. Gandhi Maidan, Patna. Every Mile Matters.',
      'LOCATION:Gandhi Maidan, Patna, Bihar, India',
      'DTSTART:20270214T050000',
      'DTEND:20270214T120000',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'ASM-Ventures-Marathon-2027.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyDate = () => {
    navigator.clipboard.writeText('ASM Ventures Marathon: February 14, 2027 at Gandhi Maidan, Patna. Every Mile Matters!');
    setCopiedDate(true);
    setTimeout(() => setCopiedDate(false), 2500);
  };

  // Helper to open category modal by distance
  const handleSelectDistance = (distCode: string) => {
    const cat = RACE_CATEGORIES.find((c) => c.code === distCode) || RACE_CATEGORIES[0];
    setSelectedCategoryModal(cat);
  };

  return (
    <div className="home-page" style={{ position: 'relative', overflow: 'hidden', background: '#080A0B' }}>
      {/* =================================================================
          1. HERO SECTION — EXACT MATCH TO MOCKUP
          ================================================================= */}
      <section
        id="top"
        style={{
          position: 'relative',
          minHeight: 'clamp(580px, 86vh, 880px)',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          background: 'radial-gradient(ellipse at 70% 30%, rgba(229,197,131,0.06) 0%, #050608 70%)',
          paddingTop: 'clamp(2rem, 5vw, 4rem)',
          paddingBottom: 'clamp(4rem, 8vw, 7rem)',
        }}
      >
        {/* Crystal-Clear 8K Hero Runner Visual (No baked-in text, zero duplication) */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 'clamp(440px, 62vw, 1020px)',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 1,
            opacity: 0.96,
            maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)',
          }}
          className="hero-runner-visual"
        >
          <img
            src="/images/hero-runner-hd.png"
            alt="Marathon runner sprinting into golden sunrise with champagne light ribbon"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'right 30%',
              filter: 'contrast(1.1) brightness(1.03)',
            }}
          />
          {/* Edge blending gradients */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(90deg, #050608 0%, rgba(5,6,8,0.7) 25%, rgba(5,6,8,0) 65%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(0deg, #050608 0%, rgba(5,6,8,0.3) 20%, rgba(5,6,8,0) 100%)',
            }}
          />
        </div>

        {/* Single Vector Cursive Badge: Patna + Runs Together */}
        <div className="patna-runs-badge">
          <div>Patna</div>
          <div style={{ marginLeft: '0.4rem', color: '#F5DEAA' }}>+ Runs</div>
          <div style={{ marginLeft: '1.2rem' }}>Together</div>
        </div>

        {/* Single Vector Right-Edge SCROLL Indicator */}
        <div className="hero-scroll-bar">
          <span className="hero-scroll-text">SCROLL</span>
          <div className="hero-scroll-track">
            <div className="hero-scroll-dot" />
          </div>
        </div>

        {/* Hero Left Content Container */}
        <div className="container" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
          <div style={{ maxWidth: '640px' }}>
            {/* Tagline: • ASM VENTURES PRESENTS */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--gold-metallic)',
                fontSize: '0.8125rem',
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginBottom: '1.25rem',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: 'var(--gold-metallic)',
                  boxShadow: '0 0 10px rgba(229,197,131,0.9)',
                }}
              />
              <span>ASM VENTURES PRESENTS</span>
            </div>

            {/* Main Heading: Every Mile Matters */}
            <h1
              style={{
                margin: '0 0 1.5rem 0',
                lineHeight: 0.95,
              }}
            >
              <span
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(3.2rem, 7.5vw, 6.25rem)',
                  fontWeight: 900,
                  color: '#FFFFFF',
                  letterSpacing: '-0.025em',
                  textTransform: 'none',
                  lineHeight: 1,
                  textShadow: '0 4px 24px rgba(0,0,0,0.9)',
                }}
              >
                Every Mile
              </span>
              <span className="hero-matters-container">
                <span className="hero-matters-text">Matters</span>
                {/* Expressive fluid golden underline stroke */}
                <svg className="hero-matters-swoosh" viewBox="0 0 280 32" fill="none">
                  <path
                    d="M4 16 C 70 28, 170 28, 274 6"
                    stroke="#E5C583"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M30 20 C 100 28, 190 26, 260 12"
                    stroke="#F5DEAA"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    opacity="0.8"
                  />
                </svg>
              </span>
            </h1>

            {/* Subtext description */}
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(1rem, 1.8vw, 1.18rem)',
                color: '#C8C4BA',
                lineHeight: 1.6,
                marginBottom: '2.25rem',
                maxWidth: '540px',
              }}
            >
              Six races. Four cities. One unforgettable morning when all of Patna runs together — presented by{' '}
              <strong style={{ color: '#FFFFFF', fontWeight: 600 }}>ASM Ventures</strong>.
            </p>

            {/* CTAs: Reserve your bib →  and  ▶ Watch Promo */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1.25rem',
                alignItems: 'center',
              }}
            >
              <Link
                to="/register"
                className="btn-pill-gold"
                style={{
                  fontSize: '0.9375rem',
                  padding: '0.8rem 1.85rem',
                  borderRadius: '9999px',
                }}
              >
                <span>Reserve your bib</span>
                <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>→</span>
              </Link>

              <button
                type="button"
                onClick={() => setShowPromoModal(true)}
                className="btn-pill-translucent"
                style={{
                  fontSize: '0.9375rem',
                  padding: '0.8rem 1.65rem',
                  borderRadius: '9999px',
                }}
              >
                <div
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    background: 'rgba(221,180,107,0.2)',
                    border: '1px solid #DDB46B',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Play size={12} fill="#DDB46B" color="#DDB46B" style={{ marginLeft: '2px' }} />
                </div>
                <span>Watch Promo</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          2. FLOATING EVENT DATE & RACE CATEGORIES BANNER (SIGNATURE CARD)
          ================================================================= */}
      <section
        style={{
          position: 'relative',
          zIndex: 25,
          marginTop: 'clamp(-3.5rem, -5vw, -2.5rem)',
          marginBottom: 'clamp(3rem, 6vw, 5rem)',
        }}
      >
        <div className="container">
          <div className="signature-card-container">
            <div className="signature-card-grid">
              {/* Left Box: 14 FEB 2027 · Gandhi Maidan, Patna */}
              <div
                className="date-feature-box"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(11,14,20,0.96) 0%, rgba(11,14,20,0.7) 50%, rgba(11,14,20,0.95) 100%), url(/images/patna-bridge-sunset.jpg) center/cover no-repeat',
                }}
              >
                {/* Vertical Rotated Label on the left edge: • RACE DAY */}
                <div
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%) rotate(-90deg)',
                    transformOrigin: 'center center',
                    color: 'var(--gold-metallic)',
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    letterSpacing: '0.24em',
                    textTransform: 'uppercase',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    whiteSpace: 'nowrap',
                    opacity: 0.95,
                  }}
                >
                  <span
                    style={{
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      background: 'var(--gold-metallic)',
                    }}
                  />
                  <span>RACE DAY</span>
                </div>

                {/* Content offset from vertical label */}
                <div style={{ paddingLeft: '1.25rem' }}>
                  {/* Big Number: 14 + Stacked FEB 2027 */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.85rem',
                      marginBottom: '0.75rem',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(3.5rem, 6vw, 4.8rem)',
                        fontWeight: 900,
                        lineHeight: 1,
                        color: '#FFFFFF',
                        letterSpacing: '-0.03em',
                      }}
                    >
                      14
                    </span>
                    <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '1.35rem',
                          fontWeight: 800,
                          color: 'var(--gold-champagne)',
                          letterSpacing: '0.08em',
                        }}
                      >
                        FEB
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '1.35rem',
                          fontWeight: 800,
                          color: 'var(--gold-champagne)',
                          letterSpacing: '0.04em',
                        }}
                      >
                        2027
                      </span>
                    </div>
                  </div>

                  {/* Location: Gandhi Maidan, Patna */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: '#FFFFFF',
                      fontSize: '0.9375rem',
                      fontWeight: 500,
                      marginBottom: '1.5rem',
                    }}
                  >
                    <MapPin size={16} color="var(--gold-metallic)" />
                    <span>Gandhi Maidan, Patna</span>
                  </div>

                  {/* Link: → Save the Date */}
                  <button
                    type="button"
                    onClick={() => setShowSaveDateModal(true)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--gold-metallic)',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      cursor: 'pointer',
                      padding: 0,
                      transition: 'transform 0.2s ease, color 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--gold-metallic)')}
                  >
                    <span>→</span>
                    <span style={{ textDecoration: 'underline', textUnderlineOffset: '4px' }}>Save the Date</span>
                  </button>
                </div>
              </div>

              {/* Right Box: RACE CATEGORIES (4 Cards: 5K, 10K, 21K, 42K) */}
              <div className="categories-shelf-box">
                <div
                  style={{
                    color: 'var(--gold-metallic)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    marginBottom: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <span>RACE CATEGORIES</span>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                    gap: '0.85rem',
                  }}
                >
                  {/* Category 1: 5K Fun Run */}
                  <div
                    className="category-mini-card"
                    onClick={() => handleSelectDistance('5k')}
                    role="button"
                    tabIndex={0}
                  >
                    <div>
                      {/* Stylized Runner Icon */}
                      <div style={{ marginBottom: '0.65rem' }}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold-metallic)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="15" cy="4" r="2" />
                          <path d="m7 21 3-5 3 2 4-5" />
                          <path d="m11 11-4-2-2 3" />
                          <path d="m11 11 3 2 2-2 3 1" />
                        </svg>
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '1.4rem',
                          fontWeight: 800,
                          color: '#FFFFFF',
                          lineHeight: 1.1,
                          marginBottom: '0.2rem',
                        }}
                      >
                        5K
                      </div>
                      <div style={{ color: '#FFFFFF', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.15rem' }}>
                        Fun Run
                      </div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>
                        For Everyone
                      </div>
                    </div>
                    <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-start' }}>
                      <div
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          border: '1px solid var(--gold-border)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--gold-metallic)',
                          fontSize: '0.8rem',
                        }}
                      >
                        →
                      </div>
                    </div>
                  </div>

                  {/* Category 2: 10K Challenge Run */}
                  <div
                    className="category-mini-card"
                    onClick={() => handleSelectDistance('10k')}
                    role="button"
                    tabIndex={0}
                  >
                    <div>
                      <div style={{ marginBottom: '0.65rem' }}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold-metallic)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="15" cy="4" r="2" />
                          <path d="m7 21 3-5 3 2 4-5" />
                          <path d="m11 11-4-2-2 3" />
                          <path d="m11 11 3 2 2-2 3 1" />
                        </svg>
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '1.4rem',
                          fontWeight: 800,
                          color: '#FFFFFF',
                          lineHeight: 1.1,
                          marginBottom: '0.2rem',
                        }}
                      >
                        10K
                      </div>
                      <div style={{ color: '#FFFFFF', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.15rem' }}>
                        Challenge Run
                      </div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>
                        For Fitness Enthusiasts
                      </div>
                    </div>
                    <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-start' }}>
                      <div
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          border: '1px solid var(--gold-border)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--gold-metallic)',
                          fontSize: '0.8rem',
                        }}
                      >
                        →
                      </div>
                    </div>
                  </div>

                  {/* Category 3: 21K Half Marathon */}
                  <div
                    className="category-mini-card"
                    onClick={() => handleSelectDistance('21k')}
                    role="button"
                    tabIndex={0}
                  >
                    <div>
                      <div style={{ marginBottom: '0.65rem' }}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold-metallic)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="15" cy="4" r="2" />
                          <path d="m7 21 3-5 3 2 4-5" />
                          <path d="m11 11-4-2-2 3" />
                          <path d="m11 11 3 2 2-2 3 1" />
                        </svg>
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '1.4rem',
                          fontWeight: 800,
                          color: '#FFFFFF',
                          lineHeight: 1.1,
                          marginBottom: '0.2rem',
                        }}
                      >
                        21K
                      </div>
                      <div style={{ color: '#FFFFFF', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.15rem' }}>
                        Half Marathon
                      </div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>
                        For Serious Runners
                      </div>
                    </div>
                    <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-start' }}>
                      <div
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          border: '1px solid var(--gold-border)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--gold-metallic)',
                          fontSize: '0.8rem',
                        }}
                      >
                        →
                      </div>
                    </div>
                  </div>

                  {/* Category 4: 42K Full Marathon */}
                  <div
                    className="category-mini-card"
                    onClick={() => handleSelectDistance('42k')}
                    role="button"
                    tabIndex={0}
                  >
                    <div>
                      <div style={{ marginBottom: '0.65rem' }}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold-metallic)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="15" cy="4" r="2" />
                          <path d="m7 21 3-5 3 2 4-5" />
                          <path d="m11 11-4-2-2 3" />
                          <path d="m11 11 3 2 2-2 3 1" />
                        </svg>
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '1.4rem',
                          fontWeight: 800,
                          color: '#FFFFFF',
                          lineHeight: 1.1,
                          marginBottom: '0.2rem',
                        }}
                      >
                        42K
                      </div>
                      <div style={{ color: '#FFFFFF', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.15rem' }}>
                        Full Marathon
                      </div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>
                        For the Brave
                      </div>
                    </div>
                    <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-start' }}>
                      <div
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          border: '1px solid var(--gold-border)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--gold-metallic)',
                          fontSize: '0.8rem',
                        }}
                      >
                        →
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          3. "WHY RUN WITH US" — MORE THAN JUST A RACE (EXACT MOCKUP)
          ================================================================= */}
      <section id="about" className="why-us-wrap">
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: 'clamp(2rem, 5vw, 4rem)',
              alignItems: 'center',
            }}
          >
            {/* Left Column: Heading + Description + 4 Features */}
            <div>
              {/* Kicker: WHY RUN WITH US */}
              <div
                style={{
                  color: 'var(--gold-metallic)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
              >
                <span>WHY RUN WITH US</span>
              </div>

              {/* Title: More Than Just a Race */}
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(2.25rem, 4.5vw, 3.6rem)',
                  fontWeight: 900,
                  lineHeight: 1.08,
                  marginBottom: '1.25rem',
                  letterSpacing: '-0.02em',
                }}
              >
                <span style={{ color: '#FFFFFF', display: 'block' }}>More Than</span>
                <span style={{ color: 'var(--gold-metallic)' }}>Just a Race</span>
              </h2>

              {/* Description */}
              <p
                style={{
                  color: 'var(--text-muted)',
                  fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
                  lineHeight: 1.6,
                  marginBottom: '2.5rem',
                  maxWidth: '520px',
                }}
              >
                It’s a celebration of fitness, community and the unbreakable spirit of Patna.
              </p>

              {/* 4 Feature Badges row */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: 'clamp(0.5rem, 1.5vw, 1rem)',
                }}
              >
                {/* 1: Well Planned Routes */}
                <div className="why-feature-pill">
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      background: 'rgba(229,197,131,0.12)',
                      border: '1px solid rgba(229,197,131,0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--gold-metallic)',
                    }}
                  >
                    <Compass size={20} />
                  </div>
                  <span style={{ color: '#FFFFFF', fontSize: '0.8125rem', fontWeight: 600, lineHeight: 1.3 }}>
                    Well Planned Routes
                  </span>
                </div>

                {/* 2: Exciting Race Experience */}
                <div className="why-feature-pill">
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      background: 'rgba(229,197,131,0.12)',
                      border: '1px solid rgba(229,197,131,0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--gold-metallic)',
                    }}
                  >
                    <Sparkles size={20} />
                  </div>
                  <span style={{ color: '#FFFFFF', fontSize: '0.8125rem', fontWeight: 600, lineHeight: 1.3 }}>
                    Exciting Race Experience
                  </span>
                </div>

                {/* 3: Community & Support */}
                <div className="why-feature-pill">
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      background: 'rgba(229,197,131,0.12)',
                      border: '1px solid rgba(229,197,131,0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--gold-metallic)',
                    }}
                  >
                    <Users size={20} />
                  </div>
                  <span style={{ color: '#FFFFFF', fontSize: '0.8125rem', fontWeight: 600, lineHeight: 1.3 }}>
                    Community & Support
                  </span>
                </div>

                {/* 4: Premium Race Kit */}
                <div className="why-feature-pill">
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      background: 'rgba(229,197,131,0.12)',
                      border: '1px solid rgba(229,197,131,0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--gold-metallic)',
                    }}
                  >
                    <ShoppingBag size={20} />
                  </div>
                  <span style={{ color: '#FFFFFF', fontSize: '0.8125rem', fontWeight: 600, lineHeight: 1.3 }}>
                    Premium Race Kit
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Running Shoes Image + Overlaid Gold Script */}
            <div>
              <div className="shoe-highlight-card" style={{ height: '360px' }}>
                <img
                  src="/images/running-shoes-action.jpg"
                  alt="Marathon running shoes striking wet pavement with golden light reflection"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center 60%',
                    filter: 'contrast(1.2) brightness(0.9)',
                  }}
                />
                {/* Dark gradient overlay for text readability */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(135deg, rgba(5,6,8,0.7) 0%, rgba(5,6,8,0.2) 60%, rgba(5,6,8,0.75) 100%)',
                  }}
                />
                {/* Overlaid Gold Handwritten Script: Run For A Better Tomorrow */}
                <div className="run-tomorrow-script">
                  <div>Run</div>
                  <div style={{ marginLeft: '0.5rem' }}>For A</div>
                  <div style={{ marginLeft: '1rem' }}>Better</div>
                  <div style={{ marginLeft: '1.5rem', color: 'var(--gold-champagne)' }}>Tomorrow</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          4. RACE CATEGORIES EXPLORATION & COURSE ELEVATION
          ================================================================= */}
      <section id="races" className="section-spacing container" style={{ position: 'relative' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            marginBottom: '3rem',
          }}
        >
          <div className="kicker">Official 2027 Distances</div>
          <h2 className="heading-section" style={{ marginBottom: '1rem' }}>
            Choose Your <span className="font-script" style={{ color: '#DDB46B', textTransform: 'none' }}>Challenge</span>
          </h2>
          <p
            className="text-muted"
            style={{
              maxWidth: '650px',
              fontSize: 'clamp(0.9375rem, 1.8vw, 1.125rem)',
              lineHeight: 1.6,
            }}
          >
            From the electric 5K Riverfront loop for families to the grueling 42.2K Full Marathon and 50K Ultra. Every race distance is AFI certified and chip-timed.
          </p>

          {/* Filter Pills */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              justifyContent: 'center',
              marginTop: '1.75rem',
            }}
          >
            {[
              { id: 'all', label: 'All Categories' },
              { id: '5k', label: '5K Fun' },
              { id: '10k', label: '10K Challenge' },
              { id: '21k', label: '21.1K Half' },
              { id: '42k', label: '42.2K Full' },
              { id: '50k', label: '50K Ultra' },
              { id: 'virtual', label: 'Virtual Run' },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setActiveCategoryFilter(f.id)}
                className="btn"
                style={{
                  fontSize: '0.8125rem',
                  padding: '0.45rem 1rem',
                  minHeight: '38px',
                  background: activeCategoryFilter === f.id ? 'var(--gold-metallic)' : 'var(--bg-charcoal)',
                  color: activeCategoryFilter === f.id ? '#080A0B' : 'var(--text-ivory)',
                  borderColor: activeCategoryFilter === f.id ? 'var(--gold-light)' : 'rgba(255, 255, 255, 0.08)',
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Race Cards Grid */}
        <div className="grid-races">
          {filteredRaces.map((cat) => (
            <RaceCard
              key={cat.code}
              category={cat}
              onOpenRouteModal={(c) => setSelectedCategoryModal(c)}
            />
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <Link to="/categories" className="btn btn-outline-gold">
            <Layers size={16} />
            Compare Full Race Elevation Profiles & Corrals
            <ChevronRight size={16} />
          </Link>
        </div>
      </section>

      {/* =================================================================
          5. PHOTO GALLERY — PATNA IN MOTION
          ================================================================= */}
      <section id="gallery" className="section-spacing container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="kicker">Visual Moments</div>
          <h2 className="heading-section" style={{ marginBottom: '1rem' }}>
            Patna in <span className="font-script" style={{ color: '#DDB46B', textTransform: 'none' }}>Motion</span>
          </h2>
          <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1rem' }}>
            From pre-dawn riverfront fog to triumphant finish-line memories. Click any photo to inspect in full resolution.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {galleryImages.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setLightboxIndex(idx)}
              className="panel-charcoal tilt-card"
              style={{
                cursor: 'pointer',
                position: 'relative',
                aspectRatio: '4 / 3',
                overflow: 'hidden',
                borderRadius: 'var(--radius-md)',
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setLightboxIndex(idx);
                }
              }}
              aria-label={`Open photo: ${img.title}`}
            >
              <img
                src={img.src}
                alt={img.title}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.4s ease',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(8,10,11,0.9) 0%, transparent 60%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '1.25rem',
                }}
              >
                <span
                  style={{
                    color: 'var(--gold-metallic)',
                    fontSize: '0.6875rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    fontWeight: 700,
                  }}
                >
                  {img.category}
                </span>
                <span style={{ color: 'var(--text-ivory)', fontWeight: 600, fontSize: '0.875rem' }}>
                  {img.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =================================================================
          6. FREQUENTLY ASKED QUESTIONS
          ================================================================= */}
      <section className="section-spacing container" style={{ borderTop: '1px solid rgba(221, 180, 107, 0.15)' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="kicker">Runner FAQ</div>
          <h2 className="heading-section" style={{ marginBottom: '1rem' }}>
            Got <span className="font-script" style={{ color: '#DDB46B', textTransform: 'none' }}>Questions?</span>
          </h2>
          <p className="text-muted" style={{ maxWidth: '580px', margin: '0 auto', fontSize: '1rem' }}>
            Everything you need to know about bib distribution, cutoff times, baggage counters, and medical support.
          </p>
        </div>

        <div style={{ maxWidth: '820px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {FAQ_CATEGORIES[0].items.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="panel-charcoal"
                style={{
                  borderRadius: 'var(--radius-md)',
                  border: isOpen ? '1px solid var(--gold-border)' : '1px solid rgba(255,255,255,0.06)',
                  overflow: 'hidden',
                  transition: 'border-color 0.2s ease',
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '1.25rem 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    color: isOpen ? 'var(--gold-metallic)' : 'var(--text-ivory)',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronDown size={20} color="#DDB46B" /> : <ChevronRight size={20} style={{ opacity: 0.5 }} />}
                </button>
                {isOpen && (
                  <div
                    style={{
                      padding: '0 1.5rem 1.25rem',
                      color: 'var(--text-muted)',
                      fontSize: '0.9375rem',
                      lineHeight: 1.6,
                      borderTop: '1px solid rgba(255,255,255,0.05)',
                      paddingTop: '0.75rem',
                    }}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link to="/rules" className="btn btn-outline-gold" style={{ fontSize: '0.875rem' }}>
            <span>View All FAQs, Waivers & Route Regulations</span>
            <ChevronRight size={16} />
          </Link>
        </div>
      </section>

      {/* =================================================================
          MODAL 1: WATCH PROMO CINEMATIC TEASER
          ================================================================= */}
      {showPromoModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(5, 6, 8, 0.94)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
          onClick={() => setShowPromoModal(false)}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '850px',
              background: '#0D0E12',
              borderRadius: '20px',
              border: '1px solid rgba(221,180,107,0.3)',
              boxShadow: '0 25px 60px rgba(0,0,0,0.85), 0 0 40px rgba(221,180,107,0.15)',
              overflow: 'hidden',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.25rem 1.75rem',
                borderBottom: '1px solid rgba(221,180,107,0.15)',
                background: 'rgba(18, 19, 23, 0.95)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: '#E58B6D',
                    boxShadow: '0 0 10px #E58B6D',
                  }}
                />
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '0.04em' }}>
                  ASM PATNA MARATHON 2027 — TEASER
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowPromoModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: '0.4rem',
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: '6px',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                <X size={22} />
              </button>
            </div>

            {/* Video preview container */}
            <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', background: '#000' }}>
              <img
                src="/images/hero-runner-cinematic.jpg"
                alt="Teaser Video Runner"
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'radial-gradient(circle, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.7) 100%)',
                }}
              >
                <div
                  style={{
                    width: '74px',
                    height: '74px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #E5BF77 0%, #D4A855 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 30px rgba(221,180,107,0.6)',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  <Play size={32} fill="#0B0C0E" color="#0B0C0E" style={{ marginLeft: '4px' }} />
                </div>
                <div
                  style={{
                    marginTop: '1.25rem',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    color: '#FFFFFF',
                    letterSpacing: '0.02em',
                  }}
                >
                  Official 2027 Promo Video
                </div>
                <div style={{ color: '#DDB46B', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                  Sunday, February 14, 2027 · Gandhi Maidan, Patna
                </div>
              </div>

              {/* Sound toggle button */}
              <button
                type="button"
                onClick={() => setIsPromoMuted(!isPromoMuted)}
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  right: '16px',
                  background: 'rgba(0,0,0,0.65)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                }}
              >
                {isPromoMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
            </div>

            {/* Footer action bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.25rem 1.75rem',
                background: '#101115',
                borderTop: '1px solid rgba(255,255,255,0.06)',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                Join 50,000+ runners. Registrations are open now.
              </div>
              <Link
                to="/register"
                onClick={() => setShowPromoModal(false)}
                className="btn-pill-gold"
                style={{ padding: '0.65rem 1.5rem' }}
              >
                <span>Reserve Your Bib Now</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================
          MODAL 2: SAVE THE DATE / CALENDAR
          ================================================================= */}
      {showSaveDateModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(5, 6, 8, 0.92)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
          onClick={() => setShowSaveDateModal(false)}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '520px',
              background: '#101116',
              borderRadius: '20px',
              border: '1px solid rgba(221,180,107,0.3)',
              boxShadow: '0 25px 60px rgba(0,0,0,0.85), 0 0 35px rgba(221,180,107,0.18)',
              overflow: 'hidden',
              padding: '2rem',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setShowSaveDateModal(false)}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
              }}
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  background: 'rgba(221,180,107,0.15)',
                  border: '1px solid #DDB46B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#DDB46B',
                }}
              >
                <Calendar size={22} />
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                  Save The Race Day
                </h3>
                <div style={{ color: '#DDB46B', fontSize: '0.8125rem', fontWeight: 600 }}>
                  February 14, 2027 · Gandhi Maidan, Patna
                </div>
              </div>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem', lineHeight: 1.6, marginBottom: '1.75rem' }}>
              Add ASM Ventures Marathon 2027 to your calendar so you don't miss flag-off time, bib expo dates, and pace group announcements.
            </p>

            {/* Options list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.75rem' }}>
              <button
                type="button"
                onClick={handleGoogleCalendar}
                className="btn-pill-gold"
                style={{ width: '100%', justifyContent: 'center', borderRadius: '12px', minHeight: '44px' }}
              >
                <Calendar size={18} />
                <span>Add to Google Calendar</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadIcs}
                className="btn-pill-translucent"
                style={{ width: '100%', justifyContent: 'center', borderRadius: '12px', minHeight: '44px' }}
              >
                <Calendar size={18} />
                <span>Download Apple / iCal (.ics)</span>
              </button>

              <button
                type="button"
                onClick={handleCopyDate}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  color: '#FFFFFF',
                  padding: '0.75rem',
                  fontSize: '0.875rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
              >
                {copiedDate ? <Check size={18} color="#7DC2A5" /> : <Share2 size={18} />}
                <span>{copiedDate ? 'Event Details Copied!' : 'Copy Event Summary'}</span>
              </button>
            </div>

            <div style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
              Reporting time: 04:30 AM IST · Gandhi Maidan Gate No. 1
            </div>
          </div>
        </div>
      )}

      {/* =================================================================
          MODAL 3: ROUTE MAP & RACE SPECIFICATIONS
          ================================================================= */}
      {selectedCategoryModal && (
        <RouteMapModal
          category={selectedCategoryModal}
          onClose={() => setSelectedCategoryModal(null)}
        />
      )}

      {/* =================================================================
          MODAL 4: PHOTO LIGHTBOX
          ================================================================= */}
      {lightboxIndex !== null && (
        <GalleryLightbox
          images={galleryImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onSelectIndex={(newIdx: number) => setLightboxIndex(newIdx)}
        />
      )}
    </div>
  );
};
