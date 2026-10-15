import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Clock,
  Zap,
  TrendingUp,
  Award,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  Flag,
} from 'lucide-react';
import { RACE_CATEGORIES } from '../data/eventData';
import { RouteMapModal } from '../components/RouteMapModal';
import { RaceCategory } from '../types';

export const CategoriesPage: React.FC = () => {
  const [selectedRoute, setSelectedRoute] = useState<RaceCategory | null>(null);

  return (
    <div className="categories-page" style={{ position: 'relative' }}>
      {/* Editorial Header Banner */}
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
          src="/images/track-aerial.jpg"
          alt="Aerial view of running track"
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
          <div className="kicker">Edition 2027 · Certified Race Matrix</div>
          <h1 className="heading-hero" style={{ marginBottom: '1rem' }}>
            Races & <span className="font-serif-italic">Routes</span>
          </h1>
          <p
            className="text-muted"
            style={{
              maxWidth: '680px',
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              lineHeight: 1.6,
            }}
          >
            Distances, flag-off times, elevation profiles, and certified timing parameters for all six official categories.
          </p>
        </div>
      </section>

      {/* Full Race Comparison Table */}
      <section className="section-spacing container">
        <div style={{ marginBottom: '3rem' }}>
          <div className="kicker">Course Specifications</div>
          <h2 className="heading-section">
            Distance <span className="font-serif-italic">Comparison</span>
          </h2>
        </div>

        <div
          className="panel-charcoal"
          style={{
            overflowX: 'auto',
            border: '1px solid var(--gold-border-subtle)',
            marginBottom: '4rem',
          }}
        >
          <table
            style={{
              width: '100%',
              minWidth: '720px',
              borderCollapse: 'collapse',
              textAlign: 'left',
              fontSize: '0.9375rem',
            }}
          >
            <thead>
              <tr
                style={{
                  borderBottom: '1px solid var(--gold-border)',
                  background: 'rgba(12, 13, 15, 0.8)',
                  color: 'var(--gold-metallic)',
                  fontFamily: 'var(--font-editorial)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontSize: '0.8125rem',
                }}
              >
                <th style={{ padding: '1.25rem 1.5rem' }}>Category</th>
                <th style={{ padding: '1.25rem 1rem' }}>Distance</th>
                <th style={{ padding: '1.25rem 1rem' }}>Flag-Off</th>
                <th style={{ padding: '1.25rem 1rem' }}>Cutoff</th>
                <th style={{ padding: '1.25rem 1rem' }}>Elevation</th>
                <th style={{ padding: '1.25rem 1rem' }}>Entry Fee</th>
                <th style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {RACE_CATEGORIES.map((cat, idx) => (
                <tr
                  key={cat.code}
                  style={{
                    borderBottom: idx !== RACE_CATEGORIES.length - 1 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
                    background: idx % 2 === 0 ? 'transparent' : 'rgba(255, 255, 255, 0.015)',
                  }}
                >
                  <td style={{ padding: '1.25rem 1.5rem', fontWeight: 700, color: 'var(--text-ivory)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <span
                        style={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          background: cat.color,
                        }}
                      />
                      <span>{cat.label}</span>
                    </div>
                  </td>
                  <td style={{ padding: '1.25rem 1rem', color: 'var(--text-muted)' }}>
                    {cat.dist} {cat.unit}
                  </td>
                  <td style={{ padding: '1.25rem 1rem', color: 'var(--text-ivory)' }}>
                    {cat.flag}
                  </td>
                  <td style={{ padding: '1.25rem 1rem', color: 'var(--text-muted)' }}>
                    {cat.cut}
                  </td>
                  <td style={{ padding: '1.25rem 1rem', color: 'var(--text-muted)' }}>
                    {cat.elevationGain || 'Flat'}
                  </td>
                  <td style={{ padding: '1.25rem 1rem', fontWeight: 800, color: 'var(--gold-light)' }}>
                    ₹{cat.fee}
                  </td>
                  <td style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                      <button
                        type="button"
                        onClick={() => setSelectedRoute(cat)}
                        className="btn btn-outline-gold"
                        style={{ padding: '0.45rem 0.75rem', fontSize: '0.75rem', minHeight: '34px' }}
                      >
                        Profile
                      </button>
                      {!cat.soon && (
                        <Link
                          to={`/register?cat=${cat.code}`}
                          className="btn btn-gold"
                          style={{ padding: '0.45rem 0.95rem', fontSize: '0.75rem', minHeight: '34px' }}
                        >
                          Book Bib
                        </Link>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Detailed Category Breakdown Cards */}
        <div style={{ marginBottom: '3rem' }}>
          <div className="kicker">Course Profiles & Amenities</div>
          <h2 className="heading-section">
            In-Depth <span className="font-serif-italic">Specifications</span>
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {RACE_CATEGORIES.map((cat) => (
            <div
              key={cat.code}
              className="panel-charcoal"
              style={{
                padding: 'clamp(1.5rem, 3.5vw, 2.5rem)',
                border: '1px solid var(--gold-border-subtle)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '1.5rem',
                  marginBottom: '1.5rem',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  paddingBottom: '1.5rem',
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'inline-block',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      color: cat.color,
                      marginBottom: '0.5rem',
                    }}
                  >
                    {cat.skill} · Age Eligibility: {cat.age}
                  </div>
                  <h3 className="heading-card" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}>
                    {cat.label}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                    <Flag size={15} style={{ color: 'var(--gold-metallic)' }} />
                    <span>Start: {cat.startPoint || 'Gandhi Maidan'} · Finish: {cat.finishPoint || 'Gandhi Maidan'}</span>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div className="font-editorial" style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--gold-light)', lineHeight: 1 }}>
                    ₹{cat.fee}
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Entry Bib Pass</span>
                </div>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '2rem',
                  alignItems: 'flex-start',
                }}
              >
                {/* Description & Highlights */}
                <div>
                  <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-ivory)', marginBottom: '0.75rem' }}>
                    Course Description & Route Architecture
                  </h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                    {cat.description}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {cat.highlights.map((h, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.875rem', color: 'var(--text-ivory-soft)' }}>
                        <CheckCircle size={15} style={{ color: cat.color, flexShrink: 0, marginTop: '2px' }} />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Runner Perks & Kit Items */}
                <div
                  style={{
                    background: 'rgba(12, 13, 15, 0.65)',
                    padding: '1.5rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid rgba(221, 180, 107, 0.15)',
                  }}
                >
                  <h4
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      color: 'var(--gold-metallic)',
                      marginBottom: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <Award size={16} />
                    Entitlements & Finisher Kit
                  </h4>

                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.875rem', color: 'var(--text-ivory-soft)', marginBottom: '1.5rem' }}>
                    {cat.perks.map((p, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gold-metallic)' }} />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                    <button
                      type="button"
                      onClick={() => setSelectedRoute(cat)}
                      className="btn btn-outline-gold"
                      style={{ flex: 1, fontSize: '0.8125rem', padding: '0.65rem' }}
                    >
                      <TrendingUp size={15} />
                      View Elevation
                    </button>

                    {!cat.soon ? (
                      <Link
                        to={`/register?cat=${cat.code}`}
                        className="btn btn-gold"
                        style={{ flex: 1, fontSize: '0.8125rem', padding: '0.65rem' }}
                      >
                        Register
                        <ArrowRight size={15} />
                      </Link>
                    ) : (
                      <button
                        disabled
                        className="btn"
                        style={{
                          flex: 1,
                          fontSize: '0.8125rem',
                          background: 'rgba(255,255,255,0.05)',
                          color: 'var(--text-dim)',
                          cursor: 'not-allowed',
                        }}
                      >
                        Coming Soon
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Route Elevation Modal */}
      <RouteMapModal category={selectedRoute} onClose={() => setSelectedRoute(null)} />
    </div>
  );
};
