import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import FreeTrialForm from '../components/FreeTrialForm';

const Home: React.FC = () => {
  const { user } = useUser();
  const [isMobile, setIsMobile] = useState(false);
  const [showTrialModal, setShowTrialModal] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Check initial size

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <div style={{ background: '#000000', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)), url('https://images.unsplash.com/photo-1526401485004-46910ecc8e51?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: isMobile ? 'scroll' : 'fixed',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: isMobile ? '2rem 1rem' : '0'
      }}>
        {/* Background Overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 80%, rgba(255, 0, 0, 0.1) 0%, transparent 50%)',
          zIndex: 1
        }} />
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            textAlign: 'center',
            zIndex: 2,
            position: 'relative',
            maxWidth: '100%',
            width: '100%'
          }}
        >
          <motion.h1
            variants={itemVariants}
            style={{
              fontSize: isMobile ? '2.5rem' : '3.5rem',
              fontWeight: 800,
              color: '#ffffff',
              marginBottom: '1.5rem',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              textShadow: '0 0 20px rgba(0, 0, 0, 0.8)',
              lineHeight: 1.2
            }}
          >
            Transform Your Life
          </motion.h1>

          <motion.p
            variants={itemVariants}
            style={{
              fontSize: isMobile ? '1rem' : '1.3rem',
              color: '#ffffff',
              marginBottom: '3rem',
              maxWidth: '600px',
              marginLeft: 'auto',
              marginRight: 'auto',
              lineHeight: 1.6,
              textShadow: '0 0 10px rgba(0, 0, 0, 0.8)',
              padding: isMobile ? '0 1rem' : '0'
            }}
          >
            Experience the ultimate fitness journey with state-of-the-art equipment and world-class trainers
          </motion.p>

          <motion.div
            variants={itemVariants}
            style={{
              display: 'flex',
              gap: isMobile ? '1rem' : '2rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: 'center'
            }}
          >
            {user ? (
              // Logged in user - show Dashboard and Book Classes buttons
              <>
                <Link to="/dashboard" style={{ textDecoration: 'none', width: isMobile ? '100%' : 'auto' }}>
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      background: 'linear-gradient(135deg, #ff0000 0%, #cc0000 100%)',
                      color: '#ffffff',
                      border: 'none',
                      padding: isMobile ? '1rem 2rem' : '1.2rem 2.5rem',
                      fontSize: isMobile ? '1rem' : '1.1rem',
                      fontWeight: 600,
                      borderRadius: '5px',
                      cursor: 'pointer',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      boxShadow: '0 0 20px rgba(255, 0, 0, 0.3)',
                      transition: 'all 0.3s ease',
                      width: isMobile ? '100%' : 'auto',
                      maxWidth: isMobile ? '300px' : 'none'
                    }}
                  >
                    View My Dashboard
                  </motion.button>
                </Link>

                <Link to="/book-classes" style={{ textDecoration: 'none', width: isMobile ? '100%' : 'auto' }}>
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      background: 'transparent',
                      color: '#ffffff',
                      border: '2px solid #ffffff',
                      padding: isMobile ? '1rem 2rem' : '1.2rem 2.5rem',
                      fontSize: isMobile ? '1rem' : '1.1rem',
                      fontWeight: 600,
                      borderRadius: '5px',
                      cursor: 'pointer',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      transition: 'all 0.3s ease',
                      width: isMobile ? '100%' : 'auto',
                      maxWidth: isMobile ? '300px' : 'none'
                    }}
                  >
                    Book Classes
                  </motion.button>
                </Link>
              </>
            ) : (
              // Not logged in - show original buttons
              <>
                <Link to="/memberships" style={{ textDecoration: 'none', width: isMobile ? '100%' : 'auto' }}>
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      background: 'linear-gradient(135deg, #ff0000 0%, #cc0000 100%)',
                      color: '#ffffff',
                      border: 'none',
                      padding: isMobile ? '1rem 2rem' : '1.2rem 2.5rem',
                      fontSize: isMobile ? '1rem' : '1.1rem',
                      fontWeight: 600,
                      borderRadius: '5px',
                      cursor: 'pointer',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      boxShadow: '0 0 20px rgba(255, 0, 0, 0.3)',
                      transition: 'all 0.3s ease',
                      width: isMobile ? '100%' : 'auto',
                      maxWidth: isMobile ? '300px' : 'none'
                    }}
                  >
                    Start Your Journey
                  </motion.button>
                </Link>

                <Link to="/trainers" style={{ textDecoration: 'none', width: isMobile ? '100%' : 'auto' }}>
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      background: 'transparent',
                      color: '#ffffff',
                      border: '2px solid #ffffff',
                      padding: isMobile ? '1rem 2rem' : '1.2rem 2.5rem',
                      fontSize: isMobile ? '1rem' : '1.1rem',
                      fontWeight: 600,
                      borderRadius: '5px',
                      cursor: 'pointer',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      transition: 'all 0.3s ease',
                      width: isMobile ? '100%' : 'auto',
                      maxWidth: isMobile ? '300px' : 'none'
                    }}
                  >
                    Meet Our Trainers
                  </motion.button>
                </Link>
              </>
            )}
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: 'linear-gradient(135deg, #ff0000 0%, #cc0000 100%)',
                color: '#ffffff',
                border: 'none',
                padding: isMobile ? '1rem 2rem' : '1.2rem 2.5rem',
                fontSize: isMobile ? '1rem' : '1.1rem',
                fontWeight: 600,
                borderRadius: '5px',
                cursor: 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                boxShadow: '0 0 20px rgba(255, 0, 0, 0.3)',
                transition: 'all 0.3s ease',
                width: isMobile ? '100%' : 'auto',
                maxWidth: isMobile ? '300px' : 'none'
              }}
              onClick={() => setShowTrialModal(true)}
            >
              Book a Free Trial
            </motion.button>
          </motion.div>
        </motion.div>
        {/* Free Trial Modal */}
        {showTrialModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.7)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              background: '#fff',
              borderRadius: '12px',
              padding: '2rem',
              minWidth: 320,
              maxWidth: 400,
              boxShadow: '0 4px 32px rgba(0,0,0,0.25)',
              position: 'relative'
            }}>
              <button onClick={() => setShowTrialModal(false)} style={{ position: 'absolute', top: 12, right: 12, background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#ff0000' }}>×</button>
              <h2 style={{ color: '#ff0000', fontWeight: 700, marginBottom: 16 }}>Book a Free Trial</h2>
              <FreeTrialForm onSuccess={() => setShowTrialModal(false)} />
            </div>
          </div>
        )}
      </section>

      {/* Features Section */}
      <section style={{
        padding: isMobile ? '3rem 0' : '5rem 0',
        background: '#0a0a0a'
      }}>
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              fontSize: isMobile ? '2rem' : '3rem',
              fontWeight: 900,
              color: '#ffffff',
              textAlign: 'center',
              marginBottom: '3rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              padding: isMobile ? '0 1rem' : '0'
            }}
          >
            Why Choose Us
          </motion.h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: isMobile ? '1.5rem' : '2rem',
            padding: isMobile ? '0 1rem' : '0'
          }}>
            {[
              {
                title: 'State-of-the-Art Equipment',
                description: 'Latest fitness equipment for maximum results',
                icon: '💪'
              },
              {
                title: 'Expert Trainers',
                description: 'Certified professionals to guide your journey',
                icon: '🏋️'
              },
              {
                title: 'Flexible Classes',
                description: 'Variety of classes to suit your schedule',
                icon: '⏰'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: isMobile ? 0 : -10 }}
                style={{
                  background: '#1a1a1a',
                  padding: isMobile ? '1.5rem' : '2rem',
                  borderRadius: '10px',
                  textAlign: 'center',
                  border: '1px solid #333333',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{
                  fontSize: isMobile ? '2.5rem' : '3rem',
                  marginBottom: '1rem'
                }}>
                  {feature.icon}
                </div>
                <h3 style={{
                  fontSize: isMobile ? '1.25rem' : '1.5rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  marginBottom: '1rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  color: '#cccccc',
                  lineHeight: 1.6,
                  fontSize: isMobile ? '0.95rem' : '1rem'
                }}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section style={{
        padding: isMobile ? '3rem 0' : '5rem 0',
        background: 'linear-gradient(135deg, #000000 0%, #0a0a0a 100%)',
        textAlign: 'center'
      }}>
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              fontSize: isMobile ? '2rem' : '2.5rem',
              fontWeight: 800,
              color: '#ffffff',
              marginBottom: '2rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              padding: isMobile ? '0 1rem' : '0'
            }}
          >
            {user ? 'Ready to Crush Your Goals?' : 'Ready to Transform?'}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              fontSize: isMobile ? '1rem' : '1.2rem',
              color: '#cccccc',
              marginBottom: '3rem',
              maxWidth: '600px',
              marginLeft: 'auto',
              marginRight: 'auto',
              lineHeight: 1.6,
              padding: isMobile ? '0 1rem' : '0'
            }}
          >
            {user 
              ? `Welcome back, ${user.name}! Check your dashboard for today's workout and keep pushing towards your fitness goals.`
              : 'Join thousands of members who have already transformed their lives with us'
            }
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              padding: isMobile ? '0 1rem' : '0'
            }}
          >
            {user ? (
              <Link to="/dashboard" style={{ textDecoration: 'none', width: isMobile ? '100%' : 'auto' }}>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    background: 'linear-gradient(135deg, #ff0000 0%, #cc0000 100%)',
                    color: '#ffffff',
                    border: 'none',
                    padding: isMobile ? '1rem 2rem' : '1.2rem 3rem',
                    fontSize: isMobile ? '1rem' : '1.2rem',
                    fontWeight: 600,
                    borderRadius: '5px',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    boxShadow: '0 0 20px rgba(255, 0, 0, 0.3)',
                    transition: 'all 0.3s ease',
                    width: isMobile ? '100%' : 'auto',
                    maxWidth: isMobile ? '300px' : 'none'
                  }}
                >
                  View My Dashboard
                </motion.button>
              </Link>
            ) : (
              <Link to="/memberships" style={{ textDecoration: 'none', width: isMobile ? '100%' : 'auto' }}>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    background: 'linear-gradient(135deg, #ff0000 0%, #cc0000 100%)',
                    color: '#ffffff',
                    border: 'none',
                    padding: isMobile ? '1rem 2rem' : '1.2rem 3rem',
                    fontSize: isMobile ? '1rem' : '1.2rem',
                    fontWeight: 600,
                    borderRadius: '5px',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    boxShadow: '0 0 20px rgba(255, 0, 0, 0.3)',
                    transition: 'all 0.3s ease',
                    width: isMobile ? '100%' : 'auto',
                    maxWidth: isMobile ? '300px' : 'none'
                  }}
                >
                  Get Started Today
                </motion.button>
              </Link>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home; 