import { useState, useEffect } from 'react';
import ScaryJumpscare from '@/components/ScaryJumpscare';
import ScaryBackground from '@/components/ScaryBackground';
import HamoodDancer from '@/components/HamoodDancer';

const Index = () => {
  // Your Hamood Habibi MP3 file
  const hamoodAudioSrc = "/hamouddddddddd.mp3";

  useEffect(() => {
    // Disable scrolling
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen relative bg-scary-dark overflow-hidden">
      {/* Scary Background */}
      <ScaryBackground />
      
      {/* Looping Jumpscare Component - runs forever */}
      <ScaryJumpscare onJumpscareComplete={() => {}} />
      
      {/* Hamood Dancer with audio playing in background */}
      <HamoodDancer hamoodAudioSrc={hamoodAudioSrc} />
    </div>
  );
};

export default Index;
