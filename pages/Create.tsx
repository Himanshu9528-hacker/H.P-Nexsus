
import React, { useState, useRef } from 'react';
import { ImageIcon, Loader2, Sparkles, Send, Zap, X, Film, Plus } from 'lucide-react';
import { geminiService } from '../services/geminiService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Create: React.FC = () => {
  const { user, addPost, addReel } = useAuth();
  const [mode, setMode] = useState<'post' | 'reel'>('post');
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedAsset(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateCaption = async () => {
    if (!selectedAsset || mode === 'reel') return;
    setIsGenerating(true);
    try {
      const aiCaption = await geminiService.generateCaption(selectedAsset);
      setCaption(aiCaption);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleTransmit = () => {
    if (!selectedAsset || !user) return;

    if (mode === 'post') {
      addPost({
        id: 'p_' + Date.now(),
        user: user,
        imageUrl: selectedAsset,
        caption: caption || 'Encoded transmission signal.',
        likes: 0,
        comments: [],
        timestamp: 'Just now'
      });
    } else {
      addReel({
        id: 'r_' + Date.now(),
        user: user,
        videoUrl: selectedAsset,
        caption: caption || 'Neural Loop active.',
        likes: 0,
        commentsCount: 0
      });
    }
    
    navigate(mode === 'post' ? '/' : '/reels');
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 animate-in slide-in-from-bottom-10 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
        <div>
          <h2 className="text-4xl font-black tracking-tighter mb-2">Initialize Transmission.</h2>
          <p className="text-gray-500 font-medium">Capture reality and beam it to the portal.</p>
        </div>
        
        <div className="glass p-2 rounded-2xl flex gap-1 border-white/5">
          <button onClick={() => { setMode('post'); setSelectedAsset(null); }} className={`flex items-center gap-2 px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${mode === 'post' ? 'bg-white/10 text-cyan-400' : 'text-gray-500 hover:text-white'}`}>
            <ImageIcon size={16} /> Data Packet
          </button>
          <button onClick={() => { setMode('reel'); setSelectedAsset(null); }} className={`flex items-center gap-2 px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${mode === 'reel' ? 'bg-white/10 text-purple-400' : 'text-gray-500 hover:text-white'}`}>
            <Film size={16} /> Neural Loop
          </button>
        </div>
      </div>

      <div className="glass rounded-[40px] overflow-hidden border-white/10 shadow-2xl">
        {!selectedAsset ? (
          <div onClick={() => fileInputRef.current?.click()} className="h-[500px] flex flex-col items-center justify-center gap-6 cursor-pointer hover:bg-white/5 transition-all group border-2 border-dashed border-white/5 m-6 rounded-[32px]">
            <div className={`w-24 h-24 rounded-3xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform ${mode === 'post' ? 'cyber-gradient' : 'bg-gradient-to-br from-purple-500 to-pink-500'}`}>
              <Plus size={40} className="text-white" />
            </div>
            <p className="text-xl font-black tracking-tight">Upload {mode === 'post' ? 'Visual' : 'Loop'}</p>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept={mode === 'post' ? 'image/*' : 'video/*'} />
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row min-h-[500px]">
            <div className="w-full lg:w-3/5 bg-black/40 flex items-center justify-center relative p-8">
              <button onClick={() => setSelectedAsset(null)} className="absolute top-6 right-6 z-10 bg-black/60 p-2 rounded-xl"><X size={20} /></button>
              {mode === 'post' ? <img src={selectedAsset} className="max-h-full rounded-3xl object-contain" /> : <video src={selectedAsset} className="max-h-full rounded-3xl" autoPlay loop muted />}
            </div>

            <div className="w-full lg:w-2/5 p-8 flex flex-col gap-6 bg-white/[0.02]">
              <textarea value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Describe this loop..." className="flex-1 w-full outline-none text-sm resize-none bg-transparent placeholder:text-gray-700" />
              <div className="space-y-4">
                {mode === 'post' && (
                  <button onClick={handleGenerateCaption} disabled={isGenerating} className="w-full flex items-center justify-center gap-2 py-4 glass text-white rounded-2xl font-black uppercase text-xs tracking-widest">
                    {isGenerating ? <Loader2 className="animate-spin" /> : <><Sparkles size={16} className="text-cyan-400" /> AI Caption</>}
                  </button>
                )}
                <button onClick={handleTransmit} className={`w-full py-4 text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] ${mode === 'post' ? 'cyber-gradient' : 'bg-gradient-to-r from-purple-500 to-pink-500'}`}>
                  <Send size={16} className="inline mr-2" /> Transmit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Create;
