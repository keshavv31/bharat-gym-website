import React from 'react';
import { useWorkout } from '../context/WorkoutContext';
import '../index.css';

const ProgressCharts: React.FC = () => {
  const { progress, workoutHistory } = useWorkout();

  // Calculate weekly workout frequency
  const getWeeklyWorkouts = () => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    }).reverse();

    return last7Days.map(date => {
      const workoutsOnDate = workoutHistory.filter(workout => 
        workout.date.startsWith(date) && workout.completed
      ).length;
      return { date, count: workoutsOnDate };
    });
  };

  const weeklyData = getWeeklyWorkouts();

  // Calculate progress percentage for goals
  const getGoalProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  return (
    <div style={{ padding: '2rem' }}>
      {/* Progress Overview */}
      <div style={{
        background: '#1a1a1a',
        borderRadius: '20px',
        padding: '2rem',
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
          Your Progress
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#ff0000', marginBottom: '0.5rem' }}>
              {progress.totalWorkouts}
            </div>
            <div style={{ color: '#cccccc', fontSize: '1rem' }}>Total Workouts</div>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#ff0000', marginBottom: '0.5rem' }}>
              {progress.currentStreak}
            </div>
            <div style={{ color: '#cccccc', fontSize: '1rem' }}>Current Streak</div>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#ff0000', marginBottom: '0.5rem' }}>
              {progress.longestStreak}
            </div>
            <div style={{ color: '#cccccc', fontSize: '1rem' }}>Longest Streak</div>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#ff0000', marginBottom: '0.5rem' }}>
              {Math.round(progress.totalDuration / 60)}h
            </div>
            <div style={{ color: '#cccccc', fontSize: '1rem' }}>Total Hours</div>
          </div>
        </div>
      </div>

      {/* Weekly Activity Chart */}
      <div style={{
        background: '#1a1a1a',
        borderRadius: '20px',
        padding: '2rem',
        marginBottom: '2rem',
        border: '1px solid #333',
        boxShadow: '0 8px 32px rgba(0,0,0,0.25)'
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          color: '#ffffff',
          marginBottom: '1.5rem',
          textTransform: 'uppercase'
        }}>
          Weekly Activity
        </h3>
        
        <div style={{ display: 'flex', alignItems: 'end', gap: '0.5rem', height: '200px' }}>
          {weeklyData.map((day, index) => (
            <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                background: day.count > 0 ? '#ff0000' : '#333',
                width: '100%',
                height: `${Math.max(day.count * 30, 10)}px`,
                borderRadius: '4px 4px 0 0',
                transition: 'all 0.3s',
                marginBottom: '0.5rem'
              }} />
              <div style={{ color: '#cccccc', fontSize: '0.8rem', textAlign: 'center' }}>
                {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
              </div>
              <div style={{ color: '#ffffff', fontSize: '0.9rem', fontWeight: 600 }}>
                {day.count}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Goals Progress */}
      {progress.goals.length > 0 && (
        <div style={{
          background: '#1a1a1a',
          borderRadius: '20px',
          padding: '2rem',
          marginBottom: '2rem',
          border: '1px solid #333',
          boxShadow: '0 8px 32px rgba(0,0,0,0.25)'
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#ffffff',
            marginBottom: '1.5rem',
            textTransform: 'uppercase'
          }}>
            Goals Progress
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {progress.goals.map((goal) => (
              <div key={goal.id} style={{
                background: '#0a0a0a',
                borderRadius: '12px',
                padding: '1.5rem',
                border: '1px solid #333'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h4 style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: 600 }}>
                    {goal.name}
                  </h4>
                  <span style={{
                    background: goal.completed ? '#00ff00' : '#ff0000',
                    color: '#ffffff',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: 600
                  }}>
                    {goal.completed ? 'Completed' : 'In Progress'}
                  </span>
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#cccccc', fontSize: '0.9rem' }}>
                      Progress: {goal.current} / {goal.target} {goal.unit}
                    </span>
                    <span style={{ color: '#ffffff', fontWeight: 600 }}>
                      {Math.round(getGoalProgress(goal.current, goal.target))}%
                    </span>
                  </div>
                  
                  <div style={{
                    background: '#333',
                    height: '8px',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      background: 'linear-gradient(135deg, #ff0000 0%, #cc0000 100%)',
                      height: '100%',
                      width: `${getGoalProgress(goal.current, goal.target)}%`,
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                </div>
                
                <div style={{ color: '#cccccc', fontSize: '0.9rem' }}>
                  Deadline: {new Date(goal.deadline).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Workouts */}
      <div style={{
        background: '#1a1a1a',
        borderRadius: '20px',
        padding: '2rem',
        border: '1px solid #333',
        boxShadow: '0 8px 32px rgba(0,0,0,0.25)'
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          color: '#ffffff',
          marginBottom: '1.5rem',
          textTransform: 'uppercase'
        }}>
          Recent Workouts
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {workoutHistory.slice(0, 5).map((workout) => (
            <div key={workout.id} style={{
              background: '#0a0a0a',
              borderRadius: '12px',
              padding: '1.5rem',
              border: '1px solid #333',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <h4 style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                  {workout.workoutName}
                </h4>
                <div style={{ color: '#cccccc', fontSize: '0.9rem' }}>
                  {new Date(workout.date).toLocaleDateString()} • {workout.duration} minutes
                </div>
              </div>
              
              <div style={{
                background: '#ff0000',
                color: '#ffffff',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: 600
              }}>
                Completed
              </div>
            </div>
          ))}
          
          {workoutHistory.length === 0 && (
            <div style={{ textAlign: 'center', color: '#cccccc', padding: '2rem' }}>
              No workouts completed yet. Start your fitness journey today!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressCharts; 