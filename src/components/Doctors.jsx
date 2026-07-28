import { useEffect, useRef, useState } from 'react';
import {
  FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram,
  FaCalendarAlt, FaAward,
} from 'react-icons/fa';
import { doctors } from '../data/doctors';
import '../styles/Doctors.css';

export default function Doctors() {
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

  const scrollToAppointment = () => {
    document.getElementById('appointment')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="doctors" className="doctors" ref={sectionRef} aria-label="Our doctors">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">Our Team</div>
          <h2 className="section-title">Meet Our Expert Dentists</h2>
          <p className="section-subtitle">
            Our experienced dental specialists are committed to giving you safe and
            comfortable treatment with a personal touch.
          </p>
        </div>

        <div className="doctors-grid">
          {doctors.map((doc, i) => (
            <article
              key={doc.id}
              className={`doctor-card${visible ? ` animate-fadeInUp delay-${(i + 1) * 100}` : ''}`}
              aria-label={`${doc.name}, ${doc.role}`}
            >
              {/* Image + social overlay */}
              <div className="doctor-img-wrapper">
                <img
                  src={doc.image}
                  alt={`Portrait of ${doc.name}, ${doc.role}`}
                  loading="lazy"
                />
                <div className="doctor-overlay" aria-label="Social media links">
                  {[
                    { icon: <FaFacebookF />, href: doc.social.facebook, label: 'Facebook' },
                    { icon: <FaTwitter />,   href: doc.social.twitter,  label: 'Twitter'  },
                    { icon: <FaLinkedinIn />,href: doc.social.linkedin, label: 'LinkedIn' },
                    { icon: <FaInstagram />, href: doc.social.instagram,label: 'Instagram'},
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      className="social-icon-btn"
                      aria-label={`${doc.name} on ${s.label}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Info */}
              <div className="doctor-info">
                <h3>{doc.name}</h3>
                <p className="doctor-role">{doc.role}</p>
                <span className="doctor-exp">
                  <FaAward aria-hidden="true" />
                  {doc.experience}
                </span>

                <button
                  className="btn-primary"
                  onClick={scrollToAppointment}
                  aria-label={`Book appointment with ${doc.name}`}
                >
                  <FaCalendarAlt aria-hidden="true" />
                  Book Appointment
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
