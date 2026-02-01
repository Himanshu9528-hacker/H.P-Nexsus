
import React, { useState } from 'react';
import { Search, Send, Video, Info, Phone, MoreVertical, Zap } from 'lucide-react';
import { MOCK_USERS } from '../constants';

const Messages: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState(MOCK_USERS[0]);
  const [message, setMessage] = useState('');

  return (
    <div className="h-[calc(100vh-120px)] flex glass rounded-[40px] overflow-hidden border-white/10 animate-in fade-in duration-500">
      {/* Sidebar */}
      <div className="w-full md:w-80 border-r border-white/5 flex flex-col">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-xl font-black tracking-tighter mb-4">Neural Links</h2>
          <div className="glass flex items-center px-4 py-2 rounded-xl border-white/5">
            <Search size={16} className="text-gray-500 mr-2" />
            <input placeholder="Scan nodes..." className="bg-transparent outline-none text-xs w-full" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {MOCK_USERS.map(user => (
            <div 
              key={user.id} 
              onClick={() => setSelectedUser(user)}
              className={`flex items-center gap-3 p-4 cursor-pointer transition-all ${selectedUser.id === user.id ? 'bg-white/10 border-l-4 border-cyan-400' : 'hover:bg-white/5'}`}
            >
              <div className="relative">
                <img src={user.avatar} className="w-12 h-12 rounded-2xl object-cover" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-[#050505]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm truncate">{user.username}</p>
                <p className="text-[10px] text-gray-500 truncate">Signal received: 5m ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="hidden md:flex flex-1 flex-col">
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={selectedUser.avatar} className="w-10 h-10 rounded-xl object-cover" />
            <div>
              <p className="font-bold text-sm tracking-tight">{selectedUser.fullName}</p>
              <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest">Active Link</p>
            </div>
          </div>
          <div className="flex gap-4 text-gray-400">
            <Phone size={20} className="hover:text-cyan-400 cursor-pointer" />
            <Video size={20} className="hover:text-cyan-400 cursor-pointer" />
            <Info size={20} className="hover:text-cyan-400 cursor-pointer" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
          <div className="flex justify-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-700 glass px-4 py-1 rounded-full border-white/5">Protocol Established • 12:40 PM</span>
          </div>
          
          <div className="flex gap-3">
            <img src={selectedUser.avatar} className="w-8 h-8 rounded-lg object-cover self-end" />
            <div className="glass p-4 rounded-2xl rounded-bl-none max-w-[70%] border-white/5">
              <p className="text-sm">Professor, the neural architecture is ready for testing. Should we proceed?</p>
            </div>
          </div>

          <div className="flex flex-row-reverse gap-3">
            <div className="w-8 h-8 rounded-lg cyber-gradient self-end flex items-center justify-center"><Zap size={14} className="text-white fill-white" /></div>
            <div className="cyber-gradient p-4 rounded-2xl rounded-br-none max-w-[70%] shadow-lg shadow-cyan-500/10">
              <p className="text-sm text-white font-medium">Proceed with the transmission. Ensure end-to-end encryption is active.</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="glass flex items-center gap-4 px-6 py-4 rounded-3xl border-white/10 focus-within:border-cyan-500/50 transition-all shadow-xl">
            <input 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Inject message into data stream..." 
              className="bg-transparent outline-none flex-1 text-sm font-medium"
              onKeyPress={(e) => e.key === 'Enter' && setMessage('')}
            />
            <button onClick={() => setMessage('')} className="text-cyan-400 hover:scale-110 transition-transform">
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
