'use client';
import { useState } from 'react';
import styles from './page.module.css';
import Image from 'next/image';
import Link from 'next/link';

const professionalsData = [
  {
    id: 1,
    name: "Rahul Sharma",
    profession: "Home Cleaning Expert",
    category: "cleaning",
    image: "/images/prof_cleaning.png",
    rating: 4.9,
    reviews: 420,
    jobsCompleted: 1450,
    experience: "5+ Years",
    skills: ["Deep Cleaning", "Sanitization", "Eco-friendly products"],
    verified: true,
    availableToday: true
  },
  {
    id: 2,
    name: "Priya Patel",
    profession: "Salon & Beauty Stylist",
    category: "salon",
    image: "/images/prof_salon.png",
    rating: 4.95,
    reviews: 310,
    jobsCompleted: 980,
    experience: "6 Years",
    skills: ["Hair styling", "Bridal Makeup", "Facial therapy"],
    verified: true,
    availableToday: false
  },
  {
    id: 3,
    name: "Amit Kumar",
    profession: "Senior Appliance Technician",
    category: "repair",
    image: "/images/prof_repair.png",
    rating: 4.8,
    reviews: 512,
    jobsCompleted: 2100,
    experience: "8 Years",
    skills: ["AC Installation", "Washing Machine repair", "Board fixing"],
    verified: true,
    availableToday: true
  },
  {
    id: 4,
    name: "David Miller",
    profession: "Master Plumber",
    category: "plumbing",
    image: "/images/prof_plumbing.png",
    rating: 4.85,
    reviews: 280,
    jobsCompleted: 1150,
    experience: "4 Years",
    skills: ["Leak detection", "Luxury faucet install", "Water pump repair"],
    verified: true,
    availableToday: true
  }
];

export default function ProfessionalsPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProfessionals = activeFilter === 'all' 
    ? professionalsData 
    : professionalsData.filter(prof => prof.category === activeFilter);

  return (
    <div className={styles.profPage}>
      {/* Hero Header */}
      <div className={styles.hero}>
        <div className="container text-center">
          <div className={styles.badge}>Our Partners</div>
          <h1 className="animate-fade-in">Certified Professionals</h1>
          <p className="mt-4 text-muted animate-fade-in mx-auto" style={{ animationDelay: '0.1s', maxWidth: '600px' }}>
            Meet our top-rated, background-verified home service specialists. Selected through rigorous quality checks to deliver premium service.
          </p>
        </div>
      </div>

      {/* Filter and Grid */}
      <div className="container py-12">
        <div className={styles.filterBar}>
          {['all', 'cleaning', 'salon', 'repair', 'plumbing'].map(filter => (
            <button
              key={filter}
              className={`${styles.filterBtn} ${activeFilter === filter ? styles.activeFilter : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter.toUpperCase()}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {filteredProfessionals.map((prof, index) => (
            <div 
              key={prof.id} 
              className={styles.card}
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <div className={styles.cardHeader}>
                <div className={prof.availableToday ? styles.statusOnline : styles.statusOffline}>
                  {prof.availableToday ? '● Available Today' : '○ Fully Booked'}
                </div>
                {prof.verified && (
                  <span className={styles.verifiedTag}>🛡️ VERIFIED</span>
                )}
              </div>

              <div className={styles.avatarSection}>
                <div className={styles.avatarWrapper}>
                  <Image 
                    src={prof.image} 
                    alt={prof.name} 
                    width={110} 
                    height={110} 
                    className={styles.avatar}
                  />
                </div>
                <h3>{prof.name}</h3>
                <p className={styles.professionText}>{prof.profession}</p>
                <div className={styles.rating}>
                  ★ {prof.rating} <span>({prof.reviews} reviews)</span>
                </div>
              </div>

              <div className={styles.divider}></div>

              <div className={styles.statsRow}>
                <div className={styles.statBox}>
                  <span className={styles.statValue}>{prof.jobsCompleted}+</span>
                  <span className={styles.statLabel}>Jobs Done</span>
                </div>
                <div className={styles.statDivider}></div>
                <div className={styles.statBox}>
                  <span className={styles.statValue}>{prof.experience}</span>
                  <span className={styles.statLabel}>Experience</span>
                </div>
              </div>

              <div className={styles.divider}></div>

              <div className={styles.skillsSection}>
                <h4>Key Skills</h4>
                <div className={styles.skillsList}>
                  {prof.skills.map((skill, idx) => (
                    <span key={idx} className={styles.skillTag}>{skill}</span>
                  ))}
                </div>
              </div>

              <Link href={`/category/${prof.category}`} className={styles.bookBtn}>
                Book a Service
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
