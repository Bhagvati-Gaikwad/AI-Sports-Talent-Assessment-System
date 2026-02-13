import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ArrowLeft, ArrowRight, Home } from 'lucide-react';
import type { Screen } from '../App';

interface NavigationStatusProps {
  currentScreen: Screen;
  previousScreen?: Screen;
  canGoBack: boolean;
}

export function NavigationStatus({ 
  currentScreen, 
  previousScreen, 
  canGoBack 
}: NavigationStatusProps) {
  const [showStatus, setShowStatus] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    if (previousScreen && previousScreen !== currentScreen) {
      const messages = {
        splash: 'Welcome to SportsTalent AI',
        onboarding: 'Learning about the app',
        login: 'Ready to sign in',
        policy: 'Reviewing app policies', 
        home: 'Back to dashboard',
        camera: 'Starting assessment',
        report: 'Viewing results',
        progress: 'Checking progress',
        coach: 'Coach panel active',
        leaderboard: 'Checking rankings'
      };

      setStatusMessage(messages[currentScreen] || 'Navigating...');
      setShowStatus(true);

      const timer = setTimeout(() => {
        setShowStatus(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [currentScreen, previousScreen]);

  return (
    <AnimatePresence>
      {showStatus && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3 }}
          className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
        >
          <div className="bg-white rounded-full shadow-lg border px-4 py-2 flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-700">{statusMessage}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Simple navigation hints component
interface NavigationHintsProps {
  currentScreen: Screen;
  canGoBack: boolean;
  showHints?: boolean;
}

export function NavigationHints({ 
  currentScreen, 
  canGoBack, 
  showHints = true 
}: NavigationHintsProps) {
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    if (showHints) {
      const timer = setTimeout(() => {
        setShowHint(true);
      }, 3000);

      const hideTimer = setTimeout(() => {
        setShowHint(false);
      }, 8000);

      return () => {
        clearTimeout(timer);
        clearTimeout(hideTimer);
      };
    }
  }, [currentScreen, showHints]);

  const getHintMessage = () => {
    switch (currentScreen) {
      case 'onboarding':
        return 'Swipe or use navigation buttons to continue';
      case 'home':
        return 'Tap any feature card to get started';
      case 'camera':
        return 'Position yourself in front of the camera';
      case 'leaderboard':
        return 'Filter by region or sport for better results';
      default:
        return canGoBack ? 'Use the back button to return to previous screen' : null;
    }
  };

  const hintMessage = getHintMessage();

  return (
    <AnimatePresence>
      {showHint && hintMessage && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-24 left-4 right-4 z-40"
        >
          <div className="bg-blue-500 text-white rounded-lg p-3 shadow-lg">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                💡
              </div>
              <p className="text-sm">{hintMessage}</p>
              <button
                onClick={() => setShowHint(false)}
                className="ml-auto w-6 h-6 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                ×
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}