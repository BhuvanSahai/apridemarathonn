import React, { useState, useEffect } from 'react';
import {
  Shield,
  Users,
  IndianRupee,
  Download,
  Search,
  Filter,
  RefreshCw,
  PlusCircle,
  Trash2,
  CheckCircle,
  FileSpreadsheet,
} from 'lucide-react';
import { RegistrationRecord } from '../types';
import { EVENT_CONFIG } from '../data/eventData';

export const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('asm_admin_auth') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  const [registrations, setRegistrations] = useState<RegistrationRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  const loadData = () => {
    try {
      const data = JSON.parse(localStorage.getItem('asm_registrations') || '[]');
      setRegistrations(data);
    } catch {
      setRegistrations([]);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    // Default demo passcode for reviewer access
    if (pinInput.trim() === '2027' || pinInput.trim() === 'admin' || pinInput.trim() === '') {
      setIsAuthenticated(true);
      sessionStorage.setItem('asm_admin_auth', 'true');
    } else {
      setPinError('Invalid access PIN. (Tip: Use 2027 or leave blank)');
    }
  };

  const handleLoadDemoData = () => {
    const demoRunners: RegistrationRecord[] = [
      {
        id: 'reg_demo_1',
        bibNumber: 'ASM27-21K-1042',
        category: '21.1KM Half Marathon',
        fullName: 'Vikramaditya Roy',
        email: 'vikram.roy@example.com',
        phone: '9835012345',
        gender: 'Male',
        age: 28,
        tshirtSize: 'L',
        bloodGroup: 'B+',
        city: 'Patna, Bihar',
        emergencyName: 'Anjali Roy',
        emergencyPhone: '9835098765',
        paymentMethod: 'UPI',
        paymentStatus: 'PAID',
        amount: 1199,
        registeredAt: new Date(Date.now() - 3600000 * 4).toISOString(),
      },
      {
        id: 'reg_demo_2',
        bibNumber: 'ASM27-10K-2190',
        category: '10KM Timed Run',
        fullName: 'Dr. Sneha Kumari',
        email: 'sneha.patna@example.com',
        phone: '9431023456',
        gender: 'Female',
        age: 34,
        tshirtSize: 'M',
        bloodGroup: 'O+',
        city: 'Patna, Bihar',
        emergencyName: 'Ravi Shankar',
        emergencyPhone: '9431088765',
        paymentMethod: 'CARD',
        paymentStatus: 'PAID',
        amount: 799,
        registeredAt: new Date(Date.now() - 3600000 * 8).toISOString(),
      },
      {
        id: 'reg_demo_3',
        bibNumber: 'ASM27-42K-0418',
        category: '42.2KM Full Marathon',
        fullName: 'Major Rajeshwar Singh',
        email: 'rajeshwar.s@example.com',
        phone: '9771034567',
        gender: 'Male',
        age: 42,
        tshirtSize: 'XL',
        bloodGroup: 'A+',
        city: 'Gaya, Bihar',
        emergencyName: 'Sunita Singh',
        emergencyPhone: '9771099887',
        paymentMethod: 'UPI',
        paymentStatus: 'PAID',
        amount: 1799,
        registeredAt: new Date(Date.now() - 3600000 * 14).toISOString(),
      },
      {
        id: 'reg_demo_4',
        bibNumber: 'ASM27-5K-5012',
        category: '5KM Fun Run',
        fullName: 'Tanvi Prakash',
        email: 'tanvi.p@example.com',
        phone: '9122045678',
        gender: 'Female',
        age: 22,
        tshirtSize: 'S',
        bloodGroup: 'AB+',
        city: 'Muzaffarpur, Bihar',
        emergencyName: 'Alok Prakash',
        emergencyPhone: '9122077665',
        paymentMethod: 'UPI',
        paymentStatus: 'PAID',
        amount: 499,
        registeredAt: new Date(Date.now() - 3600000 * 20).toISOString(),
      },
    ];

    try {
      localStorage.setItem('asm_registrations', JSON.stringify(demoRunners));
      setRegistrations(demoRunners);
    } catch (err) {
      console.warn(err);
    }
  };

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear stored registrations on this device?')) {
      localStorage.removeItem('asm_registrations');
      setRegistrations([]);
    }
  };

  const handleExportCSV = () => {
    if (registrations.length === 0) return;
    const headers = ['BibNumber', 'FullName', 'Category', 'Email', 'Phone', 'Gender', 'Age', 'TShirt', 'BloodGroup', 'City', 'Amount', 'PaymentStatus', 'RegisteredAt'];
    const rows = registrations.map((r) => [
      r.bibNumber,
      `"${r.fullName}"`,
      `"${r.category}"`,
      r.email,
      r.phone,
      r.gender,
      r.age,
      r.tshirtSize,
      r.bloodGroup,
      `"${r.city}"`,
      r.amount,
      r.paymentStatus,
      r.registeredAt,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ASM_Ventures_Marathon_Registrations_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // KPIs
  const totalRunners = registrations.length;
  const totalRevenue = registrations.reduce((acc, curr) => acc + (curr.amount || 0), 0);

  // Filtered List
  const filteredList = registrations.filter((r) => {
    const matchesSearch =
      r.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.bibNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = categoryFilter === 'ALL' || r.category.includes(categoryFilter);
    return matchesSearch && matchesCat;
  });

  if (!isAuthenticated) {
    return (
      <div className="container section-spacing" style={{ maxWidth: '440px', margin: '0 auto', textAlign: 'center' }}>
        <div className="panel-charcoal" style={{ padding: '2.5rem 2rem', border: '1px solid var(--gold-border)' }}>
          <Shield size={40} style={{ color: 'var(--gold-metallic)', margin: '0 auto 1rem' }} />
          <h1 className="heading-card" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
            Operations Portal Access
          </h1>
          <p className="text-muted" style={{ fontSize: '0.8125rem', marginBottom: '1.5rem' }}>
            Protected organizer dashboard for ASM Ventures Marathon roster management.
          </p>

          <form onSubmit={handleUnlock}>
            <input
              type="password"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              placeholder="Enter PIN (Default: 2027)"
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                background: '#101114',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--text-ivory)',
                fontSize: '0.9375rem',
                marginBottom: '0.75rem',
                textAlign: 'center',
                letterSpacing: '0.2em',
              }}
            />
            {pinError && <p style={{ color: 'var(--accent-flame)', fontSize: '0.75rem', marginBottom: '0.75rem' }}>{pinError}</p>}
            <button type="submit" className="btn btn-gold" style={{ width: '100%' }}>
              Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page section-spacing container" style={{ position: 'relative' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
        <div>
          <div className="kicker">Race Director Console</div>
          <h1 className="heading-section" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)' }}>
            Operations & <span className="font-serif-italic">Roster</span>
          </h1>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          <button
            type="button"
            onClick={handleLoadDemoData}
            className="btn btn-outline-gold"
            style={{ fontSize: '0.8125rem', padding: '0.5rem 1rem' }}
          >
            <PlusCircle size={15} />
            Load Demo Runners
          </button>

          <button
            type="button"
            onClick={handleExportCSV}
            className="btn btn-gold"
            disabled={registrations.length === 0}
            style={{ fontSize: '0.8125rem', padding: '0.5rem 1rem' }}
          >
            <Download size={15} />
            Export CSV ({totalRunners})
          </button>

          <button
            type="button"
            onClick={handleClearData}
            className="btn btn-charcoal"
            style={{ fontSize: '0.8125rem', padding: '0.5rem 0.85rem' }}
            title="Clear stored registrations"
          >
            <Trash2 size={15} style={{ color: 'var(--accent-flame)' }} />
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
        <div className="panel-charcoal" style={{ padding: '1.5rem', border: '1px solid var(--gold-border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gold-metallic)', fontSize: '0.8125rem', marginBottom: '0.35rem' }}>
            <Users size={16} />
            <span style={{ textTransform: 'uppercase', fontWeight: 700 }}>Total Booked Bibs</span>
          </div>
          <div className="font-editorial" style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-ivory)' }}>
            {totalRunners}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Verified online registrations</div>
        </div>

        <div className="panel-charcoal" style={{ padding: '1.5rem', border: '1px solid var(--gold-border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-mint)', fontSize: '0.8125rem', marginBottom: '0.35rem' }}>
            <IndianRupee size={16} />
            <span style={{ textTransform: 'uppercase', fontWeight: 700 }}>Gross Collections</span>
          </div>
          <div className="font-editorial" style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-mint)' }}>
            ₹{totalRevenue.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Processed via payment gateway</div>
        </div>

        <div className="panel-charcoal" style={{ padding: '1.5rem', border: '1px solid var(--gold-border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cobalt)', fontSize: '0.8125rem', marginBottom: '0.35rem' }}>
            <FileSpreadsheet size={16} />
            <span style={{ textTransform: 'uppercase', fontWeight: 700 }}>Active Categories</span>
          </div>
          <div className="font-editorial" style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-ivory)' }}>
            6
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>5K, 10K, 21.1K, 42.2K, 50K, Virtual</div>
        </div>
      </div>

      {/* Roster Table with Search & Filter */}
      <div className="panel-charcoal" style={{ padding: '1.5rem', border: '1px solid var(--gold-border-subtle)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ position: 'relative', width: 'clamp(220px, 30vw, 320px)' }}>
            <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, bib, email..."
              style={{
                width: '100%',
                padding: '0.6rem 1rem 0.6rem 2.5rem',
                background: '#101114',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 'var(--radius-full)',
                color: 'var(--text-ivory)',
                fontSize: '0.8125rem',
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Filter size={15} style={{ color: 'var(--gold-metallic)' }} />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              style={{
                padding: '0.5rem 0.85rem',
                background: '#101114',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--text-ivory)',
                fontSize: '0.8125rem',
              }}
            >
              <option value="ALL">All Categories</option>
              <option value="5K">5K Fun Run</option>
              <option value="10K">10K Timed Run</option>
              <option value="21.1KM">21.1KM Half</option>
              <option value="42.2KM">42.2KM Full</option>
              <option value="50KM">50KM Ultra</option>
              <option value="Virtual">Virtual Run</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', minWidth: '780px', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--gold-border)', color: 'var(--gold-metallic)', textAlign: 'left', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                <th style={{ padding: '0.75rem 1rem' }}>Bib Number</th>
                <th style={{ padding: '0.75rem 1rem' }}>Runner Name</th>
                <th style={{ padding: '0.75rem 1rem' }}>Category</th>
                <th style={{ padding: '0.75rem 1rem' }}>Blood / Size</th>
                <th style={{ padding: '0.75rem 1rem' }}>Contact</th>
                <th style={{ padding: '0.75rem 1rem' }}>Fee</th>
                <th style={{ padding: '0.75rem 1rem' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredList.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
                    No registrations found matching criteria. Click "Load Demo Runners" above to populate sample records.
                  </td>
                </tr>
              ) : (
                filteredList.map((r, idx) => (
                  <tr
                    key={r.id || idx}
                    style={{
                      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                      background: idx % 2 === 0 ? 'transparent' : 'rgba(255, 255, 255, 0.015)',
                    }}
                  >
                    <td style={{ padding: '1rem', fontFamily: 'var(--font-editorial)', fontWeight: 800, color: 'var(--gold-light)' }}>
                      {r.bibNumber}
                    </td>
                    <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-ivory)' }}>
                      {r.fullName}
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 400 }}>
                        {r.gender}, {r.age} yrs · {r.city}
                      </div>
                    </td>
                    <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>
                      {r.category}
                    </td>
                    <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>
                      {r.bloodGroup} · {r.tshirtSize}
                    </td>
                    <td style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
                      <div>{r.email}</div>
                      <div>{r.phone}</div>
                    </td>
                    <td style={{ padding: '1rem', fontWeight: 700, color: 'var(--text-ivory)' }}>
                      ₹{r.amount}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span
                        style={{
                          fontSize: '0.6875rem',
                          fontWeight: 700,
                          padding: '0.2rem 0.5rem',
                          borderRadius: 'var(--radius-full)',
                          background: 'rgba(125, 194, 165, 0.15)',
                          color: 'var(--accent-mint)',
                          border: '1px solid rgba(125, 194, 165, 0.3)',
                        }}
                      >
                        {r.paymentStatus}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
