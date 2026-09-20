import { Shield, ExternalLink, ArrowRight, BookOpen, Download, Wrench, Trophy, CheckCircle2 } from 'lucide-react';
import { PageView } from '../types';

interface AboutPageProps {
  onNavigate: (page: PageView) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Title & Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 border border-red-500/30 text-xs font-semibold text-red-400">
          <Shield className="w-3.5 h-3.5" />
          <span>Editorial Transparency &amp; Brand Hub</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          About ATV Sports Blog
        </h1>
        <p className="text-neutral-300 text-base sm:text-lg leading-relaxed">
          The official content, documentation, and digital guides resource for the ATV Sports ecosystem.
        </p>
      </div>

      {/* Prominent Official Website Callout */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-red-950/40 via-neutral-900 to-neutral-950 border border-red-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-widest text-red-400">
            Primary Ecosystem Hub
          </p>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Main Official Website: atvsports.site
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-lg">
            For authenticated APK binaries, direct application downloads, server notifications, and verified release channels, always access the primary portal.
          </p>
        </div>
        <a
          id="about-official-cta-btn"
          href="https://atvsports.site/"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-lg shadow-red-950 transition-all transform hover:-translate-y-0.5"
        >
          <span>Visit atvsports.site</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* What This Website Provides */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white tracking-tight">
          What We Provide
        </h2>
        <p className="text-neutral-300 text-sm leading-relaxed">
          ATV Sports Blog was established to provide clear, reliable, and continuously verified information to sports fans and streaming device users. Our publication delivers:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center">
              <Download className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-white">ATV Sports Updates</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Official build changelogs, version milestones, security bulletins, and update instructions directly aligned with developer releases.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-white">Installation Guides</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Tested walkthroughs for sideloading and installing on Android phones, Google TV, Amazon Fire OS sticks, and TV boxes.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Shield className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-white">Product &amp; App Information</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Transparent hardware specifications, minimum system requirements, and device compatibility matrices.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Wrench className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-white">Troubleshooting Resources</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Practical diagnostic checklists for resolving video buffering, DNS timeouts, audio delay, and cache overload.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-2 sm:col-span-2">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Trophy className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-white">Original Sports Content</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Original analytical articles, continental tournament match schedules, and deep dives into modern sports broadcasting technology.
            </p>
          </div>
        </div>
      </div>

      {/* Editorial Ethics & Transparency */}
      <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/40 border border-neutral-800 space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>Editorial Standards &amp; Authenticity Pledge</span>
        </h2>
        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
          At ATV Sports Blog, we are committed to providing trustworthy, factual, and strictly authentic information:
        </p>
        <ul className="space-y-2 text-xs sm:text-sm text-neutral-300 list-disc pl-5">
          <li><strong>No Fabricated Content:</strong> We do not publish fake reviews, artificially inflated user metrics, or fabricated news.</li>
          <li><strong>No Keyword Stuffing:</strong> Every article is written for human clarity with genuine utility, avoiding synthetic search spam.</li>
          <li><strong>No Copyright Infringement:</strong> We do not re-host uncredited foreign articles or stream copyrighted video feeds.</li>
          <li><strong>Original Analysis:</strong> Sports fixture overviews and guides are researched and authored in-house.</li>
        </ul>
      </div>

      {/* Mandatory Disclaimer */}
      <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800/80 text-xs text-neutral-400 space-y-2">
        <h3 className="font-bold text-neutral-200 uppercase tracking-wider text-[11px]">
          Legal Notice &amp; Third-Party Disclaimers
        </h3>
        <p className="leading-relaxed">
          ATV Sports Blog is an official information and documentation hub for ATV Sports. We do not claim any affiliation, association, sponsorship, or endorsement by Google LLC, Apple Inc., YouTube, Amazon, or any of their respective subsidiaries or affiliates. All trademarks, registered marks, and company names referenced on this website remain the sole property of their respective holders.
        </p>
      </div>

      {/* Navigation Footer */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-neutral-800">
        <button
          onClick={() => onNavigate('guides')}
          className="inline-flex items-center gap-2 text-xs font-bold text-red-400 hover:text-red-300"
        >
          <span>Explore Step-by-Step Guides</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => onNavigate('contact')}
          className="inline-flex items-center gap-2 text-xs font-bold text-neutral-300 hover:text-white"
        >
          <span>Contact the Editorial Team</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
