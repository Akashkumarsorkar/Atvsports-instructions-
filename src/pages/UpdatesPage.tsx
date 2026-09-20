import { Download, ArrowRight, ExternalLink, ShieldCheck, AlertCircle } from 'lucide-react';
import { Article } from '../types';

interface UpdatesPageProps {
  onSelectArticle: (slug: string) => void;
  articles?: Article[];
}

export function UpdatesPage({ onSelectArticle }: UpdatesPageProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 border border-red-500/30 text-xs font-semibold text-red-400">
          <Download className="w-3.5 h-3.5" />
          <span>অফিসিয়াল অ্যাপ আপডেট</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          ATV Sports Latest App Update
        </h1>
        <p className="text-neutral-300 text-base sm:text-lg leading-relaxed">
          ATV Sports-এর নতুন সংস্করণ প্রকাশ হলে তা নিরাপদভাবে সংগ্রহ ও আপডেট করার নির্দেশিকা।
        </p>
      </div>

      {/* Main Notice Banner regarding official versions */}
      <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/80 border border-neutral-800 space-y-4">
        <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>অফিসিয়াল রিলিজ তথ্য</span>
        </div>
        <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
          সর্বশেষ version-এর নির্দিষ্ট version number বা release information শুধুমাত্র অফিসিয়াল ATV Sports website-এ প্রকাশিত তথ্য অনুযায়ী পাওয়া যায়। যেকোনো নতুন আপডেট সংগ্রহ করার জন্য সর্বদা অফিসিয়াল পোর্টাল ব্যবহার করুন।
        </p>
        <div className="pt-2 flex flex-wrap items-center gap-4">
          <a
            href="https://atvsports.site/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-2 transition-colors shadow-lg shadow-red-950"
          >
            <span>Visit atvsports.site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={() => onSelectArticle('how-to-update-atv-sports')}
            className="px-6 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-bold text-xs flex items-center gap-2 transition-colors"
          >
            <span>আপডেট করার গাইড পড়ুন</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Step by Step Overview Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-6">
        <h2 className="text-xl sm:text-2xl font-black text-white">
          Update করার সহজ পদ্ধতি সংক্ষেপে:
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-2">
            <span className="font-mono text-xs font-bold text-red-500">ধাপ ১ ও ২</span>
            <h3 className="text-sm font-bold text-white">অফিসিয়াল সাইটে যান</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              atvsports.site-এ প্রবেশ করে Download / Latest Version অপশন খুঁজে নিন।
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-2">
            <span className="font-mono text-xs font-bold text-red-500">ধাপ ৩ ও ৪</span>
            <h3 className="text-sm font-bold text-white">নতুন APK ডাউনলোড ও ওপেন</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              নতুন APK ফাইলটি ডাউনলোড সম্পূর্ণ হলে সেটি ডিভাইসে ওপেন করুন।
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-2">
            <span className="font-mono text-xs font-bold text-red-500">ধাপ ৫</span>
            <h3 className="text-sm font-bold text-white">Update / Install</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Update অপশনে চাপ দিয়ে আগের version-এর ওপর নতুন APK ইনস্টল সম্পন্ন করুন।
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-neutral-800/80 flex items-center gap-2 text-xs text-neutral-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Update করার আগে গুরুত্বপূর্ণ কোনো অ্যাপের data থাকলে প্রয়োজন অনুযায়ী backup রাখুন।</span>
        </div>
      </div>
    </div>
  );
}
