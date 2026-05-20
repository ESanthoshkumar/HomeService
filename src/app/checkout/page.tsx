'use client';
import { useState, Suspense } from 'react';
import styles from './page.module.css';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

// Lookup for services to match the ID from dynamic page
const servicesLookup: Record<string, { name: string; price: string }> = {
  "1": { name: "Deep Home Cleaning", price: "₹120" },
  "2": { name: "Sofa Cleaning", price: "₹40" },
  "3": { name: "Bathroom Cleaning", price: "₹35" },
  "4": { name: "Haircut & Styling", price: "₹45" },
  "5": { name: "Manicure & Pedicure", price: "₹60" },
  "6": { name: "AC Service and Repair", price: "₹50" },
  "7": { name: "Washing Machine Repair", price: "₹40" },
  "8": { name: "Tap Repair & Installation", price: "₹25" },
  "9": { name: "Pipe Leakage Fix", price: "₹45" },
};

const serviceCategories: Record<string, string> = {
  "1": "cleaning", "2": "cleaning", "3": "cleaning",
  "4": "salon", "5": "salon",
  "6": "repair", "7": "repair",
  "8": "plumbing", "9": "plumbing"
};

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="container py-20 text-center">
        <h2>Loading Checkout...</h2>
        <p className="text-muted mt-2">Retrieving your service choices.</p>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}

function CheckoutContent() {
  const searchParams = useSearchParams();
  const serviceId = searchParams.get('service') || '1';
  const service = servicesLookup[serviceId] || servicesLookup['1'];

  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  // Customer details form states (lazily loaded from localStorage)
  const [fullName, setFullName] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedProfile = localStorage.getItem('home_service_profile');
        if (savedProfile) {
          const profile = JSON.parse(savedProfile);
          return profile.fullName || '';
        }
      } catch (e) {
        console.error("Error loading profile from localStorage:", e);
      }
    }
    return '';
  });

  const [mobileNumber, setMobileNumber] = useState(() => "9342256635")
  // {
  // if (typeof window !== 'undefined') {
  //   try {
  //     const savedProfile = localStorage.getItem('home_service_profile');
  //     if (savedProfile) {
  //       const profile = JSON.parse(savedProfile);
  //       return profile.mobileNumber || '';
  //     }
  //   } catch (e) {
  //     console.error("Error loading profile from localStorage:", e);
  //   }
  // }
  // return '';
  // });

  const [address, setAddress] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedProfile = localStorage.getItem('home_service_profile');
        if (savedProfile) {
          const profile = JSON.parse(savedProfile);
          return profile.address || '';
        }
      } catch (e) {
        console.error("Error loading profile from localStorage:", e);
      }
    }
    return '';
  });

  const dates = ['Today', 'Tomorrow', 'Day After'];
  const times = ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM', '06:00 PM'];

  const priceNum = parseInt(service.price.replace(/[^\d]/g, '')) || 0;
  const taxesAndFees = 12;
  const totalPrice = `₹${priceNum + taxesAndFees}`;

  // Formulate the WhatsApp API URL with prefilled message details
  const getWhatsAppUrl = () => {
    const message = `Hello! I've booked a service on Home Service:\n\n` +
      `🛠️ *Service:* ${service.name}\n` +
      `📅 *Date:* ${selectedDate}\n` +
      `⏱️ *Time:* ${selectedTime}\n` +
      `💵 *Total:* ${totalPrice} (${service.price} + ₹${taxesAndFees} Taxes & Fee)\n\n` +
      `👤 *Customer:* ${fullName}\n` +
      `📞 *Mobile:* ${mobileNumber}\n` +
      `📍 *Address:* ${address}\n\n` +
      `Please confirm my booking!`;
    const cleanPhone = mobileNumber.replace(/[^\d]/g, '');
    return `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(message)}`;
  };

  const handleNext = () => setStep(step + 1);

  const handleConfirmAndPay = () => {
    // Save to localStorage
    const newBooking = {
      id: `HS-${Date.now()}`,
      serviceId,
      serviceName: service.name,
      price: service.price,
      totalPrice,
      date: selectedDate,
      time: selectedTime,
      customerName: fullName,
      mobile: mobileNumber,
      address: address,
      status: 'Scheduled',
      category: serviceCategories[serviceId] || 'cleaning',
      createdAt: new Date().toISOString()
    };

    try {
      const existingBookingsStr = localStorage.getItem('home_service_bookings');
      const existingBookings = existingBookingsStr ? JSON.parse(existingBookingsStr) : [];
      existingBookings.unshift(newBooking);
      localStorage.setItem('home_service_bookings', JSON.stringify(existingBookings));
    } catch (e) {
      console.error("Error saving booking to localStorage:", e);
    }

    const url = getWhatsAppUrl();
    // Open WhatsApp in a new window/tab
    window.open(url, '_blank');
    setStep(3);
  };

  const isFormValid = fullName.trim() !== '' && mobileNumber.trim() !== '' && address.trim() !== '';

  return (
    <div className={`container py-12 ${styles.checkoutContainer}`}>
      <div className={styles.mainContent}>
        <div className={styles.progressHeader}>
          <h2>{step === 1 ? 'Select Date & Time' : step === 2 ? 'Address Details' : 'Booking Confirmed!'}</h2>
          <div className={styles.stepIndicator}>Step {step} of 3</div>
        </div>

        {step === 1 && (
          <div className={`animate-fade-in ${styles.stepContent}`}>
            <h3>Select Date</h3>
            <div className={styles.optionsGrid}>
              {dates.map((date) => (
                <div
                  key={date}
                  className={`${styles.optionCard} ${selectedDate === date ? styles.selected : ''}`}
                  onClick={() => setSelectedDate(date)}
                >
                  {date}
                </div>
              ))}
            </div>

            <h3 className="mt-8">Select Time</h3>
            <div className={styles.optionsGrid}>
              {times.map((time) => (
                <div
                  key={time}
                  className={`${styles.optionCard} ${selectedTime === time ? styles.selected : ''}`}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </div>
              ))}
            </div>

            <div className="mt-8">
              <button
                className="btn-accent"
                onClick={handleNext}
                disabled={!selectedDate || !selectedTime}
              >
                Continue to Address
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className={`animate-fade-in ${styles.stepContent}`}>
            <div className={styles.formGroup}>
              <label>Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Mobile Number</label>
              <input
                type="text"
                placeholder="+1 234 567 8900"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Complete Address</label>
              <textarea
                placeholder="House No, Building, Street, City"
                rows={4}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></textarea>
            </div>

            <div className="mt-8 flex gap-4">
              <button className="btn-primary" onClick={() => setStep(1)} style={{ background: 'var(--secondary-color)' }}>
                Back
              </button>
              <button
                className="btn-accent"
                onClick={handleConfirmAndPay}
                disabled={!isFormValid}
              >
                Confirm & Book via WhatsApp
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className={`animate-fade-in ${styles.stepContent} ${styles.successContent}`}>
            <div className={styles.successIcon}>✓</div>
            <h2>Booking Confirmed!</h2>
            <p className="text-muted mt-4">Your professional will arrive on <strong>{selectedDate}</strong> at <strong>{selectedTime}</strong>.</p>
            <p className="text-muted">A WhatsApp confirmation window should have opened. If not, use the button below to send details manually.</p>

            <div className={styles.actionRow}>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.whatsappBtn}
              >
                💬 Open WhatsApp Again
              </a>

              <Link href="/" className={styles.homeLinkBtn}>
                Return to Home
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className={styles.summarySidebar}>
        <div className={styles.summaryCard}>
          <h3>Booking Summary</h3>
          <div className={styles.summaryItem}>
            <span>{service.name}</span>
            <span>{service.price}</span>
          </div>
          <div className={styles.summaryItem}>
            <span>Taxes & Fee</span>
            <span>₹{taxesAndFees}</span>
          </div>
          <div className={styles.divider}></div>
          <div className={`${styles.summaryItem} ${styles.total}`}>
            <span>Total</span>
            <span>{totalPrice}</span>
          </div>

          <div className={styles.guarantee}>
            🛡️ Home Service Guarantee
            <p>100% Satisfaction or free rework</p>
          </div>
        </div>
      </div>
    </div>
  );
}
