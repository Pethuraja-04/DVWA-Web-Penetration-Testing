import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    src?: string;
    title: string;
    description: string;
    command?: string;
    explanation?: string;
    tool?: string;
  } | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 animate-fade-in"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />
      
      <div 
        className="relative max-w-5xl w-full glass-card border border-white/10 rounded-lg overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all z-10"
        >
          ✕
        </button>

        <div className="flex-1 overflow-y-auto">
          {data.src ? (
            <div className="w-full bg-black/50 aspect-video flex items-center justify-center">
              <img src={data.src} alt={data.title} className="max-w-full max-h-full object-contain" />
            </div>
          ) : (
            <div className="w-full aspect-video bg-[#030405] flex flex-col items-center justify-center gap-4 relative overflow-hidden">
               <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(#00ff41_1px,transparent_1px),linear-gradient(90deg,#00ff41_1px,transparent_1px)] bg-[size:20px_20px]" />
               <div className="text-6xl opacity-50">📸</div>
               <p className="text-slate-500 font-mono text-sm uppercase tracking-widest">Image Placeholder</p>
            </div>
          )}

          <div className="p-8 sm:p-12 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="px-3 py-1 rounded-lg border border-[#00ff41]/20 bg-[#00ff41]/5 text-[#00ff41] font-mono text-[10px] font-bold uppercase tracking-widest">
                  {data.tool || 'Analysis'}
                </span>
                <span className="text-slate-500 font-mono text-[10px] uppercase tracking-widest">Evidence ID: {Math.random().toString(36).substr(2, 6).toUpperCase()}</span>
              </div>
              <h2 className="text-3xl font-bold text-white tracking-tight">{data.title}</h2>
              <p className="text-slate-400 text-lg leading-relaxed">{data.description}</p>
            </div>

            {data.command && (
              <div className="space-y-3">
                <h3 className="text-xs font-mono font-bold text-[#00ff41] uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00ff41]" />
                  Execution Command
                </h3>
                <div className="bg-black/80 rounded-xl p-5 border border-white/5 font-mono text-sm text-slate-300 relative group">
                  <code className="block whitespace-pre-wrap">{data.command}</code>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Bash</span>
                  </div>
                </div>
              </div>
            )}

            {data.explanation && (
              <div className="space-y-3">
                <h3 className="text-xs font-mono font-bold text-[#bc13fe] uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#bc13fe]" />
                  Attack Explanation
                </h3>
                <div className="bg-[#bc13fe]/5 rounded-xl p-6 border border-[#bc13fe]/10 text-slate-300 leading-relaxed">
                  {data.explanation}
                </div>
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
  );
};

export default Modal;
