
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
  
  // Generate a sequence of video frames based on the recipe ID
  useEffect(() => {
    const generateVideoSequence = () => {
      // For realistic implementation, this would call an AI video generation API
      // For now, we'll simulate different frames using seed values
      const frames = [];
      // Generate 5 different frames to simulate a video sequence
      for (let i = 0; i < 5; i++) {
        frames.push(`https://picsum.photos/seed/${recipeId}-frame-${i}/1280/720`);
      }
      setVideoSequence(frames);
    };

    generateVideoSequence();
    
    // Simulate video generation loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Recipe Video Generated",
        description: `AI-generated video for "${title}" is ready to play`,
        duration: 3000,
      });
    }, 2000);
    
    return () => clearTimeout(timer);
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
          <Loader className="w-10 h-10 text-primary animate-spin-slow mb-4" />
          <p className="text-sm text-muted-foreground">Generating AI recipe video for {title}...</p>
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
