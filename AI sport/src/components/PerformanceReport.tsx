import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Share2, 
  Download, 
  TrendingUp, 
  TrendingDown,
  Target,
  Zap,
  Award,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Calendar
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useLanguage } from './LanguageProvider';
import type { Screen } from '../App';

interface PerformanceReportProps {
  onBack: () => void;
  onNavigate: (screen: Screen) => void;
}

export function PerformanceReport({ onBack, onNavigate }: PerformanceReportProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const { t } = useLanguage();

  const performanceData = {
    overallScore: 87,
    previousScore: 75,
    improvement: 12,
    assessmentDate: new Date().toLocaleDateString(),
    duration: '45 seconds',
    exercise: 'Sprint Form Analysis',
    
    metrics: [
      { 
        name: 'Running Form', 
        score: 92, 
        change: +8, 
        status: 'excellent',
        details: 'Excellent posture and arm positioning'
      },
      { 
        name: 'Speed Consistency', 
        score: 78, 
        change: +15, 
        status: 'good',
        details: 'Good pace maintenance with room for improvement'
      },
      { 
        name: 'Foot Strike', 
        score: 85, 
        change: +3, 
        status: 'good',
        details: 'Proper midfoot landing technique'
      },
      { 
        name: 'Body Alignment', 
        score: 94, 
        change: +2, 
        status: 'excellent',
        details: 'Outstanding spine and hip alignment'
      }
    ],

    suggestions: [
      {
        type: 'improvement',
        title: 'Increase Cadence',
        description: 'Aim for 180+ steps per minute to improve efficiency',
        priority: 'high'
      },
      {
        type: 'strength',
        title: 'Maintain Form',
        description: 'Your running posture is excellent - keep it up!',
        priority: 'low'
      },
      {
        type: 'improvement',
        title: 'Core Stability',
        description: 'Add core strengthening exercises to your routine',
        priority: 'medium'
      }
    ],

    weeklyProgress: [
      { day: 'Mon', score: 72 },
      { day: 'Tue', score: 75 },
      { day: 'Wed', score: 78 },
      { day: 'Thu', score: 82 },
      { day: 'Fri', score: 85 },
      { day: 'Sat', score: 87 },
      { day: 'Sun', score: 87 }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'needs-work': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Overall Score Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg text-blue-100 mb-2">{t('report.score')}</h3>
                <div className="flex items-end gap-4">
                  <span className="text-5xl">{performanceData.overallScore}</span>
                  <div className="flex items-center gap-1 text-green-200 mb-2">
                    <TrendingUp className="w-5 h-5" />
                    <span className="text-lg">+{performanceData.improvement}%</span>
                  </div>
                </div>
                <p className="text-blue-100 text-sm">vs. previous assessment: {performanceData.previousScore}</p>
              </div>
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <Award className="w-10 h-10" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Assessment Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500 mb-1">Exercise</div>
                <div>{performanceData.exercise}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Duration</div>
                <div>{performanceData.duration}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Date</div>
                <div>{performanceData.assessmentDate}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Status</div>
                <Badge className="bg-green-100 text-green-700">Complete</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Metrics Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              Performance Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {performanceData.metrics.map((metric, index) => (
              <motion.div
                key={metric.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm">{metric.name}</span>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(metric.status)}>
                      {metric.status}
                    </Badge>
                    <span className={`text-sm ${metric.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {metric.change >= 0 ? '+' : ''}{metric.change}%
                    </span>
                    <span className="text-lg w-10 text-right">{metric.score}</span>
                  </div>
                </div>
                <Progress value={metric.score} className="h-2" />
                <p className="text-xs text-gray-500">{metric.details}</p>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );

  const renderFeedback = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-orange-600" />
            {t('report.feedback')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {performanceData.suggestions.map((suggestion, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-xl border-2 ${getPriorityColor(suggestion.priority)}`}
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-current/20 flex items-center justify-center flex-shrink-0 mt-1">
                  {suggestion.type === 'improvement' ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <CheckCircle className="w-4 h-4" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4>{suggestion.title}</h4>
                    <Badge variant="outline" className="text-xs capitalize">
                      {suggestion.priority}
                    </Badge>
                  </div>
                  <p className="text-sm opacity-90">{suggestion.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>

      {/* Action Items */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            Recommended Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            'Practice running drills 3x per week',
            'Focus on increasing step frequency',
            'Add core strengthening exercises',
            'Schedule next assessment in 1 week'
          ].map((action, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span className="text-sm">{action}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );

  const renderProgress = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-green-600" />
            Weekly Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Simple progress chart */}
            <div className="flex items-end justify-between h-32 bg-gray-50 rounded-lg p-4">
              {performanceData.weeklyProgress.map((day, index) => (
                <div key={day.day} className="flex flex-col items-center gap-2">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(day.score / 100) * 80}px` }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="bg-gradient-to-t from-blue-500 to-purple-600 rounded-t min-h-2"
                  />
                  <span className="text-xs text-gray-600">{day.day}</span>
                </div>
              ))}
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t">
              <div className="text-center">
                <div className="text-2xl text-green-600 mb-1">+12%</div>
                <div className="text-xs text-gray-600">This Week</div>
              </div>
              <div className="text-center">
                <div className="text-2xl text-blue-600 mb-1">87</div>
                <div className="text-xs text-gray-600">Best Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl text-purple-600 mb-1">5</div>
                <div className="text-xs text-gray-600">Streak</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
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
          
          <h1 className="text-lg">Performance Report</h1>
          
          <div className="flex gap-2">
            <Button variant="ghost" size="sm">
              <Share2 className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            {renderOverview()}
          </TabsContent>

          <TabsContent value="feedback">
            {renderFeedback()}
          </TabsContent>

          <TabsContent value="progress">
            {renderProgress()}
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 space-y-3"
        >
          <Button
            onClick={() => onNavigate('camera')}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-4 rounded-xl"
          >
            <Target className="w-5 h-5 mr-2" />
            Start New Assessment
          </Button>
          
          <Button
            onClick={() => onNavigate('progress')}
            variant="outline"
            className="w-full py-4 rounded-xl border-2 border-blue-200 text-blue-600 hover:bg-blue-50"
          >
            <Calendar className="w-5 h-5 mr-2" />
            View Full Progress
          </Button>
        </motion.div>
      </div>
    </div>
  );
}