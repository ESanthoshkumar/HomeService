import styles from './page.module.css';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: "About Us - Home Service",
  description: "Learn more about Home Service, our mission, our values, and how we are revolutionizing the home services industry.",
};

export default function AboutPage() {
  return (
    <div className={styles.aboutPage}>
      {/* Hero Header */}
      <div className={styles.hero}>
        <div className="container text-center">
          <div className={styles.badge}>Our Story</div>
          <h1 className="animate-fade-in">Redefining Home Services</h1>
          <p className="mt-4 text-muted animate-fade-in mx-auto" style={{ animationDelay: '0.1s', maxWidth: '600px' }}>
            We connect customers with certified, top-tier professionals, delivering hassle-free, premium services directly to your doorstep.
          </p>
        </div>
      </div>

      {/* Main Journey Section */}
      <div className="container py-20">
        <div className={styles.journeySection}>
          <div className={styles.journeyText}>
            <h2>Our Journey</h2>
            <p className="mt-6 text-muted">
              Founded in 2026, Home Service was born out of a simple idea: booking home services should be as seamless and reliable as ordering a ride or booking a hotel. We saw a fragmented market where finding a trusted professional felt like a roll of the dice.
            </p>
            <p className="mt-4 text-muted">
              We set out to build a platform that prioritizes absolute trust, vetted expertise, and guaranteed customer satisfaction. Today, we host thousands of background-verified experts servicing homes across the country.
            </p>
            
            <div className={styles.quoteBlock}>
              <p>“We don&apos;t just book services; we deliver comfort and peace of mind.”</p>
              <span>— CEO, Home Service</span>
            </div>
          </div>
          
          <div className={styles.journeyImageWrapper}>
            <Image 
              src="/images/about_hero.png" 
              alt="About Home Service Illustration" 
              width={500} 
              height={400} 
              className={styles.journeyImage}
            />
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <div className={styles.valuesSection}>
        <div className="container">
          <div className="text-center mb-16">
            <h2 className={styles.sectionTitle}>Our Core Values</h2>
            <p className="text-muted mt-2">The principles that guide everything we do</p>
          </div>
          
          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>🛡️</div>
              <h3>Absolute Trust</h3>
              <p>Every single professional goes through strict background checks, physical verification, and expert assessments before joining.</p>
            </div>
            
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>✨</div>
              <h3>Premium Quality</h3>
              <p>We train our partners in service delivery, customer relations, and use high-end, premium materials for all jobs.</p>
            </div>
            
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>🔄</div>
              <h3>100% Satisfaction</h3>
              <p>If you&apos;re not completely happy with your service, we will send an expert to redo the work at no extra cost to you.</p>
            </div>
          </div>
        </div>
      </div>

      {/* How it Works */}
      <div className="container py-20 text-center">
        <h2 className="mb-16">How It Works</h2>
        <div className={styles.stepsGrid}>
          <div className={styles.step}>
            <div className={styles.stepNumber}>1</div>
            <h3>Select a Service</h3>
            <p className="text-muted mt-2">Browse categories and choose the exact customizable package you need.</p>
          </div>
          
          <div className={styles.step}>
            <div className={styles.stepNumber}>2</div>
            <h3>Book and Confirm</h3>
            <p className="text-muted mt-2">Select a date and time, fill details and confirm booking directly via WhatsApp.</p>
          </div>
          
          <div className={styles.step}>
            <div className={styles.stepNumber}>3</div>
            <h3>Sit Back & Relax</h3>
            <p className="text-muted mt-2">A certified professional arrives with all tools to deliver quality work.</p>
          </div>
        </div>
      </div>

      {/* CTA Footer */}
      <div className={styles.ctaBanner}>
        <div className="container text-center">
          <h2>Ready to experience premium home care?</h2>
          <p className="mt-4">Book a certified professional today and transform your living space.</p>
          <Link href="/services" className="btn-accent mt-8 inline-block">
            Browse All Services
          </Link>
        </div>
      </div>
    </div>
  );
}
