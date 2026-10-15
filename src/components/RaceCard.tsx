import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ShieldCheck, ArrowRight, Zap, CheckCircle2, TrendingUp } from 'lucide-react';
import { RaceCategory } from '../types';

interface RaceCardProps {
  category: RaceCategory;
  onOpenRouteModal?: (category: RaceCategory) => void;
}

export const RaceCard: React.FC<RaceCardProps> = ({ category, onOpenRouteModal }) => {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="panel-charcoal tilt-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'clamp(1.25rem, 2.5vw, 1.85rem)',
        border: '1px solid var(--gold-border-subtle)',
        transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        transition: 'transform 0.15s ease-out, border-color 0.25s ease, box-shadow 0.25s ease',
        height: '100%',
        position: 'relative',
      }}
    >
      {/* Top Header */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
          <div>
            <span
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-editorial)',
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: category.color,
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '0.25rem 0.65rem',
                borderRadius: 'var(--radius-full)',
                border: `1px solid ${category.color}40`,
                marginBottom: '0.5rem',
              }}
            >
              {category.skill}
            </span>
            <h3 className="heading-card" style={{ fontSize: '1.5rem', color: 'var(--text-ivory)' }}>
              {category.label}
            </h3>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div
              className="font-editorial"
              style={{
                fontSize: '1.75rem',
                fontWeight: 800,
                color: 'var(--gold-light)',
                lineHeight: 1,
              }}
            >
              ₹{category.fee}
            </div>
            <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>Inclusive of all taxes</span>
          </div>
        </div>

        {/* Timings & Distance Badge */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '0.75rem',
            padding: '0.85rem',
            background: 'rgba(12, 13, 15, 0.6)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(255, 255, 255, 0.04)',
            marginBottom: '1.25rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            <Clock size={15} style={{ color: 'var(--gold-metallic)', flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Flag-Off</div>
              <div style={{ color: 'var(--text-ivory)', fontWeight: 600 }}>{category.flag}</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            <Zap size={15} style={{ color: 'var(--gold-metallic)', flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Cutoff</div>
              <div style={{ color: 'var(--text-ivory)', fontWeight: 600 }}>{category.cut}</div>
            </div>
          </div>
        </div>

        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.55, marginBottom: '1.25rem' }}>
          {category.description}
        </p>

        {/* Highlights */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {category.highlights.slice(0, 3).map((item, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.8125rem', color: 'var(--text-ivory-soft)' }}>
              <CheckCircle2 size={14} style={{ color: category.color, flexShrink: 0, marginTop: '2px' }} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Card Actions */}
      <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '1.25rem' }}>
        {category.qual && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.75rem',
              color: 'var(--accent-flame)',
              marginBottom: '0.75rem',
            }}
          >
            <ShieldCheck size={14} />
            <span>Prior timing certificate required</span>
          </div>
        )}

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {category.soon ? (
            <button
              disabled
              className="btn"
              style={{
                width: '100%',
                background: 'rgba(255, 255, 255, 0.05)',
                color: 'var(--text-dim)',
                cursor: 'not-allowed',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              Slots Opening Soon
            </button>
          ) : (
            <Link
              to={`/register?cat=${category.code}`}
              className="btn btn-gold"
              style={{
                flex: 1,
                fontSize: '0.8125rem',
                padding: '0.75rem 1rem',
              }}
            >
              Reserve Bib
              <ArrowRight size={16} />
            </Link>
          )}

          {onOpenRouteModal && (
            <button
              type="button"
              onClick={() => onOpenRouteModal(category)}
              className="btn btn-outline-gold"
              style={{
                padding: '0.75rem 0.85rem',
                fontSize: '0.8125rem',
              }}
              title="View Course Profile & Elevation"
            >
              <TrendingUp size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
