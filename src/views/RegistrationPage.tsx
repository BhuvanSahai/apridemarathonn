import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  CreditCard,
  QrCode,
  Download,
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  ArrowLeft,
  User,
  Phone,
  Mail,
  Heart,
  FileCheck,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { RACE_CATEGORIES, TSHIRT_SIZES, BLOOD_GROUPS, EVENT_CONFIG, HOST_CITIES } from '../data/eventData';
import { RegistrationRecord } from '../types';

export const RegistrationPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const preselectedCat = searchParams.get('cat') || '10k';

  // Step wizard: 1 = Category, 2 = Runner Details, 3 = Safety & Kit, 4 = Review & Checkout, 5 = Confirmed
  const [step, setStep] = useState<number>(1);
  const [selectedCatCode, setSelectedCatCode] = useState<string>(preselectedCat);

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('Male');
  const [age, setAge] = useState<number>(25);
  const [city, setCity] = useState('Patna, Bihar');
  const [tshirtSize, setTshirtSize] = useState('M');
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [emergencyName, setEmergencyName] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');
  const [medicalConditions, setMedicalConditions] = useState('');
  const [qualifyingCertUrl, setQualifyingCertUrl] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'CARD' | 'NETBANKING'>('UPI');
  const [consentAccepted, setConsentAccepted] = useState(false);

  // Validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedRecord, setConfirmedRecord] = useState<RegistrationRecord | null>(null);

  useEffect(() => {
    if (searchParams.get('cat')) {
      const match = RACE_CATEGORIES.find((r) => r.code === searchParams.get('cat') && !r.soon);
      if (match) setSelectedCatCode(match.code);
    }
  }, [searchParams]);

  const selectedCategory = RACE_CATEGORIES.find((r) => r.code === selectedCatCode) || RACE_CATEGORIES[0];

  // Validation logic
  const validateStep2 = () => {
    const err: { [key: string]: string } = {};
    if (!fullName.trim() || fullName.trim().length < 2) {
      err.fullName = 'Please enter your full legal name.';
    }
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      err.email = 'Please provide a valid email address.';
    }
    if (!phone.trim() || !/^\d{10}$/.test(phone.replace(/\D/g, ''))) {
      err.phone = 'Please provide a 10-digit mobile number.';
    }
    if (!age || age < 10) {
      err.age = 'Minimum age for participation is 10 years.';
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const validateStep3 = () => {
    const err: { [key: string]: string } = {};
    if (!emergencyName.trim()) {
      err.emergencyName = 'Emergency contact name is required for runner safety.';
    }
    if (!emergencyPhone.trim() || !/^\d{10}$/.test(emergencyPhone.replace(/\D/g, ''))) {
      err.emergencyPhone = 'Please enter a valid 10-digit emergency contact phone.';
    }
    if (selectedCategory.qual && !qualifyingCertUrl.trim()) {
      err.qualifyingCertUrl = 'Full and Ultra marathons require a prior timing certificate link or reference.';
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      if (validateStep2()) setStep(3);
    } else if (step === 3) {
      if (validateStep3()) setStep(4);
    }
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentAccepted) {
      setErrors({ consent: 'You must accept the participant declaration and race waiver to proceed.' });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const bibSeq = Math.floor(1000 + Math.random() * 9000);
      const bibNumber = `ASM27-${selectedCategory.dist.replace('.', '')}-${bibSeq}`;

      const newRecord: RegistrationRecord = {
        id: 'reg_' + Date.now(),
        bibNumber,
        category: selectedCategory.label,
        fullName,
        email,
        phone,
        gender,
        age,
        tshirtSize,
        bloodGroup,
        city,
        emergencyName,
        emergencyPhone,
        medicalConditions,
        qualifyingCertUrl,
        paymentMethod,
        paymentStatus: 'PAID',
        amount: selectedCategory.fee,
        registeredAt: new Date().toISOString(),
      };

      // Save to localStorage for Admin and local persistence
      try {
        const existing = JSON.parse(localStorage.getItem('asm_registrations') || '[]');
        existing.unshift(newRecord);
        localStorage.setItem('asm_registrations', JSON.stringify(existing));
      } catch (err) {
        console.warn('LocalStorage error:', err);
      }

      setConfirmedRecord(newRecord);
      setIsSubmitting(false);
      setStep(5);

      // Trigger Confetti!
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#DDB46B', '#F0CF8E', '#7DC2A5', '#F5F0E7'],
        });
      } catch {
        // Confetti optional
      }
    }, 1200);
  };

  return (
    <div className="registration-page" style={{ position: 'relative', minHeight: 'calc(100vh - 76px)' }}>
      {/* Banner */}
      <section
        style={{
          padding: 'clamp(4rem, 7vw, 5.5rem) 0 clamp(2.5rem, 5vw, 3.5rem)',
          background: 'linear-gradient(180deg, rgba(8,10,11,0.85) 0%, rgba(8,10,11,0.98) 100%)',
          borderBottom: '1px solid rgba(221, 180, 107, 0.2)',
          textAlign: 'center',
        }}
      >
        <div className="container">
          <div className="kicker">Official Registration Portal</div>
          <h1 className="heading-hero" style={{ fontSize: 'clamp(2.25rem, 5vw, 4.25rem)', marginBottom: '0.75rem' }}>
            Reserve Your <span className="font-serif-italic">Bib</span>
          </h1>
          <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1rem' }}>
            {EVENT_CONFIG.edition} · Sunday, February 14, 2027 · Gandhi Maidan, Patna
          </p>

          {/* Step Progress Indicators */}
          {step < 5 && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'clamp(0.5rem, 2vw, 1.5rem)',
                marginTop: '2.5rem',
              }}
            >
              {[
                { s: 1, title: 'Category' },
                { s: 2, title: 'Athlete Details' },
                { s: 3, title: 'Safety & Kit' },
                { s: 4, title: 'Checkout' },
              ].map((item, idx) => {
                const isPassed = step > item.s;
                const isCurrent = step === item.s;
                return (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.8125rem',
                        fontWeight: 700,
                        background: isPassed ? 'var(--accent-mint)' : isCurrent ? 'var(--gold-metallic)' : 'var(--bg-charcoal)',
                        color: isPassed || isCurrent ? '#080A0B' : 'var(--text-muted)',
                        border: isCurrent ? '2px solid var(--gold-light)' : '1px solid rgba(255,255,255,0.1)',
                      }}
                    >
                      {isPassed ? <CheckCircle2 size={16} /> : item.s}
                    </div>
                    <span
                      style={{
                        fontSize: '0.8125rem',
                        fontWeight: isCurrent ? 700 : 500,
                        color: isCurrent ? 'var(--gold-light)' : 'var(--text-dim)',
                        display: 'none',
                      }}
                      className="step-title"
                    >
                      {item.title}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Main Registration Content */}
      <section className="section-spacing container" style={{ maxWidth: '880px', margin: '0 auto' }}>
        {/* STEP 1: CATEGORY SELECTION */}
        {step === 1 && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h2 className="heading-card" style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>
                Select Your Race Distance
              </h2>
              <p className="text-muted" style={{ fontSize: '0.9375rem' }}>
                All participants receive an official timing seed bib, finisher medal, and dry-fit performance tee.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
              {RACE_CATEGORIES.map((cat) => {
                const isSelected = selectedCatCode === cat.code;
                return (
                  <div
                    key={cat.code}
                    onClick={() => {
                      if (!cat.soon) setSelectedCatCode(cat.code);
                    }}
                    className="panel-charcoal"
                    style={{
                      padding: '1.25rem',
                      cursor: cat.soon ? 'not-allowed' : 'pointer',
                      border: isSelected ? '2px solid var(--gold-metallic)' : '1px solid rgba(255, 255, 255, 0.08)',
                      background: isSelected ? 'rgba(36, 35, 34, 0.9)' : 'var(--bg-charcoal)',
                      opacity: cat.soon ? 0.6 : 1,
                      position: 'relative',
                    }}
                  >
                    {isSelected && (
                      <span
                        style={{
                          position: 'absolute',
                          top: '1rem',
                          right: '1rem',
                          color: 'var(--gold-metallic)',
                        }}
                      >
                        <CheckCircle2 size={20} />
                      </span>
                    )}

                    <div style={{ fontSize: '0.75rem', color: cat.color, fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                      {cat.skill}
                    </div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-ivory)', marginBottom: '0.5rem' }}>
                      {cat.label}
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--gold-light)', marginBottom: '0.5rem' }}>
                      ₹{cat.fee}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Flag-off: {cat.flag} · Cutoff: {cat.cut}
                    </div>
                    {cat.soon && (
                      <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--accent-flame)', fontWeight: 600 }}>
                        Opening Soon
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={handleNextStep}
                className="btn btn-gold"
                style={{ minWidth: '180px' }}
              >
                Proceed to Details
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: ATHLETE PERSONAL DETAILS */}
        {step === 2 && (
          <div className="panel-charcoal" style={{ padding: 'clamp(1.5rem, 3.5vw, 2.5rem)', border: '1px solid var(--gold-border-subtle)' }}>
            <h2 className="heading-card" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>
              Step 2 — Athlete Information ({selectedCategory.label})
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  Full Legal Name *
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Aarav Sharma"
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: '#101114',
                    border: errors.fullName ? '1px solid var(--accent-flame)' : '1px solid rgba(255,255,255,0.12)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--text-ivory)',
                    fontSize: '0.9375rem',
                  }}
                />
                {errors.fullName && <p style={{ color: 'var(--accent-flame)', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.fullName}</p>}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  Email Address (for timing updates) *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: '#101114',
                    border: errors.email ? '1px solid var(--accent-flame)' : '1px solid rgba(255,255,255,0.12)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--text-ivory)',
                    fontSize: '0.9375rem',
                  }}
                />
                {errors.email && <p style={{ color: 'var(--accent-flame)', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.email}</p>}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  Mobile Number (10 digits) *
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="9876543210"
                  maxLength={10}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: '#101114',
                    border: errors.phone ? '1px solid var(--accent-flame)' : '1px solid rgba(255,255,255,0.12)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--text-ivory)',
                    fontSize: '0.9375rem',
                  }}
                />
                {errors.phone && <p style={{ color: 'var(--accent-flame)', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.phone}</p>}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  Age on Race Day *
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(parseInt(e.target.value) || 0)}
                  min={10}
                  max={90}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: '#101114',
                    border: errors.age ? '1px solid var(--accent-flame)' : '1px solid rgba(255,255,255,0.12)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--text-ivory)',
                    fontSize: '0.9375rem',
                  }}
                />
                {errors.age && <p style={{ color: 'var(--accent-flame)', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.age}</p>}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  Gender
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
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
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Non-Binary">Non-Binary</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  City / Location
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
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
                  {HOST_CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                  <option value="Other City (India)">Other City (India)</option>
                  <option value="International">International</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="btn btn-outline-gold"
              >
                <ArrowLeft size={16} />
                Back
              </button>
              <button
                type="button"
                onClick={handleNextStep}
                className="btn btn-gold"
              >
                Next: Safety & Kit
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: SAFETY, BLOOD GROUP & T-SHIRT */}
        {step === 3 && (
          <div className="panel-charcoal" style={{ padding: 'clamp(1.5rem, 3.5vw, 2.5rem)', border: '1px solid var(--gold-border-subtle)' }}>
            <h2 className="heading-card" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>
              Step 3 — Safety, Medical & Kit Size
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
              {/* T-Shirt Size */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  Finisher T-Shirt Size (Unisex, Recycled Poly)
                </label>
                <select
                  value={tshirtSize}
                  onChange={(e) => setTshirtSize(e.target.value)}
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
                  {TSHIRT_SIZES.map((t) => (
                    <option key={t.s} value={t.s}>
                      {t.s} (Chest {t.chest})
                    </option>
                  ))}
                </select>
              </div>

              {/* Blood Group */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  Blood Group (printed on back of timing bib)
                </label>
                <select
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
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
                  {BLOOD_GROUPS.map((bg) => (
                    <option key={bg} value={bg}>
                      {bg}
                    </option>
                  ))}
                </select>
              </div>

              {/* Emergency Contact Name */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  Emergency Contact Person Name *
                </label>
                <input
                  type="text"
                  value={emergencyName}
                  onChange={(e) => setEmergencyName(e.target.value)}
                  placeholder="e.g. Priya Sharma (Spouse / Parent)"
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: '#101114',
                    border: errors.emergencyName ? '1px solid var(--accent-flame)' : '1px solid rgba(255,255,255,0.12)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--text-ivory)',
                    fontSize: '0.9375rem',
                  }}
                />
                {errors.emergencyName && <p style={{ color: 'var(--accent-flame)', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.emergencyName}</p>}
              </div>

              {/* Emergency Contact Phone */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  Emergency Contact Phone Number *
                </label>
                <input
                  type="tel"
                  value={emergencyPhone}
                  onChange={(e) => setEmergencyPhone(e.target.value)}
                  placeholder="10-digit number"
                  maxLength={10}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: '#101114',
                    border: errors.emergencyPhone ? '1px solid var(--accent-flame)' : '1px solid rgba(255,255,255,0.12)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--text-ivory)',
                    fontSize: '0.9375rem',
                  }}
                />
                {errors.emergencyPhone && <p style={{ color: 'var(--accent-flame)', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.emergencyPhone}</p>}
              </div>
            </div>

            {/* Medical Conditions */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                Known Medical Conditions or Allergies (Optional, kept strictly confidential for medical responders)
              </label>
              <input
                type="text"
                value={medicalConditions}
                onChange={(e) => setMedicalConditions(e.target.value)}
                placeholder="e.g. Mild asthma, penicillin allergy, or None"
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

            {/* Prior Timing Certificate for 42K / 50K */}
            {selectedCategory.qual && (
              <div
                style={{
                  background: 'rgba(229, 139, 109, 0.12)',
                  border: '1px solid var(--accent-flame)',
                  padding: '1rem 1.25rem',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '1.5rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-flame)', fontWeight: 700, fontSize: '0.875rem', marginBottom: '0.35rem' }}>
                  <ShieldCheck size={18} />
                  Qualification Proof Mandatory for {selectedCategory.label}
                </div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-ivory)', marginBottom: '0.75rem' }}>
                  Please paste a link or timing certificate certificate reference (e.g. Strava link, Athlinks ID, or official certificate link) demonstrating sub-5 hour marathon completion.
                </p>
                <input
                  type="text"
                  value={qualifyingCertUrl}
                  onChange={(e) => setQualifyingCertUrl(e.target.value)}
                  placeholder="https://strava.app.link/... or Certificate Reference ID"
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    background: '#101114',
                    border: errors.qualifyingCertUrl ? '1px solid var(--accent-flame)' : '1px solid rgba(255,255,255,0.15)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--text-ivory)',
                    fontSize: '0.875rem',
                  }}
                />
                {errors.qualifyingCertUrl && <p style={{ color: 'var(--accent-flame)', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors.qualifyingCertUrl}</p>}
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="btn btn-outline-gold"
              >
                <ArrowLeft size={16} />
                Back
              </button>
              <button
                type="button"
                onClick={handleNextStep}
                className="btn btn-gold"
              >
                Review & Checkout
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: REVIEW & CHECKOUT */}
        {step === 4 && (
          <form onSubmit={handleFinalSubmit} className="panel-charcoal" style={{ padding: 'clamp(1.5rem, 3.5vw, 2.5rem)', border: '1px solid var(--gold-border-subtle)' }}>
            <h2 className="heading-card" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>
              Step 4 — Review & Complete Registration
            </h2>

            {/* Order Summary Box */}
            <div
              style={{
                background: 'rgba(12, 13, 15, 0.75)',
                padding: '1.5rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--gold-border-subtle)',
                marginBottom: '1.75rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.75rem' }}>
                <div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-ivory)' }}>
                    {selectedCategory.label}
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                    {fullName} · Age {age} · {city}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="font-editorial" style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--gold-light)' }}>
                    ₹{selectedCategory.fee}
                  </div>
                  <span style={{ fontSize: '0.6875rem', color: 'var(--accent-mint)' }}>All Inclusive</span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                <div>
                  <strong style={{ color: 'var(--text-ivory)' }}>T-Shirt Size:</strong> {tshirtSize}
                </div>
                <div>
                  <strong style={{ color: 'var(--text-ivory)' }}>Blood Group:</strong> {bloodGroup}
                </div>
                <div>
                  <strong style={{ color: 'var(--text-ivory)' }}>Emergency:</strong> {emergencyName} ({emergencyPhone})
                </div>
                <div>
                  <strong style={{ color: 'var(--text-ivory)' }}>Flag-Off:</strong> {selectedCategory.flag}
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div style={{ marginBottom: '1.75rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-ivory)', marginBottom: '0.75rem' }}>
                Select Payment Method
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.75rem' }}>
                {[
                  { id: 'UPI', label: 'UPI / QR Code', icon: QrCode, desc: 'GPay, PhonePe, Paytm' },
                  { id: 'CARD', label: 'Debit / Credit Card', icon: CreditCard, desc: 'Visa, Mastercard, RuPay' },
                  { id: 'NETBANKING', label: 'Net Banking', icon: ShieldCheck, desc: 'All Indian Banks' },
                ].map((pm) => {
                  const isSelected = paymentMethod === pm.id;
                  const IconComp = pm.icon;
                  return (
                    <div
                      key={pm.id}
                      onClick={() => setPaymentMethod(pm.id as any)}
                      style={{
                        padding: '1rem',
                        borderRadius: 'var(--radius-sm)',
                        background: isSelected ? 'rgba(221, 180, 107, 0.12)' : '#101114',
                        border: isSelected ? '1px solid var(--gold-metallic)' : '1px solid rgba(255,255,255,0.08)',
                        cursor: 'pointer',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: isSelected ? 'var(--gold-metallic)' : 'var(--text-ivory)', fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                        <IconComp size={16} />
                        <span>{pm.label}</span>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{pm.desc}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Waiver & Consent Declaration */}
            <div style={{ marginBottom: '2rem' }}>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                  cursor: 'pointer',
                  fontSize: '0.8125rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.5,
                }}
              >
                <input
                  type="checkbox"
                  checked={consentAccepted}
                  onChange={(e) => setConsentAccepted(e.target.checked)}
                  style={{
                    marginTop: '3px',
                    width: '18px',
                    height: '18px',
                    accentColor: 'var(--gold-metallic)',
                    cursor: 'pointer',
                  }}
                />
                <span>
                  I hereby declare that I am physically fit and adequately trained to participate in the {selectedCategory.label} of ASM Ventures Marathon 2027. I acknowledge the non-refundable cancellation schedule and understand that bib transfers are strictly prohibited under penalty of disqualification.
                </span>
              </label>
              {errors.consent && (
                <p style={{ color: 'var(--accent-flame)', fontSize: '0.75rem', marginTop: '0.5rem' }}>
                  {errors.consent}
                </p>
              )}
            </div>

            {/* Submit / Pay CTA */}
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="btn btn-outline-gold"
                disabled={isSubmitting}
              >
                <ArrowLeft size={16} />
                Back
              </button>

              <button
                type="submit"
                className="btn btn-gold"
                disabled={isSubmitting}
                style={{ minWidth: '220px' }}
              >
                {isSubmitting ? 'Securing Bib...' : `Confirm & Pay ₹${selectedCategory.fee}`}
                <ArrowRight size={18} />
              </button>
            </div>
          </form>
        )}

        {/* STEP 5: REGISTRATION CONFIRMED SUCCESS TICKET */}
        {step === 5 && confirmedRecord && (
          <div
            className="panel-charcoal"
            style={{
              padding: 'clamp(2rem, 4vw, 3rem)',
              border: '2px solid var(--gold-metallic)',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 35px rgba(221, 180, 107, 0.25)',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'var(--gold-soft)',
                border: '2px solid var(--gold-metallic)',
                color: 'var(--gold-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
              }}
            >
              <CheckCircle2 size={36} />
            </div>

            <div className="kicker">Bib Registration Confirmed</div>
            <h2 className="heading-section" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', marginBottom: '0.5rem' }}>
              See You at Gandhi <span className="font-serif-italic">Maidan!</span>
            </h2>
            <p className="text-muted" style={{ maxWidth: '540px', margin: '0 auto 2rem', fontSize: '0.9375rem' }}>
              Your race bib has been officially booked in the ASM Ventures Marathon 2027 technical roster. A confirmation slip has been logged.
            </p>

            {/* Digital Bib Card */}
            <div
              style={{
                maxWidth: '460px',
                margin: '0 auto 2.5rem',
                background: 'linear-gradient(135deg, #18191B 0%, #0D0E10 100%)',
                border: '2px dashed var(--gold-border)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.75rem',
                textAlign: 'left',
                position: 'relative',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <img src="/logo.svg" alt="ASM Emblem" style={{ width: '32px', height: '32px' }} />
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-ivory)' }}>
                      ASM Ventures Marathon
                    </div>
                    <div style={{ fontSize: '0.625rem', color: 'var(--gold-metallic)', fontWeight: 600 }}>
                      Edition 2027 · Official Bib Pass
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    padding: '0.25rem 0.65rem',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--gold-soft)',
                    border: '1px solid var(--gold-border)',
                    fontSize: '0.6875rem',
                    color: 'var(--gold-light)',
                    fontWeight: 700,
                  }}
                >
                  CONFIRMED
                </div>
              </div>

              {/* Big Bib Number */}
              <div
                className="font-editorial"
                style={{
                  fontSize: 'clamp(2.5rem, 6vw, 3.5rem)',
                  fontWeight: 900,
                  color: 'var(--gold-metallic)',
                  lineHeight: 1,
                  textAlign: 'center',
                  letterSpacing: '0.06em',
                  margin: '1.25rem 0',
                }}
              >
                {confirmedRecord.bibNumber}
              </div>

              {/* Runner Details */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', fontSize: '0.8125rem', color: 'var(--text-muted)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1rem' }}>
                <div>
                  <div style={{ color: 'var(--text-dim)', fontSize: '0.6875rem' }}>Runner Name</div>
                  <div style={{ color: 'var(--text-ivory)', fontWeight: 600 }}>{confirmedRecord.fullName}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-dim)', fontSize: '0.6875rem' }}>Category</div>
                  <div style={{ color: 'var(--text-ivory)', fontWeight: 600 }}>{confirmedRecord.category}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-dim)', fontSize: '0.6875rem' }}>Blood Group / Size</div>
                  <div style={{ color: 'var(--text-ivory)', fontWeight: 600 }}>{confirmedRecord.bloodGroup} · {confirmedRecord.tshirtSize}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-dim)', fontSize: '0.6875rem' }}>Flag-Off</div>
                  <div style={{ color: 'var(--text-ivory)', fontWeight: 600 }}>{selectedCategory.flag}</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
              <button
                type="button"
                onClick={() => window.print()}
                className="btn btn-gold"
              >
                <Download size={16} />
                Print / Save Bib Pass
              </button>
              <Link to="/athlete" className="btn btn-outline-gold">
                View Athlete Guide & Training
              </Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
