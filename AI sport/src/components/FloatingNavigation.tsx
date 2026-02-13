import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Home,
  Plus,
  Menu
} from 'lucide-react';
import { Button } from './ui/button';

interface FloatingNavigationProps {
  onBack?: () => void;
  onNext?: () => void;
  onHome?: () => void;
  onAction?: () => void;
  showBack?: boolean;
  showNext?: boolean;
  showHome?: boolean;
  showAction?: boolean;
  actionIcon?: React.ReactNode;
  actionLabel?: string;
  nextLabel?: string;
  backLabel?: string;
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center';
}

export function FloatingNavigation({
  onBack,
  onNext,
  onHome,
  onAction,
  showBack = true,
  showNext = false,
  showHome = false,
  showAction = false,
  actionIcon = <Plus className="w-5 h-5" />,
  actionLabel = "Action",
  nextLabel = "Next",
  backLabel = "Back",
  position = 'bottom-right'
}: FloatingNavigationProps) {
  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-left':
        return 'bottom-6 left-6';
      case 'bottom-center':
        return 'bottom-6 left-1/2 transform -translate-x-1/2';
      case 'bottom-right':
      default:
        return 'bottom-6 right-6';
    }
  };

  const buttons = [];

  // Back button
  if (showBack && onBack) {
    buttons.push(
      <motion.div
        key="back"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <Button
          onClick={onBack}
          className="w-14 h-14 rounded-full bg-gray-600 hover:bg-gray-700 text-white shadow-lg hover:shadow-xl transition-all"
          title={backLabel}
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
      </motion.div>
    );
  }

  // Home button
  if (showHome && onHome) {
    buttons.push(
      <motion.div
        key="home"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Button
          onClick={onHome}
          className="w-14 h-14 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl transition-all"
          title="Home"
        >
          <Home className="w-6 h-6" />
        </Button>
      </motion.div>
    );
  }

  // Action button
  if (showAction && onAction) {
    buttons.push(
      <motion.div
        key="action"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Button
          onClick={onAction}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl transition-all"
          title={actionLabel}
        >
          {actionIcon}
        </Button>
      </motion.div>
    );
  }

  // Next button
  if (showNext && onNext) {
    buttons.push(
      <motion.div
        key="next"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Button
          onClick={onNext}
          className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all"
          title={nextLabel}
        >
          <ArrowRight className="w-6 h-6" />
        </Button>
      </motion.div>
    );
  }

  if (buttons.length === 0) return null;

  return (
    <div className={`fixed ${getPositionClasses()} z-50`}>
      <div className="flex flex-col-reverse gap-3">
        {buttons}
      </div>
    </div>
  );
}

// Quick navigation component for screen transitions
interface QuickNavProps {
  currentStep: number;
  totalSteps: number;
  onPrevious?: () => void;
  onNext?: () => void;
  onSkip?: () => void;
  showSkip?: boolean;
  labels?: {
    previous?: string;
    next?: string;
    skip?: string;
    finish?: string;
  };
}

export function QuickNav({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onSkip,
  showSkip = false,
  labels = {}
}: QuickNavProps) {
  const {
    previous = "Previous",
    next = "Next",
    skip = "Skip",
    finish = "Finish"
  } = labels;

  const isLastStep = currentStep === totalSteps - 1;
  const isFirstStep = currentStep === 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
      <div className="px-4 py-4">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          {/* Previous Button */}
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={isFirstStep}
            className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
              isFirstStep ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            {previous}
          </Button>

          {/* Progress Dots */}
          <div className="flex items-center gap-2">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === currentStep
                    ? 'bg-blue-500'
                    : i < currentStep
                    ? 'bg-green-500'
                    : 'bg-gray-300'
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-500">
              {currentStep + 1} of {totalSteps}
            </span>
          </div>

          {/* Next/Skip Buttons */}
          <div className="flex items-center gap-2">
            {showSkip && !isLastStep && onSkip && (
              <Button
                variant="ghost"
                onClick={onSkip}
                className="text-gray-500 hover:text-gray-700"
              >
                {skip}
              </Button>
            )}
            
            <Button
              onClick={onNext}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
                isLastStep
                  ? 'bg-green-500 hover:bg-green-600 text-white'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              {isLastStep ? finish : next}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}