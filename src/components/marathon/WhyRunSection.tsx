'use client';

import React from 'react';
import Image from 'next/image';
import { Compass, Flame, Users, Award, CheckCircle2 } from 'lucide-react';
import { EVENT_CONFIG } from '@/lib/event-config';

const ICONS = [Compass, Flame, Users, Award];

export const WhyRunSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative w-full py-28 md:py-36 bg-ivory text-ink overflow-hidden"
    >
      {/* Subtle organic light background shading */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_100%_10%,rgba(200,168,107,0.12),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading, Intro & 4 Features with Faint 01-04 */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Small Label */}
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-px bg-[#8E6D2E]" />
              <span className="text-[11px] uppercase tracking-[0.24em] font-semibold text-[#8E6D2E]">
                WHY RUN WITH US
              </span>
            </div>

            {/* Heading: More than *a race.* */}
            <h2 className="font-heading text-5xl sm:text-6xl md:text-7xl uppercase tracking-tight text-ink leading-[0.94] mb-6">
              MORE THAN
              <br />
              <span className="font-accent text-5xl sm:text-6xl md:text-7xl lowercase block text-[#946E27] mt-1">
                a race.
              </span>
            </h2>

            {/* Editorial Paragraph */}
            <p className="font-body text-base sm:text-lg text-ink/75 max-w-xl font-normal leading-relaxed mb-12">
              The {EVENT_CONFIG.event} is designed to unite communities across Bihar. 
              Whether you are chasing your personal marathon record or jogging your first 5K with family, 
              experience world-class race organization along the historic banks of the Ganges.
            </p>

            {/* 4 Features Grid (01 to 04) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
              {EVENT_CONFIG.features.map((feature, idx) => {
                const IconComponent = ICONS[idx % ICONS.length];
                return (
                  <div key={feature.id} className="relative group flex flex-col justify-between">
                    {/* Large Faint Numeral */}
                    <span className="font-heading text-5xl sm:text-6xl text-ink/10 select-none absolute -top-4 right-2 font-bold group-hover:text-[#946E27]/25 transition-colors">
                      {feature.id}
                    </span>

                    <div>
                      {/* Thin Line Icon */}
                      <div className="w-10 h-10 rounded-full border border-ink/15 flex items-center justify-center text-ink/80 mb-4 group-hover:border-[#946E27] group-hover:text-[#946E27] transition-all bg-white/40">
                        <IconComponent className="w-5 h-5 stroke-[1.5]" />
                      </div>

                      {/* Feature Title */}
                      <h3 className="font-heading text-xl uppercase tracking-wide text-ink mb-2">
                        {feature.title}
                      </h3>

                      {/* Feature Description */}
                      <p className="font-body text-sm text-ink/70 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Verified Standards Strip */}
            <div className="mt-12 pt-8 border-t border-ink/10 flex flex-wrap items-center gap-6 text-xs text-ink/70">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8E6D2E]" />
                <span className="font-medium tracking-wide">AFI & AIMS Certified Course</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8E6D2E]" />
                <span className="font-medium tracking-wide">RFID Split Timing Mats</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8E6D2E]" />
                <span className="font-medium tracking-wide">Paramedic & Mobile ICU Support</span>
              </div>
            </div>
          </div>

          {/* Right Column: Cropped Running Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] w-full rounded-[24px] overflow-hidden border border-ink/10 shadow-2xl group bg-ink/5">
              <Image
                src="/images/why.jpg"
                alt="Marathon runners crossing the start line"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                className="object-cover object-center filter contrast-[1.04] brightness-[0.98] transition-transform duration-700 group-hover:scale-105"
              />

              {/* Elegant overlay note */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-ink/80 backdrop-blur-md text-ivory border border-white/10 shadow-lg">
                <p className="label-subtle text-[9px] text-stone tracking-[0.2em] mb-1">
                  COMMUNITY IMPACT
                </p>
                <p className="font-body text-xs sm:text-sm text-ivory/90 leading-snug">
                  15,000 native trees pledged along the Ganga riverfront corridor in celebration of every runner.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
