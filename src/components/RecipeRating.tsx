
import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface RecipeRatingProps {
  initialRating?: number;
  totalRatings?: number;
  onRatingChange?: (rating: number) => void;
}

const RecipeRating: React.FC<RecipeRatingProps> = ({ 
  initialRating = 0, 
  totalRatings = 0,
  onRatingChange 
}) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);
  const [hasRated, setHasRated] = useState(false);
  
  const handleRating = (newRating: number) => {
    setRating(newRating);
    setHasRated(true);
    if (onRatingChange) onRatingChange(newRating);
  };
  
  return (
    <div className="p-5 rounded-2xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/30 shadow-md">
      <h3 className="text-lg font-medium mb-4">Rating & Reviews</h3>
      
      <div className="flex flex-col items-center mb-6">
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-3xl font-bold">{rating.toFixed(1)}</span>
          <span className="text-muted-foreground">out of 5</span>
        </div>
        
        <div className="flex items-center mb-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className="p-1 focus:outline-none"
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => handleRating(star)}
              aria-label={`Rate ${star} stars`}
            >
              <Star 
                className={`w-7 h-7 ${
                  (hoverRating !== 0 ? star <= hoverRating : star <= rating)
                    ? 'text-amber-500 fill-amber-500' 
                    : 'text-gray-300 dark:text-gray-600'
                } transition-colors`} 
              />
            </button>
          ))}
        </div>
        
        <p className="text-sm text-muted-foreground">
          Based on {totalRatings} {totalRatings === 1 ? 'rating' : 'ratings'}
        </p>
      </div>
      
      {hasRated ? (
        <div className="p-4 mt-4 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800/30 rounded-xl">
          <p className="text-center text-green-800 dark:text-green-300">
            Thanks for rating this recipe!
          </p>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">
            Have you tried this recipe? Share your experience!
          </p>
          <button 
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors focus:ring-2 focus:ring-primary/20"
          >
            Rate This Recipe
          </button>
        </div>
      )}
    </div>
  );
};

export default RecipeRating;
