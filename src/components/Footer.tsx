import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <footer style={{
      background: '#000000',
      color: '#ffffff',
      padding: '3rem 0 1rem',
      borderTop: '1px solid #333333',
      width: '100%',
      marginTop: 'auto'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {/* Brand Section */}
          <div>
            <h3 style={{
              fontSize: '1.8rem',
              fontWeight: 900,
              color: '#ffffff',
              marginBottom: '1rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }}>
              <span style={{ color: '#ffffff' }}>BHARAT</span>
              <span style={{ color: '#ff0000', marginLeft: '0.5rem' }}>GYM</span>
            </h3>
            <p style={{
              color: '#cccccc',
              lineHeight: 1.6,
              marginBottom: '1.5rem'
            }}>
              Transform your body and mind with state-of-the-art equipment and expert trainers at BHARAT GYM.
            </p>
            <div style={{
              display: 'flex',
              gap: '1rem'
            }}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                style={{
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(135deg, #ff0000 0%, #cc0000 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 0 15px rgba(255, 0, 0, 0.3)'
                }}
              >
                📱
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                style={{
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(135deg, #ff0000 0%, #cc0000 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 0 15px rgba(255, 0, 0, 0.3)'
                }}
              >
                📧
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                style={{
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(135deg, #ff0000 0%, #cc0000 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 0 15px rgba(255, 0, 0, 0.3)'
                }}
              >
                📍
              </motion.div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 style={{
              fontSize: '1.2rem',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '1rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Contact Info
            </h4>
            <div style={{
              color: '#cccccc',
              fontSize: '0.95rem',
              lineHeight: 1.6
            }}>
              <div style={{ marginBottom: '0.5rem' }}>
                📍 123 Fitness Street, Dehradun
              </div>
              <div style={{ marginBottom: '0.5rem' }}>
                ⏰ 24/7 Access
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div style={{
          borderTop: '1px solid #333333',
          paddingTop: '2rem',
          textAlign: 'center'
        }}>
          <p style={{
            color: '#cccccc',
            fontSize: '0.9rem',
            marginBottom: '1rem'
          }}>
            © 2024 BHARAT GYM. All rights reserved.
          </p>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            flexWrap: 'wrap'
          }}>
            <motion.a
              href="/privacy"
              whileHover={{ scale: 1.05 }}
              style={{
                color: '#cccccc',
                textDecoration: 'none',
                fontSize: '0.85rem',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#ff0000'}
              onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#cccccc'}
            >
              Privacy Policy
            </motion.a>
            <motion.a
              href="/terms"
              whileHover={{ scale: 1.05 }}
              style={{
                color: '#cccccc',
                textDecoration: 'none',
                fontSize: '0.85rem',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#ff0000'}
              onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#cccccc'}
            >
              Terms of Service
            </motion.a>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              style={{
                color: '#cccccc',
                textDecoration: 'none',
                fontSize: '0.85rem',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#ff0000'}
              onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#cccccc'}
            >
              Contact Us
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 