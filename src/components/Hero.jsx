import { useState, useEffect, useRef } from 'react';
import {
  FaTooth, FaCheckCircle, FaArrowRight,
  FaStar, FaPhoneAlt, FaUsers, FaAward, FaSmile,
} from 'react-icons/fa';
import { MdVerified, MdHealthAndSafety } from 'react-icons/md';
import '../styles/Hero.css';

/* ── Trust checkpoints ── */
const TRUST_POINTS = [
  { icon: <FaCheckCircle />, text: 'Experienced Dentists' },
  { icon: <FaCheckCircle />, text: 'Modern Equipment'     },
  { icon: <FaCheckCircle />, text: 'Comfortable Treatment'},
];

/* ── Animated counter hook ── */
function useCounter(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

/* ── Stats data ── */
const STATS = [
  { icon: <FaUsers />,  value: 15000, suffix: '+', label: 'Happy Patients'    },
  { icon: <FaAward />,  value: 10,    suffix: '+', label: 'Years Experience'  },
  { icon: <FaSmile />,  value: 98,    suffix: '%', label: 'Success Rate'      },
  { icon: <FaTooth />,  value: 25,    suffix: '+', label: 'Expert Dentists'   },
];

/* ── Individual animated stat ── */
function StatItem({ icon, value, suffix, label, animate }) {
  const count = useCounter(value, 1600, animate);
  return (
    <div className="hero-stat-item">
      <div className="hero-stat-icon" aria-hidden="true">{icon}</div>
      <div className="hero-stat-body">
        <strong>
          {count.toLocaleString()}{suffix}
        </strong>
        <span>{label}</span>
      </div>
    </div>
  );
}

export default function Hero({ setCurrentPage }) {
  const sectionRef  = useRef(null);
  const [statsGo, setStatsGo] = useState(false);

  /* Trigger counter when hero is in view */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsGo(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="home" className="hero" ref={sectionRef} aria-label="Hero section">

      {/* ── Decorative background shapes ── */}
      <div className="hero-shape hero-shape-1" aria-hidden="true" />
      <div className="hero-shape hero-shape-2" aria-hidden="true" />
      <div className="hero-shape hero-shape-3" aria-hidden="true" />
      <div className="hero-dots"               aria-hidden="true" />

      <div className="container">
        <div className="hero-grid">

          {/* ════════════ LEFT CONTENT ════════════ */}
          <div className="hero-content">

            {/* Badge */}
            <div className="hero-badge animate-fadeInUp">
              <MdVerified aria-hidden="true" />
              <span>Trusted Dental Care for Your Family</span>
            </div>

            {/* Headline */}
            <h1 className="hero-title animate-fadeInUp delay-100">
              Healthy Smiles Start with{' '}
              <span className="hero-title-highlight">Expert Dental Care</span>
            </h1>

            {/* Description */}
            <p className="hero-desc animate-fadeInUp delay-200">
              Experience comfortable, professional, and affordable dental
              treatments from our experienced dental specialists. Your
              perfect smile is just one appointment away.
            </p>

            {/* CTA Buttons */}
            <div className="hero-buttons animate-fadeInUp delay-300">
              <button
                className="hero-btn-primary"
                onClick={() => setCurrentPage ? setCurrentPage('contact') : scrollTo('appointment')}
                aria-label="Book an appointment"
              >
                Book an Appointment
                <FaArrowRight aria-hidden="true" />
              </button>
              <button
                className="hero-btn-secondary"
                onClick={() => setCurrentPage ? setCurrentPage('service') : scrollTo('treatments')}
                aria-label="View dental treatments"
              >
                <span className="play-circle" aria-hidden="true">
                  <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor">
                    <path d="M0 0l10 6-10 6V0z"/>
                  </svg>
                </span>
                View Treatments
              </button>
            </div>

            {/* Trust Points */}
            <div className="hero-trust animate-fadeInUp delay-400" role="list" aria-label="Trust highlights">
              {TRUST_POINTS.map((item, i) => (
                <div className="trust-item" key={i} role="listitem">
                  <div className="trust-icon" aria-hidden="true">{item.icon}</div>
                  <span className="trust-text">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="hero-divider animate-fadeInUp delay-500" aria-hidden="true" />

            {/* Stats Row */}
            <div className="hero-stats animate-fadeInUp delay-600" role="list" aria-label="Clinic statistics">
              {STATS.map((s, i) => (
                <StatItem key={i} {...s} animate={statsGo} />
              ))}
            </div>
          </div>

          {/* ════════════ RIGHT IMAGE ════════════ */}
          <div className="hero-visual">

            {/* Rating pill – top right */}
            <div className="hero-pill hero-pill-rating animate-fadeInRight delay-200" aria-label="Patient rating">
              <div className="pill-stars" aria-hidden="true">
                {[...Array(5)].map((_, i) => <FaStar key={i} />)}
              </div>
              <div>
                <strong>4.9 / 5.0</strong>
                <span>Patient Rating</span>
              </div>
            </div>

            {/* Main image frame */}
            <div className="hero-img-frame animate-fadeInRight delay-100">
              <div className="hero-img-overlay" aria-hidden="true" />
              <img
                src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&h=960&fit=crop&auto=format&q=80"
                alt="Smiling dentist examining a patient inside a bright, modern dental clinic"
                loading="eager"
                fetchPriority="high"
              />
            </div>

            {/* Floating card – bottom-left: experience */}
            <div className="hero-float-card hero-float-card-exp animate-fadeInUp delay-400" aria-label="Years of experience">
              <div className="float-icon float-icon-blue" aria-hidden="true">
                <FaTooth />
              </div>
              <div className="float-card-body">
                <strong>10+ Years</strong>
                <span>of Dental Excellence</span>
              </div>
            </div>

            {/* Floating card – top-left: emergency */}
            <div className="hero-float-card hero-float-card-call animate-fadeInLeft delay-500" aria-label="Emergency support">
              <div className="float-icon float-icon-green" aria-hidden="true">
                <MdHealthAndSafety />
              </div>
              <div className="float-card-body">
                <strong>24 / 7</strong>
                <span>Emergency Support</span>
              </div>
            </div>

            {/* Decorative ring behind image */}
            <div className="hero-ring"   aria-hidden="true" />
            <div className="hero-ring-2" aria-hidden="true" />
          </div>

        </div>
      </div>

      {/* Wave divider */}
      <div className="hero-wave" aria-hidden="true">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#ffffff"/>
        </svg>
      </div>
    </section>
  );
}
