import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Home, 
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
  Camera,
  TrendingUp,
  Trophy,
  BarChart3,
  Users
} from 'lucide-react';
import { Button } from './ui/button';
import type { Screen } from '../App';

interface NavigationBarProps {
  currentScreen: Screen;
  canGoBack: boolean;
  canGoForward?: boolean;
  onBack: () => void;
  onForward?: () => void;
  onHome?: () => void;
  onNavigate?: (screen: Screen) => void;
  showHomeButton?: boolean;
}

export function NavigationBar({ 
  currentScreen, 
  canGoBack, 
  canGoForward = false,
  onBack, 
  onForward,
  onHome,
  onNavigate,
  showHomeButton = false
}: NavigationBarProps) {
  const [showQuickNav, setShowQuickNav] = useState(false);
  const getScreenTitle = (screen: Screen) => {
    switch (screen) {
      case 'splash': return 'Welcome';
      case 'onboarding': return 'Getting Started';
      case 'login': return 'Sign In';
      case 'policy': return 'App Policies';
      case 'home': return 'Dashboard';
      case 'camera': return 'Assessment';
      case 'report': return 'Results';
      case 'progress': return 'Progress';
      case 'coach': return 'Coach Panel';
      case 'leaderboard': return 'Leaderboard';
      default: return 'SportsTalent AI';
    }
  };

  // Don't show navigation on splash or certain screens
  if (currentScreen === 'splash') {
    return null;
  }

  const quickNavItems = [
    { screen: 'home' as Screen, icon: Home, label: 'Home', color: 'blue' },
    { screen: 'camera' as Screen, icon: Camera, label: 'Assessment', color: 'green' },
    { screen: 'progress' as Screen, icon: BarChart3, label: 'Progress', color: 'blue' },
    { screen: 'leaderboard' as Screen, icon: Trophy, label: 'Rankings', color: 'orange' },
    { screen: 'report' as Screen, icon: TrendingUp, label: 'Report', color: 'purple' }
  ];

  return (
    <>
      {/* Quick Navigation Menu */}
      <AnimatePresence>
        {showQuickNav && onNavigate && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 left-4 right-4 z-40 bg-white border shadow-xl rounded-2xl p-4"
          >
            <h3 className="text-sm text-gray-600 mb-3">Quick Navigation</h3>
            <div className="grid grid-cols-5 gap-3">
              {quickNavItems.map(({ screen, icon: Icon, label, color }) => (
                <Button
                  key={screen}
                  variant="ghost"
                  onClick={() => {
                    onNavigate(screen);
                    setShowQuickNav(false);
                  }}
                  disabled={currentScreen === screen}
                  className={`h-16 flex flex-col items-center justify-center gap-1 rounded-xl transition-all ${
                    currentScreen === screen 
                      ? 'bg-gray-100 cursor-not-allowed' 
                      : `hover:bg-${color}-50`
                  }`}
                >
                  <Icon className={`w-5 h-5 ${
                    currentScreen === screen ? 'text-gray-400' : `text-${color}-600`
                  }`} />
                  <span className={`text-xs ${
                    currentScreen === screen ? 'text-gray-400' : `text-${color}-600`
                  }`}>
                    {label}
                  </span>
                </Button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      {showQuickNav && (
        <div 
          className="fixed inset-0 z-30 bg-black/20"
          onClick={() => setShowQuickNav(false)}
        />
      )}

      {/* Main Navigation Bar */}
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-lg"
      >
        <div className="px-4 py-3">
          <div className="flex items-center justify-between max-w-lg mx-auto">
            {/* Back Button */}
            <Button
              variant={canGoBack ? "default" : "ghost"}
              onClick={onBack}
              disabled={!canGoBack}
              className={`flex items-center gap-1 px-4 py-2 rounded-full transition-all ${
                canGoBack 
                  ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-md' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm">Back</span>
            </Button>

            {/* Quick Nav Menu Button */}
            {onNavigate && currentScreen !== 'splash' && currentScreen !== 'onboarding' && (
              <Button
                variant="ghost"
                onClick={() => setShowQuickNav(!showQuickNav)}
                className="flex items-center gap-1 px-3 py-2 rounded-full hover:bg-gray-100"
              >
                <Menu className="w-4 h-4 text-gray-600" />
                <span className="text-xs text-gray-600">Menu</span>
              </Button>
            )}

            {/* Screen Title */}
            <div className="flex-1 text-center mx-3">
              <h2 className="text-sm text-gray-800">
                {getScreenTitle(currentScreen)}
              </h2>
            </div>

            {/* Home Button or Forward Button */}
            <div className="flex items-center gap-2">
              {showHomeButton && onHome && (
                <Button
                  variant="outline"
                  onClick={onHome}
                  className="flex items-center gap-1 px-4 py-2 rounded-full border-blue-200 text-blue-600 hover:bg-blue-50"
                >
                  <Home className="w-4 h-4" />
                  <span className="text-sm">Home</span>
                </Button>
              )}
              
              {canGoForward && onForward && (
                <Button
                  variant="default"
                  onClick={onForward}
                  className="flex items-center gap-1 px-4 py-2 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-md"
                >
                  <span className="text-sm">Next</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

// Screen-specific navigation component for header
interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  rightAction?: React.ReactNode;
  showBackButton?: boolean;
}

export function ScreenHeader({ 
  title, 
  subtitle, 
  onBack, 
  rightAction,
  showBackButton = true 
}: ScreenHeaderProps) {
  return (
    <div className="bg-white shadow-sm border-b sticky top-0 z-40">
      <div className="px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {showBackButton && onBack && (
              <Button
                variant="ghost"
                onClick={onBack}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full px-3 py-2"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Back</span>
              </Button>
            )}
            <div>
              <h1 className="text-xl text-gray-900">{title}</h1>
              {subtitle && (
                <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
              )}
            </div>
          </div>
          
          {rightAction && (
            <div className="flex items-center gap-2">
              {rightAction}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}