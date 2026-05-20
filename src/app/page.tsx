import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

const categories = [
  { id: "cleaning", name: "Home Cleaning", icon: "🧹" },
  { id: "salon", name: "Salon at Home", icon: "✂️" },
  { id: "repair", name: "Appliance Repair", icon: "🔧" },
  { id: "plumbing", name: "Plumbing", icon: "🚰" },
  { id: "electrician", name: "Electrician", icon: "⚡" },
  { id: "painting", name: "Home Painting", icon: "🎨" },
];

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className="container">
          <div className={styles.heroContent}>
            <h1 className="animate-fade-in">
              Premium home services, <br />
              <span className="text-accent">on demand.</span>
            </h1>
            <p className="text-muted mt-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Discover the best professionals for all your home needs, trusted by millions.
            </p>
            
            <div className={`${styles.searchBox} glass mt-8 animate-fade-in`} style={{ animationDelay: '0.2s' }}>
              <input 
                type="text" 
                placeholder="Search for a service e.g. 'AC Repair'" 
                className={styles.searchInput}
              />
              <button className="btn-accent">Search</button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container py-20">
        <h2 className="text-center mb-8">What are you looking for?</h2>
        <div className={styles.categoryGrid}>
          {categories.map((cat, index) => (
            <Link 
              href={`/category/${cat.id}`} 
              key={cat.id}
              className={styles.categoryCard}
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <div className={styles.categoryIcon}>{cat.icon}</div>
              <h3>{cat.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Services Banner */}
      <section className={styles.bannerSection}>
        <div className={`container ${styles.bannerContainer}`}>
          <div className={styles.bannerContent}>
            <h2>Winter Special Offers</h2>
            <p className="mt-4 mb-8">Get up to 30% off on all deep cleaning services this month.</p>
            <button className="btn-primary">Explore Offers</button>
          </div>
          <div className={styles.bannerImagePlaceholder}>
            <div className={styles.decorativeCircle}></div>
            <div className={styles.decorativeSquare}></div>
          </div>
        </div>
      </section>
    </div>
  );
}
