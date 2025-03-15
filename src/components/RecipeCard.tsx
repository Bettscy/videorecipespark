
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, Star } from 'lucide-react';

export interface Recipe {
  id: string;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  aggregateLikes: number;
  matchedIngredients: string[];
  missingIngredients: string[];
}

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <Link 
      to={`/recipe/${recipe.id}`}
      className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-900 shadow-md hover:shadow-xl transition-all duration-300 scale-hover"
    >
      <div className="aspect-video overflow-hidden rounded-t-2xl">
        <img 
          src={recipe.image} 
          alt={recipe.title}
          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105 image-hover"
          loading="lazy"
        />
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-semibold line-clamp-2 text-balance mb-3 group-hover:text-primary transition-colors">
          {recipe.title}
        </h3>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="w-4 h-4 mr-1" />
            <span>{recipe.readyInMinutes} min</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="w-4 h-4 mr-1" />
            <span>{recipe.servings} servings</span>
          </div>
          
          <div className="flex items-center text-sm text-amber-500">
            <Star className="w-4 h-4 mr-1 fill-amber-500" />
            <span>{recipe.aggregateLikes}</span>
          </div>
        </div>
        
        {recipe.matchedIngredients.length > 0 && (
          <div className="mb-3">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Matched Ingredients:</p>
            <div className="flex flex-wrap gap-1">
              {recipe.matchedIngredients.slice(0, 3).map((ingredient, index) => (
                <span 
                  key={index} 
                  className="px-2 py-1 text-xs rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100"
                >
                  {ingredient}
                </span>
              ))}
              {recipe.matchedIngredients.length > 3 && (
                <span className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                  +{recipe.matchedIngredients.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
        
        {recipe.missingIngredients.length > 0 && (
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Missing Ingredients:</p>
            <div className="flex flex-wrap gap-1">
              {recipe.missingIngredients.slice(0, 2).map((ingredient, index) => (
                <span 
                  key={index} 
                  className="px-2 py-1 text-xs rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-100"
                >
                  {ingredient}
                </span>
              ))}
              {recipe.missingIngredients.length > 2 && (
                <span className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                  +{recipe.missingIngredients.length - 2} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>
      
      <div className="absolute top-3 right-3">
        <div className="p-1.5 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-md shadow-md">
          <Star className="w-5 h-5 text-gray-400 hover:text-amber-500 cursor-pointer transition-colors" />
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
