import styles from './page.module.css';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: "All Home Services - Premium Services",
  description: "Browse all background-verified professional services. From deep cleaning and appliance repair to personal salon care.",
};

const categories = [
  {
    id: "cleaning",
    title: "Home Cleaning",
    description: "Professional cleaning services for your entire home. Let our trained experts handle the dirt.",
    image: "/images/cleaning.png",
    servicesCount: "3 Services Available",
    highlights: ["Deep Cleaning", "Sofa Cleaning", "Bathroom Cleaning"],
    rating: "4.8"
  },
  {
    id: "salon",
    title: "Salon at Home",
    description: "Premium beauty treatments in the comfort of your home. Professional stylists at your service.",
    image: "/images/salon.png",
    servicesCount: "2 Services Available",
    highlights: ["Haircut & Styling", "Manicure & Pedicure"],
    rating: "4.9"
  },
  {
    id: "repair",
    title: "Appliance Repair",
    description: "Expert repair services for all your home appliances. 90-day service warranty guaranteed.",
    image: "/images/repair.png",
    servicesCount: "2 Services Available",
    highlights: ["AC Service", "Washing Machine Repair"],
    rating: "4.7"
  },
  {
    id: "plumbing",
    title: "Plumbing Services",
    description: "Reliable plumbing solutions for your home. From quick fixes to complete pipeline overhauls.",
    image: "/images/plumbing.png",
    servicesCount: "2 Services Available",
    highlights: ["Tap Repair", "Pipe Leakage Fix"],
    rating: "4.8"
  }
];

export default function ServicesPage() {
  return (
    <div className={styles.servicesPage}>
      {/* Header Banner */}
      <div className={styles.hero}>
        <div className="container text-center">
          <div className={styles.badge}>Premium Home Services</div>
          <h1 className="animate-fade-in">Explore Our Services</h1>
          <p className="mt-4 text-muted animate-fade-in mx-auto" style={{ animationDelay: '0.1s', maxWidth: '600px' }}>
            Book trusted, background-verified professionals for all your home cleaning, repair, plumbing, and personal salon needs.
          </p>
        </div>
      </div>

      {/* Grid List */}
      <div className="container py-16">
        <div className={styles.grid}>
          {categories.map((category, index) => (
            <div 
              key={category.id} 
              className={styles.card}
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <div className={styles.imageWrapper}>
                <Image 
                  src={category.image} 
                  alt={category.title} 
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className={styles.cardImg}
                />
                <div className={styles.ratingBadge}>
                  ★ {category.rating}
                </div>
              </div>
              
              <div className={styles.cardBody}>
                <span className={styles.serviceCount}>{category.servicesCount}</span>
                <h3>{category.title}</h3>
                <p>{category.description}</p>
                
                <div className={styles.highlights}>
                  {category.highlights.map((highlight, idx) => (
                    <span key={idx} className={styles.highlightBadge}>
                      {highlight}
                    </span>
                  ))}
                </div>
                
                <Link href={`/category/${category.id}`} className={styles.cardBtn}>
                  Explore Services →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
