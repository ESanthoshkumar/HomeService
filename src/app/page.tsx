'use client';
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

const categories = [
  { 
    id: "cleaning", 
    name: "Home Cleaning", 
    icon: "🧹", 
    desc: "Kitchen, bathroom & sofa deep cleaning", 
    price: "Starts at ₹120", 
    badge: "Best Seller" 
  },
  { 
    id: "salon", 
    name: "Salon at Home", 
    icon: "✂️", 
    desc: "Premium grooming, spas & hair services", 
    price: "Starts at ₹40", 
    badge: "Flat 20% Off" 
  },
  { 
    id: "repair", 
    name: "Appliance Repair", 
    icon: "🔧", 
    desc: "AC, refrigerator, microwave & TV repair", 
    price: "Starts at ₹50", 
    badge: "Superfast" 
  },
  { 
    id: "plumbing", 
    name: "Plumbing Services", 
    icon: "🚰", 
    desc: "Leak detection, pipe repairs & fittings", 
    price: "Starts at ₹30", 
    badge: "24/7 Support" 
  },
  { 
    id: "electrician", 
    name: "Electrician", 
    icon: "⚡", 
    desc: "Socket installations, wiring & repairs", 
    price: "Starts at ₹35", 
    badge: "Safety Vetted" 
  },
  { 
    id: "painting", 
    name: "Home Painting", 
    icon: "🎨", 
    desc: "Full wall styling, consultations & designs", 
    price: "Starts at ₹250", 
    badge: "100% Quality" 
  },
];

const testimonials = [
  {
    id: 1,
    name: "Aishwarya Rai",
    role: "Homeowner",
    rating: 5,
    text: "The deep cleaning service was absolutely flawless. The experts were courteous, background-verified, and left our house completely spotless. Will definitely book again!",
    avatar: "A"
  },
  {
    id: 2,
    name: "Rohan Das",
    role: "Software Architect",
    rating: 5,
    text: "My AC stopped working during a hot afternoon. I booked an appliance expert, and he arrived within 2 hours. Extremely transparent prices and high-quality parts.",
    avatar: "R"
  },
  {
    id: 3,
    name: "Meera Nair",
    role: "Business Consultant",
    rating: 5,
    text: "Getting a premium hair spa at home is such a convenience. The professional came equipped with all the sanitized materials. Highly professional and relaxing!",
    avatar: "M"
  }
];

const quickTags = [
  { label: "Deep Cleaning", categoryId: "cleaning" },
  { label: "AC Repair", categoryId: "repair" },
  { label: "Haircut", categoryId: "salon" },
  { label: "Leak Fix", categoryId: "plumbing" }
];

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFeedback, setSearchFeedback] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const query = searchQuery.toLowerCase();
    
    // Simple routing logic based on query matching
    if (query.includes("clean") || query.includes("sofa") || query.includes("home")) {
      router.push("/category/cleaning");
    } else if (query.includes("salon") || query.includes("hair") || query.includes("groom") || query.includes("spa")) {
      router.push("/category/salon");
    } else if (query.includes("repair") || query.includes("ac") || query.includes("fridge") || query.includes("appliance")) {
      router.push("/category/repair");
    } else if (query.includes("plumb") || query.includes("leak") || query.includes("tap") || query.includes("water")) {
      router.push("/category/plumbing");
    } else if (query.includes("elect") || query.includes("wire") || query.includes("light") || query.includes("switch")) {
      router.push("/category/electrician");
    } else if (query.includes("paint") || query.includes("wall") || query.includes("brush")) {
      router.push("/category/painting");
    } else {
      setSearchFeedback("No matching service category found. Try searching 'Cleaning' or 'AC Repair'!");
      setTimeout(() => setSearchFeedback(""), 3500);
    }
  };

  const handleTagClick = (tagLabel: string, categoryId: string) => {
    setSearchQuery(tagLabel);
    router.push(`/category/${categoryId}`);
  };

  return (
    <div className={styles.homeContainer}>
      
      {/* 🚀 Dynamic Hero Section */}
      <section className={styles.heroSection}>
        <div className={`container ${styles.heroContainer}`}>
          
          <div className={styles.heroLeft}>
            <div className={styles.heroBadge}>✨ Real-time Verified Home Experts</div>
            <h1 className="animate-fade-in">
              Premium home services, <br />
              <span className="text-accent">on demand.</span>
            </h1>
            <p className="text-muted mt-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Discover the best background-checked professionals for all your home cleaning, grooming, repair, and wiring needs.
            </p>
            
            <form onSubmit={handleSearchSubmit} className={`${styles.searchBox} glass mt-8 animate-fade-in`} style={{ animationDelay: '0.2s' }}>
              <input 
                type="text" 
                placeholder="Search for 'AC Repair', 'Deep Cleaning'..." 
                className={styles.searchInput}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="btn-accent">Search</button>
            </form>

            {searchFeedback && (
              <p className={styles.searchFeedbackText}>{searchFeedback}</p>
            )}

            {/* Quick search tags */}
            <div className={`${styles.quickTagsContainer} animate-fade-in`} style={{ animationDelay: '0.3s' }}>
              <span>Popular searches:</span>
              <div className={styles.tagWrapper}>
                {quickTags.map((tag) => (
                  <button
                    key={tag.label}
                    type="button"
                    className={styles.tagBtn}
                    onClick={() => handleTagClick(tag.label, tag.categoryId)}
                  >
                    {tag.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.heroRight}>
            <div className={styles.visualGrid}>
              <div className={styles.visualCard} style={{ gridArea: '1 / 1 / 3 / 2' }}>
                <Image 
                  src="/images/cleaning.png" 
                  alt="Cleaning expert" 
                  width={220} 
                  height={320} 
                  className={styles.heroVisualImg}
                  priority
                />
                <div className={styles.floatingTag}>🧹 Deep Cleaning</div>
              </div>
              <div className={styles.visualCard} style={{ gridArea: '1 / 2 / 2 / 3' }}>
                <Image 
                  src="/images/salon.png" 
                  alt="Salon specialist" 
                  width={220} 
                  height={150} 
                  className={styles.heroVisualImg}
                  priority
                />
                <div className={styles.floatingTag}>✂️ Salon</div>
              </div>
              <div className={styles.visualCard} style={{ gridArea: '2 / 2 / 3 / 3' }}>
                <Image 
                  src="/images/repair.png" 
                  alt="Repair technician" 
                  width={220} 
                  height={150} 
                  className={styles.heroVisualImg}
                  priority
                />
                <div className={styles.floatingTag}>🔧 Repairs</div>
              </div>
            </div>
            
            {/* Metric floatings */}
            <div className={`${styles.metricFloat} ${styles.floatLeft}`}>
              <span className={styles.floatIcon}>⭐</span>
              <div>
                <strong>4.9 / 5.0</strong>
                <p>Average Rating</p>
              </div>
            </div>
            <div className={`${styles.metricFloat} ${styles.floatRight}`}>
              <span className={styles.floatIcon}>🛡️</span>
              <div>
                <strong>100% Insured</strong>
                <p>Satisfaction Assured</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 🛡️ Brand Promises Section */}
      <section className={styles.promisesSection}>
        <div className="container">
          <div className={styles.promisesGrid}>
            <div className={`glass ${styles.promiseCard}`}>
              <div className={styles.promiseIcon}>🛡️</div>
              <h3>Background Checked</h3>
              <p>Every professional undergoes rigorous criminal background checks and identity checks.</p>
            </div>
            <div className={`glass ${styles.promiseCard}`}>
              <div className={styles.promiseIcon}>⚡</div>
              <h3>Superfast Response</h3>
              <p>Book instantly online. Your verified professional arrives at your doorstep in under 2 hours.</p>
            </div>
            <div className={`glass ${styles.promiseCard}`}>
              <div className={styles.promiseIcon}>💰</div>
              <h3>No Hidden Pricing</h3>
              <p>Know exactly what you pay before booking. Transparent, upfront quotes with zero surprises.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 🧹 Categories Listing Section */}
      <section className="container py-20">
        <div className={styles.sectionHeadingBlock}>
          <h2>Exquisite Services, Handled Professionally</h2>
          <p className="text-muted mt-2">Background-verified experts at your service. Choose a category below.</p>
        </div>
        
        <div className={styles.categoryGrid}>
          {categories.map((cat, index) => (
            <Link 
              href={`/category/${cat.id}`} 
              key={cat.id}
              className={`glass ${styles.categoryCard}`}
              style={{ animationDelay: `${0.05 * index}s` }}
            >
              {cat.badge && <span className={styles.categoryBadge}>{cat.badge}</span>}
              <div className={styles.categoryIcon}>{cat.icon}</div>
              <div className={styles.categoryCardBody}>
                <h3>{cat.name}</h3>
                <p className={styles.categoryDesc}>{cat.desc}</p>
                <span className={styles.categoryPrice}>{cat.price}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ❄️ Special Offers Promo Section */}
      <section className={styles.bannerSection}>
        <div className={`container ${styles.bannerContainer}`}>
          <div className={styles.bannerContent}>
            <span className={styles.promoBadge}>WINTER SPECIALS</span>
            <h2>Home Rejuvenation Sale</h2>
            <p className="mt-4 mb-8">
              Keep your home healthy this winter. Get up to 30% off on all deep sanitization, vacuuming, and kitchen scrub-down services.
            </p>
            <Link href="/category/cleaning" className="btn-accent">Claim 30% Discount</Link>
          </div>
          <div className={styles.bannerVisualColumn}>
            <div className={styles.promoCouponCard}>
              <div className={styles.couponTop}>
                <span>OFFER CODE</span>
                <h3>WINTER30</h3>
              </div>
              <div className={styles.couponDivider}></div>
              <div className={styles.couponBottom}>
                <p>30% Off Home Deep Cleaning</p>
                <span>Valid till End of Month</span>
              </div>
            </div>
            <div className={styles.decorativeCircle}></div>
          </div>
        </div>
      </section>

      {/* 🗣️ Customer Testimonials Section */}
      <section className={styles.testimonialsSection}>
        <div className="container">
          <div className="text-center mb-16">
            <h2>What Our Customers Say</h2>
            <p className="text-muted mt-2">Real reviews from homeowners who trust HomeService every day</p>
          </div>

          <div className={styles.testimonialsGrid}>
            {testimonials.map((t) => (
              <div key={t.id} className={`glass ${styles.testimonialCard}`}>
                <div className={styles.ratingRow}>
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <span key={idx} className={styles.star}>★</span>
                  ))}
                </div>
                <p className={styles.testimonialText}>&ldquo;{t.text}&rdquo;</p>
                <div className={styles.testimonialUser}>
                  <div className={styles.userAvatar}>{t.avatar}</div>
                  <div>
                    <h4>{t.name}</h4>
                    <span className={styles.userRole}>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
