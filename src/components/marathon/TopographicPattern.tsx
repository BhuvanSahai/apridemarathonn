import React from 'react';

export const TopographicPattern: React.FC<{ className?: string; opacity?: number }> = ({
  className = '',
  opacity = 0.04,
}) => {
  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none ${className}`}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full object-cover"
        viewBox="0 0 1200 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ opacity }}
      >
        <path
          d="M-100,200 C300,100 500,400 900,250 C1100,180 1250,300 1400,250"
          stroke="#F4EFE6"
          strokeWidth="1.2"
          strokeDasharray="4 6"
        />
        <path
          d="M-80,240 C320,140 520,440 920,290 C1120,220 1270,340 1420,290"
          stroke="#F4EFE6"
          strokeWidth="1"
        />
        <path
          d="M-60,280 C340,180 540,480 940,330 C1140,260 1290,380 1440,330"
          stroke="#F4EFE6"
          strokeWidth="1.2"
        />
        <path
          d="M-40,320 C360,220 560,520 960,370 C1160,300 1310,420 1460,370"
          stroke="#F4EFE6"
          strokeWidth="0.8"
        />
        <path
          d="M-20,360 C380,260 580,560 980,410 C1180,340 1330,460 1480,410"
          stroke="#F4EFE6"
          strokeWidth="1.2"
        />
        <path
          d="M0,400 C400,300 600,600 1000,450 C1200,380 1350,500 1500,450"
          stroke="#F4EFE6"
          strokeWidth="1"
        />
        <path
          d="M20,440 C420,340 620,640 1020,490 C1220,420 1370,540 1520,490"
          stroke="#F4EFE6"
          strokeWidth="1.2"
          strokeDasharray="5 7"
        />
        <path
          d="M40,480 C440,380 640,680 1040,530 C1240,460 1390,580 1540,530"
          stroke="#F4EFE6"
          strokeWidth="0.8"
        />
        <path
          d="M60,520 C460,420 660,720 1060,570 C1260,500 1410,620 1560,570"
          stroke="#F4EFE6"
          strokeWidth="1.2"
        />
        <circle cx="900" cy="250" r="3" fill="#C8A86B" opacity="0.6" />
        <circle cx="940" cy="330" r="2.5" fill="#C8A86B" opacity="0.4" />
        <circle cx="1000" cy="450" r="3" fill="#C8A86B" opacity="0.5" />
      </svg>
    </div>
  );
};
