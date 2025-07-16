import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const WEEK_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Placeholder data for workouts per plan (replace with your real data later)
const planWorkouts: Record<string, string[]> = {
  'Weight Loss': [
    'Rest', 'Treadmill Intervals', 'Bodyweight Circuits', 'Cycling', 'HIIT Cardio', 'HIIT Cardio', 'Yoga'
  ],
  'Muscle Gain': [
    'Rest', 'Chest & Triceps', 'Back & Biceps', 'Legs', 'Shoulders', 'Full Body', 'Core'
  ],
  'General Fitness': [
    'Rest', 'Full Body Circuits', 'Yoga', 'Swimming', 'Rowing', 'Cardio', 'Stretching'
  ],
  'Athlete': [
    'Rest', 'Plyometrics', 'Sprints', 'Agility Drills', 'Olympic Lifts', 'Mobility', 'Active Recovery'
  ]
};

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const [isMobile, setIsMobile] = useState(false);
  const isAdmin = user && user.email === 'adminbharatgym@gmail.com';

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Check initial size

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!user) navigate('/signin');
    else if (!user.plan) navigate('/plan-selection');
  }, [user, navigate]);

  if (!user || !user.plan) return null;

  const plan = user.plan;
  const todayIdx = new Date().getDay();
  const workouts = planWorkouts[plan] || planWorkouts['General Fitness'];
  const todayWorkout = workouts[todayIdx];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #000000 0%, #0a0a0a 100%)',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      padding: isMobile ? '100px 1rem 2rem 1rem' : '120px 2rem 2rem 2rem'
    }}>
      <div style={{
        background: '#1a1a1a',
        borderRadius: '20px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
        padding: isMobile ? '2rem 1.5rem' : '3rem 2.5rem',
        maxWidth: '600px',
        width: '100%',
        border: '1px solid #333',
        display: 'flex',
        flexDirection: 'column',
        gap: isMobile ? '2rem' : '2.5rem',
        alignItems: 'center',
        marginTop: '1rem'
      }}>
        <h2 style={{
          color: '#fff',
          fontWeight: 900,
          fontSize: isMobile ? '1.5rem' : '2rem',
          textAlign: 'center',
          marginBottom: '0.5rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase'
        }}>
          Welcome, {user.name}!
        </h2>
        <div style={{ 
          color: '#ff0000', 
          fontWeight: 700, 
          fontSize: isMobile ? '1rem' : '1.1rem', 
          marginBottom: '1rem', 
          textTransform: 'uppercase' 
        }}>
          Plan: {plan}
        </div>
        <div style={{ width: '100%' }}>
          {/* Today's Workout */}
          <div style={{
            background: '#1a1a1a',
            borderRadius: '20px',
            padding: isMobile ? '1.5rem' : '2rem',
            marginBottom: '2rem',
            border: '1px solid #333',
            boxShadow: '0 8px 32px rgba(0,0,0,0.25)'
          }}>
            <h2 style={{
              fontSize: isMobile ? '1.5rem' : '1.8rem',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '1rem',
              textTransform: 'uppercase'
            }}>
              Today's Workout
            </h2>
            <p style={{ 
              color: '#cccccc', 
              marginBottom: '1.5rem',
              fontSize: isMobile ? '0.95rem' : '1rem'
            }}>
              {todayWorkout}
            </p>
            <button
              onClick={() => navigate(`/workout/${todayWorkout.toLowerCase().replace(/\s/g, '-')}`)}
              style={{
                background: 'linear-gradient(135deg, #ff0000 0%, #cc0000 100%)',
                color: '#ffffff',
                border: 'none',
                padding: isMobile ? '0.75rem 1.25rem' : '0.75rem 1.5rem',
                borderRadius: '8px',
                fontSize: isMobile ? '0.9rem' : '1rem',
                fontWeight: 700,
                cursor: 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                width: isMobile ? '100%' : 'auto'
              }}
            >
              View Details
            </button>
          </div>

          {/* Quick Actions */}
          <div style={{
            background: '#1a1a1a',
            borderRadius: '20px',
            padding: isMobile ? '1.5rem' : '2rem',
            marginBottom: '2rem',
            border: '1px solid #333',
            boxShadow: '0 8px 32px rgba(0,0,0,0.25)'
          }}>
            <h2 style={{
              fontSize: isMobile ? '1.5rem' : '1.8rem',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '1.5rem',
              textTransform: 'uppercase'
            }}>
              Quick Actions
            </h2>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: isMobile ? '0.75rem' : '1rem' 
            }}>
              <button
                onClick={() => navigate('/goals')}
                style={{
                  background: 'linear-gradient(135deg, #ff0000 0%, #cc0000 100%)',
                  color: '#ffffff',
                  border: 'none',
                  padding: isMobile ? '0.875rem' : '1rem',
                  borderRadius: '12px',
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  transition: 'all 0.2s'
                }}
              >
                Manage Goals
              </button>
              
              <button
                onClick={() => navigate('/trainers')}
                style={{
                  background: 'linear-gradient(135deg, #ff0000 0%, #cc0000 100%)',
                  color: '#ffffff',
                  border: 'none',
                  padding: isMobile ? '0.875rem' : '1rem',
                  borderRadius: '12px',
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  transition: 'all 0.2s'
                }}
              >
                Book Training Session
              </button>
              
              <button
                onClick={() => navigate('/profile')}
                style={{
                  background: 'transparent',
                  color: '#ff0000',
                  border: '2px solid #ff0000',
                  padding: isMobile ? '0.875rem' : '1rem',
                  borderRadius: '12px',
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  transition: 'all 0.2s'
                }}
              >
                View Profile
              </button>
              
              <button
                onClick={() => navigate('/settings')}
                style={{
                  background: 'transparent',
                  color: '#ff0000',
                  border: '2px solid #ff0000',
                  padding: isMobile ? '0.875rem' : '1rem',
                  borderRadius: '12px',
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  transition: 'all 0.2s'
                }}
              >
                Settings
              </button>
            </div>
          </div>

          <div style={{ 
            color: '#fff', 
            fontWeight: 700, 
            fontSize: isMobile ? '1rem' : '1.1rem', 
            marginBottom: '0.5rem' 
          }}>
            Weekly Schedule:
          </div>
          <ul style={{ 
            color: '#fff', 
            marginLeft: '1.2rem', 
            marginBottom: '1.5rem',
            fontSize: isMobile ? '0.9rem' : '1rem'
          }}>
            {WEEK_DAYS.map((day, idx) => (
              <li key={day} style={{ 
                marginBottom: '0.3rem', 
                fontWeight: idx === todayIdx ? 700 : 400, 
                color: idx === todayIdx ? '#ff0000' : '#fff' 
              }}>
                {day}: {workouts[idx]}
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={() => { logout(); navigate('/signin'); }}
          style={{
            background: 'linear-gradient(135deg, #ff0000 0%, #cc0000 100%)',
            color: '#fff',
            fontWeight: 700,
            fontSize: isMobile ? '0.9rem' : '1rem',
            border: 'none',
            borderRadius: '8px',
            padding: isMobile ? '0.75rem 1.25rem' : '0.7rem 1.5rem',
            cursor: 'pointer',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            boxShadow: '0 2px 8px rgba(255,0,0,0.10)',
            marginTop: '1.5rem',
            transition: 'all 0.2s',
            width: isMobile ? '100%' : 'auto'
          }}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Dashboard; 