import React from 'react';
import { Switch } from "@/components/ui/switch";
import { 
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Settings, Monitor, Bell, Database, Globe, Target, Download, Check } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface AppearanceSettingsProps {
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

const AppearanceSettings: React.FC<AppearanceSettingsProps> = ({
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
  const { toast } = useToast(); 
  
  const handleThemeToggle = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode));
    toast({
      title: "Theme Updated",
      description: `Switched to ${newMode ? 'dark' : 'light'} mode`,
    });
  };

  const handleNotificationsToggle = () => {
    const newState = !isNotificationsEnabled;
    setIsNotificationsEnabled(newState);
    localStorage.setItem('notificationsEnabled', JSON.stringify(newState));
    toast({
      title: "Notifications Updated",
      description: `Notifications ${newState ? 'enabled' : 'disabled'}`,
    });
  };

  const handleExportData = () => {
    const mockData = {
      predictions: [],
      settings: { 
        isDarkMode, 
        language, 
        currency, 
        timezone, 
        isNotificationsEnabled,
        autoRefresh 
      },
      exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(mockData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `quantpredict-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Export Complete",
      description: "Your data has been exported successfully",
    });
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
    toast({
      title: "Language Updated",
      description: `Language changed to ${getLanguageDisplayName(newLanguage)}`,
    });
  };

  const handleCurrencyChange = (newCurrency: string) => {
    setCurrency(newCurrency);
    localStorage.setItem('currency', newCurrency);
    toast({
      title: "Currency Updated",
      description: `Default currency changed to ${newCurrency.toUpperCase()}`,
    });
  };

  const handleTimezoneChange = (newTimezone: string) => {
    setTimezone(newTimezone);
    localStorage.setItem('timezone', newTimezone);
    toast({
      title: "Timezone Updated",
      description: `Timezone changed to ${newTimezone.toUpperCase()}`,
    });
  };

  const handleAutoRefreshToggle = () => {
    const newState = !autoRefresh;
    setAutoRefresh(newState);
    localStorage.setItem('autoRefresh', JSON.stringify(newState));
    toast({
      title: "Auto Refresh Updated",
      description: `Auto refresh ${newState ? 'enabled' : 'disabled'}`,
    });
  };

  const getLanguageDisplayName = (lang: string) => {
    const languages: { [key: string]: string } = {
      english: 'English',
      spanish: 'Español',
      french: 'Français',
      german: 'Deutsch',
      chinese: '中文',
      japanese: '日本語'
    };
    return languages[lang] || lang;
  };

  const getCurrencyDisplayName = (curr: string) => {
    const currencies: { [key: string]: string } = {
      usd: 'USD ($)',
      eur: 'EUR (€)',
      gbp: 'GBP (£)',
      jpy: 'JPY (¥)',
      cad: 'CAD (C$)'
    };
    return currencies[curr] || curr;
  };

  return (
    <Menubar className={`${isDarkMode ? "bg-slate-800/60 border-slate-700/50 backdrop-blur-sm" : "bg-white/60 border-gray-300/50 backdrop-blur-sm"}`}>
      <MenubarMenu>
        <MenubarTrigger className={`flex items-center space-x-2 transition-all duration-500 ${
          isDarkMode 
            ? 'text-slate-300 hover:text-violet-300' 
            : 'text-gray-700 hover:text-violet-600'
        }`}>
          <div className={`p-1.5 rounded-md transition-all duration-500 shadow-lg border hover:scale-110 ${
            isDarkMode 
              ? 'bg-slate-800/60 border-slate-700/50 hover:bg-violet-600/30 hover:border-violet-500/50'
              : 'bg-white/60 border-gray-300/50 hover:bg-violet-100/30 hover:border-violet-400/50'
          }`}>
            <Settings className="h-4 w-4" />
          </div>
          <span className="tracking-wide text-sm">Settings</span>
        </MenubarTrigger>
        <MenubarContent className={`backdrop-blur-2xl border shadow-2xl rounded-lg min-w-[250px] z-50 ${
          isDarkMode 
            ? 'bg-slate-900/95 border-slate-600' 
            : 'bg-white/95 border-gray-200'
        }`}>
          {/* Theme Section */}
          <div className="p-3">
            <div className={`text-sm font-bold mb-3 flex items-center space-x-2 ${
              isDarkMode ? 'text-slate-300' : 'text-gray-700'
            }`}>
              <Monitor className="h-4 w-4" />
              <span>Appearance</span>
            </div>
            
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse"></div>
                <span className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>Dark Mode</span>
              </div>
              <Switch 
                checked={isDarkMode} 
                onCheckedChange={handleThemeToggle}
                className="data-[state=checked]:bg-violet-600"
              />
            </div>
          </div>
          
          <MenubarSeparator className={isDarkMode ? "bg-slate-700" : "bg-gray-300"} />
          
          {/* Notifications Section */}
          <div className="p-3">
            <div className={`text-sm font-bold mb-3 flex items-center space-x-2 ${
              isDarkMode ? 'text-slate-300' : 'text-gray-700'
            }`}>
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </div>
            
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>Push Notifications</span>
              </div>
              <Switch 
                checked={isNotificationsEnabled} 
                onCheckedChange={handleNotificationsToggle}
                className="data-[state=checked]:bg-emerald-600"
              />
            </div>
          </div>
          
          <MenubarSeparator className={isDarkMode ? "bg-slate-700" : "bg-gray-300"} />
          
          {/* Export Data */}
          <MenubarItem 
            className={`p-3 cursor-pointer ${
              isDarkMode ? 'hover:bg-slate-800/60' : 'hover:bg-gray-100/60'
            }`}
            onClick={handleExportData}
          >
            <div className="flex items-center space-x-2">
              <Database className="h-4 w-4 text-blue-400" />
              <span className="text-sm">Export Data</span>
              <Download className="h-3 w-3 ml-auto opacity-60" />
            </div>
          </MenubarItem>
          
          {/* Language Settings */}
          <Dialog>
            <DialogTrigger asChild>
              <MenubarItem className={`p-3 cursor-pointer ${
                isDarkMode ? 'hover:bg-slate-800/60' : 'hover:bg-gray-100/60'
              }`}>
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-green-400" />
                  <span className="text-sm">Language ({getLanguageDisplayName(language)})</span>
                </div>
              </MenubarItem>
            </DialogTrigger>
            <DialogContent className={`${
              isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-200'
            }`}>
              <DialogHeader>
                <DialogTitle className={isDarkMode ? 'text-white' : 'text-gray-800'}>
                  Language Settings
                </DialogTitle>
                <DialogDescription className={isDarkMode ? 'text-slate-400' : 'text-gray-600'}>
                  Choose your preferred language for the interface.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className={isDarkMode ? 'text-slate-300' : 'text-gray-700'}>Interface Language</Label>
                  <Select value={language} onValueChange={handleLanguageChange}>
                    <SelectTrigger className={`${
                      isDarkMode 
                        ? 'bg-slate-800 border-slate-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-800'
                    }`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className={isDarkMode ? 'bg-slate-800 border-slate-600' : 'bg-white border-gray-200'}>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="spanish">Español</SelectItem>
                      <SelectItem value="french">Français</SelectItem>
                      <SelectItem value="german">Deutsch</SelectItem>
                      <SelectItem value="chinese">中文</SelectItem>
                      <SelectItem value="japanese">日本語</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          {/* Preferences */}
          <Dialog>
            <DialogTrigger asChild>
              <MenubarItem className={`p-3 cursor-pointer ${
                isDarkMode ? 'hover:bg-slate-800/60' : 'hover:bg-gray-100/60'
              }`}>
                <div className="flex items-center space-x-2">
                  <Target className="h-4 w-4 text-purple-400" />
                  <span className="text-sm">Preferences</span>
                </div>
              </MenubarItem>
            </DialogTrigger>
            <DialogContent className={`${
              isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-200'
            }`}>
              <DialogHeader>
                <DialogTitle className={isDarkMode ? 'text-white' : 'text-gray-800'}>
                  Application Preferences
                </DialogTitle>
                <DialogDescription className={isDarkMode ? 'text-slate-400' : 'text-gray-600'}>
                  Customize your application behavior and display settings.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className={isDarkMode ? 'text-slate-300' : 'text-gray-700'}>Default Currency</Label>
                  <Select value={currency} onValueChange={handleCurrencyChange}>
                    <SelectTrigger className={`${
                      isDarkMode 
                        ? 'bg-slate-800 border-slate-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-800'
                    }`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className={isDarkMode ? 'bg-slate-800 border-slate-600' : 'bg-white border-gray-200'}>
                      <SelectItem value="usd">USD ($)</SelectItem>
                      <SelectItem value="eur">EUR (€)</SelectItem>
                      <SelectItem value="gbp">GBP (£)</SelectItem>
                      <SelectItem value="jpy">JPY (¥)</SelectItem>
                      <SelectItem value="cad">CAD (C$)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label className={isDarkMode ? 'text-slate-300' : 'text-gray-700'}>Timezone</Label>
                  <Select value={timezone} onValueChange={handleTimezoneChange}>
                    <SelectTrigger className={`${
                      isDarkMode 
                        ? 'bg-slate-800 border-slate-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-800'
                    }`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className={isDarkMode ? 'bg-slate-800 border-slate-600' : 'bg-white border-gray-200'}>
                      <SelectItem value="utc">UTC</SelectItem>
                      <SelectItem value="est">EST</SelectItem>
                      <SelectItem value="pst">PST</SelectItem>
                      <SelectItem value="cet">CET</SelectItem>
                      <SelectItem value="jst">JST</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className={isDarkMode ? 'text-slate-300' : 'text-gray-700'}>Auto Refresh Data</Label>
                    <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                      Automatically update market data every 30 seconds
                    </p>
                  </div>
                  <Switch 
                    checked={autoRefresh} 
                    onCheckedChange={handleAutoRefreshToggle}
                    className="data-[state=checked]:bg-blue-600"
                  />
                </div>
                
                <Button 
                  onClick={() => {
                    toast({
                      title: "Preferences Saved",
                      description: "Your preferences have been updated successfully",
                    });
                  }}
                  className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Save Preferences
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default AppearanceSettings;












