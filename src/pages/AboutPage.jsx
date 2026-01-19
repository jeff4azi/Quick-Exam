import { FaYoutube, FaWhatsapp, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { SiTiktok, SiX } from "react-icons/si"; // SiX is the new X logo
import { useNavigate } from "react-router-dom"

const AboutPage = () => {
  const navigate = useNavigate()

  return (
    <div className="max-w-4xl mx-auto px-5 py-10 space-y-16">

      {/* ---------------- HERO SECTION ---------------- */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-[#2563EB]">About Quiz Bolt</h1>
        <p className="text-gray-600 text-lg">
          Quiz Bolt is your go-to platform for exam preparation. We provide curated, interactive quizzes for students, helping you stay ahead and master your courses efficiently.
        </p>
      </section>

      {/* ---------------- WHAT WE DO ---------------- */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">What We Do</h2>
        <p className="text-gray-600 leading-relaxed">
          At Quiz Bolt, we aim to simplify learning. Our platform offers multiple-choice quizzes for different courses, allows you to bookmark questions, review your answers, and track your progress over time. Everything is designed to make studying smarter, not harder.
        </p>
      </section>

      {/* ---------------- FEATURES ---------------- */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">Key Features</h2>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>Interactive quizzes with random question selection</li>
          <li>Bookmark questions and review them anytime</li>
          <li>Automatic scoring and detailed results</li>
          <li>Optimized for both desktop and mobile devices</li>
          <li>Upcoming features: account creation, login, and personalized dashboards</li>
        </ul>
      </section>

      {/* ---------------- FOLLOW US ---------------- */}
      <section className="space-y-6 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">Follow Us</h2>
        <p className="text-gray-600">Stay updated with our latest quizzes and tips. Connect with us on social media!</p>
        <div className="flex justify-center gap-6 text-3xl mt-4 text-[#2563EB]">
          <a href="https://youtube.com/@codejeffrey18?si=r9lJUJ1HdKeRPmGt" target="_blank" rel="noopener noreferrer">
            <FaYoutube className="hover:text-red-600 transition" />
          </a>
          <a href="https://wa.me/2347015585397" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp className="hover:text-green-500 transition" />
          </a>
          <a href="https://www.instagram.com/codejeffrey18?igsh=MXFrM3hneHUxanRjbA==" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="hover:text-pink-500 transition" />
          </a>
          <a href="https://x.com/Jappy682" target="_blank" rel="noopener noreferrer">
            <SiX className="hover:text-black transition" />
          </a>
          <a href="https://www.tiktok.com/@codejeffrey18?_r=1&_d=f0id5k11di62de&sec_uid=MS4wLjABAAAAs-74xQ5Lh5ye4lPBykPFOf5d8xTmiQ6KXiD3W8s7wbs2Ly6jEEKzBJZAj2j1Drez&share_author_id=7541936112290464785&sharer_language=en&source=h5_m&u_code=em3ai2acehdibb&timestamp=1768827516&user_id=7541936112290464785&sec_user_id=MS4wLjABAAAAs-74xQ5Lh5ye4lPBykPFOf5d8xTmiQ6KXiD3W8s7wbs2Ly6jEEKzBJZAj2j1Drez&item_author_type=1&utm_source=copy&utm_campaign=client_share&utm_medium=android&share_iid=7590731933664560917&share_link_id=095c0f9c-d1d1-4273-8804-6b6caec0d83b&share_app_id=1233&ugbiz_name=ACCOUNT&ug_btm=b8727%2Cb7360&social_share_type=5&enable_checksum=1" target="_blank" rel="noopener noreferrer">
            <SiTiktok className="hover:text-black transition" />
          </a>
          <a href="https://www.linkedin.com/in/jeffrey-austin-110074383?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer">
            <FaLinkedinIn className="hover:text-blue-600 transition" />
          </a>
        </div>
      </section>

      {/* ---------------- CALL TO ACTION ---------------- */}
      <section className="bg-[#2563EB] text-white rounded-2xl p-10 text-center space-y-4">
        <h2 className="text-3xl font-bold">Ready to Boost Your Exam Prep?</h2>
        <p>Join thousands of students using Quiz Bolt to stay ahead in their courses.</p>
        <a href="/" className="inline-block bg-white text-[#2563EB] px-6 py-3 rounded-xl font-medium shadow hover:scale-105 transition" onClick={() => navigate("/")}>
          Start Quizzing Now
        </a>
      </section>

    </div>
  );
};

export default AboutPage;