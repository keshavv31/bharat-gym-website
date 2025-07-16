import React from 'react';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  return (
    <div style={{ background: '#000000', minHeight: '100vh', paddingTop: '80px' }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #000000 100%)',
        padding: '5rem 0',
        textAlign: 'center'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: 900,
            color: '#ffffff',
            marginBottom: '1rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em'
          }}>
            Contact Us
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: '#cccccc',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            Reach out to BHARAT GYM for any queries, feedback, or to start your fitness journey with us.
          </p>
        </motion.div>
      </section>

      {/* Contact Form & Info */}
      <section style={{
        padding: '5rem 0',
        background: '#0a0a0a',
        color: '#ffffff'
      }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', justifyContent: 'center' }}>
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ minWidth: 300, flex: 1 }}
          >
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 900,
              color: '#ff0000',
              marginBottom: '1.5rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }}>
              Get in Touch
            </h2>
            <div style={{ color: '#cccccc', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: 1.7 }}>
              <div style={{ marginBottom: '1rem' }}>📍 123 Fitness Street, Dehradun</div>
              {/* Contact details removed for Fiverr compliance */}
              <div>⏰ 24/7 Access</div>
            </div>
            {/* Contact icons removed for Fiverr compliance */}
          </motion.div>

          {/* Locations Section */}
          <div style={{ marginTop: '3rem', width: '100%' }}>
            <h2 style={{ color: '#ff0000', fontWeight: 900, fontSize: '2rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2rem', textAlign: 'center' }}>
              Our Locations
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
              {/* Main Branch */}
              <div style={{ background: '#181818', borderRadius: '16px', padding: '2rem', minWidth: 320, maxWidth: 400, flex: 1, boxShadow: '0 2px 16px rgba(255,0,0,0.10)', border: '2px solid #ff0000' }}>
                <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '1.3rem', marginBottom: '0.5rem' }}>BHARAT GYM - Main Branch</h3>
                <div style={{ color: '#ff0000', fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.5rem' }}>123 Fitness Street, Dehradun, Uttarakhand</div>
                <div style={{ color: '#fff', fontSize: '0.95rem', marginBottom: '0.5rem' }}>{/* Phone removed for Fiverr compliance */}</div>
                <div style={{ color: '#fff', fontSize: '0.95rem', marginBottom: '0.5rem' }}>{/* Email removed for Fiverr compliance */}</div>
                <div style={{ color: '#fff', fontSize: '0.95rem', marginBottom: '1rem' }}>Hours: 5:00 AM - 11:00 PM</div>
                {/* Google Maps iframe removed for Fiverr compliance */}
              </div>
              {/* Premium Branch */}
              <div style={{ background: '#181818', borderRadius: '16px', padding: '2rem', minWidth: 320, maxWidth: 400, flex: 1, boxShadow: '0 2px 16px rgba(255,0,0,0.10)', border: '2px solid #ff0000' }}>
                <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '1.3rem', marginBottom: '0.5rem' }}>BHARAT GYM - Premium</h3>
                <div style={{ color: '#ff0000', fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.5rem' }}>456 Wellness Avenue, Dehradun, Uttarakhand</div>
                <div style={{ color: '#fff', fontSize: '0.95rem', marginBottom: '0.5rem' }}>{/* Phone removed for Fiverr compliance */}</div>
                <div style={{ color: '#fff', fontSize: '0.95rem', marginBottom: '0.5rem' }}>{/* Email removed for Fiverr compliance */}</div>
                <div style={{ color: '#fff', fontSize: '0.95rem' }}>Hours: 5:00 AM - 11:00 PM</div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ minWidth: 300, flex: 1, background: '#1a1a1a', padding: '2rem', borderRadius: '12px', boxShadow: '0 0 20px rgba(255,0,0,0.08)' }}
          >
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 900,
              color: '#ffffff',
              marginBottom: '1.5rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }}>
              Send a Message
            </h2>
            <div style={{ marginBottom: '1.2rem' }}>
              <input
                type="text"
                placeholder="Your Name"
                style={{
                  width: '100%',
                  padding: '1rem',
                  borderRadius: '6px',
                  border: 'none',
                  background: '#0a0a0a',
                  color: '#fff',
                  fontSize: '1rem',
                  marginBottom: '0.5rem',
                  outline: 'none'
                }}
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                style={{
                  width: '100%',
                  padding: '1rem',
                  borderRadius: '6px',
                  border: 'none',
                  background: '#0a0a0a',
                  color: '#fff',
                  fontSize: '1rem',
                  marginBottom: '0.5rem',
                  outline: 'none'
                }}
                required
              />
              <textarea
                placeholder="Your Message"
                rows={5}
                style={{
                  width: '100%',
                  padding: '1rem',
                  borderRadius: '6px',
                  border: 'none',
                  background: '#0a0a0a',
                  color: '#fff',
                  fontSize: '1rem',
                  marginBottom: '0.5rem',
                  outline: 'none',
                  resize: 'vertical'
                }}
                required
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #ff0000 0%, #cc0000 100%)',
                color: '#ffffff',
                border: 'none',
                padding: '1.2rem',
                borderRadius: '8px',
                fontSize: '1.1rem',
                fontWeight: 700,
                cursor: 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                boxShadow: '0 0 20px rgba(255, 0, 0, 0.2)',
                transition: 'all 0.3s ease'
              }}
            >
              Send Message
            </motion.button>
          </motion.form>
        </div>
      </section>
    </div>
  );
};

export default Contact; 