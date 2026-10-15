import React, { useState } from 'react';
import {
  Ban,
  Clock,
  ShieldAlert,
  ChevronDown,
  Search,
  FileText,
  AlertTriangle,
} from 'lucide-react';
import { FAQ_CATEGORIES } from '../data/eventData';

export const RulesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [openFaqs, setOpenFaqs] = useState<{ [key: string]: boolean }>({ '0-0': true });

  const toggleFaq = (id: string) => {
    setOpenFaqs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const keyRegulations = [
    {
      icon: Ban,
      title: 'Bib Transfers Strictly Prohibited',
      color: 'var(--accent-flame)',
      text: 'Running under another athlete’s bib constitutes an immediate disqualification and a lifetime ban from all ASM Ventures events. Timing chips and emergency medical information are strictly non-transferable under any circumstances.',
    },
    {
      icon: Clock,
      title: 'Official Cutoff & Sweep Vehicle Policy',
      color: 'var(--gold-metallic)',
      text: 'To reopen public traffic arteries, sweep vehicles begin operations progressively along the course according to published category cutoff times. Runners behind the minimum pace will be politely boarded to ensure road safety.',
    },
    {
      icon: ShieldAlert,
      title: 'Mandatory Medical Declaration',
      color: 'var(--accent-mint)',
      text: 'Every runner must disclose pre-existing cardiac, diabetic, or respiratory conditions during registration. Paramedical teams have complete authority to retire any athlete displaying symptoms of severe dehydration, heat injury, or distress.',
    },
    {
      icon: AlertTriangle,
      title: 'Course Route Integrity',
      color: 'var(--accent-cobalt)',
      text: 'Athletes must cross all designated RFID timing mats along the course. Missing any midpoint timing mat or stepping off the barricaded racecourse will result in automatic disqualification from official AFI results.',
    },
  ];

  const filteredCategories = FAQ_CATEGORIES.map((cat) => {
    const matchingItems = cat.items.filter((item) => {
      const matchesSearch =
        item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.a.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat = activeCategory === 'All' || activeCategory === cat.category;
      return matchesSearch && matchesCat;
    });
    return { ...cat, items: matchingItems };
  }).filter((cat) => cat.items.length > 0);

  return (
    <div className="rules-page" style={{ position: 'relative' }}>
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
          src="/images/start-blocks.jpg"
          alt="Starting blocks and timing track"
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
          <div className="kicker">Know Before You Toe the Line</div>
          <h1 className="heading-hero" style={{ marginBottom: '1rem' }}>
            Rules & <span className="font-serif-italic">FAQs</span>
          </h1>
          <p
            className="text-muted"
            style={{
              maxWidth: '680px',
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              lineHeight: 1.6,
            }}
          >
            Official competition regulations, safety policies, and answers to the most common questions from our running community.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-spacing container">
        {/* Core Regulations Grid */}
        <div style={{ marginBottom: '4.5rem' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <div className="kicker">Governing Policies</div>
            <h2 className="heading-section">
              Official Competition <span className="font-serif-italic">Rules</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {keyRegulations.map((reg, idx) => {
              const IconComp = reg.icon;
              return (
                <div
                  key={idx}
                  className="panel-charcoal"
                  style={{
                    padding: '1.75rem',
                    border: '1px solid var(--gold-border-subtle)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.85rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: reg.color }}>
                    <IconComp size={24} />
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-ivory)' }}>
                      {reg.title}
                    </h3>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>
                    {reg.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* FAQs with Search & Category Pills */}
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div className="kicker">Extended Knowledge Base</div>
            <h2 className="heading-section" style={{ marginBottom: '1rem' }}>
              Frequently Asked <span className="font-serif-italic">Questions</span>
            </h2>
          </div>

          {/* Search Box */}
          <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
            <Search
              size={18}
              style={{
                position: 'absolute',
                left: '1.25rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--gold-metallic)',
              }}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keyword (e.g. refund, parking, earphones, bib)..."
              style={{
                width: '100%',
                padding: '0.875rem 1rem 0.875rem 3rem',
                background: '#101114',
                border: '1px solid var(--gold-border-subtle)',
                borderRadius: 'var(--radius-full)',
                color: 'var(--text-ivory)',
                fontSize: '0.9375rem',
                outline: 'none',
              }}
            />
          </div>

          {/* Category Filter Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', marginBottom: '2.5rem' }}>
            {['All', 'Registration', 'Race Day & Logistics', 'Medical & Safety', 'Cancellations & Deferrals'].map((catName) => (
              <button
                key={catName}
                type="button"
                onClick={() => setActiveCategory(catName)}
                className="btn"
                style={{
                  fontSize: '0.75rem',
                  padding: '0.4rem 0.95rem',
                  minHeight: '34px',
                  background: activeCategory === catName ? 'var(--gold-metallic)' : 'var(--bg-charcoal)',
                  color: activeCategory === catName ? '#080A0B' : 'var(--text-ivory)',
                  borderColor: activeCategory === catName ? 'var(--gold-light)' : 'rgba(255, 255, 255, 0.08)',
                }}
              >
                {catName}
              </button>
            ))}
          </div>

          {/* Render Categories & FAQ Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {filteredCategories.map((cat, catIdx) => (
              <div key={cat.category}>
                <h3
                  className="font-editorial"
                  style={{
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: 'var(--gold-metallic)',
                    marginBottom: '1rem',
                  }}
                >
                  {cat.category}
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {cat.items.map((item, itemIdx) => {
                    const id = `${catIdx}-${itemIdx}`;
                    const isOpen = !!openFaqs[id];
                    return (
                      <div
                        key={itemIdx}
                        className="panel-charcoal"
                        style={{
                          border: isOpen ? '1px solid var(--gold-border)' : '1px solid rgba(255, 255, 255, 0.06)',
                          transition: 'border-color 0.2s ease',
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => toggleFaq(id)}
                          aria-expanded={isOpen}
                          style={{
                            width: '100%',
                            padding: '1.15rem 1.35rem',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            background: 'none',
                            border: 'none',
                            color: 'var(--text-ivory)',
                            textAlign: 'left',
                            fontFamily: 'var(--font-editorial)',
                            fontSize: '1rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                          }}
                        >
                          <span>{item.q}</span>
                          <ChevronDown
                            size={18}
                            style={{
                              color: 'var(--gold-metallic)',
                              transform: isOpen ? 'rotate(180deg)' : 'none',
                              transition: 'transform 0.2s ease',
                              flexShrink: 0,
                              marginLeft: '1rem',
                            }}
                          />
                        </button>

                        {isOpen && (
                          <div
                            style={{
                              padding: '0 1.35rem 1.15rem',
                              color: 'var(--text-muted)',
                              fontSize: '0.9375rem',
                              lineHeight: 1.6,
                              borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                              paddingTop: '0.75rem',
                            }}
                          >
                            {item.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
