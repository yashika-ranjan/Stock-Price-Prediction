import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface StockChartProps {
  data: {
    dates: string[];
    actualPrices: number[];
    predictedPrices: number[];
  } | null;
  stockSymbol: string;
}

const StockChart: React.FC<StockChartProps> = ({ data, stockSymbol }) => {
  if (!data || data.dates.length === 0) {
    return (
      <div className="text-center text-gray-400 py-20">
        No data available for chart visualization.
      </div>
    );
  }

  // Transform data for the chart
  const chartData = data.dates.map((date, index) => ({
    date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    actual: data.actualPrices[index] || null,
    predicted: data.predictedPrices[index] || null,
  }));

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900/95 backdrop-blur-sm border border-slate-700 rounded-lg p-4 shadow-2xl">
          <p className="text-white font-bold mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center space-x-2 mb-1">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-slate-300 text-sm">
                {entry.dataKey === 'actual' ? 'Actual Price' : 'Predicted Price'}: 
              </span>
              <span className="text-white font-bold">
                ${entry.value?.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData}>
        <CartesianGrid 
          strokeDasharray="3 3" 
          stroke="#6b7280" 
          opacity={0.3}
        />
        <XAxis 
          dataKey="date" 
          stroke="#9ca3af"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis 
          stroke="#9ca3af"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          domain={['dataMin - 10', 'dataMax + 10']}
          tickFormatter={(value: number) => `$${value.toFixed(0)}`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend 
          wrapperStyle={{ 
            paddingTop: '20px',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
        />
        <Line 
          type="monotone" 
          dataKey="actual" 
          stroke="#ef4444" 
          strokeWidth={2}
          dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
          name="Actual Price"
          connectNulls={false}
        />
        <Line 
          type="monotone" 
          dataKey="predicted" 
          stroke="#3b82f6" 
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
          name="Predicted Price"
          connectNulls={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default StockChart;
