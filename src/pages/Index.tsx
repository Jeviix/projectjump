import { useState, useEffect } from 'react';
import ScaryJumpscare from '@/components/ScaryJumpscare';
import ScaryBackground from '@/components/ScaryBackground';
import HamoodDancer from '@/components/HamoodDancer';

const Index = () => {
  const [showJumpscare, setShowJumpscare] = useState(true);
  const [jumpscareComplete, setJumpscareComplete] = useState(false);
  
  // Add your Hamood Habibi MP3 URL here
  const hamoodAudioSrc = ""; // Replace with your MP3 URL when you upload it

  useEffect(() => {
    // Disable scrolling
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleJumpscareComplete = () => {
    setShowJumpscare(false);
    setJumpscareComplete(true);
  };

  return (
    <div className="min-h-screen relative bg-scary-dark overflow-hidden">
      {/* Scary Background */}
      <ScaryBackground />
      
      {/* Jumpscare Component */}
      {showJumpscare && (
        <ScaryJumpscare onJumpscareComplete={handleJumpscareComplete} />
      )}
      
      {/* Hamood Dancer (shows after jumpscare) */}
      {jumpscareComplete && (
        <HamoodDancer hamoodAudioSrc={hamoodAudioSrc} />
      )}
      
      {/* Instructions overlay (only visible before jumpscare) */}
      {!jumpscareComplete && !showJumpscare && (
        <div className="fixed top-4 right-4 z-40 text-red-400 text-sm opacity-60">
          <p>Upload your Hamood Habibi MP3 and update the hamoodAudioSrc variable</p>
        </div>
      )}
    </div>
  );
};

export default Index;
