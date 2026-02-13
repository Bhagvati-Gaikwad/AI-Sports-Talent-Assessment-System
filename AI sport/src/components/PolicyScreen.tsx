import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Shield, 
  Eye, 
  Lock, 
  Users, 
  CheckCircle,
  AlertTriangle,
  FileText,
  Heart
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { useLanguage, LanguageToggle } from './LanguageProvider';
import type { UserRole } from '../App';

interface PolicyScreenProps {
  onAccept: () => void;
  onBack?: () => void;
  userRole: UserRole;
}

export function PolicyScreen({ onAccept, onBack, userRole }: PolicyScreenProps) {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [acceptedData, setAcceptedData] = useState(false);
  const { t } = useLanguage();

  const canProceed = acceptedTerms && acceptedPrivacy && acceptedData;

  const roleSpecificContent = {
    athlete: {
      title: 'Welcome, Athlete!',
      subtitle: 'Your journey to athletic excellence starts here',
      icon: <Heart className="w-8 h-8" />,
      gradient: 'from-blue-500 to-cyan-500'
    },
    coach: {
      title: 'Welcome, Coach!',
      subtitle: 'Empower your athletes with AI-driven insights',
      icon: <Users className="w-8 h-8" />,
      gradient: 'from-green-500 to-emerald-500'
    },
    assessor: {
      title: 'Welcome, Assessor!',
      subtitle: 'Professional sports assessment made simple',
      icon: <Shield className="w-8 h-8" />,
      gradient: 'from-purple-500 to-pink-500'
    }
  };

  const currentRole = roleSpecificContent[userRole];

  const policyItems = [
    {
      id: 'terms',
      title: 'Terms of Service',
      description: 'Rules and guidelines for using SportsTalent AI',
      icon: <FileText className="w-5 h-5" />,
      content: [
        'Use the app responsibly and for legitimate sports assessment purposes',
        'Respect other users and maintain appropriate conduct',
        'Do not share false information or manipulate assessment results',
        'Report any issues or inappropriate behavior to our support team',
        'Comply with local laws and regulations regarding sports activities'
      ]
    },
    {
      id: 'privacy',
      title: 'Privacy Policy',
      description: 'How we collect, use, and protect your personal information',
      icon: <Eye className="w-5 h-5" />,
      content: [
        'We collect performance data to provide personalized feedback',
        'Your personal information is encrypted and securely stored',
        'We never sell your data to third parties',
        'You can request data deletion at any time',
        'Anonymous usage statistics help us improve the app'
      ]
    },
    {
      id: 'data',
      title: 'Data Usage Agreement',
      description: 'Consent for AI analysis and performance tracking',
      icon: <Lock className="w-5 h-5" />,
      content: [
        'Video recordings are processed locally when possible',
        'AI analysis helps provide accurate performance feedback',
        'Aggregated data may be used to improve our AI models',
        'You maintain ownership of your performance data',
        'Data is retained according to our retention policy'
      ]
    }
  ];

  const handleCheckboxChange = (policyId: string, checked: boolean) => {
    switch (policyId) {
      case 'terms':
        setAcceptedTerms(checked);
        break;
      case 'privacy':
        setAcceptedPrivacy(checked);
        break;
      case 'data':
        setAcceptedData(checked);
        break;
    }
  };

  const getCheckboxState = (policyId: string) => {
    switch (policyId) {
      case 'terms':
        return acceptedTerms;
      case 'privacy':
        return acceptedPrivacy;
      case 'data':
        return acceptedData;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-4 py-4 flex items-center justify-between">
          {onBack && (
            <Button
              variant="ghost"
              onClick={onBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          )}
          
          <h1 className="text-lg">App Policies</h1>
          
          <LanguageToggle />
        </div>
      </div>

      <div className="p-4 max-w-2xl mx-auto">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className={`bg-gradient-to-r ${currentRole.gradient} text-white border-0 mb-6`}>
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                {currentRole.icon}
              </div>
              <h2 className="text-2xl mb-2">{currentRole.title}</h2>
              <p className="text-white/90">{currentRole.subtitle}</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Policy Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-lg mb-2">Before You Continue</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Please review and accept our policies to ensure a safe and secure experience. 
                    These agreements protect both you and other users of the platform.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Policy Cards */}
        <div className="space-y-4 mb-6">
          {policyItems.map((policy, index) => (
            <motion.div
              key={policy.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
            >
              <Card className={`border-2 transition-all ${
                getCheckboxState(policy.id) 
                  ? 'border-green-200 bg-green-50' 
                  : 'border-gray-200 hover:border-blue-200'
              }`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        {policy.icon}
                      </div>
                      <div>
                        <h4>{policy.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{policy.description}</p>
                      </div>
                    </CardTitle>
                    {getCheckboxState(policy.id) && (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <ScrollArea className="h-32 mb-4">
                    <div className="space-y-2">
                      {policy.content.map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Checkbox
                      id={policy.id}
                      checked={getCheckboxState(policy.id)}
                      onCheckedChange={(checked) => handleCheckboxChange(policy.id, checked as boolean)}
                    />
                    <label htmlFor={policy.id} className="text-sm cursor-pointer">
                      I have read and agree to the {policy.title}
                    </label>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="space-y-4"
        >
          <Button
            onClick={onAccept}
            disabled={!canProceed}
            className={`w-full py-4 rounded-xl text-lg transition-all ${
              canProceed
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {canProceed ? (
              <>
                <CheckCircle className="w-5 h-5 mr-2" />
                Accept All & Continue
              </>
            ) : (
              <>
                <Lock className="w-5 h-5 mr-2" />
                Please Accept All Policies
              </>
            )}
          </Button>

          {/* Progress Indicator */}
          <div className="flex justify-center items-center gap-2">
            <div className="flex gap-1">
              {[acceptedTerms, acceptedPrivacy, acceptedData].map((accepted, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    accepted ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-2">
              {[acceptedTerms, acceptedPrivacy, acceptedData].filter(Boolean).length}/3 accepted
            </span>
          </div>

          {/* Security Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-blue-600" />
              <div className="text-sm">
                <p className="text-blue-800 mb-1">Your data is secure</p>
                <p className="text-blue-600">
                  We use industry-standard encryption and never share your personal information with third parties.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}