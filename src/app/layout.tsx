import type { Metadata } from 'next';
import { Barlow_Condensed, Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import { EVENT_CONFIG } from '@/lib/event-config';

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-barlow',
  display: 'swap',
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['600'],
  style: ['italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://pridepatnamarathon.com'),
  title: `${EVENT_CONFIG.event} | ${EVENT_CONFIG.organizer} - ${EVENT_CONFIG.date}`,
  description: `${EVENT_CONFIG.heroDescription} Join 50,000+ runners at ${EVENT_CONFIG.venue} on ${EVENT_CONFIG.date}. ${EVENT_CONFIG.tagline}`,
  keywords: [
    'Patna Marathon',
    'Patna Runs Together',
    'Pride Patna Marathon',
    'Bihar Marathon 2027',
    'Half Marathon Patna',
    'Gandhi Maidan Marathon',
    'Running event Patna',
  ],
  authors: [{ name: EVENT_CONFIG.organizer }],
  openGraph: {
    title: `${EVENT_CONFIG.event} — ${EVENT_CONFIG.organizer}`,
    description: `${EVENT_CONFIG.heroDescription} ${EVENT_CONFIG.tagline}`,
    url: 'https://pridepatnamarathon.com/marathon',
    siteName: EVENT_CONFIG.event,
    images: [
      {
        url: '/images/marathon-hero-athlete.jpg',
        width: 1920,
        height: 1080,
        alt: `${EVENT_CONFIG.event} Marathon Runner`,
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${EVENT_CONFIG.event} — ${EVENT_CONFIG.organizer}`,
    description: EVENT_CONFIG.tagline,
    images: ['/images/marathon-hero-athlete.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    name: EVENT_CONFIG.event,
    description: EVENT_CONFIG.heroDescription,
    startDate: EVENT_CONFIG.dateIso,
    endDate: '2027-02-14T12:00:00+05:30',
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: EVENT_CONFIG.venue,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Gandhi Maidan',
        addressLocality: 'Patna',
        addressRegion: 'Bihar',
        postalCode: '800001',
        addressCountry: 'IN',
      },
    },
    organizer: {
      '@type': 'Organization',
      name: EVENT_CONFIG.organizer,
      url: 'https://pridepatnamarathon.com',
      email: EVENT_CONFIG.contact.email,
      telephone: EVENT_CONFIG.contact.phone,
    },
    offers: EVENT_CONFIG.categories.map((cat) => ({
      '@type': 'Offer',
      name: cat.name,
      price: cat.priceNum,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      validFrom: '2026-01-01',
      url: 'https://pridepatnamarathon.com/marathon#register',
    })),
    image: ['https://pridepatnamarathon.com/images/marathon-hero-athlete.jpg'],
  };

  return (
    <html
      lang="en"
      className={`${barlowCondensed.variable} ${cormorantGaramond.variable} ${inter.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-ink text-ivory antialiased selection:bg-champagne selection:text-ink relative">
        <div className="film-grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
