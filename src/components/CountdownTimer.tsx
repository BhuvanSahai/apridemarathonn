import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, CalendarPlus } from 'lucide-react';
import { EVENT_CONFIG } from '../data/eventData';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export const CountdownTimer: React.FC = () => {
  const calculateTimeLeft = (): TimeLeft => {
    const targetDate = new Date(EVENT_CONFIG.dateIso).getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isExpired: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const generateGoogleCalendarUrl = () => {
    const title = encodeURIComponent(EVENT_CONFIG.event + ' 2027');
    const details = encodeURIComponent(
      'ASM Ventures Marathon 2027 — Patna Community Running Festival. 5K, 10K, 21.1K, 42.2K, 50K Ultra. Every Mile Matters.'
    );
    const location = encodeURIComponent(EVENT_CONFIG.venue + ', ' + EVENT_CONFIG.city);
    // 2027-02-14 05:00 IST is 2027-02-13 23:30 UTC
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20270213T233000Z/20270214T073000Z&details=${details}&location=${location}`;
  };

  return (
    <div
      className="countdown-panel panel-glass"
      style={{
        padding: 'clamp(1.5rem, 3.5vw, 2.5rem)',
        border: '1px solid var(--gold-border)',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(221, 180, 107, 0.2)',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          alignItems: 'center',
        }}
      >
        {/* Left: Event Quick Details */}
        <div>
          <div className="kicker" style={{ marginBottom: '0.75rem' }}>
            <span>Verified Race Day</span>
          </div>
          <h3
            className="heading-card"
            style={{
              fontSize: 'clamp(1.5rem, 2.8vw, 2.25rem)',
              marginBottom: '1rem',
              color: 'var(--text-ivory)',
            }}
          >
            Countdown to <span className="font-serif-italic">Flag-Off</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-ivory)' }}>
              <Calendar size={18} style={{ color: 'var(--gold-metallic)', flexShrink: 0 }} />
              <span style={{ fontSize: '0.9375rem', fontWeight: 600 }}>
                {EVENT_CONFIG.dateFormatted}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)' }}>
              <Clock size={18} style={{ color: 'var(--gold-metallic)', flexShrink: 0 }} />
              <span style={{ fontSize: '0.9375rem' }}>
                Flag-off at {EVENT_CONFIG.timeFormatted} (Gates open 2:00 AM)
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)' }}>
              <MapPin size={18} style={{ color: 'var(--gold-metallic)', flexShrink: 0 }} />
              <span style={{ fontSize: '0.9375rem' }}>
                {EVENT_CONFIG.venue} · Gate 1 Start Line
              </span>
            </div>
          </div>

          <div style={{ marginTop: '1.25rem' }}>
            <a
              href={generateGoogleCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-gold"
              style={{
                fontSize: '0.8125rem',
                padding: '0.5rem 1rem',
                minHeight: '38px',
              }}
            >
              <CalendarPlus size={15} />
              Add to Calendar
            </a>
          </div>
        </div>

        {/* Right: Live Units */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 'clamp(0.5rem, 1.5vw, 1.25rem)',
          }}
          aria-live="polite"
        >
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Minutes', value: timeLeft.minutes },
            { label: 'Seconds', value: timeLeft.seconds },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                background: 'linear-gradient(180deg, #242322 0%, #151618 100%)',
                border: '1px solid var(--gold-border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: 'clamp(0.75rem, 2vw, 1.5rem) 0.5rem',
                textAlign: 'center',
                boxShadow: 'inset 0 1px 0 rgba(221, 180, 107, 0.15)',
              }}
            >
              <div
                className="font-editorial"
                style={{
                  fontSize: 'clamp(1.75rem, 4vw, 3.25rem)',
                  fontWeight: 800,
                  lineHeight: 1,
                  color: 'var(--gold-metallic)',
                  marginBottom: '0.35rem',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {String(item.value).padStart(2, '0')}
              </div>
              <div
                style={{
                  fontSize: '0.6875rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'var(--text-muted)',
                  fontWeight: 600,
                }}
              >
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
