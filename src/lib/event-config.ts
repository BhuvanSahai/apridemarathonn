export interface RaceCategoryConfig {
  code: string;
  name: string;
  distance: string;
  distanceKm: number;
  tagline: string;
  price: string;
  priceNum: number;
  startTime: string;
  cutoffTime: string;
  elevationGain: string;
  minAge: number;
  description: string;
  inclusions: string[];
  routeHighlights: string[];
}

export interface ScheduleItem {
  time: string;
  title: string;
  category?: string;
  location: string;
  description: string;
}

export interface SponsorItem {
  name: string;
  role: string;
  logoText: string;
  tier: 'title' | 'powered' | 'associate' | 'medical' | 'timing';
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface RouteProfile {
  code: string;
  title: string;
  distance: string;
  elevationGain: string;
  peakElevation: string;
  waterStations: number;
  medicalPoints: number;
  energyGelZones: number;
  landmarks: string[];
  points: { distanceKm: number; elevationM: number; label?: string }[];
}

export const EVENT_CONFIG = {
  organizer: 'Pride Patna Marathon',
  event: 'Patna Runs Together',
  shortTitle: 'Pride Patna Marathon 2027',
  tagline: 'Every mile matters.',
  heroKicker: 'PRIDE PATNA MARATHON PRESENTS',
  heroHeadlineMain: 'EVERY MILE',
  heroHeadlineAccent: 'matters.',
  heroDescription:
    'Six races. Four cities. One unforgettable morning when all of Patna runs together — presented by Pride Patna Marathon.',
  date: '14 Feb 2027',
  dateIso: '2027-02-14T05:00:00+05:30',
  venue: 'Gandhi Maidan, Patna',
  city: 'Patna, Bihar',
  reportingTime: '04:30 AM IST',
  contact: {
    email: 'info@pridepatnamarathon.com',
    phone: '+91 94310 88200',
    secretariat: 'Gate No. 1, Gandhi Maidan, Patna, Bihar 800001',
    instagram: 'https://instagram.com/demomarathon',
    facebook: 'https://facebook.com/demomarathon',
    twitter: 'https://twitter.com/demomarathon',
    youtube: 'https://youtube.com/@demomarathon',
  },
  stats: {
    runnersCount: '50,000+',
    prizepool: '₹45,00,000',
    greenPledgeTrees: '15,000',
    citiesEngaged: '4',
  },
  categories: [
    {
      code: '5k',
      name: '5K Fun Run',
      distance: '5 KM',
      distanceKm: 5,
      tagline: 'For Everyone',
      price: '₹499',
      priceNum: 499,
      startTime: '07:30 AM',
      cutoffTime: '1 Hour 15 Min',
      elevationGain: '+8m',
      minAge: 8,
      description: 'An electric family-friendly riverfront loop celebrating community fitness and civic wellness.',
      inclusions: ['Technical Running Tee', 'Plantable Seed Bib', 'Finisher Medal', 'Hot Breakfast', 'Digital Certificate'],
      routeHighlights: ['Gandhi Maidan West', 'Golghar Heritage Loop', 'Children Park Return'],
    },
    {
      code: '10k',
      name: '10K Challenge Run',
      distance: '10 KM',
      distanceKm: 10,
      tagline: 'For Fitness Enthusiasts',
      price: '₹799',
      priceNum: 799,
      startTime: '06:45 AM',
      cutoffTime: '2 Hours 00 Min',
      elevationGain: '+14m',
      minAge: 14,
      description: 'A chip-timed speed course along broad avenue boulevards with pacers at 50, 60, and 70 minutes.',
      inclusions: ['Pro Racing Singlet', 'RFID Timing Chip', 'Steel Finisher Medal', 'Recovery Zone Access', 'Pacer Support'],
      routeHighlights: ['Gandhi Maidan Arena', 'Dak Bungalow Crossing', 'Bailey Road Flyover Loop', 'Museum Boulevard'],
    },
    {
      code: '21k',
      name: '21K Half Marathon',
      distance: '21.1 KM',
      distanceKm: 21.1,
      tagline: 'For Serious Runners',
      price: '₹1,299',
      priceNum: 1299,
      startTime: '05:45 AM',
      cutoffTime: '3 Hours 30 Min',
      elevationGain: '+32m',
      minAge: 18,
      description: 'The premier distance featuring the Ganga Pathway dawn breeze, flat asphalt, and AFI certification.',
      inclusions: ['AFI Timed Bib', 'Custom Finisher Jersey', 'Heavier Embossed Medal', 'Physio Recovery Zone', 'Hydration Packets'],
      routeHighlights: ['Gandhi Maidan North', 'Atal Path Expressway', 'JP Ganga Pathway Waterfront', 'Digha Ghat Turn'],
    },
    {
      code: '42k',
      name: '42K Full Marathon',
      distance: '42.2 KM',
      distanceKm: 42.2,
      tagline: 'For the Brave',
      price: '₹1,899',
      priceNum: 1899,
      startTime: '05:00 AM',
      cutoffTime: '6 Hours 00 Min',
      elevationGain: '+54m',
      minAge: 18,
      description: 'The ultimate endurance test across Patna’s historical landmarks and both Ganga riverfront causeways.',
      inclusions: ['Elite Corrals Access', 'Pre-Race Carbo Dinner', 'Finisher Windbreaker Jacket', 'Physio & Ice Bath', 'Live Tracking'],
      routeHighlights: ['Gandhi Maidan Star', 'Atal Path', 'Ganga Driveway Twin Loops', 'Old Patna City Ghats', 'High Court Ave'],
    },
  ] as RaceCategoryConfig[],

  schedule: [
    {
      time: '04:30 AM',
      title: 'Holding Area & Baggage Counters Open',
      location: 'Gandhi Maidan Gate No. 1',
      description: 'Warm-up arena, baggage security deposit, and electrolyte hydration stations active.',
    },
    {
      time: '05:00 AM',
      title: '42.2K Full Marathon Flag-off',
      category: '42K',
      location: 'Main Starting Arch',
      description: 'Elite corral departure followed by open category waves under ceremonial floodlights.',
    },
    {
      time: '05:45 AM',
      title: '21.1K Half Marathon Flag-off',
      category: '21K',
      location: 'Main Starting Arch',
      description: 'Paced flag-off in 4 corral batches based on verified seeding times.',
    },
    {
      time: '06:45 AM',
      title: '10K Challenge Run Flag-off',
      category: '10K',
      location: 'East Starting Corrals',
      description: 'Fast-paced mass start with official race marshals and pace groups.',
    },
    {
      time: '07:30 AM',
      title: '5K Fun Run Flag-off',
      category: '5K',
      location: 'Community Corrals',
      description: 'Family, corporate, and student fitness parade along the inner riverfront circle.',
    },
    {
      time: '09:30 AM',
      title: 'Podium & Grand Felicitation Ceremony',
      location: 'Main Stage Arena',
      description: 'Awarding cash prizes, championship trophies, and honoring veteran masters runners.',
    },
    {
      time: '11:30 AM',
      title: 'Course Closes & Festival Concludes',
      location: 'Gandhi Maidan Race Village',
      description: 'Official timing results published online and finisher certificate downloads open.',
    },
  ] as ScheduleItem[],

  features: [
    {
      id: '01',
      title: 'Well-Planned Routes',
      description:
        'AFI & AIMS certified wide-lane arterial roads, minimal turns, smooth asphalt, and zero traffic cross-flow.',
    },
    {
      id: '02',
      title: 'Exciting Race Experience',
      description:
        'Live cheering zones, local cultural dhol troupes, timed split mats every 5 km, and dynamic pace-setters.',
    },
    {
      id: '03',
      title: 'Community & Support',
      description:
        'Over 2,000 trained volunteers, mobile Apollo paramedical crews, and cheering cheer squads at every turn.',
    },
    {
      id: '04',
      title: 'Premium Race Kit',
      description:
        'Technical moisture-wicking apparel, zero-waste plantable bibs, RFID chip timing, and commemorative keepsake.',
    },
  ],

  kitItems: [
    { title: 'Technical Race Jersey', detail: 'Recycled poly high-wicking fabric engineered for race-morning humidity.' },
    { title: 'Plantable Seed Bib', detail: 'Organic wildflower seeds embedded in biodegradable, water-resistant bib substrate.' },
    { title: 'ChronoTrack RFID Chip', detail: 'Precision timing sensor tracking split pace, gun time, and net finish time.' },
    { title: 'Heavy Cast Finisher Medal', detail: 'Antique champagne metallic finish with engraved Patna monument relief.' },
    { title: 'Nutritional Recovery Pack', detail: 'Electrolyte hydration mix, organic fruit snacks, protein bar, and water.' },
    { title: 'Digital Race Passport', detail: 'Instant finish time WhatsApp alerts, split analysis, and downloadable certificate.' },
  ],

  sponsors: [
    { name: 'Pride Sports', role: 'Title Sponsor', logoText: 'PRIDE PATNA MARATHON', tier: 'title' },
    { name: 'Bihar Tourism', role: 'State Partner', logoText: 'BIHAR TOURISM', tier: 'powered' },
    { name: 'Apollo Hospitals', role: 'Official Medical Partner', logoText: 'APOLLO HEALTH', tier: 'medical' },
    { name: 'ChronoTrack India', role: 'Timing Partner', logoText: 'CHRONOTRACK', tier: 'timing' },
    { name: 'Himalayan Spring', role: 'Hydration Partner', logoText: 'HIMALAYAN', tier: 'associate' },
    { name: 'The Patna Times', role: 'Media Partner', logoText: 'PATNA TIMES', tier: 'associate' },
  ] as SponsorItem[],

  faqs: [
    {
      q: 'Where and when do I collect my race bib and kit?',
      a: 'Bib collection takes place at the Pride Patna Marathon Expo at Gandhi Maidan from February 11 to 13, 2027 (10:00 AM – 07:00 PM). Remember to carry your confirmation email and valid government photo ID. No kits are distributed on race morning.',
    },
    {
      q: 'Is there a minimum age criteria for registering?',
      a: 'Yes: 5K Fun Run is open to ages 8 and above. 10K requires participants to be at least 14 years old. 21.1K Half Marathon and 42.2K Full Marathon mandate a minimum age of 18 years on race day.',
    },
    {
      q: 'What is the cutoff time for the 21K Half Marathon?',
      a: 'The cutoff time for the 21.1K Half Marathon is strictly 3 hours and 30 minutes from gun start (09:15 AM). Athletes falling behind the pace wagon will be picked up by safety shuttle to ensure public road reopening.',
    },
    {
      q: 'What medical provisions are available along the route?',
      a: 'Full medical aid stations by Apollo Hospitals operate every 2.5 km, complete with stretchers, defibrillators, oxygen, ice towels, and paramedical squads. Multiple mobile cardiac ambulances patrol both causeways.',
    },
    {
      q: 'Can I transfer or cancel my bib registration?',
      a: 'Registrations are non-refundable and non-transferable to another individual as bibs are personalized with medical details. However, a one-time medical deferral to the 2028 edition is available upon submitting a doctor’s note 10 days prior.',
    },
    {
      q: 'Are baggage deposit counters available at the venue?',
      a: 'Yes, secure baggage drop tents operate from 04:30 AM inside Gandhi Maidan Gate No. 1. Only official baggage tags attached to your race kit are accepted. Please avoid depositing high-value electronics or jewellery.',
    },
  ] as FAQItem[],

  routes: [
    {
      code: '5k',
      title: '5K Riverfront Family Circuit',
      distance: '5.0 KM',
      elevationGain: '+8m',
      peakElevation: '54m',
      waterStations: 3,
      medicalPoints: 2,
      energyGelZones: 0,
      landmarks: ['Gandhi Maidan West Gate', 'Golghar Heritage Roundabout', 'Children Park Avenue', 'Finish Arch Gate 1'],
      points: [
        { distanceKm: 0, elevationM: 52, label: 'Start' },
        { distanceKm: 1.2, elevationM: 53 },
        { distanceKm: 2.5, elevationM: 55, label: 'Golghar Loop' },
        { distanceKm: 3.8, elevationM: 54 },
        { distanceKm: 5.0, elevationM: 52, label: 'Finish' },
      ],
    },
    {
      code: '10k',
      title: '10K Urban Boulevard Challenge',
      distance: '10.0 KM',
      elevationGain: '+14m',
      peakElevation: '58m',
      waterStations: 5,
      medicalPoints: 3,
      energyGelZones: 1,
      landmarks: ['Gandhi Maidan', 'Dak Bungalow Crossing', 'Museum Boulevard', 'Bailey Road Flyover', 'Collectorate Turn'],
      points: [
        { distanceKm: 0, elevationM: 52, label: 'Start' },
        { distanceKm: 2.5, elevationM: 54, label: 'Dak Bungalow' },
        { distanceKm: 5.0, elevationM: 58, label: 'Bailey Flyover' },
        { distanceKm: 7.5, elevationM: 55, label: 'Museum Turn' },
        { distanceKm: 10.0, elevationM: 52, label: 'Finish' },
      ],
    },
    {
      code: '21k',
      title: '21.1K Ganga Pathway Championship',
      distance: '21.097 KM',
      elevationGain: '+32m',
      peakElevation: '62m',
      waterStations: 9,
      medicalPoints: 5,
      energyGelZones: 2,
      landmarks: ['Gandhi Maidan', 'Atal Path Expressway', 'JP Ganga Pathway Waterfront', 'Digha Rail Bridge View', 'AN Sinha Institute'],
      points: [
        { distanceKm: 0, elevationM: 52, label: 'Start' },
        { distanceKm: 4.5, elevationM: 55, label: 'Atal Path' },
        { distanceKm: 9.0, elevationM: 61, label: 'Ganga Pathway Entry' },
        { distanceKm: 13.5, elevationM: 62, label: 'Digha Turnaround' },
        { distanceKm: 17.5, elevationM: 57, label: 'Riverway Return' },
        { distanceKm: 21.1, elevationM: 52, label: 'Finish Arch' },
      ],
    },
    {
      code: '42k',
      title: '42.2K Historic Patna Sovereign Route',
      distance: '42.195 KM',
      elevationGain: '+54m',
      peakElevation: '64m',
      waterStations: 17,
      medicalPoints: 9,
      energyGelZones: 4,
      landmarks: ['Gandhi Maidan', 'Old City Heritage Gate', 'Patna Sahib Riverfront', 'JP Ganga Twin Causeway', 'Digha Overpass', 'High Court'],
      points: [
        { distanceKm: 0, elevationM: 52, label: 'Start' },
        { distanceKm: 7.0, elevationM: 56, label: 'Patna City Loop' },
        { distanceKm: 14.0, elevationM: 53, label: 'East Waterfront' },
        { distanceKm: 21.1, elevationM: 62, label: 'Halfway Crossing' },
        { distanceKm: 28.0, elevationM: 64, label: 'JP Ganga Causeway' },
        { distanceKm: 35.0, elevationM: 58, label: 'Atal Path High Speed' },
        { distanceKm: 42.2, elevationM: 52, label: 'Grand Finish Arch' },
      ],
    },
  ] as RouteProfile[],
};
