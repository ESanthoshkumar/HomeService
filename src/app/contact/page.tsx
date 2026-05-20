'use client';
import { useState } from 'react';
import styles from './page.module.css';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('support');
  const [message, setMessage] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    // Mock network request
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
      
      // Auto close alert
      setTimeout(() => {
        setSuccess(false);
      }, 4000);
    }, 1500);
  };

  return (
    <div className={styles.contactPage}>
      {/* Hero Header */}
      <div className={styles.hero}>
        <div className="container text-center">
          <div className={styles.badge}>Get In Touch</div>
          <h1>We&apos;re Here to Help</h1>
          <p className="mt-4 text-muted animate-fade-in mx-auto" style={{ maxWidth: '600px' }}>
            Have questions about booking a service, onboarding as a professional, or partnership opportunities? Reach out to us.
          </p>
        </div>
      </div>

      {/* Main Form and Info Split section */}
      <div className="container py-16">
        <div className={styles.splitGrid}>
          
          {/* Left panel: Info */}
          <div className={styles.infoCol}>
            <div className={`glass ${styles.infoCard}`}>
              <h3>Customer Support</h3>
              <p className="text-muted mb-6">Our dedicated support desk is available around the clock to help you with booking queries, cancellations, or safety concerns.</p>
              
              <div className={styles.contactRow}>
                <span className={styles.contactIcon}>📞</span>
                <div>
                  <strong>Phone Hotline</strong>
                  <p>+91 80 4912 3456</p>
                  <span>Toll-free • 8 AM - 10 PM IST</span>
                </div>
              </div>

              <div className={styles.contactRow}>
                <span className={styles.contactIcon}>✉️</span>
                <div>
                  <strong>Email Channels</strong>
                  <p><a href="mailto:support@homeservice.in">support@homeservice.in</a></p>
                  <span>Average response time: &lt; 2 hours</span>
                </div>
              </div>

              <div className={styles.contactRow}>
                <span className={styles.contactIcon}>🏢</span>
                <div>
                  <strong>Corporate Headquarters</strong>
                  <p>HomeService Tech Labs Pvt. Ltd.</p>
                  <p className="text-muted" style={{ fontSize: '0.88rem', fontWeight: 500 }}>
                    4th Floor, Block C, HSR Sector 4, Bengaluru, KA - 560102
                  </p>
                </div>
              </div>
            </div>

            <div className={`glass ${styles.hoursCard}`}>
              <h4>🕒 Operating Hours</h4>
              <div className={styles.hoursGrid}>
                <div>
                  <span>Weekdays</span>
                  <strong>8:00 AM - 10:00 PM</strong>
                </div>
                <div>
                  <span>Weekends</span>
                  <strong>9:00 AM - 8:00 PM</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Right panel: Contact Form */}
          <div className={styles.formCol}>
            <div className={`glass ${styles.formCard}`}>
              <h3>Send us a Message</h3>
              <p className="text-muted mb-6">Fill in details below and we will get back to you shortly.</p>

              {success && (
                <div className={styles.successMessage}>
                  <strong>✓ Message Sent Successfully!</strong>
                  <p>Thank you for reaching out. A support coordinator will check your ticket and reply within 1-2 hours.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className={styles.contactForm}>
                <div className={styles.formGroup}>
                  <label htmlFor="contactName">Your Name *</label>
                  <input 
                    type="text" 
                    id="contactName"
                    placeholder="Enter your name" 
                    required 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="contactEmail">Email Address *</label>
                  <input 
                    type="email" 
                    id="contactEmail"
                    placeholder="name@example.com" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="contactSubject">Inquiry Department</label>
                  <select 
                    id="contactSubject"
                    className={styles.formSelect}
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  >
                    <option value="support">Service Support & Bookings</option>
                    <option value="partner">Join as Partner / Professional</option>
                    <option value="careers">Careers & Jobs</option>
                    <option value="media">Business & Partnerships</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="contactMessage">Message / Description *</label>
                  <textarea 
                    id="contactMessage"
                    rows={6}
                    placeholder="Write details of your query..." 
                    required 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn-accent"
                  style={{ width: '100%', padding: '0.9rem' }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending Message..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
