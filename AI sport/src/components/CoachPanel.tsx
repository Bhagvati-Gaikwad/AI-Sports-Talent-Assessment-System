import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  MessageSquare, 
  Star, 
  Clock, 
  TrendingUp,
  Search,
  Filter,
  Send,
  Eye,
  Award,
  Calendar,
  Bell,
  UserPlus,
  ArrowLeft
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Progress } from './ui/progress';
import type { Screen } from '../App';

interface CoachPanelProps {
  onNavigate: (screen: Screen) => void;
  onBack?: () => void;
}

export function CoachPanel({ onNavigate, onBack }: CoachPanelProps) {
  const [selectedAthlete, setSelectedAthlete] = useState<number | null>(null);
  const [feedbackText, setFeedbackText] = useState('');

  const athletes = [
    {
      id: 1,
      name: 'Priya Sharma',
      age: 22,
      sport: 'Sprint',
      location: 'Mumbai, Maharashtra',
      lastAssessment: '2 hours ago',
      overallScore: 87,
      improvement: 12,
      assessments: 15,
      status: 'active',
      avatar: 'PS',
      recentScores: [82, 85, 87],
      pendingFeedback: true
    },
    {
      id: 2,
      name: 'Arjun Patel',
      age: 19,
      sport: 'Long Jump',
      location: 'Ahmedabad, Gujarat',
      lastAssessment: '1 day ago',
      overallScore: 91,
      improvement: 8,
      assessments: 23,
      status: 'active',
      avatar: 'AP',
      recentScores: [88, 90, 91],
      pendingFeedback: false
    },
    {
      id: 3,
      name: 'Ravi Kumar',
      age: 25,
      sport: 'High Jump',
      location: 'Chennai, Tamil Nadu',
      lastAssessment: '3 days ago',
      overallScore: 79,
      improvement: -2,
      assessments: 8,
      status: 'needs-attention',
      avatar: 'RK',
      recentScores: [81, 80, 79],
      pendingFeedback: true
    }
  ];

  const submissions = [
    {
      id: 1,
      athleteId: 1,
      athleteName: 'Priya Sharma',
      exercise: 'Sprint Form Analysis',
      score: 87,
      submittedAt: '2 hours ago',
      duration: '45s',
      status: 'pending-review'
    },
    {
      id: 2,
      athleteId: 3,
      athleteName: 'Ravi Kumar',
      exercise: 'Jump Technique',
      score: 79,
      submittedAt: '1 day ago',
      duration: '30s',
      status: 'pending-review'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'needs-attention': return 'bg-yellow-100 text-yellow-700';
      case 'inactive': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleSendFeedback = (athleteId: number) => {
    // Simulate sending feedback
    setFeedbackText('');
    setSelectedAthlete(null);
  };

  const renderAthletesList = () => (
    <div className="space-y-4">
      {/* Search and Filter */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input placeholder="Search athletes..." className="pl-10" />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="w-4 h-4" />
        </Button>
      </div>

      {/* Athletes Grid */}
      <div className="space-y-4">
        {athletes.map((athlete, index) => (
          <motion.div
            key={athlete.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      {athlete.avatar}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="truncate">{athlete.name}</h4>
                      <Badge className={getStatusColor(athlete.status)} variant="outline">
                        {athlete.status.replace('-', ' ')}
                      </Badge>
                      {athlete.pendingFeedback && (
                        <Bell className="w-4 h-4 text-orange-500" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {athlete.age} • {athlete.sport} • {athlete.location}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {athlete.lastAssessment}
                      </span>
                      <span>{athlete.assessments} assessments</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                      <span className="text-xl">{athlete.overallScore}</span>
                      <span className={`text-sm ${athlete.improvement >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {athlete.improvement >= 0 ? '+' : ''}{athlete.improvement}%
                      </span>
                    </div>
                    
                    {/* Mini progress chart */}
                    <div className="flex gap-1 justify-end">
                      {athlete.recentScores.map((score, i) => (
                        <div
                          key={i}
                          className="w-2 bg-gray-200 rounded"
                          style={{ height: `${(score / 100) * 20}px` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-4">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Eye className="w-4 h-4 mr-1" />
                    View Details
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setSelectedAthlete(athlete.id)}
                  >
                    <MessageSquare className="w-4 h-4 mr-1" />
                    Feedback
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Add Athlete Button */}
      <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 rounded-xl">
        <UserPlus className="w-5 h-5 mr-2" />
        Add New Athlete
      </Button>
    </div>
  );

  const renderSubmissions = () => (
    <div className="space-y-4">
      {submissions.map((submission, index) => (
        <motion.div
          key={submission.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4>{submission.athleteName}</h4>
                  <p className="text-sm text-gray-600">{submission.exercise}</p>
                </div>
                <Badge className="bg-orange-100 text-orange-700">
                  Pending Review
                </Badge>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-2xl text-blue-600">{submission.score}</div>
                    <div className="text-xs text-gray-500">AI Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg">{submission.duration}</div>
                    <div className="text-xs text-gray-500">Duration</div>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {submission.submittedAt}
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                  <Eye className="w-4 h-4 mr-1" />
                  Review Video
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => setSelectedAthlete(submission.athleteId)}
                >
                  <Star className="w-4 h-4 mr-1" />
                  Rate
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Active Athletes</p>
                <p className="text-2xl">{athletes.filter(a => a.status === 'active').length}</p>
              </div>
              <Users className="w-8 h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Avg Improvement</p>
                <p className="text-2xl">+18%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-600" />
            Team Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Overall Team Score</span>
                <span>85/100</span>
              </div>
              <Progress value={85} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Athletes Meeting Goals</span>
                <span>67%</span>
              </div>
              <Progress value={67} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Weekly Activity Rate</span>
                <span>89%</span>
              </div>
              <Progress value={89} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-600" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { athlete: 'Priya Sharma', action: 'completed sprint assessment', time: '2h ago' },
              { athlete: 'Arjun Patel', action: 'achieved personal best', time: '1d ago' },
              { athlete: 'Ravi Kumar', action: 'requested feedback', time: '2d ago' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-3 pb-3 border-b border-gray-100 last:border-0">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <span className="text-sm">
                    <span>{activity.athlete}</span> {activity.action}
                  </span>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              {onBack && (
                <Button
                  variant="ghost"
                  onClick={onBack}
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
              )}
              <h1 className="text-2xl">Coach Dashboard</h1>
            </div>
            <Button
              onClick={() => onNavigate('home')}
              variant="outline"
              size="sm"
            >
              Athlete View
            </Button>
          </div>
          <p className="text-gray-600">Manage and track your athletes' progress</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <Tabs defaultValue="athletes">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="athletes">Athletes</TabsTrigger>
            <TabsTrigger value="submissions">
              Submissions
              {submissions.length > 0 && (
                <Badge className="ml-2 bg-orange-500 text-white text-xs">
                  {submissions.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="athletes">
            {renderAthletesList()}
          </TabsContent>

          <TabsContent value="submissions">
            {renderSubmissions()}
          </TabsContent>

          <TabsContent value="analytics">
            {renderAnalytics()}
          </TabsContent>
        </Tabs>
      </div>

      {/* Feedback Modal */}
      {selectedAthlete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 w-full max-w-md"
          >
            <h3 className="text-lg mb-4">Send Feedback</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2">
                  To: {athletes.find(a => a.id === selectedAthlete)?.name}
                </label>
                <Textarea
                  placeholder="Enter your feedback..."
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  className="min-h-24"
                />
              </div>
              
              <div className="flex gap-2">
                <Button
                  onClick={() => handleSendFeedback(selectedAthlete)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Feedback
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setSelectedAthlete(null)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}