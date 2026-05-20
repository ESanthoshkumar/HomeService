import styles from './page.module.css';
import Link from 'next/link';
import Image from 'next/image';

interface ServiceItem {
  id: number;
  name: string;
  rating: number;
  reviews: string;
  price: string;
  time: string;
  popular: boolean;
  description: string;
}

interface CategoryData {
  title: string;
  description: string;
  image: string;
  cardImage: string;
  stats: {
    rating: string;
    customers: string;
    time: string;
  };
  services: ServiceItem[];
}

// Mock data for services with added card images and metadata
const servicesData: Record<string, CategoryData> = {
  cleaning: {
    title: "Home Cleaning",
    description: "Professional cleaning services for your entire home. Let our trained experts handle the dirt.",
    image: "/images/cleaning.png",
    cardImage: "/images/card_cleaning.png",
    stats: { rating: "4.8", customers: "25k+", time: "Same Day" },
    services: [
      { id: 1, name: "Deep Home Cleaning", rating: 4.8, reviews: "24K", price: "₹120", time: "3-4 hrs", popular: true, description: "Intense kitchen, bathroom, and room cleaning including cabinets and windows." },
      { id: 2, name: "Sofa Cleaning", rating: 4.7, reviews: "12K", price: "₹40", time: "1 hr", popular: false, description: "Professional extraction cleaning for sofa, couch, or armchairs." },
      { id: 3, name: "Bathroom Cleaning", rating: 4.9, reviews: "30K", price: "₹35", time: "1.5 hrs", popular: true, description: "Deep scrubbing of tiles, tub, toilet, and sink disinfection." },
    ]
  },
  salon: {
    title: "Salon at Home",
    description: "Premium beauty treatments in the comfort of your home. Professional stylists at your service.",
    image: "/images/salon.png",
    cardImage: "/images/card_salon.png",
    stats: { rating: "4.9", customers: "18k+", time: "Flexible Booking" },
    services: [
      { id: 4, name: "Haircut & Styling", rating: 4.8, reviews: "15K", price: "₹45", time: "45 mins", popular: false, description: "Includes hair wash, head massage, customized haircut, and blow dry styling." },
      { id: 5, name: "Manicure & Pedicure", rating: 4.9, reviews: "20K", price: "₹60", time: "1.5 hrs", popular: true, description: "Premium spa mani-pedi with scrub, massage, and high-shine gel polish." },
    ]
  },
  repair: {
    title: "Appliance Repair",
    description: "Expert repair services for all your home appliances. 90-day service warranty guaranteed.",
    image: "/images/repair.png",
    cardImage: "/images/card_repair.png",
    stats: { rating: "4.7", customers: "40k+", time: "Under 2 hrs" },
    services: [
      { id: 6, name: "AC Service and Repair", rating: 4.7, reviews: "40K", price: "₹50", time: "1 hr", popular: true, description: "Filter cleaning, gas check, cooling optimization, and fault diagnosis." },
      { id: 7, name: "Washing Machine Repair", rating: 4.6, reviews: "18K", price: "₹40", time: "1 hr", popular: false, description: "In-home repair for top/front loaders. Fixes drum, water inlet, or electrical faults." },
    ]
  },
  plumbing: {
    title: "Plumbing Services",
    description: "Reliable plumbing solutions for your home. From quick fixes to complete pipeline overhauls.",
    image: "/images/plumbing.png",
    cardImage: "/images/card_plumbing.png",
    stats: { rating: "4.8", customers: "10k+", time: "Emergency Service" },
    services: [
      { id: 8, name: "Tap Repair & Installation", rating: 4.8, reviews: "10K", price: "₹25", time: "30 mins", popular: true, description: "Fixing leaky faucets, mixer taps, or installing new luxury bathroom fittings." },
      { id: 9, name: "Pipe Leakage Fix", rating: 4.7, reviews: "14K", price: "₹45", time: "1 hr", popular: false, description: "Locating and resolving hidden pipe leaks with non-invasive high-tech tools." },
    ]
  }
};

export default async function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const category = servicesData[id];

  if (!category) {
    return (
      <div className="container py-20 text-center">
        <h2>Category Not Found</h2>
        <p className="mt-4">The category you are looking for does not exist.</p>
        <Link href="/" className="btn-primary mt-8">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className={styles.categoryPage}>
      {/* Category Header */}
      <div className={styles.header}>
        <div className={`container ${styles.headerContainer}`}>
          <div className={styles.headerText}>
            <div className={styles.badge}>Premium Quality Verified</div>
            <h1 className="animate-fade-in">{category.title}</h1>
            <p className="mt-4 text-muted animate-fade-in" style={{ animationDelay: '0.1s' }}>
              {category.description}
            </p>

            {/* Trust Stats Row */}
            <div className={`${styles.statsRow} animate-fade-in`} style={{ animationDelay: '0.2s' }}>
              <div className={styles.statBox}>
                <span className={styles.statValue}>★ {category.stats.rating}</span>
                <span className={styles.statLabel}>Avg Rating</span>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.statBox}>
                <span className={styles.statValue}>{category.stats.customers}</span>
                <span className={styles.statLabel}>Happy Orders</span>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.statBox}>
                <span className={styles.statValue}>{category.stats.time}</span>
                <span className={styles.statLabel}>Availability</span>
              </div>
            </div>
          </div>

          {category.image && (
            <div className={`${styles.headerImage} animate-fade-in`} style={{ animationDelay: '0.3s' }}>
              <div className={styles.imageGlowWrapper}>
                <Image
                  src={category.image}
                  alt={category.title}
                  width={500}
                  height={320}
                  priority
                  className={styles.bannerImg}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="container py-16">
        <div className={styles.mainLayout}>

          {/* Services Section */}
          <div className={styles.servicesSection}>
            <h2 className={styles.sectionTitle}>Select Service</h2>
            <p className={styles.sectionSubtitle}>Choose a service to customize your booking.</p>

            <div className={styles.serviceList}>
              {category.services.map((service: ServiceItem, index: number) => (
                <div
                  key={service.id}
                  className={`${styles.serviceCard} ${service.popular ? styles.popularCard : ''}`}
                  style={{ animationDelay: `${0.1 * index}s` }}
                >
                  {service.popular && (
                    <span className={styles.popularTag}>BEST SELLER</span>
                  )}

                  <div className={styles.cardContent}>
                    {/* Square Thumbnail */}
                    <div className={styles.cardThumbnailWrapper}>
                      <Image
                        src={category.cardImage}
                        alt={service.name}
                        width={120}
                        height={120}
                        className={styles.cardThumbnail}
                      />
                    </div>

                    {/* Service Info */}
                    <div className={styles.serviceInfo}>
                      <h3>{service.name}</h3>
                      <p className={styles.serviceDesc}>{service.description}</p>

                      <div className={styles.metaRow}>
                        <div className={styles.rating}>
                          <span className={styles.star}>★</span> {service.rating}
                          <span className={styles.reviewsCount}>({service.reviews} reviews)</span>
                        </div>
                        <span className={styles.bullet}>•</span>
                        <div className={styles.timeTag}>⏱ {service.time}</div>
                      </div>
                    </div>

                    {/* Action Block */}
                    <div className={styles.cardAction}>
                      <div className={styles.priceTag}>{service.price}</div>
                      <Link href={`/checkout?service=${service.id}`} className={styles.addButton}>
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar Guarantee Section */}
          <div className={styles.sidebarSection}>
            <div className={styles.guaranteeCard}>
              <h3>Home Service Guarantee</h3>
              <p>Book with peace of mind. We cover you from check-in to finish.</p>

              <div className={styles.badgeList}>
                <div className={styles.badgeItem}>
                  <div className={styles.badgeIcon}>🛡️</div>
                  <div className={styles.badgeText}>
                    <h4>100% Insured Services</h4>
                    <p>Up to ₹1,000 damage coverage on every booking.</p>
                  </div>
                </div>

                <div className={styles.badgeItem}>
                  <div className={styles.badgeIcon}>✨</div>
                  <div className={styles.badgeText}>
                    <h4>Top-Tier Professionals</h4>
                    <p>Background-checked, 4.8+ rated certified experts only.</p>
                  </div>
                </div>

                <div className={styles.badgeItem}>
                  <div className={styles.badgeIcon}>🔄</div>
                  <div className={styles.badgeText}>
                    <h4>Free Rework Guarantee</h4>
                    <p>Not satisfied? We will redo it completely for free.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.helpCard}>
              <h4>Need help deciding?</h4>
              <p>Chat with a dedicated home service advisor to get a custom quote.</p>
              <button className={styles.chatButton}>💬 Chat with Us</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
