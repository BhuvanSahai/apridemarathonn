'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, Flag, Award, Sparkles } from 'lucide-react';
import { EVENT_CONFIG, ScheduleItem } from '@/lib/event-config';

export const ScheduleTimeline: React.FC = () => {
  return (
    <section
      id="schedule"
      className="relative w-full py-28 md:py-36 bg-ink text-ivory overflow-hidden border-t border-line/40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16 sm:mb-20">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-px bg-champagne" />
            <span className="label-subtle !text-champagne">RACE MORNING ITINERARY</span>
          </div>
          <h2 className="font-heading text-5xl sm:text-6xl md:text-7xl uppercase tracking-tight text-ivory leading-none">
            RACE DAY <span className="font-accent lowercase text-champagne">schedule.</span>
          </h2>
          <p className="font-body text-base text-stone mt-4 leading-relaxed">
            All waves depart strictly on schedule from Gandhi Maidan. Please arrive at least 45 minutes 
            prior to your category flag-off for baggage deposit and corral staging.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative pl-6 sm:pl-10 md:pl-12 border-l border-line/80 space-y-12 sm:space-y-16 max-w-4xl">
          {EVENT_CONFIG.schedule.map((item: ScheduleItem, idx: number) => {
            const isFlagOff = item.category !== undefined;
            const isCeremony = item.title.includes('Ceremony');

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="relative group"
              >
                {/* Node Indicator on Vertical Line */}
                <div
                  className={`absolute -left-[31px] sm:-left-[47px] md:-left-[55px] top-1.5 w-5 h-5 rounded-full border-2 transition-transform duration-300 group-hover:scale-125 flex items-center justify-center ${
                    isFlagOff
                      ? 'border-champagne bg-graphite shadow-[0_0_12px_rgba(200,168,107,0.5)]'
                      : isCeremony
                      ? 'border-amber-400 bg-graphite'
                      : 'border-stone/40 bg-ink'
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      isFlagOff ? 'bg-champagne' : isCeremony ? 'bg-amber-400' : 'bg-stone/50'
                    }`}
                  />
                </div>

                {/* Event Card */}
                <div className="luxury-card p-6 sm:p-7 hover:border-champagne/40 transition-colors">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    {/* Time Badge */}
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-champagne" />
                      <span className="font-numbers text-xl sm:text-2xl font-bold text-champagne tracking-wide">
                        {item.time}
                      </span>
                    </div>

                    {/* Category or Status Tag */}
                    {item.category && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-heading tracking-wider bg-champagne/15 text-champagne border border-champagne/30">
                        <Flag className="w-3 h-3" />
                        <span>{item.category} CORRAL WAVE</span>
                      </span>
                    )}

                    {isCeremony && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-heading tracking-wider bg-amber-400/15 text-amber-300 border border-amber-400/30">
                        <Award className="w-3 h-3" />
                        <span>PODIUM FELICITATION</span>
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-xl sm:text-2xl text-ivory uppercase tracking-wide mb-2">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="font-body text-sm text-stone leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Location Pin */}
                  <div className="flex items-center gap-2 text-xs text-stone/80 pt-3 border-t border-line/40">
                    <MapPin className="w-3.5 h-3.5 text-champagne/70 shrink-0" />
                    <span>{item.location}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
