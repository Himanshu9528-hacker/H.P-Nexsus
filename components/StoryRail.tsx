
import React, { useState, useEffect } from 'react';
import { X, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import { MOCK_STORIES, CURRENT_USER } from '../constants';

const StoryRail: React.FC = () => {
  const [activeStory, setActiveStory] = useState<any | null>(null);

  return (
    <>
      <div className="flex gap-4 md:gap-6 overflow-x-auto py-4 md:py-6 mb-8 no-scrollbar">
        {/* Personal Entry */}
        <div className="flex flex-col items-center gap-2.5 min-w-[75px] cursor-pointer">
          <div className="relative group">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full p-[2px] glass group-hover:border-cyan-500/50 transition-all">
              <div className="w-full h-full bg-[#050505] rounded-full p-1">
                 <img src={CURRENT_USER.avatar} className="w-full h-full rounded-full object-cover grayscale group-hover:grayscale-0 transition-all" />
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 cyber-gradient rounded-full p-1 shadow-lg border-2 border-[#050505]">
              <Plus className="w-3 h-3 text-white" />
            </div>
          </div>
          <span className="text-[9px] font-bold text-gray-500 uppercase tracking-tighter">Your Hub</span>
        </div>

        {/* Active Portals */}
        {MOCK_STORIES.map(story => (
          <div 
            key={story.id} 
            onClick={() => setActiveStory(story)}
            className="flex flex-col items-center gap-2.5 min-w-[75px] cursor-pointer group"
          >
            <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full p-[2px] transition-transform duration-300 group-hover:scale-105 ${story.hasUnseen ? 'cyber-gradient story-glow' : 'glass'}`}>
              <div className="w-full h-full bg-[#050505] rounded-full p-1">
                <img src={story.user.avatar} className="w-full h-full rounded-full object-cover" />
              </div>
            </div>
            <span className="text-[9px] font-bold text-white uppercase tracking-tighter truncate w-16 text-center">{story.user.username}</span>
          </div>
        ))}
      </div>

      {/* Story Viewer Modal */}
      {activeStory && (
        <div className="fixed inset-0 z-[500] bg-black/95 flex items-center justify-center p-0 md:p-10 animate-in fade-in duration-300">
          <div className="absolute top-6 right-6 z-50 flex gap-4">
             <button onClick={() => setActiveStory(null)} className="text-white/60 hover:text-white"><X size={32} /></button>
          </div>
          <div className="w-full max-w-[420px] h-full max-h-[750px] relative glass rounded-none md:rounded-[40px] overflow-hidden shadow-2xl flex flex-col">
             <div className="absolute top-0 left-0 right-0 h-1 flex gap-1 p-1 z-50">
                <div className="h-full bg-white/30 flex-1 rounded-full overflow-hidden">
                   <div className="h-full bg-white animate-progress-line" />
                </div>
             </div>
             
             <div className="absolute top-6 left-6 flex items-center gap-3 z-50">
                <img src={activeStory.user.avatar} className="w-10 h-10 rounded-full border border-white/20" />
                <div className="flex flex-col">
                   <span className="text-white text-xs font-black">@{activeStory.user.username}</span>
                   <span className="text-[9px] text-white/50 uppercase font-black tracking-widest">Transmitting Now</span>
                </div>
             </div>

             <img src={`https://picsum.photos/seed/${activeStory.id}/1080/1920`} className="w-full h-full object-cover" />
             
             <div className="absolute bottom-10 left-6 right-6 flex items-center gap-4 z-50">
                <div className="flex-1 glass px-6 py-4 rounded-3xl border-white/10 flex items-center">
                   <input placeholder="Neural response..." className="bg-transparent outline-none text-xs text-white w-full" />
                </div>
                <Zap className="text-cyan-400" size={24} />
             </div>
          </div>
        </div>
      )}
    </>
  );
};

const Plus: React.FC<{className?: string}> = ({className}) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
  </svg>
);

export default StoryRail;
