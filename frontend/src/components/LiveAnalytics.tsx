
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Activity, DollarSign } from 'lucide-react';

interface LiveAnalyticsProps {
  isDarkMode: boolean;
  currency?: string;
}

const LiveAnalytics: React.FC<LiveAnalyticsProps> = ({ isDarkMode, currency = 'usd' }) => {
  const getCurrencySymbol = (curr: string) => {
    const symbols: { [key: string]: string } = {
      usd: '$',
      eur: '€',
      gbp: '£',
      jpy: '¥',
      cad: 'C$'
    };
    return symbols[curr] || '$';
  };

  const currencySymbol = getCurrencySymbol(currency);

  const metrics = [
    {
      title: 'Market Cap',
      value: `${currencySymbol}2.8T`,
      change: '+2.4%',
      isPositive: true,
      icon: DollarSign,
      color: 'emerald'
    },
    {
      title: 'Volume',
      value: `${currencySymbol}89.2B`,
      change: '-1.2%',
      isPositive: false,
      icon: Activity,
      color: 'blue'
    },
    {
      title: 'VIX',
      value: '18.4',
      change: '+0.8%',
      isPositive: true,
      icon: TrendingUp,
      color: 'purple'
    }
  ];

  return (
    <Card className={`backdrop-blur-2xl border shadow-2xl hover:shadow-emerald-500/20 transition-all duration-700 group overflow-hidden animate-fade-in hover:-translate-y-1 hover:scale-[1.01] ${
      isDarkMode 
        ? 'bg-white/5 border-white/10' 
        : 'bg-white/80 border-gray-200/30'
    }`}>
      <div className={`absolute inset-[1px] rounded-lg ${
        isDarkMode 
          ? 'bg-gradient-to-br from-white/5 via-transparent to-white/3' 
          : 'bg-gradient-to-br from-white/10 via-transparent to-gray-100/5'
      }`}></div>
      
      <CardHeader className="pb-4 relative z-10">
        <CardTitle className={`text-lg font-black flex items-center space-x-3 group-hover:scale-105 transition-transform duration-500 ${
          isDarkMode ? 'text-white' : 'text-gray-800'
        }`}>
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-lg blur-sm opacity-40 animate-pulse group-hover:opacity-70"></div>
            <div className="relative p-2 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 rounded-lg shadow-2xl group-hover:rotate-3 transition-transform duration-500">
              <Activity className="h-4 w-4 text-white drop-shadow-lg" />
            </div>
          </div>
          <div>
            <span className={isDarkMode 
              ? 'bg-gradient-to-r from-emerald-200 via-teal-200 to-cyan-200 bg-clip-text text-transparent'
              : 'bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent'
            }>
              Live Analytics
            </span>
            <div className={`text-xs font-normal mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
              isDarkMode ? 'text-slate-400' : 'text-gray-500'
            }`}>Real-time Market Data</div>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4 relative z-10">
        {metrics.map((metric, index) => (
          <div 
            key={metric.title}
            className={`p-4 rounded-lg border backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-lg animate-fade-in group/metric ${
              isDarkMode 
                ? 'bg-gradient-to-r from-slate-800/50 to-slate-700/50 border-slate-600/30 hover:border-slate-500/50'
                : 'bg-gradient-to-r from-white/50 to-gray-50/50 border-gray-200/30 hover:border-gray-300/50'
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg bg-gradient-to-br from-${metric.color}-600/20 to-${metric.color}-600/20 border border-${metric.color}-400/30 group-hover/metric:scale-110 transition-transform duration-300`}>
                  <metric.icon className={`h-4 w-4 text-${metric.color}-300`} />
                </div>
                <div>
                  <p className={`text-sm font-bold ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                    {metric.title}
                  </p>
                  <p className={`text-lg font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {metric.value}
                  </p>
                </div>
              </div>
              <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-bold transition-all duration-300 group-hover/metric:scale-110 ${
                metric.isPositive 
                  ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-400/30' 
                  : 'bg-red-600/20 text-red-300 border border-red-400/30'
              }`}>
                {metric.isPositive ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                <span>{metric.change}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default LiveAnalytics;