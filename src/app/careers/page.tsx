'use client';
import { useState } from 'react';
import styles from './page.module.css';

interface Job {
  id: string;
  title: string;
  department: 'Engineering' | 'Design' | 'Operations';
  location: string;
  type: string;
  salaryRange: string;
  description: string;
  requirements: string[];
}

const openJobs: Job[] = [
  {
    id: "eng-1",
    title: "Senior Full Stack Engineer (Next.js & Node.js)",
    department: "Engineering",
    location: "Bangalore, India (Hybrid)",
    type: "Full-Time",
    salaryRange: "₹18,00,000 - ₹28,00,000 / year",
    description: "Lead the development of our service dispatch and matching algorithms. You will build highly responsive interfaces, real-time tracking dashboards, and scaling backends.",
    requirements: [
      "4+ years of professional software engineering experience.",
      "Expert knowledge of React, Next.js, and Node.js ecosystems.",
      "Experience with PostgreSQL, Redis, and real-time WebSockets.",
      "Strong focus on web performance, accessibility, and clean CSS modules."
    ]
  },
  {
    id: "des-1",
    title: "Senior Product Designer (UX/UI)",
    department: "Design",
    location: "Remote (India)",
    type: "Full-Time",
    salaryRange: "₹12,00,000 - ₹18,00,000 / year",
    description: "Design the user journeys for booking, tracking, and partner dispatch workflows. You will lead user research and establish beautiful, glassmorphic layout frameworks.",
    requirements: [
      "3+ years of experience designing complex web and mobile products.",
      "Outstanding Figma design portfolio showcasing clean visual hierarchies.",
      "Strong understanding of design systems, responsive typography, and layout flow.",
      "Ability to translate user research into wireframes and fully polished mockups."
    ]
  },
  {
    id: "eng-2",
    title: "Frontend Developer (React / TypeScript)",
    department: "Engineering",
    location: "Remote (India)",
    type: "Full-Time",
    salaryRange: "₹10,0,000 - ₹15,00,000 / year",
    description: "Collaborate with product designers to ship responsive, pixel-perfect user interfaces. Optimize core pages for rapid load times and SEO benchmarks.",
    requirements: [
      "2+ years of professional frontend coding experience.",
      "Proficient in HTML5, CSS3, modern JavaScript, and React/TypeScript.",
      "Experience with bundlers, ESLint standards, and performance tuning.",
      "Eye for subtle hover micro-animations and layout details."
    ]
  },
  {
    id: "ops-1",
    title: "Operations & Partner Success Manager",
    department: "Operations",
    location: "Chennai, India",
    type: "Full-Time",
    salaryRange: "₹6,00,000 - ₹9,00,000 / year",
    description: "Scale our verified partner network across Southern regions. You will onboard professionals, conduct background verification processes, and handle local customer escalations.",
    requirements: [
      "2+ years in operations management, partner onboarding, or customer experience.",
      "Excellent local communication skills (English and Tamil/Hindi).",
      "Comfortable analyzing dispatch metrics and service turnaround times.",
      "High empathy and problem-solving skills under pressure."
    ]
  }
];

export default function CareersPage() {
  const [selectedDept, setSelectedDept] = useState<'All' | 'Engineering' | 'Design' | 'Operations'>('All');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  
  // Application form states
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formResume, setFormResume] = useState("");
  const [formCover, setFormCover] = useState("");
  const [applySuccess, setApplySuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredJobs = selectedDept === 'All' 
    ? openJobs 
    : openJobs.filter(job => job.department === selectedDept);

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formResume) return;

    setIsSubmitting(true);
    // Mock API delay
    setTimeout(() => {
      setIsSubmitting(false);
      setApplySuccess(true);
      setTimeout(() => {
        setApplySuccess(false);
        setSelectedJob(null);
        setFormName("");
        setFormEmail("");
        setFormResume("");
        setFormCover("");
      }, 3500);
    }, 1500);
  };

  return (
    <div className={styles.careersPage}>
      
      {/* Hero Banner */}
      <section className={styles.hero}>
        <div className="container text-center">
          <div className={styles.badge}>Join HomeService</div>
          <h1 className="animate-fade-in">Shape the Future of Home Services</h1>
          <p className="mt-4 text-muted animate-fade-in mx-auto" style={{ animationDelay: '0.1s', maxWidth: '600px' }}>
            We&apos;re building the world&apos;s most trusted home services platform. Join a team of designers, engineers, and operations experts working to empower local micro-entrepreneurs.
          </p>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="container py-16">
        <div className={styles.sectionHeader}>
          <h2>Why Work at HomeService?</h2>
          <p className="text-muted">Our core principles and culture drive everything we do.</p>
        </div>
        
        <div className={styles.valuesGrid}>
          <div className={`glass ${styles.valueCard}`}>
            <div className={styles.valueIcon}>🏆</div>
            <h3>Ownership & Autonomy</h3>
            <p>We trust our team members. You own your roadmap, define your metrics, and execute with absolute clarity and freedom.</p>
          </div>
          <div className={`glass ${styles.valueCard}`}>
            <div className={styles.valueIcon}>📈</div>
            <h3>High Growth Culture</h3>
            <p>Working at HomeService means solving hard challenges. You will learn, deploy, and scale tools that impact thousands of lives daily.</p>
          </div>
          <div className={`glass ${styles.valueCard}`}>
            <div className={styles.valueIcon}>🌱</div>
            <h3>Wellness & Flexibility</h3>
            <p>Work from anywhere with remote-first structures. Unlimited sick leaves, quarterly wellness budgets, and hybrid hubs.</p>
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section className={`${styles.jobsSection} py-16`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Open Positions</h2>
            <p className="text-muted">Explore current roles across our engineering, product design, and operations divisions.</p>
          </div>

          {/* Department Filter Bar */}
          <div className={styles.filterBar}>
            {(['All', 'Engineering', 'Design', 'Operations'] as const).map(dept => (
              <button
                key={dept}
                type="button"
                className={`${styles.filterBtn} ${selectedDept === dept ? styles.activeFilter : ''}`}
                onClick={() => setSelectedDept(dept)}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Job Postings list */}
          <div className={styles.jobsList}>
            {filteredJobs.length === 0 ? (
              <div className={styles.emptyState}>
                <p>No open roles in this department right now. Check back soon!</p>
              </div>
            ) : (
              filteredJobs.map((job) => (
                <div key={job.id} className={`glass ${styles.jobCard}`}>
                  <div className={styles.jobHeader}>
                    <div>
                      <span className={styles.jobDeptBadge}>{job.department}</span>
                      <h3>{job.title}</h3>
                      <div className={styles.jobMeta}>
                        <span>📍 {job.location}</span>
                        <span>•</span>
                        <span>💼 {job.type}</span>
                        <span>•</span>
                        <span>💰 {job.salaryRange}</span>
                      </div>
                    </div>
                    <button 
                      type="button" 
                      className="btn-accent"
                      onClick={() => setSelectedJob(job)}
                    >
                      View & Apply
                    </button>
                  </div>
                  <p className={styles.jobDesc}>{job.description}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Interactive Application Modal Overlay */}
      {selectedJob && (
        <div className={styles.modalOverlay}>
          <div className={`glass-dark ${styles.modalContent}`}>
            <div className={styles.modalHeader}>
              <div>
                <span className={styles.modalDept}>{selectedJob.department}</span>
                <h3>Apply for {selectedJob.title}</h3>
                <span className={styles.modalLoc}>📍 {selectedJob.location}</span>
              </div>
              <button 
                type="button" 
                className={styles.closeBtn} 
                onClick={() => setSelectedJob(null)}
              >
                ✕
              </button>
            </div>

            {applySuccess ? (
              <div className={styles.successBlock}>
                <span className={styles.successIcon}>🎉</span>
                <h4>Application Submitted!</h4>
                <p>Thank you for applying to HomeService, {formName}. Our talent team will review your profile and respond within 3-5 business days.</p>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className={styles.applyForm}>
                <div className={styles.formGroup}>
                  <label htmlFor="fullname">Full Name *</label>
                  <input 
                    type="text" 
                    id="fullname"
                    placeholder="Enter your name" 
                    required 
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email">Email Address *</label>
                  <input 
                    type="email" 
                    id="email"
                    placeholder="name@example.com" 
                    required 
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="resume">Resume / LinkedIn Link *</label>
                  <input 
                    type="url" 
                    id="resume"
                    placeholder="Google Drive, Dropbox, or LinkedIn URL" 
                    required 
                    value={formResume}
                    onChange={(e) => setFormResume(e.target.value)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="cover">Brief Cover Note / Pitch</label>
                  <textarea 
                    id="cover"
                    rows={4}
                    placeholder="Tell us why you are a great fit for HomeService..." 
                    value={formCover}
                    onChange={(e) => setFormCover(e.target.value)}
                  />
                </div>

                <div className={styles.modalActions}>
                  <button 
                    type="button" 
                    className={styles.modalCancel}
                    onClick={() => setSelectedJob(null)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn-accent"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
