
import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Heart, MessageCircle, MoreVertical, Zap, Music, Share2, Volume2, VolumeX } from 'lucide-react';

const Reels: React.FC = () => {
  const { reels } = useAuth();
  return (
    <div className="h-[calc(100vh-140px)] md:h-[calc(100vh-64px)] w-full overflow-y-scroll snap-y snap-mandatory no-scrollbar scroll-smooth">
      {reels.map(reel => (
        <ReelItem key={reel.id} reel={reel} />
      ))}
    </div>
  );
};

const ReelItem: React.FC<{ reel: any }> = ({ reel }) => {
  const [liked, setLiked] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showHeart, setShowHeart] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastTap = useRef<number>(0);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) videoRef.current?.play();
        else videoRef.current?.pause();
      });
    }, { threshold: 0.6 });
    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  const handleDoubleTap = () => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      if (!liked) {
        setLiked(true);
        setShowHeart(true);
        setTimeout(() => setShowHeart(false), 800);
      }
    }
    lastTap.current = now;
  };

  return (
    <div className="h-full w-full snap-start relative flex items-center justify-center p-0 md:p-4 mb-4" onClick={handleDoubleTap}>
      <div className="relative w-full max-w-[420px] h-full glass rounded-none md:rounded-[40px] overflow-hidden border-white/10 group shadow-2xl">
        <video ref={videoRef} src={reel.videoUrl} className="w-full h-full object-cover cursor-pointer" loop muted={isMuted} playsInline onClick={() => setIsMuted(!isMuted)} />
        {showHeart && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 animate-in zoom-in fade-out duration-700"><Heart size={120} className="fill-red-500 text-red-500" /></div>}
        
        <div className="absolute top-6 left-6 right-6 flex justify-between z-20">
          <div className="glass px-4 py-2 rounded-2xl flex items-center gap-2 backdrop-blur-md">
            <Zap size={14} className="text-cyan-400 fill-cyan-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400">Neural Stream</span>
          </div>
        </div>

        <div className="absolute right-4 bottom-32 flex flex-col gap-8 items-center z-20">
          <button onClick={() => setLiked(!liked)} className="flex flex-col items-center gap-1">
            <div className={`p-3.5 rounded-2xl glass border-white/5 ${liked ? 'text-red-500' : 'text-white'}`}>
              <Heart className={liked ? 'fill-red-500' : ''} size={26} />
            </div>
            <span className="text-[10px] font-black text-white">{reel.likes}</span>
          </button>
          <div className="p-3.5 rounded-2xl glass text-white border-white/5"><MessageCircle size={26} /></div>
          <div className="w-10 h-10 rounded-xl p-[2px] cyber-gradient"><img src={reel.user.avatar} className="w-full h-full rounded-full object-cover" /></div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8 pt-20 bg-gradient-to-t from-black/90 to-transparent z-10">
          <div className="flex items-center gap-3 mb-4">
            <img src={reel.user.avatar} className="w-12 h-12 rounded-2xl object-cover border border-cyan-500/30" />
            <span className="font-black text-sm text-white">@{reel.user.username}</span>
          </div>
          <p className="text-sm text-gray-200 line-clamp-2 font-medium mb-6">{reel.caption}</p>
        </div>
      </div>
    </div>
  );
};

export default Reels;
