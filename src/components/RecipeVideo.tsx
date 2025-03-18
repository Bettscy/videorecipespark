
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Loader } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { generateRecipeVideo, generateRecipeImageFrames } from '@/services/aiStudioService';

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
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const currentFrameRef = useRef(0);
  const { toast } = useToast();
  
  // Fetch recipe video or generate image sequence
  useEffect(() => {
    const fetchRecipeVideo = async () => {
      try {
        setIsLoading(true);
        
        // First try to generate a video using AI Studios API
        console.log(`Attempting to generate AI video for "${title}"`);
        const generatedVideoUrl = await generateRecipeVideo(title);
        
        if (generatedVideoUrl) {
          // If video generation is successful, use the video URL
          setVideoUrl(generatedVideoUrl);
          toast({
            title: "AI-Generated Recipe Video",
            description: `Your video for "${title}" is ready to play`,
            duration: 3000,
          });
        } else {
          // If video generation fails, fall back to image sequence
          console.log("Video generation failed, falling back to image sequence");
          const frames = await generateRecipeImageFrames(title);
          setVideoSequence(frames);
          
          toast({
            title: "Recipe Video Preview",
            description: `We've prepared a preview for "${title}" with relevant images`,
            duration: 3000,
          });
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error in video generation process:', error);
        
        // Generate fallback frames on error
        const fallbackFrames = [];
        for (let i = 0; i < 5; i++) {
          fallbackFrames.push(`https://picsum.photos/seed/${recipeId}-frame-${i}/1280/720`);
        }
        
        setVideoSequence(fallbackFrames);
        setIsLoading(false);
        
        toast({
          title: "Using Placeholder Video",
          description: "Couldn't connect to video services. Using placeholder images instead.",
          variant: "destructive",
          duration: 3000,
        });
      }
    };

    fetchRecipeVideo();
    
    return () => {
      // Cleanup if needed
    };
  }, [recipeId, title, toast]);
  
  // Simulate video playback and frame changes for image sequence
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && !isLoading && videoSequence.length > 0 && !videoUrl) {
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
  }, [isPlaying, isLoading, videoSequence, videoUrl]);
  
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
          <p className="text-sm text-muted-foreground">Generating AI video for {title}...</p>
        </div>
      ) : videoUrl ? (
        // If we have an AI-generated video, render video player
        <div className="w-full h-full">
          {/* This would be a real video player in production */}
          {/* For now, we just display a placeholder with the video URL */}
          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
            <div className="text-center p-4">
              <h3 className="text-lg font-medium text-white mb-2">
                AI-Generated Video for {title}
              </h3>
              <p className="text-sm text-gray-300">
                Video URL: {videoUrl}
              </p>
              <button
                onClick={togglePlay}
                className="mt-4 px-4 py-2 bg-primary text-white rounded-md"
              >
                {isPlaying ? "Pause" : "Play"} Video
              </button>
            </div>
          </div>
          
          {/* Video source label */}
          <div className="absolute top-4 right-4">
            <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-blue-500 text-white backdrop-blur-sm">
              AI Studios
            </span>
          </div>
        </div>
      ) : (
        // Fallback to image sequence if no video is available
        <>
          <img 
            src={getCurrentFrame()} 
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          
          {/* Recipe title overlay */}
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
          
          {/* API source label */}
          <div className="absolute top-4 right-4">
            <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-black/40 text-white backdrop-blur-sm border border-white/10">
              Edamam Images
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default RecipeVideo;
