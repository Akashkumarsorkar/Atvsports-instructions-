import React, { useState } from 'react';

interface ATVSportsLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
  withText?: boolean;
}

export const ATVSportsLogo: React.FC<ATVSportsLogoProps> = ({
  size = 'md',
  showTagline = false,
  className = '',
  withText = true,
}) => {
  const [imageLoaded, setImageLoaded] = useState(true);

  // Dimension scaling
  const sizeMap = {
    sm: { img: 'w-8 h-8', text: 'text-base', sub: 'text-[9px]' },
    md: { img: 'w-10 h-10', text: 'text-xl', sub: 'text-[10px]' },
    lg: { img: 'w-16 h-16', text: 'text-2xl', sub: 'text-xs' },
    xl: { img: 'w-24 h-24 sm:w-28 sm:h-28', text: 'text-3xl sm:text-4xl', sub: 'text-xs sm:text-sm' },
  };

  const { img, text, sub } = sizeMap[size];

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Official Emblem Logo */}
      <div className={`relative ${img} shrink-0 rounded-xl overflow-hidden shadow-lg shadow-red-950/40 border border-neutral-800/80 bg-neutral-950 flex items-center justify-center group`}>
        {imageLoaded ? (
          <img
            src="/atv-logo.jpg"
            alt="ATV Sports Official Logo"
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageLoaded(false)}
          />
        ) : (
          /* High-fidelity Vector Fallback Emblem */
          <div className="w-full h-full relative flex items-center justify-center bg-gradient-to-br from-neutral-900 via-neutral-950 to-black">
            {/* TV Screen Frame */}
            <div className="w-4/5 h-3/5 rounded border-2 border-red-600 bg-neutral-900 flex items-center justify-center relative shadow-[0_0_12px_rgba(239,68,68,0.5)]">
              <div className="w-0 h-0 border-y-[5px] border-y-transparent border-l-[8px] border-l-white ml-0.5" />
            </div>
            {/* Swoosh ball */}
            <div className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-red-600 border border-white" />
          </div>
        )}
        {/* Subtle glowing ring overlay */}
        <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10 pointer-events-none" />
      </div>

      {/* Typography with Chrome & Red Facets */}
      {withText && (
        <div className="flex flex-col leading-none">
          <div className="flex items-baseline font-black tracking-wider">
            <span className="text-red-500 font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-red-400 via-red-500 to-red-700 drop-shadow-[0_2px_8px_rgba(239,68,68,0.4)]">
              ATV
            </span>
            <span className={`ml-1 font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-200 to-neutral-400 ${text}`}>
              Sports
            </span>
          </div>

          {showTagline && (
            <span className={`font-bold tracking-widest text-neutral-400 uppercase mt-0.5 ${sub}`}>
              LIVE • GAMES • ACTION
            </span>
          )}
        </div>
      )}
    </div>
  );
};
