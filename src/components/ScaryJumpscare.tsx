import { useEffect, useState, useRef } from 'react';
import jumpscareImage from '@/assets/jumpscare.jpg';
import hamoodDancing from '@/assets/hamood-dancing.png';

interface ScaryJumpscareProps {
  onJumpscareComplete: () => void;
}

const ScaryJumpscare = ({ onJumpscareComplete }: ScaryJumpscareProps) => {
  const [showJumpscare, setShowJumpscare] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Request fullscreen immediately
    const requestFullscreen = async () => {
      try {
        if (document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen();
        }
      } catch (error) {
        console.log('Fullscreen request failed:', error);
      }
    };

    requestFullscreen();

    // Small delay to build tension, then jumpscare
    const jumpscareTimer = setTimeout(() => {
      setShowJumpscare(true);
      setIsFlashing(true);
      
      // Play jumpscare sound effect (you can replace with your own)
      const jumpscareAudio = new Audio();
      jumpscareAudio.volume = 1.0;
      // Using a data URL for a quick jumpscare sound - replace with your MP3
      jumpscareAudio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmkcBjiR2OvWfS4NKn/L8+WURE0xh8bc4LNlIgMtgNrJdSwNGX/LUDhtHjKCDsfsUmk5hNEsdTm2mO+t2wGgmtxhSV0LsB5iOy1Bq1yfBSJ3kWOKCT1cGCIwrwbNcJjZNKZlNqk7ppdfLKHjTSNjOjNyoGBVTrXh3Oj';
      jumpscareAudio.play().catch(() => {});

      // Flash effect
      setTimeout(() => {
        setIsFlashing(false);
      }, 500);

      // Hide jumpscare after 2 seconds
      setTimeout(() => {
        setShowJumpscare(false);
        onJumpscareComplete();
      }, 2000);
    }, 1000);

    return () => {
      clearTimeout(jumpscareTimer);
    };
  }, [onJumpscareComplete]);

  return (
    <div className={`fixed inset-0 z-50 ${isFlashing ? 'jumpscare-flash' : 'bg-scary-dark'}`}>
      {showJumpscare && (
        <div className="absolute inset-0 flex items-center justify-center shake">
          <img 
            src={jumpscareImage} 
            alt="JUMPSCARE!" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-red-500/30"></div>
        </div>
      )}
    </div>
  );
};

export default ScaryJumpscare;