import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Services: React.FC = () => {
  const navigate = useNavigate();

  const handleBookService = (serviceName: string) => {
    // Navigate to trainers page for booking services
    navigate('/trainers');
  };

  const services = [
    {
      name: 'Personal Training',
      description: 'One-on-one training sessions with certified personal trainers',
      features: ['Custom workout plans', 'Nutrition guidance', 'Progress tracking', 'Flexible scheduling'],
      price: '₹2000/session',
      icon: '💪'
    },
    {
      name: 'Nutrition Counseling',
      description: 'Professional nutrition advice and meal planning',
      features: ['Personalized meal plans', 'Diet analysis', 'Supplement guidance', 'Regular consultations'],
      price: '₹1500/session',
      icon: '🥗'
    },
    {
      name: 'Fitness Assessment',
      description: 'Comprehensive fitness evaluation and goal setting',
      features: ['Body composition analysis', 'Strength testing', 'Flexibility assessment', 'Goal planning'],
      price: '₹1000/assessment',
      icon: '📊'
    },
    {
      name: 'Recovery & Wellness',
      description: 'Recovery services to enhance your fitness journey',
      features: ['Massage therapy', 'Stretching sessions', 'Recovery equipment', 'Wellness consultations'],
      price: '₹1200/session',
      icon: '🧘'
    },
    {
      name: 'Equipment Training',
      description: 'Learn proper form and technique for all equipment',
      features: ['Equipment orientation', 'Form correction', 'Safety training', 'Progressive learning'],
      price: '₹800/session',
      icon: '🏋️'
    },
    {
      name: 'Bodybuilding Coaching',
      description: 'Specialized coaching for bodybuilding and physique development',
      features: ['Customized routines', 'Competition prep', 'Supplement guidance', 'Progress monitoring'],
      price: '₹2500/session',
      icon: '🥇'
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
            Our Services
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: '#cccccc',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            Comprehensive fitness services designed to help you achieve your goals
          </p>
        </motion.div>
      </section>

      {/* Services Grid */}
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
            {services.map((service, index) => (
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
                {/* Service Icon */}
                <div style={{
                  fontSize: '4rem',
                  marginBottom: '1.5rem',
                  textAlign: 'center'
                }}>
                  {service.icon}
                </div>

                {/* Service Name */}
                <h3 style={{
                  fontSize: '1.8rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  marginBottom: '1rem',
                  textAlign: 'center'
                }}>
                  {service.name}
                </h3>

                {/* Service Description */}
                <p style={{
                  color: '#cccccc',
                  lineHeight: 1.6,
                  marginBottom: '1.5rem',
                  textAlign: 'center'
                }}>
                  {service.description}
                </p>

                {/* Price */}
                <div style={{
                  background: 'linear-gradient(135deg, #ff0000 0%, #cc0000 100%)',
                  color: '#ffffff',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  textAlign: 'center',
                  marginBottom: '1.5rem'
                }}>
                  {service.price}
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
                    What's Included
                  </h4>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0
                  }}>
                    {service.features.map((feature, idx) => (
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

                {/* Book Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleBookService(service.name)}
                  style={{
                    width: '100%',
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
                  Book Service
                </motion.button>
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
            Ready to Get Started?
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: '#cccccc',
            marginBottom: '3rem',
            maxWidth: '500px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Contact us to book your preferred service or get a personalized consultation
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
            Contact Us
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default Services; 