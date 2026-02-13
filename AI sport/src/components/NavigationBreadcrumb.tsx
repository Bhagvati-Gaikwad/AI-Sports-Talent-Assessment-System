import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Home } from 'lucide-react';
import { Button } from './ui/button';
import type { Screen } from '../App';

interface NavigationBreadcrumbProps {
  currentScreen: Screen;
  screenHistory: Screen[];
  onNavigateToScreen: (screen: Screen) => void;
}

export function NavigationBreadcrumb({ 
  currentScreen, 
  screenHistory, 
  onNavigateToScreen 
}: NavigationBreadcrumbProps) {
  const getScreenInfo = (screen: Screen) => {
    const screens = {
      splash: { label: 'Welcome', icon: '🚀' },
      onboarding: { label: 'Getting Started', icon: '👋' },
      login: { label: 'Sign In', icon: '🔐' },
      policy: { label: 'Policies', icon: '📋' },
      home: { label: 'Dashboard', icon: '🏠' },
      camera: { label: 'Assessment', icon: '📹' },
      report: { label: 'Results', icon: '📊' },
      progress: { label: 'Progress', icon: '📈' },
      coach: { label: 'Coach Panel', icon: '👨‍🏫' },
      leaderboard: { label: 'Leaderboard', icon: '🏆' }
    };
    return screens[screen] || { label: 'Unknown', icon: '❓' };
  };

  // Don't show breadcrumb on splash or main screens
  if (['splash', 'onboarding', 'login', 'policy'].includes(currentScreen)) {
    return null;
  }

  const breadcrumbItems = [];
  
  // Add home as first item if not already there
  if (currentScreen !== 'home' && currentScreen !== 'coach') {
    breadcrumbItems.push('home');
  }
  
  // Add recent history (last 2 items max)
  const recentHistory = screenHistory.slice(-2);
  breadcrumbItems.push(...recentHistory);
  
  // Add current screen
  if (currentScreen !== breadcrumbItems[breadcrumbItems.length - 1]) {
    breadcrumbItems.push(currentScreen);
  }

  // Remove duplicates while preserving order
  const uniqueBreadcrumbs = breadcrumbItems.filter((item, index) => 
    breadcrumbItems.indexOf(item) === index
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white border-b px-4 py-2"
    >
      <div className="flex items-center space-x-2 max-w-4xl mx-auto">
        <div className="flex items-center space-x-1 text-sm">
          {uniqueBreadcrumbs.map((screen, index) => {
            const screenInfo = getScreenInfo(screen as Screen);
            const isLast = index === uniqueBreadcrumbs.length - 1;
            const isClickable = !isLast && screen !== currentScreen;

            return (
              <React.Fragment key={screen}>
                {index > 0 && (
                  <ChevronRight className="w-3 h-3 text-gray-400" />
                )}
                
                {isClickable ? (
                  <Button
                    variant="ghost"
                    onClick={() => onNavigateToScreen(screen as Screen)}
                    className="h-auto p-1 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
                  >
                    <span className="mr-1">{screenInfo.icon}</span>
                    {screenInfo.label}
                  </Button>
                ) : (
                  <span className={`flex items-center px-1 ${
                    isLast ? 'text-gray-900' : 'text-gray-600'
                  }`}>
                    <span className="mr-1">{screenInfo.icon}</span>
                    {screenInfo.label}
                  </span>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}