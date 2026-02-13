import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  X,
  Camera,
  BarChart3,
  Trophy,
  TrendingUp,
  Home,
  Users
} from 'lucide-react';
import { Button } from './ui/button';
import type { Screen, UserRole } from '../App';

interface QuickAccessMenuProps {
  currentScreen: Screen;
  userRole: UserRole;
  onNavigate: (screen: Screen) => void;
  onHome: () => void;
}

export function QuickAccessMenu({ 
  currentScreen, 
  userRole, 
  onNavigate, 
  onHome 
}: QuickAccessMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Don't show on setup screens
  if (['splash', 'onboarding', 'login', 'policy'].includes(currentScreen)) {
    return null;
  }

  const menuItems = [
    {
      screen: 'home' as Screen,
      icon: Home,
      label: 'Home',
      color: 'bg-blue-500',
      show: currentScreen !== 'home'
    },
    {
      screen: 'camera' as Screen,
      icon: Camera,
      label: 'Assessment',
      color: 'bg-green-500',
      show: currentScreen !== 'camera'
    },
    {
      screen: 'progress' as Screen,
      icon: BarChart3,
      label: 'Progress',
      color: 'bg-indigo-500',
      show: currentScreen !== 'progress'
    },
    {
      screen: 'leaderboard' as Screen,
      icon: Trophy,
      label: 'Leaderboard',
      color: 'bg-orange-500',
      show: currentScreen !== 'leaderboard'
    },
    {
      screen: 'report' as Screen,
      icon: TrendingUp,
      label: 'Reports',
      color: 'bg-purple-500',
      show: currentScreen !== 'report' && userRole !== 'coach'
    },
    {
      screen: 'coach' as Screen,
      icon: Users,
      label: 'Coach Panel',
      color: 'bg-red-500',
      show: currentScreen !== 'coach' && userRole === 'coach'
    }
  ].filter(item => item.show);

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Menu Items */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed bottom-32 right-6 z-50">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.screen}
                initial={{ opacity: 0, scale: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  y: 0,
                  transition: { delay: index * 0.1 }
                }}
                exit={{ 
                  opacity: 0, 
                  scale: 0, 
                  y: 20,
                  transition: { delay: (menuItems.length - index - 1) * 0.05 }
                }}
                className="mb-3"
              >
                <Button
                  onClick={() => {
                    if (item.screen === 'home') {
                      onHome();
                    } else {
                      onNavigate(item.screen);
                    }
                    setIsOpen(false);
                  }}
                  className={`w-14 h-14 rounded-full ${item.color} hover:opacity-90 text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center`}
                  title={item.label}
                >
                  <item.icon className="w-6 h-6" />
                </Button>
                
                {/* Label */}
                <div className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <motion.div
        className="fixed bottom-24 right-6 z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-16 h-16 rounded-full shadow-lg hover:shadow-xl transition-all ${
            isOpen 
              ? 'bg-red-500 hover:bg-red-600 rotate-45' 
              : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
          } text-white`}
        >
          {isOpen ? (
            <X className="w-7 h-7" />
          ) : (
            <Plus className="w-7 h-7" />
          )}
        </Button>
      </motion.div>
    </>
  );
}

// Mini navigation component for specific screens
interface MiniNavProps {
  actions: Array<{
    label: string;
    icon: React.ReactNode;
    onClick: () => void;
    variant?: 'primary' | 'secondary';
  }>;
}

export function MiniNav({ actions }: MiniNavProps) {
  return (
    <div className="fixed bottom-24 left-4 right-4 z-40">
      <div className="bg-white border shadow-lg rounded-2xl p-3">
        <div className="flex items-center justify-center gap-2">
          {actions.map((action, index) => (
            <Button
              key={index}
              onClick={action.onClick}
              variant={action.variant === 'primary' ? 'default' : 'outline'}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
                action.variant === 'primary' 
                  ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              {action.icon}
              <span className="text-sm">{action.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}