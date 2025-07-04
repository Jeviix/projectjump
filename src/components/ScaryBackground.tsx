import { useEffect, useState } from 'react';

const ScaryBackground = () => {
  const [glitchIntensity, setGlitchIntensity] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchIntensity(Math.random());
    }, Math.random() * 2000 + 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-0">
      {/* Base dark background with red tint */}
      <div className="absolute inset-0 bg-gradient-to-br from-scary-dark via-scary-red/10 to-scary-dark"></div>
      
      {/* Animated blood drip effect */}
      <div className="absolute inset-0 blood-drip"></div>
      
      {/* Random glitch overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `linear-gradient(
            ${Math.random() * 360}deg, 
            transparent ${50 + glitchIntensity * 30}%, 
            hsl(var(--glitch-green)) ${60 + glitchIntensity * 10}%, 
            transparent ${70 + glitchIntensity * 20}%
          )`,
          animation: `glitch-skew ${0.5 + Math.random()}s infinite`
        }}
      ></div>
      
      {/* Flickering overlay */}
      <div 
        className={`absolute inset-0 bg-scary-red/5 ${
          glitchIntensity > 0.8 ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-75`}
      ></div>
      
      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          animation: `shake ${0.1 + Math.random() * 0.2}s infinite`
        }}
      ></div>
    </div>
  );
};

export default ScaryBackground;