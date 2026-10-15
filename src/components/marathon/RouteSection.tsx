'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Droplets,
  HeartPulse,
  Zap,
  TrendingUp,
  Mountain,
  MapPin,
  Flag,
} from 'lucide-react';
import { EVENT_CONFIG, RouteProfile } from '@/lib/event-config';

export const RouteSection: React.FC = () => {
  const [selectedRouteCode, setSelectedRouteCode] = useState<string>('21k');

  const currentRoute: RouteProfile =
    EVENT_CONFIG.routes.find((r) => r.code === selectedRouteCode) ||
    EVENT_CONFIG.routes[2];

  // Calculate SVG elevation path dynamically
  const width = 800;
  const height = 220;
  const paddingX = 40;
  const paddingY = 30;

  const maxDist = currentRoute.points[currentRoute.points.length - 1].distanceKm;
  const minElev = 48;
  const maxElev = 68;

  const points = currentRoute.points.map((pt) => {
    const x = paddingX + (pt.distanceKm / (maxDist || 1)) * (width - 2 * paddingX);
    const y =
      height -
      paddingY -
      ((pt.elevationM - minElev) / (maxElev - minElev)) * (height - 2 * paddingY);
    return { ...pt, x, y };
  });

  // Build SVG path strings
  const linePath = points.reduce(
    (acc, pt, idx) => (idx === 0 ? `M ${pt.x},${pt.y}` : `${acc} L ${pt.x},${pt.y}`),
    ''
  );

  const areaPath = `${linePath} L ${points[points.length - 1].x},${height - paddingY} L ${
    points[0].x
  },${height - paddingY} Z`;

  return (
    <section id="route" className="relative w-full py-28 md:py-36 bg-ink text-ivory overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(200,168,107,0.04),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-px bg-champagne" />
              <span className="label-subtle !text-champagne">COURSE ARCHITECTURE</span>
            </div>
            <h2 className="font-heading text-5xl sm:text-6xl md:text-7xl uppercase tracking-tight text-ivory leading-none">
              THE PATNA <span className="font-accent lowercase text-champagne">course.</span>
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 p-1.5 bg-graphite rounded-xl border border-line">
            {EVENT_CONFIG.routes.map((rt) => (
              <button
                key={rt.code}
                type="button"
                onClick={() => setSelectedRouteCode(rt.code)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 focus-visible:outline-none ${
                  selectedRouteCode === rt.code
                    ? 'bg-champagne text-ink shadow-md font-bold'
                    : 'text-stone hover:text-ivory hover:bg-ink/60'
                }`}
                aria-pressed={selectedRouteCode === rt.code}
              >
                {rt.code.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Course Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentRoute.code}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="luxury-card p-6 sm:p-8 lg:p-10"
          >
            {/* Top Stats Banner */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-8 border-b border-line">
              <div>
                <span className="label-subtle text-[10px]">DISTANCE</span>
                <p className="font-numbers text-3xl sm:text-4xl text-ivory mt-1">
                  {currentRoute.distance}
                </p>
                <p className="text-xs text-stone mt-0.5">{currentRoute.title}</p>
              </div>

              <div>
                <span className="label-subtle text-[10px] flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-champagne" />
                  TOTAL GAIN
                </span>
                <p className="font-numbers text-3xl sm:text-4xl text-champagne mt-1">
                  {currentRoute.elevationGain}
                </p>
                <p className="text-xs text-stone mt-0.5">Gentle gradient, fast asphalt</p>
              </div>

              <div>
                <span className="label-subtle text-[10px] flex items-center gap-1.5">
                  <Mountain className="w-3.5 h-3.5 text-stone" />
                  PEAK ELEVATION
                </span>
                <p className="font-numbers text-3xl sm:text-4xl text-ivory mt-1">
                  {currentRoute.peakElevation}
                </p>
                <p className="text-xs text-stone mt-0.5">Bailey Overpass vantage</p>
              </div>

              <div>
                <span className="label-subtle text-[10px]">SUPPORT STATIONS</span>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1 text-sm text-ivory" title="Water stations">
                    <Droplets className="w-4 h-4 text-sky-400" />
                    <span className="font-numbers font-bold">{currentRoute.waterStations}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-ivory" title="Medical stations">
                    <HeartPulse className="w-4 h-4 text-rose-400" />
                    <span className="font-numbers font-bold">{currentRoute.medicalPoints}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-ivory" title="Energy gel zones">
                    <Zap className="w-4 h-4 text-champagne" />
                    <span className="font-numbers font-bold">{currentRoute.energyGelZones}</span>
                  </div>
                </div>
                <p className="text-xs text-stone mt-1">Every 2.5 km along course</p>
              </div>
            </div>

            {/* Stylized Course Map SVG */}
            <div className="mt-8 mb-10">
              <div className="flex items-center justify-between mb-3">
                <span className="label-subtle text-[10px]">COURSE ROUTE OVERVIEW</span>
                <span className="text-xs text-stone">Patna Riverfront & Expressway Corridor</span>
              </div>

              <div className="relative aspect-[21/9] w-full rounded-2xl bg-ink/70 border border-line/80 overflow-hidden flex items-center justify-center p-4">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 900 380"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="routeGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#C8A86B" />
                      <stop offset="50%" stopColor="#D9BC83" />
                      <stop offset="100%" stopColor="#C8A86B" />
                    </linearGradient>
                    <linearGradient id="riverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0B253A" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#081420" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>

                  {/* Ganges River Contour */}
                  <path
                    d="M-50,80 Q250,50 480,110 T950,90 L950,-20 L-50,-20 Z"
                    fill="url(#riverGrad)"
                  />
                  <path
                    d="M-50,80 Q250,50 480,110 T950,90"
                    stroke="rgba(100, 180, 240, 0.15)"
                    strokeWidth="1.5"
                    strokeDasharray="6 4"
                  />
                  <text x="50" y="45" fill="rgba(244, 239, 230, 0.2)" fontSize="11" letterSpacing="0.2em">
                    RIVER GANGES (GANGA PATHWAY WATERFRONT)
                  </text>

                  {/* City Grid Road Lines */}
                  <path d="M120,350 L120,120" stroke="rgba(244, 239, 230, 0.05)" strokeWidth="1" />
                  <path d="M300,350 L300,100" stroke="rgba(244, 239, 230, 0.05)" strokeWidth="1" />
                  <path d="M500,350 L500,115" stroke="rgba(244, 239, 230, 0.05)" strokeWidth="1" />
                  <path d="M720,350 L720,95" stroke="rgba(244, 239, 230, 0.05)" strokeWidth="1" />

                  {/* Primary Course Line */}
                  <path
                    d="M 140,290 C 220,290 280,240 380,240 C 480,240 540,160 660,150 C 760,140 820,130 840,130"
                    stroke="url(#routeGlow)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />

                  {/* Secondary Return Loop */}
                  <path
                    d="M 840,130 C 820,160 720,180 600,195 C 460,210 340,310 140,290"
                    stroke="#C8A86B"
                    strokeWidth="2"
                    strokeDasharray="6 6"
                    strokeOpacity="0.5"
                  />

                  {/* Start / Finish Point: Gandhi Maidan */}
                  <g transform="translate(140, 290)">
                    <circle r="14" fill="#C8A86B" fillOpacity="0.15" />
                    <circle r="6" fill="#C8A86B" />
                    <circle r="3" fill="#0B0C0E" />
                    <text x="-35" y="30" fill="#F4EFE6" fontSize="12" fontWeight="700">
                      GANDHI MAIDAN (START / FINISH)
                    </text>
                  </g>

                  {/* Intermediate Waypoints */}
                  <g transform="translate(380, 240)">
                    <circle r="4" fill="#F4EFE6" />
                    <text x="-40" y="-14" fill="#A39E94" fontSize="10">
                      DAK BUNGALOW (KM 5)
                    </text>
                  </g>

                  <g transform="translate(660, 150)">
                    <circle r="4" fill="#F4EFE6" />
                    <text x="-40" y="-14" fill="#A39E94" fontSize="10">
                      ATAL PATHWAY (KM 12)
                    </text>
                  </g>

                  {/* Turnaround Arch */}
                  <g transform="translate(840, 130)">
                    <circle r="10" fill="#D9532B" fillOpacity="0.2" />
                    <circle r="5" fill="#D9532B" />
                    <text x="-70" y="-16" fill="#D9532B" fontSize="11" fontWeight="600">
                      DIGHA GHAT TURNAROUND
                    </text>
                  </g>
                </svg>

                {/* Corner Legend Badge */}
                <div className="absolute top-4 right-4 bg-graphite/90 backdrop-blur-md px-3.5 py-2 rounded-lg border border-line text-[11px] text-stone flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-0.5 bg-champagne rounded" />
                    <span>Outbound</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-0.5 bg-champagne/50 border-t border-dashed rounded" />
                    <span>Inbound Return</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Hand-Made Elevation Profile SVG */}
            <div className="pt-6 border-t border-line">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-champagne" />
                  <span className="label-subtle text-[10px]">ELEVATION PROFILE</span>
                </div>
                <span className="text-xs text-stone">Sea Level Reference: ~52m AMSL</span>
              </div>

              <div className="relative w-full overflow-hidden bg-ink/40 rounded-xl border border-line/60 p-2 sm:p-4">
                <svg
                  className="w-full h-40 sm:h-48"
                  viewBox={`0 0 ${width} ${height}`}
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="elevationGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#C8A86B" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#C8A86B" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal grid lines */}
                  {[50, 55, 60, 65].map((elev) => {
                    const y =
                      height -
                      paddingY -
                      ((elev - minElev) / (maxElev - minElev)) * (height - 2 * paddingY);
                    return (
                      <g key={elev}>
                        <line
                          x1={paddingX}
                          y1={y}
                          x2={width - paddingX}
                          y2={y}
                          stroke="rgba(244, 239, 230, 0.06)"
                          strokeWidth="1"
                        />
                        <text
                          x={paddingX - 10}
                          y={y + 3}
                          fill="#A39E94"
                          fontSize="9"
                          textAnchor="end"
                          className="font-numbers"
                        >
                          {elev}m
                        </text>
                      </g>
                    );
                  })}

                  {/* Area fill under curve */}
                  <path d={areaPath} fill="url(#elevationGrad)" />

                  {/* Profile line stroke */}
                  <path
                    d={linePath}
                    stroke="#C8A86B"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Waypoint dots & labels */}
                  {points.map((pt, i) => (
                    <g key={i}>
                      <circle cx={pt.x} cy={pt.y} r="3.5" fill="#C8A86B" stroke="#0B0C0E" strokeWidth="1.5" />
                      {pt.label && (
                        <text
                          x={pt.x}
                          y={pt.y - 10}
                          fill="#F4EFE6"
                          fontSize="10"
                          textAnchor="middle"
                          fontWeight="600"
                        >
                          {pt.label} ({pt.distanceKm}k)
                        </text>
                      )}
                    </g>
                  ))}
                </svg>
              </div>
            </div>

            {/* Course Landmarks Row */}
            <div className="mt-8 pt-6 border-t border-line/60">
              <span className="label-subtle text-[10px] mb-3 block">KEY LANDMARKS & TURNS</span>
              <div className="flex flex-wrap gap-2.5">
                {currentRoute.landmarks.map((lm, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-ink/70 border border-line text-xs text-stone"
                  >
                    <MapPin className="w-3 h-3 text-champagne" />
                    <span>{lm}</span>
                  </span>
                ))}
              </div>
            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};
