'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, Youtube, ArrowUp } from 'lucide-react';
import { EVENT_CONFIG } from '@/lib/event-config';
import { TopographicPattern } from './TopographicPattern';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="relative w-full bg-ink text-ivory pt-24 pb-12 overflow-hidden border-t border-line/70">
      {/* Topographic contour texture background */}
      <TopographicPattern opacity={0.04} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-line">
          
          {/* Brand & Monogram Column */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="mb-6">
                <img src="/pride-patna-marathon-logo-cropped.png" alt="Pride Patna Marathon" className="h-32 w-[min(100%,380px)] object-contain object-left" />
              </div>

              {/* Tagline */}
              <p className="font-accent text-2xl sm:text-3xl text-champagne mb-4">
                &ldquo;{EVENT_CONFIG.tagline}&rdquo;
              </p>

              <p className="font-body text-sm text-stone max-w-sm leading-relaxed mb-6">
                Bihar&apos;s premier community distance-running event uniting elite marathoners, civic pioneers, and families on the banks of the Ganges.
              </p>

              {/* Social Media Links */}
              <div className="flex items-center gap-3">
                <a
                  href={EVENT_CONFIG.contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-graphite border border-line hover:border-champagne text-stone hover:text-champagne flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={EVENT_CONFIG.contact.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-graphite border border-line hover:border-champagne text-stone hover:text-champagne flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href={EVENT_CONFIG.contact.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-graphite border border-line hover:border-champagne text-stone hover:text-champagne flex items-center justify-center transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href={EVENT_CONFIG.contact.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-graphite border border-line hover:border-champagne text-stone hover:text-champagne flex items-center justify-center transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-3">
            <span className="label-subtle text-[10px] text-stone tracking-[0.24em] mb-4 block">
              QUICK NAVIGATION
            </span>
            <ul className="space-y-2.5 text-xs font-medium uppercase tracking-wider text-stone">
              <li>
                <Link href="#hero" className="hover:text-champagne transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:text-champagne transition-colors">
                  Why Run With Us
                </Link>
              </li>
              <li>
                <Link href="#races" className="hover:text-champagne transition-colors">
                  Race Distances & Pricing
                </Link>
              </li>
              <li>
                <Link href="#route" className="hover:text-champagne transition-colors">
                  Course Map & Elevation
                </Link>
              </li>
              <li>
                <Link href="#schedule" className="hover:text-champagne transition-colors">
                  Race Day Timeline
                </Link>
              </li>
              <li>
                <Link href="#kit" className="hover:text-champagne transition-colors">
                  Athlete Kit & Inclusions
                </Link>
              </li>
              <li>
                <Link href="#gallery" className="hover:text-champagne transition-colors">
                  Archival Photo Gallery
                </Link>
              </li>
              <li>
                <Link href="#faq" className="hover:text-champagne transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* Secretariat & Contact Column */}
          <div className="lg:col-span-4">
            <span className="label-subtle text-[10px] text-stone tracking-[0.24em] mb-4 block">
              EVENT SECRETARIAT
            </span>
            
            <div className="space-y-4 text-xs text-stone">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-champagne shrink-0 mt-0.5" />
                <div>
                  <p className="text-ivory font-semibold">{EVENT_CONFIG.venue}</p>
                  <p>{EVENT_CONFIG.contact.secretariat}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-champagne shrink-0" />
                <a
                  href={`mailto:${EVENT_CONFIG.contact.email}`}
                  className="hover:text-champagne transition-colors text-ivory"
                >
                  {EVENT_CONFIG.contact.email}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-champagne shrink-0" />
                <a
                  href={`tel:${EVENT_CONFIG.contact.phone.replace(/\s+/g, '')}`}
                  className="hover:text-champagne transition-colors text-ivory font-numbers"
                >
                  {EVENT_CONFIG.contact.phone}
                </a>
              </div>

              <div className="p-4 rounded-xl bg-graphite border border-line/60 mt-4">
                <p className="label-subtle text-[9px] text-stone">RACE DAY EMERGENCY HOTLINE</p>
                <p className="font-numbers text-champagne text-sm font-bold mt-1">
                  1800-420-2027 (TOLL FREE)
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright, Legal, Back to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone">
          <p>
            &copy; {new Date().getFullYear()} {EVENT_CONFIG.organizer}. All rights reserved. 
            Organized in compliance with AFI & AIMS standards.
          </p>

          <div className="flex items-center gap-6">
            <Link href="#terms" className="hover:text-ivory transition-colors">
              Terms & Conditions
            </Link>
            <Link href="#privacy" className="hover:text-ivory transition-colors">
              Privacy Policy
            </Link>
            <Link href="#rules" className="hover:text-ivory transition-colors">
              Race Regulations
            </Link>

            <button
              type="button"
              onClick={scrollToTop}
              className="p-2 rounded-full border border-line hover:border-champagne hover:text-champagne transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
