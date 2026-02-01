
import React, { useState, useEffect } from 'react';
import { Search, Compass, Zap, Play, X, User as UserIcon, ShieldCheck, Share2 } from 'lucide-react';
import { MOCK_USERS } from '../constants';
import { User, Post } from '../types';
import { useAuth } from '../contexts/AuthContext';

const Explore: React.FC = () => {
  const { posts } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [vaultUsers, setVaultUsers] = useState<User[]>([]);
  
  useEffect(() => {
    const vault = localStorage.getItem('hp_nexus_vault');
    if (vault) {
      setVaultUsers(JSON.parse(vault));
    }
  }, []);

  const allUsers = [...MOCK_USERS, ...vaultUsers];
  
  const filteredUsers = allUsers.filter(u => 
    u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 5);

  // Convert real posts to explore assets
  const realAssets = posts.map(p => ({
    id: p.id,
    url: p.imageUrl,
    type: 'image',
    pulseCount: p.likes,
    tags: 'User Transmission',
    isReal: true,
    user: p.user
  }));

  const mockAssets = Array.from({ length: 12 }).map((_, i) => ({
    id: `mock_${i}`,
    url: `https://picsum.photos/seed/hp_explore_${i}/600/600`,
    type: i % 5 === 0 ? 'video' : 'image',
    pulseCount: Math.floor(Math.random() * 9999),
    tags: ['Aesthetics', 'Code', 'Bio', 'Neural'][i % 4],
    isReal: false,
    user: MOCK_USERS[i % 4]
  }));

  const allAssets = [...realAssets, ...mockAssets];

  const filteredAssets = allAssets.filter(asset => 
    asset.tags.toLowerCase().includes(searchQuery.toLowerCase()) || 
    asset.user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    searchQuery === ''
  );

  return (
    <div className="pt-4 animate-in fade-in duration-1000 px-4">
      <div className="mb-6 max-w-2xl mx-auto relative group">
        <div className="glass flex items-center px-6 py-4 rounded-[28px] border-white/10 focus-within:border-cyan-500/50 focus-within:shadow-[0_0_30px_rgba(0,242,254,0.15)] transition-all">
          <Search className="text-gray-500 mr-4" size={20} />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Agents, Tags or Nodes..." 
            className="bg-transparent outline-none flex-1 text-sm font-medium text-white placeholder:text-gray-700"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="text-gray-500 hover:text-white"><X size={16} /></button>
          )}
        </div>

        {searchQuery && (
          <div className="absolute top-full left-0 right-0 mt-4 glass rounded-[32px] border-white/10 p-4 z-[100] shadow-2xl animate-in slide-in-from-top-2 duration-300 backdrop-blur-3xl">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-4 px-2">Identified Nodes</h3>
            {filteredUsers.length > 0 ? (
              <div className="space-y-2">
                {filteredUsers.map(u => (
                  <div key={u.id} className="flex items-center justify-between p-3 hover:bg-white/5 rounded-2xl transition-all cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <img src={u.avatar} className="w-10 h-10 rounded-xl border border-white/10" />
                      <div>
                        <div className="flex items-center gap-1">
                          <p className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">@{u.username}</p>
                          {u.isVerified && <ShieldCheck size={14} className="text-cyan-400" />}
                        </div>
                        <p className="text-[10px] text-gray-500 font-medium">{u.fullName}</p>
                      </div>
                    </div>
                    <button className="text-[9px] font-black uppercase px-4 py-2 glass rounded-lg border-white/5 text-gray-400 hover:text-cyan-400 hover:border-cyan-500/30">Connect</button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center py-4 text-xs text-gray-600 font-bold uppercase tracking-widest italic">No matching nodes.</p>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mb-8 overflow-x-auto no-scrollbar pb-2">
        <h2 className="text-xl font-black tracking-tighter flex items-center gap-3 shrink-0 mr-6">
          <Compass className="text-cyan-400" size={22} />
          Discoveries
        </h2>
        <div className="flex gap-2">
          {['All', 'Code', 'Aesthetics', 'Neural', 'Bio'].map(tab => (
            <button 
              key={tab} 
              onClick={() => setSearchQuery(tab === 'All' ? '' : tab)}
              className={`glass px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                (searchQuery === tab || (tab === 'All' && searchQuery === '')) 
                ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' 
                : 'text-gray-500 hover:text-white border-white/5'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 pb-24">
        {filteredAssets.map((asset, i) => (
          <div 
            key={asset.id} 
            className={`group relative aspect-square glass rounded-2xl md:rounded-[32px] overflow-hidden border-white/5 transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,242,254,0.1)] hover:-translate-y-1 ${
              (asset as any).isReal ? 'border-cyan-500/30 shadow-[0_0_20px_rgba(0,242,254,0.05)]' : ''
            }`}
          >
            <img src={asset.url} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
            {asset.type === 'video' && <div className="absolute top-4 right-4 glass p-2 rounded-xl"><Play size={12} fill="white" /></div>}
            
            {(asset as any).isReal && (
               <div className="absolute top-4 left-4 glass px-3 py-1 rounded-full border-cyan-500/30">
                  <span className="text-[8px] font-black text-cyan-400 uppercase tracking-widest">Live Link</span>
               </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all flex flex-col justify-end p-5">
               <div className="flex items-center gap-2 mb-2">
                  <img src={asset.user.avatar} className="w-5 h-5 rounded-md border border-white/20" />
                  <span className="text-[10px] font-bold text-white">@{asset.user.username}</span>
               </div>
               <div className="flex justify-between items-center">
                  <span className="text-[9px] font-black text-white/70">{asset.pulseCount} Pulses</span>
                  <span className="text-[8px] font-black text-cyan-400 uppercase tracking-widest">{asset.tags}</span>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
