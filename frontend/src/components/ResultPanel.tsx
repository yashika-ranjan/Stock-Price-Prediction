
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, BarChart3, Database, Zap } from 'lucide-react';
import StockChart from './StockChart';
import MetricsDisplay from './MetricsDisplay';
import PredictionTable from './PredictionTable';

interface ResultsPanelProps {
  predictions: any;
  stockSymbol: string;
  isDarkMode: boolean;
  currency?: string;
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({ predictions, stockSymbol, isDarkMode, currency = 'usd' }) => {
  if (predictions) {
    return (
      <div className="space-y-6 animate-fade-in">
        {/* Chart card */}
        <Card className={`backdrop-blur-2xl border shadow-2xl hover:shadow-blue-500/20 transition-all duration-700 overflow-hidden hover:-translate-y-1 hover:scale-[1.005] ${
          isDarkMode 
            ? 'bg-white/5 border-white/10' 
            : 'bg-white/80 border-gray-200/30'
        }`}>
          <div className={`absolute inset-[1px] rounded-lg ${
            isDarkMode 
              ? 'bg-gradient-to-br from-white/5 via-transparent to-white/3' 
              : 'bg-gradient-to-br from-white/10 via-transparent to-gray-100/5'
          }`}></div>
          <CardHeader className={`border-b relative z-10 p-6 ${
            isDarkMode ? 'border-white/5' : 'border-gray-200/20'
          }`}>
            <CardTitle className={`text-xl font-black flex items-center space-x-3 hover:scale-105 transition-transform duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              <div className="p-2 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 rounded-lg border border-blue-400/30 animate-pulse">
                <LineChart className="h-5 w-5 text-blue-300" />
              </div>
              <div>
                <span className={isDarkMode 
                  ? 'bg-gradient-to-r from-blue-200 to-indigo-200 bg-clip-text text-transparent'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'
                }>
                  {stockSymbol} Market Forecast
                </span>
                <div className={`text-xs font-normal mt-1 ${
                  isDarkMode ? 'text-slate-400' : 'text-gray-500'
                }`}>AI-Powered Predictions</div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 relative z-10">
            <div className={`h-80 backdrop-blur-sm rounded-lg p-4 shadow-inner border hover:shadow-lg transition-shadow duration-300 ${
              isDarkMode 
                ? 'bg-black/20 border-white/5' 
                : 'bg-gray-50/50 border-gray-200/20'
            }`}>
              <StockChart data={predictions} stockSymbol={stockSymbol} />
            </div>
          </CardContent>
        </Card>

        {/* Metrics and table */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <MetricsDisplay metrics={predictions.metrics} />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <PredictionTable data={predictions} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card className={`backdrop-blur-2xl border shadow-2xl h-full animate-fade-in ${
      isDarkMode 
        ? 'bg-white/5 border-white/10' 
        : 'bg-white/80 border-gray-200/30'
    }`}>
      <CardContent className="py-20 px-6">
        <div className="text-center">
          <div className="mx-auto h-20 w-20 rounded-full bg-gradient-to-br from-violet-600/20 to-purple-600/20 flex items-center justify-center mb-8 shadow-2xl border border-violet-400/30 animate-pulse hover:scale-110 transition-transform duration-500">
            <BarChart3 className="h-10 w-10 text-violet-300" />
          </div>
          <h3 className={`text-2xl font-black mb-4 hover:scale-105 transition-transform duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            Ready for AI Analysis
          </h3>
          <p className={`text-base max-w-md mx-auto mb-8 leading-relaxed ${
            isDarkMode ? 'text-slate-300' : 'text-gray-600'
          }`}>
            Configure your analysis parameters and unleash the power of AI-driven market predictions
          </p>
          <div className={`flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 ${
            isDarkMode ? 'text-slate-400' : 'text-gray-500'
          }`}>
            {[
              { icon: Database, label: 'Real-time Data', color: 'blue', delay: '0.1s' },
              { icon: Zap, label: 'Lightning Fast', color: 'purple', delay: '0.5s' }
            ].map((feature) => (
              <div key={feature.label} className={`flex flex-col items-center space-y-2 group animate-fade-in`} style={{ animationDelay: feature.delay }}>
                <div className={`p-4 bg-gradient-to-br from-${feature.color}-600/20 to-${feature.color}-600/20 rounded-xl group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 border border-${feature.color}-400/30 group-hover:shadow-lg group-hover:shadow-${feature.color}-500/30`}>
                  <feature.icon className={`h-8 w-8 text-${feature.color}-300 group-hover:animate-pulse`} />
                </div>
                <span className="font-bold text-sm group-hover:scale-110 transition-transform duration-300">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsPanel;

