import { useState } from 'react';
import { Play, Sparkles, Film, Activity, ExternalLink } from 'lucide-react';

export function SportsHeroAnimation() {
  const [activeMode, setActiveMode] = useState<'video' | 'interactive'>('video');

  return (
    <div className="relative w-full flex flex-col items-center justify-center overflow-hidden rounded-3xl bg-neutral-950/90 border border-neutral-800/80 shadow-2xl group transition-all duration-300 hover:border-red-600/50">
      {/* Background ambient lighting vignette */}
      <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 via-transparent to-red-950/20 rounded-3xl blur-xl pointer-events-none -z-10" />

      {/* Top HUD Header Bar */}
      <div className="w-full px-4 sm:px-6 py-3 border-b border-neutral-800/80 bg-neutral-900/60 backdrop-blur-md flex items-center justify-between gap-3 text-xs z-10">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
          </span>
          <span className="font-mono text-[11px] font-bold text-white uppercase tracking-wider">
            FEATURED ANIMATION
          </span>
          <span className="hidden sm:inline text-neutral-600">|</span>
          <span className="hidden sm:inline text-neutral-400 font-mono text-[10px]">
            &lsquo;Football, We Love You&rsquo; &bull; Art of Football
          </span>
        </div>

        {/* Mode switcher pills */}
        <div className="flex items-center gap-1 bg-neutral-950 p-1 rounded-xl border border-neutral-800">
          <button
            onClick={() => setActiveMode('video')}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition-all flex items-center gap-1.5 ${
              activeMode === 'video'
                ? 'bg-red-600 text-white shadow-sm shadow-red-950'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Film className="w-3 h-3" />
            <span>Video Animation</span>
          </button>
          <button
            onClick={() => setActiveMode('interactive')}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition-all flex items-center gap-1.5 ${
              activeMode === 'interactive'
                ? 'bg-red-600 text-white shadow-sm shadow-red-950'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Activity className="w-3 h-3" />
            <span>3D Pitch Engine</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative w-full aspect-video min-h-[280px] sm:min-h-[360px] lg:min-h-[420px] bg-black flex items-center justify-center overflow-hidden">
        {activeMode === 'video' ? (
          <div className="w-full h-full relative">
            <iframe
              src="https://www.youtube-nocookie.com/embed/TEjKpwdmPZ8?autoplay=1&mute=1&loop=1&playlist=TEjKpwdmPZ8&controls=1&modestbranding=1&rel=0&playsinline=1"
              title="'Football, We Love You' - an animation by Art of Football"
              className="w-full h-full absolute inset-0 border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        ) : (
          <InteractivePitchCanvas />
        )}
      </div>

      {/* Bottom Sub-Bar with Official Attribution & Watch Link */}
      <div className="w-full px-4 sm:px-6 py-2.5 bg-neutral-950/80 border-t border-neutral-800/70 flex items-center justify-between text-[11px] text-neutral-400">
        <div className="flex items-center gap-2 truncate">
          <Sparkles className="w-3.5 h-3.5 text-red-500 shrink-0" />
          <span className="truncate">
            Animation by <strong className="text-neutral-200">Art of Football</strong> &mdash; <em>&lsquo;Football, We Love You&rsquo;</em>
          </span>
        </div>

        <a
          href="https://youtu.be/TEjKpwdmPZ8"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-red-400 hover:text-red-300 font-semibold inline-flex items-center gap-1 ml-2 transition-colors"
        >
          <span>Watch on YouTube</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}

/**
 * Interactive canvas fallback engine for the pitch mode
 */
function InteractivePitchCanvas() {
  return (
    <div className="w-full h-full relative flex items-center justify-center bg-gradient-to-b from-neutral-900 to-neutral-950 overflow-hidden">
      {/* Pitch Lines */}
      <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 h-44 border-2 border-white/10 rounded-2xl flex items-center justify-center">
        <div className="w-28 h-28 rounded-full border-2 border-red-500/20 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
        </div>
      </div>

      {/* Animated Floating Ball with Shadow */}
      <div className="relative z-10 flex flex-col items-center animate-bounce duration-1000">
        <div className="w-16 h-16 rounded-full bg-white shadow-[0_0_30px_rgba(239,68,68,0.8)] flex items-center justify-center border-2 border-neutral-800 relative overflow-hidden">
          {/* Soccer ball pattern markings */}
          <div className="w-6 h-6 bg-neutral-900 rounded-sm transform rotate-45" />
          <div className="absolute -top-1 left-2 w-4 h-4 bg-neutral-900 rounded-sm" />
          <div className="absolute -bottom-1 right-2 w-4 h-4 bg-neutral-900 rounded-sm" />
        </div>
        <div className="w-12 h-3 bg-black/60 rounded-full blur-sm mt-3" />
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[11px] font-mono text-neutral-400 bg-neutral-900/80 px-3 py-1 rounded-full border border-neutral-800">
        Interactive 3D Engine Ready
      </div>
    </div>
  );
}
