'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className={`glass ${styles.navbar}`}>
      <div className={`container ${styles.navContainer}`}>
        <Link href="/" className={styles.logo} onClick={closeMenu}>
          Home<span>Service</span>
        </Link>
        
        <div className={styles.navRightGroup}>
          <div className={`${styles.navLinks} ${isOpen ? styles.navLinksActive : ''}`}>
            <Link href="/services" className={styles.navLink} onClick={closeMenu}>Services</Link>
            <Link href="/professionals" className={styles.navLink} onClick={closeMenu}>Professionals</Link>
            <Link href="/dashboard" className={styles.navLink} onClick={closeMenu}>Dashboard</Link>
            <Link href="/about" className={styles.navLink} onClick={closeMenu}>About Us</Link>
          </div>

          <div className={styles.navActions}>
            <Link href="/dashboard" className={styles.profileBadge} onClick={closeMenu}>
              <span className={styles.avatar}>👤</span>
              <span className={styles.profileText}>My Account</span>
            </Link>
          </div>

          <button 
            className={styles.menuToggle} 
            onClick={toggleMenu} 
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <span className={`${styles.hamburger} ${isOpen ? styles.hamburgerOpen : ''}`}></span>
          </button>
        </div>
      </div>
    </nav>
  );
}
