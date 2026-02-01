
import React, { useState, useEffect } from 'react';
import StoryRail from '../components/StoryRail';
import FeedItem from '../components/FeedItem';
import { useAuth } from '../contexts/AuthContext';
import { Zap, Activity, Users } from 'lucide-react';
import { MOCK_USERS } from '../constants';
import { User } from '../types';

const Home: React.FC = () => {
  const { user, posts } = useAuth();
  const [vaultUsers, setVaultUsers] = useState<User[]>([]);

  useEffect(() => {
    const vault = localStorage.getItem('hp_nexus_vault');
    if (vault) {
      setVaultUsers(JSON.parse(vault));
    }
  }, []);

  // Display a mix of mock and newly registered users
  const suggestedUsers = [...vaultUsers.filter(u => u.id !== user?.id), ...MOCK_USERS].slice(0, 5);

  return (
    <div className="flex gap-12">
      <div className="flex-1 max-w-[600px]">
        <div className="mb-10 flex items-end justify-between px-2">
          <div>
            <h2 className="text-4xl font-black tracking-tighter leading-none mb-2 text-gradient">System Live.</h2>
            <p className="text-gray-500 font-medium tracking-wide">Secure login: <span className="text-white">@{user?.username}</span></p>
          </div>
          <div className="hidden sm:flex items-center gap-2 glass px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-cyan-400">
            <Activity size={12} /> Node Encryption: Active
          </div>
        </div>

        <StoryRail />
        
        <div className="space-y-4">
          {posts.map(post => (
            <FeedItem key={post.id} post={post} />
          ))}
        </div>
      </div>

      <div className="hidden xl:block w-[300px] space-y-8">
        <div className="glass p-6 rounded-[32px] border-cyan-500/20 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
          <div className="flex items-center gap-3 mb-4">
            <Zap size={18} className="text-purple-400" fill="currentColor" />
            <span className="text-xs font-black uppercase tracking-widest text-purple-400">System Status</span>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            Network traffic is optimal. Your node is currently <span className="text-cyan-400 font-bold">{user?.isPrivate ? 'PRIVATE' : 'PUBLIC'}</span>.
          </p>
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <div className="h-full cyber-gradient w-3/4 shadow-[0_0_10px_#00f2fe]" />
          </div>
        </div>

        <div className="px-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-500">Connect Nodes</h3>
            <Users size={14} className="text-gray-600" />
          </div>
          <div className="space-y-6">
            {suggestedUsers.map(u => (
              <div key={u.id} className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-4">
                  <img src={u.avatar} className="w-10 h-10 rounded-xl glass border-white/5" />
                  <div className="min-w-0">
                    <p className="font-bold text-xs group-hover:text-cyan-400 transition-colors truncate">@{u.username}</p>
                    <p className="text-[10px] text-gray-600 truncate">{u.fullName}</p>
                  </div>
                </div>
                <button className="text-[10px] font-black uppercase tracking-widest text-white hover:text-cyan-400">Sync</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
