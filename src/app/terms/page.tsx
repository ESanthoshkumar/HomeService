'use client';
import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState('agree');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['agree', 'ip', 'accounts', 'bookings', 'payments', 'liability'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 120,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  return (
    <div className={styles.termsPage}>
      {/* Hero Header */}
      <div className={styles.hero}>
        <div className="container text-center">
          <div className={styles.badge}>Platform Rules</div>
          <h1>Terms of Service</h1>
          <p className="mt-4 text-muted animate-fade-in mx-auto" style={{ maxWidth: '600px' }}>
            Last Updated: May 20, 2026. Please read these terms carefully before accessing or using the HomeService platform.
          </p>
        </div>
      </div>

      {/* Content Layout */}
      <div className="container py-16">
        <div className={styles.docWrapper}>
          
          {/* Left Navigation Sidebar */}
          <aside className={styles.sidebar}>
            <div className={`glass ${styles.sidebarNav}`}>
              <h4>Table of Contents</h4>
              <ul>
                <li>
                  <button 
                    onClick={() => scrollToSection('agree')} 
                    className={activeSection === 'agree' ? styles.activeLink : ''}
                  >
                    1. Agreement to Terms
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('ip')} 
                    className={activeSection === 'ip' ? styles.activeLink : ''}
                  >
                    2. Intellectual Property
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('accounts')} 
                    className={activeSection === 'accounts' ? styles.activeLink : ''}
                  >
                    3. User Accounts
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('bookings')} 
                    className={activeSection === 'bookings' ? styles.activeLink : ''}
                  >
                    4. Bookings & Cancellations
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('payments')} 
                    className={activeSection === 'payments' ? styles.activeLink : ''}
                  >
                    5. Payments & Fees
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('liability')} 
                    className={activeSection === 'liability' ? styles.activeLink : ''}
                  >
                    6. Limitation of Liability
                  </button>
                </li>
              </ul>
            </div>
          </aside>

          {/* Right Text Content Panel */}
          <main className={styles.contentPanel}>
            
            <section id="agree" className={styles.section}>
              <h2>1. Agreement to Terms</h2>
              <p>
                By accessing, browsing, or using the HomeService marketplace platform (including our website, mobile application, and related services), you represent that you have read, understood, and agree to be bound by these Terms of Service.
              </p>
              <p>
                These terms constitute a legally binding agreement between you (&quot;Customer,&quot; &quot;User&quot;) and HomeService Tech Labs Pvt. Ltd. If you do not agree with any part of these terms, you must immediately cease all access and platform usage.
              </p>
            </section>

            <div className={styles.divider}></div>

            <section id="ip" className={styles.section}>
              <h2>2. Intellectual Property</h2>
              <p>
                All elements of the HomeService platform, including but not limited to visual interfaces, gradients, button graphics, software systems, text fonts, logo branding (&quot;HomeService&quot;), and proprietary matching dispatch code, are owned exclusively by us and are protected by local copyright, trademark, and intellectual property laws.
              </p>
              <p>
                You are granted a limited, revocable, non-transferable license to access our platform solely for booking home services for personal, non-commercial use.
              </p>
            </section>

            <div className={styles.divider}></div>

            <section id="accounts" className={styles.section}>
              <h2>3. User Accounts</h2>
              <p>
                To schedule bookings on the platform, you must create a profile account. You agree to provide true, accurate, and current information (name, billing address, and mobile number) during registration and update it via settings.
              </p>
              <ul>
                <li>You are solely responsible for maintaining credentials confidentiality.</li>
                <li>You agree to notify us immediately at support@homeservice.in of any unauthorized profile access.</li>
                <li>We reserve the right to suspend or terminate accounts that register fictitious names or exhibit fraudulent behavior.</li>
              </ul>
            </section>

            <div className={styles.divider}></div>

            <section id="bookings" className={styles.section}>
              <h2>4. Bookings & Cancellations</h2>
              <p>
                HomeService operates a dispatcher marketplace that links customers with certified service partners.
              </p>
              <h3>Booking Acceptance</h3>
              <p>
                A service request constitutes an offer. Bookings are confirmed only when assigned to a specific technician, updating status to &quot;Scheduled.&quot;
              </p>
              <h3>Cancellation Policy</h3>
              <ul>
                <li><strong>Free Cancellation:</strong> Customers can cancel any scheduled booking free of charge up to 3 hours prior to the slot start.</li>
                <li><strong>Late Cancellation Fees:</strong> Cancellations made within 3 hours of slot start are subject to a nominal fee of ₹150 to compensate partner travel efforts.</li>
              </ul>
            </section>

            <div className={styles.divider}></div>

            <section id="payments" className={styles.section}>
              <h2>5. Payments & Fees</h2>
              <p>
                You agree to pay all service charges, taxes, and handling fees associated with bookings. Prices displayed on category pages are inclusive of basic service delivery.
              </p>
              <ul>
                <li><strong>Payment methods:</strong> We accept credit/debit cards, UPI, net banking, and Cash on Delivery (CoD).</li>
                <li><strong>Invoicing:</strong> A detailed PDF tax invoice is issued via email and synced in the user dashboard upon booking completion.</li>
                <li><strong>Refunds:</strong> Disputed bills are audited by customer care. Verified service failures qualify for instant wallet refunds.</li>
              </ul>
            </section>

            <div className={styles.divider}></div>

            <section id="liability" className={styles.section}>
              <h2>6. Limitation of Liability</h2>
              <p>
                While HomeService conducts thorough background checks on all listed partners, we act as a technology marketplace bridging customer demand with supply.
              </p>
              <p>
                We shall not be held liable for any direct, indirect, incidental, or consequential damages (including property damage, service failures, or delays) resulting from services rendered by third-party professionals.
              </p>
              <p>
                However, for customer peace of mind, all services scheduled through the HomeService app are backed by our <strong>Service Guarantee Insurance Cover</strong> up to ₹10,000 for verified property damage.
              </p>
            </section>

          </main>

        </div>
      </div>
    </div>
  );
}
