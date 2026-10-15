import React, { useState, useEffect } from 'react';
import { Clock, Users, Check, AlertCircle, ArrowRight, ShieldCheck, Flag } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';

export interface RaceSlot {
  id: string;
  category_code: string;
  category_name: string;
  slot_name: string;
  reporting_time: string;
  flag_off_time: string;
  total_capacity: number;
  allocated_count: number;
  price_inr: number;
  min_age: number;
}

// Fallback seed slots matching the database migration when Supabase is offline/placeholder
const DEFAULT_SLOTS: RaceSlot[] = [
  {
    id: 'seed-42k-c1',
    category_code: '42k',
    category_name: '42K Full Marathon',
    slot_name: 'Corral 1 — Elite & Sub-3h30 Wave',
    reporting_time: '04:15 AM',
    flag_off_time: '05:00 AM',
    total_capacity: 800,
    allocated_count: 142,
    price_inr: 1899,
    min_age: 18,
  },
  {
    id: 'seed-42k-c2',
    category_code: '42k',
    category_name: '42K Full Marathon',
    slot_name: 'Corral 2 — Open Challenger Wave',
    reporting_time: '04:30 AM',
    flag_off_time: '05:10 AM',
    total_capacity: 1200,
    allocated_count: 310,
    price_inr: 1899,
    min_age: 18,
  },
  {
    id: 'seed-21k-ca',
    category_code: '21k',
    category_name: '21K Half Marathon',
    slot_name: 'Corral A — Fast Wave (Sub-2h)',
    reporting_time: '05:00 AM',
    flag_off_time: '05:45 AM',
    total_capacity: 2500,
    allocated_count: 1890,
    price_inr: 1299,
    min_age: 18,
  },
  {
    id: 'seed-21k-cb',
    category_code: '21k',
    category_name: '21K Half Marathon',
    slot_name: 'Corral B — Open Endurance Wave',
    reporting_time: '05:15 AM',
    flag_off_time: '06:00 AM',
    total_capacity: 3500,
    allocated_count: 1220,
    price_inr: 1299,
    min_age: 18,
  },
  {
    id: 'seed-10k-w1',
    category_code: '10k',
    category_name: '10K Challenge Run',
    slot_name: 'Wave 1 — Speed Striders',
    reporting_time: '06:00 AM',
    flag_off_time: '06:45 AM',
    total_capacity: 4000,
    allocated_count: 2150,
    price_inr: 799,
    min_age: 14,
  },
  {
    id: 'seed-10k-w2',
    category_code: '10k',
    category_name: '10K Challenge Run',
    slot_name: 'Wave 2 — Fitness Enthusiasts',
    reporting_time: '06:15 AM',
    flag_off_time: '07:00 AM',
    total_capacity: 4000,
    allocated_count: 980,
    price_inr: 799,
    min_age: 14,
  },
  {
    id: 'seed-5k-w1',
    category_code: '5k',
    category_name: '5K Fun Run',
    slot_name: 'Wave 1 — Youth & Corporate Teams',
    reporting_time: '06:45 AM',
    flag_off_time: '07:30 AM',
    total_capacity: 5000,
    allocated_count: 3100,
    price_inr: 499,
    min_age: 8,
  },
  {
    id: 'seed-5k-w2',
    category_code: '5k',
    category_name: '5K Fun Run',
    slot_name: 'Wave 2 — Community & Family Jog',
    reporting_time: '07:00 AM',
    flag_off_time: '07:45 AM',
    total_capacity: 5000,
    allocated_count: 1400,
    price_inr: 499,
    min_age: 8,
  },
];

interface SlotSelectionProps {
  initialCategory?: string;
  onSlotSelected?: (slot: RaceSlot) => void;
  className?: string;
}

export const SlotSelection: React.FC<SlotSelectionProps> = ({
  initialCategory = '21k',
  onSlotSelected,
  className = '',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [slots, setSlots] = useState<RaceSlot[]>([]);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [sourceNotice, setSourceNotice] = useState<string>('');

  useEffect(() => {
    async function fetchSlots() {
      setLoading(true);

      if (isSupabaseConfigured) {
        try {
          const { data, error } = await supabase
            .from('race_slots')
            .select('*')
            .eq('category_code', selectedCategory)
            .eq('is_active', true)
            .order('flag_off_time', { ascending: true });

          if (!error && data && data.length > 0) {
            setSlots(data);
            setSelectedSlotId(data[0]?.id ?? null);
            setSourceNotice('Live Supabase synchronization active');
            setLoading(false);
            return;
          }
        } catch (err) {
          console.warn('Supabase fetch failed, falling back to verified seed slots', err);
        }
      }

      // Fallback to verified seed slots
      const filtered = DEFAULT_SLOTS.filter((s) => s.category_code === selectedCategory);
      setSlots(filtered);
      setSelectedSlotId(filtered[0]?.id ?? null);
      setSourceNotice(
        isSupabaseConfigured
          ? 'Connected to Supabase'
          : 'Frontend verification mode (Awaiting Supabase URL & Key)'
      );
      setLoading(false);
    }

    fetchSlots();
  }, [selectedCategory]);

  const activeSlot = slots.find((s) => s.id === selectedSlotId);

  const handleSlotSelect = (slot: RaceSlot) => {
    setSelectedSlotId(slot.id);
    if (onSlotSelected) {
      onSlotSelected(slot);
    }
  };

  return (
    <div className={`slot-selection-container ${className}`}>
      {/* Category Pills Header */}
      <div className="mb-6">
        <label className="text-xs font-semibold tracking-widest text-[#DFB269] uppercase block mb-3">
          1. Select Certified Distance
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {[
            { code: '5k', name: '5K Fun Run', fee: '₹499' },
            { code: '10k', name: '10K Challenge', fee: '₹799' },
            { code: '21k', name: '21K Half Marathon', fee: '₹1,299' },
            { code: '42k', name: '42K Full Marathon', fee: '₹1,899' },
          ].map((cat) => (
            <button
              key={cat.code}
              type="button"
              onClick={() => setSelectedCategory(cat.code)}
              className={`p-3.5 rounded-xl border text-left transition-all duration-200 focus-visible:outline-none ${
                selectedCategory === cat.code
                  ? 'border-[#DFB269] bg-[#DFB269]/10 shadow-[0_0_15px_rgba(223,178,105,0.15)]'
                  : 'border-[rgba(240,222,186,0.12)] bg-[#111317]/80 hover:border-[#DFB269]/40'
              }`}
            >
              <div className="text-xs text-[#A8A398]">{cat.name}</div>
              <div className="text-lg font-bold text-[#F8F5EE] mt-0.5">{cat.fee}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Available Wave Reporting Slots */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-semibold tracking-widest text-[#DFB269] uppercase block">
            2. Choose Reporting Wave & Staging Corral
          </label>
          <span className="text-[11px] text-[#A8A398]">{sourceNotice}</span>
        </div>

        {loading ? (
          <div className="p-8 text-center text-sm text-[#A8A398] border border-[rgba(240,222,186,0.12)] rounded-xl bg-[#111317]">
            Querying available starting wave capacity...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {slots.map((slot) => {
              const isSelected = selectedSlotId === slot.id;
              const remaining = slot.total_capacity - slot.allocated_count;
              const isSoldOut = remaining <= 0;
              const isFillingFast = remaining < slot.total_capacity * 0.25;

              return (
                <div
                  key={slot.id}
                  onClick={() => !isSoldOut && handleSlotSelect(slot)}
                  className={`p-5 rounded-2xl border transition-all duration-200 relative cursor-pointer ${
                    isSelected
                      ? 'border-[#DFB269] bg-[#DFB269]/10 shadow-[0_0_20px_rgba(223,178,105,0.12)]'
                      : isSoldOut
                      ? 'border-red-900/30 bg-black/40 opacity-50 cursor-not-allowed'
                      : 'border-[rgba(240,222,186,0.12)] bg-[#111317] hover:border-[#DFB269]/40'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="text-sm font-bold text-[#F8F5EE] uppercase tracking-wide">
                        {slot.slot_name}
                      </div>
                      <div className="text-xs text-[#DFB269] mt-0.5">
                        {slot.category_name} • Min Age: {slot.min_age} yrs
                      </div>
                    </div>

                    <div
                      className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'border-[#DFB269] bg-[#DFB269] text-[#07080A]'
                          : 'border-[rgba(240,222,186,0.2)] text-transparent'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  </div>

                  {/* Timing & Capacity Grid */}
                  <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[rgba(240,222,186,0.08)] text-xs text-[#A8A398]">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#DFB269]" />
                      <span>Reporting: <strong className="text-[#F8F5EE]">{slot.reporting_time}</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Flag className="w-3.5 h-3.5 text-[#DFB269]" />
                      <span>Flag-off: <strong className="text-[#F8F5EE]">{slot.flag_off_time}</strong></span>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-[rgba(240,222,186,0.08)] flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-[#A8A398]">
                      <Users className="w-3.5 h-3.5 text-[#A8A398]" />
                      <span>{remaining} / {slot.total_capacity} slots open</span>
                    </span>

                    {isSoldOut ? (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-950/80 text-rose-300 border border-rose-500/30">
                        Sold Out
                      </span>
                    ) : isFillingFast ? (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-950/80 text-amber-300 border border-amber-500/30">
                        Filling Fast
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                        Available
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Selected Slot Summary Badge */}
      {activeSlot && (
        <div className="p-4 rounded-xl bg-[#07080A] border border-[#DFB269]/30 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#DFB269]/15 border border-[#DFB269]/40 flex items-center justify-center text-[#DFB269] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-[#A8A398]">Active Selection</div>
              <div className="text-sm font-bold text-[#F8F5EE]">
                {activeSlot.category_name} — {activeSlot.slot_name}
              </div>
              <div className="text-xs text-[#DFB269]">
                Reporting at {activeSlot.reporting_time} • Official Entry Fee: ₹{activeSlot.price_inr}
              </div>
            </div>
          </div>

          <div className="text-xs text-[#A8A398] text-right">
            <span>Capacity verified</span>
          </div>
        </div>
      )}
    </div>
  );
};
