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

const StartExam = ({
  selectedCourse,
  isDarkMode,
  toggleDarkMode,
  /*  edu101revisionQuestions, */
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev)
  }

  /* const edu101revisionCourse = {
    id: "R.EDU101",
    name: "R. EDU 101",
    questions: getRandom30(edu101revisionQuestions),
  } */

  return (
    <div className="relative h-[100dvh] max-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-slate-900">
      {/* Main content */}
      <div>
        <Logo />
        <h1 className="text-6xl text-center font-semibold tracking-tight mb-3 text-slate-900 dark:text-slate-100">
          Quiz Bolt
        </h1>

        <p className="text-center text-gray-600 dark:text-gray-300 max-w-md">
          TASUED PDFs questions made simple
        </p>
      </div>


      {/* WhatsApp follow */}
      <div className="absolute left-5 top-5">
        <WhatsappFollowButton />
      </div>

      {/* Hamburger button */}
      <button
        onClick={toggleMenu}
        className="absolute right-5 top-5 bg-gray-50 dark:bg-slate-800 p-3 rounded-xl z-51 active:scale-95"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d={
              isMenuOpen
                ? "M6 18 18 6M6 6l12 12"
                : "M3.75 9h16.5m-16.5 6.75h16.5"
            }
          />
        </svg>
      </button>

      {/* Dark overlay */}
      {isMenuOpen && (
        <div
          onClick={toggleMenu}
          className="absolute inset-0 bg-black/40 z-40 transition-opacity"
        />
      )}

      {/* Slide-in menu */}
      <div
        className={`fixed top-0 right-0 h-full w-2/3 max-w-[400px] bg-white dark:bg-slate-800 z-50 shadow-xl
    transform transition-transform duration-300 ease-out
    ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-6 text-slate-900 dark:text-slate-100">Menu</h2>

          {/* Menu items (example placeholders) */}
          <ul className="space-y-4 lg:text-lg">
            <li className="hover:text-blue-600 active:text-blue-600 duration-200 cursor-pointer gap-2 flex items-center" onClick={() => {
              navigate("/about-page")
              ReactGA.event({
                category: "Engagement",
                action: "About Page",
                label: selectedCourse.id || "none",
              });
            }}>
              <div>
                <FiInfo />
              </div>
              About Quiz Bolt
            </li>
            <li className="hover:text-blue-600 active:text-blue-600 duration-200 cursor-pointer gap-2 flex items-center" onClick={() => {
              navigate("/bookmarks")
              ReactGA.event({
                category: "Engagement",
                action: "Bookmark Question",
                label: selectedCourse.id || "none",
              });
            }}>
              <div>
                <FiBookmark />
              </div>
              Bookmarked Questions
            </li>
            <li className="hover:text-blue-600 active:text-blue-600 duration-200 cursor-pointer gap-2 flex items-center" onClick={() => {
              navigate("/history")
              ReactGA.event({
                category: "Engagement",
                action: "Bookmark Question",
                label: selectedCourse.id || "none",
              });
            }}>
              <div>
                <MdOutlineHistory />
              </div>
              Exam History
            </li>
            <li className="hover:text-blue-600 active:text-green-500 duration-200 mb-5">
              <a href="https://chat.whatsapp.com/FMPmsBbwU9kL6t2vJ6C8qq"
                target="_blank"
                rel="noopener noreferrer" className="gap-2 flex items-center">
                <div>
                  <FaWhatsapp />
                </div>
                Join WhatsApp Group
              </a>
            </li>
            <hr className="border-gray-500" />
            <li className="hover:text-blue-600 active:text-green-500 duration-200 mt-5">
              <a href="https://www.facebook.com/share/1FmCjg3WX8/"
                target="_blank"
                rel="noopener noreferrer" className="gap-2 flex items-center">
                <FaFacebookF />
                Like us on FaceBook
              </a>
            </li>
            <li className="hover:text-blue-600 active:text-green-500 duration-200">
              <a href="https://www.tiktok.com/@codejeffrey18?_r=1&_d=f0id5k11di62de&sec_uid=MS4wLjABAAAAs-74xQ5Lh5ye4lPBykPFOf5d8xTmiQ6KXiD3W8s7wbs2Ly6jEEKzBJZAj2j1Drez&share_author_id=7541936112290464785&sharer_language=en&source=h5_m&u_code=em3ai2acehdibb&timestamp=1768827516&user_id=7541936112290464785&sec_user_id=MS4wLjABAAAAs-74xQ5Lh5ye4lPBykPFOf5d8xTmiQ6KXiD3W8s7wbs2Ly6jEEKzBJZAj2j1Drez&item_author_type=1&utm_source=copy&utm_campaign=client_share&utm_medium=android&share_iid=7590731933664560917&share_link_id=095c0f9c-d1d1-4273-8804-6b6caec0d83b&share_app_id=1233&ugbiz_name=ACCOUNT&ug_btm=b8727%2Cb7360&social_share_type=5&enable_checksum=1"
                target="_blank"
                rel="noopener noreferrer" className="gap-2 flex items-center">
                <SiTiktok className="hover:text-black transition" />
                Follow us on Tiktok
              </a>
            </li>
            <li className="fixed bottom-0 left-0 right-0 m-5 flex items-center justify-between mt-6 p-2 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-slate-700 transition">
              <span className="text-slate-900 dark:text-slate-100 font-medium flex items-center gap-2">
                <HiOutlineMoon />
                Dark Mode
              </span>
              <button
                onClick={toggleDarkMode}
                className={`w-12 h-6 flex items-center rounded-full p-1 duration-300 ${isDarkMode ? 'bg-blue-500' : 'bg-gray-400'}`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${isDarkMode ? 'translate-x-6' : ''}`}
                />
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Start Exam button */}
      <button
        onClick={() => {
          navigate("/choose-course")
          ReactGA.event({
            category: "Exam",
            action: "Start Exam",
            label: selectedCourse.id || "none",
          });
        }}
        className="absolute bottom-10 bg-[#2563EB] dark:bg-blue-700 py-5 px-7 rounded-full font-medium text-white text-2xl hover:scale-105 duration-200 ease-out active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300">
        Start Exam
      </button>
      {/*       <RevisionTestModal onTakeTest={() => { navigate("/exam"); setSelectedCourse(edu101revisionCourse); }} /> */}
    </div >
  )
}

export default StartExam