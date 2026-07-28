import { useEffect, useRef, useState } from 'react';
import {
  FaTooth, FaTeeth, FaTeethOpen, FaSyringe, FaArrowRight,
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

export default function Treatments() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="treatments" className="treatments" ref={sectionRef} aria-label="Dental treatments">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">Our Services</div>
          <h2 className="section-title">Our Dental Treatments</h2>
          <p className="section-subtitle">
            We provide complete dental care using modern technology and personalised
            treatment plans tailored to your needs.
          </p>
        </div>

        <div className="treatments-grid">
          {treatments.map((t, i) => (
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
                href="#appointment"
                className="treatment-link"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('appointment')?.scrollIntoView({ behavior: 'smooth' });
                }}
                aria-label={`Learn more about ${t.title}`}
              >
                Learn More <FaArrowRight aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
