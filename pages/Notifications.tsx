
import React from 'react';
import { Heart, UserPlus, MessageCircle, Zap, ShieldAlert } from 'lucide-react';
import { MOCK_USERS } from '../constants';

const Notifications: React.FC = () => {
  const activities = [
    { type: 'pulse', user: MOCK_USERS[0], time: '2m', content: 'sent a pulse to your transmission' },
    { type: 'sync', user: MOCK_USERS[1], time: '15m', content: 'synced with your profile' },
    { type: 'comment', user: MOCK_USERS[2], time: '1h', content: 'commented: "Incredible architecture!"' },
    { type: 'alert', user: null, time: '3h', content: 'Security Protocol: New login detected from Node ID: 192.168.1.1' },
    { type: 'pulse', user: MOCK_USERS[3], time: '5h', content: 'pulsed your loop buffer' },
  ];

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 animate-in slide-in-from-right duration-500">
      <h2 className="text-4xl font-black tracking-tighter mb-8 text-gradient">Activity Logs</h2>
      
      <div className="space-y-4">
        {activities.map((item, i) => (
          <div key={i} className="glass p-5 rounded-[28px] border-white/5 flex items-center justify-between group hover:bg-white/5 transition-all">
            <div className="flex items-center gap-4">
              <div className="relative">
                {item.user ? (
                  <img src={item.user.avatar} className="w-12 h-12 rounded-2xl object-cover" />
                ) : (
                  <div className="w-12 h-12 rounded-2xl bg-red-500/20 flex items-center justify-center text-red-500 border border-red-500/20">
                    <ShieldAlert size={24} />
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 p-1 rounded-lg bg-black/80 border border-white/10">
                  {item.type === 'pulse' && <Heart size={10} className="text-red-500 fill-red-500" />}
                  {item.type === 'sync' && <UserPlus size={10} className="text-cyan-400" />}
                  {item.type === 'comment' && <MessageCircle size={10} className="text-purple-400" />}
                  {item.type === 'alert' && <Zap size={10} className="text-yellow-400" />}
                </div>
              </div>
              <div>
                <p className="text-sm font-bold">
                  {item.user && <span className="text-cyan-400 mr-1 hover:underline cursor-pointer">@{item.user.username}</span>}
                  <span className="text-gray-300 font-medium">{item.content}</span>
                </p>
                <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest mt-1">{item.time} ago</p>
              </div>
            </div>
            
            {item.type === 'sync' && (
              <button className="glass px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all">
                Sync Back
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
