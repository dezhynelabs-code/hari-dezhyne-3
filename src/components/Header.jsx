import { useState, useEffect, useCallback } from 'react';
import { FaTooth, FaBars, FaTimes } from 'react-icons/fa';
import '../styles/Header.css';

const NAV_LINKS = [
  { label: 'Home',        href: '#home' },
  { label: 'Treatments',  href: '#treatments' },
  { label: 'Doctors',     href: '#doctors' },
  { label: 'Appointment', href: '#appointment' },
  { label: 'Contact',     href: '#contact' },
];

export default function Header() {
  const [scrolled,    setScrolled]    = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [activeLink,  setActiveLink]  = useState('#home');

  /* Scroll listener */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Update active nav based on section in view
      const sections = NAV_LINKS.map(l => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveLink('#' + sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Lock body scroll when menu open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNav = useCallback((href) => {
    setMenuOpen(false);
    setActiveLink(href);
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  }, []);

  return (
    <header className={`header${scrolled ? ' scrolled' : ''}`} role="banner">
      <div className="container">
        <div className="header-inner">
          {/* Logo */}
          <a
            href="#home"
            className="logo"
            onClick={(e) => { e.preventDefault(); handleNav('#home'); }}
            aria-label="SmileCare Dental Clinic – go to home"
          >
            <div className="logo-icon" aria-hidden="true">
              <FaTooth />
            </div>
            <div className="logo-text">
              <span className="logo-name">SmileCare</span>
              <span className="logo-tagline">Dental Clinic</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="nav" aria-label="Primary navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`nav-link${activeLink === link.href ? ' active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
                aria-current={activeLink === link.href ? 'page' : undefined}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <a
            href="#appointment"
            className="btn-primary"
            onClick={(e) => { e.preventDefault(); handleNav('#appointment'); }}
          >
            Book Appointment
          </a>

          {/* Hamburger */}
          <button
            className={`hamburger${menuOpen ? ' open' : ''}`}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <nav
        id="mobile-nav"
        className={`mobile-nav${menuOpen ? ' open' : ''}`}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`nav-link${activeLink === link.href ? ' active' : ''}`}
            onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#appointment"
          className="btn-primary"
          onClick={(e) => { e.preventDefault(); handleNav('#appointment'); }}
        >
          Book Appointment
        </a>
      </nav>
    </header>
  );
}
