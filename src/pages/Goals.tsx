import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkout } from '../context/WorkoutContext';
import '../index.css';

const Goals: React.FC = () => {
  const { goals, addGoal, updateGoal, deleteGoal } = useWorkout();
  const navigate = useNavigate();
  const [showAddForm, setShowAddForm] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [newGoal, setNewGoal] = useState({
    name: '',
    target: 0,
    current: 0,
    unit: 'workouts',
    deadline: ''
  });

  const handleAddGoal = () => {
    console.log('handleAddGoal called with:', newGoal);
    
    // Clear previous errors
    setValidationErrors([]);
    
    const errors: string[] = [];
    
    if (!newGoal.name.trim()) {
      errors.push('Goal name is required');
    }
    
    if (newGoal.target <= 0) {
      errors.push('Target must be greater than 0');
    }
    
    if (!newGoal.deadline) {
      errors.push('Deadline is required');
    }
    
    if (errors.length > 0) {
      setValidationErrors(errors);
      console.log('Validation failed:', errors);
      return;
    }
    
    console.log('Validation passed, adding goal');
    addGoal({
      name: newGoal.name.trim(),
      target: newGoal.target,
      current: newGoal.current,
      unit: newGoal.unit,
      deadline: newGoal.deadline,
      completed: false
    });
    setNewGoal({
      name: '',
      target: 0,
      current: 0,
      unit: 'workouts',
      deadline: ''
    });
    setShowAddForm(false);
    setValidationErrors([]);
    setSuccessMessage('Goal created successfully!');
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  // Test function to add sample goals
  const addSampleGoals = () => {
    const sampleGoals = [
      {
        name: 'Complete 30 workouts',
        target: 30,
        current: 12,
        unit: 'workouts',
        deadline: '2024-12-31',
        completed: false
      },
      {
        name: 'Lose 10 kg',
        target: 10,
        current: 3,
        unit: 'weight',
        deadline: '2024-11-30',
        completed: false
      },
      {
        name: 'Run 100 km',
        target: 100,
        current: 45,
        unit: 'distance',
        deadline: '2024-10-31',
        completed: false
      }
    ];
    
    sampleGoals.forEach(goal => addGoal(goal));
    setSuccessMessage('Sample goals added successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleUpdateGoal = (id: string, current: number) => {
    updateGoal(id, current);
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getDaysUntilDeadline = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

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
              Your Goals
            </h1>
            <p style={{
              fontSize: '1.2rem',
              color: '#cccccc',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Set, track, and achieve your fitness goals
            </p>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div style={{
              background: '#00ff00',
              color: '#000000',
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '2rem',
              fontSize: '1rem',
              fontWeight: 600,
              textAlign: 'center'
            }}>
              {successMessage}
            </div>
          )}

          {/* Add Goal Button */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <button
              onClick={() => setShowAddForm(true)}
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
              Add New Goal
            </button>
            <button
              onClick={addSampleGoals}
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
              Add Sample Goals (Test)
            </button>
          </div>

          {/* Add Goal Form */}
          {showAddForm && (
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
                Create New Goal
              </h2>

              {/* Validation Errors */}
              {validationErrors.length > 0 && (
                <div style={{
                  background: '#ff0000',
                  color: '#ffffff',
                  padding: '1rem',
                  borderRadius: '8px',
                  marginBottom: '2rem',
                  fontSize: '0.9rem'
                }}>
                  <strong>Please fix the following errors:</strong>
                  <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.5rem' }}>
                    {validationErrors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
                <div>
                  <label style={{ color: '#cccccc', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>
                    Goal Name
                  </label>
                  <input
                    type="text"
                    value={newGoal.name}
                    onChange={(e) => setNewGoal({...newGoal, name: e.target.value})}
                    placeholder="e.g., Complete 30 workouts"
                    style={{
                      width: '100%',
                      padding: '1rem',
                      background: '#0a0a0a',
                      border: '1px solid #333',
                      borderRadius: '8px',
                      color: '#ffffff',
                      fontSize: '1rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ color: '#cccccc', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>
                    Target
                  </label>
                  <input
                    type="number"
                    value={newGoal.target}
                    onChange={(e) => setNewGoal({...newGoal, target: parseInt(e.target.value) || 0})}
                    placeholder="30"
                    style={{
                      width: '100%',
                      padding: '1rem',
                      background: '#0a0a0a',
                      border: '1px solid #333',
                      borderRadius: '8px',
                      color: '#ffffff',
                      fontSize: '1rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ color: '#cccccc', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>
                    Unit
                  </label>
                  <select
                    value={newGoal.unit}
                    onChange={(e) => setNewGoal({...newGoal, unit: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      background: '#0a0a0a',
                      border: '1px solid #333',
                      borderRadius: '8px',
                      color: '#ffffff',
                      fontSize: '1rem'
                    }}
                  >
                    <option value="workouts">Workouts</option>
                    <option value="weight">Weight (kg)</option>
                    <option value="distance">Distance (km)</option>
                    <option value="time">Time (minutes)</option>
                    <option value="reps">Reps</option>
                  </select>
                </div>

                <div>
                  <label style={{ color: '#cccccc', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>
                    Deadline
                  </label>
                  <input
                    type="date"
                    value={newGoal.deadline}
                    onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      background: '#0a0a0a',
                      border: '1px solid #333',
                      borderRadius: '8px',
                      color: '#ffffff',
                      fontSize: '1rem'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button
                  onClick={handleAddGoal}
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
                    letterSpacing: '0.08em'
                  }}
                >
                  Create Goal
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
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
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Goals List */}
          <div style={{
            background: '#1a1a1a',
            borderRadius: '20px',
            padding: '3rem',
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
              Active Goals
            </h2>

            {goals.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#cccccc', padding: '3rem' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>No goals set yet</h3>
                <p>Create your first fitness goal to start tracking your progress!</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {goals.map((goal) => {
                  const progressPercentage = getProgressPercentage(goal.current, goal.target);
                  const daysUntilDeadline = getDaysUntilDeadline(goal.deadline);
                  
                  return (
                    <div key={goal.id} style={{
                      background: '#0a0a0a',
                      borderRadius: '16px',
                      padding: '2rem',
                      border: '1px solid #333',
                      transition: 'all 0.3s'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                        <div>
                          <h3 style={{ color: '#ffffff', fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                            {goal.name}
                          </h3>
                          <p style={{ color: '#cccccc', fontSize: '1rem' }}>
                            Target: {goal.target} {goal.unit}
                          </p>
                        </div>
                        
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <span style={{
                            background: goal.completed ? '#00ff00' : daysUntilDeadline < 0 ? '#ff0000' : '#ff0000',
                            color: '#ffffff',
                            padding: '0.5rem 1rem',
                            borderRadius: '20px',
                            fontSize: '0.8rem',
                            fontWeight: 600
                          }}>
                            {goal.completed ? 'Completed' : daysUntilDeadline < 0 ? 'Overdue' : 'In Progress'}
                          </span>
                          
                          <button
                            onClick={() => deleteGoal(goal.id)}
                            style={{
                              background: 'transparent',
                              color: '#ff0000',
                              border: '1px solid #ff0000',
                              padding: '0.5rem',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontSize: '0.8rem'
                            }}
                          >
                            ×
                          </button>
                        </div>
                      </div>

                      <div style={{ marginBottom: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                          <span style={{ color: '#cccccc', fontSize: '0.9rem' }}>
                            Progress: {goal.current} / {goal.target} {goal.unit}
                          </span>
                          <span style={{ color: '#ffffff', fontWeight: 600 }}>
                            {Math.round(progressPercentage)}%
                          </span>
                        </div>
                        
                        <div style={{
                          background: '#333',
                          height: '12px',
                          borderRadius: '6px',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            background: 'linear-gradient(135deg, #ff0000 0%, #cc0000 100%)',
                            height: '100%',
                            width: `${progressPercentage}%`,
                            transition: 'width 0.3s ease'
                          }} />
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                        <div>
                          <label style={{ color: '#cccccc', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>
                            Current Progress
                          </label>
                          <input
                            type="number"
                            value={goal.current}
                            onChange={(e) => handleUpdateGoal(goal.id, parseInt(e.target.value) || 0)}
                            style={{
                              width: '100%',
                              padding: '0.75rem',
                              background: '#1a1a1a',
                              border: '1px solid #333',
                              borderRadius: '6px',
                              color: '#ffffff',
                              fontSize: '1rem'
                            }}
                          />
                        </div>
                        
                        <div>
                          <span style={{ color: '#cccccc', fontSize: '0.9rem' }}>Deadline:</span>
                          <div style={{ color: '#ffffff', fontWeight: 600, marginTop: '0.25rem' }}>
                            {new Date(goal.deadline).toLocaleDateString()}
                          </div>
                          <div style={{ 
                            color: daysUntilDeadline < 0 ? '#ff0000' : daysUntilDeadline < 7 ? '#ffaa00' : '#cccccc',
                            fontSize: '0.8rem',
                            marginTop: '0.25rem'
                          }}>
                            {daysUntilDeadline < 0 
                              ? `${Math.abs(daysUntilDeadline)} days overdue`
                              : `${daysUntilDeadline} days remaining`
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button
              onClick={() => navigate('/dashboard')}
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
                letterSpacing: '0.08em',
                transition: 'all 0.2s'
              }}
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Goals; 