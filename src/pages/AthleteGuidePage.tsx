import React, { useState, useEffect } from 'react';
import { CheckSquare, Square, Download, Activity, Heart, ShieldAlert, Award, Clock } from 'lucide-react';

interface ChecklistItem {
  id: string;
  name: string;
  desc: string;
  mandatory: boolean;
}

export const AthleteGuidePage: React.FC = () => {
  const defaultChecklist: ChecklistItem[] = [
    { id: 'bib', name: 'Race bib (front-facing)', desc: 'Must be pinned securely and visible on chest at all timing mats.', mandatory: true },
    { id: 'chip', name: 'Timing chip (integrated on bib)', desc: 'Do not bend, fold, or puncture the RFID antenna on the bib.', mandatory: true },
    { id: 'flask', name: 'Reusable soft flask / handheld bladder', desc: 'Mandatory after 21K — zero single-use paper cups on the riverfront.', mandatory: true },
    { id: 'vest', name: 'High-visibility reflective running vest', desc: 'Mandatory for 50K Ultra runners flagged off at 1:30 AM.', mandatory: true },
    { id: 'phone', name: 'Fully charged mobile phone', desc: 'Keep your registered emergency contact active and reachable.', mandatory: false },
    { id: 'gps', name: 'GPS / Sports watch', desc: 'Recommended to track your split targets and cutoff pace checkpoints.', mandatory: false },
    { id: 'nutrition', name: 'Energy gels & electrolytes', desc: 'Your personal tested race morning fuel. Take with water at aid zones.', mandatory: false },
    { id: 'antichafe', name: 'Anti-chafing balm & blister plasters', desc: 'Apply beforehand to thighs, armpits, and heels to prevent discomfort.', mandatory: false },
  ];

  const [checkedIds, setCheckedIds] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('asm_athlete_checklist') || '["bib", "chip"]');
    } catch {
      return ['bib', 'chip'];
    }
  });

  const [selectedPlanTab, setSelectedPlanTab] = useState<'5k' | '10k' | '21k' | '42k'>('21k');

  useEffect(() => {
    try {
      localStorage.setItem('asm_athlete_checklist', JSON.stringify(checkedIds));
    } catch {
      // Local storage fallback
    }
  }, [checkedIds]);

  const toggleCheck = (id: string) => {
    setCheckedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const progressPercent = Math.round((checkedIds.length / defaultChecklist.length) * 100);

  const trainingPlans = {
    '5k': {
      title: '4-Week Fun Run Fitness',
      target: 'Beginners & First-Time Runners',
      weeks: [
        { week: 'Week 1', focus: 'Aerobic Base: 2K jog/walk intervals, 3 days/week + mobility' },
        { week: 'Week 2', focus: 'Rhythm Building: Continuous 3K run at conversational pace' },
        { week: 'Week 3', focus: 'Distance Peak: 4.5K simulation run along the riverfront' },
        { week: 'Week 4', focus: 'Race Week Taper: 2K light strides, hydration & sleep focus' },
      ],
    },
    '10k': {
      title: '8-Week Timed Challenge',
      target: 'Fitness Enthusiasts & 10K Aspirants',
      weeks: [
        { week: 'Weeks 1–2', focus: 'Building mileage: 4K easy runs + 30 min core strength' },
        { week: 'Weeks 3–4', focus: 'Interval Training: 6x400m track laps at 5K goal pace' },
        { week: 'Weeks 5–6', focus: 'Peak Long Run: 9K weekend endurance pacing' },
        { week: 'Weeks 7–8', focus: 'Taper & Sharpening: 4K race-pace rehearsal + carbo-load' },
      ],
    },
    '21k': {
      title: '12-Week Half-Marathon Mastery',
      target: 'Intermediate Runners (Sub-2:15 / Sub-2:00 Goals)',
      weeks: [
        { week: 'Weeks 1–4', focus: 'Aerobic Foundation: 25–35 km weekly volume with Sunday 10K long runs' },
        { week: 'Weeks 5–8', focus: 'Tempo & Threshold: 5K tempo runs at target race heart rate + 15K long runs' },
        { week: 'Weeks 9–10', focus: 'Peak Long Run: 18K simulation with hydration bladder gear test' },
        { week: 'Weeks 11–12', focus: 'Two-week strategic taper: 40% mileage reduction & electrolyte preload' },
      ],
    },
    '42k': {
      title: '16-Week Full Marathon Odyssey',
      target: 'Experienced Endurance Athletes (AFI / World Athletics Qualifying)',
      weeks: [
        { week: 'Weeks 1–4', focus: 'Base Volume: 45–55 km/week, slow conversational endurance base' },
        { week: 'Weeks 5–8', focus: 'Pacing & Hills: Progression long runs up to 26 km + weekly hill repeats' },
        { week: 'Weeks 9–13', focus: 'Peak Distance Block: Two 32 km long runs with gel nutrition pacing' },
        { week: 'Weeks 14–16', focus: '3-Week Classical Marathon Taper, carbohydrate loading & race kit freeze' },
      ],
    },
  };

  return (
    <div className="athlete-guide-page" style={{ position: 'relative' }}>
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
          src="/images/lace-up.jpg"
          alt="Athlete tying shoelaces"
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
          <div className="kicker">Race Preparation & Strategy</div>
          <h1 className="heading-hero" style={{ marginBottom: '1rem' }}>
            Athlete <span className="font-serif-italic">Guide</span>
          </h1>
          <p
            className="text-muted"
            style={{
              maxWidth: '680px',
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              lineHeight: 1.6,
            }}
          >
            Everything you need before toeing the line at Gandhi Maidan — your mandatory gear checklist and verified training plans.
          </p>
        </div>
      </section>

      {/* Main Checklist & Strategy */}
      <section className="section-spacing container">
        {/* Interactive Gear Checklist */}
        <div
          className="panel-charcoal"
          style={{
            padding: 'clamp(1.75rem, 4vw, 3rem)',
            border: '1px solid var(--gold-border)',
            marginBottom: '4.5rem',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.75rem' }}>
            <div>
              <div className="kicker">Interactive Preparation</div>
              <h2 className="heading-card" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}>
                Race Day Gear <span className="font-serif-italic">Checklist</span>
              </h2>
              <p className="text-muted" style={{ fontSize: '0.9375rem', marginTop: '0.25rem' }}>
                Tick off each item as you pack your race kit. Status is remembered automatically on your device.
              </p>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div className="font-editorial" style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--gold-metallic)', lineHeight: 1 }}>
                {progressPercent}%
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {checkedIds.length} of {defaultChecklist.length} Items Ready
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div
            style={{
              width: '100%',
              height: '8px',
              background: 'rgba(255, 255, 255, 0.08)',
              borderRadius: '4px',
              overflow: 'hidden',
              marginBottom: '2rem',
            }}
          >
            <div
              style={{
                width: `${progressPercent}%`,
                height: '100%',
                background: 'linear-gradient(90deg, var(--gold-metallic) 0%, var(--accent-mint) 100%)',
                transition: 'width 0.3s ease',
              }}
            />
          </div>

          {/* Checklist Items */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
            {defaultChecklist.map((item) => {
              const isChecked = checkedIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.85rem',
                    padding: '1.15rem',
                    borderRadius: 'var(--radius-md)',
                    background: isChecked ? 'rgba(221, 180, 107, 0.08)' : 'rgba(12, 13, 15, 0.65)',
                    border: isChecked ? '1px solid var(--gold-border)' : '1px solid rgba(255, 255, 255, 0.05)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ marginTop: '2px', color: isChecked ? 'var(--gold-metallic)' : 'var(--text-dim)' }}>
                    {isChecked ? <CheckSquare size={20} /> : <Square size={20} />}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.9375rem', color: isChecked ? 'var(--text-ivory)' : 'var(--text-ivory-soft)', textDecoration: isChecked ? 'line-through' : 'none' }}>
                        {item.name}
                      </span>
                      {item.mandatory && (
                        <span style={{ fontSize: '0.625rem', padding: '0.15rem 0.45rem', borderRadius: '4px', background: 'rgba(229,139,109,0.2)', color: 'var(--accent-flame)', fontWeight: 700 }}>
                          MANDATORY
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Training Schedules */}
        <div>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div className="kicker">Official Training Protocols</div>
            <h2 className="heading-section">
              Targeted <span className="font-serif-italic">Training Plans</span>
            </h2>
            <p className="text-muted" style={{ maxWidth: '620px', margin: '0 auto', fontSize: '0.9375rem' }}>
              Designed in partnership with Bihar Striders Running Club coaches to ensure safe, peak performance on race morning.
            </p>

            {/* Plan selector pills */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
              {(['5k', '10k', '21k', '42k'] as const).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedPlanTab(key)}
                  className="btn"
                  style={{
                    padding: '0.5rem 1.25rem',
                    fontSize: '0.8125rem',
                    background: selectedPlanTab === key ? 'var(--gold-metallic)' : 'var(--bg-charcoal)',
                    color: selectedPlanTab === key ? '#080A0B' : 'var(--text-ivory)',
                    borderColor: selectedPlanTab === key ? 'var(--gold-light)' : 'rgba(255, 255, 255, 0.08)',
                  }}
                >
                  {key.toUpperCase()} Schedule
                </button>
              ))}
            </div>
          </div>

          {/* Active Plan Detail Box */}
          <div className="panel-charcoal" style={{ padding: 'clamp(1.5rem, 3.5vw, 2.5rem)', border: '1px solid var(--gold-border-subtle)' }}>
            <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '1rem' }}>
              <h3 className="heading-card" style={{ fontSize: '1.5rem', color: 'var(--gold-light)' }}>
                {trainingPlans[selectedPlanTab].title}
              </h3>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                Ideal for: {trainingPlans[selectedPlanTab].target}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
              {trainingPlans[selectedPlanTab].weeks.map((w, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '1.25rem',
                    background: 'rgba(12, 13, 15, 0.65)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                  }}
                >
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--gold-metallic)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                    {w.week}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-ivory)', lineHeight: 1.5 }}>
                    {w.focus}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
