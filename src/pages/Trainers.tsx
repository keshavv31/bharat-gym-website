import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Trainers: React.FC = () => {
  const navigate = useNavigate();

  const handleBookSession = (trainerName: string) => {
    // Show generic message for booking sessions (no contact info)
    alert(`Contact ${trainerName} directly to book a training session. Please visit our gym location for more details.`);
  };

  const trainers = [
    {
      name: 'Gurcharan Singh',
      specialization: 'Strength & Conditioning',
      experience: '12 years',
      description: 'Expert in strength training and conditioning for all levels.',
      achievements: ['Certified Personal Trainer', 'Strength Coach'],
      icon: '💪'
    },
    {
      name: 'Nitin Negi',
      specialization: 'Functional Fitness',
      experience: '9 years',
      description: 'Specialist in functional training and HIIT workouts.',
      achievements: ['HIIT Specialist', 'Functional Fitness Expert'],
      icon: '🏋️'
    },
    {
      name: 'Shivansh Singh',
      specialization: 'Bodybuilding & Nutrition',
      experience: '7 years',
      description: 'Bodybuilding coach and certified nutritionist.',
      achievements: ['Bodybuilding Champion', 'Certified Nutritionist'],
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
            Our Expert Trainers
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: '#cccccc',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            Meet our certified professionals dedicated to helping you achieve your fitness goals
          </p>
        </motion.div>
      </section>

      {/* Trainers Grid */}
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
            {trainers.map((trainer, index) => (
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
                {/* Trainer Icon */}
                <div style={{
                  fontSize: '4rem',
                  marginBottom: '1.5rem',
                  textAlign: 'center'
                }}>
                  {trainer.icon}
                </div>

                {/* Trainer Name */}
                <h3 style={{
                  fontSize: '1.8rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  marginBottom: '0.5rem',
                  textAlign: 'center'
                }}>
                  {trainer.name}
                </h3>

                {/* Specialization */}
                <div style={{
                  background: 'linear-gradient(135deg, #ff0000 0%, #cc0000 100%)',
                  color: '#ffffff',
                  padding: '0.5rem 1rem',
                  borderRadius: '25px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  textAlign: 'center',
                  marginBottom: '1rem',
                  display: 'inline-block',
                  width: '100%'
                }}>
                  {trainer.specialization}
                </div>

                {/* Experience */}
                <div style={{
                  textAlign: 'center',
                  marginBottom: '1.5rem'
                }}>
                  <span style={{
                    color: '#ff0000',
                    fontWeight: 600,
                    fontSize: '0.9rem'
                  }}>
                    Experience:
                  </span>
                  <span style={{
                    color: '#ffffff',
                    fontWeight: 500,
                    marginLeft: '0.5rem'
                  }}>
                    {trainer.experience}
                  </span>
                </div>

                {/* Description */}
                <p style={{
                  color: '#cccccc',
                  lineHeight: 1.6,
                  marginBottom: '1.5rem',
                  textAlign: 'center'
                }}>
                  {trainer.description}
                </p>

                {/* Achievements */}
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
                    Achievements
                  </h4>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0
                  }}>
                    {trainer.achievements.map((achievement, idx) => (
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
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleBookSession(trainer.name)}
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
                  Book Session
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
            Ready to Train with Our Experts?
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: '#cccccc',
            marginBottom: '3rem',
            maxWidth: '500px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Get personalized training plans and expert guidance to reach your fitness goals
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
            onClick={() => navigate('/memberships')}
          >
            Get Started Today
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default Trainers; 