import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface WorkoutSession {
  id: string;
  date: string;
  workoutName: string;
  exercises: ExerciseSession[];
  completed: boolean;
  duration: number; // in minutes
  notes: string;
}

interface ExerciseSession {
  name: string;
  sets: number;
  reps: string;
  weight?: string;
  completed: boolean;
  actualSets: number;
  actualReps: string;
  actualWeight?: string;
  notes: string;
}

interface WorkoutProgress {
  totalWorkouts: number;
  currentStreak: number;
  longestStreak: number;
  totalDuration: number;
  averageRating: number;
  goals: Goal[];
}

interface Goal {
  id: string;
  name: string;
  target: number;
  current: number;
  unit: string;
  deadline: string;
  completed: boolean;
}

interface WorkoutContextType {
  // Current session
  currentSession: WorkoutSession | null;
  startWorkout: (workoutName: string, exercises: any[]) => void;
  completeExercise: (exerciseName: string, actualSets: number, actualReps: string, actualWeight?: string) => void;
  completeWorkout: (duration: number, notes: string) => void;
  
  // History
  workoutHistory: WorkoutSession[];
  getWorkoutHistory: () => WorkoutSession[];
  
  // Progress
  progress: WorkoutProgress;
  updateProgress: () => void;
  
  // Goals
  goals: Goal[];
  addGoal: (goal: Omit<Goal, 'id'>) => void;
  updateGoal: (id: string, current: number) => void;
  deleteGoal: (id: string) => void;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const useWorkout = () => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error('useWorkout must be used within a WorkoutProvider');
  }
  return context;
};

interface WorkoutProviderProps {
  children: ReactNode;
}

export const WorkoutProvider: React.FC<WorkoutProviderProps> = ({ children }) => {
  const [currentSession, setCurrentSession] = useState<WorkoutSession | null>(null);
  const [workoutHistory, setWorkoutHistory] = useState<WorkoutSession[]>([]);
  const [progress, setProgress] = useState<WorkoutProgress>({
    totalWorkouts: 0,
    currentStreak: 0,
    longestStreak: 0,
    totalDuration: 0,
    averageRating: 0,
    goals: []
  });
  const [goals, setGoals] = useState<Goal[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('workoutHistory');
    const savedProgress = localStorage.getItem('workoutProgress');
    const savedGoals = localStorage.getItem('workoutGoals');

    if (savedHistory) {
      setWorkoutHistory(JSON.parse(savedHistory));
    }
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    }
  }, []);

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('workoutHistory', JSON.stringify(workoutHistory));
  }, [workoutHistory]);

  useEffect(() => {
    localStorage.setItem('workoutProgress', JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    localStorage.setItem('workoutGoals', JSON.stringify(goals));
  }, [goals]);

  const startWorkout = (workoutName: string, exercises: any[]) => {
    const session: WorkoutSession = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      workoutName,
      exercises: exercises.map(exercise => ({
        name: exercise.name,
        sets: exercise.sets,
        reps: exercise.reps,
        weight: exercise.weight,
        completed: false,
        actualSets: 0,
        actualReps: '',
        actualWeight: '',
        notes: ''
      })),
      completed: false,
      duration: 0,
      notes: ''
    };
    setCurrentSession(session);
  };

  const completeExercise = (exerciseName: string, actualSets: number, actualReps: string, actualWeight?: string) => {
    if (!currentSession) return;

    setCurrentSession(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        exercises: prev.exercises.map(exercise =>
          exercise.name === exerciseName
            ? {
                ...exercise,
                completed: true,
                actualSets,
                actualReps,
                actualWeight
              }
            : exercise
        )
      };
    });
  };

  const completeWorkout = (duration: number, notes: string) => {
    if (!currentSession) return;

    const completedSession: WorkoutSession = {
      ...currentSession,
      completed: true,
      duration,
      notes
    };

    setWorkoutHistory(prev => [completedSession, ...prev]);
    setCurrentSession(null);
    updateProgress();
  };

  const getWorkoutHistory = () => {
    return workoutHistory.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const updateProgress = () => {
    const history = getWorkoutHistory();
    const completedWorkouts = history.filter(w => w.completed);
    
    // Calculate streaks
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;
    
    const today = new Date();
    const oneDay = 24 * 60 * 60 * 1000;
    
    for (let i = 0; i < completedWorkouts.length; i++) {
      const workoutDate = new Date(completedWorkouts[i].date);
      const daysDiff = Math.floor((today.getTime() - workoutDate.getTime()) / oneDay);
      
      if (daysDiff <= 1) {
        tempStreak++;
        if (i === 0) currentStreak = tempStreak;
      } else {
        longestStreak = Math.max(longestStreak, tempStreak);
        tempStreak = 0;
      }
    }
    longestStreak = Math.max(longestStreak, tempStreak);

    const totalDuration = completedWorkouts.reduce((sum, w) => sum + w.duration, 0);
    const averageRating = completedWorkouts.length > 0 ? 4.2 : 0; // Placeholder rating

    setProgress({
      totalWorkouts: completedWorkouts.length,
      currentStreak,
      longestStreak,
      totalDuration,
      averageRating,
      goals
    });
  };

  const addGoal = (goalData: Omit<Goal, 'id'>) => {
    const newGoal: Goal = {
      ...goalData,
      id: Date.now().toString()
    };
    setGoals(prev => [...prev, newGoal]);
  };

  const updateGoal = (id: string, current: number) => {
    setGoals(prev => prev.map(goal =>
      goal.id === id
        ? { ...goal, current, completed: current >= goal.target }
        : goal
    ));
  };

  const deleteGoal = (id: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== id));
  };

  const value: WorkoutContextType = {
    currentSession,
    startWorkout,
    completeExercise,
    completeWorkout,
    workoutHistory,
    getWorkoutHistory,
    progress,
    updateProgress,
    goals,
    addGoal,
    updateGoal,
    deleteGoal
  };

  return (
    <WorkoutContext.Provider value={value}>
      {children}
    </WorkoutContext.Provider>
  );
}; 