import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={`glass ${styles.navbar}`}>
      <div className={`container ${styles.navContainer}`}>
        <Link href="/" className={styles.logo}>
          Home<span>Service</span>
        </Link>
        <div className={styles.navLinks}>
          <Link href="/services" className={styles.navLink}>Services</Link>
          <Link href="/professionals" className={styles.navLink}>Professionals</Link>
          <Link href="/dashboard" className={styles.navLink}>Dashboard</Link>
          <Link href="/about" className={styles.navLink}>About Us</Link>
        </div>
        <div className={styles.navActions}>
          <Link href="/dashboard" className={styles.profileBadge}>
            <span className={styles.avatar}>👤</span>
            <span className={styles.profileText}>My Account</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
