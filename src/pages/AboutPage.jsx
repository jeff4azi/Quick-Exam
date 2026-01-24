import { FaYoutube, FaWhatsapp, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { SiTiktok, SiX } from "react-icons/si";
import { useNavigate } from "react-router-dom";

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 font-sans selection:bg-blue-500/30">

      {/* ---------------- HERO SECTION ---------------- */}
      <section className="relative bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-indigo-700 dark:to-blue-900 text-white py-20 px-5 text-center shadow-lg">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">About Quiz Bolt</h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl drop-shadow-sm">
          Your go-to platform for exam preparation. Curated, interactive quizzes designed to help you master your courses efficiently.
        </p>
      </section>

      <div className="max-w-5xl mx-auto px-5 py-16 space-y-16">

        {/* ---------------- WHAT WE DO ---------------- */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-gray-100">What We Do</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-3">Simplified Learning</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Our platform offers multiple-choice quizzes for different courses, allowing you to learn smarter and more efficiently.
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-3">Progress Tracking</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Track your performance over time, review answers, and bookmark questions for easy revision.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------- FEATURES ---------------- */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-gray-100">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Interactive quizzes with random question selection",
              "Bookmark questions and review them anytime",
              "Automatic scoring and detailed results",
              "Optimized for both desktop and mobile devices",
            ].map((feature, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 lg:gap-3 p-5 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition"
              >
                <span className="size-2 rounded-full bg-blue-500 dark:bg-blue-400 font-bold text-lg"></span>
                <p className="text-gray-700 dark:text-gray-300">{feature}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------- FOLLOW US ---------------- */}
        <section className="text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">Follow Us</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Stay updated with our latest quizzes and tips. Connect with us on social media!
          </p>
          <div className="flex justify-center gap-8 text-4xl text-gray-800 dark:text-gray-200">
            <a href="https://youtube.com/@codejeffrey18?si=r9lJUJ1HdKeRPmGt" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-transform transform hover:scale-125">
              <FaYoutube />
            </a>
            <a href="https://whatsapp.com/channel/0029Vb6t7rnKrWQx4oL6m31f" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-transform transform hover:scale-125">
              <FaWhatsapp />
            </a>
            <a href="https://www.instagram.com/codejeffrey18/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-transform transform hover:scale-125">
              <FaInstagram />
            </a>
            <a href="https://x.com/Jappy682" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 dark:hover:text-gray-100 transition-transform transform hover:scale-125">
              <SiX />
            </a>
            <a href="https://www.tiktok.com/@codejeffrey18" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 dark:hover:text-gray-100 transition-transform transform hover:scale-125">
              <SiTiktok />
            </a>
            <a href="https://www.linkedin.com/in/jeffrey-austin-110074383" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-transform transform hover:scale-125">
              <FaLinkedinIn />
            </a>
          </div>
        </section>

        {/* ---------------- CONTACT US ---------------- */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl p-10 shadow-md hover:shadow-xl transition text-center space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Contact Us</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Got questions or need help? Reach out to us directly on WhatsApp and we'll respond quickly!
          </p>
          <a
            href="https://wa.me/2347015585397"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-xl shadow hover:shadow-lg transition transform hover:scale-105"
          >
            <FaWhatsapp className="text-2xl" /> Chat on WhatsApp
          </a>
        </section>

        {/* ---------------- CALL TO ACTION ---------------- */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-indigo-700 dark:to-blue-900 text-white rounded-2xl p-12 text-center space-y-6 shadow-xl transform transition hover:scale-105">
          <h2 className="text-3xl md:text-4xl font-extrabold">Ready to Boost Your Exam Prep?</h2>
          <p className="text-lg md:text-xl">Join thousands of students using Quiz Bolt to stay ahead in their courses.</p>
          <button
            onClick={() => navigate("/")}
            className="bg-white dark:bg-gray-100 text-blue-600 dark:text-blue-800 font-semibold px-8 py-3 rounded-xl shadow hover:shadow-lg hover:scale-105 transition"
          >
            Start Quizzing Now
          </button>
        </section>

      </div>
    </div>
  );
};

export default AboutPage;