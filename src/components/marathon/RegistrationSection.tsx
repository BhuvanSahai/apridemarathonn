'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  User,
  ShieldCheck,
  Check,
  Loader2,
  Calendar,
  MapPin,
  Clock,
  Printer,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { EVENT_CONFIG, RaceCategoryConfig } from '@/lib/event-config';
import {
  RegistrationStep1Schema,
  RegistrationStep2Schema,
  RegistrationStep3Schema,
  FullRegistrationSchema,
} from '@/lib/registration-schema';

interface RegistrationSectionProps {
  selectedCategoryCode?: string;
}

export const RegistrationSection: React.FC<RegistrationSectionProps> = ({
  selectedCategoryCode = '21k',
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    gender: 'male' as 'male' | 'female' | 'other',
    dob: '',
    city: 'Patna',
    emergencyContactName: '',
    emergencyContactPhone: '',
    category: selectedCategoryCode as '5k' | '10k' | '21k' | '42k',
    tShirtSize: 'M' as 'XS' | 'S' | 'M' | 'L' | 'XL' | '2XL',
    bibName: '',
    medicalNotes: '',
    acceptTerms: false as true | false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successReceipt, setSuccessReceipt] = useState<{
    bookingId: string;
    athlete: string;
    categoryName: string;
    bibName: string;
    tShirtSize: string;
    reportingTime: string;
    venue: string;
    date: string;
  } | null>(null);

  // Update selected category when prop changes
  useEffect(() => {
    if (selectedCategoryCode) {
      setFormData((prev) => ({
        ...prev,
        category: selectedCategoryCode as '5k' | '10k' | '21k' | '42k',
      }));
    }
  }, [selectedCategoryCode]);

  const activeCategoryConfig =
    EVENT_CONFIG.categories.find((c) => c.code === formData.category) ||
    EVENT_CONFIG.categories[2];

  const handleInputChange = (
    field: string,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateStep1 = () => {
    const res = RegistrationStep1Schema.safeParse(formData);
    if (!res.success) {
      const fieldErrors: Record<string, string> = {};
      res.error.issues.forEach((issue) => {
        const path = issue.path[0] as string;
        if (!fieldErrors[path]) {
          fieldErrors[path] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const validateStep2 = () => {
    const res = RegistrationStep2Schema.safeParse(formData);
    if (!res.success) {
      const fieldErrors: Record<string, string> = {};
      res.error.issues.forEach((issue) => {
        const path = issue.path[0] as string;
        if (!fieldErrors[path]) {
          fieldErrors[path] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (validateStep1()) setCurrentStep(2);
    } else if (currentStep === 2) {
      if (validateStep2()) setCurrentStep(3);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as 1 | 2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.acceptTerms) {
      setErrors({ acceptTerms: 'You must accept the race rules and indemnity waiver' });
      return;
    }

    const fullValidation = FullRegistrationSchema.safeParse(formData);
    if (!fullValidation.success) {
      const fieldErrors: Record<string, string> = {};
      fullValidation.error.issues.forEach((issue) => {
        const path = issue.path[0] as string;
        if (!fieldErrors[path]) {
          fieldErrors[path] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setErrors({
          form: data.message || 'Registration failed. Please check your inputs.',
        });
        setIsSubmitting(false);
        return;
      }

      setSuccessReceipt(data.details);
      setIsSubmitting(false);

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#C8A86B', '#D9BC83', '#F4EFE6', '#D9532B'],
        });
      } catch (err) {
        // Confetti fallback
      }
    } catch (err) {
      console.error(err);
      setErrors({
        form: 'Network error communicating with the registration server.',
      });
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="register"
      className="relative w-full py-28 md:py-36 bg-ink text-ivory overflow-hidden border-t border-line/40"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <ShieldCheck className="w-4 h-4 text-champagne" />
            <span className="label-subtle !text-champagne">OFFICIAL ATHLETE PORTAL</span>
          </div>
          <h2 className="font-heading text-5xl sm:text-6xl md:text-7xl uppercase tracking-tight text-ivory leading-none">
            RESERVE YOUR <span className="font-accent lowercase text-champagne">bib.</span>
          </h2>
          <p className="font-body text-base text-stone mt-4 leading-relaxed max-w-lg mx-auto">
            Secure your chip-timed entry for the {EVENT_CONFIG.shortTitle}. Instant confirmation and digital race kit issuance.
          </p>
        </div>

        {/* Multi-step Container */}
        <div className="luxury-card p-6 sm:p-10 lg:p-12 relative overflow-hidden bg-graphite/90 backdrop-blur-xl">
          
          {/* Success Screen View */}
          {successReceipt ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center py-6 sm:py-8"
            >
              <div className="w-16 h-16 rounded-full bg-champagne/15 border border-champagne text-champagne flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8" />
              </div>

              <span className="label-subtle !text-champagne text-[11px] tracking-[0.28em]">
                REGISTRATION CONFIRMED
              </span>

              <h3 className="font-heading text-4xl sm:text-5xl uppercase tracking-wide text-ivory mt-2 mb-4">
                YOU ARE READY TO RUN!
              </h3>

              <p className="font-body text-sm sm:text-base text-stone max-w-md mx-auto mb-8">
                Welcome to the starting line, <strong className="text-ivory">{successReceipt.athlete}</strong>. 
                Your entry has been recorded in the {EVENT_CONFIG.organizer} system.
              </p>

              {/* Digital Bib Card Display */}
              <div className="max-w-md mx-auto p-6 rounded-2xl bg-ink border border-champagne/30 text-left relative overflow-hidden shadow-2xl mb-8">
                <div className="flex items-center justify-between pb-4 border-b border-line">
                  <div className="flex items-center gap-2">
                    <div className="w-auto px-2 h-7 rounded-full border border-champagne flex items-center justify-center text-champagne font-bold text-[10px]">
                      PRIDE
                    </div>
                    <span className="font-heading text-sm text-ivory tracking-wider uppercase">
                      {EVENT_CONFIG.shortTitle}
                    </span>
                  </div>
                  <span className="label-subtle text-[9px] text-champagne font-bold">
                    OFFICIAL ENTRY
                  </span>
                </div>

                <div className="py-6 text-center border-b border-line/60">
                  <span className="label-subtle text-[9px] text-stone">BOOKING REFERENCE</span>
                  <p className="font-numbers text-2xl sm:text-3xl font-bold text-champagne tracking-wider mt-1">
                    {successReceipt.bookingId}
                  </p>
                  <p className="font-heading text-xl text-ivory uppercase tracking-widest mt-2">
                    &ldquo;{successReceipt.bibName}&rdquo;
                  </p>
                </div>

                <div className="pt-4 grid grid-cols-2 gap-4 text-xs text-stone">
                  <div>
                    <span className="label-subtle text-[8px]">CATEGORY</span>
                    <p className="font-heading text-sm text-ivory uppercase mt-0.5">
                      {successReceipt.categoryName}
                    </p>
                  </div>
                  <div>
                    <span className="label-subtle text-[8px]">T-SHIRT SIZE</span>
                    <p className="font-heading text-sm text-ivory uppercase mt-0.5">
                      {successReceipt.tShirtSize}
                    </p>
                  </div>
                  <div>
                    <span className="label-subtle text-[8px]">DATE & REPORTING</span>
                    <p className="text-ivory mt-0.5">
                      {successReceipt.date} • {successReceipt.reportingTime}
                    </p>
                  </div>
                  <div>
                    <span className="label-subtle text-[8px]">VENUE</span>
                    <p className="text-ivory mt-0.5">{successReceipt.venue}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="btn-ghost-luxury text-xs !py-3 !px-6"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Receipt</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSuccessReceipt(null);
                    setCurrentStep(1);
                  }}
                  className="btn-champagne text-xs !py-3 !px-6 uppercase tracking-wider"
                >
                  Register Another Runner
                </button>
              </div>
            </motion.div>
          ) : (
            /* Multi-step Form */
            <form onSubmit={handleSubmit} noValidate>
              
              {/* Step Progress Indicators */}
              <div className="flex items-center justify-between pb-8 mb-8 border-b border-line">
                {[
                  { step: 1, title: 'Runner Details' },
                  { step: 2, title: 'Category & Apparel' },
                  { step: 3, title: 'Review & Terms' },
                ].map((s) => (
                  <div key={s.step} className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-numbers font-bold transition-all ${
                        currentStep === s.step
                          ? 'bg-champagne text-ink shadow-[0_0_12px_rgba(200,168,107,0.4)]'
                          : currentStep > s.step
                          ? 'bg-champagne/20 text-champagne border border-champagne/40'
                          : 'bg-ink text-stone border border-line'
                      }`}
                    >
                      {currentStep > s.step ? <Check className="w-4 h-4" /> : s.step}
                    </div>
                    <span
                      className={`hidden sm:inline-block text-xs font-semibold uppercase tracking-wider ${
                        currentStep === s.step ? 'text-ivory' : 'text-stone'
                      }`}
                    >
                      {s.title}
                    </span>
                  </div>
                ))}
              </div>

              {/* General Form Error Alert */}
              {errors.form && (
                <div className="mb-6 p-4 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-200 text-sm flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  <span>{errors.form}</span>
                </div>
              )}

              {/* STEP 1: RUNNER DETAILS */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div>
                      <label className="label-subtle block mb-2">FULL ATHLETE NAME *</label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        placeholder="e.g. Vikram Singh"
                        className={`w-full px-4 py-3 rounded-xl bg-ink border text-ivory placeholder-stone/40 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-champagne transition-colors ${
                          errors.fullName ? 'border-rose-500' : 'border-line'
                        }`}
                      />
                      {errors.fullName && (
                        <p className="text-xs text-rose-400 mt-1">{errors.fullName}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="label-subtle block mb-2">EMAIL ADDRESS *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="vikram@example.com"
                        className={`w-full px-4 py-3 rounded-xl bg-ink border text-ivory placeholder-stone/40 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-champagne transition-colors ${
                          errors.email ? 'border-rose-500' : 'border-line'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-xs text-rose-400 mt-1">{errors.email}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="label-subtle block mb-2">WHATSAPP / MOBILE NUMBER *</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="10-digit mobile number"
                        className={`w-full px-4 py-3 rounded-xl bg-ink border text-ivory placeholder-stone/40 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-champagne transition-colors ${
                          errors.phone ? 'border-rose-500' : 'border-line'
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-xs text-rose-400 mt-1">{errors.phone}</p>
                      )}
                    </div>

                    {/* Gender */}
                    <div>
                      <label className="label-subtle block mb-2">GENDER *</label>
                      <div className="grid grid-cols-3 gap-2">
                        {['male', 'female', 'other'].map((g) => (
                          <button
                            key={g}
                            type="button"
                            onClick={() => handleInputChange('gender', g)}
                            className={`py-3 px-2 rounded-xl text-xs font-semibold capitalize border transition-all ${
                              formData.gender === g
                                ? 'bg-champagne text-ink border-champagne font-bold'
                                : 'bg-ink border-line text-stone hover:text-ivory'
                            }`}
                          >
                            {g}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Date of Birth */}
                    <div>
                      <label className="label-subtle block mb-2">DATE OF BIRTH *</label>
                      <input
                        type="date"
                        value={formData.dob}
                        onChange={(e) => handleInputChange('dob', e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl bg-ink border text-ivory placeholder-stone/40 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-champagne transition-colors ${
                          errors.dob ? 'border-rose-500' : 'border-line'
                        }`}
                      />
                      {errors.dob && (
                        <p className="text-xs text-rose-400 mt-1">{errors.dob}</p>
                      )}
                    </div>

                    {/* City */}
                    <div>
                      <label className="label-subtle block mb-2">CITY OF RESIDENCE *</label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        placeholder="e.g. Patna"
                        className={`w-full px-4 py-3 rounded-xl bg-ink border text-ivory placeholder-stone/40 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-champagne transition-colors ${
                          errors.city ? 'border-rose-500' : 'border-line'
                        }`}
                      />
                      {errors.city && (
                        <p className="text-xs text-rose-400 mt-1">{errors.city}</p>
                      )}
                    </div>

                    {/* Emergency Contact Name */}
                    <div>
                      <label className="label-subtle block mb-2">EMERGENCY CONTACT PERSON *</label>
                      <input
                        type="text"
                        value={formData.emergencyContactName}
                        onChange={(e) =>
                          handleInputChange('emergencyContactName', e.target.value)
                        }
                        placeholder="Primary guardian or kin"
                        className={`w-full px-4 py-3 rounded-xl bg-ink border text-ivory placeholder-stone/40 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-champagne transition-colors ${
                          errors.emergencyContactName ? 'border-rose-500' : 'border-line'
                        }`}
                      />
                      {errors.emergencyContactName && (
                        <p className="text-xs text-rose-400 mt-1">
                          {errors.emergencyContactName}
                        </p>
                      )}
                    </div>

                    {/* Emergency Contact Phone */}
                    <div>
                      <label className="label-subtle block mb-2">EMERGENCY PHONE *</label>
                      <input
                        type="tel"
                        value={formData.emergencyContactPhone}
                        onChange={(e) =>
                          handleInputChange('emergencyContactPhone', e.target.value)
                        }
                        placeholder="10-digit emergency number"
                        className={`w-full px-4 py-3 rounded-xl bg-ink border text-ivory placeholder-stone/40 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-champagne transition-colors ${
                          errors.emergencyContactPhone ? 'border-rose-500' : 'border-line'
                        }`}
                      />
                      {errors.emergencyContactPhone && (
                        <p className="text-xs text-rose-400 mt-1">
                          {errors.emergencyContactPhone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="pt-6 flex justify-end">
                    <button
                      type="button"
                      onClick={handleNext}
                      className="btn-champagne text-xs uppercase tracking-wider py-3.5 px-8"
                    >
                      <span>Proceed to Category & Apparel</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: CATEGORY & APPAREL */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  {/* Category Selection Cards */}
                  <div>
                    <label className="label-subtle block mb-3">SELECT RACE DISTANCE *</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {EVENT_CONFIG.categories.map((cat: RaceCategoryConfig) => (
                        <button
                          key={cat.code}
                          type="button"
                          onClick={() => handleInputChange('category', cat.code)}
                          className={`p-4 rounded-xl border text-left transition-all ${
                            formData.category === cat.code
                              ? 'border-champagne bg-champagne/10 shadow-[0_0_15px_rgba(200,168,107,0.15)]'
                              : 'border-line bg-ink/60 hover:border-line/90'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-heading text-2xl text-ivory uppercase">
                              {cat.name}
                            </span>
                            <span className="font-numbers text-base font-bold text-champagne">
                              {cat.price}
                            </span>
                          </div>
                          <p className="text-xs text-stone mt-1">{cat.tagline}</p>
                          <div className="text-[10px] text-stone/80 mt-2">
                            Cutoff: {cat.cutoffTime} • Min Age: {cat.minAge} yrs
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* T-Shirt Size Selector */}
                  <div className="pt-4 border-t border-line">
                    <label className="label-subtle block mb-2">RUNNING JERSEY SIZE *</label>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {['XS', 'S', 'M', 'L', 'XL', '2XL'].map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => handleInputChange('tShirtSize', size)}
                          className={`py-3 rounded-xl text-xs font-numbers font-bold border transition-all ${
                            formData.tShirtSize === size
                              ? 'bg-champagne text-ink border-champagne'
                              : 'bg-ink border-line text-stone hover:text-ivory'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                    <p className="text-[11px] text-stone mt-2">
                      Official technical racing jersey included in athlete kit.
                    </p>
                  </div>

                  {/* Bib Name Customization */}
                  <div className="pt-4 border-t border-line">
                    <label className="label-subtle block mb-2">
                      NAME ON BIB * (MAX 16 CHARACTERS)
                    </label>
                    <input
                      type="text"
                      maxLength={16}
                      value={formData.bibName}
                      onChange={(e) => handleInputChange('bibName', e.target.value.toUpperCase())}
                      placeholder="e.g. VIKRAM"
                      className={`w-full px-4 py-3 rounded-xl bg-ink border text-ivory placeholder-stone/40 text-sm font-numbers uppercase tracking-widest focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-champagne transition-colors ${
                        errors.bibName ? 'border-rose-500' : 'border-line'
                      }`}
                    />
                    {errors.bibName && (
                      <p className="text-xs text-rose-400 mt-1">{errors.bibName}</p>
                    )}
                  </div>

                  {/* Medical Notes (Optional) */}
                  <div className="pt-4 border-t border-line">
                    <label className="label-subtle block mb-2">
                      MEDICAL CONDITIONS / ALLERGIES (OPTIONAL)
                    </label>
                    <input
                      type="text"
                      value={formData.medicalNotes}
                      onChange={(e) => handleInputChange('medicalNotes', e.target.value)}
                      placeholder="e.g. Asthma, Penicillin allergy, None"
                      className="w-full px-4 py-3 rounded-xl bg-ink border border-line text-ivory placeholder-stone/40 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-champagne"
                    />
                  </div>

                  <div className="pt-6 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="btn-ghost-luxury text-xs py-3 px-6"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleNext}
                      className="btn-champagne text-xs uppercase tracking-wider py-3.5 px-8"
                    >
                      <span>Review & Confirm</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: REVIEW & SUBMIT */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="p-6 rounded-2xl bg-ink/70 border border-line space-y-4">
                    <div className="flex items-center justify-between pb-4 border-b border-line">
                      <div>
                        <span className="label-subtle text-[9px]">SELECTED CATEGORY</span>
                        <h4 className="font-heading text-2xl text-champagne uppercase mt-0.5">
                          {activeCategoryConfig.name}
                        </h4>
                      </div>
                      <span className="font-numbers text-3xl font-bold text-ivory">
                        {activeCategoryConfig.price}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-stone">
                      <div>
                        <span className="label-subtle text-[8.5px]">ATHLETE</span>
                        <p className="text-ivory font-medium mt-0.5">{formData.fullName}</p>
                      </div>
                      <div>
                        <span className="label-subtle text-[8.5px]">BIB NAME</span>
                        <p className="text-ivory font-medium mt-0.5">{formData.bibName}</p>
                      </div>
                      <div>
                        <span className="label-subtle text-[8.5px]">JERSEY SIZE</span>
                        <p className="text-ivory font-medium mt-0.5">{formData.tShirtSize}</p>
                      </div>
                      <div>
                        <span className="label-subtle text-[8.5px]">PHONE</span>
                        <p className="text-ivory font-medium mt-0.5">{formData.phone}</p>
                      </div>
                      <div>
                        <span className="label-subtle text-[8.5px]">EMAIL</span>
                        <p className="text-ivory font-medium mt-0.5">{formData.email}</p>
                      </div>
                      <div>
                        <span className="label-subtle text-[8.5px]">EMERGENCY</span>
                        <p className="text-ivory font-medium mt-0.5">
                          {formData.emergencyContactName} ({formData.emergencyContactPhone})
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Terms & Indemnity Agreement */}
                  <div className="pt-2">
                    <label className="flex items-start gap-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={formData.acceptTerms}
                        onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
                        className="mt-1 w-4 h-4 rounded border-line text-champagne focus:ring-champagne bg-ink"
                      />
                      <span className="text-xs text-stone leading-relaxed">
                        I confirm that I am medically fit to participate in the {activeCategoryConfig.name} on {EVENT_CONFIG.date}. 
                        I have read and agree to abide by the event rules, organizer guidelines, and indemnity waiver.
                      </span>
                    </label>
                    {errors.acceptTerms && (
                      <p className="text-xs text-rose-400 mt-2">{errors.acceptTerms}</p>
                    )}
                  </div>

                  <div className="pt-6 flex items-center justify-between border-t border-line">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="btn-ghost-luxury text-xs py-3 px-6"
                      disabled={isSubmitting}
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Edit Details</span>
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-champagne text-xs uppercase tracking-wider py-4 px-10 font-bold"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Confirming Entry...</span>
                        </>
                      ) : (
                        <>
                          <span>Pay & Confirm Entry ({activeCategoryConfig.price})</span>
                          <CheckCircle2 className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}

            </form>
          )}

        </div>

      </div>
    </section>
  );
};
