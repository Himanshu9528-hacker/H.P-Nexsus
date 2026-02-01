
import React from 'react';
import { Zap, Shield, Github, Linkedin, Twitter, Instagram, Youtube, Heart, Brain, GraduationCap, Award, ExternalLink } from 'lucide-react';

/**
 * CONFIGURATION: UPDATE YOUR DETAILS HERE
 */
const FOUNDER_INFO = {
  name: "Himanshu Yadav",
  alias: "Hacker Professor 👨‍🏫",
  // Yahan apni photo ka URL daalein. Agar local photo hai toh uska path (e.g., "/profile.jpg")
  photoUrl: "https://picsum.photos/seed/hacker/400", 
  links: {
    github: "https://github.com/", // Apna link yahan paste karein
    linkedin: "https://linkedin.com/in/",
    twitter: "https://twitter.com/",
    instagram: "https://instagram.com/",
    youtube: "https://youtube.com/"
  }
};

const About: React.FC = () => {
  const roles = ["Ethical Hacker", "Bug Bounty Hunter", "Pentester", "Coder"];
  const inspirations = ["Ankit Saxena", "Vishal Yadav"];
  const favs = ["Elon Musk", "APJ Abdul Kalam", "Sundar Pichai", "Kevin Mitnick"];

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 animate-in fade-in duration-1000">
      {/* Hero Section */}
      <div className="text-center mb-16 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 blur-[100px] -z-10" />
        <div className="inline-block p-1 rounded-[32px] cyber-gradient mb-8 shadow-2xl shadow-cyan-500/20 group">
          <div className="bg-[#050505] rounded-[31px] p-1">
            <img 
              src={FOUNDER_INFO.photoUrl} 
              alt={FOUNDER_INFO.name} 
              className="w-40 h-40 rounded-[30px] object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>
        <h1 className="text-6xl font-black tracking-tighter text-gradient mb-2">{FOUNDER_INFO.name}</h1>
        <p className="text-cyan-400 font-black tracking-[0.3em] uppercase text-xs mb-6">{FOUNDER_INFO.alias}</p>
        
        <div className="flex flex-wrap justify-center gap-3">
          {roles.map(role => (
            <span key={role} className="glass px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 border-white/5">
              {role}
            </span>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Mission Card */}
        <div className="md:col-span-2 glass p-10 rounded-[40px] border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-[60px] -z-10" />
          <h2 className="text-2xl font-black tracking-tighter mb-6 flex items-center gap-3">
            <Zap className="text-cyan-400" size={24} />
            The Mission
          </h2>
          <p className="text-gray-300 leading-relaxed text-lg font-light">
            Empowering <span className="text-white font-bold">ethical hackers</span> and learners through modular tools, recon engines, and wellness systems. Bridging the gap between security and education.
          </p>
          
          <div className="mt-8 flex items-center gap-4 p-4 glass rounded-2xl border-white/5">
            <Brain className="text-purple-400 shrink-0" size={24} />
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-purple-400">Philosophy</p>
              <p className="text-xs text-gray-400">Psych + Tech synergy for maximum clarity and impact.</p>
            </div>
          </div>
        </div>

        {/* Mentors Section */}
        <div className="glass p-8 rounded-[40px] border-white/10">
          <h2 className="text-xl font-black tracking-tighter mb-6 flex items-center gap-2">
            <GraduationCap className="text-cyan-400" size={20} />
            Inspiration
          </h2>
          <div className="space-y-4">
            {inspirations.map(name => (
              <div key={name} className="flex items-center gap-3 group">
                <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f2fe]" />
                <span className="text-gray-300 font-medium group-hover:text-white transition-colors">{name}</span>
              </div>
            ))}
          </div>
          
          <h2 className="text-xl font-black tracking-tighter mb-6 mt-10 flex items-center gap-2">
            <Award className="text-purple-400" size={20} />
            Key Figures
          </h2>
          <div className="space-y-4">
            {favs.map(name => (
              <div key={name} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-sm bg-purple-400/50" />
                <span className="text-xs text-gray-400">{name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Social Connect Bento */}
        <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-5 gap-4">
          <SocialLink icon={<Github size={20} />} label="GitHub" href={FOUNDER_INFO.links.github} color="hover:text-white" />
          <SocialLink icon={<Linkedin size={20} />} label="LinkedIn" href={FOUNDER_INFO.links.linkedin} color="hover:text-blue-400" />
          <SocialLink icon={<Twitter size={20} />} label="Twitter" href={FOUNDER_INFO.links.twitter} color="hover:text-cyan-400" />
          <SocialLink icon={<Instagram size={20} />} label="Instagram" href={FOUNDER_INFO.links.instagram} color="hover:text-pink-400" />
          <SocialLink icon={<Youtube size={20} />} label="Youtube" href={FOUNDER_INFO.links.youtube} color="hover:text-red-500" />
        </div>
      </div>

      {/* Signature Footer */}
      <div className="mt-16 text-center">
        <div className="inline-flex items-center gap-2 px-6 py-2 glass rounded-full border-white/5 text-[10px] font-black uppercase tracking-widest text-gray-500">
          Transmission Secure <Heart size={10} className="text-red-500 fill-red-500" /> Hacker Professor Nexus
        </div>
      </div>
    </div>
  );
};

const SocialLink: React.FC<{ icon: React.ReactNode; label: string; href: string; color: string }> = ({ icon, label, href, color }) => (
  <a 
    href={href} 
    target="_blank"
    rel="noopener noreferrer"
    className={`glass p-6 rounded-[32px] border-white/5 flex flex-col items-center gap-3 transition-all duration-300 group hover:-translate-y-1 hover:border-white/20 hover:shadow-xl ${color}`}
  >
    <div className="group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 group-hover:text-current">{label}</span>
    <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
  </a>
);

export default About;
