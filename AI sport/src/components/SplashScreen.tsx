import React from 'react';
import { motion } from 'motion/react';
import { Zap, Target, TrendingUp } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

export function SplashScreen() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-orange-500 flex items-center justify-center p-6">
      <div className="text-center text-white">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            duration: 0.8, 
            ease: "easeOut",
            delay: 0.2 
          }}
          className="mb-8"
        >
          <div className="relative">
            <div className="w-24 h-24 mx-auto mb-6 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
              <Zap className="w-12 h-12 text-white" />
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="absolute -top-2 -right-2 w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center"
            >
              <Target className="w-3 h-3 text-white" />
            </motion.div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-4xl mb-4"
        >
          {t('app.name')}
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-xl text-white/90 mb-8"
        >
          {t('app.tagline')}
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex justify-center space-x-6"
        >
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mb-2">
              <Target className="w-5 h-5" />
            </div>
            <span className="text-sm text-white/80">Assess</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mb-2">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="text-sm text-white/80">Improve</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mb-2">
              <Zap className="w-5 h-5" />
            </div>
            <span className="text-sm text-white/80">Succeed</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="mt-12"
        >
          <div className="flex justify-center">
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}