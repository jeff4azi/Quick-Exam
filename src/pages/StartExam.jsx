import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../images/Logo";
import BannerAd from "../components/BannerAd";

import { SiTiktok } from "react-icons/si";
import { FaFacebookF, FaWhatsapp, FaGraduationCap } from "react-icons/fa";
import { FiBookmark, FiInfo, FiUser, FiLogOut, FiZap, FiAlertTriangle } from "react-icons/fi";
import { HiOutlineMoon } from "react-icons/hi";
import { MdOutlineHistory } from 'react-icons/md';

const StartExam = ({
  isDarkMode,
  toggleDarkMode,
  userProfile,
  loadingProfile,
  isPremium,
  handleLogout,
}) => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [showAd, setShowAd] = useState(false);

  useEffect(() => {
    if (isPremium) {
      setShowAd(false); // force hide if user is premium
      return;
    }

    const timer = setTimeout(() => setShowAd(true), 750);
    return () => clearTimeout(timer);
  }, [isPremium]);


  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  const MenuItem = ({ icon, label, onClick, href, variant = "default" }) => {
    const content = (
      <div className={`flex items-center gap-4 w-full p-3.5 rounded-2xl transition-all duration-200 group active:scale-[0.98] ${
        variant === "danger" ? "hover:bg-red-50 dark:hover:bg-red-900/20" : "hover:bg-gray-100 dark:hover:bg-slate-700/50"
      }`}>
        <div className={`text-xl transition-colors ${
          variant === "danger" ? "text-red-500" : "text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400"
        }`}>
          {icon}
        </div>
        <span className={`font-medium text-[15px] ${
          variant === "danger" ? "text-red-600" : "text-slate-700 dark:text-slate-200"
        }`}>
          {label}
        </span>
      </div>
    );

    return href ? (
      <li><a href={href} target="_blank" rel="noopener noreferrer" className="block">{content}</a></li>
    ) : (
      <li className="cursor-pointer" onClick={onClick}>{content}</li>
    );
  };

  return (
    <div className="max-w-2xl mx-auto relative h-[100dvh] flex flex-col bg-gray-50 dark:bg-slate-900 transition-colors duration-500 overflow-hidden">
      
      {/* Top Navigation Bar */}
      <div className="p-6 flex justify-between items-center z-50">
        <button
          onClick={toggleMenu}
          className="bg-white dark:bg-slate-800 p-3.5 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 active:scale-90 transition-transform"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="size-6 text-slate-700 dark:text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="size-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200 dark:shadow-none">
           <FiUser className="text-xl" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="mt-4 mb-8">
          <h2 className="text-gray-500 dark:text-slate-400 font-medium text-lg">Hello,</h2>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            {loadingProfile ? "..." : (userProfile?.full_name?.split(' ')[0] || "Scholar")}!👋
          </h1>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] border border-gray-100 dark:border-slate-700 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <FaGraduationCap size={80} className="text-blue-600" />
          </div>
          <div className="relative z-10">
            <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
              {userProfile?.college || "TASUED"}
            </span>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mt-3 mb-1">
              {userProfile?.department || "Ready to study?"}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
              Level {userProfile?.year || "1"}00 Student
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
            <button onClick={() => navigate("/history")} className="bg-white dark:bg-slate-800 p-4 rounded-3xl border border-gray-100 dark:border-slate-700 flex flex-col items-center gap-2">
                <div className="size-10 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600">
                    <MdOutlineHistory size={20} />
                </div>
                <span className="text-xs font-bold dark:text-slate-300">History</span>
            </button>
            <button onClick={() => navigate("/bookmarks")} className="bg-white dark:bg-slate-800 p-4 rounded-3xl border border-gray-100 dark:border-slate-700 flex flex-col items-center gap-2">
                <div className="size-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600">
                    <FiBookmark size={20} />
                </div>
                <span className="text-xs font-bold dark:text-slate-300">Saved</span>
            </button>
        </div>

        <div className="mt-auto mb-32 flex flex-col items-center opacity-40 grayscale">
            <Logo className="size-12" />
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase mt-2 text-slate-400">Quiz Bolt</p>
        </div>
      </div>

      {/* Side Menu Overlay */}
      <div className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} onClick={toggleMenu} />
      
      {/* Side Menu Drawer */}
      <div className={`fixed top-0 left-0 h-full w-[85%] max-w-[320px] bg-white dark:bg-slate-900 z-[70] shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] border-r border-gray-100 dark:border-slate-800 flex flex-col ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-8 flex flex-col h-full">
          <div className="mb-8 pt-4">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Menu</h2>
            <div className="h-1.5 w-10 bg-blue-600 rounded-full mt-2" />
          </div>

          <nav className="flex-grow space-y-6 overflow-y-auto no-scrollbar">
            {/* Premium CTA Card */}
            <div className="mb-4">
              {!isPremium && <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2rem] p-5 shadow-lg shadow-blue-200 dark:shadow-none relative overflow-hidden group cursor-pointer active:scale-[0.98] transition-all" onClick={() => navigate("/premium")}>
                {/* Decorative background circle */}
                <div className="absolute -right-4 -top-4 size-24 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all" />
                
                <div className="flex flex-col gap-3 relative z-10">
                  <div className="size-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
                    <FiZap className="text-yellow-300 text-xl animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-white font-black text-lg">Get Premium</h4>
                    <p className="text-blue-100 text-[11px] leading-relaxed font-medium">Remove ads and unlock a better exam experience.</p>
                  </div>
                </div>
              </div>}
            </div>

            <div>
              <h3 className="text-[11px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-4 px-2">Community</h3>
              <ul className="space-y-1">
                <MenuItem icon={<FaWhatsapp className="text-green-500" />} label="WhatsApp Group" href="https://chat.whatsapp.com/FMPmsBbwU9kL6t2vJ6C8qq" />
                <MenuItem icon={<FaFacebookF className="text-blue-600" />} label="Facebook Page" href="https://www.facebook.com/share/17RabkxuWY/" />
                <MenuItem icon={<SiTiktok className="dark:text-white text-black" />} label="TikTok" href="https://www.tiktok.com/@codejeffrey18" />
              </ul>
            </div>
            
            <div>
              <h3 className="text-[11px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-4 px-2">App</h3>
              <ul className="space-y-1">
                <MenuItem icon={<FiInfo />} label="About" onClick={() => navigate("/about-page")} />
                <MenuItem 
                  icon={<FiAlertTriangle className="text-orange-500" />} 
                  label="Report Problem" 
                  href="https://wa.me/2347015585397?text=Hi%20Quiz%20Bolt%20Support,%20I%20found%20an%20issue..." 
                />
                <MenuItem icon={<FiLogOut />} label="Sign Out" onClick={handleLogout} variant="danger" />
              </ul>
            </div>
          </nav>

          <div className="mt-auto pt-6 border-t border-gray-100 dark:border-slate-800">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800/50 rounded-2xl">
              <div className="flex items-center gap-3">
                <HiOutlineMoon className="text-xl dark:text-blue-400 text-gray-400" />
                <span className="font-semibold text-sm dark:text-slate-200">Dark Mode</span>
              </div>
              <button onClick={toggleDarkMode} className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${isDarkMode ? 'bg-blue-600' : 'bg-gray-300'}`}>
                <div className={`bg-white size-4 rounded-full shadow-md transform transition-transform duration-300 ${isDarkMode ? 'translate-x-6' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating CTA Button */}
      <div className="mx-auto max-w-2xl fixed bottom-0 inset-x-0 p-6 bg-gradient-to-t from-gray-50 via-gray-50/90 to-transparent dark:from-slate-900 dark:via-slate-900/90">
        <button
            onClick={() => navigate("/choose-course")}
            className="w-full bg-blue-600 dark:bg-blue-700 py-4.5 rounded-2xl font-black text-white text-lg shadow-xl shadow-blue-200 dark:shadow-none hover:bg-blue-700 transition-all active:scale-95"
        >
            Choose Course
        </button>
      </div>
      {!isPremium && showAd && (
        <BannerAd onAdClose={() => setShowAd(false)} />
      )}
    </div>
  );
}

export default StartExam;