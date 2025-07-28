'use client'
// importing shadcn component needed for the dashboard
import React, {useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress";
import { Calendar, CheckCircle, Heart, Moon, Sun, RefreshCw, Clock, Target, Smile } from "lucide-react";

//Mock data for the dashboard

const mockSchedule = [
  {
    id: 1,
    time: '9:00am',
    task: 'Morning meditation',
    completed: true
  },
  {
    id: 2,
    time: '10:30am',
    task: 'Team Standup Meeting',
    completed: true
  },
  {
    id: 3,
    time: '2:00pm',
    task: 'Focus Work Session',
    completed: false
  },
  {
    id: 4,
    time: '4:00pm',
    task: 'Exercise Break',
    completed: false
  },
  {
    id: 5,
    time: '6:00pm',
    task: 'Evening Reflection',
    completed: false
  }
];

//Motivational quotes Array
const motivationalQuotes = [
  "Progress, not perfection, is the goal.",
  "Small steps daily lead to big changes yearly.",
  "Your mental health is a priority, not a luxury.",
  "Balance is not something you find, it's something you create.",
  "Today's accomplishments were yesterday's impossibilities."
];

//Mood Options
const moodOptions = [
  { emoji: '😊', label: 'Great', value: 5 },
  { emoji: '🙂', label: 'Good', value: 4 },
  { emoji: '😐', label: 'Okay', value: 3 },
  { emoji: '😔', label: 'Low', value: 2 },
  { emoji: '😞', label: 'Struggling', value: 1 }
]

//Individual component for daily schedule
interface ScheduleItem{
  id: number; time: string; task: string; completed: boolean;
}

interface ScheduleCardProps {
  scheduleData: ScheduleItem[];
  onToggleTask?: (taskId: number) => void;
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({
  scheduleData,
  onToggleTask
}) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Daily Schedule
        </CardTitle>
        <CardDescription>
          Your tasks for today
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {scheduleData.map((item) => (
            <div key={item.id} className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${item.completed
              ? 'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800'
              : 'bg-gray-50 border-gray-200 dark:bg-gray-900 dark:border-gray-700'}`}
              role="listitem"
              aria-label={`Task: ${item.task} at ${item.time}, ${item.completed ? 'completed' : 'prending'}`}
            >
              <div className=" flex items-center gap-3">
                <button
                  onClick={() => onToggleTask?.(item.id)}
                  className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                  aria-label={`Mark ${item.task} as ${item.completed ? 'incomplete' : 'complete'}`}>
                  
                  <CheckCircle
                    className={`h-5 w-5 ${item.completed
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-gray-400'}`}
                  />
                </button>
                <div>
                  <p className={`font-medium ${item.completed ? 'line-through text-gray-500'
                    : 'text-gray-900 dark:text-gray-100'
                    }`}>
                    {item.task}
                  </p>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {item.time}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

//Task Progress Component
interface TaskProgressProps {
  completedTasks: number;
  totalTasks: number;
}

const TaskProgressCard: React.FC<TaskProgressProps> = ({
  completedTasks,
  totalTasks
}) => {
  const progressPercentage = (completedTasks / totalTasks) * 100;

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          Task Progress
        </CardTitle>
        <CardDescription>
          Todays Completion Rate
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {Math.round(progressPercentage)}%
            </div>
            <p className="text-sm text-gray-500">
              {completedTasks} of {totalTasks} tasks completed
            </p>
          </div>
          <Progress
            value={progressPercentage}
            className="h-full"
            aria-label={`Task completion progress: ${Math.round(progressPercentage)}%`}
          />
          <div className="text-xs text-gray-500 text-center">
            {totalTasks - completedTasks} tasks remaining
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

//Motivational Quote Component
interface MotivationalQuoteProps{
  quotes: string[];
}

const MotivationalQuoteCard: React.FC<MotivationalQuoteProps> = ({ quotes }) => {
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);

  const refreshQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomIndex]);
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5" />
            Daily Motivation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Alert>
          <AlertDescription className="text-lg italic mb-4">
            `{currentQuote}`
          </AlertDescription>
        </Alert>
        <Button
          onClick={refreshQuote}
          variant="outline"
          size="sm"
          className="w-full"
          aria-label="Get new Motivational quote"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          New Quote
        </Button>
      </CardContent>
    </Card>
  );
};

//Mental Health Check-in Component
interface MentalHealthProps {
  moodOptions: Array<{
    emoji: string;
    label: string;
    value: number;
  }>;
}

const MentalHealthCard: React.FC<MentalHealthProps> = ({ moodOptions }) => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Smile className="h-5 w-5" />
          Mental Health Check-in
        </CardTitle>
        <CardDescription>
          How are you feeling today?
        </CardDescription>
        <CardContent>
          <div className="space-y-5">
            <div className="grid grid-cols gap-2">
              {moodOptions.map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => setSelectedMood(mood.value)}
                  className={`p-3 rounded-lg border-2 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${selectedMood === mood.value
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                    : 'border-gray-200 hover:border-gray-300 dark:border-gray-700'
                    }`}
                  aria-label={`Select mood: ${mood.label}`}
                >
                  <div className="text-2xl mb-1">{mood.emoji}</div>
                  <div className="text-xs font-medium">{mood.label}</div>
                </button>
              ))}
            </div>
            {selectedMood && (
              <Alert>
                <AlertDescription>
                  Thanks for checking in! Remember to take care of yourself today.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  );
};

//Theme Toggle Component
const ThemeToggle: React.FC<{ isDark: boolean; onToggle: () => void }> = ({
  isDark,
  onToggle
}) => {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onToggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
};

//Main Dashboard Component
const HarmoniqDashboard: React.FC = () => {
  const [schedule, setSchedule] = useState(mockSchedule);
  const [isDarkMode, setIsDarkMode] = useState(false);

  //Toggle task completion
  const handleToggleTask = (taskId: number) => {
    setSchedule(prev =>
      prev.map(task =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  //Calculate completed tasks
  const completedTasks = schedule.filter(task => task.completed).length;

  //Theme toggle handler
  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  //Apply theme to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  return (
    <div className={`min-h-screen transition-colors ${isDarkMode
      ? 'dark bg-gray-900 text-white'
      : 'bg-gray-50 text-gray-900'
      }`}>
      {/* Header */}
      <header className="border-b bg-white dark:bg-gray-800 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div>
            <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              HARMONIQ
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Your personal wellness Dashboard
            </p>
          </div>
          <ThemeToggle isDark={isDarkMode} onToggle={toggleTheme} />
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Daily Schedule - Takes full width on Mobile, half on large screens */}
          <div className="lg:col-span-1 xl:col-span-1">
            <ScheduleCard
              scheduleData={schedule}
              onToggleTask={handleToggleTask}
            />
          </div>

          {/* Task Progress */}
          <div className="lg:col-span-1 xl:col-span-1">
            <TaskProgressCard
              completedTasks={completedTasks}
              totalTasks={schedule.length}
            />

          </div>

          {/* Motivational Quote */}
          <div className="lg:col-span-1 xl:col-span-1">
            <MotivationalQuoteCard quotes={motivationalQuotes} />
          </div>

          {/* Mental Health Check-in - Spans 2 columns on large screens */}
          <div className="lg:col-span-2 xl:col-span-3">
            <MentalHealthCard moodOptions={moodOptions} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default HarmoniqDashboard;