'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { EVENT_CONFIG } from '@/lib/event-config';

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Races', href: '#races' },
  { label: 'Route', href: '#route' },
  { label: 'Schedule', href: '#schedule' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-ink/80 backdrop-blur-md border-b border-line py-3.5 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Pride Patna Marathon logo */}
        <Link href="#hero" className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne rounded" aria-label={`${EVENT_CONFIG.organizer} - ${EVENT_CONFIG.event}`}>
          <img src="/pride-patna-marathon-logo-cropped.png" alt="Pride Patna Marathon" className="h-16 w-[min(42vw,260px)] object-contain object-left" />
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-7 text-xs font-medium tracking-widest uppercase"
          aria-label="Main Navigation"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-stone hover:text-champagne transition-colors duration-200 py-1 relative group focus-visible:text-champagne"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-champagne transition-all duration-200 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Right CTA Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="#register"
            className="btn-champagne text-xs uppercase tracking-wider !py-2.5 !px-5 focus-visible:outline-none"
          >
            <span>Register Now</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          {/* Hamburger Drawer Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-stone hover:text-ivory focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-champagne rounded-lg border border-line bg-graphite/50"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-ink/80 backdrop-blur-sm z-40 md:hidden"
              aria-hidden="true"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 260 }}
              className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-graphite border-l border-line p-6 z-50 flex flex-col justify-between shadow-2xl md:hidden"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-line">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full border border-champagne/80 flex items-center justify-center">
                      <span className="font-heading text-[8px] text-champagne font-bold">
                        PRIDE
                      </span>
                    </div>
                    <span className="font-heading text-sm text-ivory tracking-wider uppercase font-bold">
                      {EVENT_CONFIG.shortTitle}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 text-stone hover:text-ivory rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-champagne"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="mt-8 flex flex-col gap-4">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-heading text-xl uppercase tracking-wider text-ivory/80 hover:text-champagne transition-colors py-2 border-b border-line/40 flex items-center justify-between"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="w-4 h-4 text-stone" />
                    </Link>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-line space-y-4">
                <div className="text-xs text-stone">
                  <p className="font-semibold text-ivory">{EVENT_CONFIG.venue}</p>
                  <p>{EVENT_CONFIG.date} • {EVENT_CONFIG.reportingTime}</p>
                </div>
                <Link
                  href="#register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-champagne w-full text-center text-xs uppercase tracking-wider py-3"
                >
                  Register Now
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
