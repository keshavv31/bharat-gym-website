import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import FreeTrialForm from '../components/FreeTrialForm';
import RequestInfoForm from '../components/RequestInfoForm';

const Memberships: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showTrialModal, setShowTrialModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [infoPlan, setInfoPlan] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChoosePlan = (planId: string) => {
    setSelectedPlan(planId);
    // Navigate to sign up page with plan selection
    navigate('/signup', { state: { selectedPlan: planId } });
  };

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: '₹1000',
      period: 'per month',
      description: 'Perfect for beginners starting their fitness journey',
      features: [
        'Access to gym facilities',
        'Basic workout guidance',
        'Standard equipment access',
        'Locker room access',
        'Free parking',
        'Basic fitness assessment',
        'Gym floor access'
      ],
      limitations: [
        'No personal training',
        'No nutrition consultation',
        'No priority booking',
        'Standard customer support',
        'Limited trainer assistance'
      ],
      popular: false
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '₹1500',
      period: 'per month',
      description: 'Most popular choice for serious fitness enthusiasts',
      features: [
        'Full access to ALL equipment',
        'Personal training sessions (2/month)',
        'Advanced workout guidance',
        'Priority equipment access',
        'Nutrition consultation (1/month)',
        'Progress tracking & analytics',
        'Exclusive premium equipment access',
        'Towel service included',
        'Priority customer support',
        'Fitness goal setting & monitoring'
      ],
      limitations: [
        'Limited personal training sessions',
        'Basic nutrition guidance only'
      ],
      popular: true
    },
    {
      id: 'elite',
      name: 'Elite',
      price: '₹2500',
      period: 'per month',
      description: 'Ultimate fitness experience with personalized attention',
      features: [
        'Unlimited access to ALL equipment',
        'Unlimited personal training sessions',
        'Dedicated personal trainer',
        'Customized nutrition plans',
        'Advanced progress tracking',
        'Priority access to everything',
        'Exclusive elite equipment access',
        'Complimentary towel & shower service',
        '24/7 priority customer support',
        'Monthly fitness assessments',
        'Recovery & wellness sessions',
        'Exclusive member events',
        'Guest passes (2/month)',
        'Locker with personal key'
      ],
      limitations: [
        'No limitations - full access to everything'
      ],
      popular: false
    }
  ];

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
            Choose Your Plan
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: '#cccccc',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            Select the perfect membership plan that fits your fitness goals and lifestyle. 
            All plans include access to our world-class facilities and expert trainers.
          </p>
        </motion.div>
      </section>

      {/* Plans Section */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '2rem',
              maxWidth: '1200px',
              margin: '0 auto'
            }}
          >
            {plans.map((plan) => (
              <motion.div
                key={plan.id}
                variants={itemVariants}
                style={{
                  background: plan.popular ? '#1a1a1a' : '#0a0a0a',
                  borderRadius: '20px',
                  padding: '3rem 2rem',
                  border: plan.popular ? '2px solid #ff0000' : '1px solid #333',
                  boxShadow: plan.popular ? '0 8px 32px rgba(255,0,0,0.15)' : '0 8px 32px rgba(0,0,0,0.25)',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  marginBottom: '2rem'
                }}
              >
                {plan.popular && (
                  <div style={{
                    position: 'absolute',
                    top: '-15px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'linear-gradient(135deg, #ff0000 0%, #cc0000 100%)',
                    color: '#ffffff',
                    padding: '0.5rem 2rem',
                    borderRadius: '25px',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em'
                  }}>
                    Most Popular
                  </div>
                )}

                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <h2 style={{
                    fontSize: '2.5rem',
                    fontWeight: 900,
                    color: '#ffffff',
                    marginBottom: '0.5rem',
                    textTransform: 'uppercase'
                  }}>
                    {plan.name}
                  </h2>
                  <div style={{ marginBottom: '1rem' }}>
                    <span style={{
                      fontSize: '3rem',
                      fontWeight: 900,
                      color: '#ff0000'
                    }}>
                      {plan.price}
                    </span>
                    <span style={{
                      fontSize: '1.2rem',
                      color: '#cccccc',
                      marginLeft: '0.5rem'
                    }}>
                      {plan.period}
                    </span>
                  </div>
                  <p style={{
                    color: '#cccccc',
                    fontSize: '1rem',
                    lineHeight: 1.5
                  }}>
                    {plan.description}
                  </p>
                </div>

                {/* Features */}
                <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{
                    color: '#ffffff',
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    marginBottom: '1rem',
                    textTransform: 'uppercase'
                  }}>
                    What's Included:
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {plan.features.map((feature, index) => (
                      <li key={index} style={{
                        color: '#ffffff',
                        marginBottom: '0.75rem',
                        display: 'flex',
                        alignItems: 'center'
                      }}>
                        <span style={{
                          color: '#00ff00',
                          marginRight: '0.75rem',
                          fontSize: '1.2rem'
                        }}>
                          ✓
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Limitations */}
                {plan.limitations.length > 0 && (
                  <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{
                      color: '#ff0000',
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      marginBottom: '1rem',
                      textTransform: 'uppercase'
                    }}>
                      Limitations:
                    </h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {plan.limitations.map((limitation, index) => (
                        <li key={index} style={{
                          color: '#cccccc',
                          marginBottom: '0.75rem',
                          display: 'flex',
                          alignItems: 'center'
                        }}>
                          <span style={{
                            color: '#ff0000',
                            marginRight: '0.75rem',
                            fontSize: '1.2rem'
                          }}>
                            ✗
                          </span>
                          {limitation}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* CTA Button */}
                <button
                  style={{
                    marginTop: '1.5rem',
                    background: 'linear-gradient(135deg, #ff0000 0%, #cc0000 100%)',
                    color: '#fff',
                    border: 'none',
                    padding: '1rem 2rem',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    borderRadius: '8px',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    boxShadow: '0 0 20px rgba(255, 0, 0, 0.2)',
                    width: '100%',
                    transition: 'all 0.2s'
                  }}
                  onClick={() => { setShowInfoModal(true); setInfoPlan(plan.name); }}
                >
                  Request regarding this plan
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Equipment Access Info */}
      <section style={{
        background: '#1a1a1a',
        padding: '4rem 0',
        marginTop: '3rem'
      }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: 900,
              color: '#ffffff',
              marginBottom: '2rem',
              textTransform: 'uppercase'
            }}>
              Equipment Access Information
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '2rem',
              marginTop: '3rem'
            }}>
              <div style={{
                background: '#0a0a0a',
                padding: '2rem',
                borderRadius: '12px',
                border: '1px solid #333'
              }}>
                <h3 style={{
                  color: '#ff0000',
                  fontSize: '1.3rem',
                  fontWeight: 700,
                  marginBottom: '1rem'
                }}>
                  Basic Plan
                </h3>
                <p style={{ color: '#cccccc', lineHeight: 1.6 }}>
                  <strong style={{ color: '#ffffff' }}>Standard equipment access</strong><br/>
                  Access to all basic gym equipment. Perfect for beginners who want to start their fitness journey.
                </p>
              </div>

              <div style={{
                background: '#0a0a0a',
                padding: '2rem',
                borderRadius: '12px',
                border: '1px solid #333'
              }}>
                <h3 style={{
                  color: '#ff0000',
                  fontSize: '1.3rem',
                  fontWeight: 700,
                  marginBottom: '1rem'
                }}>
                  Elite Plan
                </h3>
                <p style={{ color: '#cccccc', lineHeight: 1.6 }}>
                  <strong style={{ color: '#ffffff' }}>ALL equipment + Guaranteed Access</strong><br/>
                  All equipment included with guaranteed access and exclusive premium machines.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: 900,
              color: '#ffffff',
              marginBottom: '3rem',
              textAlign: 'center',
              textTransform: 'uppercase'
            }}>
              Frequently Asked Questions
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{
                background: '#1a1a1a',
                padding: '2rem',
                borderRadius: '12px',
                border: '1px solid #333'
              }}>
                <h3 style={{
                  color: '#ffffff',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  marginBottom: '1rem'
                }}>
                  What's included in Premium and Elite plans?
                </h3>
                <p style={{ color: '#cccccc', lineHeight: 1.6 }}>
                  <strong style={{ color: '#ffffff' }}>Premium (₹1500):</strong> Full access to all equipment + 2 personal training sessions/month<br/>
                  <strong style={{ color: '#ffffff' }}>Elite (₹2500):</strong> Everything in Premium + unlimited personal training + dedicated trainer + exclusive services
                </p>
              </div>

              <div style={{
                background: '#1a1a1a',
                padding: '2rem',
                borderRadius: '12px',
                border: '1px solid #333'
              }}>
                <h3 style={{
                  color: '#ffffff',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  marginBottom: '1rem'
                }}>
                  What's the difference between Premium and Elite?
                </h3>
                <p style={{ color: '#cccccc', lineHeight: 1.6 }}>
                  <strong style={{ color: '#ffffff' }}>Premium (₹1500):</strong> All equipment access + 2 personal training sessions/month<br/>
                  <strong style={{ color: '#ffffff' }}>Elite (₹2500):</strong> Everything in Premium + unlimited personal training + dedicated trainer + exclusive services
                </p>
              </div>

              <div style={{
                background: '#1a1a1a',
                padding: '2rem',
                borderRadius: '12px',
                border: '1px solid #333'
              }}>
                <h3 style={{
                  color: '#ffffff',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  marginBottom: '1rem'
                }}>
                  Can I upgrade or downgrade my plan?
                </h3>
                <p style={{ color: '#cccccc', lineHeight: 1.6 }}>
                  Yes! You can change your plan at any time. Upgrades take effect immediately, downgrades take effect at the end of your current billing cycle.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showInfoModal && (
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
            <button onClick={() => setShowInfoModal(false)} style={{ position: 'absolute', top: 12, right: 12, background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#ff0000' }}>×</button>
            <h2 style={{ color: '#ff0000', fontWeight: 700, marginBottom: 16 }}>Request regarding {infoPlan || 'this plan'}</h2>
            <RequestInfoForm onSuccess={() => setShowInfoModal(false)} planName={infoPlan} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Memberships; 