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
          <Link href="/about" className={styles.navLink}>About Us</Link>
        </div>
        <div className={styles.navActions}>
          <button className="btn-primary">Login / Sign Up</button>
        </div>
      </div>
    </nav>
  );
}
