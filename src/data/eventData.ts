import { RaceCategory, PartnerTier, FAQCategory, BlogPost } from '../types';

export const EVENT_CONFIG = {
  company: 'Pride Patna Marathon',
  event: 'Pride Patna Marathon',
  edition: 'Edition 2027',
  city: 'Patna, Bihar',
  venue: 'Gandhi Maidan, Patna',
  dateIso: '2027-02-14T05:00:00+05:30',
  dateFormatted: 'Sunday, February 14, 2027',
  timeFormatted: '05:00 AM IST',
  address: 'Pride Patna Marathon Secretariat, Fraser Road, Patna – 800001, Bihar',
  email: 'run@pridepatnamarathon.com',
  phone: '+91 XXXXX XXXXX',
  tagline: 'Every Mile Matters.',
  subheadline: 'Six races. Four cities. One unforgettable morning when all of Patna runs together — presented by Pride Patna Marathon.',
  description: "Patna's premier community running festival organized by Pride Patna Marathon. Featuring AFI & AIMS certified courses, sustainable seed bibs, and world-class hydration support.",
};

export const RACE_CATEGORIES: RaceCategory[] = [
  {
    code: '5k',
    dist: '5K',
    unit: 'KM',
    name: 'Fun Run',
    label: '5KM Fun Run',
    fee: 499,
    color: '#DDB46B',
    flag: '6:30 AM',
    cut: '8:30 AM',
    age: '10+ yrs',
    skill: 'Everyone',
    qual: false,
    elevationGain: 'Flat (12m)',
    startPoint: 'Gandhi Maidan Gate 1',
    finishPoint: 'Gandhi Maidan Main Stage',
    description: 'A flat, fast loop along the scenic Patna riverfront — ideal for first-timers, youth, families, and enthusiastic walkers.',
    highlights: [
      'Scenic Riverfront Ganga Pathway loop',
      '2 stocked hydration and fruit stations',
      'Fully barricaded, traffic-free course',
      'Live acoustic music zones along the route',
    ],
    perks: ['Plantable Seed Bib with RFID chip', 'Finisher Medal & E-Certificate', 'Dry-fit Runner T-shirt', 'Hot Post-Race Breakfast'],
  },
  {
    code: '10k',
    dist: '10K',
    unit: 'KM',
    name: 'Timed Run',
    label: '10KM Timed Run',
    fee: 799,
    color: '#E5A46D',
    flag: '6:00 AM',
    cut: '8:30 AM',
    age: '18+ yrs',
    skill: 'Beginner+',
    qual: false,
    elevationGain: 'Gentle (24m)',
    startPoint: 'Gandhi Maidan Gate 1',
    finishPoint: 'Gandhi Maidan Main Stage',
    description: 'A prestigious heritage loop past historical Golghar and the Patna Museum with timing mats deployed every 2.5K.',
    highlights: [
      'Gandhi Maidan ⇄ Golghar historic corridor',
      'Official timing mats every 2.5K checkpoint',
      'Pacers targeting 50, 60, and 70 minute finishes',
      '4 electrolyte and energy hydration zones',
    ],
    perks: ['Official Chip Timing Bib', 'AFI Certified Course Result', 'Recycled Tech Performance Tee', 'Commemorative Brass Finisher Medal'],
  },
  {
    code: '21k',
    dist: '21.1',
    unit: 'KM',
    name: 'Half Marathon',
    label: '21.1KM Half Marathon',
    fee: 1199,
    color: '#7DC2A5',
    flag: '5:30 AM',
    cut: '9:30 AM',
    age: '18+ yrs',
    skill: 'Intermediate',
    qual: false,
    elevationGain: 'Rolling (48m)',
    startPoint: 'Gandhi Maidan Gate 1',
    finishPoint: 'Gandhi Maidan Main Stage',
    description: 'The signature endurance test through Patna’s iconic landmarks and serene riverbanks, certified by AIMS for global qualification.',
    highlights: [
      'Certified AIMS Half-Marathon course',
      'Scenic Ganga Riverbank fast asphalt strip',
      '8 aid stations with electrolyte fluids, oranges & medical support',
      'Designated pace groups with energetic pacer leaders',
    ],
    perks: ['AIMS Timing Certificate', 'Luxury Heavyweight Cast Finisher Medal', 'Eco-Poly Technical Race Jersey', 'Physiotherapy & Ice Bath Access'],
  },
  {
    code: '42k',
    dist: '42.2',
    unit: 'KM',
    name: 'Full Marathon',
    label: '42.2KM Full Marathon',
    fee: 1799,
    color: '#B39DEB',
    flag: '5:00 AM',
    cut: '11:30 AM',
    age: '18+ yrs',
    skill: 'Advanced',
    qual: true,
    elevationGain: 'Varied (86m)',
    startPoint: 'Gandhi Maidan Gate 1',
    finishPoint: 'Gandhi Maidan Main Stage',
    description: 'The ultimate royal endurance challenge of Bihar. Requires a verified prior half or full marathon finish certificate to register.',
    highlights: [
      'Full metropolitan Patna & Riverway grand circuit',
      'Dedicated cycling marshals and paramedical escort',
      'Timing mats at 5K, 10K, 21.1K, 30K, 35K, 40K, and 42.2K',
      'Extensive recovery lounge with licensed physiotherapists',
    ],
    perks: ['Distinguished 42K Finisher Parka / Jacket', 'Gold-plated Edition 2027 Medal', 'Official World Athletics & AFI listing', 'VIP Post-Race Hospitality Lounge'],
  },
  {
    code: '50k',
    dist: '50',
    unit: 'KM',
    name: 'Ultra Marathon',
    label: '50KM Ultra Marathon',
    fee: 2499,
    color: '#E58B6D',
    flag: '1:30 AM',
    cut: '10:30 AM',
    age: '21+ yrs',
    skill: 'Elite only',
    qual: true,
    soon: true,
    elevationGain: 'Tough (110m)',
    startPoint: 'Gandhi Maidan Gate 1',
    finishPoint: 'Gandhi Maidan Main Stage',
    description: 'Midnight flag-off ultra race testing mental fortitude and ultra-distance athleticism under starry Patna skies.',
    highlights: [
      'Night-into-dawn multi-district epic challenge',
      'Mandatory hydration vest and illuminated night beacon',
      'Ultra drop-bag checkpoint stations at KM 25 and KM 38',
      'Pre-race elite medical clearance required',
    ],
    perks: ['Custom Ultra Finisher Belt Buckle', 'High-Visibility Ultra Windbreaker', 'Complimentary Sports Recovery Protocol', 'Lifetime Pride Patna Marathon Ultra Roster Induction'],
  },
  {
    code: 'virtual',
    dist: 'ANY',
    unit: 'WHERE',
    name: 'Virtual Run',
    label: 'Virtual Run',
    fee: 399,
    color: '#CFC6B4',
    flag: 'Anytime',
    cut: 'Race weekend',
    age: 'Open',
    skill: 'Everyone',
    qual: false,
    description: 'Run anywhere in the world on race weekend! Sync your Strava, Garmin, or Apple Watch activity to claim your official medal and bib by post.',
    highlights: [
      'Run in your own city, park, or treadmill anywhere worldwide',
      'Connect Strava / Garmin / Nike Run Club screenshot upload',
      'Official finisher kit shipped directly to your doorstep',
      'Virtual finisher leaderboard and global social wall',
    ],
    perks: ['Plantable Seed Bib sent by post', 'Home Delivered Official Finisher Medal', 'Digital Verified Certificate', 'Official E-Badge for social media'],
  },
];

export const HOST_CITIES = ['Patna, Bihar', 'Gaya, Bihar', 'Muzaffarpur, Bihar', 'Bhagalpur, Bihar'];

export const TSHIRT_SIZES = [
  { s: 'XS', chest: '34"' },
  { s: 'S', chest: '36"' },
  { s: 'M', chest: '38"' },
  { s: 'L', chest: '40"' },
  { s: 'XL', chest: '42"' },
  { s: 'XXL', chest: '44"' },
  { s: '3XL', chest: '46"' },
];

export const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

export const PARTNER_TIERS: PartnerTier[] = [
  { tier: 'Title Partner', big: true, names: ['FitLife India'] },
  { tier: 'Driven By', names: ['Mahindra Electric', 'TATA Power'] },
  { tier: 'Hydration Partners', names: ['AquaFuel', 'Gatorade India'] },
  { tier: 'Quick Commerce & Logistics', names: ['Blinkit', 'Zepto'] },
  { tier: 'Wellness & Medical Safety', names: ['Apollo Health', 'Dabur'] },
  { tier: 'Media Partners', names: ['Hindustan', 'Times of India Digital', 'Bihar Live TV'] },
  { tier: 'Footwear & Timing Technology', names: ['RunPro Gear', 'ChipTrack'] },
];

export const SUSTAINABILITY_STATS = [
  { num: '50K+', desc: 'Runners expected', tone: 'gold' },
  { num: '06', desc: 'Race categories', tone: 'flame' },
  { num: '04', desc: 'Host cities across Bihar', tone: 'cobalt' },
  { num: '98%', desc: 'Verified finisher rate', tone: 'mint' },
  { num: '15,000+', desc: 'Saplings planted across Bihar', tone: 'mint' },
  { num: '4.2 T', desc: 'Organic waste composted', tone: 'cobalt' },
  { num: '0 kg', desc: 'Single-use plastic on route', tone: 'flame' },
  { num: '30,000', desc: 'Community runners so far', tone: 'gold' },
];

export const GREEN_PLEDGES = [
  'Plantable seed bibs — your bib contains wildflower seeds that grow into a sapling',
  'Finisher tees manufactured from 100% recycled ocean & post-consumer plastic',
  'Strict zero single-use plastic policy across the entire racecourse and stadium',
  '100% compostable aid-station cups and banana-peel collection stations',
  'Carbon offset achieved through verified community sapling distribution drives',
];

export const TIMELINE = [
  { year: '2018', text: 'Pride Patna Marathon is founded in Patna as an events & community experiences enterprise.' },
  { year: '2020', text: 'First community 5K along the Ganga riverfront — 500 enthusiastic runners turn up.' },
  { year: '2022', text: '21K Half Marathon inaugurated. AIMS-certified course with over 5,000+ participants.' },
  { year: '2024', text: 'Zero-waste race policy officially adopted. 15,000 saplings planted through runner pledges.' },
  { year: '2027', text: 'Pride Patna Marathon Edition 2027: 50,000 runners, 4 cities, 6 race categories. The movement soars.' },
];

export const ORGANIZER_CREDENTIALS = [
  { title: 'Pride Patna Marathon', desc: 'Race director — administrative permits, logistics, runner experience & zero-waste mandate' },
  { title: 'Bihar Striders Running Club', desc: 'Technical partner — course safety, timing mat logistics & pace teams' },
  { title: 'AFI & AIMS Certified', desc: 'Athletics Federation of India + Association of International Marathons & Distance Races' },
];

export const TRANSIT_OPTIONS = [
  { icon: 'TrainFront', title: 'By Rail', text: 'Patna Junction is just 1.2 km from Gandhi Maidan. Pre-book autos or hop onto official race shuttles.' },
  { icon: 'Bus', title: 'By Bus', text: 'Patna Bus Terminal (Bankipore) is 2 km away. Free race-day shuttle departures start from 3:00 AM.' },
  { icon: 'SquareParking', title: 'Parking', text: 'Official runner parking at Gandhi Maidan East Lot — gates open 2:00 AM. Carpooling is encouraged.' },
];

export const FAQ_CATEGORIES: FAQCategory[] = [
  {
    category: 'Registration',
    items: [
      {
        q: 'Can I register on race day at the venue?',
        a: 'No. All registrations must be completed online prior to the registration close date. Walk-in entries are strictly unavailable on race day to ensure bib timing programming and safety logistics.',
      },
      {
        q: 'Can I transfer my bib to someone else?',
        a: 'No. Bib transfers are strictly prohibited. Running under another person’s registration results in immediate disqualification and a lifetime ban from all Pride Patna Marathon events.',
      },
      {
        q: 'Is there an age limit or qualification certificate needed for the 50K Ultra and 42K?',
        a: 'Yes. For 42.2K and 50K Ultra, runners must be 18+ (21+ for Ultra) and provide an authentic prior half or full marathon timing certificate (under 5 hours) during registration.',
      },
      {
        q: 'What payment methods are supported?',
        a: 'We support UPI (GPay, PhonePe, Paytm, BHIM), Net Banking across all Indian banks, and Credit/Debit cards with 256-bit SSL encryption.',
      },
    ],
  },
  {
    category: 'Race Day & Logistics',
    items: [
      {
        q: 'What time should I arrive at Gandhi Maidan?',
        a: 'Plan to arrive at least 45 minutes before your specific category flag-off. For the 50K Ultra (1:30 AM), runners must be in the holding corral by 1:00 AM. Secure baggage counters open at 4:00 AM.',
      },
      {
        q: 'Where can I park my vehicle?',
        a: 'Dedicated runner parking is available at the Gandhi Maidan East Lot and designated riverside zones. Public transit and carpooling are strongly encouraged.',
      },
      {
        q: 'What happens if I need to drop out mid-race?',
        a: 'Inform any course marshal or medical staff at the nearest aid station immediately. Dedicated sweep vehicles will safely transport you back to the finish village, and your last checkpoint time will be recorded.',
      },
      {
        q: 'Are earphones or headphones allowed on the route?',
        a: 'Single-ear headphones at low volume are permitted for 5K and 10K. For 21.1K and 42.2K, they are discouraged so runners can clearly hear traffic marshals and ambulance sirens on public roads.',
      },
    ],
  },
  {
    category: 'Medical & Safety',
    items: [
      {
        q: 'What medical support is stationed on the course?',
        a: 'Full medical teams by Apollo Health operate at KM 7 and KM 14 on the 21K route, mobile ambulances patrol every 3K, first-aid trained volunteers are at every hydration point, and a physio tent is at the finish.',
      },
      {
        q: 'I have a pre-existing medical condition — can I run?',
        a: 'Please consult your doctor first, particularly for cardiac, respiratory, or hypertensive histories. Declare all conditions during your registration form and carry necessary prescribed inhalers or medicines.',
      },
      {
        q: 'What should I do if I feel dizzy, overheated, or experience chest tightness?',
        a: 'Stop running immediately and signal the nearest volunteer or runner. Never push through severe chest pain, extreme disorientation, or signs of heat exhaustion.',
      },
    ],
  },
  {
    category: 'Cancellations & Deferrals',
    items: [
      {
        q: 'Can I obtain a refund if I need to cancel my bib?',
        a: 'More than 30 days before race day: 70% refund. Between 15–30 days: 40% refund. Within 14 days of the race: no refunds are processed due to personalized bib and kit production.',
      },
      {
        q: 'Can I defer my entry to the next edition?',
        a: 'A one-time deferral to the following year is available for medical emergencies upon submitting a medical practitioner’s certificate at least 7 days before race day.',
      },
    ],
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'city-streets-green-miles',
    title: 'From City Streets to Green Miles: The Patna Running Revolution',
    tag: 'Community',
    date: 'Sep 24, 2026',
    readTime: '4 min read',
    tone: '#7DC2A5',
    image: '/images/sunrise-runners.jpg',
    excerpt: 'How every morning run creates an undeniable ripple effect — stronger civic health, deeper human bonds, and a shared commitment to a cleaner Bihar.',
    content: [
      'The movement grows one stride at a time. What begins as an individual personal challenge before dawn on the Ganges riverfront quickly transforms into a shared civic promise: to run with purpose and leave behind a cleaner city.',
      'Community-led marathons are uniquely potent because they turn sustainability into an immediate reality. When tens of thousands of athletes wear plantable seed bibs, drink from compostable stations, and run alongside zero single-use plastic, the message resonates across the state.',
      'The most transformative sports campaigns don’t just reward the fastest elite runners; they create a festival where first-timers, veteran masters, and youth run shoulder-to-shoulder with unyielding pride in Patna.',
    ],
  },
  {
    slug: 'sustainable-race-kits',
    title: 'Why Sustainable Race Kits Matter More Than Ever',
    tag: 'Sustainability',
    date: 'Sep 12, 2026',
    readTime: '5 min read',
    tone: '#DDB46B',
    image: '/images/stairs-training.jpg',
    excerpt: 'Behind the engineering of plantable seed bibs, recycled poly performance fabrics, and zero-waste aid zones at Pride Patna Marathon.',
    content: [
      'Traditional mass-participation sporting events generate tons of single-use disposable plastics, discarded bib pins, and non-biodegradable promotional swag. At Pride Patna Marathon, we decided to change the paradigm from the ground up.',
      'Each Edition 2027 bib is embedded with native organic wildflower seeds. After completing your race, instead of tossing the bib into a drawer, runners can plant it in soil, water it, and watch vibrant flora sprout as a living memory of their accomplishment.',
      'Furthermore, our high-wicking technical race jerseys are crafted entirely from recycled ocean plastics and discarded consumer bottles, demonstrating that elite athletic apparel can coexist with rigorous environmental stewardship.',
    ],
  },
  {
    slug: 'fueling-for-the-half-marathon',
    title: 'The Blueprint: Pacing and Nutrition for 21.1K Success',
    tag: 'Training',
    date: 'Aug 28, 2026',
    readTime: '6 min read',
    tone: '#8FA8E0',
    image: '/images/road-stride.jpg',
    excerpt: 'Mastering the negative-split strategy, hydration intervals along the riverbank, and mental focus for race morning at Gandhi Maidan.',
    content: [
      'Running 21.1 kilometers is an art of patience. The adrenaline rush at the Gandhi Maidan start line under the floodlights tempts almost every runner to sprint the first two kilometers. The champions know that the real race begins after KM 14.',
      'Aim for a consistent, measured rhythm through the Golghar heritage loop. Take small sips of electrolyte water at every other aid station rather than gulping down copious amounts at once.',
      'When you turn onto the final stretch alongside the Ganga Riverway, trust the training blocks you logged in the winter mornings. Keep your chest tall, relax your shoulders, and let the cheering crowds carry you across the finish arch.',
    ],
  },
];
