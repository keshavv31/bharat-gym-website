import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import '../index.css';

interface Exercise {
  name: string;
  sets: number;
  reps: string;
  weight?: string;
  rest: string;
  instructions: string;
  category: string;
}

interface Workout {
  name: string;
  description: string;
  duration: string;
  difficulty: string;
  exercises: Exercise[];
}

const WorkoutDetails: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { day } = useParams<{ day: string }>();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [currentExercise, setCurrentExercise] = useState(0);

  useEffect(() => {
    if (!user) {
      navigate('/signin');
      return;
    }

    // Placeholder workout data based on user's plan
    const workoutData: Record<string, Workout> = {
      'Weight Loss': {
        name: 'HIIT Cardio Blast',
        description: 'High-intensity interval training to maximize fat burning and boost metabolism.',
        duration: '45 minutes',
        difficulty: 'Intermediate',
        exercises: [
          {
            name: 'Jumping Jacks',
            sets: 3,
            reps: '30 seconds',
            rest: '30 seconds',
            instructions: 'Start with feet together, jump to spread legs and raise arms overhead, then return to starting position.',
            category: 'Cardio'
          },
          {
            name: 'Burpees',
            sets: 4,
            reps: '10 reps',
            rest: '45 seconds',
            instructions: 'Squat down, place hands on ground, jump feet back to plank, do a push-up, jump feet forward, and jump up.',
            category: 'Full Body'
          },
          {
            name: 'Mountain Climbers',
            sets: 3,
            reps: '20 reps each side',
            rest: '30 seconds',
            instructions: 'Start in plank position, alternate bringing knees to chest as if running in place.',
            category: 'Core'
          },
          {
            name: 'High Knees',
            sets: 3,
            reps: '45 seconds',
            rest: '30 seconds',
            instructions: 'Run in place, bringing knees up to waist level with each step.',
            category: 'Cardio'
          },
          {
            name: 'Plank Hold',
            sets: 3,
            reps: '60 seconds',
            rest: '45 seconds',
            instructions: 'Hold plank position with body in a straight line from head to heels.',
            category: 'Core'
          }
        ]
      },
      'Muscle Gain': {
        name: 'Upper Body Power',
        description: 'Focus on building strength and muscle mass in chest, back, and arms.',
        duration: '60 minutes',
        difficulty: 'Advanced',
        exercises: [
          {
            name: 'Bench Press',
            sets: 4,
            reps: '8-10 reps',
            weight: '80% 1RM',
            rest: '2-3 minutes',
            instructions: 'Lie on bench, lower bar to chest, press up to full extension.',
            category: 'Chest'
          },
          {
            name: 'Pull-ups',
            sets: 4,
            reps: '8-12 reps',
            rest: '2 minutes',
            instructions: 'Hang from bar, pull body up until chin over bar, lower with control.',
            category: 'Back'
          },
          {
            name: 'Overhead Press',
            sets: 3,
            reps: '8-10 reps',
            weight: '70% 1RM',
            rest: '2 minutes',
            instructions: 'Stand with feet shoulder-width, press weight overhead to full extension.',
            category: 'Shoulders'
          },
          {
            name: 'Barbell Rows',
            sets: 3,
            reps: '10-12 reps',
            weight: '75% 1RM',
            rest: '2 minutes',
            instructions: 'Bend at hips, pull bar to lower chest, squeeze shoulder blades.',
            category: 'Back'
          },
          {
            name: 'Dips',
            sets: 3,
            reps: '8-12 reps',
            rest: '90 seconds',
            instructions: 'Lower body between parallel bars, push up to full extension.',
            category: 'Triceps'
          }
        ]
      },
      'General Fitness': {
        name: 'Full Body Circuit',
        description: 'Balanced workout targeting all major muscle groups for overall fitness.',
        duration: '50 minutes',
        difficulty: 'Beginner',
        exercises: [
          {
            name: 'Squats',
            sets: 3,
            reps: '15 reps',
            rest: '60 seconds',
            instructions: 'Stand with feet shoulder-width, lower hips back and down, return to standing.',
            category: 'Legs'
          },
          {
            name: 'Push-ups',
            sets: 3,
            reps: '10-15 reps',
            rest: '60 seconds',
            instructions: 'Start in plank, lower chest to ground, push back up to plank.',
            category: 'Chest'
          },
          {
            name: 'Lunges',
            sets: 3,
            reps: '12 reps each leg',
            rest: '60 seconds',
            instructions: 'Step forward, lower back knee toward ground, return to starting position.',
            category: 'Legs'
          },
          {
            name: 'Plank',
            sets: 3,
            reps: '30 seconds',
            rest: '45 seconds',
            instructions: 'Hold body in straight line from head to heels.',
            category: 'Core'
          },
          {
            name: 'Superman',
            sets: 3,
            reps: '12 reps',
            rest: '45 seconds',
            instructions: 'Lie face down, lift chest and legs off ground, hold briefly.',
            category: 'Back'
          }
        ]
      },
      'Athlete': {
        name: 'Performance Training',
        description: 'Advanced training focusing on power, speed, and athletic performance.',
        duration: '75 minutes',
        difficulty: 'Advanced',
        exercises: [
          {
            name: 'Box Jumps',
            sets: 4,
            reps: '8 reps',
            rest: '90 seconds',
            instructions: 'Jump onto box, land softly, step down, repeat immediately.',
            category: 'Plyometrics'
          },
          {
            name: 'Power Cleans',
            sets: 4,
            reps: '5 reps',
            weight: '70% 1RM',
            rest: '2-3 minutes',
            instructions: 'Explosive movement from ground to shoulders, catch in front rack position.',
            category: 'Olympic Lifts'
          },
          {
            name: 'Sprint Intervals',
            sets: 6,
            reps: '30 seconds',
            rest: '90 seconds',
            instructions: 'Sprint at maximum effort for 30 seconds, walk for 90 seconds.',
            category: 'Cardio'
          },
          {
            name: 'Medicine Ball Slams',
            sets: 3,
            reps: '12 reps',
            rest: '60 seconds',
            instructions: 'Hold ball overhead, slam to ground with full force, catch and repeat.',
            category: 'Power'
          },
          {
            name: 'Lateral Bounds',
            sets: 3,
            reps: '10 reps each direction',
            rest: '60 seconds',
            instructions: 'Jump laterally from side to side, landing softly and immediately jumping back.',
            category: 'Agility'
          }
        ]
      }
    };

    const userPlan = user.plan || 'General Fitness';
    setWorkout(workoutData[userPlan]);
  }, [user, navigate]);

  if (!user || !workout) return null;

  return (
    <div className="premium-bg" style={{ minHeight: '100vh', paddingTop: '80px' }}>
      <div className="container">
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h1 style={{
              fontSize: '3rem',
              fontWeight: 900,
              color: '#ffffff',
              marginBottom: '1rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }}>
              {workout.name}
            </h1>
            <p style={{
              fontSize: '1.2rem',
              color: '#cccccc',
              maxWidth: '600px',
              margin: '0 auto 1rem'
            }}>
              {workout.description}
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
              <span style={{ color: '#ff0000', fontWeight: 600 }}>Duration: {workout.duration}</span>
              <span style={{ color: '#ff0000', fontWeight: 600 }}>Difficulty: {workout.difficulty}</span>
            </div>
          </div>

          {/* Exercise List */}
          <div style={{
            background: '#1a1a1a',
            borderRadius: '20px',
            padding: '3rem',
            marginBottom: '2rem',
            border: '1px solid #333',
            boxShadow: '0 8px 32px rgba(0,0,0,0.25)'
          }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '2rem',
              textTransform: 'uppercase'
            }}>
              Exercises
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {workout.exercises.map((exercise, index) => (
                <div key={index} style={{
                  background: '#0a0a0a',
                  borderRadius: '12px',
                  padding: '2rem',
                  border: '1px solid #333',
                  transition: 'all 0.2s'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <h3 style={{
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      color: '#ffffff',
                      marginBottom: '0.5rem'
                    }}>
                      {exercise.name}
                    </h3>
                    <span style={{
                      background: '#ff0000',
                      color: '#ffffff',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      textTransform: 'uppercase'
                    }}>
                      {exercise.category}
                    </span>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <span style={{ color: '#cccccc', fontSize: '0.9rem' }}>Sets:</span>
                      <div style={{ color: '#ffffff', fontWeight: 600 }}>{exercise.sets}</div>
                    </div>
                    <div>
                      <span style={{ color: '#cccccc', fontSize: '0.9rem' }}>Reps:</span>
                      <div style={{ color: '#ffffff', fontWeight: 600 }}>{exercise.reps}</div>
                    </div>
                    {exercise.weight && (
                      <div>
                        <span style={{ color: '#cccccc', fontSize: '0.9rem' }}>Weight:</span>
                        <div style={{ color: '#ffffff', fontWeight: 600 }}>{exercise.weight}</div>
                      </div>
                    )}
                    <div>
                      <span style={{ color: '#cccccc', fontSize: '0.9rem' }}>Rest:</span>
                      <div style={{ color: '#ffffff', fontWeight: 600 }}>{exercise.rest}</div>
                    </div>
                  </div>
                  
                  <div>
                    <span style={{ color: '#cccccc', fontSize: '0.9rem' }}>Instructions:</span>
                    <p style={{ color: '#ffffff', marginTop: '0.5rem', lineHeight: 1.6 }}>
                      {exercise.instructions}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={() => navigate('/dashboard')}
              style={{
                background: 'linear-gradient(135deg, #ff0000 0%, #cc0000 100%)',
                color: '#ffffff',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '8px',
                fontSize: '1.1rem',
                fontWeight: 700,
                cursor: 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginRight: '1rem'
              }}
            >
              Back to Dashboard
            </button>
            <button
              onClick={() => navigate('/profile')}
              style={{
                background: 'transparent',
                color: '#ff0000',
                border: '2px solid #ff0000',
                padding: '1rem 2rem',
                borderRadius: '8px',
                fontSize: '1.1rem',
                fontWeight: 700,
                cursor: 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '0.08em'
              }}
            >
              View Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutDetails; 