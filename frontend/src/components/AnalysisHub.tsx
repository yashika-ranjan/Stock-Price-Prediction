
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Brain, BarChart3, Calendar, Zap, ArrowRight, Rocket } from 'lucide-react';
import FileUpload from './FileUpload';

interface AnalysisHubProps {
  stockSymbol: string;
  setStockSymbol: (value: string) => void;
  predictionDays: number[];
  setPredictionDays: (value: number[]) => void;
  selectedModel: string;
  setSelectedModel: (value: string) => void;
  uploadedFile: any;
  setUploadedFile: (value: any) => void;
  onPredict: () => void;
  isLoading: boolean;
  isDarkMode: boolean;
}

const AnalysisHub: React.FC<AnalysisHubProps> = ({
  stockSymbol,
  setStockSymbol,
  predictionDays,
  setPredictionDays,
  selectedModel,
  setSelectedModel,
  uploadedFile,
  setUploadedFile,
  onPredict,
  isLoading,
  isDarkMode
}) => {
  return (
    <Card className={`relative backdrop-blur-2xl border shadow-2xl hover:shadow-violet-500/20 transition-all duration-700 group overflow-hidden animate-fade-in hover:-translate-y-1 hover:scale-[1.01] ${
      isDarkMode 
        ? 'bg-white/5 border-white/10' 
        : 'bg-white/80 border-gray-200/30'
    }`}>
      {/* Subtle inner glow */}
      <div className={`absolute inset-[1px] rounded-lg ${
        isDarkMode 
          ? 'bg-gradient-to-br from-white/5 via-transparent to-white/3' 
          : 'bg-gradient-to-br from-white/10 via-transparent to-gray-100/5'
      }`}></div>
      
      <CardHeader className="pb-4 lg:pb-6 relative z-10">
        <CardTitle className={`text-xl lg:text-2xl font-black flex items-center space-x-3 group-hover:scale-105 transition-transform duration-500 ${
          isDarkMode ? 'text-white' : 'text-gray-800'
        }`}>
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 via-purple-500 to-cyan-500 rounded-lg blur-sm opacity-40 animate-pulse group-hover:opacity-70"></div>
            <div className="relative p-2 lg:p-3 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 rounded-lg shadow-2xl group-hover:rotate-3 transition-transform duration-500">
              <Brain className="h-5 w-5 lg:h-6 lg:w-6 text-white drop-shadow-lg" />
            </div>
          </div>
          <div>
            <span className={isDarkMode 
              ? 'bg-gradient-to-r from-violet-200 via-purple-200 to-cyan-200 bg-clip-text text-transparent'
              : 'bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent'
            }>
              Analysis Hub
            </span>
            <div className={`text-xs font-normal mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
              isDarkMode ? 'text-slate-400' : 'text-gray-500'
            }`}>Advanced AI Controls</div>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6 lg:space-y-8 relative z-10 px-6">
        {/* Stock Symbol */}
        <div className="space-y-3 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <Label className={`text-sm font-bold flex items-center space-x-2 ${
            isDarkMode ? 'text-slate-200' : 'text-gray-700'
          }`}>
            <div className="p-1.5 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 rounded-md border border-blue-400/30 animate-pulse">
              <BarChart3 className="h-4 w-4 text-blue-300" />
            </div>
            <span>Stock Symbol</span>
          </Label>
          <Input
            value={stockSymbol}
            onChange={(e) => setStockSymbol(e.target.value.toUpperCase())}
            placeholder="Enter symbol"
            className={`text-center font-mono text-lg font-black border-2 hover:border-violet-400/50 focus:border-violet-400 focus:ring-violet-400/30 transition-all duration-500 h-12 rounded-lg shadow-lg hover:shadow-violet-500/25 placeholder:text-slate-400 hover:scale-105 focus:scale-105 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-slate-800/80 to-slate-700/80 border-slate-600/50 text-white'
                : 'bg-gradient-to-r from-white/90 to-gray-50/90 border-gray-300/50 text-gray-800'
            }`}
          />
          <div className="grid grid-cols-3 gap-2">
            {['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'NVDA', 'META'].map((symbol, index) => (
              <button
                key={symbol}
                onClick={() => setStockSymbol(symbol)}
                className={`px-3 py-2 text-xs font-black rounded-md transition-all duration-300 border shadow-md hover:shadow-lg transform hover:scale-110 hover:-translate-y-1 animate-fade-in ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-slate-700/50 to-slate-600/50 hover:from-violet-600/30 hover:to-purple-600/30 text-slate-200 hover:text-white border-slate-600/30 hover:border-violet-400/50'
                    : 'bg-gradient-to-r from-white/70 to-gray-100/70 hover:from-violet-100/80 hover:to-purple-100/80 text-gray-700 hover:text-gray-900 border-gray-200/30 hover:border-violet-300/50'
                }`}
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                {symbol}
              </button>
            ))}
          </div>
        </div>

        {/* Prediction Days */}
        <div className="space-y-3 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <Label className={`text-sm font-bold flex items-center space-x-2 ${
            isDarkMode ? 'text-slate-200' : 'text-gray-700'
          }`}>
            <div className="p-1.5 bg-gradient-to-br from-emerald-600/20 to-teal-600/20 rounded-md border border-emerald-400/30 animate-pulse">
              <Calendar className="h-4 w-4 text-emerald-300" />
            </div>
            <span>Forecast Period</span>
          </Label>
          <div className="text-center mb-2">
            <span className="text-3xl font-black text-transparent bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text animate-pulse">
              {predictionDays[0]}
            </span>
            <span className={`text-sm ml-2 font-bold ${
              isDarkMode ? 'text-slate-400' : 'text-gray-500'
            }`}>days</span>
          </div>
          <div className={`p-4 rounded-lg border shadow-inner backdrop-blur-sm relative overflow-hidden group/slider ${
            isDarkMode 
              ? 'bg-gradient-to-r from-slate-800/50 to-slate-700/50 border-slate-600/30'
              : 'bg-gradient-to-r from-white/50 to-gray-50/50 border-gray-200/30'
          }`}>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/5 to-transparent opacity-0 group-hover/slider:opacity-100 transition-opacity duration-500"></div>
            
            <Slider
              value={predictionDays}
              onValueChange={setPredictionDays}
              max={30}
              min={1}
              step={1}
              className="py-2 relative z-10 group-hover/slider:scale-105 transition-transform duration-300"
            />
            <div className={`flex justify-between text-xs font-bold mt-3 ${
              isDarkMode ? 'text-slate-400' : 'text-gray-500'
            }`}>
              <span className="group-hover/slider:text-violet-300 transition-colors duration-300">1 day</span>
              <span className="group-hover/slider:text-cyan-300 transition-colors duration-300">15 days</span>
              <span className="group-hover/slider:text-emerald-300 transition-colors duration-300">30 days</span>
            </div>
          </div>
        </div>


        {/* Model Selection */}
        <div className="space-y-3 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <Label className={`text-sm font-bold flex items-center space-x-2 ${
            isDarkMode ? 'text-slate-200' : 'text-gray-700'
          }`}>
            <div className="p-1.5 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-md border border-purple-400/30 animate-pulse">
              <Zap className="h-4 w-4 text-purple-300" />
            </div>
            <span>AI Model</span>
          </Label>

          <Select value={selectedModel} onValueChange={setSelectedModel}>
            <SelectTrigger
              className={`border-2 hover:border-purple-400/50 focus:border-purple-400 h-12 text-sm rounded-lg shadow-lg hover:shadow-purple-500/25 transition-all duration-500 hover:scale-105 ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-slate-800/80 to-slate-700/80 border-slate-600/50 text-white'
                  : 'bg-gradient-to-r from-white/90 to-gray-50/90 border-gray-300/50 text-gray-800'
              }`}
            >
              {selectedModel ? (
                <span className="text-sm font-semibold">
                  {selectedModel === 'xgboost' ? 'XGBoost' : 'LSTM Neural Network'}
                </span>
              ) : (
                <span className="text-sm text-gray-400 italic">Select AI model</span>
              )}
            </SelectTrigger>

            <SelectContent
              className={`backdrop-blur-2xl border shadow-2xl rounded-lg ${
                isDarkMode 
                  ? 'bg-slate-900/95 border-slate-600'
                  : 'bg-white/95 border-gray-200'
              }`}
            >
              <SelectItem
                value="xgboost"
                className="py-3 hover:bg-gradient-to-r hover:from-emerald-600/20 hover:to-teal-600/20 rounded-md m-1 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full shadow-lg animate-pulse"></div>
                  <div>
                    <div className={`font-black text-sm ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>XGBoost</div>
                    <div className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Gradient Boosting • Lightning Fast</div>
                  </div>
                </div>
              </SelectItem>

              <SelectItem
                value="lstm"
                className="py-3 hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-pink-600/20 rounded-md m-1 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full shadow-lg animate-pulse"></div>
                  <div>
                    <div className={`font-black text-sm ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>LSTM Neural Network</div>
                    <div className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>Deep Learning • Pattern Recognition</div>
                  </div>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* File Upload */}
        <div className="animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <FileUpload onFileUpload={setUploadedFile} />
        </div>





        {/* Analyze button */}
        <Button 
          onClick={onPredict}
          disabled={isLoading}
          className="w-full h-16 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:via-purple-500 hover:to-indigo-500 text-white text-lg font-black transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-2xl hover:shadow-violet-500/50 border-0 relative overflow-hidden group rounded-lg animate-fade-in"
          style={{ animationDelay: '1s' }}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          
          {isLoading ? (
            <div className="flex items-center space-x-3 relative z-10">
              <div className="w-4 h-4 border-4 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Analyzing...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-3 relative z-10">
              <Rocket className="h-4 w-4 animate-bounce group-hover:scale-125 transition-transform duration-300" />
              <span>Generate AI Forecast</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform duration-300" />
            </div>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AnalysisHub;


















