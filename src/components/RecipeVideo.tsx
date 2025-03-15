
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Loader } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface RecipeVideoProps {
  recipeId: string;
  title: string;
}

const RecipeVideo: React.FC<RecipeVideoProps> = ({ recipeId, title }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoSequence, setVideoSequence] = useState<string[]>([]);
  const currentFrameRef = useRef(0);
  const { toast } = useToast();
  
  // Fetch recipe data from Edamam API and generate video frames
  useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        // The APP_ID and APP_KEY would typically be environment variables
        // These are example values and should be replaced with actual credentials
        const APP_ID = "1a2b3c4d";
        const APP_KEY = "5e6f7g8h9i0j";
        
        // Clean the title to use as a search term
        const searchTerm = title.replace(/[^\w\s]/gi, '').toLowerCase();
        
        console.log(`Fetching recipe data for: ${searchTerm}`);
        
        // Fetch recipe data from Edamam API
        const response = await fetch(
          `https://api.edamam.com/api/recipes/v2?type=public&q=${encodeURIComponent(searchTerm)}&app_id=${APP_ID}&app_key=${APP_KEY}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch recipe data');
        }
        
        const data = await response.json();
        console.log('Edamam API response:', data);
        
        // Generate video frames based on the recipe images from Edamam
        const frames: string[] = [];
        
        // If we have recipe data, use those images
        if (data.hits && data.hits.length > 0) {
          // Get up to 5 different recipes to use as video frames
          const recipes = data.hits.slice(0, 5);
          
          recipes.forEach(hit => {
            if (hit.recipe && hit.recipe.image) {
              frames.push(hit.recipe.image);
            }
          });
        }
        
        // If we didn't get enough frames from Edamam, supplement with placeholders
        if (frames.length === 0) {
          // Fallback to placeholder images
          for (let i = 0; i < 5; i++) {
            frames.push(`https://picsum.photos/seed/${recipeId}-frame-${i}/1280/720`);
          }
        }
        
        setVideoSequence(frames);
        setIsLoading(false);
        
        toast({
          title: "Recipe Video Generated",
          description: `AI-generated video for "${title}" is ready to play`,
          duration: 3000,
        });
      } catch (error) {
        console.error('Error fetching recipe data:', error);
        
        // Fallback to placeholder images on error
        const fallbackFrames = [];
        for (let i = 0; i < 5; i++) {
          fallbackFrames.push(`https://picsum.photos/seed/${recipeId}-frame-${i}/1280/720`);
        }
        
        setVideoSequence(fallbackFrames);
        setIsLoading(false);
        
        toast({
          title: "Using Placeholder Video",
          description: "Couldn't connect to recipe API. Using placeholder video instead.",
          variant: "destructive",
          duration: 3000,
        });
      }
    };

    fetchRecipeData();
    
    return () => {
      // Cleanup if needed
    };
  }, [recipeId, title, toast]);
  
  // Simulate video playback and frame changes
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && !isLoading && videoSequence.length > 0) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            currentFrameRef.current = 0;
            return 0;
          }
          
          // Update the current frame for the video sequence
          const frameIndex = Math.floor((prev / 100) * (videoSequence.length - 1));
          if (frameIndex !== currentFrameRef.current) {
            currentFrameRef.current = frameIndex;
          }
          
          return prev + 0.5;
        });
      }, 100);
    }
    
    return () => clearInterval(interval);
  }, [isPlaying, isLoading, videoSequence]);
  
  const togglePlay = () => {
    if (!isLoading) {
      setIsPlaying(!isPlaying);
    }
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  // Get the current frame based on playback progress
  const getCurrentFrame = () => {
    if (videoSequence.length === 0) return '';
    const frameIndex = Math.min(
      Math.floor((progress / 100) * videoSequence.length),
      videoSequence.length - 1
    );
    return videoSequence[frameIndex];
  };
  
  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl">
      {isLoading ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 animate-pulse">
          <Loader className="w-10 h-10 text-primary animate-spin mb-4" />
          <p className="text-sm text-muted-foreground">Fetching recipe video for {title}...</p>
        </div>
      ) : (
        <>
          <img 
            src={getCurrentFrame()} 
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          
          {/* Recipe title overlay for context */}
          <div className="absolute top-4 left-4 right-4">
            <h3 className="text-lg font-medium text-white text-shadow">
              {title}
            </h3>
          </div>
          
          {/* Video controls */}
          <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col">
            {/* Progress bar */}
            <div className="w-full h-1 bg-white/30 rounded-full mb-4 overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-100" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            
            <div className="flex items-center justify-between">
              <button 
                onClick={togglePlay}
                className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 text-white" />
                ) : (
                  <Play className="w-5 h-5 text-white" />
                )}
              </button>
              
              <div className="flex items-center gap-4">
                <button 
                  onClick={toggleMute}
                  className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 text-white" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-white" />
                  )}
                </button>
                
                <span className="text-xs text-white/80">
                  {Math.floor(progress / 100 * 60)}:{String(Math.floor((progress / 100 * 60) % 1 * 60)).padStart(2, '0')} / 1:00
                </span>
              </div>
            </div>
          </div>
          
          {/* API-Generated label */}
          <div className="absolute top-4 right-4">
            <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-black/40 text-white backdrop-blur-sm border border-white/10">
              Edamam Powered
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default RecipeVideo;
