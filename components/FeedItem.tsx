
import React, { useState } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Sparkles } from 'lucide-react';
import { Post } from '../types';
import { geminiService } from '../services/geminiService';

interface FeedItemProps {
  post: Post;
}

const FeedItem: React.FC<FeedItemProps> = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [isCheckingVibe, setIsCheckingVibe] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
    setLikesCount(liked ? likesCount - 1 : likesCount + 1);
  };

  const handleVibeCheck = async () => {
    setIsCheckingVibe(true);
    const comment = await geminiService.suggestComment(post.caption);
    setAiInsight(comment);
    setIsCheckingVibe(false);
    setTimeout(() => setAiInsight(null), 5000);
  };

  return (
    <article className="glass rounded-[32px] overflow-hidden mb-12 transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/10 group">
      {/* Header */}
      <div className="flex items-center justify-between p-5">
        <div className="flex items-center gap-3">
          <div className="p-[2px] rounded-full bg-gradient-to-br from-cyan-400 to-purple-600">
            <img 
              src={post.user.avatar} 
              alt={post.user.username} 
              className="w-10 h-10 rounded-full object-cover border-2 border-black"
            />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-bold text-sm tracking-tight">{post.user.username}</span>
              {post.user.isVerified && <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f2fe]" />}
            </div>
            <p className="text-[10px] text-gray-500 font-medium uppercase tracking-widest">{post.timestamp}</p>
          </div>
        </div>
        <button className="text-gray-500 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Image with Tilt-like effect container */}
      <div className="relative group/img overflow-hidden px-5">
        <div 
          className="aspect-square md:aspect-video rounded-3xl overflow-hidden relative cursor-pointer"
          onDoubleClick={toggleLike}
        >
          <img 
            src={post.imageUrl} 
            alt="Content" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity" />
          
          {aiInsight && (
            <div className="absolute bottom-6 left-6 right-6 p-4 glass rounded-2xl text-xs font-semibold animate-bounce shadow-2xl border-cyan-500/30">
              <span className="text-cyan-400 mr-2">✦ AI Vibe:</span> {aiInsight}
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-6">
            <button onClick={toggleLike} className="group/btn relative">
              <Heart 
                size={26} 
                className={`${liked ? 'fill-red-500 text-red-500 scale-110' : 'text-white hover:text-red-400'} transition-all duration-300`} 
              />
              {liked && <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full" />}
            </button>
            <button className="text-white hover:text-cyan-400 transition-colors">
              <MessageCircle size={26} />
            </button>
            <button 
              onClick={handleVibeCheck}
              disabled={isCheckingVibe}
              className={`text-white hover:text-purple-400 transition-colors ${isCheckingVibe ? 'animate-spin' : ''}`}
            >
              <Sparkles size={26} />
            </button>
          </div>
          <button className="text-white hover:text-yellow-400 transition-colors">
            <Bookmark size={26} />
          </button>
        </div>

        {/* Stats & Caption */}
        <div className="space-y-2">
          <div className="text-sm font-bold tracking-tight">
            {likesCount.toLocaleString()} <span className="text-gray-500 font-normal">Pulses</span>
          </div>
          <div className="text-sm leading-relaxed">
            <span className="font-extrabold mr-2 text-gradient">{post.user.username}</span>
            <span className="text-gray-300">{post.caption}</span>
          </div>
          
          <button className="text-xs font-bold text-gray-500 uppercase tracking-widest pt-2 hover:text-cyan-400 transition-colors">
            Access {post.comments.length} Data Strings
          </button>
        </div>

        {/* Input */}
        <div className="mt-6 flex items-center bg-white/5 rounded-2xl px-4 py-2 border border-white/5 focus-within:border-cyan-500/50 transition-all">
          <input 
            type="text" 
            placeholder="Broadcast a thought..." 
            className="flex-1 text-sm outline-none bg-transparent py-2 placeholder:text-gray-600"
          />
          <button className="text-cyan-400 text-xs font-black uppercase tracking-widest ml-4">
            Send
          </button>
        </div>
      </div>
    </article>
  );
};

export default FeedItem;
