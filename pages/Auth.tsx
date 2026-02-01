
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Phone, Chrome, Loader2, User, AtSign, Calendar, CheckCircle2, ShieldAlert, ShieldCheck, Lock, Eye, EyeOff, Key, Fingerprint, ChevronRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { User as UserType } from '../types';

type AuthStep = 'SELECT' | 'SIGNUP_FORM' | 'LOGIN_FORM' | 'LOADING' | 'DENIED' | 'PICK_ACCOUNT';

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [step, setStep] = useState<AuthStep>('SELECT');
  const [showPassword, setShowPassword] = useState(false);
  const [vaultUsers, setVaultUsers] = useState<UserType[]>([]);
  
  // Form States
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [usernameStatus, setUsernameStatus] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle');
  const [authError, setAuthError] = useState('');

  const getVault = (): UserType[] => {
    const vault = localStorage.getItem('hp_nexus_vault');
    return vault ? JSON.parse(vault) : [];
  };

  const saveToVault = (newUser: UserType) => {
    const vault = getVault();
    localStorage.setItem('hp_nexus_vault', JSON.stringify([...vault, newUser]));
  };

  useEffect(() => {
    setVaultUsers(getVault());
  }, []);

  useEffect(() => {
    if (username.length > 2 && step === 'SIGNUP_FORM') {
      setUsernameStatus('checking');
      const exists = vaultUsers.some(u => u.username === username.toLowerCase());
      setTimeout(() => {
        setUsernameStatus(exists ? 'taken' : 'available');
      }, 400);
    } else {
      setUsernameStatus('idle');
    }
  }, [username, step, vaultUsers]);

  const handleSocialLink = () => {
    setStep('LOADING');
    setTimeout(() => {
      if (vaultUsers.length > 0) {
        setStep('PICK_ACCOUNT');
      } else {
        setStep('SIGNUP_FORM');
      }
    }, 1200);
  };

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('LOADING');
    const foundUser = vaultUsers.find(u => 
      u.username === username.toLowerCase() && u.password === password
    );

    setTimeout(() => {
      if (foundUser) {
        login(foundUser);
        navigate('/');
      } else {
        setStep('LOGIN_FORM');
        setAuthError('Identity Rejected: Incorrect Username or Password.');
      }
    }, 1200);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    const age = dob ? new Date().getFullYear() - new Date(dob).getFullYear() : 0;
    if (age < 18) {
      setStep('DENIED');
      return;
    }

    setStep('LOADING');
    const newUser: UserType = {
      id: 'node_' + Math.random().toString(36).substr(2, 9),
      username: username.toLowerCase(),
      fullName: fullName,
      password: password,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
      bio: "H.P Nexus Authorized Agent 🔒",
      isVerified: true,
      isPrivate: false,
      dob: dob
    };

    setTimeout(() => {
      saveToVault(newUser);
      login(newUser);
      navigate('/');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#050505] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,242,254,0.1)_0%,transparent_50%)]" />
      </div>

      <div className="w-full max-w-lg glass p-10 rounded-[48px] border-white/10 relative z-10 shadow-2xl animate-in fade-in zoom-in duration-500">
        {step === 'DENIED' ? (
          <div className="text-center py-10">
            <ShieldAlert size={64} className="text-red-500 mx-auto mb-6" />
            <h2 className="text-3xl font-black text-white uppercase mb-4">Access Denied</h2>
            <p className="text-gray-400 text-sm mb-8">Minors are restricted from Nexus Uplink.</p>
            <button onClick={() => setStep('SELECT')} className="px-8 py-4 cyber-gradient text-white rounded-2xl font-black uppercase text-[10px] tracking-widest">Restart Protocol</button>
          </div>
        ) : step === 'PICK_ACCOUNT' ? (
          <div className="animate-in slide-in-from-bottom-4 duration-500">
             <div className="text-center mb-8">
                <h2 className="text-2xl font-black tracking-tighter text-white uppercase">Choose Node</h2>
                <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mt-2">Multiple Identifiers Detected</p>
             </div>
             <div className="space-y-3 max-h-[300px] overflow-y-auto no-scrollbar pr-2">
                {vaultUsers.map(u => (
                  <button key={u.id} onClick={() => { login(u); navigate('/'); }} className="w-full flex items-center gap-4 p-4 glass rounded-[24px] border-white/5 hover:border-cyan-500/30 transition-all group">
                    <img src={u.avatar} className="w-12 h-12 rounded-xl border border-white/10" />
                    <div className="flex-1 text-left">
                      <p className="text-sm font-bold text-white">@{u.username}</p>
                      <p className="text-[10px] text-gray-500">{u.fullName}</p>
                    </div>
                    <ChevronRight size={16} className="text-gray-700 group-hover:text-cyan-400" />
                  </button>
                ))}
             </div>
             <button onClick={() => setStep('SIGNUP_FORM')} className="w-full mt-6 p-4 border border-dashed border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors">
                + Create New Identity
             </button>
             <button onClick={() => setStep('SELECT')} className="w-full mt-4 text-[10px] font-black uppercase tracking-widest text-gray-700">Cancel</button>
          </div>
        ) : (
          <>
            <div className="text-center mb-10">
              <div className="inline-block p-4 rounded-3xl cyber-gradient mb-6 shadow-2xl shadow-cyan-500/30">
                <Zap size={32} className="text-white fill-white" />
              </div>
              <h1 className="text-4xl font-black tracking-tighter text-white mb-2 uppercase">
                {step === 'SELECT' ? 'Nexus Entry' : step === 'LOGIN_FORM' ? 'Decrypt Identity' : 'Initialize Node'}
              </h1>
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em]">H.P Nexus Secure Access</p>
            </div>

            {authError && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-xs font-bold text-center">
                {authError}
              </div>
            )}

            {step === 'SELECT' && (
              <div className="space-y-4 animate-in slide-in-from-bottom-4">
                <button onClick={handleSocialLink} className="w-full flex items-center gap-5 p-6 glass rounded-3xl border-white/5 hover:border-cyan-500/30 transition-all group font-bold text-xs uppercase tracking-widest">
                  <Chrome size={20} className="text-cyan-400" /> 
                  <span className="flex-1 text-left">Connect via Google</span>
                  <Fingerprint size={16} className="text-gray-600" />
                </button>
                <button onClick={handleSocialLink} className="w-full flex items-center gap-5 p-6 glass rounded-3xl border-white/5 hover:border-white/20 transition-all group font-bold text-xs uppercase tracking-widest">
                  <Phone size={20} className="text-green-500" /> 
                  <span className="flex-1 text-left">Mobile Neural Link</span>
                </button>
                <div className="flex items-center gap-4 py-4">
                  <div className="h-px flex-1 bg-white/5" />
                  <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Manual Decryption</span>
                  <div className="h-px flex-1 bg-white/5" />
                </div>
                <button onClick={() => { setStep('LOGIN_FORM'); setAuthError(''); }} className="w-full p-6 bg-white/5 rounded-3xl border border-white/5 font-black text-[10px] uppercase tracking-widest text-white hover:bg-white/10 transition-all">
                  Existing Agent Login
                </button>
                <p className="text-center mt-6">
                   <button onClick={() => setStep('SIGNUP_FORM')} className="text-[10px] font-black uppercase tracking-widest text-cyan-400 hover:underline">
                      Create New Identity Node
                   </button>
                </p>
              </div>
            )}

            {step === 'LOGIN_FORM' && (
              <form onSubmit={handleManualLogin} className="space-y-5 animate-in fade-in duration-500">
                <div className="glass flex items-center px-6 py-4 rounded-2xl border-white/5">
                  <AtSign size={18} className="text-gray-500 mr-4" />
                  <input required type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="bg-transparent outline-none flex-1 text-sm font-bold text-white" />
                </div>
                <div className="glass flex items-center px-6 py-4 rounded-2xl border-white/5">
                  <Key size={18} className="text-gray-500 mr-4" />
                  <input required type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="bg-transparent outline-none flex-1 text-sm font-bold text-white" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-500 hover:text-white">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <button type="submit" className="w-full mt-4 py-5 cyber-gradient text-white rounded-3xl font-black uppercase text-xs tracking-[0.2em] shadow-xl">
                  Decrypt Identity
                </button>
                <button type="button" onClick={() => setStep('SELECT')} className="w-full text-[10px] font-black uppercase tracking-widest text-gray-600 hover:text-white transition-colors">
                  Back to Select
                </button>
              </form>
            )}

            {step === 'SIGNUP_FORM' && (
              <form onSubmit={handleSignup} className="space-y-5 animate-in fade-in duration-500">
                <div className="glass flex items-center px-6 py-4 rounded-2xl border-white/5">
                  <User size={18} className="text-gray-500 mr-4" />
                  <input required type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Display Name" className="bg-transparent outline-none flex-1 text-sm font-bold text-white" />
                </div>
                <div className={`glass flex items-center px-6 py-4 rounded-2xl border-white/5 ${usernameStatus === 'available' ? 'border-green-500/20' : usernameStatus === 'taken' ? 'border-red-500/20' : ''}`}>
                  <AtSign size={18} className="text-gray-500 mr-4" />
                  <input required type="text" value={username} onChange={(e) => setUsername(e.target.value.toLowerCase())} placeholder="Unique Alias" className="bg-transparent outline-none flex-1 text-sm font-bold text-white" />
                  {usernameStatus === 'available' && <CheckCircle2 size={16} className="text-green-500" />}
                </div>
                <div className="glass flex items-center px-6 py-4 rounded-2xl border-white/5">
                  <Key size={18} className="text-gray-500 mr-4" />
                  <input required type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Access Key (Password)" className="bg-transparent outline-none flex-1 text-sm font-bold text-white" />
                </div>
                <div className="glass flex items-center px-6 py-4 rounded-2xl border-white/5">
                  <Calendar size={18} className="text-gray-500 mr-4" />
                  <input required type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="bg-transparent outline-none flex-1 text-sm font-bold text-white uppercase" />
                </div>
                <button type="submit" disabled={usernameStatus !== 'available'} className="w-full mt-4 py-5 cyber-gradient text-white rounded-3xl font-black uppercase text-xs tracking-[0.2em] shadow-xl disabled:opacity-30">
                  Initialize Node
                </button>
                <button type="button" onClick={() => setStep('SELECT')} className="w-full text-[10px] font-black uppercase tracking-widest text-gray-600 hover:text-white transition-colors">
                  Abort Setup
                </button>
              </form>
            )}

            {step === 'LOADING' && (
              <div className="flex flex-col items-center justify-center py-12 gap-8">
                <div className="relative">
                   <Loader2 className="animate-spin text-cyan-400" size={80} strokeWidth={1} />
                   <Lock className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-cyan-400/40" size={24} />
                </div>
                <p className="text-sm font-black uppercase tracking-[0.4em] text-cyan-400 animate-pulse text-center">
                   Verifying Neural Handshake...
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Auth;
