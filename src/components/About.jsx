import {
  FaCheckCircle, FaHeartbeat, FaAward, FaHandsHelping,
} from 'react-icons/fa';
import '../styles/About.css';

const HIGHLIGHTS = [
  { icon: <FaAward />,        text: '15+ Years of Excellence' },
  { icon: <FaHeartbeat />,    text: 'Patient-Centered Care' },
  { icon: <FaHandsHelping />, text: 'Trusted by 15,000+ Families' },
  { icon: <FaCheckCircle />,  text: 'Advanced Technology' },
];

export default function About({ setCurrentPage }) {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-grid">
          {/* Left - Content */}
          <div className="about-content">
            <span className="section-badge">About Us</span>
            <h2 className="about-title">
              Your Trusted Partner for <span className="text-gradient">Dental Care</span>
            </h2>
            <p className="about-desc">
              At SmileCare Dental Clinic, we believe every smile tells a story. Our team of
              experienced dental professionals provides comprehensive care using the latest
              technology and techniques. From routine check-ups to complex procedures, we
              ensure your comfort and confidence at every step.
            </p>
            <p className="about-desc">
              Founded with a vision to make quality dental care accessible and comfortable,
              we have served over 15,000 happy patients with a commitment to excellence that
              sets us apart.
            </p>

            <div className="about-highlights">
              {HIGHLIGHTS.map((h) => (
                <div className="about-highlight" key={h.text}>
                  <span className="highlight-icon" aria-hidden="true">{h.icon}</span>
                  <span className="highlight-text">{h.text}</span>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              className="btn-primary about-cta"
              onClick={(e) => {
                e.preventDefault();
                if (setCurrentPage) {
                  setCurrentPage('contact');
                } else {
                  document.querySelector('#appointment')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Schedule a Visit
            </a>
          </div>

          {/* Right - Visual */}
          <div className="about-visual">
            <div className="about-card about-card-main">
              <div className="about-card-icon">
                <FaHeartbeat />
              </div>
              <h3>Our Mission</h3>
              <p>To deliver exceptional dental care with compassion, integrity, and innovation.</p>
            </div>

            <div className="about-stats-row">
              <div className="about-stat">
                <span className="about-stat-number">15+</span>
                <span className="about-stat-label">Years</span>
              </div>
              <div className="about-stat">
                <span className="about-stat-number">15K+</span>
                <span className="about-stat-label">Patients</span>
              </div>
              <div className="about-stat">
                <span className="about-stat-number">98%</span>
                <span className="about-stat-label">Satisfaction</span>
              </div>
            </div>
          </div>
        </div>

        {!compact && (
          <div className="about-values" style={{ marginTop: '80px', borderTop: '1px solid rgba(22, 119, 255, 0.08)', paddingTop: '60px' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <span className="section-badge">How We Work</span>
              <h3 style={{ fontFamily: 'Poppins', fontSize: '1.8rem', fontWeight: '800', color: 'var(--dark-blue)', marginTop: '12px' }}>
                Our Core Philosophy
              </h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '30px' }}>
              <div style={{ background: 'white', padding: '30px', borderRadius: '16px', border: '1px solid rgba(22, 119, 255, 0.06)' }}>
                <h4 style={{ color: 'var(--primary)', fontWeight: '750', fontSize: '1.1rem', marginBottom: '12px' }}>Patient Comfort First</h4>
                <p style={{ color: 'var(--text)', fontSize: '0.9rem', lineHeight: '1.6' }}>We provide painless dentistry methods, warm beverages, and relaxing music to ensure your absolute comfort during any treatment.</p>
              </div>
              <div style={{ background: 'white', padding: '30px', borderRadius: '16px', border: '1px solid rgba(22, 119, 255, 0.06)' }}>
                <h4 style={{ color: 'var(--primary)', fontWeight: '750', fontSize: '1.1rem', marginBottom: '12px' }}>Modern Digital Workflows</h4>
                <p style={{ color: 'var(--text)', fontSize: '0.9rem', lineHeight: '1.6' }}>With intraoral scanners, digital X-rays, and 3D imaging, our diagnostic precision guarantees optimal long-term results.</p>
              </div>
              <div style={{ background: 'white', padding: '30px', borderRadius: '16px', border: '1px solid rgba(22, 119, 255, 0.06)' }}>
                <h4 style={{ color: 'var(--primary)', fontWeight: '750', fontSize: '1.1rem', marginBottom: '12px' }}>Uncompromising Hygiene</h4>
                <p style={{ color: 'var(--text)', fontSize: '0.9rem', lineHeight: '1.6' }}>We adhere strictly to international clinical safety protocols and class-B autoclaves autoclave sterilization standards.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
