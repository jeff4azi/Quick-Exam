import { useState } from "react"
import ChooseCourseOverlay from "../components/ChooseCourseOverlay"
import whatsappFollow from "../images/whatsapp-follow.webp"
import Logo from "../images/Logo"
import { useNavigate } from "react-router-dom"

const StartExam = ({
  setQuestions,
  getRandom30,
  courses,
  selectedCourse,
  setSelectedCourse,
}) => {
  const [showChooseCourseOverlay, setShowChooseCourseOverlay] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev)
  }

  return (
    <div className="relative h-[100dvh] max-h-screen flex items-center justify-center overflow-hidden">
      {/* Main content */}
      <div>
        <Logo />
        <h1 className="text-6xl text-center font-semibold tracking-tight mb-3">
          Quiz Bolt
        </h1>
        <p className="text-center text-gray-600 max-w-md">
          TASUED past questions made simple
        </p>
      </div>

      {/* WhatsApp follow */}
      <div className="absolute left-5 -top-2">
        <a
          href="https://whatsapp.com/channel/0029Vb6t7rnKrWQx4oL6m31f"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={whatsappFollow}
            alt="Follow Channel"
            className="w-[110px] lg:w-[130px]"
          />
        </a>
      </div>

      {/* Hamburger button */}
      <button
        onClick={toggleMenu}
        className="absolute right-5 top-5 bg-gray-50 p-3 rounded-xl z-100 active:scale-95"
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
        className={`fixed top-0 right-0 h-full w-2/3 max-w-[400px] bg-white z-50 shadow-xl
        transform transition-transform duration-300 ease-out
        ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-6">Menu</h2>

          {/* Menu items (example placeholders) */}
          <ul className="space-y-4 lg:text-lg">
            <li className="hover:text-blue-600 active:text-blue-600 duration-200 cursor-pointer gap-2 flex items-center">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="lg:size-6" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                </svg>
              </div>
              About Quiz Bolt
            </li>
            <li className="hover:text-blue-600 active:text-blue-600 duration-200 cursor-pointer gap-2 flex items-center" onClick={() => navigate("/bookmarks")}>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="lg:size-6" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0" />
                  <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
                </svg>
              </div>
              Bookmarked Questions
            </li>
            <li className="hover:text-blue-600 active:text-green-500 duration-200">
              <a href="https://chat.whatsapp.com/FMPmsBbwU9kL6t2vJ6C8qq"
                target="_blank"
                rel="noopener noreferrer" className="gap-2 flex items-center">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="lg:size-6" viewBox="0 0 16 16">
                  <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                </svg>
              </div>
                Join WhatsApp Group
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Start Exam button */}
      <button
        onClick={() => setShowChooseCourseOverlay(true)}
        className="absolute bottom-10 bg-[#2563EB] py-5 px-7 rounded-full font-medium text-white text-2xl hover:scale-105 duration-200 ease-out active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        Start Exam
      </button>

      {/* Choose course overlay */}
      {showChooseCourseOverlay && (
        <ChooseCourseOverlay
          setShowChooseCourseOverlay={setShowChooseCourseOverlay}
          setQuestions={setQuestions}
          getRandom30={getRandom30}
          courses={courses}
          selectedCourse={selectedCourse}
          setSelectedCourse={setSelectedCourse}
        />
      )}
    </div>
  )
}

export default StartExam