'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { EVENT_CONFIG } from '@/lib/event-config';

interface GalleryItem {
  id: number;
  src: string;
  title: string;
  category: string;
  aspect: string;
}

const GALLERY_IMAGES: GalleryItem[] = [
  { id: 1, src: '/images/gallery-1.jpg', title: 'Dawn Warm-up at Gandhi Maidan', category: 'Atmosphere', aspect: 'col-span-1 md:col-span-2 aspect-[16/10]' },
  { id: 2, src: '/images/gallery-2.jpg', title: 'Elite Corrals Departure', category: 'Race Action', aspect: 'col-span-1 aspect-[4/5]' },
  { id: 3, src: '/images/gallery-3.jpg', title: 'Ganga Pathway Waterfront Surge', category: 'Course', aspect: 'col-span-1 aspect-[4/5]' },
  { id: 4, src: '/images/gallery-4.jpg', title: 'Hydration Crew Volunteer Energy', category: 'Community', aspect: 'col-span-1 aspect-square' },
  { id: 5, src: '/images/gallery-5.jpg', title: 'Speed Stride on Atal Expressway', category: 'Athletes', aspect: 'col-span-1 aspect-square' },
  { id: 6, src: '/images/gallery-6.jpg', title: 'Finisher Arch Emotion', category: 'Moments', aspect: 'col-span-1 md:col-span-2 aspect-[16/10]' },
];

export const GallerySection: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIdx === null) return;
      if (e.key === 'Escape') setSelectedIdx(null);
      if (e.key === 'ArrowRight') {
        setSelectedIdx((prev) => (prev !== null ? (prev + 1) % GALLERY_IMAGES.length : 0));
      }
      if (e.key === 'ArrowLeft') {
        setSelectedIdx((prev) => (prev !== null ? (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length : 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIdx]);

  return (
    <section id="gallery" className="relative w-full py-28 md:py-36 bg-ink text-ivory overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Camera className="w-4 h-4 text-champagne" />
              <span className="label-subtle !text-champagne">ARCHIVAL MEMORIES</span>
            </div>
            <h2 className="font-heading text-5xl sm:text-6xl md:text-7xl uppercase tracking-tight text-ivory leading-none">
              RACE DAY <span className="font-accent lowercase text-champagne">gallery.</span>
            </h2>
          </div>
          <p className="font-body text-sm text-stone max-w-md">
            Relive the quiet intensity, grit, and collective joy from previous editions along the historic avenues of Patna.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {GALLERY_IMAGES.map((img, idx) => (
            <div
              key={img.id}
              onClick={() => setSelectedIdx(idx)}
              className={`relative rounded-2xl overflow-hidden border border-line cursor-pointer group luxury-card ${img.aspect}`}
            >
              <Image
                src={img.src}
                alt={img.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-center photo-grade group-hover:scale-105 transition-transform duration-700"
              />

              {/* Dark subtle vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

              {/* Hover Badge Info */}
              <div className="absolute inset-0 p-5 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex justify-end">
                  <div className="w-8 h-8 rounded-full bg-graphite/80 border border-champagne/40 flex items-center justify-center text-champagne backdrop-blur-sm">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div>
                  <span className="label-subtle text-[8.5px] text-champagne tracking-[0.2em] uppercase mb-1 block">
                    {img.category}
                  </span>
                  <h4 className="font-heading text-base sm:text-lg text-ivory tracking-wide uppercase leading-snug">
                    {img.title}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label="Gallery Lightbox"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedIdx(null)}
              className="absolute inset-0 bg-ink/95 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center z-10"
            >
              {/* Top Controls */}
              <div className="w-full flex items-center justify-between pb-3 text-stone mb-2">
                <span className="label-subtle text-[10px]">
                  {selectedIdx + 1} OF {GALLERY_IMAGES.length} • {GALLERY_IMAGES[selectedIdx].category}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedIdx(null)}
                  className="p-1.5 rounded-lg text-stone hover:text-ivory bg-graphite/80 border border-line focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-champagne"
                  aria-label="Close Lightbox"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main Image Container */}
              <div className="relative w-full aspect-[16/10] max-h-[70vh] rounded-2xl overflow-hidden border border-line shadow-2xl bg-graphite">
                <Image
                  src={GALLERY_IMAGES[selectedIdx].src}
                  alt={GALLERY_IMAGES[selectedIdx].title}
                  fill
                  className="object-contain"
                  priority
                />

                {/* Prev Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIdx((prev) => (prev !== null ? (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length : 0));
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-graphite/80 border border-line hover:border-champagne text-ivory flex items-center justify-center backdrop-blur-md transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Next Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIdx((prev) => (prev !== null ? (prev + 1) % GALLERY_IMAGES.length : 0));
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-graphite/80 border border-line hover:border-champagne text-ivory flex items-center justify-center backdrop-blur-md transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Caption */}
              <div className="w-full pt-4 text-center">
                <p className="font-heading text-lg sm:text-xl text-ivory tracking-wide uppercase">
                  {GALLERY_IMAGES[selectedIdx].title}
                </p>
                <p className="label-subtle text-[9px] text-stone mt-1">
                  {EVENT_CONFIG.shortTitle} ARCHIVE
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
