import { useState } from "react"
import WhatsappFollowButton from "../images/whatsapp-follow"
import Logo from "../images/Logo"
/* import RevisionTestModal from "../components/RevisionTestModal" */
import { useNavigate } from "react-router-dom"

import ReactGA from "react-ga4";
import { SiTiktok } from "react-icons/si";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { FiBookmark, FiInfo } from "react-icons/fi";
import { HiOutlineMoon } from "react-icons/hi";
import { MdOutlineHistory } from 'react-icons/md';

const StartExam = ({ isDarkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

  const toggleMenu = () => setIsMenuOpen(prev => !prev)

  // Sub-component for Menu Items to keep things clean
  const MenuItem = ({ icon, label, onClick, href }) => {
    const content = (
      <div className="flex items-center gap-4 w-full p-3.5 rounded-2xl transition-all duration-200 hover:bg-gray-100 dark:hover:bg-slate-700/50 group active:scale-[0.98]">
        <div className="text-xl text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {icon}
        </div>
        <span className="text-slate-700 dark:text-slate-200 font-medium text-[15px]">
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
    <div className="relative h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-gray-50 dark:bg-slate-900 transition-colors duration-500">

      {/* 1. Main Content Layer */}
      <div className="flex flex-col items-center animate-in fade-in zoom-in duration-700">
        <div className="mb-16"><Logo /></div>
        <h1 className="text-5xl font-black text-center tracking-tight text-slate-900 dark:text-white mb-2">
          Quiz Bolt
        </h1>
        <p className="text-gray-500 dark:text-gray-400 font-medium tracking-wide uppercase text-[10px]">
          TASUED PDFs questions made simple
        </p>
      </div>

      {/* 2. Top Navigation Bar */}
      <div className="absolute top-0 inset-x-0 p-6 flex justify-between items-center">
        
        <button
          onClick={toggleMenu}
          className="bg-white dark:bg-slate-800 p-3.5 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 active:scale-90 transition-transform z-50"
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
          )}
        </button>
      </div>

      {/* 3. The Overlay (Blur effect) */}
      <div
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={toggleMenu}
      />

      {/* 4. The Modern Slide-in Menu (Left-aligned) */}
      <div
        className={`fixed top-0 left-0 h-full w-[85%] max-w-[380px] bg-white dark:bg-slate-900 z-50 shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] border-r border-gray-100 dark:border-slate-800 flex flex-col ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-8 flex flex-col h-full">
          <div className="mb-10 pt-4">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Menu</h2>
            <div className="h-1.5 w-10 bg-blue-600 rounded-full mt-2" />
          </div>

          <nav className="flex-grow space-y-8 overflow-y-auto no-scrollbar">
            {/* Nav Group 1 */}
            <div>
              <h3 className="text-[11px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-4 px-2">Navigation</h3>
              <ul className="space-y-1">
                <MenuItem icon={<FiInfo />} label="About Quiz Bolt" onClick={() => navigate("/about-page")} />
                <MenuItem icon={<FiBookmark />} label="Bookmarks" onClick={() => navigate("/bookmarks")} />
                <MenuItem icon={<MdOutlineHistory />} label="Exam History" onClick={() => navigate("/history")} />
              </ul>
            </div>

            {/* Nav Group 2 */}
            <div>
              <h3 className="text-[11px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-4 px-2">Social Community</h3>
              <ul className="space-y-1">
                <MenuItem icon={<FaWhatsapp className="text-green-500" />} label="WhatsApp Group" href="https://chat.whatsapp.com/FMPmsBbwU9kL6t2vJ6C8qq" />
                <MenuItem icon={<FaFacebookF className="text-blue-600" />} label="Facebook Page" href="https://www.facebook.com/share/17RabkxuWY/" />
                <MenuItem icon={<SiTiktok className="dark:text-white text-black" />} label="TikTok Profile" href="https://www.tiktok.com/@codejeffrey18" />
              </ul>
            </div>
          </nav>

          {/* Bottom Settings */}
          <div className="mt-auto pt-6 border-t border-gray-100 dark:border-slate-800">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800/50 rounded-2xl">
              <div className="flex items-center gap-3">
                <HiOutlineMoon className="text-xl dark:text-blue-400 text-gray-400" />
                <span className="font-semibold text-sm dark:text-slate-200">Dark Mode</span>
              </div>
              <button
                onClick={toggleDarkMode}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${isDarkMode ? 'bg-blue-600' : 'bg-gray-300'}`}
              >
                <div className={`bg-white size-4 rounded-full shadow-md transform transition-transform duration-300 ${isDarkMode ? 'translate-x-6' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Primary Action Button */}
      <button
        onClick={() => navigate("/choose-course")}
        className="absolute bottom-10 bg-blue-600 dark:bg-blue-700 py-4 px-10 rounded-2xl font-bold text-white text-xl shadow-lg shadow-blue-200 dark:shadow-none hover:bg-blue-700 transition-all hover:-translate-y-1 active:scale-95 active:translate-y-0"
      >
        Start Exam
      </button>
    </div>
  )
}


export default StartExam