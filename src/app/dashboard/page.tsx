'use client';
import { useState, useEffect } from 'react';
import styles from './page.module.css';
import Link from 'next/link';
import Image from 'next/image';

// Default mock bookings to display if none are created yet
const mockDefaultBookings = [
  {
    id: "HS-MOCK-1",
    serviceId: "1",
    serviceName: "Deep Home Cleaning",
    price: "₹120",
    totalPrice: "₹132",
    date: "Tomorrow",
    time: "11:00 AM",
    customerName: "Sandy",
    mobile: "+91 98765 43210",
    address: "123 Green Glen Layout, Outer Ring Road, Bangalore",
    status: 'Scheduled',
    category: 'cleaning',
    createdAt: new Date().toISOString()
  },
  {
    id: "HS-MOCK-2",
    serviceId: "2",
    serviceName: "Sofa Cleaning",
    price: "₹40",
    totalPrice: "₹52",
    date: "Last Week",
    time: "02:00 PM",
    customerName: "Sandy",
    mobile: "+91 98765 43210",
    address: "123 Green Glen Layout, Outer Ring Road, Bangalore",
    status: 'Completed',
    category: 'cleaning',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  }
];

// Profile fallback default
const defaultProfile = {
  fullName: 'Sandy',
  mobileNumber: '+91 98765 43210',
  address: '123 Green Glen Layout, Outer Ring Road, Bangalore'
};

const professionalsData = [
  {
    id: 1,
    name: "Rahul Sharma",
    profession: "Home Cleaning Expert",
    category: "cleaning",
    image: "/images/prof_cleaning.png",
    rating: 4.9,
    experience: "5+ Years",
    jobsCompleted: 1450,
  },
  {
    id: 3,
    name: "Amit Kumar",
    profession: "Senior Appliance Technician",
    category: "repair",
    image: "/images/prof_repair.png",
    rating: 4.8,
    experience: "8 Years",
    jobsCompleted: 2100,
  },
  {
    id: 2,
    name: "Priya Patel",
    profession: "Salon & Beauty Stylist",
    category: "salon",
    image: "/images/prof_salon.png",
    rating: 4.95,
    experience: "6 Years",
    jobsCompleted: 980,
  }
];

interface Booking {
  id: string;
  serviceId: string;
  serviceName: string;
  price: string;
  totalPrice: string;
  date: string;
  time: string;
  customerName: string;
  mobile: string;
  address: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  category: string;
  createdAt: string;
}

interface UserProfile {
  fullName: string;
  mobileNumber: string;
  address: string;
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'partners' | 'settings'>('overview');
  
  const [profile, setProfile] = useState<UserProfile>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedProfile = localStorage.getItem('home_service_profile');
        if (savedProfile) {
          return JSON.parse(savedProfile);
        }
      } catch (e) {
        console.error("Error loading profile:", e);
      }
    }
    return defaultProfile;
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedBookings = localStorage.getItem('home_service_bookings');
        if (savedBookings) {
          return JSON.parse(savedBookings);
        }
      } catch (e) {
        console.error("Error loading bookings:", e);
      }
    }
    return mockDefaultBookings as Booking[];
  });

  // Settings Form State
  const [formName, setFormName] = useState(() => profile.fullName);
  const [formMobile, setFormMobile] = useState(() => profile.mobileNumber);
  const [formAddress, setFormAddress] = useState(() => profile.address);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Reschedule Modal State
  const [rescheduleBookingId, setRescheduleBookingId] = useState<string | null>(null);
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');

  // Sync initial fallback data to localStorage if empty
  useEffect(() => {
    try {
      if (!localStorage.getItem('home_service_bookings')) {
        localStorage.setItem('home_service_bookings', JSON.stringify(mockDefaultBookings));
      }
      if (!localStorage.getItem('home_service_profile')) {
        localStorage.setItem('home_service_profile', JSON.stringify(defaultProfile));
      }
    } catch (e) {
      console.error("Error initializing localStorage fallback:", e);
    }
  }, []);

  // Update Settings handler
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      fullName: formName,
      mobileNumber: formMobile,
      address: formAddress
    };
    try {
      localStorage.setItem('home_service_profile', JSON.stringify(updated));
      setProfile(updated);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error("Failed to save profile:", error);
    }
  };

  // Cancel booking handler
  const handleCancelBooking = (bookingId: string) => {
    const confirmed = window.confirm("Are you sure you want to cancel this booking?");
    if (!confirmed) return;

    const updated = bookings.map(b => b.id === bookingId ? { ...b, status: 'Cancelled' as const } : b);
    setBookings(updated);
    try {
      localStorage.setItem('home_service_bookings', JSON.stringify(updated));
    } catch (error) {
      console.error(error);
    }
  };

  // Reschedule booking handler
  const handleRescheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rescheduleBookingId || !newDate || !newTime) return;

    const updated = bookings.map(b =>
      b.id === rescheduleBookingId
        ? { ...b, date: newDate, time: newTime, status: 'Scheduled' as const }
        : b
    );
    setBookings(updated);
    try {
      localStorage.setItem('home_service_bookings', JSON.stringify(updated));
    } catch (error) {
      console.error(error);
    }
    setRescheduleBookingId(null);
    setNewDate('');
    setNewTime('');
  };

  // Get active scheduled bookings
  const scheduledBookings = bookings.filter(b => b.status === 'Scheduled');
  const activeBooking = scheduledBookings.length > 0 ? scheduledBookings[0] : null;

  // Calculate statistics
  const totalBookingsCount = bookings.length;
  const completedBookingsCount = bookings.filter(b => b.status === 'Completed').length;
  const totalAmountSpent = bookings
    .filter(b => b.status === 'Completed' || b.status === 'Scheduled')
    .reduce((sum, b) => sum + (parseInt(b.totalPrice.replace(/[^\d]/g, '')) || 0), 0);

  return (
    <div className={`container py-12 ${styles.dashboardWrapper}`}>

      {/* Sidebar Navigation */}
      <aside className={`glass ${styles.sidebar}`}>
        <div className={styles.profileSummary}>
          <div className={styles.avatarCircle}>
            {profile.fullName.charAt(0).toUpperCase()}
          </div>
          <div className={styles.profileDetails}>
            <h3>{profile.fullName}</h3>
            <span className={styles.memberBadge}>Premium Member</span>
          </div>
        </div>

        <nav className={styles.sidebarMenu}>
          <button
            className={`${styles.menuBtn} ${activeTab === 'overview' ? styles.activeMenuBtn : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            Overview
          </button>
          <button
            className={`${styles.menuBtn} ${activeTab === 'bookings' ? styles.activeMenuBtn : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            Bookings
            {scheduledBookings.length > 0 && (
              <span className={styles.badgeCount}>{scheduledBookings.length}</span>
            )}
          </button>
          <button
            className={`${styles.menuBtn} ${activeTab === 'partners' ? styles.activeMenuBtn : ''}`}
            onClick={() => setActiveTab('partners')}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            Verified Experts
          </button>
          <button
            className={`${styles.menuBtn} ${activeTab === 'settings' ? styles.activeMenuBtn : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            Settings
          </button>
        </nav>
      </aside>

      {/* Main Dashboard Panel */}
      <main className={styles.mainContent}>

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="animate-fade-in">
            {/* Greeting Header */}
            <div className={styles.greetingBanner}>
              <h2>Hello, {profile.fullName}!</h2>
              <p>Your premium home is in expert hands. You have {scheduledBookings.length} scheduled services coming up.</p>
              <div className={styles.quickLinks}>
                <Link href="/services" className="btn-accent">Book New Service</Link>
                <Link href="/professionals" className={styles.secondaryCtaBtn}>Browse Partners</Link>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className={styles.metricsGrid}>
              <div className={`glass ${styles.metricCard}`}>
                <div className={styles.metricIcon} style={{ background: 'rgba(123, 44, 191, 0.1)', color: 'var(--accent-color)' }}>📋</div>
                <div className={styles.metricData}>
                  <h3>{totalBookingsCount}</h3>
                  <p>Total Bookings</p>
                </div>
              </div>

              <div className={`glass ${styles.metricCard}`}>
                <div className={styles.metricIcon} style={{ background: 'rgba(76, 201, 240, 0.1)', color: '#4cc9f0' }}>✓</div>
                <div className={styles.metricData}>
                  <h3>{completedBookingsCount}</h3>
                  <p>Completed Tasks</p>
                </div>
              </div>

              <div className={`glass ${styles.metricCard}`}>
                <div className={styles.metricIcon} style={{ background: 'rgba(255, 183, 3, 0.1)', color: '#ffb703' }}>🪙</div>
                <div className={styles.metricData}>
                  <h3>₹{totalAmountSpent}</h3>
                  <p>Estimated Spent</p>
                </div>
              </div>
            </div>

            {/* Two Column Layout for Metrics & Live Tracker */}
            <div className={styles.twoColumnGrid}>

              {/* Live Tracker Column */}
              <div className={`glass ${styles.trackerPanel}`}>
                <h3>Live Service Tracker</h3>
                {activeBooking ? (
                  <div className={styles.trackerContent}>
                    <div className={styles.activeServiceInfo}>
                      <div>
                        <h4>{activeBooking.serviceName}</h4>
                        <p className={styles.scheduleText}>Scheduled for {activeBooking.date} • {activeBooking.time}</p>
                      </div>
                      <span className={styles.statusBadge}>ACTIVE</span>
                    </div>

                    {/* Timeline Tracker */}
                    <div className={styles.timeline}>
                      <div className={`${styles.timelineStep} ${styles.stepDone}`}>
                        <div className={styles.stepMarker}>✓</div>
                        <div className={styles.stepDetails}>
                          <h5>Service Booked</h5>
                          <p>Order #{activeBooking.id}</p>
                        </div>
                      </div>

                      <div className={`${styles.timelineStep} ${styles.stepActive}`}>
                        <div className={styles.stepMarker}>●</div>
                        <div className={styles.stepDetails}>
                          <h5>Expert Assigned</h5>
                          <p>Rahul Sharma (4.9★ Cleaning Pro)</p>
                        </div>
                      </div>

                      <div className={styles.timelineStep}>
                        <div className={styles.stepMarker}></div>
                        <div className={styles.stepDetails}>
                          <h5>In Transit</h5>
                          <p>Partner will travel to your address</p>
                        </div>
                      </div>

                      <div className={styles.timelineStep}>
                        <div className={styles.stepMarker}></div>
                        <div className={styles.stepDetails}>
                          <h5>Service Done</h5>
                          <p>Awaiting your completion signature</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={styles.emptyState}>
                    <p>No active bookings today.</p>
                    <Link href="/services" className={styles.bookNowText}>Book a service now →</Link>
                  </div>
                )}
              </div>

              {/* Graphical Visual Panel */}
              <div className={`glass ${styles.chartPanel}`}>
                <h3>Monthly Booking Activity</h3>
                <p className="text-muted mb-4">Frequency of home check-ups over the past 6 months</p>

                <div className={styles.chartWrapper}>
                  {/* Custom Premium SVG Chart */}
                  <svg viewBox="0 0 400 200" width="100%" height="100%">
                    <defs>
                      <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#7b2cbf" />
                        <stop offset="100%" stopColor="#c77dff" stopOpacity="0.4" />
                      </linearGradient>
                      <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#7b2cbf" />
                        <stop offset="100%" stopColor="#7b2cbf" stopOpacity="0.8" />
                      </linearGradient>
                    </defs>

                    {/* Horizontal Lines */}
                    <line x1="30" y1="20" x2="380" y2="20" stroke="rgba(0,0,0,0.04)" strokeWidth="1" />
                    <line x1="30" y1="60" x2="380" y2="60" stroke="rgba(0,0,0,0.04)" strokeWidth="1" />
                    <line x1="30" y1="100" x2="380" y2="100" stroke="rgba(0,0,0,0.04)" strokeWidth="1" />
                    <line x1="30" y1="140" x2="380" y2="140" stroke="rgba(0,0,0,0.04)" strokeWidth="1" />
                    <line x1="30" y1="170" x2="380" y2="170" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />

                    {/* Chart Bars */}
                    <rect x="50" y="110" width="28" height="60" rx="4" fill="url(#purpleGradient)" className={styles.svgBar} />
                    <text x="64" y="186" fill="#777" fontSize="11" textAnchor="middle">Dec</text>

                    <rect x="105" y="70" width="28" height="100" rx="4" fill="url(#purpleGradient)" className={styles.svgBar} />
                    <text x="119" y="186" fill="#777" fontSize="11" textAnchor="middle">Jan</text>

                    <rect x="160" y="130" width="28" height="40" rx="4" fill="url(#purpleGradient)" className={styles.svgBar} />
                    <text x="174" y="186" fill="#777" fontSize="11" textAnchor="middle">Feb</text>

                    <rect x="215" y="50" width="28" height="120" rx="4" fill="url(#purpleGradient)" className={styles.svgBar} />
                    <text x="229" y="186" fill="#777" fontSize="11" textAnchor="middle">Mar</text>

                    <rect x="270" y="90" width="28" height="80" rx="4" fill="url(#purpleGradient)" className={styles.svgBar} />
                    <text x="284" y="186" fill="#777" fontSize="11" textAnchor="middle">Apr</text>

                    <rect x="325" y="30" width="28" height="140" rx="4" fill="url(#goldGradient)" className={styles.svgBarActive} />
                    <text x="339" y="186" fill="var(--accent-color)" fontWeight="600" fontSize="11" textAnchor="middle">May</text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* BOOKINGS TAB */}
        {activeTab === 'bookings' && (
          <div className="animate-fade-in">
            <div className={styles.sectionHeader}>
              <div>
                <h2>Your Home Bookings</h2>
                <p className="text-muted">Manage scheduled sessions, see receipts and contact assigned professionals.</p>
              </div>
            </div>

            {bookings.length > 0 ? (
              <div className={styles.bookingsList}>
                {bookings.map((booking) => (
                  <div key={booking.id} className={`glass ${styles.bookingCard} ${booking.status === 'Cancelled' ? styles.cancelledCard : ''}`}>
                    <div className={styles.bookingHeader}>
                      <div className={styles.bookingTitleRow}>
                        <div className={styles.categoryCircle}>
                          {booking.category === 'cleaning' ? '🧹' :
                            booking.category === 'salon' ? '✂️' :
                              booking.category === 'repair' ? '🔧' : '🚰'}
                        </div>
                        <div>
                          <h4>{booking.serviceName}</h4>
                          <span className={styles.bookingId}>ID: {booking.id}</span>
                        </div>
                      </div>

                      <div className={styles.bookingStatusCol}>
                        <span className={`${styles.statusLabel} ${booking.status === 'Scheduled' ? styles.statusScheduled :
                            booking.status === 'Completed' ? styles.statusCompleted : styles.statusCancelled
                          }`}>
                          {booking.status.toUpperCase()}
                        </span>
                        <span className={styles.priceHighlight}>{booking.totalPrice}</span>
                      </div>
                    </div>

                    <div className={styles.bookingInfoGrid}>
                      <div className={styles.infoBlock}>
                        <h5>📅 Scheduled Date</h5>
                        <p>{booking.date} at {booking.time}</p>
                      </div>

                      <div className={styles.infoBlock}>
                        <h5>👤 Customer</h5>
                        <p>{booking.customerName} ({booking.mobile})</p>
                      </div>

                      <div className={styles.infoBlock} style={{ gridColumn: 'span 2' }}>
                        <h5>📍 Service Location</h5>
                        <p>{booking.address}</p>
                      </div>
                    </div>

                    {booking.status === 'Scheduled' && (
                      <div className={styles.cardActions}>
                        <button
                          className={styles.rescheduleBtn}
                          onClick={() => {
                            setRescheduleBookingId(booking.id);
                            setNewDate(booking.date);
                            setNewTime(booking.time);
                          }}
                        >
                          📅 Reschedule
                        </button>
                        <button
                          className={styles.cancelBtn}
                          onClick={() => handleCancelBooking(booking.id)}
                        >
                          ✕ Cancel Booking
                        </button>
                        <a
                          href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`Query regarding Booking ID: ${booking.id} - ${booking.serviceName}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.chatSupportBtn}
                        >
                          💬 Help Support
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.emptyDashboardState}>
                <div className={styles.emptyIcon}>📭</div>
                <h3>No Bookings Found</h3>
                <p className="text-muted mt-2">You haven&apos;t scheduled any services yet.</p>
                <Link href="/services" className="btn-accent mt-6">Book Your First Service</Link>
              </div>
            )}
          </div>
        )}

        {/* VERIFIED PARTNERS TAB */}
        {activeTab === 'partners' && (
          <div className="animate-fade-in">
            <div className={styles.sectionHeader}>
              <div>
                <h2>Your Vetted Professionals</h2>
                <p className="text-muted">Top partners qualified to complete your booked home service checklists.</p>
              </div>
            </div>

            <div className={styles.partnersGrid}>
              {professionalsData.map((prof) => (
                <div key={prof.id} className={`glass ${styles.partnerCard}`}>
                  <div className={styles.partnerInfo}>
                    <div className={styles.avatarMiniWrapper}>
                      <Image
                        src={prof.image}
                        alt={prof.name}
                        width={65}
                        height={65}
                        className={styles.partnerAvatar}
                      />
                    </div>
                    <div>
                      <h4>{prof.name}</h4>
                      <p className={styles.partnerProfession}>{prof.profession}</p>
                      <div className={styles.partnerRating}>★ {prof.rating}</div>
                    </div>
                  </div>

                  <div className={styles.partnerStats}>
                    <div>
                      <strong>{prof.experience}</strong>
                      <span>Experience</span>
                    </div>
                    <div className={styles.statDivider}></div>
                    <div>
                      <strong>{prof.jobsCompleted}+</strong>
                      <span>Jobs Done</span>
                    </div>
                  </div>

                  <Link href={`/category/${prof.category}`} className={styles.bookPartnerBtn}>
                    Book Service Now
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div className="animate-fade-in">
            <div className={styles.sectionHeader}>
              <div>
                <h2>Account Settings</h2>
                <p className="text-muted">Modify default details for faster service checkouts.</p>
              </div>
            </div>

            <form onSubmit={handleSaveProfile} className={`glass ${styles.settingsForm}`}>
              {saveSuccess && (
                <div className={styles.successAlert}>
                  ✓ Profile settings updated successfully! Pre-fill setup ready.
                </div>
              )}

              <div className={styles.formRow}>
                <div className={styles.formInputGroup}>
                  <label htmlFor="fullname">Full Name</label>
                  <input
                    type="text"
                    id="fullname"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    required
                  />
                </div>

                <div className={styles.formInputGroup}>
                  <label htmlFor="mobile">Mobile Number</label>
                  <input
                    type="text"
                    id="mobile"
                    value={formMobile}
                    onChange={(e) => setFormMobile(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className={styles.formInputGroup}>
                <label htmlFor="address">Default Booking Address</label>
                <textarea
                  id="address"
                  rows={4}
                  value={formAddress}
                  onChange={(e) => setFormAddress(e.target.value)}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn-accent">
                Save Preferences
              </button>
            </form>
          </div>
        )}

      </main>

      {/* Reschedule Modal Overlay */}
      {rescheduleBookingId && (
        <div className={styles.modalOverlay}>
          <div className={`glass ${styles.modalContent}`}>
            <h3>Reschedule Appointment</h3>
            <p className="text-muted mb-6">Choose a new date and time for booking ID: {rescheduleBookingId}</p>

            <form onSubmit={handleRescheduleSubmit}>
              <div className={styles.formInputGroup}>
                <label>Select Date</label>
                <select
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  required
                  className={styles.modalSelect}
                >
                  <option value="Today">Today</option>
                  <option value="Tomorrow">Tomorrow</option>
                  <option value="Day After">Day After</option>
                </select>
              </div>

              <div className={styles.formInputGroup}>
                <label>Select Time Slot</label>
                <select
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  required
                  className={styles.modalSelect}
                >
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="02:00 PM">02:00 PM</option>
                  <option value="04:00 PM">04:00 PM</option>
                  <option value="06:00 PM">06:00 PM</option>
                </select>
              </div>

              <div className={styles.modalActions}>
                <button
                  type="button"
                  className={styles.modalCancelBtn}
                  onClick={() => setRescheduleBookingId(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-accent">
                  Confirm Reschedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
