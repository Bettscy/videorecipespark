
import React from 'react';
import { Check, X } from 'lucide-react';

export interface Ingredient {
  id: number;
  name: string;
  amount: number;
  unit: string;
  original: string;
  isAvailable: boolean;
}

interface IngredientsListProps {
  ingredients: Ingredient[];
}

const IngredientsList: React.FC<IngredientsListProps> = ({ ingredients }) => {
  const availableIngredients = ingredients.filter(ing => ing.isAvailable);
  const missingIngredients = ingredients.filter(ing => !ing.isAvailable);
  
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Ingredients You Have</h3>
        {availableIngredients.length > 0 ? (
          <ul className="space-y-2">
            {availableIngredients.map((ingredient) => (
              <li 
                key={ingredient.id} 
                className="flex items-center p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800/30"
              >
                <div className="flex-shrink-0 mr-3">
                  <div className="p-1 rounded-full bg-green-100 dark:bg-green-800/60">
                    <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-green-800 dark:text-green-300">
                    {ingredient.original}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">No matched ingredients found.</p>
        )}
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Missing Ingredients</h3>
        {missingIngredients.length > 0 ? (
          <ul className="space-y-2">
            {missingIngredients.map((ingredient) => (
              <li 
                key={ingredient.id} 
                className="flex items-center p-3 rounded-lg bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-800/20"
              >
                <div className="flex-shrink-0 mr-3">
                  <div className="p-1 rounded-full bg-amber-100 dark:bg-amber-800/40">
                    <X className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
                    {ingredient.original}
                  </p>
                </div>
                <button className="px-2.5 py-1 text-xs rounded-full border border-amber-200 dark:border-amber-700 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-800/30 transition-colors">
                  Add to list
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">You have all the ingredients!</p>
        )}
      </div>
    </div>
  );
};

export default IngredientsList;
