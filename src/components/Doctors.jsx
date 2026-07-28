import { useEffect, useRef, useState } from 'react';
import {
  FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram,
  FaCalendarAlt, FaAward,
} from 'react-icons/fa';
import { doctors } from '../data/doctors';
import '../styles/Doctors.css';

export default function Doctors({ setCurrentPage, compact = false }) {
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
    if (setCurrentPage) {
      setCurrentPage('contact');
    } else {
      document.getElementById('appointment')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="team" className="doctors" ref={sectionRef} aria-label="Our team">
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

        {compact && (
          <div style={{ textAlign: 'center', marginTop: '40px' }} className="animate-fadeInUp delay-300">
            <button
              className="btn-primary"
              onClick={() => setCurrentPage('teams')}
              style={{ padding: '12px 32px' }}
            >
              View Full Team
            </button>
          </div>
        )}

        {!compact && (
          <div className="team-philosophy" style={{ marginTop: '80px', padding: '40px', background: 'var(--light-blue)', borderRadius: '16px', border: '1px solid rgba(22, 119, 255, 0.08)' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
              <span className="section-badge" style={{ background: 'white' }}>Our Standard</span>
              <h3 style={{ fontFamily: 'Poppins', fontSize: '1.8rem', fontWeight: '800', color: 'var(--dark-blue)', marginTop: '12px', marginBottom: '16px' }}>
                Why Choose Our Dental Team?
              </h3>
              <p style={{ color: 'var(--text)', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '24px' }}>
                Every doctor at SmileCare is board-certified, participates in continuous advanced education, and uses state-of-the-art procedures to ensure your visit is safe, pain-free, and highly successful. We prioritize patient comfort and personalized care plans.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', textAlign: 'left' }}>
                <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                  <h4 style={{ color: 'var(--dark-blue)', fontWeight: '750', marginBottom: '8px' }}>Continuous Training</h4>
                  <p style={{ color: 'var(--text)', fontSize: '0.85rem', lineHeight: '1.5' }}>Our specialists undergo 50+ hours of clinical training annually.</p>
                </div>
                <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                  <h4 style={{ color: 'var(--dark-blue)', fontWeight: '750', marginBottom: '8px' }}>Top Certifications</h4>
                  <p style={{ color: 'var(--text)', fontSize: '0.85rem', lineHeight: '1.5' }}>Members of leading dental councils and global associations.</p>
                </div>
                <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                  <h4 style={{ color: 'var(--dark-blue)', fontWeight: '750', marginBottom: '8px' }}>Compassionate Care</h4>
                  <p style={{ color: 'var(--text)', fontSize: '0.85rem', lineHeight: '1.5' }}>Special training to support patients with dental anxiety.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
