import React, { useEffect } from 'react';
import { X, MapPin, Flag, Activity, CheckCircle, Droplets, HeartHandshake } from 'lucide-react';
import { RaceCategory } from '../types';

interface RouteMapModalProps {
  category: RaceCategory | null;
  onClose: () => void;
}

export const RouteMapModal: React.FC<RouteMapModalProps> = ({ category, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!category) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="route-modal-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'rgba(8, 10, 11, 0.85)',
        backdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
      onClick={onClose}
    >
      <div
        className="panel-charcoal"
        style={{
          width: '100%',
          maxWidth: '780px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: 'clamp(1.5rem, 3vw, 2.5rem)',
          border: '1px solid var(--gold-border)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.85)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
          <div>
            <div className="kicker" style={{ marginBottom: '0.5rem' }}>
              <span>AFI / AIMS Certified Course</span>
            </div>
            <h2 id="route-modal-title" className="heading-card" style={{ fontSize: '1.75rem', color: 'var(--text-ivory)' }}>
              {category.label} — Course Profile & Elevation
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid var(--gold-border-subtle)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '0.4rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '40px',
              minHeight: '40px',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Dynamic Elevation Chart Simulation SVG */}
        <div
          style={{
            background: 'linear-gradient(180deg, #18191B 0%, #0D0E10 100%)',
            border: '1px solid var(--gold-border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '1.5rem',
            marginBottom: '1.75rem',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.8125rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Elevation Profile (Meters above sea level)</span>
            <span style={{ color: 'var(--gold-metallic)', fontWeight: 600 }}>Total Gain: {category.elevationGain || 'Flat'}</span>
          </div>

          <svg
            viewBox="0 0 600 160"
            style={{ width: '100%', height: 'auto', overflow: 'visible' }}
            aria-label="Elevation graph"
          >
            <defs>
              <linearGradient id="elevationGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#DDB46B" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#DDB46B" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid lines */}
            <line x1="0" y1="30" x2="600" y2="30" stroke="rgba(255,255,255,0.06)" strokeDasharray="4" />
            <line x1="0" y1="75" x2="600" y2="75" stroke="rgba(255,255,255,0.06)" strokeDasharray="4" />
            <line x1="0" y1="120" x2="600" y2="120" stroke="rgba(255,255,255,0.06)" strokeDasharray="4" />

            {/* Elevation Curve based on distance */}
            {category.code === '5k' && (
              <>
                <path d="M 0,130 Q 150,115 300,120 T 600,125 L 600,150 L 0,150 Z" fill="url(#elevationGrad)" />
                <path d="M 0,130 Q 150,115 300,120 T 600,125" fill="none" stroke="#DDB46B" strokeWidth="3" />
              </>
            )}
            {category.code === '10k' && (
              <>
                <path d="M 0,130 Q 120,95 240,110 T 420,85 T 600,125 L 600,150 L 0,150 Z" fill="url(#elevationGrad)" />
                <path d="M 0,130 Q 120,95 240,110 T 420,85 T 600,125" fill="none" stroke="#E5A46D" strokeWidth="3" />
              </>
            )}
            {category.code === '21k' && (
              <>
                <path d="M 0,130 Q 100,75 200,90 T 360,65 T 500,80 T 600,125 L 600,150 L 0,150 Z" fill="url(#elevationGrad)" />
                <path d="M 0,130 Q 100,75 200,90 T 360,65 T 500,80 T 600,125" fill="none" stroke="#7DC2A5" strokeWidth="3" />
              </>
            )}
            {(category.code === '42k' || category.code === '50k' || category.code === 'virtual') && (
              <>
                <path d="M 0,130 Q 80,60 160,85 T 300,50 T 440,70 T 540,55 T 600,125 L 600,150 L 0,150 Z" fill="url(#elevationGrad)" />
                <path d="M 0,130 Q 80,60 160,85 T 300,50 T 440,70 T 540,55 T 600,125" fill="none" stroke="#B39DEB" strokeWidth="3" />
              </>
            )}

            {/* Checkpoints */}
            <circle cx="20" cy="130" r="5" fill="#DDB46B" />
            <text x="20" y="152" fill="#F5F0E7" fontSize="10" textAnchor="middle">Start</text>

            <circle cx="300" cy="85" r="4" fill="#7DC2A5" />
            <text x="300" y="152" fill="#B7B2A8" fontSize="10" textAnchor="middle">Midpoint Mat</text>

            <circle cx="580" cy="125" r="5" fill="#E58B6D" />
            <text x="580" y="152" fill="#F5F0E7" fontSize="10" textAnchor="middle">Finish Arch</text>
          </svg>
        </div>

        {/* Route Details Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.75rem' }}>
          <div style={{ padding: '1rem', background: '#18191B', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gold-metallic)', fontSize: '0.8125rem', marginBottom: '0.35rem' }}>
              <Flag size={16} />
              <span>Start & Finish</span>
            </div>
            <div style={{ color: 'var(--text-ivory)', fontWeight: 600, fontSize: '0.9375rem' }}>
              Gandhi Maidan Gate 1
            </div>
          </div>

          <div style={{ padding: '1rem', background: '#18191B', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-mint)', fontSize: '0.8125rem', marginBottom: '0.35rem' }}>
              <Droplets size={16} />
              <span>Hydration Stations</span>
            </div>
            <div style={{ color: 'var(--text-ivory)', fontWeight: 600, fontSize: '0.9375rem' }}>
              Every 2.5 KM (Electrolytes & Oranges)
            </div>
          </div>

          <div style={{ padding: '1rem', background: '#18191B', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cobalt)', fontSize: '0.8125rem', marginBottom: '0.35rem' }}>
              <HeartHandshake size={16} />
              <span>Medical Escorts</span>
            </div>
            <div style={{ color: 'var(--text-ivory)', fontWeight: 600, fontSize: '0.9375rem' }}>
              Apollo Health Ambulances on Standby
            </div>
          </div>
        </div>

        {/* Key Course Milestones */}
        <div>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-ivory)', marginBottom: '0.85rem' }}>
            Verified Course Highlights
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {category.highlights.map((h, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                <CheckCircle size={16} style={{ color: 'var(--gold-metallic)', flexShrink: 0, marginTop: '2px' }} />
                <span>{h}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
