import {
  FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock,
  FaCalendarAlt, FaAmbulance,
} from 'react-icons/fa';
import { MdEmergency } from 'react-icons/md';
import '../styles/Contact.css';

const CONTACT_CARDS = [
  {
    icon: <FaMapMarkerAlt />,
    title: 'Our Location',
    content: '123 Dental Street, Health City\nMumbai, Maharashtra 400001',
    isAddress: true,
  },
  {
    icon: <FaPhone />,
    title: 'Phone Number',
    content: '+91 98765 43210',
    href: 'tel:+919876543210',
  },
  {
    icon: <FaEnvelope />,
    title: 'Email Address',
    content: 'info@smilecare.com',
    href: 'mailto:info@smilecare.com',
  },
  {
    icon: <FaClock />,
    title: 'Working Hours',
    content: 'Mon – Sat: 9:00 AM – 8:00 PM\nSunday: Emergency Only',
    isAddress: true,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="contact" aria-label="Contact information">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">Get in Touch</div>
          <h2 className="section-title">Contact Information</h2>
          <p className="section-subtitle">
            Reach out to us for appointments, queries, or emergency dental assistance.
            We are always here to help.
          </p>
        </div>

        <div className="contact-grid">
          {/* Left: Cards + Emergency */}
          <div>
            <div className="contact-cards">
              {CONTACT_CARDS.map((card, i) => (
                <div className="contact-card animate-fadeInUp" key={i}>
                  <div className="contact-card-icon" aria-hidden="true">
                    {card.icon}
                  </div>
                  <h4>{card.title}</h4>
                  {card.href ? (
                    <a href={card.href}>{card.content}</a>
                  ) : (
                    <p style={{ whiteSpace: 'pre-line' }}>{card.content}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Emergency button */}
            <a
              href="tel:+919876543210"
              className="emergency-btn"
              aria-label="Call emergency dental support"
            >
              <MdEmergency aria-hidden="true" style={{ fontSize: '1.4rem' }} />
              Emergency Dental Support – Call Now
            </a>
          </div>

          {/* Right: Map placeholder */}
          <div className="map-wrapper" aria-label="Clinic location map">
            <div className="map-placeholder">
              <div className="map-icon" aria-hidden="true">
                <FaMapMarkerAlt />
              </div>
              <h4>SmileCare Dental Clinic</h4>
              <p>123 Dental Street, Health City, Mumbai</p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ marginTop: '12px' }}
                aria-label="Open location in Google Maps"
              >
                <FaMapMarkerAlt aria-hidden="true" />
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
