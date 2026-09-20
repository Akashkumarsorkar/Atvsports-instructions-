import { AppUpdate } from '../types';

export const APP_UPDATES_DATA: AppUpdate[] = [
  {
    id: 'upd-latest',
    title: 'ATV Sports Stability & Android TV Navigation Refresh',
    version: 'v3.4.2',
    releaseDate: 'September 18, 2026',
    downloadUrl: 'https://atvsports.site/',
    compatibility: 'Android 5.0+, Android TV, Fire OS 6.0+',
    whatsNew: [
      'Refined D-pad remote navigation layout specifically for high-definition television screens.',
      'Added dedicated tournament filters for international continental cups.',
      'New real-time network status indicator in the top toolbar.',
    ],
    bugFixes: [
      'Resolved occasional audio desynchronization on older quad-core TV boxes.',
      'Fixed minor aspect-ratio distortion when switching between full-screen and fixture detail views.',
      'Corrected timezone conversion edge case during daylight saving transitions.',
    ],
    improvements: [
      'Optimized memory footprint by 18% during prolonged live score streaming sessions.',
      'Accelerated schedule data caching on cold launch by over 30%.',
      'Smoother list scrolling on 60Hz and 120Hz display panels.',
    ],
  },
  {
    id: 'upd-3-4-0',
    title: 'Match Schedule Revamp & Bandwidth Saver Mode',
    version: 'v3.4.0',
    releaseDate: 'August 29, 2026',
    downloadUrl: 'https://atvsports.site/',
    compatibility: 'Android 5.0+, Android TV, Fire OS 6.0+',
    whatsNew: [
      'Introduced optional Bandwidth Saver Mode for metered mobile network users.',
      'Added star icon bookmarking for favorite sports leagues and teams.',
      'Support for Android 15 edge-to-edge layout guidelines.',
    ],
    bugFixes: [
      'Addressed intermittent crash on launch when offline or on captive portal networks.',
      'Patched thumbnail caching issue on devices with low storage.',
    ],
    improvements: [
      'Enhanced font rendering contrast across both dark and daytime viewing conditions.',
      'Upgraded internal HTTP request handling to reduce API latency.',
    ],
  },
  {
    id: 'upd-3-3-5',
    title: 'Multi-League Calendar & Performance Patch',
    version: 'v3.3.5',
    releaseDate: 'July 14, 2026',
    downloadUrl: 'https://atvsports.site/',
    compatibility: 'Android 5.0+, Android TV, Fire OS',
    whatsNew: [
      'Integrated unified cricket and football match day calendars.',
      'Added Quick Search shortcut for rapid team lookup.',
    ],
    bugFixes: [
      'Fixed D-pad focus indicator disappearing after returning from background sleep.',
      'Resolved orientation lock glitch on select 7-inch Android tablets.',
    ],
    improvements: [
      'Reduced overall APK installer footprint to under 22 MB.',
      'Improved hardware video decoder fallback mechanisms.',
    ],
  },
];
