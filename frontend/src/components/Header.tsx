
import React from 'react';
import { Zap } from 'lucide-react';
import AppearanceSettings from './AppearanceSettings';

interface HeaderProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
  isNotificationsEnabled: boolean;
  setIsNotificationsEnabled: (value: boolean) => void;
  language: string;
  setLanguage: (value: string) => void;
  currency: string;
  setCurrency: (value: string) => void;
  timezone: string;
  setTimezone: (value: string) => void;
  autoRefresh: boolean;
  setAutoRefresh: (value: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
  isDarkMode,
  setIsDarkMode,
  isNotificationsEnabled,
  setIsNotificationsEnabled,
  language,
  setLanguage,
  currency,
  setCurrency,
  timezone,
  setTimezone,
  autoRefresh,
  setAutoRefresh
}) => {
  return (
    <header className={`sticky top-0 z-50 backdrop-blur-2xl border-b transition-all duration-500 ${
      isDarkMode 
        ? 'bg-slate-900/80 border-slate-700/50' 
        : 'bg-white/80 border-gray-200/50'
    }`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 via-purple-500 to-cyan-500 rounded-xl blur-sm opacity-50 group-hover:opacity-75 animate-pulse"></div>
              <div className="relative p-2 lg:p-3 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 rounded-xl shadow-2xl group-hover:scale-110 transition-transform duration-300">
                <Zap className="h-6 w-6 lg:h-7 lg:w-7 text-white animate-pulse" />
              </div>
            </div>
            <div>
              <h1 className={`text-xl lg:text-2xl font-black tracking-tight group-hover:scale-105 transition-transform duration-300 ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-violet-200 via-purple-200 to-cyan-200 bg-clip-text text-transparent'
                  : 'bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent'
              }`}>
                QuantPredict
              </h1>
              <p className={`text-xs font-medium ${
                isDarkMode ? 'text-slate-400' : 'text-gray-500'
              }`}>
                AI-Powered Trading
              </p>
            </div>
          </div>

          {/* Settings */}
          <AppearanceSettings 
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
            isNotificationsEnabled={isNotificationsEnabled}
            setIsNotificationsEnabled={setIsNotificationsEnabled}
            language={language}
            setLanguage={setLanguage}
            currency={currency}
            setCurrency={setCurrency}
            timezone={timezone}
            setTimezone={setTimezone}
            autoRefresh={autoRefresh}
            setAutoRefresh={setAutoRefresh}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
