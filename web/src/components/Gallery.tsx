import React, { useState, useEffect, useRef } from 'react';

export interface DataEntry {
  title: string;
  description: string;
  command?: string;
  explanation?: string;
}

export interface ImageItem {
  id: string;
  src?: string;
  srcs?: string[];
  /** single title/description/command (legacy) */
  title: string;
  description: string;
  command?: string;
  explanation?: string;
  tool?: string;
  /** multiple text entries shown one-by-one in the modal */
  data?: DataEntry[];
}

interface GalleryProps {
  title: string;
  subtitle: string;
  items: ImageItem[];
  onItemClick: (item: ImageItem) => void;
}

/** Auto-sliding card thumbnail when srcs[] has multiple images */
const SlidingThumbnail: React.FC<{ srcs: string[]; title: string }> = ({ srcs, title }) => {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (srcs.length <= 1) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % srcs.length);
    }, 2000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [srcs.length]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {srcs.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={`${title} ${i + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
            i === index ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
          }`}
        />
      ))}
      {srcs.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {srcs.map((_, i) => (
            <span
              key={i}
              className={`block rounded-full transition-all duration-300 ${
                i === index ? 'w-4 h-1.5 bg-[#00ff41]' : 'w-1.5 h-1.5 bg-white/30'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const Gallery: React.FC<GalleryProps> = ({ title, subtitle, items, onItemClick }) => {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5">
          <span className="w-2 h-2 rounded-full bg-[#00ff41] animate-pulse" />
          <span className="font-mono text-[10px] text-slate-400 font-bold uppercase tracking-widest">{subtitle}</span>
        </div>
        <h2 className="text-4xl font-bold text-white tracking-tight">{title}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item) => {
          const hasSrcs = item.srcs && item.srcs.length > 0;
          const thumbSrc = item.srcs?.[0] ?? item.src;
          const imageCount = item.srcs?.length ?? (item.src ? 1 : 0);

          return (
            <div
              key={item.id}
              className="group relative glass-card rounded-lg overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5 active:scale-[0.98]"
              onClick={() => onItemClick(item)}
            >
              <div className="aspect-video overflow-hidden relative">
                {hasSrcs ? (
                  <SlidingThumbnail srcs={item.srcs!} title={item.title} />
                ) : thumbSrc ? (
                  <img
                    src={thumbSrc}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-[#0d1117] flex flex-col items-center justify-center gap-3">
                    <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(#00ff41_1px,transparent_1px),linear-gradient(90deg,#00ff41_1px,transparent_1px)] bg-[size:15px_15px]" />
                    <span className="text-3xl grayscale group-hover:grayscale-0 transition-all duration-500">📸</span>
                    <span className="text-[10px] font-mono text-slate-600 font-bold uppercase tracking-[0.2em]">{item.tool || 'Capture'}</span>
                  </div>
                )}

                {/* Multi-image badge */}
                {imageCount > 1 && (
                  <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/70 border border-white/10 backdrop-blur-sm z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-[#00ff41]">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                    <span className="font-mono text-[10px] text-slate-300 font-bold">{imageCount}</span>
                  </div>
                )}

                {/* Multi-data badge */}
                {/* {dataCount > 1 && (
                  <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/70 border border-[#bc13fe]/30 backdrop-blur-sm z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-[#bc13fe]">
                      <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
                      <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
                    </svg>
                    <span className="font-mono text-[10px] text-[#bc13fe] font-bold">{dataCount} steps</span>
                  </div>
                )} */}

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <div className="w-full h-1 bg-[#00ff41]/20 rounded-full overflow-hidden">
                    <div className="w-full h-full bg-[#00ff41] -translate-x-full group-hover:translate-x-0 transition-transform duration-1000" />
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono text-[#00ff41] font-bold uppercase tracking-widest">LOG_{item.id}</span>
                  <div className="flex gap-1">
                    <div className="w-1 h-1 rounded-full bg-white/20" />
                    <div className="w-1 h-1 rounded-full bg-white/20" />
                    <div className="w-1 h-1 rounded-full bg-[#00ff41]" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-[#00ff41] transition-colors">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">{item.description}</p>

                <div className="pt-4 flex items-center gap-2 text-[10px] font-mono text-slate-600 font-bold uppercase tracking-widest group-hover:text-slate-400 transition-colors">
                  <span>View Analysis</span>
                  <span className="translate-x-0 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>

              {/* Gloss Highlight */}
              <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-25deg] group-hover:left-[100%] transition-all duration-1000 ease-in-out" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Gallery;
