import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const plans = [
  {
    name: 'Weight Loss',
    description: 'Burn fat, get lean, and boost your metabolism with a focused weight loss plan.'
  },
  {
    name: 'Muscle Gain',
    description: 'Build muscle mass, increase strength, and sculpt your physique.'
  },
  {
    name: 'General Fitness',
    description: 'Improve overall health, flexibility, and endurance with a balanced routine.'
  },
  {
    name: 'Athlete',
    description: 'Train like a pro with advanced routines for performance and agility.'
  }
];

const PlanSelection: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const { user, updatePlan } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.plan) navigate('/dashboard');
  }, [user, navigate]);

  const handleSelect = (plan: string) => {
    if (user && user.plan) return; // Prevent changing plan if already set
    setSelected(plan);
    if (!user) {
      // Redirect to signup and pass the selected plan
      navigate('/signup', { state: { plan } });
      return;
    }
    updatePlan(plan);
    setTimeout(() => navigate('/dashboard'), 500);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #000000 0%, #0a0a0a 100%)',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      padding: '120px 2rem 2rem 2rem' // 96px navbar + 24px extra spacing
    }}>
      <div style={{
        background: '#1a1a1a',
        borderRadius: '20px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
        padding: '3rem 2.5rem',
        maxWidth: '600px',
        width: '100%',
        border: '1px solid #333',
        display: 'flex',
        flexDirection: 'column',
        gap: '2.5rem',
        alignItems: 'center',
        marginTop: '1rem' // Additional margin for better spacing
      }}>
        <h2 style={{
          color: '#fff',
          fontWeight: 900,
          fontSize: '2rem',
          textAlign: 'center',
          marginBottom: '0.5rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase'
        }}>
          Choose Your Fitness Plan
        </h2>
        {user && user.plan && (
          <div style={{ color: '#ff0000', fontWeight: 700, fontSize: '1.1rem', marginBottom: '1.5rem', textAlign: 'center' }}>
            You have already selected the <span style={{ textTransform: 'uppercase' }}>{user.plan}</span> plan. Plan selection is locked.
          </div>
        )}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {plans.map(plan => (
            <div key={plan.name} style={{
              background: selected === plan.name ? 'linear-gradient(135deg, #ff0000 0%, #cc0000 100%)' : '#111',
              borderRadius: '12px',
              padding: '1.5rem',
              border: selected === plan.name ? '2px solid #ff0000' : '1px solid #333',
              color: '#fff',
              boxShadow: selected === plan.name ? '0 2px 12px rgba(255,0,0,0.10)' : 'none',
              transition: 'all 0.2s',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.7rem',
              alignItems: 'flex-start',
              opacity: user && user.plan ? 0.6 : 1
            }}>
              <div style={{ fontWeight: 800, fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{plan.name}</div>
              <div style={{ color: '#ccc', fontSize: '1rem', fontWeight: 400 }}>{plan.description}</div>
              <button
                onClick={() => handleSelect(plan.name)}
                style={{
                  marginTop: '0.5rem',
                  background: selected === plan.name ? '#fff' : 'linear-gradient(135deg, #ff0000 0%, #cc0000 100%)',
                  color: selected === plan.name ? '#ff0000' : '#fff',
                  fontWeight: 700,
                  fontSize: '1rem',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.7rem 1.5rem',
                  cursor: user && user.plan ? 'not-allowed' : 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  boxShadow: '0 2px 8px rgba(255,0,0,0.10)',
                  transition: 'all 0.2s',
                  opacity: user && user.plan ? 0.7 : 1
                }}
                disabled={!!(user && user.plan)}
              >
                {user && user.plan ? 'Locked' : selected === plan.name ? 'Selected' : 'Select Plan'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlanSelection; 