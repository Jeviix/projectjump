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

    // IMMEDIATE jumpscare - no delay
    setShowJumpscare(true);
    setIsFlashing(true);
    
    // Play jumpscare sound effect (you can replace with your own)
    const jumpscareAudio = new Audio();
    jumpscareAudio.volume = 1.0;
    jumpscareAudio.loop = true; // Loop the jumpscare sound
    // Using a data URL for a quick jumpscare sound - replace with your MP3
    jumpscareAudio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmkcBjiR2OvWfS4NKn/L8+WURE0xh8bc4LNlIgMtgNrJdSwNGX/LUDhtHjKCDsfsUmk5hNEsdTm2mO+t2wGgmtxhSV0LsB5iOy1Bq1yfBSJ3kWOKCT1cGCIwrwbNcJjZNKZlNqk7ppdfLKHjTSNjOjNyoGBVTrXh3Oj';
    jumpscareAudio.play().catch(() => {});

    // Flash effect loops
    const flashInterval = setInterval(() => {
      setIsFlashing(prev => !prev);
    }, 100);

    // Never hide the jumpscare - it loops forever
    // Remove the timer that would hide it

    return () => {
      clearInterval(flashInterval);
      jumpscareAudio.pause();
    };
  }, []);

  return (
    <div className="fixed inset-0 w-screen h-screen z-50 bg-black">
      {showJumpscare && (
        <div className="absolute inset-0 w-full h-full flex items-center justify-center shake" style={{background: 'black'}}>
          <img 
            src={jumpscareImage} 
            alt="JUMPSCARE!" 
            className="absolute inset-0 w-full h-full object-cover jumpscare-pop"
            style={{background: 'black', display: 'block'}}
          />
          {/* Flash overlay for pop effect */}
          <div className="absolute inset-0 pointer-events-none jumpscare-flash-anim" />
        </div>
      )}
      <style>{`
        @keyframes jumpscarePop {
          0% { transform: scale(0.7); opacity: 0.2; }
          60% { transform: scale(1.15); opacity: 1; }
          80% { transform: scale(0.98); }
          100% { transform: scale(1); opacity: 1; }
        }
        .jumpscare-pop {
          animation: jumpscarePop 0.45s cubic-bezier(.8,-0.2,.2,1.2);
        }
        @keyframes jumpscareFlash {
          0% { opacity: 0.8; }
          60% { opacity: 0; }
          100% { opacity: 0; }
        }
        .jumpscare-flash-anim {
          background: white;
          opacity: 0;
          animation: jumpscareFlash 0.3s;
        }
        @keyframes shake {
          0% { transform: translate(0, 0) rotate(0deg); }
          10% { transform: translate(-8px, 2px) rotate(-2deg); }
          20% { transform: translate(8px, -2px) rotate(2deg); }
          30% { transform: translate(-6px, 4px) rotate(-1deg); }
          40% { transform: translate(6px, -4px) rotate(1deg); }
          50% { transform: translate(-4px, 2px) rotate(0deg); }
          60% { transform: translate(4px, -2px) rotate(1deg); }
          70% { transform: translate(-2px, 2px) rotate(-1deg); }
          80% { transform: translate(2px, -2px) rotate(1deg); }
          90% { transform: translate(-1px, 1px) rotate(0deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
        .shake {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) infinite;
        }
      `}</style>
    </div>
  );
};

export default ScaryJumpscare;