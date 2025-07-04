import { useState, useRef } from 'react';
import ScaryJumpscare from '@/components/ScaryJumpscare';
import ScaryBackground from '@/components/ScaryBackground';
import HamoodDancer from '@/components/HamoodDancer';

const hamoodAudioSrc = "/hamouddddddddd.mp3";

// Phases: intro, waiting, ready, tooSoon, result, jumpscare
const Index = () => {
  const [phase, setPhase] = useState<'intro' | 'waiting' | 'ready' | 'tooSoon' | 'result' | 'jumpscare'>('intro');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [attempt, setAttempt] = useState(1);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  // Start the test
  const handleStart = () => {
    setPhase('waiting');
    // Random delay between 1.5s and 4s
    const delay = Math.random() * 2500 + 1500;
    timeoutRef.current = setTimeout(() => {
      setStartTime(Date.now());
      setPhase('ready');
    }, delay);
  };

  // Handle click during red or green
  const handleTestClick = async () => {
    if (phase === 'waiting') {
      // Clicked too soon
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setPhase('tooSoon');
    } else if (phase === 'ready') {
      if (attempt === 2) {
        // Jumpscare on second attempt
        try {
          if (document.documentElement.requestFullscreen) {
            await document.documentElement.requestFullscreen();
          }
        } catch (error) {
          console.log('Fullscreen request failed:', error);
        }
        let audioEl = audio;
        if (!audioEl) {
          audioEl = new Audio(hamoodAudioSrc);
          audioEl.loop = true;
          audioEl.volume = 1.0;
          setAudio(audioEl);
        }
        audioEl.play().catch(() => {});
        setPhase('jumpscare');
      } else {
        // Normal result
        if (startTime) {
          setReactionTime(Date.now() - startTime);
        } else {
          setReactionTime(Math.floor(Math.random() * 100) + 200); // fallback
        }
        setPhase('result');
      }
    }
  };

  // Retry after too soon or result
  const handleRetry = () => {
    if (phase === 'result') {
      setAttempt(attempt + 1);
    }
    setReactionTime(null);
    setStartTime(null);
    setPhase('waiting');
    const delay = Math.random() * 2500 + 1500;
    timeoutRef.current = setTimeout(() => {
      setStartTime(Date.now());
      setPhase('ready');
    }, delay);
  };

  // Reset to intro
  const handleReset = () => {
    setAttempt(1);
    setReactionTime(null);
    setStartTime(null);
    setPhase('intro');
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  // UI color and content per phase
  let bg = 'bg-[#2196f3]';
  let content = null;
  if (phase === 'intro') {
    content = (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-6xl mb-4">⚡</div>
        <div className="text-5xl font-bold mb-2">Reaction Time Test</div>
        <div className="text-xl mb-6">When the red box turns green, click as quickly as you can.<br/>Click anywhere to start.</div>
      </div>
    );
  } else if (phase === 'waiting') {
    bg = 'bg-[#e53935]';
    content = (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-6xl mb-4">•••</div>
        <div className="text-5xl font-bold">Wait for green</div>
      </div>
    );
  } else if (phase === 'ready') {
    bg = 'bg-[#43ea6d]';
    content = (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-6xl mb-4">•••</div>
        <div className="text-5xl font-bold">Click!</div>
      </div>
    );
  } else if (phase === 'tooSoon') {
    content = (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-6xl mb-4">❗</div>
        <div className="text-5xl font-bold mb-2">Too soon!</div>
        <div className="text-xl">Click to try again.</div>
      </div>
    );
  } else if (phase === 'result') {
    content = (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-6xl mb-4">🕒</div>
        <div className="text-5xl font-bold mb-2">{reactionTime} ms</div>
        <div className="text-xl">Click to keep going</div>
      </div>
    );
  }

  return (
    phase === 'jumpscare' ? (
      <ScaryJumpscare onJumpscareComplete={() => {}} />
    ) : (
      <div className={`min-h-screen w-full flex items-center justify-center ${bg}`} style={{height:'100vh',width:'100vw'}}
        onClick={() => {
          if (phase === 'intro') handleStart();
          else if (phase === 'waiting' || phase === 'ready') handleTestClick();
          else if (phase === 'tooSoon' || phase === 'result') handleRetry();
        }}
      >
        <div className="w-full h-full flex flex-col items-center justify-center select-none">
          {content}
          {(phase === 'result' || phase === 'tooSoon') && (
            <button className="absolute top-4 right-4 px-4 py-2 bg-white/20 text-white rounded" onClick={e => {e.stopPropagation();handleReset();}}>Reset</button>
          )}
        </div>
      </div>
    )
  );
};

export default Index;
