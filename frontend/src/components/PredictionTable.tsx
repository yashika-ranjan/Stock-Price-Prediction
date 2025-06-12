

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BarChart3 } from 'lucide-react';

interface PredictionTableProps {
  data: {
    dates: string[];
    actualPrices: number[];
    predictedPrices: number[];
  } | null;
}

const PredictionTable: React.FC<PredictionTableProps> = ({ data }) => {
  const hasValidData =
    data &&
    Array.isArray(data.dates) &&
    Array.isArray(data.actualPrices) &&
    Array.isArray(data.predictedPrices) &&
    data.dates.length > 0 &&
    data.actualPrices.length === data.dates.length &&
    data.predictedPrices.length === data.dates.length;

  if (!hasValidData) {
    return (
      <Card className="backdrop-blur-2xl bg-white/5 border border-white/10 shadow-2xl">
        <CardContent className="py-20">
          <div className="text-center text-gray-400">
            No forecast data available.
          </div>
        </CardContent>
      </Card>
    );
  }

  const tableData = data!.dates.map((date, index) => {
    const actualPrice = data!.actualPrices[index];
    const predictedPrice = data!.predictedPrices[index];
    const variance =
      actualPrice && predictedPrice
        ? (((predictedPrice - actualPrice) / actualPrice) * 100).toFixed(1)
        : '0.0';
    const isPositive = parseFloat(variance) >= 0;

    return {
      date: new Date(date).toLocaleDateString('en-US', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
      }),
      actualPrice: actualPrice?.toFixed(2) || 'N/A',
      predictedPrice: predictedPrice?.toFixed(2) || 'N/A',
      variance,
      isPositive,
    };
  });

  return (
    <Card className="backdrop-blur-2xl bg-white/5 dark:bg-white/5 border border-white/10 shadow-2xl">
      <div className="absolute inset-[1px] bg-gradient-to-br from-white/5 via-transparent to-white/3 rounded-lg"></div>
      <CardHeader className="relative z-10 p-6">
        <CardTitle className="text-xl font-black text-slate-800 dark:text-white flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-lg border border-purple-400/30">
            <BarChart3 className="h-5 w-5 text-purple-500 dark:text-purple-300" />
          </div>
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-200 dark:to-pink-200 bg-clip-text text-transparent">
            Forecast Details
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 relative z-10">
        <div className="rounded-lg border border-slate-300 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-inner overflow-hidden">
          <div className="max-h-96 overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-300 dark:border-gray-700 bg-slate-100/50 dark:bg-gray-700/50">
                  <TableHead className="text-slate-700 dark:text-gray-300 font-bold">Date</TableHead>
                  <TableHead className="text-slate-700 dark:text-gray-300 font-bold">Actual Price</TableHead>
                  <TableHead className="text-slate-700 dark:text-gray-300 font-bold">Predicted</TableHead>
                  <TableHead className="text-slate-700 dark:text-gray-300 font-bold">Variance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableData.map((item, index) => (
                  <TableRow
                    key={index}
                    className="border-slate-300 dark:border-gray-700 hover:bg-slate-100/30 dark:hover:bg-gray-700/30 transition-colors duration-200"
                  >
                    <TableCell className="text-slate-800 dark:text-white font-medium">
                      {item.date}
                    </TableCell>
                    <TableCell className="text-slate-800 dark:text-white font-bold">
                      ${item.actualPrice}
                    </TableCell>
                    <TableCell className="text-slate-800 dark:text-white font-bold">
                      ${item.predictedPrice}
                    </TableCell>
                    <TableCell>
                      <div
                        className={`flex items-center space-x-2 ${
                          item.isPositive
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-red-600 dark:text-red-400'
                        }`}
                      >
                        <span className="text-lg font-bold">
                          {item.isPositive ? '↗' : '↘'}
                        </span>
                        <span className="font-bold">
                          {item.isPositive ? '+' : ''}
                          {item.variance}%
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PredictionTable;
