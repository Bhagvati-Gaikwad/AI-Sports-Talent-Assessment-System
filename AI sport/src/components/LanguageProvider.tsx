import React, { createContext, useContext, useState } from 'react';
import { Globe } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

type Language = 'en' | 'hi' | 'mr' | 'ta' | 'te';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const languages = {
  en: 'English',
  hi: 'हिंदी',
  mr: 'मराठी',
  ta: 'தமிழ்',
  te: 'తెలుగు'
};

const translations = {
  en: {
    'app.name': 'SportsTalent AI',
    'app.tagline': 'Assess. Improve. Succeed.',
    'onboarding.welcome': 'Welcome to RunTime Terror',
    'onboarding.step1': 'Use your mobile camera for AI-powered performance analysis',
    'onboarding.step2': 'Get real-time feedback on your technique and form',
    'onboarding.step3': 'Track progress and compete with others',
    'login.title': 'Get Started',
    'login.athlete': 'Athlete',
    'login.coach': 'Coach',
    'login.assessor': 'Assessor',
    'home.today': 'Today\'s Tasks',
    'home.start': 'Start Assessment',
    'home.progress': 'View Progress',
    'home.leaderboard': 'Leaderboard',
    'camera.instructions': 'Position yourself in the camera frame',
    'camera.ready': 'Ready to start?',
    'report.score': 'AI Performance Score',
    'report.feedback': 'Feedback & Suggestions',
    'offline.message': 'Limited connectivity detected. Continue in offline mode?'
  },
  hi: {
    'app.name': 'स्पोर्ट्सटैलेंट AI',
    'app.tagline': 'आकलन करें। सुधारें। सफल हों।',
    'onboarding.welcome': 'AI स्पोर्ट्स असेसमेंट में आपका स्वागत है',
    'onboarding.step1': 'AI-संचालित प्रदर्शन विश्लेषण के लिए अपना मोबाइल कैमरा उपयोग करें',
    'onboarding.step2': 'अपनी तकनीक और फॉर्म पर रियल-टाइम फीडबैक प्राप्त करें',
    'onboarding.step3': 'प्रगति ट्रैक करें और दूसरों के साथ प्रतिस्पर्धा करें',
    'login.title': 'शुरू करें',
    'login.athlete': 'एथलीट',
    'login.coach': 'कोच',
    'login.assessor': 'मूल्यांकनकर्ता',
    'home.today': 'आज के कार्य',
    'home.start': 'मूल्यांकन शुरू करें',
    'home.progress': 'प्रगति देखें',
    'home.leaderboard': 'लीडरबोर्ड',
    'camera.instructions': 'कैमरा फ्रेम में खुद को स्थापित करें',
    'camera.ready': 'शुरू करने के लिए तैयार हैं?',
    'report.score': 'AI प्रदर्शन स्कोर',
    'report.feedback': 'फीडबैक और सुझाव',
    'offline.message': 'सीमित कनेक्टिविटी मिली। ऑफलाइन मोड में जारी रखें?'
  }
  // Add more languages as needed
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language]?.[key as keyof typeof translations['en']] || 
           translations.en[key as keyof typeof translations['en']] || 
           key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          <span className="text-sm">{languages[language]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(languages).map(([code, name]) => (
          <DropdownMenuItem 
            key={code}
            onClick={() => setLanguage(code as Language)}
            className={language === code ? 'bg-accent' : ''}
          >
            {name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}