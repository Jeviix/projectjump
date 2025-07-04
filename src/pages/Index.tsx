import { useState, useEffect, useRef } from 'react';
import ScaryJumpscare from '@/components/ScaryJumpscare';
import ScaryBackground from '@/components/ScaryBackground';
import HamoodDancer from '@/components/HamoodDancer';

const hamoodAudioSrc = "/hamouddddddddd.mp3";

const Index = () => {
  const [phase, setPhase] = useState<'waiting' | 'ready' | 'jumpscare'>('waiting');
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [flash, setFlash] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef<NodeJS.Timeout | null>(null);
  const delayRef = useRef(2000);

  useEffect(() => {
    if (phase === 'waiting') {
      // Random delay between 1.5s and 4s
      const delay = Math.random() * 2500 + 1500;
      delayRef.current = delay;
      setProgress(0);
      // Animate progress bar
      let start = Date.now();
      progressRef.current = setInterval(() => {
        const elapsed = Date.now() - start;
        setProgress(Math.min(100, (elapsed / delay) * 100));
      }, 30);
      timeoutRef.current = setTimeout(() => {
        setPhase('ready');
        setProgress(100);
        if (progressRef.current) clearInterval(progressRef.current);
      }, delay);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [phase]);

  const handleScreenClick = async () => {
    if (phase === 'ready') {
      // Flash effect
      setFlash(true);
      setTimeout(() => setFlash(false), 150);
      // Go fullscreen
      try {
        if (document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen();
        }
      } catch (error) {
        console.log('Fullscreen request failed:', error);
      }
      // Play scream audio
      let audioEl = audio;
      if (!audioEl) {
        audioEl = new Audio(hamoodAudioSrc);
        audioEl.loop = true;
        audioEl.volume = 1.0;
        setAudio(audioEl);
      }
      audioEl.play().catch(() => {});
      setTimeout(() => setPhase('jumpscare'), 200); // allow flash to show
    }
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
      {/* Flash effect overlay */}
      {flash && (
        <div className="fixed inset-0 z-[100] bg-white opacity-80 animate-fade-out pointer-events-none" />
      )}
      {phase === 'waiting' && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-md bg-white/10 text-white select-none cursor-not-allowed transition-all duration-500"
          style={{ zIndex: 9999 }}
        >
          <div className="max-w-lg w-full p-8 rounded-2xl shadow-2xl border border-white/20 bg-white/10 backdrop-blur-lg flex flex-col items-center gap-6 animate-fade-in">
            <h2 className="text-4xl font-extrabold mb-2 drop-shadow-lg tracking-tight">Reaction Test</h2>
            <p className="mb-2 text-lg text-white/80 font-medium text-center">Wait for the screen to turn green, then click as fast as you can!</p>
            {/* Progress Bar */}
            <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      )}
      {phase === 'ready' && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-green-500 to-green-700 text-white select-none cursor-pointer transition-colors duration-300 animate-fade-in"
          style={{ zIndex: 9999 }}
          onClick={handleScreenClick}
        >
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-5xl font-extrabold mb-2 animate-pulse-fast drop-shadow-lg tracking-tight">CLICK NOW!</h2>
            <span className="text-lg font-semibold text-white/80 animate-fade-in">Tap or click anywhere</span>
          </div>
        </div>
      )}
      {phase === 'jumpscare' && (
        <>
          <ScaryBackground />
          <ScaryJumpscare onJumpscareComplete={() => {}} />
          <HamoodDancer hamoodAudioSrc={hamoodAudioSrc} />
        </>
      )}
      {/* Animations */}
      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.7s cubic-bezier(.4,0,.2,1);
        }
        .animate-fade-out {
          animation: fadeOut 0.18s cubic-bezier(.4,0,.2,1);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        .animate-pulse-fast {
          animation: pulseFast 0.7s infinite alternate;
        }
        @keyframes pulseFast {
          from { text-shadow: 0 0 10px #22c55e, 0 0 20px #22c55e; }
          to { text-shadow: 0 0 30px #22c55e, 0 0 60px #22c55e; }
        }
      `}</style>
    </div>
  );
};

export default Index;
