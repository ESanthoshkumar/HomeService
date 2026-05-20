'use client';
import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function PrivacyPage() {
  const [activeSection, setActiveSection] = useState('intro');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['intro', 'collect', 'use', 'share', 'security', 'rights'];
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
    <div className={styles.privacyPage}>
      {/* Hero Header */}
      <div className={styles.hero}>
        <div className="container text-center">
          <div className={styles.badge}>Trust & Security</div>
          <h1>Privacy Policy</h1>
          <p className="mt-4 text-muted animate-fade-in mx-auto" style={{ maxWidth: '600px' }}>
            Last Updated: May 20, 2026. This policy explains how we collect, use, protect, and share your personal information.
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
                    onClick={() => scrollToSection('intro')} 
                    className={activeSection === 'intro' ? styles.activeLink : ''}
                  >
                    1. Introduction
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('collect')} 
                    className={activeSection === 'collect' ? styles.activeLink : ''}
                  >
                    2. Information We Collect
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('use')} 
                    className={activeSection === 'use' ? styles.activeLink : ''}
                  >
                    3. How We Use Information
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('share')} 
                    className={activeSection === 'share' ? styles.activeLink : ''}
                  >
                    4. Data Sharing & Disclosure
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('security')} 
                    className={activeSection === 'security' ? styles.activeLink : ''}
                  >
                    5. Data Security
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('rights')} 
                    className={activeSection === 'rights' ? styles.activeLink : ''}
                  >
                    6. Your Privacy Rights
                  </button>
                </li>
              </ul>
            </div>
          </aside>

          {/* Right Text Content Panel */}
          <main className={styles.contentPanel}>
            
            <section id="intro" className={styles.section}>
              <h2>1. Introduction</h2>
              <p>
                Welcome to HomeService (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We value your privacy and are committed to protecting your personal data. This Privacy Policy describes how we collect, process, disclose, and store information when you visit or use our platform, application, and services.
              </p>
              <p>
                By accessing or using our services, you consent to the collection, transfer, storage, disclosure, and other uses of your information as described in this policy. If you do not agree to these terms, please do not access or use the HomeService platform.
              </p>
            </section>

            <div className={styles.divider}></div>

            <section id="collect" className={styles.section}>
              <h2>2. Information We Collect</h2>
              <p>
                To provide our on-demand services, we collect information you provide directly, data captured automatically, and details from third-party partners.
              </p>
              
              <h3>A. Information You Provide</h3>
              <ul>
                <li><strong>Account Details:</strong> Your name, phone number, email address, physical location addresses, and password when you register.</li>
                <li><strong>Booking Information:</strong> Service category, scheduling times, location notes, instructions, and transaction history.</li>
                <li><strong>Profile Customizations:</strong> Gender, profile picture, preferences, and ratings/reviews you publish about service professionals.</li>
              </ul>

              <h3>B. Automatically Collected Information</h3>
              <ul>
                <li><strong>Location Data:</strong> Accurate GPS coordinates from mobile devices when searching for local technicians or dispatching service.</li>
                <li><strong>Usage & Device Metrics:</strong> IP addresses, browser types, screen resolution settings, and operational page clicks.</li>
              </ul>
            </section>

            <div className={styles.divider}></div>

            <section id="use" className={styles.section}>
              <h2>3. How We Use Information</h2>
              <p>
                We use the data we collect to operate, personalize, optimize, and maintain our service marketplace. Key use cases include:
              </p>
              <ol>
                <li>Matching and dispatching certified service professionals to your location.</li>
                <li>Processing transactions, verifying invoicing parameters, and generating billing history.</li>
                <li>Sending operational alerts (SMS, WhatsApp, emails) regarding scheduled booking milestones and arrival times.</li>
                <li>Providing continuous customer care and handling dispute resolutions or damage claims.</li>
                <li>Improving application performance, refining matching algorithms, and preventing fraudulent activities.</li>
              </ol>
            </section>

            <div className={styles.divider}></div>

            <section id="share" className={styles.section}>
              <h2>4. Data Sharing & Disclosure</h2>
              <p>
                We do not sell your personal data to third parties. We share your information only under the following limited conditions:
              </p>
              <ul>
                <li><strong>With Service Partners:</strong> We share your name, phone number, address, and instructions with the specific service professional assigned to complete your booking.</li>
                <li><strong>With Payment Providers:</strong> Financial details are routed directly to PCI-DSS compliant secure processors (like Razorpay, Stripe) to process payments securely.</li>
                <li><strong>Legal Requirements:</strong> If compelled by local judicial authorities or government enforcement wings.</li>
              </ul>
            </section>

            <div className={styles.divider}></div>

            <section id="security" className={styles.section}>
              <h2>5. Data Security</h2>
              <p>
                We deploy robust encryption standards (AES-256) and secure socket layers (HTTPS/TLS) to encrypt user information in transit and at rest. Access control checks restrict data view privileges to certified platform operators on a need-to-know basis.
              </p>
              <p>
                However, please note that no system is 100% secure. While we execute premium security protocols, we cannot guarantee absolute security of information transmission over the public internet.
              </p>
            </section>

            <div className={styles.divider}></div>

            <section id="rights" className={styles.section}>
              <h2>6. Your Privacy Rights</h2>
              <p>
                Depending on your local legal jurisdiction, you hold several key rights over how we handle your personal data:
              </p>
              <ul>
                <li><strong>Right to Correct:</strong> Modify your personal name, number, or addresses directly within your account settings tab.</li>
                <li><strong>Right to Erase:</strong> Request permanent deletion of your customer history, ratings, and billing records by contacting us at privacy@homeservice.in.</li>
                <li><strong>Right to Restrict:</strong> Opt-out of marketing emails, newsletters, or promotional SMS directly via preference settings.</li>
              </ul>
            </section>

          </main>

        </div>
      </div>
    </div>
  );
}
