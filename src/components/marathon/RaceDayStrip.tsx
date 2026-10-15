'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, ArrowRight, Clock, ExternalLink } from 'lucide-react';
import { EVENT_CONFIG, RaceCategoryConfig } from '@/lib/event-config';

interface RaceDayStripProps {
  onSelectCategory?: (code: string) => void;
}

export const RaceDayStrip: React.FC<RaceDayStripProps> = ({ onSelectCategory }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date(EVENT_CONFIG.dateIso).getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCategoryClick = (code: string) => {
    if (onSelectCategory) {
      onSelectCategory(code);
    }
    const regSection = document.getElementById('register');
    if (regSection) {
      regSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Google Calendar URL generator
  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent(`${EVENT_CONFIG.event} - ${EVENT_CONFIG.organizer}`);
    const details = encodeURIComponent(
      `${EVENT_CONFIG.heroDescription}\nReporting: ${EVENT_CONFIG.reportingTime}\nVenue: ${EVENT_CONFIG.venue}`
    );
    const location = encodeURIComponent(EVENT_CONFIG.venue);
    // 14 Feb 2027 04:30 AM IST is 2027-02-13T23:00:00Z
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20270213T230000Z/20270214T070000Z&details=${details}&location=${location}`;
  };

  return (
    <div id="races" className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-14 md:-mt-16">
      <div className="luxury-card bg-graphite/95 backdrop-blur-xl p-6 sm:p-8 lg:p-10 border border-line shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Left Column: Big Date, Venue, Live Countdown, Calendar Link */}
          <div className="lg:col-span-5 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-line pb-8 lg:pb-0 lg:pr-8">
            <div>
              <div className="flex items-center gap-2 mb-3 text-champagne">
                <Calendar className="w-4 h-4" />
                <span className="label-subtle !text-champagne font-bold tracking-widest">
                  OFFICIAL RACE DAY
                </span>
              </div>

              {/* Big Date */}
              <h2 className="font-heading text-4xl sm:text-5xl text-ivory tracking-wide uppercase leading-none">
                {EVENT_CONFIG.date}
              </h2>

              {/* Venue */}
              <div className="flex items-center gap-2 mt-3 text-stone text-sm">
                <MapPin className="w-4 h-4 text-stone/80 shrink-0" />
                <span>{EVENT_CONFIG.venue}</span>
              </div>
            </div>

            {/* Live Countdown Grid with Tabular Numbers */}
            <div className="my-6 pt-6 border-t border-line/60">
              <div className="flex items-center gap-2 mb-3 text-stone">
                <Clock className="w-3.5 h-3.5 text-champagne" />
                <span className="label-subtle text-[10px]">TIME TO FLAG-OFF</span>
              </div>
              <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
                <div className="bg-ink/60 rounded-xl p-2.5 sm:p-3 border border-line/50">
                  <span className="font-numbers text-2xl sm:text-3xl text-ivory block leading-none">
                    {String(timeLeft.days).padStart(2, '0')}
                  </span>
                  <span className="label-subtle text-[9px] text-stone mt-1 block">DAYS</span>
                </div>
                <div className="bg-ink/60 rounded-xl p-2.5 sm:p-3 border border-line/50">
                  <span className="font-numbers text-2xl sm:text-3xl text-ivory block leading-none">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="label-subtle text-[9px] text-stone mt-1 block">HRS</span>
                </div>
                <div className="bg-ink/60 rounded-xl p-2.5 sm:p-3 border border-line/50">
                  <span className="font-numbers text-2xl sm:text-3xl text-ivory block leading-none">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="label-subtle text-[9px] text-stone mt-1 block">MIN</span>
                </div>
                <div className="bg-ink/60 rounded-xl p-2.5 sm:p-3 border border-line/50">
                  <span className="font-numbers text-2xl sm:text-3xl text-champagne block leading-none">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="label-subtle text-[9px] text-stone mt-1 block">SEC</span>
                </div>
              </div>
            </div>

            {/* Add to Calendar Button */}
            <a
              href={getGoogleCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold text-stone hover:text-champagne transition-colors group mt-2 focus-visible:outline-none"
            >
              <span className="tracking-wider uppercase">Add to Google Calendar</span>
              <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Right Column: Row of 4 Category Cards */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="flex items-center justify-between mb-4">
              <span className="label-subtle text-[10px]">CHOOSE YOUR DISTANCE</span>
              <span className="text-xs text-stone">4 certified races</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {EVENT_CONFIG.categories.map((cat: RaceCategoryConfig) => (
                <button
                  key={cat.code}
                  type="button"
                  onClick={() => handleCategoryClick(cat.code)}
                  className="text-left p-4 sm:p-5 rounded-2xl bg-ink/50 hover:bg-ink/80 border border-line hover:border-champagne/40 transition-all duration-300 group flex flex-col justify-between relative overflow-hidden focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-champagne"
                >
                  <div className="flex items-start justify-between w-full mb-3">
                    <div>
                      <span className="font-heading text-2xl sm:text-3xl text-ivory block leading-none group-hover:text-champagne transition-colors">
                        {cat.distance}
                      </span>
                      <span className="text-xs text-stone font-medium block mt-1">
                        {cat.name}
                      </span>
                    </div>

                    {/* Circular Arrow Button */}
                    <div className="w-8 h-8 rounded-full border border-line group-hover:border-champagne/60 group-hover:bg-champagne/10 flex items-center justify-center text-stone group-hover:text-champagne transition-all shrink-0">
                      <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                    </div>
                  </div>

                  <div className="flex items-baseline justify-between w-full pt-3 border-t border-line/40">
                    <span className="text-[11px] text-stone/80 italic">
                      {cat.tagline}
                    </span>
                    <span className="font-numbers text-base font-bold text-champagne">
                      {cat.price}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
