
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface NutritionData {
  name: string;
  value: number;
  color: string;
}

interface RecipeChartProps {
  nutrition: {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
  };
}

const RecipeChart: React.FC<RecipeChartProps> = ({ nutrition }) => {
  const data: NutritionData[] = [
    { name: 'Protein', value: nutrition.protein, color: '#4ade80' },
    { name: 'Fat', value: nutrition.fat, color: '#f43f5e' },
    { name: 'Carbs', value: nutrition.carbs, color: '#60a5fa' },
  ];
  
  return (
    <div className="p-5 rounded-2xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/30 shadow-md animate-scale-in">
      <h3 className="text-lg font-medium mb-4">Nutritional Information</h3>
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="w-full md:w-1/2 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value}g`, '']}
                contentStyle={{ 
                  borderRadius: '0.5rem', 
                  border: 'none', 
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  padding: '0.75rem'
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="w-full md:w-1/2 space-y-4">
          <div className="p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/30 dark:border-gray-700/30 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Calories</p>
            <p className="text-2xl font-semibold">{nutrition.calories} kcal</p>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800/30 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Protein</p>
              <p className="text-lg font-medium text-green-700 dark:text-green-400">{nutrition.protein}g</p>
            </div>
            
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/30 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Fat</p>
              <p className="text-lg font-medium text-red-700 dark:text-red-400">{nutrition.fat}g</p>
            </div>
            
            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Carbs</p>
              <p className="text-lg font-medium text-blue-700 dark:text-blue-400">{nutrition.carbs}g</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeChart;
