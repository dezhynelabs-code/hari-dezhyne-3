import { useState, useEffect } from 'react';
import Header          from './components/Header';
import Hero            from './components/Hero';
import About           from './components/About';
import Treatments      from './components/Treatments';
import Doctors         from './components/Doctors';
import AppointmentForm from './components/AppointmentForm';
import Contact         from './components/Contact';
import Footer          from './components/Footer';
import './index.css';
import './App.css';

function SubpageHeader({ title, setCurrentPage }) {
  return (
    <div className="subpage-header">
      <div className="container">
        <h1>{title}</h1>
        <div className="subpage-breadcrumbs">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage('home');
            }}
          >
            Home
          </a>
          <span>/</span>
          <span>{title}</span>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // Automatically scroll to the top of the window when the page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Render the page content based on active state
  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero setCurrentPage={setCurrentPage} />
            <About compact={true} setCurrentPage={setCurrentPage} />
            <Treatments compact={true} setCurrentPage={setCurrentPage} />
            <Doctors compact={true} setCurrentPage={setCurrentPage} />
            <Contact compact={true} setCurrentPage={setCurrentPage} />
          </>
        );
      case 'about':
        return (
          <>
            <SubpageHeader title="About Us" setCurrentPage={setCurrentPage} />
            <About setCurrentPage={setCurrentPage} />
          </>
        );
      case 'service':
        return (
          <>
            <SubpageHeader title="Our Services" setCurrentPage={setCurrentPage} />
            <Treatments setCurrentPage={setCurrentPage} />
          </>
        );
      case 'teams':
        return (
          <>
            <SubpageHeader title="Meet Our Team" setCurrentPage={setCurrentPage} />
            <Doctors setCurrentPage={setCurrentPage} />
          </>
        );
      case 'contact':
        return (
          <>
            <SubpageHeader title="Contact Us" setCurrentPage={setCurrentPage} />
            <div className="contact-page-wrapper">
              <Contact />
              <AppointmentForm />
            </div>
          </>
        );
      default:
        return (
          <>
            <Hero setCurrentPage={setCurrentPage} />
            <About compact={true} setCurrentPage={setCurrentPage} />
            <Treatments compact={true} setCurrentPage={setCurrentPage} />
            <Doctors compact={true} setCurrentPage={setCurrentPage} />
            <Contact compact={true} setCurrentPage={setCurrentPage} />
          </>
        );
    }
  };

  return (
    <>
      <a href="#main-content" className="skip-link" style={{
        position: 'absolute', top: '-100%', left: '8px',
        background: 'var(--primary)', color: 'white',
        padding: '8px 16px', borderRadius: '0 0 8px 8px',
        fontWeight: 600, zIndex: 9999,
        transition: 'top 0.2s',
      }}
        onFocus={(e) => { e.currentTarget.style.top = '0'; }}
        onBlur={(e)  => { e.currentTarget.style.top = '-100%'; }}
      >
        Skip to main content
      </a>

      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />

      <main id="main-content">
        {renderContent()}
      </main>

      <Footer setCurrentPage={setCurrentPage} />
    </>
  );
}
