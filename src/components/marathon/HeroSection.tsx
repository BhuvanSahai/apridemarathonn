'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Play, ArrowRight, X, ChevronDown } from 'lucide-react';
import { EVENT_CONFIG } from '@/lib/event-config';
import { TopographicPattern } from './TopographicPattern';

export const HeroSection: React.FC = () => {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const { scrollY } = useScroll();
  // Subtle parallax on hero image max 20px
  const yParallax = useTransform(scrollY, [0, 600], [0, 20]);

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center pt-24 pb-28 md:pt-28 md:pb-36 overflow-hidden bg-ink"
    >
      {/* Topographic Contour-Line Pattern (4-5% opacity) */}
      <TopographicPattern opacity={0.045} />

      {/* Soft Vignette Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(200,168,107,0.06),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[calc(100vh-14rem)]">
          {/* Left Column: Editorial Typography & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-center text-left"
          >
            {/* Small Label & Urgent Ember Dot */}
            <div className="flex items-center gap-3 mb-6">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ember opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-ember" />
              </span>
              <span className="label-subtle">
                {EVENT_CONFIG.heroKicker}
              </span>
              <span className="text-stone/40">•</span>
              <span className="label-subtle text-champagne/90">
                REGISTRATION OPEN
              </span>
            </div>

            {/* Huge Headline: EVERY MILE / matters. */}
            <h1 className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-ivory tracking-tight uppercase leading-[0.92] mb-6">
              {EVENT_CONFIG.heroHeadlineMain}
              <br />
              <span className="font-accent text-5xl sm:text-6xl md:text-7xl lg:text-8xl lowercase block mt-1">
                {EVENT_CONFIG.heroHeadlineAccent}
              </span>
            </h1>

            {/* Short Editorial Paragraph */}
            <p className="font-body text-base sm:text-lg text-stone max-w-xl font-normal leading-relaxed mb-10">
              {EVENT_CONFIG.heroDescription}
            </p>

            {/* CTAs: "Reserve your bib" & "Watch promo" */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-5">
              <Link
                href="#register"
                className="btn-champagne text-sm uppercase tracking-wider !py-3.5 !px-8 group"
              >
                <span>Reserve your bib</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <button
                type="button"
                onClick={() => setVideoModalOpen(true)}
                className="btn-ghost-luxury text-sm !py-3.5 !px-7 group"
                aria-label="Watch race preview promo video"
              >
                <div className="w-6 h-6 rounded-full bg-champagne/15 flex items-center justify-center text-champagne group-hover:scale-110 transition-transform">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                <span>Watch promo</span>
              </button>
            </div>

            {/* Meta facts pill */}
            <div className="mt-12 pt-8 border-t border-line flex flex-wrap items-center gap-6 sm:gap-10 text-xs text-stone">
              <div>
                <p className="label-subtle mb-1">DATE</p>
                <p className="font-numbers text-base text-ivory tracking-wide">
                  {EVENT_CONFIG.date}
                </p>
              </div>
              <div className="w-px h-8 bg-line" />
              <div>
                <p className="label-subtle mb-1">VENUE</p>
                <p className="font-numbers text-base text-ivory tracking-wide">
                  {EVENT_CONFIG.venue}
                </p>
              </div>
              <div className="w-px h-8 bg-line" />
              <div>
                <p className="label-subtle mb-1">RUNNERS</p>
                <p className="font-numbers text-base text-champagne tracking-wide">
                  {EVENT_CONFIG.stats.runnersCount}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Big Runner Photo + Animated Stroke Ribbon + Rotated Serif Note */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{ y: yParallax }}
            className="lg:col-span-5 relative flex items-center justify-center lg:justify-end"
          >
            {/* Thin champagne curved ribbon line SVG sweeping behind runner */}
            <svg
              className="absolute -inset-10 w-[125%] h-[125%] pointer-events-none z-0 overflow-visible"
              viewBox="0 0 500 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="champagneRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#DFB269" stopOpacity="0.95" />
                  <stop offset="50%" stopColor="#F0C987" stopOpacity="0.65" />
                  <stop offset="100%" stopColor="#DFB269" stopOpacity="0.15" />
                </linearGradient>
                <filter id="ribbonGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              <motion.path
                d="M 40,420 C 120,380 200,450 320,360 C 440,270 420,120 300,70 C 180,20 120,160 210,240 C 300,320 460,260 480,180"
                stroke="url(#champagneRibbon)"
                strokeWidth="2"
                strokeDasharray="5 3"
                filter="url(#ribbonGlow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.8, ease: 'easeInOut' }}
              />
            </svg>

            {/* Runner Photo Container with warm color grade & clean framing */}
            <div className="relative w-full max-w-md lg:max-w-none aspect-[3/4] sm:aspect-[4/5] rounded-[24px] overflow-hidden border border-champagne/25 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_35px_rgba(223,178,105,0.15)] z-10 group bg-graphite">
              <Image
                src="/images/marathon-hero-athlete.jpg"
                alt="Professional marathon athlete sprinting across Patna bridge at sunrise"
                fill
                priority
                unoptimized
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 42vw"
                className="object-cover object-center photo-grade transition-transform duration-700 group-hover:scale-105"
              />

              {/* Gentle bottom gradient mask for badge legibility without darkening the runner */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent pointer-events-none" />

              {/* Rotated small italic serif note: "Patna runs together" */}
              <div className="absolute bottom-6 left-6 z-20 bg-graphite/90 backdrop-blur-md px-4 py-2.5 rounded-full border border-champagne/30 shadow-lg">
                <span className="font-accent text-sm sm:text-base text-champagne font-semibold tracking-wide">
                  &ldquo;{EVENT_CONFIG.event}&rdquo;
                </span>
              </div>
            </div>

            {/* Vertical rotated side badge on desktop */}
            <div className="hidden xl:flex absolute -right-12 top-1/2 -translate-y-1/2 rotate-90 origin-center items-center gap-3">
              <span className="w-8 h-px bg-champagne/40" />
              <span className="label-subtle text-[10px] text-stone tracking-[0.3em]">
                EDITION 2027
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Vertical SCROLL Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-10">
        <span className="label-subtle text-[9px] text-stone tracking-[0.28em]">
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4 text-champagne/70" />
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {videoModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label="Pride Patna Marathon Video Promo"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setVideoModalOpen(false)}
              className="absolute inset-0 bg-ink/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl bg-graphite rounded-2xl border border-line overflow-hidden shadow-2xl z-10 p-2 sm:p-4"
            >
              <div className="flex items-center justify-between pb-3 px-2 border-b border-line mb-3">
                <span className="font-heading text-base tracking-wider uppercase text-ivory">
                  {EVENT_CONFIG.event} • Official Preview
                </span>
                <button
                  type="button"
                  onClick={() => setVideoModalOpen(false)}
                  className="p-1.5 rounded-lg text-stone hover:text-ivory hover:bg-ink transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-champagne"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-ink">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&mute=0"
                  title="Marathon promo video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
