'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { EVENT_CONFIG, FAQItem } from '@/lib/event-config';

export const FaqAccordion: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleItem = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative w-full py-28 md:py-36 bg-ink text-ivory overflow-hidden border-t border-line/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <HelpCircle className="w-4 h-4 text-champagne" />
            <span className="label-subtle !text-champagne">ATHLETE BRIEFING</span>
          </div>
          <h2 className="font-heading text-5xl sm:text-6xl md:text-7xl uppercase tracking-tight text-ivory leading-none">
            FREQUENTLY ASKED <span className="font-accent lowercase text-champagne">questions.</span>
          </h2>
          <p className="font-body text-base text-stone mt-4 leading-relaxed max-w-xl mx-auto">
            Everything you need to prepare for race weekend, bib verification, and timing regulations.
          </p>
        </div>

        {/* Accordion Stack */}
        <div className="space-y-4">
          {EVENT_CONFIG.faqs.map((faq: FAQItem, idx: number) => {
            const isOpen = openIdx === idx;
            const buttonId = `faq-btn-${idx}`;
            const panelId = `faq-panel-${idx}`;

            return (
              <div
                key={idx}
                className={`luxury-card overflow-hidden transition-all duration-300 ${
                  isOpen ? 'border-champagne/40 bg-graphite' : 'bg-graphite/60'
                }`}
              >
                <button
                  type="button"
                  id={buttonId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggleItem(idx)}
                  className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-champagne"
                >
                  <span className="font-heading text-lg sm:text-xl text-ivory tracking-wide uppercase leading-snug">
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full border border-line flex items-center justify-center text-stone shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 border-champagne text-champagne bg-champagne/10' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-6 pb-6 sm:px-7 sm:pb-7 pt-1 border-t border-line/40 text-sm sm:text-base text-stone leading-relaxed font-body">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Contact help line note */}
        <div className="mt-12 text-center text-xs text-stone">
          Still have questions? Contact the race secretariat at{' '}
          <a
            href={`mailto:${EVENT_CONFIG.contact.email}`}
            className="text-champagne underline underline-offset-4 hover:text-champagne-hover"
          >
            {EVENT_CONFIG.contact.email}
          </a>{' '}
          or call{' '}
          <a
            href={`tel:${EVENT_CONFIG.contact.phone.replace(/\s+/g, '')}`}
            className="text-champagne underline underline-offset-4 hover:text-champagne-hover"
          >
            {EVENT_CONFIG.contact.phone}
          </a>
        </div>

      </div>
    </section>
  );
};
