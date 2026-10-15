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
} from 'lucide-react';
import { EVENT_CONFIG, RACE_CATEGORIES, SUSTAINABILITY_STATS, GREEN_PLEDGES, PARTNER_TIERS, FAQ_CATEGORIES } from '../data/eventData';
import { HeroScene3D } from '../components/HeroScene3D';
import { CountdownTimer } from '../components/CountdownTimer';
import { RaceCard } from '../components/RaceCard';
import { RouteMapModal } from '../components/RouteMapModal';
import { GalleryLightbox, GalleryImage } from '../components/GalleryLightbox';
import { RaceCategory } from '../types';

export const HomePage: React.FC = () => {
  const [selectedCategoryModal, setSelectedCategoryModal] = useState<RaceCategory | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

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

  return (
    <div className="home-page" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* =================================================================
          HERO SECTION — Luxury Black & Gold Cinematic Sports Campaign
          ================================================================= */}
      <section
        style={{
          position: 'relative',
          minHeight: 'calc(100vh - 76px)',
          display: 'flex',
          alignItems: 'center',
          padding: 'clamp(2.5rem, 6vw, 5rem) 0 clamp(3.5rem, 8vw, 6rem)',
          overflow: 'hidden',
          background: 'radial-gradient(ellipse at 70% 30%, rgba(221,180,107,0.08) 0%, #080A0B 75%)',
        }}
      >
        {/* 3D Dynamic Three.js Golden Ribbon & Particles Canvas */}
        <HeroScene3D />

        {/* Cinematic Runner Composite Image on Desktop/Tablet */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 'clamp(320px, 50vw, 750px)',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 2,
            opacity: 0.88,
            maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)',
          }}
          className="hero-runner-visual"
        >
          <img
            src="/images/hero-marathon.jpg"
            alt="Cinematic marathon runner in motion"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
              filter: 'contrast(1.15) brightness(0.95)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(90deg, #080A0B 0%, rgba(8,10,11,0.4) 50%, rgba(8,10,11,0) 100%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(0deg, #080A0B 0%, rgba(8,10,11,0.2) 40%, rgba(8,10,11,0) 100%)',
            }}
          />
        </div>

        {/* Hero Content Container */}
        <div className="container" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
          <div style={{ maxWidth: '680px' }}>
            {/* Event Kicker */}
            <div className="kicker" style={{ marginBottom: '1.25rem' }}>
              <Sparkles size={14} style={{ color: 'var(--gold-metallic)' }} />
              <span>{EVENT_CONFIG.edition} · Patna, Bihar</span>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="heading-hero" style={{ marginBottom: '1.5rem' }}>
              Every Mile <br />
              <span className="font-serif-italic">Matters.</span>
            </h1>

            {/* Supporting verified message */}
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                color: 'var(--text-muted)',
                lineHeight: 1.6,
                marginBottom: '2rem',
                maxWidth: '580px',
              }}
            >
              Six races. Four cities. One unforgettable morning when all of Patna runs together — presented by{' '}
              <strong style={{ color: 'var(--text-ivory)', fontWeight: 600 }}>{EVENT_CONFIG.company}</strong>.
            </p>

            {/* CTAs */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                alignItems: 'center',
                marginBottom: '2.5rem',
              }}
            >
              <Link to="/register" className="btn btn-gold" style={{ minWidth: '180px' }}>
                Reserve Your Bib
                <ArrowRight size={18} />
              </Link>

              <a href="#races" className="btn btn-outline-gold" style={{ minWidth: '180px' }}>
                <Compass size={18} />
                Explore the Races
              </a>
            </div>

            {/* Verified Quick Highlights Badges */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'clamp(1rem, 3vw, 2rem)',
                borderTop: '1px solid rgba(221, 180, 107, 0.2)',
                paddingTop: '1.5rem',
                color: 'var(--text-ivory-soft)',
                fontSize: '0.875rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Calendar size={18} style={{ color: 'var(--gold-metallic)' }} />
                <span>{EVENT_CONFIG.dateFormatted}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <MapPin size={18} style={{ color: 'var(--gold-metallic)' }} />
                <span>Gandhi Maidan, Patna</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <ShieldCheck size={18} style={{ color: 'var(--accent-mint)' }} />
                <span>AFI & AIMS Certified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          RACE DAY PANEL — Verified Countdown, Venue, & Start Corrals
          ================================================================= */}
      <section style={{ position: 'relative', zIndex: 20, marginTop: '-2.5rem' }}>
        <div className="container">
          <CountdownTimer />
        </div>
      </section>

      {/* =================================================================
          RACE CATEGORIES & COURSE PROFILES
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
          <div className="kicker">Edition 2027 Distance Matrix</div>
          <h2 className="heading-section" style={{ marginBottom: '1rem' }}>
            Choose Your <span className="font-serif-italic">Challenge</span>
          </h2>
          <p
            className="text-muted"
            style={{
              maxWidth: '650px',
              fontSize: 'clamp(0.9375rem, 1.8vw, 1.125rem)',
              lineHeight: 1.6,
            }}
          >
            From the electric 5K Riverfront loop for families to the grueling 50K Ultra midnight run. Every race distance is chip-timed with world-class course support.
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
              { id: 'all', label: 'All 6 Categories' },
              { id: '5k', label: '5K Fun Run' },
              { id: '10k', label: '10K Timed Run' },
              { id: '21k', label: '21.1K Half' },
              { id: '42k', label: '42.2K Full' },
              { id: '50k', label: '50K Ultra' },
              { id: 'virtual', label: 'Virtual' },
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

        {/* View Full Route Comparison Table Link */}
        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <Link to="/categories" className="btn btn-outline-gold">
            <Layers size={16} />
            Compare All Races & Elevation Profiles
            <ChevronRight size={16} />
          </Link>
        </div>
      </section>

      {/* =================================================================
          WHY RUN WITH US — VERIFIED BENEFITS & GREEN MANDATE
          ================================================================= */}
      <section
        style={{
          background: 'linear-gradient(180deg, #101114 0%, #080A0B 100%)',
          borderTop: '1px solid rgba(221, 180, 107, 0.15)',
          borderBottom: '1px solid rgba(221, 180, 107, 0.15)',
        }}
        className="section-spacing"
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'clamp(2rem, 5vw, 4rem)',
              alignItems: 'center',
            }}
          >
            {/* Left Column: Mission & Pledges */}
            <div>
              <div className="kicker">Sustainability & Legacy</div>
              <h2 className="heading-section" style={{ marginBottom: '1.25rem' }}>
                Why Run With <span className="font-serif-italic">ASM Ventures?</span>
              </h2>
              <p
                className="text-muted"
                style={{ fontSize: '1rem', lineHeight: 1.6, marginBottom: '2rem' }}
              >
                We believe running is a catalyst for urban wellness, civic pride, and environmental action. Edition 2027 introduces India’s first comprehensive zero-single-use-plastic marathon protocol.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {GREEN_PLEDGES.map((pledge, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      background: 'rgba(36, 35, 34, 0.45)',
                      padding: '1rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid rgba(221, 180, 107, 0.15)',
                    }}
                  >
                    <Award size={18} style={{ color: 'var(--gold-metallic)', flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '0.9375rem', color: 'var(--text-ivory)' }}>{pledge}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Verified Stats Matrix */}
            <div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '1.25rem',
                }}
              >
                {SUSTAINABILITY_STATS.map((stat, idx) => (
                  <div
                    key={idx}
                    className="panel-charcoal"
                    style={{
                      padding: 'clamp(1.25rem, 2.5vw, 2rem)',
                      textAlign: 'center',
                      border: '1px solid rgba(221, 180, 107, 0.2)',
                    }}
                  >
                    <div
                      className="font-editorial"
                      style={{
                        fontSize: 'clamp(2rem, 4vw, 3rem)',
                        fontWeight: 800,
                        lineHeight: 1,
                        color:
                          stat.tone === 'mint'
                            ? 'var(--accent-mint)'
                            : stat.tone === 'flame'
                            ? 'var(--accent-flame)'
                            : stat.tone === 'cobalt'
                            ? 'var(--accent-cobalt)'
                            : 'var(--gold-light)',
                        marginBottom: '0.5rem',
                      }}
                    >
                      {stat.num}
                    </div>
                    <div
                      style={{
                        fontSize: '0.8125rem',
                        color: 'var(--text-muted)',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {stat.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          PHOTO GALLERY & RACE DAY EXPERIENCE
          ================================================================= */}
      <section className="section-spacing container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="kicker">Visual Moments</div>
          <h2 className="heading-section" style={{ marginBottom: '1rem' }}>
            Patna in <span className="font-serif-italic">Motion</span>
          </h2>
          <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1rem' }}>
            From pre-dawn riverfront fog to triumphant finish-line tears. Click any photo to open the high-resolution lightbox.
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
                  background: 'linear-gradient(0deg, rgba(8,10,11,0.85) 0%, rgba(8,10,11,0) 60%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '1rem',
                }}
              >
                <span
                  style={{
                    fontSize: '0.6875rem',
                    textTransform: 'uppercase',
                    color: 'var(--gold-metallic)',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                  }}
                >
                  {img.category}
                </span>
                <span
                  style={{
                    fontSize: '0.9375rem',
                    fontWeight: 600,
                    color: 'var(--text-ivory)',
                  }}
                >
                  {img.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =================================================================
          VERIFIED EVENT PARTNERS & SUPPORTERS
          ================================================================= */}
      <section
        style={{
          background: 'linear-gradient(180deg, #080A0B 0%, #101114 100%)',
          padding: 'clamp(3.5rem, 6vw, 5rem) 0',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div className="kicker">Official Alliance</div>
            <h2 className="heading-section" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)' }}>
              Presented with <span className="font-serif-italic">Pride</span>
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {PARTNER_TIERS.map((tier, idx) => (
              <div key={idx} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    color: 'var(--gold-metallic)',
                    fontWeight: 700,
                    marginBottom: '1rem',
                  }}
                >
                  {tier.tier}
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '1rem',
                  }}
                >
                  {tier.names.map((name, i) => (
                    <div
                      key={i}
                      style={{
                        padding: tier.big ? '1rem 2.5rem' : '0.65rem 1.5rem',
                        background: 'var(--bg-charcoal)',
                        border: '1px solid rgba(221, 180, 107, 0.25)',
                        borderRadius: 'var(--radius-full)',
                        fontFamily: 'var(--font-editorial)',
                        fontSize: tier.big ? '1.25rem' : '0.9375rem',
                        fontWeight: tier.big ? 800 : 600,
                        color: 'var(--text-ivory)',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {name}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================
          FREQUENTLY ASKED QUESTIONS PREVIEW
          ================================================================= */}
      <section className="section-spacing container">
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div className="kicker">Quick Answers</div>
            <h2 className="heading-section" style={{ marginBottom: '0.75rem' }}>
              Frequently Asked <span className="font-serif-italic">Questions</span>
            </h2>
            <p className="text-muted">
              Everything you need to know about registration, race packs, medical safety, and race morning.
            </p>
          </div>

          {/* FAQ Accordion */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {FAQ_CATEGORIES[0].items.concat(FAQ_CATEGORIES[1].items.slice(0, 2)).map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="panel-charcoal"
                  style={{
                    border: isOpen ? '1px solid var(--gold-border)' : '1px solid rgba(255, 255, 255, 0.08)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    style={{
                      width: '100%',
                      padding: '1.25rem 1.5rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-ivory)',
                      textAlign: 'left',
                      fontFamily: 'var(--font-editorial)',
                      fontSize: '1.0625rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={20}
                      style={{
                        color: 'var(--gold-metallic)',
                        transform: isOpen ? 'rotate(180deg)' : 'none',
                        transition: 'transform 0.25s ease',
                        flexShrink: 0,
                      }}
                    />
                  </button>
                  {isOpen && (
                    <div
                      style={{
                        padding: '0 1.5rem 1.25rem',
                        color: 'var(--text-muted)',
                        fontSize: '0.9375rem',
                        lineHeight: 1.6,
                        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
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
            <Link to="/rules" className="btn btn-outline-gold">
              View All Rules & Extended FAQs
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Elevation / Route Map Modal */}
      <RouteMapModal
        category={selectedCategoryModal}
        onClose={() => setSelectedCategoryModal(null)}
      />

      {/* Gallery Lightbox */}
      <GalleryLightbox
        images={galleryImages}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onSelectIndex={(newIdx) => setLightboxIndex(newIdx)}
      />
    </div>
  );
};
