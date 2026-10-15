'use client';

import React from 'react';
import { Shirt, Tag, Cpu, Medal, Apple, Smartphone, Handshake } from 'lucide-react';
import { EVENT_CONFIG, SponsorItem } from '@/lib/event-config';

const KIT_ICONS = [Shirt, Tag, Cpu, Medal, Apple, Smartphone];

export const RaceKitAndSponsors: React.FC = () => {
  return (
    <section id="kit" className="relative w-full py-28 md:py-36 bg-ink text-ivory overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Kit Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-px bg-champagne" />
            <span className="label-subtle !text-champagne">OFFICIAL ATHLETE PRIVILEGES</span>
            <span className="w-6 h-px bg-champagne" />
          </div>
          <h2 className="font-heading text-5xl sm:text-6xl md:text-7xl uppercase tracking-tight text-ivory leading-none">
            THE RACE <span className="font-accent lowercase text-champagne">kit.</span>
          </h2>
          <p className="font-body text-base text-stone mt-4 leading-relaxed">
            Every registered runner receives the official {EVENT_CONFIG.organizer} runner kit 
            during the three-day pre-race expo at Gandhi Maidan.
          </p>
        </div>

        {/* Kit Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {EVENT_CONFIG.kitItems.map((item, idx) => {
            const IconComponent = KIT_ICONS[idx % KIT_ICONS.length];
            return (
              <div
                key={idx}
                className="luxury-card p-6 sm:p-8 flex flex-col justify-between group hover:border-champagne/40 transition-all duration-300"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-ink border border-line flex items-center justify-center text-champagne mb-6 group-hover:scale-110 group-hover:border-champagne/60 group-hover:shadow-[0_0_20px_rgba(200,168,107,0.2)] transition-all">
                    <IconComponent className="w-6 h-6 stroke-[1.5]" />
                  </div>

                  <h3 className="font-heading text-2xl uppercase tracking-wide text-ivory mb-2 group-hover:text-champagne transition-colors">
                    {item.title}
                  </h3>

                  <p className="font-body text-sm text-stone leading-relaxed">
                    {item.detail}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-line/40 flex items-center justify-between text-xs text-stone">
                  <span className="label-subtle text-[9px]">INCLUDED IN REGISTRATION</span>
                  <span className="font-numbers text-champagne">ITEM 0{idx + 1}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Faint running-track lane lines divider motif */}
        <div className="track-lane-divider my-16" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>

        {/* Sponsors Section Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-2 text-stone">
            <Handshake className="w-3.5 h-3.5 text-champagne" />
            <span className="label-subtle text-[10px]">PATRONS & STATE PARTNERS</span>
          </div>
          <h3 className="font-heading text-3xl sm:text-4xl uppercase tracking-wide text-ivory">
            OUR ESTEEMED <span className="font-accent lowercase text-champagne">partners.</span>
          </h3>
          <p className="text-xs text-stone mt-2">
            Committed to building civic health and athletic infrastructure across Bihar.
          </p>
        </div>

        {/* Monochrome Sponsor Logo Row (grayscale, hover to color) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {EVENT_CONFIG.sponsors.map((sponsor: SponsorItem, idx: number) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-graphite/70 border border-line/70 hover:border-champagne/40 transition-all duration-300 flex flex-col items-center justify-center text-center group cursor-default"
            >
              {/* Sponsor Monogram / Brand Plate */}
              <div className="w-full py-4 px-2 flex items-center justify-center filter grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100 transition-all duration-300">
                <span className="font-heading text-lg sm:text-xl tracking-widest uppercase font-bold text-ivory group-hover:text-champagne">
                  {sponsor.logoText}
                </span>
              </div>

              {/* Sponsor Tier / Role */}
              <span className="label-subtle text-[8.5px] text-stone mt-1 block tracking-[0.2em]">
                {sponsor.role}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
