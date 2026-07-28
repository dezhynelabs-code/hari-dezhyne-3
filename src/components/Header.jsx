import { useState, useEffect, useCallback, useRef } from 'react';
import {
  FaTooth, FaHome, FaInfoCircle, FaUserMd, FaEnvelope,
  FaChevronDown, FaTeeth, FaTeethOpen, FaSyringe, FaCalendarAlt,
} from 'react-icons/fa';
import { GiTooth } from 'react-icons/gi';
import { MdOutlineHealthAndSafety, MdMedicalServices } from 'react-icons/md';
import '../styles/Header.css';

const NAV_LINKS = [
  {
    label: 'Home',
    page: 'home',
    icon: <FaHome />,
  },
  {
    label: 'About',
    page: 'about',
    icon: <FaInfoCircle />,
  },
  {
    label: 'Service',
    page: 'service',
    icon: <MdMedicalServices />,
    dropdown: [
      { label: 'General Dentistry',    page: 'service', icon: <FaTooth /> },
      { label: 'Teeth Cleaning',       page: 'service', icon: <FaTeeth /> },
      { label: 'Dental Implants',      page: 'service', icon: <GiTooth /> },
      { label: 'Teeth Whitening',      page: 'service', icon: <FaTeethOpen /> },
      { label: 'Root Canal Treatment', page: 'service', icon: <FaSyringe /> },
      { label: 'Orthodontic Braces',   page: 'service', icon: <MdOutlineHealthAndSafety /> },
    ],
  },
  {
    label: 'Teams',
    page: 'teams',
    icon: <FaUserMd />,
  },
  {
    label: 'Contact',
    page: 'contact',
    icon: <FaEnvelope />,
  },
];

export default function Header({ currentPage, setCurrentPage }) {
  const [scrolled, setScrolled]       = useState(false);
  const [menuOpen, setMenuOpen]       = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileDropOpen, setMobileDropOpen] = useState(null);
  const dropdownRef = useRef(null);

  /* Scroll listener to adjust header style on scroll */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Close dropdown when clicking outside */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /* Lock body scroll when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNav = useCallback((page) => {
    setMenuOpen(false);
    setOpenDropdown(null);
    setMobileDropOpen(null);
    if (setCurrentPage) {
      setCurrentPage(page);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [setCurrentPage]);

  const isActive = (link) => {
    return currentPage === link.page;
  };

  return (
    <header className={`header${scrolled ? ' scrolled' : ''}`} role="banner">
      <div className="container">
        <div className="header-inner">
          {/* Logo */}
          <a
            href="#home"
            className="logo"
            onClick={(e) => { e.preventDefault(); handleNav('home'); }}
            aria-label="SmileCare Dental Clinic - go to home"
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
          <nav className="nav" aria-label="Primary navigation" ref={dropdownRef}>
            {NAV_LINKS.map((link) => (
              <div className="nav-item" key={link.label}>
                {link.dropdown ? (
                  /* Dropdown trigger */
                  <>
                    <button
                      className={`nav-link nav-link-dropdown${isActive(link) ? ' active' : ''}${openDropdown === link.label ? ' dropdown-open' : ''}`}
                      onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                      aria-expanded={openDropdown === link.label}
                      aria-haspopup="true"
                    >
                      <span className="nav-link-icon" aria-hidden="true">{link.icon}</span>
                      {link.label}
                      <FaChevronDown className="nav-chevron" aria-hidden="true" />
                    </button>

                    {/* Dropdown menu */}
                    <div className={`dropdown-menu${openDropdown === link.label ? ' open' : ''}`} role="menu">
                      <div className="dropdown-header">
                        <span className="dropdown-header-icon" aria-hidden="true">{link.icon}</span>
                        Our Services
                      </div>
                      {link.dropdown.map((item) => (
                        <a
                          key={item.label}
                          href={`#${item.page}`}
                          className="dropdown-item"
                          role="menuitem"
                          onClick={(e) => { e.preventDefault(); handleNav(item.page); }}
                        >
                          <span className="dropdown-item-icon" aria-hidden="true">{item.icon}</span>
                          <span>{item.label}</span>
                        </a>
                      ))}
                    </div>
                  </>
                ) : (
                  /* Normal link */
                  <a
                    href={`#${link.page}`}
                    className={`nav-link${isActive(link) ? ' active' : ''}`}
                    onClick={(e) => { e.preventDefault(); handleNav(link.page); }}
                    aria-current={isActive(link) ? 'page' : undefined}
                  >
                    <span className="nav-link-icon" aria-hidden="true">{link.icon}</span>
                    {link.label}
                  </a>
                )}
              </div>
            ))}
          </nav>

          {/* Persistent CTA Button (Visible on both Desktop and Mobile Header Bar) */}
          <a
            href="#contact"
            className="btn-primary header-cta"
            onClick={(e) => { e.preventDefault(); handleNav('contact'); }}
          >
            <FaCalendarAlt aria-hidden="true" />
            <span className="cta-text">Book Appointment</span>
          </a>

          {/* Hamburger Menu Trigger */}
          <button
            className={`hamburger${menuOpen ? ' open' : ''}`}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      <nav
        id="mobile-nav"
        className={`mobile-nav${menuOpen ? ' open' : ''}`}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        {NAV_LINKS.map((link) => (
          <div className="mobile-nav-item" key={link.label}>
            {link.dropdown ? (
              <>
                <button
                  className={`nav-link mobile-dropdown-trigger${isActive(link) ? ' active' : ''}`}
                  onClick={() => setMobileDropOpen(mobileDropOpen === link.label ? null : link.label)}
                >
                  <span className="nav-link-icon" aria-hidden="true">{link.icon}</span>
                  {link.label}
                  <FaChevronDown className={`nav-chevron${mobileDropOpen === link.label ? ' rotated' : ''}`} />
                </button>
                <div className={`mobile-dropdown${mobileDropOpen === link.label ? ' open' : ''}`}>
                  {link.dropdown.map((item) => (
                    <a
                      key={item.label}
                      href={`#${item.page}`}
                      className="mobile-dropdown-item"
                      onClick={(e) => { e.preventDefault(); handleNav(item.page); }}
                    >
                      <span className="dropdown-item-icon" aria-hidden="true">{item.icon}</span>
                      {item.label}
                    </a>
                  ))}
                </div>
              </>
            ) : (
              <a
                href={`#${link.page}`}
                className={`nav-link${isActive(link) ? ' active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleNav(link.page); }}
              >
                <span className="nav-link-icon" aria-hidden="true">{link.icon}</span>
                {link.label}
              </a>
            )}
          </div>
        ))}
      </nav>
    </header>
  );
}
