import React from 'react';

interface ImageItem {
  id: string;
  src?: string;
  title: string;
  description: string;
  command?: string;
  explanation?: string;
  tool?: string;
}

interface GalleryProps {
  title: string;
  subtitle: string;
  items: ImageItem[];
  onItemClick: (item: ImageItem) => void;
}

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
        {items.map((item) => (
          <div
            key={item.id}
            className="group relative glass-card rounded-lg overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5 active:scale-[0.98]"
            onClick={() => onItemClick(item)}
          >
            <div className="aspect-video overflow-hidden relative">
              {item.src ? (
                <img
                  src={item.src}
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
        ))}
      </div>
    </div>
  );
};

export default Gallery;
