import React, { useState, useEffect, useCallback } from 'react';
import type { DataEntry } from './Gallery';

interface ModalData {
  src?: string;
  srcs?: string[];
  title: string;
  description: string;
  command?: string;
  explanation?: string;
  tool?: string;
  /** Multiple text entries navigated one-by-one */
  data?: DataEntry[];
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ModalData | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, data }) => {
  const [imgIndex, setImgIndex] = useState(0);
  const [dataIndex, setDataIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  // Build images array
  const images: string[] = data?.srcs?.length
    ? data.srcs
    : data?.src
    ? [data.src]
    : [];
  const totalImgs = images.length;

  // Build data entries: prefer data[], else build one from top-level fields
  const entries: DataEntry[] = data?.data?.length
    ? data.data
    : [{ title: data?.title ?? '', description: data?.description ?? '', command: data?.command, explanation: data?.explanation }];
  const totalEntries = entries.length;
  const currentEntry = entries[dataIndex];

  const goPrevImg = useCallback(() => setImgIndex((i) => (i - 1 + totalImgs) % totalImgs), [totalImgs]);
  const goNextImg = useCallback(() => setImgIndex((i) => (i + 1) % totalImgs), [totalImgs]);
  const goPrevData = useCallback(() => setDataIndex((i) => (i - 1 + totalEntries) % totalEntries), [totalEntries]);
  const goNextData = useCallback(() => setDataIndex((i) => (i + 1) % totalEntries), [totalEntries]);

  // Keyboard support
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { if (fullscreen) setFullscreen(false); else onClose(); }
      if (e.key === 'ArrowLeft') fullscreen ? goPrevImg() : goPrevData();
      if (e.key === 'ArrowRight') fullscreen ? goNextImg() : goNextData();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, fullscreen, goPrevImg, goNextImg, goPrevData, goNextData, onClose]);

  // Reset when item changes
  useEffect(() => {
    setImgIndex(0);
    setDataIndex(0);
    setFullscreen(false);
  }, [data]);

  if (!isOpen || !data) return null;

  const currentSrc = images[imgIndex] ?? null;

  return (
    <>
      {/* ─── Fullscreen Lightbox ─────────────────────────────────────────── */}
      {fullscreen && currentSrc && (
        <div
          className="fixed inset-0 z-[200] bg-black flex items-center justify-center"
          onClick={() => setFullscreen(false)}
        >
          <button
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all z-10"
            onClick={() => setFullscreen(false)}
            aria-label="Close fullscreen"
          >✕</button>

          {totalImgs > 1 && (
            <button onClick={(e) => { e.stopPropagation(); goPrevImg(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/70 border border-white/15 flex items-center justify-center text-white hover:text-[#00ff41] hover:border-[#00ff41]/40 transition-all z-10">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
          )}

          <img key={`fs-${imgIndex}`} src={currentSrc} alt={`${data.title} fullscreen`}
            className="max-w-full max-h-full object-contain select-none animate-in fade-in duration-200"
            onClick={(e) => e.stopPropagation()} />

          {totalImgs > 1 && (
            <button onClick={(e) => { e.stopPropagation(); goNextImg(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/70 border border-white/15 flex items-center justify-center text-white hover:text-[#00ff41] hover:border-[#00ff41]/40 transition-all z-10">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          )}

          {totalImgs > 1 && (
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/60 border border-white/10 backdrop-blur-sm">
              <span className="font-mono text-xs text-slate-300 font-bold tracking-widest">{imgIndex + 1} / {totalImgs}</span>
            </div>
          )}
          <div className="absolute top-5 left-5 px-2.5 py-1 rounded-full bg-black/50 border border-white/10">
            <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">ESC to exit</span>
          </div>
        </div>
      )}

      {/* ─── Main Modal ──────────────────────────────────────────────────── */}
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 animate-fade-in" onClick={onClose}>
        <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />

        <div
          className="relative max-w-5xl w-full glass-card border border-white/10 rounded-lg overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close */}
          <button onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all z-10">
            ✕
          </button>

          <div className="flex-1 overflow-y-auto">

            {/* ── Image section ────────────────────────────────────────────── */}
            <div className="relative w-full bg-black/50 aspect-video flex items-center justify-center select-none">
              {currentSrc ? (
                <>
                  <img key={imgIndex} src={currentSrc} alt={`${data.title} ${imgIndex + 1}`}
                    className="max-w-full max-h-full object-contain transition-opacity duration-300 cursor-zoom-in"
                    onClick={() => setFullscreen(true)} title="Click to view fullscreen" />

                  {/* Expand icon */}
                  <button onClick={() => setFullscreen(true)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-black/60 border border-white/10 flex items-center justify-center text-white/60 hover:text-[#00ff41] hover:border-[#00ff41]/30 transition-all backdrop-blur-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" />
                      <line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" />
                    </svg>
                  </button>
                </>
              ) : (
                <div className="w-full h-full bg-[#030405] flex flex-col items-center justify-center gap-4 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(#00ff41_1px,transparent_1px),linear-gradient(90deg,#00ff41_1px,transparent_1px)] bg-[size:20px_20px]" />
                  <div className="text-6xl opacity-50">📸</div>
                  <p className="text-slate-500 font-mono text-sm uppercase tracking-widest">Image Placeholder</p>
                </div>
              )}

              {/* Image arrows */}
              {totalImgs > 1 && (
                <button onClick={(e) => { e.stopPropagation(); goPrevImg(); }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 border border-white/15 flex items-center justify-center text-white hover:text-[#00ff41] hover:border-[#00ff41]/40 transition-all backdrop-blur-sm z-10">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><polyline points="15 18 9 12 15 6" /></svg>
                </button>
              )}
              {totalImgs > 1 && (
                <button onClick={(e) => { e.stopPropagation(); goNextImg(); }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 border border-white/15 flex items-center justify-center text-white hover:text-[#00ff41] hover:border-[#00ff41]/40 transition-all backdrop-blur-sm z-10">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><polyline points="9 18 15 12 9 6" /></svg>
                </button>
              )}

              {/* Image dots */}
              {totalImgs > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((_, idx) => (
                    <button key={idx} onClick={(e) => { e.stopPropagation(); setImgIndex(idx); }}
                      className={`rounded-full transition-all duration-300 ${idx === imgIndex ? 'w-5 h-2 bg-[#00ff41]' : 'w-2 h-2 bg-white/30 hover:bg-white/60'}`}
                      aria-label={`Image ${idx + 1}`} />
                  ))}
                </div>
              )}

              {/* Image counter */}
              {totalImgs > 1 && (
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 border border-white/10 backdrop-blur-sm">
                  <span className="font-mono text-[10px] text-slate-300 font-bold tracking-widest">{imgIndex + 1} / {totalImgs}</span>
                </div>
              )}
            </div>

            {/* ── Data / Text stepper section ──────────────────────────────── */}
            <div className="p-8 sm:p-12 space-y-8">

              {/* Step progress bar (only when data[] has multiple entries) */}
              {totalEntries > 1 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-[#bc13fe] font-bold uppercase tracking-widest">
                       {dataIndex + 1} of {totalEntries}
                    </span>
                    <div className="flex gap-1.5">
                      {entries.map((_, idx) => (
                        <button key={idx} onClick={() => setDataIndex(idx)}
                          className={`rounded-full transition-all duration-300 ${idx === dataIndex ? 'w-6 h-2 bg-[#bc13fe]' : 'w-2 h-2 bg-white/20 hover:bg-white/40'}`}
                          aria-label={`Step ${idx + 1}`} />
                      ))}
                    </div>
                  </div>
                  {/* full progress track */}
                  <div className="w-full h-0.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#bc13fe] to-[#7c3aed] rounded-full transition-all duration-500"
                      style={{ width: `${((dataIndex + 1) / totalEntries) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Animated entry content */}
              <div key={dataIndex} className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-400">
                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 rounded-lg border border-[#00ff41]/20 bg-[#00ff41]/5 text-[#00ff41] font-mono text-[10px] font-bold uppercase tracking-widest">
                    {data.tool || 'Analysis'}
                  </span>
                 
                  <span className="text-slate-500 font-mono text-[10px] uppercase tracking-widest">
                    Evidence ID: {Math.random().toString(36).substr(2, 6).toUpperCase()}
                  </span>
                </div>

                <h2 className="text-3xl font-bold text-white tracking-tight">{currentEntry.title}</h2>
                <p className="text-slate-400 text-lg leading-relaxed">{currentEntry.description}</p>
              </div>

              {currentEntry.command && (
                <div key={`cmd-${dataIndex}`} className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-400">
                  <h3 className="text-xs font-mono font-bold text-[#00ff41] uppercase tracking-widest flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00ff41]" />
                    Execution Command
                  </h3>
                  <div className="bg-black/80 rounded-xl p-5 border border-white/5 font-mono text-sm text-slate-300 relative group">
                    <code className="block whitespace-pre-wrap">{currentEntry.command}</code>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[10px] text-slate-500 uppercase font-bold">Bash</span>
                    </div>
                  </div>
                </div>
              )}

              {currentEntry.explanation && (
                <div key={`exp-${dataIndex}`} className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-400">
                  <h3 className="text-xs font-mono font-bold text-[#bc13fe] uppercase tracking-widest flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#bc13fe]" />
                    Attack Explanation
                  </h3>
                  <div className="bg-[#bc13fe]/5 rounded-xl p-6 border border-[#bc13fe]/10 text-slate-300 leading-relaxed">
                    {currentEntry.explanation}
                  </div>
                </div>
              )}

              {/* ── Prev / Next step navigation buttons ──────────────────── */}
              {totalEntries > 1 && (
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <button
                    onClick={goPrevData}
                    disabled={dataIndex === 0}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-slate-400 hover:text-white hover:border-white/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed font-mono text-xs font-bold uppercase tracking-widest"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><polyline points="15 18 9 12 15 6" /></svg>
                    Previous
                  </button>

                  <span className="font-mono text-[10px] text-slate-600 uppercase tracking-widest">
                    {dataIndex + 1} / {totalEntries}
                  </span>

                  <button
                    onClick={goNextData}
                    disabled={dataIndex === totalEntries - 1}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#bc13fe]/30 bg-[#bc13fe]/5 text-[#bc13fe] hover:border-[#bc13fe]/60 hover:bg-[#bc13fe]/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed font-mono text-xs font-bold uppercase tracking-widest"
                  >
                    Next
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><polyline points="9 18 15 12 9 6" /></svg>
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="p-6 border-t border-white/5 bg-white/5 flex justify-between items-center">
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500/50" />
              <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
              <div className="w-2 h-2 rounded-full bg-green-500/50" />
            </div>
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest italic">Confidential Security Document</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
