import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Brain, Trophy, ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from './LanguageProvider';
import { LanguageToggle } from './LanguageProvider';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface OnboardingStep {
  icon: React.ReactNode;
  title: string;
  description: string;
  image: string;
}

export function OnboardingScreens({ onComplete, onBack }: { onComplete: () => void; onBack?: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const { t } = useLanguage();

  const steps: OnboardingStep[] = [
    {
      icon: <Camera className="w-8 h-8" />,
      title: t('onboarding.welcome'),
      description: t('onboarding.step1'),
      image: 'https://images.unsplash.com/photo-1720799359504-102495aec122?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBhdGhsZXRlJTIwcnVubmluZyUyMHNwb3J0c3xlbnwxfHx8fDE3NTcxNjE4MzR8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'AI-Powered Analysis',
      description: t('onboarding.step2'),
      image: 'https://images.unsplash.com/photo-1740906792256-bb29194ab4d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjB0ZWNobm9sb2d5JTIwbW9iaWxlJTIwY2FtZXJhfGVufDF8fHx8MTc1NzE2MTgzNnww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: 'Track & Compete',
      description: t('onboarding.step3'),
      image: 'https://images.unsplash.com/photo-1720799359504-102495aec122?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBhdGhsZXRlJTIwcnVubmluZyUyMHNwb3J0c3xlbnwxfHx8fDE3NTcxNjE4MzR8MA&ixlib=rb-4.1.0&q=80&w=1080'
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header with Language Toggle */}
      <div className="flex justify-end p-4">
        <LanguageToggle />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Image Section */}
        <div className="h-1/2 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              <ImageWithFallback
                src={currentStepData.image}
                alt={currentStepData.title}
                className="w-full h-full object-cover"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* Icon Overlay */}
          <motion.div
            key={`icon-${currentStep}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="absolute bottom-6 left-6 w-16 h-16 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center text-blue-600"
          >
            {currentStepData.icon}
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="h-1/2 p-6 flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col justify-center"
            >
              <h2 className="text-3xl mb-4 text-gray-900">
                {currentStepData.title}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {currentStepData.description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Progress Indicators */}
          <div className="flex justify-center mb-6">
            <div className="flex space-x-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentStep 
                      ? 'bg-blue-600 w-8' 
                      : index < currentStep 
                        ? 'bg-green-500' 
                        : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Navigation - now handled by bottom navigation bar */}
          <div className="flex justify-center">
            <Button
              onClick={nextStep}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl text-lg"
            >
              {currentStep === steps.length - 1 ? 'Get Started' : 'Continue'}
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}