import { FaYoutube, FaWhatsapp, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { SiTiktok, SiX } from "react-icons/si";
import { useNavigate } from "react-router-dom";

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto px-5 py-10 space-y-16 bg-gray-900 text-gray-200 font-sans selection:bg-blue-500/30">

      {/* ---------------- HERO SECTION ---------------- */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-[#2563EB]">About Quiz Bolt</h1>
        <p className="text-gray-300 text-lg">
          Quiz Bolt is your go-to platform for exam preparation. We provide curated, interactive quizzes for students, helping you stay ahead and master your courses efficiently.
        </p>
      </section>

      {/* ---------------- WHAT WE DO ---------------- */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-100">What We Do</h2>
        <p className="text-gray-300 leading-relaxed">
          At Quiz Bolt, we aim to simplify learning. Our platform offers multiple-choice quizzes for different courses, allows you to bookmark questions, review your answers, and track your progress over time. Everything is designed to make studying smarter, not harder.
        </p>
      </section>

      {/* ---------------- FEATURES ---------------- */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-100">Key Features</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li>Interactive quizzes with random question selection</li>
          <li>Bookmark questions and review them anytime</li>
          <li>Automatic scoring and detailed results</li>
          <li>Optimized for both desktop and mobile devices</li>
          <li>Upcoming features: account creation, login, and personalized dashboards</li>
        </ul>
      </section>

      {/* ---------------- FOLLOW US ---------------- */}
      <section className="space-y-6 text-center">
        <h2 className="text-2xl font-semibold text-gray-100">Follow Us</h2>
        <p className="text-gray-400">Stay updated with our latest quizzes and tips. Connect with us on social media!</p>
        <div className="flex justify-center gap-6 text-3xl mt-4 text-[#2563EB]">
          <a href="https://youtube.com/@codejeffrey18?si=r9lJUJ1HdKeRPmGt" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition">
            <FaYoutube />
          </a>
          <a href="https://wa.me/2347015585397" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition">
            <FaWhatsapp />
          </a>
          <a href="https://www.instagram.com/codejeffrey18/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition">
            <FaInstagram />
          </a>
          <a href="https://x.com/Jappy682" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition">
            <SiX />
          </a>
          <a href="https://www.tiktok.com/@codejeffrey18" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition">
            <SiTiktok />
          </a>
          <a href="https://www.linkedin.com/in/jeffrey-austin-110074383" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition">
            <FaLinkedinIn />
          </a>
        </div>
      </section>

      {/* ---------------- CALL TO ACTION ---------------- */}
      <section className="bg-[#1e40af] text-white rounded-2xl p-10 text-center space-y-4 shadow-lg shadow-blue-900/50">
        <h2 className="text-3xl font-bold">Ready to Boost Your Exam Prep?</h2>
        <p>Join thousands of students using Quiz Bolt to stay ahead in their courses.</p>
        <button
          onClick={() => navigate("/")}
          className="inline-block bg-[#2563EB] text-white px-6 py-3 rounded-xl font-medium shadow hover:bg-blue-500 hover:scale-105 transition"
        >
          Start Quizzing Now
        </button>
      </section>

    </div>
  );
};

export default AboutPage;