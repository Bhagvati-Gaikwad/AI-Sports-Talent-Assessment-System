import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Calendar, 
  TrendingUp, 
  Award,
  Target,
  Zap,
  Trophy,
  Star,
  Filter,
  Download
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface ProgressTrackerProps {
  onBack: () => void;
}

export function ProgressTracker({ onBack }: ProgressTrackerProps) {
  const [timeRange, setTimeRange] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('overall');

  const progressData = {
    currentStreak: 12,
    totalAssessments: 47,
    averageScore: 84,
    bestScore: 94,
    improvement: 23,
    
    weeklyData: [
      { week: 'Week 1', score: 72, assessments: 3 },
      { week: 'Week 2', score: 76, assessments: 4 },
      { week: 'Week 3', score: 81, assessments: 3 },
      { week: 'Week 4', score: 84, assessments: 5 }
    ],

    skillProgress: [
      { skill: 'Running Form', current: 92, previous: 78, trend: 'up' },
      { skill: 'Speed Control', current: 85, previous: 72, trend: 'up' },
      { skill: 'Endurance', current: 79, previous: 81, trend: 'down' },
      { skill: 'Technique', current: 88, previous: 85, trend: 'up' }
    ],

    achievements: [
      {
        id: 1,
        title: 'Speed Demon',
        description: 'Achieved 90+ speed score 5 times',
        icon: '⚡',
        date: '2 days ago',
        rarity: 'rare'
      },
      {
        id: 2,
        title: 'Consistency King',
        description: '10-day assessment streak',
        icon: '👑',
        date: '1 week ago',
        rarity: 'epic'
      },
      {
        id: 3,
        title: 'Form Master',
        description: 'Perfect form score achieved',
        icon: '🎯',
        date: '2 weeks ago',
        rarity: 'legendary'
      }
    ],

    personalBests: [
      { metric: 'Overall Score', value: 94, date: '3 days ago', improvement: '+8' },
      { metric: 'Running Form', value: 96, date: '1 week ago', improvement: '+12' },
      { metric: 'Speed Consistency', value: 89, date: '5 days ago', improvement: '+6' },
      { metric: 'Endurance Rating', value: 82, date: '1 week ago', improvement: '+4' }
    ]
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'rare': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'epic': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'legendary': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Current Streak</p>
                  <p className="text-2xl">{progressData.currentStreak}</p>
                  <p className="text-blue-100 text-xs">days</p>
                </div>
                <Zap className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Average Score</p>
                  <p className="text-2xl">{progressData.averageScore}</p>
                  <p className="text-green-100 text-xs">+{progressData.improvement}% this month</p>
                </div>
                <Target className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Best Score</p>
                  <p className="text-2xl">{progressData.bestScore}</p>
                  <p className="text-purple-100 text-xs">personal record</p>
                </div>
                <Trophy className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Total Tests</p>
                  <p className="text-2xl">{progressData.totalAssessments}</p>
                  <p className="text-orange-100 text-xs">assessments</p>
                </div>
                <Award className="w-8 h-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Weekly Progress Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Weekly Progress
              </div>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Week</SelectItem>
                  <SelectItem value="month">Month</SelectItem>
                  <SelectItem value="quarter">Quarter</SelectItem>
                </SelectContent>
              </Select>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Progress Chart */}
              <div className="flex items-end justify-between h-40 bg-gray-50 rounded-lg p-4">
                {progressData.weeklyData.map((week, index) => (
                  <div key={week.week} className="flex flex-col items-center gap-2">
                    <div className="text-xs text-center mb-1">
                      <div>{week.score}</div>
                      <div className="text-gray-500">({week.assessments})</div>
                    </div>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(week.score / 100) * 100}px` }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="bg-gradient-to-t from-blue-500 to-purple-600 rounded-t min-h-4 w-8"
                    />
                    <span className="text-xs text-gray-600">{week.week.split(' ')[1]}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Skill Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-600" />
              Skill Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {progressData.skillProgress.map((skill, index) => (
              <motion.div
                key={skill.skill}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm">{skill.skill}</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm ${skill.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {skill.trend === 'up' ? '+' : '-'}{Math.abs(skill.current - skill.previous)}
                    </span>
                    <TrendingUp className={`w-4 h-4 ${skill.trend === 'up' ? 'text-green-600' : 'text-red-600 rotate-180'}`} />
                    <span className="text-lg w-8 text-right">{skill.current}</span>
                  </div>
                </div>
                <Progress value={skill.current} className="h-2" />
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );

  const renderAchievements = () => (
    <div className="space-y-6">
      <div className="grid gap-4">
        {progressData.achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`border-2 ${getRarityColor(achievement.rarity)}`}>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4>{achievement.title}</h4>
                      <Badge className={getRarityColor(achievement.rarity)} variant="outline">
                        {achievement.rarity}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                    <p className="text-xs text-gray-500">{achievement.date}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Achievement Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Next Achievements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Marathon Master</span>
                <span>7/10 long runs</span>
              </div>
              <Progress value={70} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Perfect Week</span>
                <span>5/7 daily goals</span>
              </div>
              <Progress value={71} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Improvement Guru</span>
                <span>15/20 improved scores</span>
              </div>
              <Progress value={75} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPersonalBests = () => (
    <div className="space-y-4">
      {progressData.personalBests.map((record, index) => (
        <motion.div
          key={record.metric}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm text-gray-600">{record.metric}</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{record.value}</span>
                    <Badge className="bg-green-100 text-green-700">
                      {record.improvement}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500">{record.date}</p>
                </div>
                <Trophy className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-4 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          
          <h1 className="text-lg">Progress Tracker</h1>
          
          <div className="flex gap-2">
            <Button variant="ghost" size="sm">
              <Filter className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="records">Records</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            {renderOverview()}
          </TabsContent>

          <TabsContent value="achievements">
            {renderAchievements()}
          </TabsContent>

          <TabsContent value="records">
            {renderPersonalBests()}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}