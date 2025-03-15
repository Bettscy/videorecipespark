
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getRecipeById } from '../services/recipeService';
import Navbar from '../components/Navbar';
import RecipeVideo from '../components/RecipeVideo';
import IngredientsList from '../components/IngredientsList';
import RecipeChart from '../components/RecipeChart';
import RecipeRating from '../components/RecipeRating';
import { Clock, Users, ChevronLeft, Loader } from 'lucide-react';

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [recipe, setRecipe] = useState<any>(null);
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [nutrition, setNutrition] = useState({ calories: 0, protein: 0, fat: 0, carbs: 0 });
  
  useEffect(() => {
    const fetchRecipeDetails = async () => {
      if (!id) return;
      
      setIsLoading(true);
      try {
        const { recipe, ingredients, nutrition } = await getRecipeById(id);
        if (recipe) {
          setRecipe(recipe);
          setIngredients(ingredients);
          setNutrition(nutrition);
        }
      } catch (error) {
        console.error('Error fetching recipe details:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRecipeDetails();
  }, [id]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-screen">
          <Loader className="w-12 h-12 text-primary animate-spin mb-4" />
          <p className="text-muted-foreground">Loading recipe...</p>
        </div>
      </div>
    );
  }
  
  if (!recipe) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 pb-16 max-w-3xl">
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold mb-4">Recipe not found</h2>
            <p className="text-muted-foreground mb-8">
              The recipe you're looking for doesn't exist or has been removed.
            </p>
            <Link 
              to="/"
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Go back to home
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-16 max-w-7xl">
        <div className="mb-6 animate-fade-in">
          <Link 
            to="/"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to search results
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="animate-fade-in">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
                {recipe.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 mb-6 text-muted-foreground">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>{recipe.readyInMinutes} minutes</span>
                </div>
                
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  <span>{recipe.servings} servings</span>
                </div>
              </div>
            </div>
            
            <div className="animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <RecipeVideo recipeId={recipe.id} title={recipe.title} />
            </div>
            
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <RecipeChart nutrition={nutrition} />
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="animate-slide-up" style={{ animationDelay: '0.15s' }}>
              <div className="p-5 rounded-2xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/30 shadow-md">
                <h3 className="text-lg font-medium mb-6">Ingredients</h3>
                <IngredientsList ingredients={ingredients} />
              </div>
            </div>
            
            <div className="animate-slide-up" style={{ animationDelay: '0.25s' }}>
              <RecipeRating initialRating={4.5} totalRatings={128} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecipeDetail;
