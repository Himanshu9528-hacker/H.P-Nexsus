
import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Home, Search, Compass, Film, MessageCircle, Heart, PlusSquare, User, Zap, Info, Play, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const NavItem: React.FC<{ to: string; icon: React.ReactNode; label: string }> = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) => 
      `flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group ${
        isActive 
        ? 'bg-white/10 text-cyan-400 shadow-[0_0_20px_rgba(0,242,254,0.15)]' 
        : 'text-gray-400 hover:text-white hover:bg-white/5'
      }`
    }
  >
    <span className="group-hover:scale-110 transition-transform">{icon}</span>
    <span className="hidden lg:block font-medium tracking-wide">{label}</span>
  </NavLink>
);

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const isAuthPage = location.pathname === '/auth';

  React.useEffect(() => {
    if (!isAuthenticated && !isAuthPage) {
      navigate('/auth');
    }
  }, [isAuthenticated, isAuthPage, navigate]);

  if (isAuthPage) return <>{children}</>;

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <aside className="hidden md:flex flex-col w-24 lg:w-72 h-[90vh] sticky top-[5vh] ml-6 my-auto glass rounded-[32px] p-6 z-50 border-white/5 shadow-2xl">
        <div className="mb-10 px-2 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl cyber-gradient flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Zap className="text-white fill-white" size={20} />
          </div>
          <h1 className="text-xl font-black tracking-tighter hidden lg:block uppercase">H.P Nexus</h1>
        </div>

        <nav className="flex flex-col gap-1 overflow-y-auto no-scrollbar">
          <NavItem to="/" icon={<Home size={22} />} label="System" />
          <NavItem to="/explore" icon={<Compass size={22} />} label="Explore" />
          <NavItem to="/reels" icon={<Film size={22} />} label="Neural Loops" />
          <NavItem to="/messages" icon={<MessageCircle size={22} />} label="Neural Link" />
          <NavItem to="/notifications" icon={<Heart size={22} />} label="Activity Logs" />
          <NavItem to="/create" icon={<PlusSquare size={22} />} label="Transmit" />
          <NavItem to="/profile" icon={<User size={22} />} label="Identity" />
          <NavItem to="/about" icon={<Info size={22} />} label="Founder" />
        </nav>

        <div className="mt-auto pt-6 border-t border-white/5 space-y-4">
          <NavLink to="/profile" className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-2xl transition-all">
            <img src={user?.avatar} className="w-10 h-10 rounded-xl object-cover border border-white/10" />
            <div className="hidden lg:block overflow-hidden">
              <p className="text-xs font-black truncate">{user?.fullName}</p>
              <p className="text-[10px] text-gray-500 truncate">@{user?.username}</p>
            </div>
          </NavLink>
          <button 
            onClick={logout}
            className="w-full flex items-center gap-4 p-4 text-gray-500 hover:text-red-400 transition-colors group"
          >
            <LogOut size={22} className="group-hover:translate-x-1 transition-transform" />
            <span className="hidden lg:block font-medium">Terminate</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 w-full max-w-full md:px-12 py-8 overflow-x-hidden pb-24 md:pb-8">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </main>

      <nav className="md:hidden fixed bottom-6 left-6 right-6 h-16 glass rounded-2xl flex justify-around items-center px-4 z-50 shadow-2xl border-white/10">
        <NavLink to="/" className={({ isActive }) => isActive ? 'text-cyan-400' : 'text-gray-500'}><Home size={22} /></NavLink>
        <NavLink to="/reels" className={({ isActive }) => isActive ? 'text-cyan-400' : 'text-gray-500'}><Play size={22} /></NavLink>
        <NavLink to="/messages" className={({ isActive }) => isActive ? 'text-cyan-400' : 'text-gray-500'}><MessageCircle size={22} /></NavLink>
        <NavLink to="/notifications" className={({ isActive }) => isActive ? 'text-cyan-400' : 'text-gray-500'}><Heart size={22} /></NavLink>
        <NavLink to="/profile" className={({ isActive }) => isActive ? 'text-cyan-400' : 'text-gray-500'}><User size={22} /></NavLink>
      </nav>
    </div>
  );
};

export default Layout;
