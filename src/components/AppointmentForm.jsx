import { useState } from 'react';
import {
  FaCalendarAlt, FaClock, FaPhone, FaEnvelope, FaUser,
  FaCheckCircle, FaExclamationCircle, FaSpinner,
  FaChevronDown, FaTooth, FaUserMd,
} from 'react-icons/fa';
import { MdEmergency } from 'react-icons/md';
import '../styles/AppointmentForm.css';

const TREATMENT_OPTIONS = [
  'General Dentistry',
  'Teeth Cleaning',
  'Dental Implants',
  'Teeth Whitening',
  'Root Canal Treatment',
  'Orthodontic Braces',
];

const DOCTOR_OPTIONS = [
  'Dr. Priya Sharma',
  'Dr. Arjun Kumar',
  'Dr. Meera Raj',
];

const TIME_OPTIONS = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
  '06:00 PM', '07:00 PM',
];

const INITIAL_FORM = {
  fullName: '', phone: '', email: '',
  treatment: '', doctor: '', date: '', time: '', message: '',
};

const INITIAL_ERRORS = { ...INITIAL_FORM };

function validate(form) {
  const errors = { ...INITIAL_ERRORS };
  let valid = true;

  if (!form.fullName.trim())  { errors.fullName  = 'Full name is required.';       valid = false; }
  if (!form.phone.trim() || !/^\+?[\d\s\-]{7,15}$/.test(form.phone)) {
    errors.phone = 'Enter a valid phone number.'; valid = false;
  }
  if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Enter a valid email address.'; valid = false;
  }
  if (!form.treatment) { errors.treatment = 'Please select a treatment.'; valid = false; }
  if (!form.doctor)    { errors.doctor    = 'Please select a doctor.';    valid = false; }
  if (!form.date)      { errors.date      = 'Please select a date.';      valid = false; }
  if (!form.time)      { errors.time      = 'Please select a time.';      valid = false; }

  return { errors, valid };
}

export default function AppointmentForm() {
  const [form,    setForm]    = useState(INITIAL_FORM);
  const [errors,  setErrors]  = useState(INITIAL_ERRORS);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { errors: newErrors, valid } = validate(form);
    if (!valid) { setErrors(newErrors); return; }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSuccess(true);
    setForm(INITIAL_FORM);
    setErrors(INITIAL_ERRORS);
  };

  const CLINIC_DETAILS = [
    { icon: <FaCalendarAlt />, label: 'Working Days',  value: 'Monday – Saturday' },
    { icon: <FaClock />,       label: 'Working Hours', value: '9:00 AM – 8:00 PM' },
    { icon: <FaPhone />,       label: 'Phone Number',  value: '+91 98765 43210' },
    { icon: <FaEnvelope />,    label: 'Email Address', value: 'info@smilecare.com' },
    { icon: <MdEmergency />,   label: 'Emergency',     value: '24/7 Emergency Support' },
  ];

  const minDate = new Date().toISOString().split('T')[0];

  return (
    <section id="appointment" className="appointment" aria-label="Book an appointment">
      <div className="container">
        <div className="appointment-grid">

          {/* ── Left info panel ── */}
          <div className="appointment-info animate-fadeInLeft">
            <div className="section-badge">Book a Visit</div>
            <h2 className="section-title">Book Your Dental Appointment</h2>
            <p className="section-subtitle" style={{ marginBottom: '32px' }}>
              Schedule your visit with our dental specialists. Our team will contact
              you to confirm your appointment.
            </p>

            <div className="clinic-details">
              {CLINIC_DETAILS.map((item, i) => (
                <div className="clinic-detail-item" key={i}>
                  <div className="detail-icon" aria-hidden="true">{item.icon}</div>
                  <div className="detail-content">
                    <strong>{item.label}</strong>
                    <span>{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right – Form card ── */}
          <div className="appointment-form-card animate-fadeInRight">
            {success ? (
              <div className="form-success" role="alert" aria-live="polite">
                <div className="success-icon" aria-hidden="true"><FaCheckCircle /></div>
                <h3>Appointment Requested!</h3>
                <p>Thank you! Our team will contact you shortly to confirm your appointment.</p>
                <button className="btn-primary" onClick={() => setSuccess(false)}>
                  Book Another Appointment
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate aria-label="Appointment form">

                <div className="form-section-label">Personal Information</div>
                <div className="form-grid">

                  {/* Full Name */}
                  <div className="form-group">
                    <label htmlFor="fullName">
                      Full Name <span aria-hidden="true">*</span>
                    </label>
                    <div className={`input-icon-wrap${errors.fullName ? ' error' : ''}`}>
                      <span className="field-icon" aria-hidden="true"><FaUser /></span>
                      <input
                        id="fullName" name="fullName" type="text"
                        className="form-control"
                        placeholder="John Doe"
                        value={form.fullName} onChange={handleChange}
                        aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                        aria-invalid={!!errors.fullName}
                      />
                    </div>
                    {errors.fullName && (
                      <span className="error-msg" id="fullName-error" role="alert">
                        <FaExclamationCircle aria-hidden="true" /> {errors.fullName}
                      </span>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="form-group">
                    <label htmlFor="phone">
                      Phone Number <span aria-hidden="true">*</span>
                    </label>
                    <div className={`input-icon-wrap${errors.phone ? ' error' : ''}`}>
                      <span className="field-icon" aria-hidden="true"><FaPhone /></span>
                      <input
                        id="phone" name="phone" type="tel"
                        className="form-control"
                        placeholder="+91 98765 43210"
                        value={form.phone} onChange={handleChange}
                        aria-describedby={errors.phone ? 'phone-error' : undefined}
                        aria-invalid={!!errors.phone}
                      />
                    </div>
                    {errors.phone && (
                      <span className="error-msg" id="phone-error" role="alert">
                        <FaExclamationCircle aria-hidden="true" /> {errors.phone}
                      </span>
                    )}
                  </div>

                  {/* Email */}
                  <div className="form-group full">
                    <label htmlFor="email">
                      Email Address <span aria-hidden="true">*</span>
                    </label>
                    <div className={`input-icon-wrap${errors.email ? ' error' : ''}`}>
                      <span className="field-icon" aria-hidden="true"><FaEnvelope /></span>
                      <input
                        id="email" name="email" type="email"
                        className="form-control"
                        placeholder="john@example.com"
                        value={form.email} onChange={handleChange}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        aria-invalid={!!errors.email}
                      />
                    </div>
                    {errors.email && (
                      <span className="error-msg" id="email-error" role="alert">
                        <FaExclamationCircle aria-hidden="true" /> {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                <div className="form-section-label" style={{ marginTop: '20px' }}>
                  Appointment Details
                </div>
                <div className="form-grid">

                  {/* Treatment */}
                  <div className="form-group">
                    <label htmlFor="treatment">
                      Select Treatment <span aria-hidden="true">*</span>
                    </label>
                    <div className={`input-icon-wrap select-wrap${errors.treatment ? ' error' : ''}`}>
                      <span className="field-icon" aria-hidden="true"><FaTooth /></span>
                      <select
                        id="treatment" name="treatment"
                        className="form-control"
                        value={form.treatment} onChange={handleChange}
                        aria-invalid={!!errors.treatment}
                      >
                        <option value="">Choose treatment…</option>
                        {TREATMENT_OPTIONS.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                      <span className="select-chevron" aria-hidden="true"><FaChevronDown /></span>
                    </div>
                    {errors.treatment && (
                      <span className="error-msg" role="alert">
                        <FaExclamationCircle aria-hidden="true" /> {errors.treatment}
                      </span>
                    )}
                  </div>

                  {/* Doctor */}
                  <div className="form-group">
                    <label htmlFor="doctor">
                      Select Doctor <span aria-hidden="true">*</span>
                    </label>
                    <div className={`input-icon-wrap select-wrap${errors.doctor ? ' error' : ''}`}>
                      <span className="field-icon" aria-hidden="true"><FaUserMd /></span>
                      <select
                        id="doctor" name="doctor"
                        className="form-control"
                        value={form.doctor} onChange={handleChange}
                        aria-invalid={!!errors.doctor}
                      >
                        <option value="">Choose doctor…</option>
                        {DOCTOR_OPTIONS.map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                      <span className="select-chevron" aria-hidden="true"><FaChevronDown /></span>
                    </div>
                    {errors.doctor && (
                      <span className="error-msg" role="alert">
                        <FaExclamationCircle aria-hidden="true" /> {errors.doctor}
                      </span>
                    )}
                  </div>

                  {/* Date */}
                  <div className="form-group">
                    <label htmlFor="date">
                      Preferred Date <span aria-hidden="true">*</span>
                    </label>
                    <div className={`input-icon-wrap select-wrap${errors.date ? ' error' : ''}`}>
                      <span className="field-icon" aria-hidden="true"><FaCalendarAlt /></span>
                      <input
                        id="date" name="date" type="date"
                        className="form-control"
                        value={form.date} onChange={handleChange}
                        min={minDate}
                        aria-invalid={!!errors.date}
                      />
                    </div>
                    {errors.date && (
                      <span className="error-msg" role="alert">
                        <FaExclamationCircle aria-hidden="true" /> {errors.date}
                      </span>
                    )}
                  </div>

                  {/* Time */}
                  <div className="form-group">
                    <label htmlFor="time">
                      Preferred Time <span aria-hidden="true">*</span>
                    </label>
                    <div className={`input-icon-wrap select-wrap${errors.time ? ' error' : ''}`}>
                      <span className="field-icon" aria-hidden="true"><FaClock /></span>
                      <select
                        id="time" name="time"
                        className="form-control"
                        value={form.time} onChange={handleChange}
                        aria-invalid={!!errors.time}
                      >
                        <option value="">Choose time…</option>
                        {TIME_OPTIONS.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                      <span className="select-chevron" aria-hidden="true"><FaChevronDown /></span>
                    </div>
                    {errors.time && (
                      <span className="error-msg" role="alert">
                        <FaExclamationCircle aria-hidden="true" /> {errors.time}
                      </span>
                    )}
                  </div>

                  {/* Message */}
                  <div className="form-group full">
                    <label htmlFor="message">Message <span className="optional-tag">(Optional)</span></label>
                    <div className="input-icon-wrap textarea-wrap">
                      <span className="field-icon textarea-icon" aria-hidden="true">💬</span>
                      <textarea
                        id="message" name="message"
                        className="form-control"
                        placeholder="Describe your dental concern or any special requirements…"
                        value={form.message} onChange={handleChange}
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="form-submit-btn"
                  disabled={loading}
                  aria-label="Submit appointment request"
                >
                  {loading ? (
                    <>
                      <FaSpinner className="spin" aria-hidden="true" />
                      Processing…
                    </>
                  ) : (
                    <>
                      <FaCalendarAlt aria-hidden="true" />
                      Confirm Appointment
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
