
import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Loader } from 'lucide-react';

interface RecipeVideoProps {
  recipeId: string;
  title: string;
}

const RecipeVideo: React.FC<RecipeVideoProps> = ({ recipeId, title }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  
  // Mock video URL - in a real application this would come from an AI video generation API
  const videoUrl = `https://picsum.photos/seed/${recipeId}/1280/720`;
  
  // Simulate video loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Simulate video progress when playing
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && !isLoading) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.5;
        });
      }, 100);
    }
    
    return () => clearInterval(interval);
  }, [isPlaying, isLoading]);
  
  const togglePlay = () => {
    if (!isLoading) {
      setIsPlaying(!isPlaying);
    }
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl">
      {isLoading ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 animate-pulse">
          <Loader className="w-10 h-10 text-primary animate-spin-slow mb-4" />
          <p className="text-sm text-muted-foreground">Generating AI video...</p>
        </div>
      ) : (
        <>
          <img 
            src={videoUrl} 
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          
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
          
          {/* AI Generated label */}
          <div className="absolute top-4 right-4">
            <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-black/40 text-white backdrop-blur-sm border border-white/10">
              AI Generated
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default RecipeVideo;
