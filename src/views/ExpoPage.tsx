import React, { useState } from 'react';
import {
  MapPin,
  Calendar,
  Clock,
  TrainFront,
  Bus,
  SquareParking,
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  UserPlus,
} from 'lucide-react';
import { EVENT_CONFIG, TRANSIT_OPTIONS } from '../data/eventData';

export const ExpoPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [volunteerSubmitted, setVolunteerSubmitted] = useState(false);
  const [volunteerRole, setVolunteerRole] = useState('Aid Station Volunteer');

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormSubmitted(true);
  };

  const handleSubmitVolunteer = (e: React.FormEvent) => {
    e.preventDefault();
    setVolunteerSubmitted(true);
  };

  return (
    <div className="expo-page" style={{ position: 'relative' }}>
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
          src="/images/stadium-sprint.jpg"
          alt="Athletes at the finish arena"
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
          <div className="kicker">Race Week Operations</div>
          <h1 className="heading-hero" style={{ marginBottom: '1rem' }}>
            Expo & <span className="font-serif-italic">Contact</span>
          </h1>
          <p
            className="text-muted"
            style={{
              maxWidth: '680px',
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              lineHeight: 1.6,
            }}
          >
            Collect your official race kit, discover transit solutions to Gandhi Maidan, and connect directly with the ASM Ventures race secretariat.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="section-spacing container">
        {/* Expo Kit Collection Showcase */}
        <div
          className="panel-charcoal"
          style={{
            padding: 'clamp(2rem, 4vw, 3rem)',
            border: '1px solid var(--gold-border)',
            marginBottom: '4.5rem',
          }}
        >
          <div className="kicker">Official Bib Pick-up</div>
          <h2 className="heading-card" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', marginBottom: '1.25rem' }}>
            Marathon Expo & Bib <span className="font-serif-italic">Distribution</span>
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem',
            }}
          >
            <div style={{ padding: '1.25rem', background: '#101114', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gold-metallic)', marginBottom: '0.4rem' }}>
                <Calendar size={18} />
                <span style={{ fontWeight: 700, fontSize: '0.875rem', textTransform: 'uppercase' }}>Expo Dates</span>
              </div>
              <div style={{ color: 'var(--text-ivory)', fontWeight: 600, fontSize: '1rem' }}>
                Friday & Saturday
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                February 12 & 13, 2027
              </div>
            </div>

            <div style={{ padding: '1.25rem', background: '#101114', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-mint)', marginBottom: '0.4rem' }}>
                <Clock size={18} />
                <span style={{ fontWeight: 700, fontSize: '0.875rem', textTransform: 'uppercase' }}>Timings</span>
              </div>
              <div style={{ color: 'var(--text-ivory)', fontWeight: 600, fontSize: '1rem' }}>
                10:00 AM – 07:00 PM IST
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                Strict closure at 7 PM sharp on Feb 13
              </div>
            </div>

            <div style={{ padding: '1.25rem', background: '#101114', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-flame)', marginBottom: '0.4rem' }}>
                <MapPin size={18} />
                <span style={{ fontWeight: 700, fontSize: '0.875rem', textTransform: 'uppercase' }}>Expo Location</span>
              </div>
              <div style={{ color: 'var(--text-ivory)', fontWeight: 600, fontSize: '1rem' }}>
                Gandhi Maidan Main Pavilion
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                Near Gate 1, Fraser Road Side, Patna
              </div>
            </div>
          </div>

          <div style={{ color: 'var(--text-muted)', fontSize: '0.9375rem', lineHeight: 1.6 }}>
            <strong style={{ color: 'var(--text-ivory)' }}>Mandatory Documents to Collect Race Kit:</strong>
            <ul style={{ paddingLeft: '1.25rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <li>Original Government Photo ID (Aadhaar, Driving License, Passport, or Voter ID).</li>
              <li>Official Registration Confirmation Email / SMS with unique bib allocation ID.</li>
              <li>If collecting on behalf of another runner: Signed authorization letter with a photocopy of the runner’s ID card.</li>
              <li><strong style={{ color: 'var(--accent-flame)' }}>Important:</strong> No bibs are distributed on race morning under any circumstances.</li>
            </ul>
          </div>
        </div>

        {/* Getting to the Venue */}
        <div style={{ marginBottom: '4.5rem' }}>
          <div style={{ marginBottom: '2rem' }}>
            <div className="kicker">Transit & Arrival</div>
            <h2 className="heading-section">
              Reaching <span className="font-serif-italic">Gandhi Maidan</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {TRANSIT_OPTIONS.map((tr, idx) => {
              const IconComp = tr.icon === 'TrainFront' ? TrainFront : tr.icon === 'Bus' ? Bus : SquareParking;
              return (
                <div
                  key={idx}
                  className="panel-charcoal"
                  style={{
                    padding: '1.75rem',
                    border: '1px solid var(--gold-border-subtle)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--gold-metallic)', marginBottom: '0.75rem' }}>
                    <IconComp size={22} />
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-ivory)' }}>
                      {tr.title}
                    </h3>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>
                    {tr.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2-Column: Contact Form & Volunteer Registration */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(2rem, 5vw, 3.5rem)',
          }}
        >
          {/* Organizer Contact Form */}
          <div className="panel-charcoal" style={{ padding: 'clamp(1.5rem, 3.5vw, 2.5rem)', border: '1px solid var(--gold-border-subtle)' }}>
            <div className="kicker">Direct Contact</div>
            <h2 className="heading-card" style={{ fontSize: '1.5rem', marginBottom: '1.25rem' }}>
              Send an <span className="font-serif-italic">Inquiry</span>
            </h2>

            {formSubmitted ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <CheckCircle2 size={44} style={{ color: 'var(--accent-mint)', margin: '0 auto 1rem' }} />
                <h3 style={{ color: 'var(--text-ivory)', marginBottom: '0.5rem' }}>Message Received</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                  The ASM Ventures marathon secretariat will respond to your inquiry within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitContact} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Full name"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: '#101114',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--text-ivory)',
                      fontSize: '0.9375rem',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@domain.com"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: '#101114',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--text-ivory)',
                      fontSize: '0.9375rem',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                    Topic
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: '#101114',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--text-ivory)',
                      fontSize: '0.9375rem',
                    }}
                  >
                    <option value="Registration & Bibs">Registration & Bibs</option>
                    <option value="Corporate / Group Entries">Corporate / Group Entries</option>
                    <option value="Sponsorship & Brand Expo">Sponsorship & Brand Expo</option>
                    <option value="Media & Press">Media & Press</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                    Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can our race committee assist you?"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: '#101114',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--text-ivory)',
                      fontSize: '0.9375rem',
                      resize: 'vertical',
                    }}
                  />
                </div>

                <button type="submit" className="btn btn-gold" style={{ marginTop: '0.5rem' }}>
                  <Send size={16} />
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>

          {/* Volunteer Sign-Up */}
          <div className="panel-charcoal" style={{ padding: 'clamp(1.5rem, 3.5vw, 2.5rem)', border: '1px solid var(--gold-border-subtle)' }}>
            <div className="kicker" style={{ color: 'var(--accent-mint)', borderColor: 'var(--accent-mint)' }}>
              Community Spirit
            </div>
            <h2 className="heading-card" style={{ fontSize: '1.5rem', marginBottom: '1.25rem' }}>
              Volunteer for <span className="font-serif-italic">Race Day</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Become the heartbeat of Patna’s biggest morning! We are recruiting 800+ passionate volunteers for route marshaling, hydration support, and finish-line medal presentation.
            </p>

            {volunteerSubmitted ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <CheckCircle2 size={44} style={{ color: 'var(--accent-mint)', margin: '0 auto 1rem' }} />
                <h3 style={{ color: 'var(--text-ivory)', marginBottom: '0.5rem' }}>Interest Registered</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                  Thank you! Our volunteer coordinator will reach out with the training schedule and briefing dates.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitVolunteer} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                    Preferred Volunteer Role
                  </label>
                  <select
                    value={volunteerRole}
                    onChange={(e) => setVolunteerRole(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: '#101114',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--text-ivory)',
                      fontSize: '0.9375rem',
                    }}
                  >
                    <option value="Aid Station Volunteer">Aid Station & Electrolyte Crew</option>
                    <option value="Route Marshal">Route Marshal & Traffic Safety</option>
                    <option value="Finish Line Crew">Finish Line Medal & Water Presentation</option>
                    <option value="Medical Support">Medical Tent & Physio Escort</option>
                    <option value="Baggage Counter">Secure Baggage Counter Crew</option>
                  </select>
                </div>

                <div style={{ padding: '1rem', background: '#101114', borderRadius: 'var(--radius-sm)', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                  <strong style={{ color: 'var(--gold-light)' }}>Volunteer Entitlements:</strong> Official ASM crew jacket, breakfast & refreshments on race morning, community certificate, and guaranteed volunteer bib access for future editions.
                </div>

                <button type="submit" className="btn btn-outline-gold" style={{ marginTop: '0.5rem' }}>
                  <UserPlus size={16} />
                  Express Interest as Volunteer
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
