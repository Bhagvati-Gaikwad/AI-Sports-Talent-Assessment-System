import React from 'react';
import { motion } from 'motion/react';
import { 
  Camera, 
  TrendingUp, 
  Trophy, 
  Target, 
  Calendar,
  Clock,
  Star,
  Users,
  Play,
  BarChart3
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { useLanguage, LanguageToggle } from './LanguageProvider';
import type { Screen, UserRole } from '../App';

interface HomeDashboardProps {
  onNavigate: (screen: Screen) => void;
  userRole: UserRole;
  onBack?: () => void;
}

export function HomeDashboard({ onNavigate, userRole, onBack }: HomeDashboardProps) {
  const { t } = useLanguage();

  const todaysTasks = [
    {
      id: 1,
      title: 'Sprint Analysis',
      description: '100m sprint technique assessment',
      duration: '5 min',
      difficulty: 'Medium',
      completed: false,
      icon: <Target className="w-5 h-5" />
    },
    {
      id: 2,
      title: 'Jump Form Check',
      description: 'Long jump takeoff analysis',
      duration: '3 min',
      difficulty: 'Easy',
      completed: true,
      icon: <TrendingUp className="w-5 h-5" />
    }
  ];

  const recentScores = [
    { skill: 'Sprint Form', score: 85, change: +5 },
    { skill: 'Jump Technique', score: 78, change: +2 },
    { skill: 'Posture', score: 92, change: -1 }
  ];

  const motivationalMessage = {
    athlete: "You're 15% faster than last month! 🚀",
    coach: "Your athletes showed 23% improvement this week! 📈",
    assessor: "You've completed 47 assessments this month! 💪"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl">Good morning! 👋</h1>
            <p className="text-gray-600">Ready for today's training?</p>
          </div>
          <LanguageToggle />
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Motivational Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-lg">{motivationalMessage[userRole]}</p>
                  <p className="text-blue-100 text-sm">Keep pushing your limits</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Navigation - Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="mb-4">Main Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Start Assessment */}
            <Button
              onClick={() => onNavigate('camera')}
              className="h-24 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-0 rounded-2xl flex flex-col items-center justify-center gap-2 shadow-lg"
            >
              <Camera className="w-8 h-8" />
              <span className="text-lg">Start Assessment</span>
              <span className="text-sm text-green-100">AI-powered analysis</span>
            </Button>
            
            {/* View Progress */}
            <Button
              onClick={() => onNavigate('progress')}
              className="h-24 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0 rounded-2xl flex flex-col items-center justify-center gap-2 shadow-lg"
            >
              <BarChart3 className="w-8 h-8" />
              <span className="text-lg">View Progress</span>
              <span className="text-sm text-blue-100">Track your improvement</span>
            </Button>

            {/* Leaderboard */}
            <Button
              onClick={() => onNavigate('leaderboard')}
              className="h-24 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0 rounded-2xl flex flex-col items-center justify-center gap-2 shadow-lg"
            >
              <Trophy className="w-8 h-8" />
              <span className="text-lg">Leaderboard</span>
              <span className="text-sm text-orange-100">See your rankings</span>
            </Button>
            
            {/* Coach Panel (for coaches) or Performance Report */}
            {userRole === 'coach' ? (
              <Button
                onClick={() => onNavigate('coach')}
                className="h-24 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white border-0 rounded-2xl flex flex-col items-center justify-center gap-2 shadow-lg"
              >
                <Users className="w-8 h-8" />
                <span className="text-lg">Coach Panel</span>
                <span className="text-sm text-purple-100">Manage athletes</span>
              </Button>
            ) : (
              <Button
                onClick={() => onNavigate('report')}
                className="h-24 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white border-0 rounded-2xl flex flex-col items-center justify-center gap-2 shadow-lg"
              >
                <TrendingUp className="w-8 h-8" />
                <span className="text-lg">Latest Report</span>
                <span className="text-sm text-indigo-100">View detailed analysis</span>
              </Button>
            )}
          </div>
        </motion.div>

        {/* Today's Tasks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                {t('home.today')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {todaysTasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    task.completed 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-white border-gray-200 hover:border-blue-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        task.completed ? 'bg-green-500 text-white' : 'bg-blue-100 text-blue-600'
                      }`}>
                        {task.completed ? <Star className="w-5 h-5" /> : task.icon}
                      </div>
                      <div>
                        <h4 className={task.completed ? 'line-through text-gray-500' : ''}>{task.title}</h4>
                        <p className="text-sm text-gray-600">{task.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            <Clock className="w-3 h-3 mr-1" />
                            {task.duration}
                          </Badge>
                          <Badge variant={task.difficulty === 'Easy' ? 'default' : 'secondary'} className="text-xs">
                            {task.difficulty}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    {!task.completed && (
                      <Button
                        size="sm"
                        onClick={() => onNavigate('camera')}
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                      >
                        <Play className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-orange-600" />
                Recent Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentScores.map((item, index) => (
                <motion.div
                  key={item.skill}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">{item.skill}</span>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm ${item.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {item.change >= 0 ? '+' : ''}{item.change}%
                        </span>
                        <span className="text-lg">{item.score}</span>
                      </div>
                    </div>
                    <Progress value={item.score} className="h-2" />
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={() => onNavigate('camera')}
              variant="outline"
              className="h-14 border-2 border-green-200 hover:bg-green-50 rounded-xl flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5 text-green-600" />
              <span className="text-green-600">Quick Test</span>
            </Button>
            
            <Button
              onClick={() => onNavigate('progress')}
              variant="outline"
              className="h-14 border-2 border-blue-200 hover:bg-blue-50 rounded-xl flex items-center justify-center gap-2"
            >
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <span className="text-blue-600">Analytics</span>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}