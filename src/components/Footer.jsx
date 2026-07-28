import {
  FaTooth,
  FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube,
  FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock,
  FaArrowUp,
} from 'react-icons/fa';
import '../styles/Footer.css';

const QUICK_LINKS = [
  { label: 'Home',    page: 'home' },
  { label: 'About',   page: 'about' },
  { label: 'Service', page: 'service' },
  { label: 'Teams',   page: 'teams' },
  { label: 'Contact', page: 'contact' },
];

const TREATMENT_LINKS = [
  { label: 'Dental Implants',       page: 'service' },
  { label: 'Teeth Cleaning',        page: 'service' },
  { label: 'Teeth Whitening',       page: 'service' },
  { label: 'Root Canal Treatment',  page: 'service' },
  { label: 'Orthodontic Braces',    page: 'service' },
];

const CONTACT_ITEMS = [
  { icon: <FaMapMarkerAlt />, text: '123 Dental Street, Health City, Mumbai 400001' },
  { icon: <FaPhone />,        text: '+91 98765 43210' },
  { icon: <FaEnvelope />,     text: 'info@smilecare.com' },
  { icon: <FaClock />,        text: 'Mon – Sat: 9:00 AM – 8:00 PM' },
];

const SOCIAL_LINKS = [
  { icon: <FaFacebookF />,  href: '#', label: 'Facebook' },
  { icon: <FaTwitter />,    href: '#', label: 'Twitter' },
  { icon: <FaLinkedinIn />, href: '#', label: 'LinkedIn' },
  { icon: <FaInstagram />,  href: '#', label: 'Instagram' },
  { icon: <FaYoutube />,    href: '#', label: 'YouTube' },
];

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

export default function Footer({ setCurrentPage }) {
  const handleNav = (page) => {
    if (setCurrentPage) {
      setCurrentPage(page);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          {/* Column 1 – Brand */}
          <div className="footer-brand">
            <a
              href="#home"
              className="logo"
              onClick={(e) => { e.preventDefault(); handleNav('home'); }}
              aria-label="SmileCare Dental Clinic home"
            >
              <div className="logo-icon" aria-hidden="true" style={{ background: 'rgba(255,255,255,0.15)' }}>
                <FaTooth />
              </div>
              <div className="logo-text">
                <span className="logo-name">SmileCare</span>
                <span className="logo-tagline">Dental Clinic</span>
              </div>
            </a>

            <p className="footer-desc">
              Your trusted partner for comprehensive dental care. We combine advanced
              technology with a gentle touch for a healthy, beautiful smile.
            </p>

            <div className="footer-social" aria-label="Social media links">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={`Visit us on ${s.label}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 – Quick Links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <nav className="footer-links" aria-label="Footer quick links">
              {QUICK_LINKS.map((l) => (
                <a
                  key={l.label}
                  href={`#${l.page}`}
                  onClick={(e) => { e.preventDefault(); handleNav(l.page); }}
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Column 3 – Treatments */}
          <div className="footer-col">
            <h4>Treatments</h4>
            <nav className="footer-links" aria-label="Treatment links">
              {TREATMENT_LINKS.map((l) => (
                <a
                  key={l.label}
                  href={`#${l.page}`}
                  onClick={(e) => { e.preventDefault(); handleNav(l.page); }}
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Column 4 – Contact */}
          <div className="footer-col">
            <h4>Contact Details</h4>
            <div className="footer-contact-items">
              {CONTACT_ITEMS.map((item, i) => (
                <div className="footer-contact-item" key={i}>
                  {item.icon}
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <div className="container">
          <p>
            © 2026 <span>SmileCare Dental Clinic</span>. All Rights Reserved. Designed with ♥ for healthy smiles.
          </p>
        </div>
      </div>

      {/* Back to top */}
      <button
        onClick={scrollToTop}
        className="back-to-top"
        aria-label="Back to top"
        style={{
          position: 'fixed',
          bottom: '28px',
          right: '28px',
          width: '44px',
          height: '44px',
          background: 'var(--primary)',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(22,119,255,0.4)',
          transition: 'var(--transition)',
          fontSize: '0.9rem',
          zIndex: 900,
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
      >
        <FaArrowUp />
      </button>
    </footer>
  );
}
