import React from 'react';
import { motion } from 'framer-motion';

const Locations: React.FC = () => {
  const handleVisitLocation = (locationName: string, address: string) => {
    // Open Google Maps with the location
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };

  const handleGetDirections = (locationName: string, address: string) => {
    // Open Google Maps directions
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/dir//${encodedAddress}`, '_blank');
  };

  const locations = [
    {
      name: 'BHARAT GYM - Main Branch',
      address: '123 Fitness Street, Dehradun, Uttarakhand',
      hours: '5:00 AM - 11:00 PM',
      features: ['Full Gym Equipment', 'Personal Training', 'Group Classes', 'Locker Rooms'],
      icon: '🏋️'
    },
    {
      name: 'BHARAT GYM - Premium',
      address: '456 Wellness Avenue, Dehradun, Uttarakhand',
      hours: '5:00 AM - 11:00 PM',
      features: ['Luxury Facilities', 'Spa Services', 'Nutrition Center', 'Kids Zone'],
      icon: '💎'
    },
    {
      name: 'BHARAT GYM - Express',
      address: '789 Quick Fitness Road, Dehradun, Uttarakhand',
      hours: '6:00 AM - 10:00 PM',
      features: ['Quick Workouts', 'Cardio Focus', 'Express Classes', 'Parking Available'],
      icon: '⚡'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

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
            Our Locations
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: '#cccccc',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            Find the perfect BHARAT GYM location near you
          </p>
        </motion.div>
      </section>

      {/* Locations Grid */}
      <section style={{
        padding: '5rem 0',
        background: '#0a0a0a'
      }}>
        <div className="container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '2rem'
            }}
          >
            {locations.map((location, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                style={{
                  background: '#1a1a1a',
                  borderRadius: '15px',
                  padding: '2rem',
                  border: '1px solid #333333',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Embed Google Map for Main Branch only - now at the top, more prominent */}
                {index === 0 && (
                  <div style={{ marginBottom: '1.5rem', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 16px rgba(255,0,0,0.15)', border: '3px solid #ff0000', background: '#000' }}>
                    <div style={{ background: '#ff0000', color: '#fff', fontWeight: 700, textAlign: 'center', padding: '0.5rem 0', fontSize: '1.1rem', letterSpacing: '0.05em' }}>
                      View on Map
                    </div>
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3444.1224709794083!2d78.01581277563561!3d30.31903407478645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390929ccc8967603%3A0x4fa89cbc8e138053!2sBHARAT%20GYMS!5e0!3m2!1sen!2sin!4v1752652096053!5m2!1sen!2sin"
                      width="100%"
                      height="380"
                      style={{ border: 0, display: 'block' }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Bharat Gym Main Branch Map"
                    ></iframe>
                  </div>
                )}
                {/* Location Icon */}
                <div style={{
                  fontSize: '4rem',
                  marginBottom: '1.5rem',
                  textAlign: 'center'
                }}>
                  {location.icon}
                </div>

                {/* Location Name */}
                <h3 style={{
                  fontSize: '1.8rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  marginBottom: '1rem',
                  textAlign: 'center'
                }}>
                  {location.name}
                </h3>

                {/* Address */}
                <div style={{
                  background: '#0a0a0a',
                  padding: '1rem',
                  borderRadius: '8px',
                  marginBottom: '1rem',
                  textAlign: 'center'
                }}>
                  <div style={{
                    color: '#ff0000',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    marginBottom: '0.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Address
                  </div>
                  <div style={{
                    color: '#ffffff',
                    fontSize: '0.95rem',
                    lineHeight: 1.4
                  }}>
                    {location.address}
                  </div>
                </div>

                {/* Phone, Email, and Hours Section */}
                <div style={{
                  background: '#0a0a0a',
                  padding: '1rem',
                  borderRadius: '8px',
                  marginBottom: '1rem'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.5rem'
                  }}>
                    <span style={{
                      fontSize: '0.9rem',
                      color: '#ff0000',
                      fontWeight: 600
                    }}>
                      Hours:
                    </span>
                    <span style={{
                      color: '#ffffff',
                      fontWeight: 500
                    }}>
                      {location.hours}
                    </span>
                  </div>
                </div>

                {/* Features */}
                <div style={{
                  background: '#0a0a0a',
                  padding: '1rem',
                  borderRadius: '8px',
                  marginBottom: '1.5rem'
                }}>
                  <h4 style={{
                    color: '#ff0000',
                    fontWeight: 600,
                    marginBottom: '0.75rem',
                    fontSize: '0.9rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Facilities
                  </h4>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0
                  }}>
                    {location.features.map((feature, idx) => (
                      <li key={idx} style={{
                        color: '#ffffff',
                        fontSize: '0.85rem',
                        marginBottom: '0.5rem',
                        paddingLeft: '1rem',
                        position: 'relative'
                      }}>
                        <span style={{
                          color: '#ff0000',
                          marginRight: '0.5rem'
                        }}>
                          ✓
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div style={{
                  display: 'flex',
                  gap: '1rem'
                }}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleVisitLocation(location.name, location.address)}
                    style={{
                      flex: 1,
                      background: 'linear-gradient(135deg, #ff0000 0%, #cc0000 100%)',
                      color: '#ffffff',
                      border: 'none',
                      padding: '1rem',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      boxShadow: '0 0 20px rgba(255, 0, 0, 0.3)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Visit Location
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleGetDirections(location.name, location.address)}
                    style={{
                      flex: 1,
                      background: 'transparent',
                      color: '#ffffff',
                      border: '2px solid #ffffff',
                      padding: '1rem',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Get Directions
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
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
            Ready to Join BHARAT GYM?
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: '#cccccc',
            marginBottom: '3rem',
            maxWidth: '500px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Visit any of our locations and start your fitness journey today
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
          >
            Get Started Today
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default Locations; 