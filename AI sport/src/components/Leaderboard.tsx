import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Trophy, 
  Medal, 
  Crown,
  Filter,
  MapPin,
  Calendar,
  Star,
  TrendingUp,
  Users
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface LeaderboardProps {
  onBack: () => void;
}

export function Leaderboard({ onBack }: LeaderboardProps) {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedSport, setSelectedSport] = useState('all');
  const [selectedAge, setSelectedAge] = useState('all');

  const leaderboardData = [
    {
      id: 1,
      rank: 1,
      name: 'Arjun Patel',
      location: 'Ahmedabad, Gujarat',
      sport: 'Long Jump',
      score: 94,
      improvement: 18,
      assessments: 23,
      avatar: 'AP',
      isCurrentUser: false,
      badges: ['🏆', '🔥', '⭐']
    },
    {
      id: 2,
      rank: 2,
      name: 'Priya Sharma',
      location: 'Mumbai, Maharashtra',
      sport: 'Sprint',
      score: 91,
      improvement: 15,
      assessments: 18,
      avatar: 'PS',
      isCurrentUser: false,
      badges: ['🥈', '💪']
    },
    {
      id: 3,
      rank: 3,
      name: 'Rahul Singh',
      location: 'Delhi, Delhi',
      sport: 'High Jump',
      score: 89,
      improvement: 12,
      assessments: 20,
      avatar: 'RS',
      isCurrentUser: false,
      badges: ['🥉', '📈']
    },
    {
      id: 4,
      rank: 4,
      name: 'Sneha Reddy',
      location: 'Hyderabad, Telangana',
      sport: 'Sprint',
      score: 87,
      improvement: 22,
      assessments: 15,
      avatar: 'SR',
      isCurrentUser: true,
      badges: ['🚀', '⚡']
    },
    {
      id: 5,
      rank: 5,
      name: 'Vikram Kumar',
      location: 'Bangalore, Karnataka',
      sport: 'Long Jump',
      score: 85,
      improvement: 8,
      assessments: 12,
      avatar: 'VK',
      isCurrentUser: false,
      badges: ['💯']
    }
  ];

  const weeklyLeaders = [
    { name: 'Anita Das', improvement: '+25%', sport: 'Sprint' },
    { name: 'Rohit Mehta', improvement: '+22%', sport: 'High Jump' },
    { name: 'Kavya Nair', improvement: '+20%', sport: 'Long Jump' }
  ];

  const regionalStats = [
    { region: 'Maharashtra', athletes: 1247, avgScore: 82 },
    { region: 'Gujarat', athletes: 986, avgScore: 84 },
    { region: 'Karnataka', athletes: 923, avgScore: 81 },
    { region: 'Tamil Nadu', athletes: 876, avgScore: 83 }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2: return <Medal className="w-6 h-6 text-gray-400" />;
      case 3: return <Medal className="w-6 h-6 text-amber-600" />;
      default: return <span className="text-lg">{rank}</span>;
    }
  };

  const getRankBg = (rank: number, isCurrentUser: boolean) => {
    if (isCurrentUser) return 'bg-blue-50 border-blue-200 border-2';
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200 border-2';
      case 2: return 'bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200 border-2';
      case 3: return 'bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200 border-2';
      default: return 'bg-white border-gray-200 border';
    }
  };

  const renderGlobalLeaderboard = () => (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <Select value={selectedRegion} onValueChange={setSelectedRegion}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Region" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Regions</SelectItem>
            <SelectItem value="north">North India</SelectItem>
            <SelectItem value="south">South India</SelectItem>
            <SelectItem value="west">West India</SelectItem>
            <SelectItem value="east">East India</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedSport} onValueChange={setSelectedSport}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Sport" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sports</SelectItem>
            <SelectItem value="sprint">Sprint</SelectItem>
            <SelectItem value="longjump">Long Jump</SelectItem>
            <SelectItem value="highjump">High Jump</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedAge} onValueChange={setSelectedAge}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Age" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Ages</SelectItem>
            <SelectItem value="u18">Under 18</SelectItem>
            <SelectItem value="18-25">18-25</SelectItem>
            <SelectItem value="25+">25+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Top 3 Podium */}
      <div className="flex justify-center items-end gap-4 mb-6">
        {/* 2nd Place */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <div className="w-16 h-16 mx-auto mb-2 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full flex items-center justify-center text-white">
            <span className="text-lg">{leaderboardData[1]?.avatar}</span>
          </div>
          <h4 className="text-sm">{leaderboardData[1]?.name}</h4>
          <p className="text-xs text-gray-500">{leaderboardData[1]?.score}</p>
          <div className="w-20 h-16 bg-gray-300 rounded-t-lg mt-2 flex items-center justify-center">
            <span className="text-white">2</span>
          </div>
        </motion.div>

        {/* 1st Place */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center"
        >
          <Crown className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
          <div className="w-20 h-20 mx-auto mb-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white">
            <span className="text-xl">{leaderboardData[0]?.avatar}</span>
          </div>
          <h4>{leaderboardData[0]?.name}</h4>
          <p className="text-sm text-gray-500">{leaderboardData[0]?.score}</p>
          <div className="w-24 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-t-lg mt-2 flex items-center justify-center">
            <span className="text-white text-lg">1</span>
          </div>
        </motion.div>

        {/* 3rd Place */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <div className="w-16 h-16 mx-auto mb-2 bg-gradient-to-r from-amber-600 to-yellow-600 rounded-full flex items-center justify-center text-white">
            <span className="text-lg">{leaderboardData[2]?.avatar}</span>
          </div>
          <h4 className="text-sm">{leaderboardData[2]?.name}</h4>
          <p className="text-xs text-gray-500">{leaderboardData[2]?.score}</p>
          <div className="w-20 h-12 bg-gradient-to-r from-amber-600 to-yellow-600 rounded-t-lg mt-2 flex items-center justify-center">
            <span className="text-white">3</span>
          </div>
        </motion.div>
      </div>

      {/* Full Rankings */}
      <div className="space-y-2">
        {leaderboardData.map((athlete, index) => (
          <motion.div
            key={athlete.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={getRankBg(athlete.rank, athlete.isCurrentUser)}>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 flex items-center justify-center">
                    {getRankIcon(athlete.rank)}
                  </div>

                  <Avatar className="w-12 h-12">
                    <AvatarFallback className={`${
                      athlete.isCurrentUser 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {athlete.avatar}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className={`truncate ${athlete.isCurrentUser ? '' : ''}`}>
                        {athlete.name}
                      </h4>
                      {athlete.isCurrentUser && (
                        <Badge className="bg-blue-100 text-blue-700">You</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {athlete.location}
                      </span>
                      <span>{athlete.sport}</span>
                    </div>
                    <div className="flex gap-1 mt-2">
                      {athlete.badges.map((badge, i) => (
                        <span key={i} className="text-lg">{badge}</span>
                      ))}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl mb-1">{athlete.score}</div>
                    <div className="flex items-center gap-1 text-sm text-green-600">
                      <TrendingUp className="w-3 h-3" />
                      +{athlete.improvement}%
                    </div>
                    <div className="text-xs text-gray-500">
                      {athlete.assessments} tests
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderWeeklyImprovers = () => (
    <div className="space-y-4">
      <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Top Weekly Improvers
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {weeklyLeaders.map((leader, index) => (
            <motion.div
              key={leader.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between bg-white/10 rounded-lg p-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  {index + 1}
                </div>
                <div>
                  <h4>{leader.name}</h4>
                  <p className="text-sm text-green-100">{leader.sport}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg">{leader.improvement}</div>
                <div className="text-xs text-green-100">improvement</div>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>

      {/* Achievement Spotlights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            This Week's Achievements
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { name: 'Raj Patel', achievement: 'First perfect score (100)', icon: '🎯' },
            { name: 'Maya Singh', achievement: '20-day streak milestone', icon: '🔥' },
            { name: 'Dev Kumar', achievement: 'Fastest 100m time', icon: '⚡' }
          ].map((achievement, index) => (
            <div key={index} className="flex items-center gap-3 p-2 rounded-lg bg-gray-50">
              <span className="text-2xl">{achievement.icon}</span>
              <div>
                <h4 className="text-sm">{achievement.name}</h4>
                <p className="text-xs text-gray-600">{achievement.achievement}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );

  const renderRegionalStats = () => (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-500" />
            Regional Performance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {regionalStats.map((region, index) => (
            <motion.div
              key={region.region}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div>
                <h4>{region.region}</h4>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {region.athletes.toLocaleString()} athletes
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl text-blue-600">{region.avgScore}</div>
                <div className="text-xs text-gray-600">avg score</div>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>

      {/* National Stats */}
      <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
        <CardHeader>
          <CardTitle>National Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl mb-1">4,032</div>
              <div className="text-sm text-purple-100">Total Athletes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">82.5</div>
              <div className="text-sm text-purple-100">Avg Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">+15%</div>
              <div className="text-sm text-purple-100">Monthly Growth</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">847</div>
              <div className="text-sm text-purple-100">Daily Active</div>
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
          
          <h1 className="text-lg flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            Leaderboard
          </h1>
          
          <Button variant="ghost" size="sm">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <Tabs defaultValue="global">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="global">Global</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="regional">Regional</TabsTrigger>
          </TabsList>

          <TabsContent value="global">
            {renderGlobalLeaderboard()}
          </TabsContent>

          <TabsContent value="weekly">
            {renderWeeklyImprovers()}
          </TabsContent>

          <TabsContent value="regional">
            {renderRegionalStats()}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}