export interface RaceCategory {
  code: string;
  dist: string;
  unit: string;
  name: string;
  label: string;
  fee: number;
  color: string;
  flag: string;
  cut: string;
  age: string;
  skill: string;
  qual: boolean;
  soon?: boolean;
  elevationGain?: string;
  startPoint?: string;
  finishPoint?: string;
  description: string;
  highlights: string[];
  perks: string[];
}

export interface RegistrationRecord {
  id: string;
  bibNumber: string;
  category: string;
  fullName: string;
  email: string;
  phone: string;
  gender: string;
  age: number;
  tshirtSize: string;
  bloodGroup: string;
  city: string;
  emergencyName: string;
  emergencyPhone: string;
  medicalConditions?: string;
  qualifyingCertUrl?: string;
  paymentMethod: string;
  paymentStatus: 'PAID' | 'PENDING' | 'EXEMPT';
  amount: number;
  registeredAt: string;
}

export interface PartnerTier {
  tier: string;
  big?: boolean;
  names: string[];
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface FAQCategory {
  category: string;
  items: FAQItem[];
}

export interface BlogPost {
  slug: string;
  title: string;
  tag: string;
  date: string;
  readTime: string;
  tone: string;
  image: string;
  excerpt: string;
  content: string[];
}
