
import React, { useState, useRef, useEffect } from 'react';
import { Settings, Grid, Bookmark, ShieldCheck, Share2, Zap, LogOut, X, User as UserIcon, AtSign, Save, ShieldAlert, Lock, Camera, Eye, EyeOff, Film, Link as LinkIcon, Plus, Info, MessageCircle, FileText, Heart, Send } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { MOCK_USERS } from '../constants';
import { Post } from '../types';

const Profile: React.FC = () => {
  const { user, logout, updateUser, posts, reels } = useAuth();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'posts' | 'reels' | 'saved'>('posts');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [editForm, setEditForm] = useState({
    fullName: user?.fullName || '',
    username: user?.username || '',
    bio: user?.bio || '',
    isPrivate: user?.isPrivate || false
  });

  useEffect(() => {
    if (user) {
      setEditForm({
        fullName: user.fullName,
        username: user.username,
        bio: user.bio || '',
        isPrivate: !!user.isPrivate
      });
    }
  }, [user, isEditing]);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(editForm);
    setIsEditing(false);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateUser({ avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  if (!user) return null;

  const userPosts = posts.filter(p => p.user.id === user.id || p.id === 'p1');

  return (
    <div className="pt-4 md:pt-8 animate-in fade-in duration-700 max-w-5xl mx-auto px-4">
      {/* Profile Header */}
      <header className="mb-12">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-16">
          <div className="relative group">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full p-1 cyber-gradient animate-pulse shadow-[0_0_25px_rgba(0,242,254,0.3)]">
              <div 
                className="w-full h-full bg-[#050505] rounded-full p-1 overflow-hidden relative cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <img src={user.avatar} className="w-full h-full rounded-full object-cover transition-transform group-hover:scale-110 duration-500" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center">
                  <Camera size={20} className="text-white mb-1" />
                  <span className="text-[7px] font-black uppercase tracking-widest text-white">Override</span>
                </div>
              </div>
            </div>
            <input type="file" ref={fileInputRef} onChange={handleAvatarChange} className="hidden" accept="image/*" />
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
              <h2 className="text-2xl font-black tracking-tighter text-white flex items-center gap-2">
                {user.username}
                {user.isVerified && <ShieldCheck size={18} className="text-cyan-400" />}
              </h2>
              <div className="flex gap-2">
                <button onClick={() => setIsEditing(true)} className="glass px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border-white/10 hover:bg-white/5 transition-all">Configure Node</button>
                <button onClick={() => setIsSettingsOpen(true)} className="glass p-2 rounded-xl border-white/10"><Settings size={18} /></button>
              </div>
            </div>

            <div className="flex justify-center md:justify-start gap-8 mb-6">
              <div className="cursor-default">
                <span className="text-lg font-black block text-white">{userPosts.length}</span>
                <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Transmissions</span>
              </div>
              <div className="cursor-pointer group" onClick={() => setShowFollowers(true)}>
                <span className="text-lg font-black block text-white group-hover:text-cyan-400 transition-colors">14.2K</span>
                <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Nodes</span>
              </div>
              <div className="cursor-pointer group" onClick={() => setShowFollowing(true)}>
                <span className="text-lg font-black block text-white group-hover:text-cyan-400 transition-colors">85</span>
                <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Synced</span>
              </div>
            </div>

            <div className="space-y-2 max-w-md mx-auto md:mx-0">
              <h3 className="font-bold text-sm text-gray-100">{user.fullName}</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-medium whitespace-pre-line">
                {user.bio || "Neural buffer empty. Update bio via 'Configure Node'."}
              </p>
              <a href="#" className="flex items-center gap-2 text-cyan-400 text-xs font-bold hover:underline">
                <LinkIcon size={12} />
                <span>himanshu-console.vercel.app</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex justify-center border-t border-white/5 mb-6 pt-4">
        <div className="flex gap-12">
          <TabButton active={activeTab === 'posts'} onClick={() => setActiveTab('posts')} icon={<Grid size={16} />} label="Transmissions" />
          <TabButton active={activeTab === 'reels'} onClick={() => setActiveTab('reels')} icon={<Film size={16} />} label="Loops" />
          <TabButton active={activeTab === 'saved'} onClick={() => setActiveTab('saved')} icon={<Bookmark size={16} />} label="Encrypted" />
        </div>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-3 gap-1 md:gap-4 pb-24">
        {activeTab === 'posts' && userPosts.map((post) => (
          <div 
            key={post.id} 
            onClick={() => setSelectedPost(post)}
            className="aspect-square relative group overflow-hidden glass rounded-sm md:rounded-2xl border-white/5 cursor-pointer"
          >
            <img src={post.imageUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-6">
              <div className="flex items-center gap-1.5 text-white font-black"><Heart size={18} fill="white" /> {post.likes}</div>
              <div className="flex items-center gap-1.5 text-white font-black"><MessageCircle size={18} fill="white" /> {post.comments.length}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Post Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10 bg-black/95 backdrop-blur-md animate-in fade-in duration-300">
          <button onClick={() => setSelectedPost(null)} className="absolute top-6 right-6 text-white hover:rotate-90 transition-transform"><X size={32} /></button>
          <div className="glass w-full max-w-5xl h-full max-h-[800px] flex flex-col md:flex-row rounded-[32px] overflow-hidden border-white/10 shadow-2xl">
            <div className="flex-1 bg-black flex items-center justify-center">
              <img src={selectedPost.imageUrl} className="max-h-full object-contain" />
            </div>
            <div className="w-full md:w-[400px] flex flex-col bg-[#050505]">
              <div className="p-5 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={selectedPost.user.avatar} className="w-8 h-8 rounded-full border border-cyan-500/30" />
                  <span className="font-bold text-sm text-white">@{selectedPost.user.username}</span>
                </div>
                <Zap size={16} className="text-cyan-400" />
              </div>
              <div className="flex-1 p-5 overflow-y-auto no-scrollbar space-y-4">
                <p className="text-sm text-gray-300 font-medium">{selectedPost.caption}</p>
                <div className="pt-4 space-y-4">
                  {selectedPost.comments.map(c => (
                    <div key={c.id} className="flex gap-3">
                      <span className="text-xs font-black text-white">@{c.username}</span>
                      <p className="text-xs text-gray-400">{c.text}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-5 border-t border-white/5 bg-white/[0.02] space-y-4">
                <div className="flex items-center justify-between text-white">
                  <div className="flex gap-4">
                    <Heart size={24} className="hover:text-red-500 cursor-pointer" />
                    <MessageCircle size={24} className="hover:text-cyan-400 cursor-pointer" />
                    <Send size={24} className="hover:text-purple-400 cursor-pointer" />
                  </div>
                  <Bookmark size={24} className="hover:text-yellow-400 cursor-pointer" />
                </div>
                <div className="text-sm font-black text-white">{selectedPost.likes} Pulses</div>
                <div className="flex items-center gap-3 glass px-4 py-2 rounded-xl">
                  <input placeholder="Inject comment..." className="flex-1 bg-transparent outline-none text-xs text-white" />
                  <button className="text-[10px] font-black uppercase text-cyan-400">Sync</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Followers/Following Modal */}
      {(showFollowers || showFollowing) && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl">
          <div className="glass w-full max-w-sm rounded-[40px] border-white/10 relative overflow-hidden shadow-2xl flex flex-col max-h-[500px]">
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <h3 className="text-sm font-black uppercase tracking-widest">{showFollowers ? 'Nodes Synced (Followers)' : 'Syncing With (Following)'}</h3>
              <button onClick={() => { setShowFollowers(false); setShowFollowing(false); }}><X size={20} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
              {MOCK_USERS.map(u => (
                <div key={u.id} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <img src={u.avatar} className="w-10 h-10 rounded-xl border border-white/5" />
                    <div>
                      <p className="text-xs font-bold text-white">@{u.username}</p>
                      <p className="text-[9px] text-gray-500">{u.fullName}</p>
                    </div>
                  </div>
                  <button className="text-[8px] font-black uppercase glass px-3 py-1 rounded-lg border-white/10 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all">Sync Status</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/95 backdrop-blur-2xl">
          <div className="glass w-full max-w-lg rounded-[48px] border-white/10 relative overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
              <h3 className="text-xl font-black tracking-tighter uppercase text-gradient">System Configuration</h3>
              <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-white/10 rounded-xl"><X size={20} /></button>
            </div>
            <form onSubmit={handleUpdateProfile} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto no-scrollbar">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black uppercase tracking-widest text-gray-500 ml-2">Public Label</label>
                  <div className="glass flex items-center px-6 py-4 rounded-2xl border-white/5 focus-within:border-cyan-500/30">
                    <UserIcon size={16} className="text-gray-500 mr-4" />
                    <input type="text" value={editForm.fullName} onChange={(e) => setEditForm({...editForm, fullName: e.target.value})} className="bg-transparent outline-none flex-1 text-xs font-bold text-white" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black uppercase tracking-widest text-gray-500 ml-2">Node Alias</label>
                  <div className="glass flex items-center px-6 py-4 rounded-2xl border-white/5 focus-within:border-cyan-500/30">
                    <AtSign size={16} className="text-gray-500 mr-4" />
                    <input type="text" value={editForm.username} onChange={(e) => setEditForm({...editForm, username: e.target.value.toLowerCase()})} className="bg-transparent outline-none flex-1 text-xs font-bold text-white" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black uppercase tracking-widest text-gray-500 ml-2">Mission Bio</label>
                  <div className="glass flex items-start px-6 py-4 rounded-2xl border-white/5 focus-within:border-cyan-500/30">
                    <FileText size={16} className="text-gray-500 mr-4 mt-1" />
                    <textarea value={editForm.bio} onChange={(e) => setEditForm({...editForm, bio: e.target.value})} className="bg-transparent outline-none flex-1 text-xs font-medium text-white h-24 resize-none no-scrollbar" />
                  </div>
                </div>
              </div>
              <button type="submit" className="w-full py-5 cyber-gradient text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg">Save Configuration</button>
            </form>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl">
          <div className="glass w-full max-w-sm rounded-[32px] border-white/10 p-8 space-y-4">
            <h3 className="text-center font-black uppercase text-sm mb-6">Nexus Controls</h3>
            <button onClick={logout} className="w-full p-4 rounded-xl glass hover:bg-red-500/10 text-red-500 text-xs font-black flex items-center justify-center gap-3 transition-all">
              <LogOut size={16} /> Terminate Sync
            </button>
            <button onClick={() => setIsSettingsOpen(false)} className="w-full p-4 rounded-xl bg-white/5 text-[9px] font-black uppercase tracking-widest">Abort</button>
          </div>
        </div>
      )}
    </div>
  );
};

const TabButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <button onClick={onClick} className={`flex items-center gap-2 pb-4 transition-all relative ${active ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}>
    <span className={active ? 'scale-110 text-cyan-400' : ''}>{icon}</span>
    <span className="text-[9px] font-black uppercase tracking-[0.2em] hidden sm:block">{label}</span>
    {active && <div className="absolute bottom-[-1px] left-0 right-0 h-0.5 cyber-gradient" />}
  </button>
);

export default Profile;
