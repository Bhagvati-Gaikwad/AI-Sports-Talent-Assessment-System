import React, { useState, useEffect } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { OnboardingScreens } from './components/OnboardingScreens';
import { LoginScreen } from './components/LoginScreen';
import { PolicyScreen } from './components/PolicyScreen';
import { HomeDashboard } from './components/HomeDashboard';
import { CameraAssessment } from './components/CameraAssessment';
import { PerformanceReport } from './components/PerformanceReport';
import { ProgressTracker } from './components/ProgressTracker';
import { CoachPanel } from './components/CoachPanel';
import { Leaderboard } from './components/Leaderboard';
import { NavigationBar } from './components/NavigationBar';
import { NavigationBreadcrumb } from './components/NavigationBreadcrumb';
import { NavigationStatus, NavigationHints } from './components/NavigationStatus';
import { QuickAccessMenu } from './components/QuickAccessMenu';
import { LanguageProvider } from './components/LanguageProvider';

export type Screen = 
  | 'splash' 
  | 'onboarding' 
  | 'login'
  | 'policy'
  | 'home' 
  | 'camera' 
  | 'report' 
  | 'progress' 
  | 'coach' 
  | 'leaderboard';

export type UserRole = 'athlete' | 'coach' | 'assessor';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [userRole, setUserRole] = useState<UserRole>('athlete');
  const [isOffline, setIsOffline] = useState(false);
  const [screenHistory, setScreenHistory] = useState<Screen[]>([]);
  const [previousScreen, setPreviousScreen] = useState<Screen | undefined>();

  useEffect(() => {
    // Simulate splash screen duration
    const timer = setTimeout(() => {
      navigateToScreen('onboarding');
    }, 2500);

    // Check online status
    const updateOnlineStatus = () => {
      setIsOffline(!navigator.onLine);
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    updateOnlineStatus();

    return () => {
      clearTimeout(timer);
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  const navigateToScreen = (screen: Screen) => {
    setScreenHistory(prev => [...prev, currentScreen]);
    setPreviousScreen(currentScreen);
    setCurrentScreen(screen);
  };

  const navigateBack = () => {
    if (screenHistory.length > 0) {
      const backToScreen = screenHistory[screenHistory.length - 1];
      setScreenHistory(prev => prev.slice(0, -1));
      setPreviousScreen(currentScreen);
      setCurrentScreen(backToScreen);
    }
  };

  const canGoBack = screenHistory.length > 0;

  const goToHome = () => {
    // Clear history and go to appropriate home screen
    const homeScreen = userRole === 'coach' ? 'coach' : 'home';
    setScreenHistory([]);
    setPreviousScreen(currentScreen);
    setCurrentScreen(homeScreen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen />;
      case 'onboarding':
        return (
          <OnboardingScreens 
            onComplete={() => navigateToScreen('login')} 
            onBack={canGoBack ? navigateBack : undefined}
          />
        );
      case 'login':
        return (
          <LoginScreen 
            onLogin={(role) => {
              setUserRole(role);
              navigateToScreen('policy');
            }} 
            onBack={canGoBack ? navigateBack : undefined}
          />
        );
      case 'policy':
        return (
          <PolicyScreen
            onAccept={() => navigateToScreen(userRole === 'coach' ? 'coach' : 'home')}
            onBack={canGoBack ? navigateBack : undefined}
            userRole={userRole}
          />
        );
      case 'home':
        return (
          <HomeDashboard 
            onNavigate={navigateToScreen}
            userRole={userRole}
            onBack={canGoBack ? navigateBack : undefined}
          />
        );
      case 'camera':
        return (
          <CameraAssessment 
            onComplete={() => navigateToScreen('report')}
            onBack={navigateBack}
          />
        );
      case 'report':
        return (
          <PerformanceReport 
            onBack={navigateBack}
            onNavigate={navigateToScreen}
          />
        );
      case 'progress':
        return (
          <ProgressTracker 
            onBack={navigateBack}
          />
        );
      case 'coach':
        return (
          <CoachPanel 
            onNavigate={navigateToScreen}
            onBack={canGoBack ? navigateBack : undefined}
          />
        );
      case 'leaderboard':
        return (
          <Leaderboard 
            onBack={navigateBack}
          />
        );
      default:
        return <HomeDashboard onNavigate={navigateToScreen} userRole={userRole} onBack={canGoBack ? navigateBack : undefined} />;
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background relative">
        {/* Offline Banner */}
        {isOffline && (
          <div className="fixed top-0 left-0 right-0 z-50 bg-orange-500 text-white px-4 py-2 text-center">
            <p className="text-sm">📱 Offline Mode - Limited features available</p>
          </div>
        )}
        
        {/* Navigation Breadcrumb */}
        <NavigationBreadcrumb
          currentScreen={currentScreen}
          screenHistory={screenHistory}
          onNavigateToScreen={navigateToScreen}
        />

        <div className={`${isOffline ? 'pt-10' : ''} ${currentScreen !== 'splash' ? 'pb-20' : ''}`}>
          {renderScreen()}
        </div>

        {/* Navigation Status Indicators */}
        <NavigationStatus
          currentScreen={currentScreen}
          previousScreen={previousScreen}
          canGoBack={canGoBack}
        />

        {/* Navigation Hints */}
        <NavigationHints
          currentScreen={currentScreen}
          canGoBack={canGoBack}
          showHints={true}
        />

        {/* Quick Access Menu */}
        <QuickAccessMenu
          currentScreen={currentScreen}
          userRole={userRole}
          onNavigate={navigateToScreen}
          onHome={goToHome}
        />

        {/* Navigation Bar */}
        <NavigationBar
          currentScreen={currentScreen}
          canGoBack={canGoBack}
          onBack={navigateBack}
          onHome={goToHome}
          onNavigate={navigateToScreen}
          showHomeButton={['camera', 'report', 'progress', 'leaderboard'].includes(currentScreen)}
        />
      </div>
    </LanguageProvider>
  );
}