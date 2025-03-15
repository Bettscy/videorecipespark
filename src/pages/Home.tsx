
import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import RecipeCard, { Recipe } from '../components/RecipeCard';
import { searchRecipesByIngredients } from '../services/recipeService';
import Navbar from '../components/Navbar';
import { CookingPot, Search, Loader } from 'lucide-react';

const Home = () => {
  const [searchResults, setSearchResults] = useState<Recipe[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = async (query: string) => {
    setIsSearching(true);
    setSearchQuery(query);
    setHasSearched(true);
    
    try {
      const results = await searchRecipesByIngredients(query);
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching recipes:', error);
    } finally {
      setIsSearching(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-16 max-w-7xl">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Turn your ingredients into culinary magic
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Search for ingredients you have on hand and discover AI-generated recipes complete with instruction videos.
          </p>
        </div>
        
        <div className="mb-16 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <SearchBar onSearch={handleSearch} />
        </div>
        
        <div className="mb-16 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          {isSearching ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader className="w-10 h-10 text-primary animate-spin mb-4" />
              <p className="text-muted-foreground">Searching for delicious recipes...</p>
            </div>
          ) : (
            <>
              {hasSearched && (
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold mb-2">
                    {searchResults.length > 0 
                      ? `Recipes with "${searchQuery}"`
                      : `No recipes found with "${searchQuery}"`}
                  </h2>
                  {searchResults.length > 0 && (
                    <p className="text-muted-foreground">
                      Found {searchResults.length} {searchResults.length === 1 ? 'recipe' : 'recipes'} that match your ingredients
                    </p>
                  )}
                </div>
              )}
              
              {searchResults.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {searchResults.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                  ))}
                </div>
              ) : (
                <>
                  {!hasSearched ? (
                    <div className="flex flex-col items-center justify-center text-center py-12">
                      <div className="p-4 rounded-full bg-primary/10 mb-6">
                        <Search className="w-12 h-12 text-primary" />
                      </div>
                      <h2 className="text-2xl font-semibold mb-2">Search for ingredients</h2>
                      <p className="text-muted-foreground max-w-md">
                        Enter ingredients you have, separated by commas, to find matching recipes
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center py-12">
                      <div className="p-4 rounded-full bg-amber-100 dark:bg-amber-900/20 mb-6">
                        <CookingPot className="w-12 h-12 text-amber-600 dark:text-amber-400" />
                      </div>
                      <h2 className="text-2xl font-semibold mb-2">No matching recipes found</h2>
                      <p className="text-muted-foreground max-w-md">
                        Try searching with different ingredients or fewer specific terms
                      </p>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
