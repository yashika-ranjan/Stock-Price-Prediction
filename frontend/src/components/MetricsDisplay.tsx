
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Activity, Target } from 'lucide-react';

interface MetricsDisplayProps {
  metrics: {
    rmse: string;
    mae: string;
    accuracy: string;
  } | null;
}

const MetricsDisplay: React.FC<MetricsDisplayProps> = ({ metrics }) => {
  if (!metrics) {
    return (
      <Card className="backdrop-blur-2xl bg-white/5 border border-white/10 shadow-2xl">
        <CardContent className="py-20">
          <div className="text-center text-gray-400">
            No metrics available.
          </div>
        </CardContent>
      </Card>
    );
  }

  const metricsData = [
    {
      key: 'rmse',
      title: 'RMSE',
      subtitle: 'Root Mean Square Error',
      value: metrics.rmse,
      icon: Activity,
      bgColor: 'from-red-500/20 to-red-600/30',
      iconBgColor: 'bg-red-500',
      textColor: 'text-red-600 dark:text-red-400'
    },
    {
      key: 'mae',
      title: 'MAE',
      subtitle: 'Mean Absolute Error',
      value: metrics.mae,
      icon: Target,
      bgColor: 'from-orange-500/20 to-orange-600/30',
      iconBgColor: 'bg-orange-500',
      textColor: 'text-orange-600 dark:text-orange-400'
    },
    {
      key: 'accuracy',
      title: 'Accuracy',
      subtitle: 'Prediction Accuracy',
      value: `${metrics.accuracy}%`,
      icon: BarChart3,
      bgColor: 'from-green-500/20 to-green-600/30',
      iconBgColor: 'bg-green-500',
      textColor: 'text-green-600 dark:text-green-400'
    }
  ];

  return (
    <Card className="backdrop-blur-2xl bg-white/5 dark:bg-white/5 border border-white/10 shadow-2xl">
      <div className="absolute inset-[1px] bg-gradient-to-br from-white/5 via-transparent to-white/3 rounded-lg"></div>
      <CardHeader className="relative z-10 p-6">
        <CardTitle className="text-xl font-black text-slate-800 dark:text-white flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 rounded-lg border border-blue-400/30">
            <BarChart3 className="h-5 w-5 text-blue-500 dark:text-blue-300" />
          </div>
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-200 dark:to-indigo-200 bg-clip-text text-transparent">
            Performance Metrics
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 relative z-10 p-6">
        {metricsData.map((metric, index) => (
          <div 
            key={metric.key}
            className={`bg-gradient-to-r ${metric.bgColor} rounded-xl p-4 border border-white/10 backdrop-blur-sm hover:scale-105 transition-all duration-300 shadow-lg`}
          >
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 ${metric.iconBgColor} rounded-xl flex items-center justify-center shadow-lg`}>
                <metric.icon className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-slate-800 dark:text-white font-bold text-lg">
                      {metric.title}
                    </div>
                    <div className="text-slate-600 dark:text-slate-300 text-sm">
                      {metric.subtitle}
                    </div>
                  </div>
                  <div className={`text-3xl font-black ${metric.textColor}`}>
                    {metric.value}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Performance Analysis Section */}
        <div className="bg-gradient-to-r from-blue-500/20 to-indigo-600/30 rounded-xl p-4 mt-6 border border-blue-400/30 backdrop-blur-sm">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <Activity className="h-4 w-4 text-white" />
            </div>
            <div className="text-slate-800 dark:text-white font-bold">Performance Analysis</div>
          </div>
          <div className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
            Lower RMSE and MAE values indicate higher model precision and accuracy. 
            Our AI models consistently achieve accuracy rates above 90% for reliable trading insights.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricsDisplay;