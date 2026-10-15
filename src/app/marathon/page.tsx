'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/marathon/Navbar';
import { HeroSection } from '@/components/marathon/HeroSection';
import { RaceDayStrip } from '@/components/marathon/RaceDayStrip';
import { WhyRunSection } from '@/components/marathon/WhyRunSection';
import { RouteSection } from '@/components/marathon/RouteSection';
import { ScheduleTimeline } from '@/components/marathon/ScheduleTimeline';
import { RaceKitAndSponsors } from '@/components/marathon/RaceKitAndSponsors';
import { GallerySection } from '@/components/marathon/GallerySection';
import { FaqAccordion } from '@/components/marathon/FaqAccordion';
import { RegistrationSection } from '@/components/marathon/RegistrationSection';
import { Footer } from '@/components/marathon/Footer';

export default function MarathonPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('21k');

  return (
    <main className="min-h-screen bg-ink text-ivory flex flex-col relative selection:bg-champagne selection:text-ink">
      {/* 1. Sticky Navbar */}
      <Navbar />

      {/* 2. Hero Section (100vh) */}
      <HeroSection />

      {/* 3. Race-day Strip (Overlaps Hero bottom) */}
      <RaceDayStrip onSelectCategory={(code) => setSelectedCategory(code)} />

      {/* 4. Light Section (Ivory background, Ink text) */}
      <WhyRunSection />

      {/* 5. Route Section (Stylized SVG map & elevation profile) */}
      <RouteSection />

      {/* 6. Schedule Timeline */}
      <ScheduleTimeline />

      {/* 7. Race Kit + Sponsors */}
      <RaceKitAndSponsors />

      {/* 8. Gallery (Masonry grid with lightbox) */}
      <GallerySection />

      {/* 9. FAQ Accordion (Accessible 6 questions) */}
      <FaqAccordion />

      {/* 10. Multi-step Registration Form */}
      <RegistrationSection selectedCategoryCode={selectedCategory} />

      {/* 11. Footer */}
      <Footer />
    </main>
  );
}
