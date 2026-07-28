import Header          from './components/Header';
import Hero            from './components/Hero';
import Treatments      from './components/Treatments';
import Doctors         from './components/Doctors';
import AppointmentForm from './components/AppointmentForm';
import Contact         from './components/Contact';
import Footer          from './components/Footer';
import './index.css'
import './App.css';

export default function App() {
  return (
    <>
      <a href="#home" className="skip-link" style={{
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

      <Header />

      <main id="main-content">
        <Hero />
        <Treatments />
        <Doctors />
        <AppointmentForm />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
