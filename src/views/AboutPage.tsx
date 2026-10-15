import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Leaf, Calendar, ShieldCheck, HeartHandshake, ArrowRight } from 'lucide-react';
import { EVENT_CONFIG, TIMELINE, GREEN_PLEDGES, ORGANIZER_CREDENTIALS, SUSTAINABILITY_STATS } from '../data/eventData';

export const AboutPage: React.FC = () => {
  return (
    <div className="about-page" style={{ position: 'relative' }}>
      {/* Header Banner */}
      <section
        style={{
          position: 'relative',
          padding: 'clamp(5rem, 10vw, 7.5rem) 0 clamp(3.5rem, 6vw, 5rem)',
          borderBottom: '1px solid rgba(221, 180, 107, 0.2)',
          background: 'linear-gradient(180deg, rgba(8,10,11,0.7) 0%, rgba(8,10,11,0.95) 100%)',
          overflow: 'hidden',
        }}
      >
        <img
          src="/images/sunrise-runners.jpg"
          alt="Runners at sunrise along the Ganga"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.25,
            zIndex: 0,
          }}
        />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="kicker">Our Heritage & Mission</div>
          <h1 className="heading-hero" style={{ marginBottom: '1rem' }}>
            The <span className="font-serif-italic">Movement</span>
          </h1>
          <p
            className="text-muted"
            style={{
              maxWidth: '680px',
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              lineHeight: 1.6,
            }}
          >
            How {EVENT_CONFIG.company} grew an intimate 500-runner riverside jog into Bihar’s premier certified community marathon.
          </p>
        </div>
      </section>

      {/* Origin Story & Vision */}
      <section className="section-spacing container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(2rem, 5vw, 4rem)',
            alignItems: 'center',
            marginBottom: '4.5rem',
          }}
        >
          <div>
            <div className="kicker">From Fraser Road to the World</div>
            <h2 className="heading-section" style={{ marginBottom: '1.25rem' }}>
              Built from <span className="font-serif-italic">Passion</span>, Run with Purpose
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              Headquartered at Fraser Road in Patna, {EVENT_CONFIG.company} was founded on a simple conviction: sports create community, and running empowers people of all walks of life.
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              What started as an informal winter gathering along the Ganga Pathway has evolved into a multi-city phenomenon spanning Patna, Gaya, Muzaffarpur, and Bhagalpur. Today, ASM Ventures Marathon is recognized by the Athletics Federation of India (AFI) and the Association of International Marathons (AIMS), welcoming athletes from across India and abroad.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link to="/register" className="btn btn-gold">
                Join the 2027 Movement
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="panel-charcoal" style={{ padding: '2rem', border: '1px solid var(--gold-border-subtle)' }}>
            <h3 className="heading-card" style={{ fontSize: '1.35rem', marginBottom: '1.25rem', color: 'var(--gold-metallic)' }}>
              Organizing Credentials
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {ORGANIZER_CREDENTIALS.map((cred, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                  <ShieldCheck size={20} style={{ color: 'var(--gold-light)', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--text-ivory)', fontSize: '0.9375rem', marginBottom: '0.2rem' }}>
                      {cred.title}
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.8125rem', lineHeight: 1.5 }}>
                      {cred.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Milestone Timeline (2018 - 2027) */}
        <div style={{ marginBottom: '4.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="kicker">Historic Milestones</div>
            <h2 className="heading-section">
              Years of <span className="font-serif-italic">Strides</span>
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {TIMELINE.map((item, idx) => (
              <div
                key={idx}
                className="panel-charcoal"
                style={{
                  padding: '1.75rem 1.5rem',
                  border: '1px solid var(--gold-border-subtle)',
                  position: 'relative',
                }}
              >
                <div
                  className="font-editorial"
                  style={{
                    fontSize: '2rem',
                    fontWeight: 800,
                    color: 'var(--gold-metallic)',
                    marginBottom: '0.75rem',
                    lineHeight: 1,
                  }}
                >
                  {item.year}
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Sustainability & Environmental Impact */}
        <div
          className="panel-charcoal"
          style={{
            padding: 'clamp(2rem, 5vw, 3.5rem)',
            border: '1px solid var(--gold-border)',
            background: 'linear-gradient(135deg, #18191B 0%, #101114 100%)',
          }}
        >
          <div style={{ maxWidth: '780px', margin: '0 auto', textAlign: 'center', marginBottom: '2.5rem' }}>
            <div className="kicker" style={{ color: 'var(--accent-mint)', borderColor: 'var(--accent-mint)' }}>
              <Leaf size={14} />
              <span>Zero-Waste Mandate</span>
            </div>
            <h2 className="heading-section" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', marginBottom: '1rem' }}>
              Protecting the Ground We <span className="font-serif-italic">Run Upon</span>
            </h2>
            <p className="text-muted" style={{ fontSize: '0.9375rem', lineHeight: 1.6 }}>
              Mass events frequently leave trails of discarded plastic cups and promotional litter. We pledged to forge a completely eco-conscious sporting legacy in Bihar.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
            {GREEN_PLEDGES.map((pledge, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(36, 35, 34, 0.6)',
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                }}
              >
                <Award size={18} style={{ color: 'var(--gold-metallic)', flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '0.875rem', color: 'var(--text-ivory)', lineHeight: 1.5 }}>{pledge}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
