import React, { useState } from "react";
import { motion } from "motion/react";
import {
  User,
  Users,
  ClipboardCheck,
  Eye,
  EyeOff,
  ArrowLeft,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import { useLanguage, LanguageToggle } from "./LanguageProvider";
import type { UserRole } from "../App";

interface LoginScreenProps {
  onLogin: (role: UserRole) => void;
  onBack?: () => void;
}

export function LoginScreen({ onLogin, onBack }: LoginScreenProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole>("athlete");
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [step, setStep] = useState<"role" | "credentials">("role");
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const { t } = useLanguage();

  const roles = [
    {
      id: "athlete" as UserRole,
      title: t("login.athlete"),
      icon: <User className="w-8 h-8" />,
      description: "Track your performance and improve your skills",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: "coach" as UserRole,
      title: t("login.coach"),
      icon: <Users className="w-8 h-8" />,
      description: "Guide and assess your athletes",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      id: "assessor" as UserRole,
      title: t("login.assessor"),
      icon: <ClipboardCheck className="w-8 h-8" />,
      description: "Evaluate and provide professional feedback",
      gradient: "from-purple-500 to-pink-500",
    },
  ];

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setStep("credentials");
  };

  // ✅ Backend Calls
  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {

        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setMessage({ type: "success", text: data.message });
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        onLogin(data.role); // navigate after login
      } else {
        setMessage({ type: "error", text: data.message });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Login request failed" });
    }
  };

  const handleSignup = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {

        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          role: selectedRole,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setMessage({ type: "success", text: data.message });
        setIsSignup(false);
      } else {
        setMessage({ type: "error", text: data.message });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Signup request failed" });
    }
  };

  // ✅ UI Sections
  const renderRoleSelection = () => (
    <div className="space-y-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl mb-2">{t("login.title")}</h2>
        <p className="text-gray-600">Choose your role to continue</p>
      </div>

      {roles.map((role, index) => (
        <motion.div
          key={role.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card
            className="cursor-pointer transition-all duration-200 hover:shadow-lg border-2 hover:border-blue-200"
            onClick={() => handleRoleSelect(role.id)}
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-r ${role.gradient} flex items-center justify-center text-white`}
                >
                  {role.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl mb-1">{role.title}</h3>
                  <p className="text-gray-600 text-sm">{role.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );

  const renderCredentials = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div
          className={`w-16 h-16 rounded-xl bg-gradient-to-r ${
            roles.find((r) => r.id === selectedRole)?.gradient
          } flex items-center justify-center text-white mx-auto mb-4`}
        >
          {roles.find((r) => r.id === selectedRole)?.icon}
        </div>
        <h2 className="text-2xl mb-2">
          {isSignup ? "Sign Up as " : "Login as "}{" "}
          {roles.find((r) => r.id === selectedRole)?.title}
        </h2>
      </div>

      {/* Email Field */}
      <div>
        <label className="block text-sm mb-2">Email Address</label>
        <Input
          type="email"
          placeholder="example@email.com"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          className="text-lg py-3"
        />
      </div>

      {/* Password Field */}
      <div>
        <label className="block text-sm mb-2">Password</label>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="text-lg py-3 pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* ✅ Inline message */}
      {message && (
        <p
          className={`text-center p-2 rounded ${
            message.type === "success"
              ? "text-green-600 bg-green-100"
              : "text-red-600 bg-red-100"
          }`}
        >
          {message.text}
        </p>
      )}

      {/* Login / Signup Button */}
      <Button
        onClick={isSignup ? handleSignup : handleLogin}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 text-lg rounded-xl"
      >
        {isSignup ? "Sign Up" : "Login"}
      </Button>

      {/* Switch to Signup / Login */}
      <div className="text-center">
        <p className="text-gray-600">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => {
              setIsSignup(!isSignup);
              setMessage(null);
            }}
            className="text-blue-600 hover:underline"
          >
            {isSignup ? "Login" : "Sign up"}
          </button>
        </p>
      </div>

      <Button variant="ghost" onClick={() => setStep("role")} className="w-full">
        Back to Role Selection
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
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
        <div className={!onBack ? "ml-auto" : ""}>
          <LanguageToggle />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {step === "role" && renderRoleSelection()}
          {step === "credentials" && renderCredentials()}
        </motion.div>
      </div>
    </div>
  );
}
