
import { Recipe } from '../components/RecipeCard';
import { Ingredient } from '../components/IngredientsList';

// Mock data - in a real app, this would come from an API
const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Creamy Garlic Parmesan Pasta with Grilled Chicken',
    image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=2070',
    readyInMinutes: 30,
    servings: 4,
    aggregateLikes: 256,
    matchedIngredients: ['pasta', 'chicken', 'parmesan', 'garlic'],
    missingIngredients: ['heavy cream', 'parsley'],
  },
  {
    id: '2',
    title: 'Avocado Toast with Poached Eggs and Tomatoes',
    image: 'https://images.unsplash.com/photo-1603046891744-1f76eb10aec7?q=80&w=2487',
    readyInMinutes: 15,
    servings: 2,
    aggregateLikes: 187,
    matchedIngredients: ['bread', 'avocado', 'eggs'],
    missingIngredients: ['cherry tomatoes', 'microgreens'],
  },
  {
    id: '3',
    title: 'Vegetable Stir Fry with Tofu and Soy Sauce',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070',
    readyInMinutes: 25,
    servings: 3,
    aggregateLikes: 142,
    matchedIngredients: ['tofu', 'bell peppers', 'broccoli'],
    missingIngredients: ['soy sauce', 'sesame oil', 'green onions'],
  },
  {
    id: '4',
    title: 'Chocolate Chip Cookies with Sea Salt',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=2487',
    readyInMinutes: 45,
    servings: 24,
    aggregateLikes: 312,
    matchedIngredients: ['flour', 'sugar', 'butter', 'chocolate chips'],
    missingIngredients: ['sea salt', 'vanilla extract'],
  },
  {
    id: '5',
    title: 'Berry Smoothie Bowl with Granola',
    image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?q=80&w=2070',
    readyInMinutes: 10,
    servings: 1,
    aggregateLikes: 165,
    matchedIngredients: ['berries', 'banana', 'yogurt'],
    missingIngredients: ['granola', 'honey', 'chia seeds'],
  },
  {
    id: '6',
    title: 'Roasted Salmon with Lemon and Dill',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=2070',
    readyInMinutes: 35,
    servings: 2,
    aggregateLikes: 201,
    matchedIngredients: ['salmon', 'lemon', 'olive oil'],
    missingIngredients: ['dill', 'garlic powder', 'black pepper'],
  },
];

// Mock ingredients data
const mockIngredientsList: Record<string, Ingredient[]> = {
  '1': [
    { id: 1, name: 'pasta', amount: 8, unit: 'oz', original: '8 oz pasta', isAvailable: true },
    { id: 2, name: 'chicken', amount: 2, unit: 'breasts', original: '2 chicken breasts, grilled and sliced', isAvailable: true },
    { id: 3, name: 'parmesan', amount: 1, unit: 'cup', original: '1 cup grated parmesan cheese', isAvailable: true },
    { id: 4, name: 'garlic', amount: 4, unit: 'cloves', original: '4 cloves garlic, minced', isAvailable: true },
    { id: 5, name: 'heavy cream', amount: 1, unit: 'cup', original: '1 cup heavy cream', isAvailable: false },
    { id: 6, name: 'parsley', amount: 2, unit: 'tbsp', original: '2 tbsp fresh parsley, chopped', isAvailable: false },
    { id: 7, name: 'butter', amount: 2, unit: 'tbsp', original: '2 tbsp butter', isAvailable: true },
    { id: 8, name: 'salt', amount: 1, unit: 'tsp', original: '1 tsp salt', isAvailable: true },
    { id: 9, name: 'pepper', amount: 0.5, unit: 'tsp', original: '1/2 tsp black pepper', isAvailable: true },
  ],
  '2': [
    { id: 1, name: 'bread', amount: 2, unit: 'slices', original: '2 slices sourdough bread, toasted', isAvailable: true },
    { id: 2, name: 'avocado', amount: 1, unit: '', original: '1 ripe avocado, mashed', isAvailable: true },
    { id: 3, name: 'eggs', amount: 2, unit: '', original: '2 large eggs, poached', isAvailable: true },
    { id: 4, name: 'cherry tomatoes', amount: 0.5, unit: 'cup', original: '1/2 cup cherry tomatoes, halved', isAvailable: false },
    { id: 5, name: 'microgreens', amount: 0.25, unit: 'cup', original: '1/4 cup microgreens', isAvailable: false },
    { id: 6, name: 'lemon juice', amount: 1, unit: 'tsp', original: '1 tsp fresh lemon juice', isAvailable: true },
    { id: 7, name: 'salt', amount: 0.25, unit: 'tsp', original: '1/4 tsp salt', isAvailable: true },
    { id: 8, name: 'pepper', amount: 0.25, unit: 'tsp', original: '1/4 tsp black pepper', isAvailable: true },
  ],
};

// Mock nutrition data
const mockNutrition: Record<string, { calories: number; protein: number; fat: number; carbs: number }> = {
  '1': { calories: 520, protein: 30, fat: 28, carbs: 42 },
  '2': { calories: 350, protein: 15, fat: 20, carbs: 30 },
  '3': { calories: 280, protein: 18, fat: 12, carbs: 25 },
  '4': { calories: 180, protein: 2, fat: 9, carbs: 22 },
  '5': { calories: 320, protein: 10, fat: 6, carbs: 60 },
  '6': { calories: 380, protein: 36, fat: 22, carbs: 8 },
};

// Search recipes by ingredients
export const searchRecipesByIngredients = async (ingredients: string): Promise<Recipe[]> => {
  // In a real app, this would call an API with the ingredients
  console.log(`Searching for recipes with ingredients: ${ingredients}`);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simple search logic - in a real app, this would be handled by the API
  const searchTerms = ingredients.toLowerCase().split(',').map(term => term.trim());
  
  return mockRecipes.filter(recipe => {
    const matches = recipe.matchedIngredients.some(ingredient => 
      searchTerms.some(term => ingredient.toLowerCase().includes(term))
    );
    return matches;
  });
};

// Get recipe details by ID
export const getRecipeById = async (id: string): Promise<{ 
  recipe: Recipe | undefined; 
  ingredients: Ingredient[];
  nutrition: { calories: number; protein: number; fat: number; carbs: number };
}> => {
  // In a real app, this would call an API to get recipe details
  console.log(`Getting recipe details for ID: ${id}`);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const recipe = mockRecipes.find(r => r.id === id);
  const ingredients = mockIngredientsList[id] || [];
  const nutrition = mockNutrition[id] || { calories: 0, protein: 0, fat: 0, carbs: 0 };
  
  return { recipe, ingredients, nutrition };
};

// Mock function to generate AI recipe video
export const generateRecipeVideo = async (recipeId: string): Promise<string> => {
  // In a real app, this would call an AI video generation API
  console.log(`Generating AI video for recipe ID: ${recipeId}`);
  
  // Simulate API delay for video generation
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Return mock video URL
  return `https://example.com/api/video/${recipeId}`;
};
