import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
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
            About BHARAT GYM
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: '#cccccc',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            BHARAT GYM is dedicated to transforming lives through fitness, innovation, and a relentless pursuit of excellence. Our mission is to provide a world-class environment for every member.
          </p>
        </motion.div>
      </section>

      {/* Story Section */}
      <section style={{
        padding: '5rem 0',
        background: '#0a0a0a',
        color: '#ffffff',
        textAlign: 'center'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 900,
            color: '#ff0000',
            marginBottom: '2rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em'
          }}>
            Our Story
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: '#cccccc',
            marginBottom: '3rem',
            maxWidth: '700px',
            marginLeft: 'auto',
            marginRight: 'auto',
            lineHeight: 1.7
          }}>
            Founded in Dehradun, BHARAT GYM has grown from a single facility to a premier fitness destination. Our commitment to quality, innovation, and community sets us apart. We believe in empowering every individual to reach their full potential.
          </p>
        </motion.div>
      </section>

      {/* Values Section */}
      <section style={{
        padding: '5rem 0',
        background: '#000000',
        color: '#ffffff',
        textAlign: 'center'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 900,
            color: '#ff0000',
            marginBottom: '2rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em'
          }}>
            Our Values
          </h2>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            maxWidth: '700px',
            marginLeft: 'auto',
            marginRight: 'auto',
            color: '#cccccc',
            fontSize: '1.1rem',
            lineHeight: 1.7
          }}>
            <li style={{ marginBottom: '1.5rem' }}><span style={{ color: '#ff0000', marginRight: '0.5rem' }}>✓</span> Excellence in Service</li>
            <li style={{ marginBottom: '1.5rem' }}><span style={{ color: '#ff0000', marginRight: '0.5rem' }}>✓</span> Innovation in Fitness</li>
            <li style={{ marginBottom: '1.5rem' }}><span style={{ color: '#ff0000', marginRight: '0.5rem' }}>✓</span> Community & Support</li>
            <li style={{ marginBottom: '1.5rem' }}><span style={{ color: '#ff0000', marginRight: '0.5rem' }}>✓</span> Integrity & Respect</li>
          </ul>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '5rem 0',
        background: 'linear-gradient(135deg, #000000 0%, #0a0a0a 100%)',
        textAlign: 'center'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 900,
            color: '#ffffff',
            marginBottom: '2rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em'
          }}>
            Join the Movement
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: '#cccccc',
            marginBottom: '3rem',
            maxWidth: '500px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Experience the difference at BHARAT GYM. Become a part of our community today.
          </p>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: 'linear-gradient(135deg, #ff0000 0%, #cc0000 100%)',
              color: '#ffffff',
              border: 'none',
              padding: '1.2rem 2.5rem',
              fontSize: '1.1rem',
              fontWeight: 700,
              borderRadius: '8px',
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              boxShadow: '0 0 30px rgba(255, 0, 0, 0.4)',
              transition: 'all 0.3s ease'
            }}
            onClick={() => window.location.href = '/signup'}
          >
            Get Started
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default About; 