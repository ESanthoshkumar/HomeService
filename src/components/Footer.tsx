import styles from './Footer.module.css';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerGrid}`}>
        <div className={styles.footerBrand}>
          <h2 className={styles.logo}>Home<span>Service</span></h2>
          <p className="text-muted mt-4">
            Premium home services, delivered to your doorstep by trusted professionals.
          </p>
        </div>
        <div className={styles.footerLinks}>
          <h3>Company</h3>
          <Link href="/about">About Us</Link>
          <Link href="/careers">Careers</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div className={styles.footerLinks}>
          <h3>Services</h3>
          <Link href="/category/cleaning">Home Cleaning</Link>
          <Link href="/category/salon">Salon at Home</Link>
          <Link href="/category/repair">Appliance Repair</Link>
        </div>
        <div className={styles.footerLinks}>
          <h3>Legal</h3>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <div className="container text-center text-muted">
          <p>&copy; {new Date().getFullYear()} HomeService. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
