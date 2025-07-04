import { useEffect, useRef, useState } from 'react';
import hamoodDancing from '@/assets/hamood-dancing.png';

interface HamoodDancerProps {
  hamoodAudioSrc?: string;
}

const HamoodDancer = ({ hamoodAudioSrc }: HamoodDancerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const startAudio = async () => {
      if (hamoodAudioSrc && audioRef.current) {
        try {
          audioRef.current.loop = true;
          audioRef.current.volume = 0.8;
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.log('Audio autoplay blocked, waiting for user interaction');
        }
      }
    };

    // Start audio after a small delay
    const timer = setTimeout(startAudio, 500);

    // Add click handler to start audio if blocked
    const handleClick = () => {
      if (hamoodAudioSrc && audioRef.current && !isPlaying) {
        audioRef.current.play().then(() => setIsPlaying(true));
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleClick);
    };
  }, [hamoodAudioSrc, isPlaying]);

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center">
      {/* Hamood Audio */}
      {hamoodAudioSrc && (
        <audio
          ref={audioRef}
          src={hamoodAudioSrc}
          loop
          preload="auto"
        />
      )}
      
      {/* Dancing Hamood */}
      <div className="dancing">
        <img 
          src={hamoodDancing} 
          alt="Hamood Habibi Dancing" 
          className="w-64 h-64 object-contain glitch shake"
          data-text="HAMOOD"
        />
      </div>
      
      {/* Glitchy text overlay */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <h1 
          className="text-6xl font-bold text-scary-red-bright glitch shake"
          data-text="HAMOOD HABIBI"
        >
          HAMOOD HABIBI
        </h1>
      </div>
      
      {/* Click to enable audio message */}
      {hamoodAudioSrc && !isPlaying && (
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 text-center">
          <p className="text-red-400 text-lg animate-pulse">
            Click anywhere to enable audio
          </p>
        </div>
      )}
    </div>
  );
};

export default HamoodDancer;