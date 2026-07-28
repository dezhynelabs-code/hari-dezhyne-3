import { useEffect, useRef, useState } from 'react';
import {
  FaTooth, FaTeeth, FaTeethOpen, FaSyringe, FaArrowRight, FaChevronDown,
} from 'react-icons/fa';
import { GiTooth } from 'react-icons/gi';
import { MdOutlineHealthAndSafety } from 'react-icons/md';
import { treatments } from '../data/treatments';
import '../styles/Treatments.css';

/* Icon mapping */
const iconMap = {
  FaTooth:    <FaTooth />,
  FaTeeth:    <FaTeeth />,
  GiTooth:    <GiTooth />,
  FaTeethOpen:<FaTeethOpen />,
  FaSyringe:  <FaSyringe />,
  MdOutlineWavingHand: <MdOutlineHealthAndSafety />,
};

export default function Treatments({ compact = false, setCurrentPage }) {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [faqActive, setFaqActive] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const displayedTreatments = compact ? treatments.slice(0, 3) : treatments;

  const faqs = [
    { q: "How often should I visit the dentist?", a: "We recommend visiting the dentist for a routine check-up and cleaning at least once every 6 months to maintain optimal oral health." },
    { q: "Are dental implants permanent?", a: "Yes, dental implants are designed to be a permanent solution. The titanium post fuses with your jawbone, acting as a natural root, and can last a lifetime with proper care." },
    { q: "Is teeth whitening safe for my enamel?", a: "Yes, our professional teeth whitening treatments use clinically proven, safe whitening gels that do not damage your tooth enamel when administered under specialist supervision." },
    { q: "What should I do in case of a dental emergency?", a: "In case of a dental emergency, call our 24/7 emergency support line immediately. Avoid taking hot liquids, and apply a cold compress to the outside of your cheek if there is swelling." }
  ];

  return (
    <section id="treatments" className="treatments" ref={sectionRef} aria-label="Dental treatments">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">Our Services</div>
          <h2 className="section-title">
            {compact ? "Featured Dental Treatments" : "Complete Dental Services"}
          </h2>
          <p className="section-subtitle">
            We provide complete dental care using modern technology and personalised
            treatment plans tailored to your needs.
          </p>
        </div>

        <div className="treatments-grid">
          {displayedTreatments.map((t, i) => (
            <article
              key={t.id}
              className={`treatment-card${visible ? ` animate-fadeInUp delay-${(i % 3 + 1) * 100}` : ''}`}
              aria-label={t.title}
            >
              <div className="treatment-icon" aria-hidden="true">
                {iconMap[t.icon] || <FaTooth />}
              </div>
              <h3>{t.title}</h3>
              <p>{t.description}</p>
              <a
                href="#contact"
                className="treatment-link"
                onClick={(e) => {
                  e.preventDefault();
                  if (setCurrentPage) {
                    setCurrentPage('contact');
                  } else {
                    document.getElementById('appointment')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                aria-label={`Learn more about ${t.title}`}
              >
                Learn More <FaArrowRight aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>

        {compact && (
          <div style={{ textAlign: 'center', marginTop: '40px' }} className="animate-fadeInUp delay-300">
            <button
              className="btn-primary"
              onClick={() => setCurrentPage('service')}
              style={{ padding: '12px 32px' }}
            >
              View All Services
            </button>
          </div>
        )}

        {!compact && (
          <div className="treatments-faq" style={{ marginTop: '80px' }}>
            <div className="section-header">
              <span className="section-badge">FAQ</span>
              <h2 className="section-title">Common Questions</h2>
              <p className="section-subtitle">Find answers to frequently asked questions about our treatments.</p>
            </div>
            <div className="faq-list" style={{ maxWidth: '800px', margin: '40px auto 0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="faq-item"
                  style={{
                    background: 'white',
                    borderRadius: '12px',
                    padding: '20px',
                    border: '1px solid rgba(22, 119, 255, 0.08)',
                    boxShadow: '0 4px 12px rgba(22, 119, 255, 0.03)',
                    cursor: 'pointer',
                    transition: 'var(--transition)'
                  }}
                  onClick={() => setFaqActive(faqActive === i ? null : i)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: '700', color: 'var(--dark-blue)' }}>
                    <span>{faq.q}</span>
                    <FaChevronDown style={{ fontSize: '0.8rem', transform: faqActive === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                  </div>
                  {faqActive === i && (
                    <p style={{ marginTop: '12px', color: 'var(--text)', fontSize: '0.9rem', lineHeight: '1.6', animation: 'fadeInUp 0.3s ease' }}>
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

