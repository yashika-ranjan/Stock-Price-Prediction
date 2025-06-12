
import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import Header from '../components/Header';
import BackgroundPattern from '../components/BackgroundPattern';
import AnalysisHub from '../components/AnalysisHub';
import LiveAnalytics from '../components/LiveAnalytics';
import ResultsPanel from '../components/ResultPanel';

type PredictionData = {
  dates: string[];
  actualPrices: number[];
  predictedPrices: number[];
  metrics: {
    rmse: string;
    mae: string;
    accuracy: string;
  };
};

const Index = () => {
  const { toast } = useToast(); 

  const [stockSymbol, setStockSymbol] = useState('AAPL');
  const [predictionDays, setPredictionDays] = useState([10]);
  const [selectedModel, setSelectedModel] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [predictions, setPredictions] = useState<PredictionData | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : true;
  });

  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(() => {
    const saved = localStorage.getItem('notificationsEnabled');
    return saved ? JSON.parse(saved) : true;
  });

  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'english');
  const [currency, setCurrency] = useState(() => localStorage.getItem('currency') || 'usd');
  const [timezone, setTimezone] = useState(() => localStorage.getItem('timezone') || 'utc');
  const [autoRefresh, setAutoRefresh] = useState(() => {
    const saved = localStorage.getItem('autoRefresh');
    return saved ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('notificationsEnabled', JSON.stringify(isNotificationsEnabled));
  }, [isNotificationsEnabled]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('currency', currency);
  }, [currency]);

  useEffect(() => {
    localStorage.setItem('timezone', timezone);
  }, [timezone]);

  useEffect(() => {
    localStorage.setItem('autoRefresh', JSON.stringify(autoRefresh));
  }, [autoRefresh]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#0f172a';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#f8fafc';
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (autoRefresh && predictions) {
      const interval = setInterval(() => {
        if (isNotificationsEnabled) {
          toast({
            title: "Data Refreshed",
            description: "Market data has been automatically updated",
          });
        }
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, predictions, isNotificationsEnabled]);

  const handlePredict = async () => {
    if (!selectedModel) {
      toast({
        title: "Model Required",
        description: "Please select a prediction model (XGBoost or LSTM)",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const mockPredictions: PredictionData = {
        dates: Array.from({ length: predictionDays[0] }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() + i + 1);
          return date.toISOString().split('T')[0];
        }),
        actualPrices: Array.from({ length: predictionDays[0] }, () => 150 + Math.random() * 50),
        predictedPrices: Array.from({ length: predictionDays[0] }, () => 148 + Math.random() * 54),
        metrics: {
          rmse: (Math.random() * 5 + 2).toFixed(2),
          mae: (Math.random() * 3 + 1).toFixed(2),
          accuracy: (85 + Math.random() * 10).toFixed(1),
        }
      };

      setPredictions(mockPredictions);
      setIsLoading(false);

      if (isNotificationsEnabled) {
        toast({
          title: "Analysis Complete",
          description: `Successfully analyzed ${predictionDays[0]} days for ${stockSymbol}`,
        });
      }
    }, 2000);
  };

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900' 
        : 'bg-gradient-to-br from-slate-100 via-gray-100 to-zinc-100'
    }`}>
      <BackgroundPattern isDarkMode={isDarkMode} />
      <Header 
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

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12 relative z-10">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-8">
          <div className="xl:col-span-4 space-y-6 lg:space-y-8">
            <AnalysisHub
              stockSymbol={stockSymbol}
              setStockSymbol={setStockSymbol}
              predictionDays={predictionDays}
              setPredictionDays={setPredictionDays}
              selectedModel={selectedModel}
              setSelectedModel={setSelectedModel}
              uploadedFile={uploadedFile}
              setUploadedFile={setUploadedFile}
              onPredict={handlePredict}
              isLoading={isLoading}
              isDarkMode={isDarkMode}
            />
            <LiveAnalytics isDarkMode={isDarkMode} currency={currency} />
          </div>

          <div className="xl:col-span-8">
            <ResultsPanel 
              predictions={predictions} 
              stockSymbol={stockSymbol} 
              isDarkMode={isDarkMode}
              currency={currency}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;













