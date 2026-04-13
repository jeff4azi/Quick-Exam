import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBolt,
  FaRocket,
  FaHistory,
  FaLightbulb,
  FaUsers,
  FaChartBar,
  FaWhatsapp,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaFacebookF,
  FaCrown,
  FaBookmark,
  FaRedo,
  FaLayerGroup,
} from "react-icons/fa";
import { SiX, SiTiktok } from "react-icons/si";
import { FiCheckCircle, FiZap, FiShuffle } from "react-icons/fi";
import Logo from "../images/Logo";

// Universities from onboarding
const UNIVERSITIES = [
  { id: "TASUED", name: "TaiSolarin University of Education", short: "TASUED" },
  { id: "LASU", name: "Lagos State University", short: "LASU" },
  {
    id: "BOUESTI",
    name: "Bamidele Olumilua University of Education, Science and Technology",
    short: "BOUESTI",
  },
];

const PREMIUM_FEATURES = [
  { icon: <FiZap />, text: "Unlimited Questions in Every Exam" },
  { icon: <FaLayerGroup />, text: "Full Flashcard Decks + Shuffle" },
  { icon: <FaBolt />, text: "Theory Exam Mode" },
  { icon: <FaBookmark />, text: "Bookmark Questions" },
  { icon: <FaRedo />, text: "Retake Exams" },
  { icon: <FaChartBar />, text: "Review Answers & See Failures" },
  { icon: <FaCrown />, text: "More Question Count Options (30, 50+)" },
  { icon: <FiCheckCircle />, text: "Auto-Advance Questions" },
  { icon: <FaBolt />, text: "No Ads" },
];

const AboutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 text-slate-900 dark:text-gray-100 selection:bg-blue-100 dark:selection:bg-blue-900/30 transition-colors duration-300">
      {/* NAV */}
      <nav className="py-6 px-6 border-b border-slate-100 dark:border-gray-800 bg-white/50 dark:bg-gray-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/landing")}
          >
            <Logo className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-black tracking-tighter">
              QuizBolt
            </span>
          </div>
          <button
            onClick={() => navigate("/landing")}
            className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
          >
            ← Back to Home
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-20 pb-16 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 px-4 py-2 rounded-full">
            <FaBolt className="text-blue-600 dark:text-blue-400 text-xs" />
            <span className="text-blue-700 dark:text-blue-300 text-[10px] font-black uppercase tracking-[0.2em]">
              Our Story & Vision
            </span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-black tracking-tight leading-tight">
            About{" "}
            <span className="text-blue-600 dark:text-blue-400">
              QuizBolt ⚡️
            </span>
          </h1>
          <p className="text-xl text-slate-500 dark:text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed">
            The platform where curiosity meets competition. Built by students,
            for students — to make CBT preparation smarter and more effective.
          </p>
        </div>
      </section>

      {/* MISSION & STORY */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="p-10 bg-white dark:bg-gray-900 rounded-[3rem] border border-slate-100 dark:border-gray-800 shadow-sm">
            <div className="size-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-200 dark:shadow-none">
              <FaRocket />
            </div>
            <h2 className="text-3xl font-black mb-6">Our Mission</h2>
            <p className="text-slate-500 dark:text-gray-400 leading-relaxed font-medium">
              At QuizBolt ⚡️, our mission is simple: make learning fun,
              interactive, and competitive. We believe knowledge should be
              accessible, engaging, and rewarding. Every quiz you take sharpens
              your skills, tracks your growth, and pushes you further toward
              exam success.
            </p>
          </div>
          <div className="p-10 bg-slate-900 dark:bg-blue-600 rounded-[3rem] text-white shadow-xl">
            <div className="size-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6">
              <FaHistory />
            </div>
            <h2 className="text-3xl font-black mb-6 text-white">Our Story</h2>
            <p className="text-blue-50/80 leading-relaxed font-medium">
              QuizBolt started with a vision to bridge the gap between lecture
              halls and digital mastery. Built by students who understand the
              hustle of CBT exams, we've grown into a platform that combines
              education, competition, and smart revision tools — all in one
              place. Our journey is powered by curiosity and a desire to make
              studying addictive, in the best way.
            </p>
          </div>
        </div>
      </section>

      {/* UNIVERSITIES */}
      <section className="py-16 px-6 bg-white dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-3">
            Supported Institutions
          </p>
          <h2 className="text-3xl font-black mb-4 tracking-tight">
            Universities We Serve
          </h2>
          <p className="text-slate-500 dark:text-gray-400 font-medium mb-12 max-w-lg mx-auto">
            Course content is tailored to the specific curriculum of each
            university.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {UNIVERSITIES.map((u) => (
              <div
                key={u.id}
                className="bg-slate-50 dark:bg-gray-900 border border-slate-100 dark:border-gray-800 rounded-[2rem] px-10 py-8 flex flex-col items-center gap-3 min-w-[220px]"
              >
                <div className="size-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-lg shadow-blue-200 dark:shadow-none">
                  {u.short}
                </div>
                <p className="font-black text-slate-800 dark:text-white text-center text-sm">
                  {u.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES / HOW WE EMPOWER */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 text-center mb-3">
            Platform Features
          </p>
          <h2 className="text-4xl font-black text-center mb-4 tracking-tight">
            How We Empower You
          </h2>
          <p className="text-slate-500 dark:text-gray-400 font-medium text-center mb-16 max-w-xl mx-auto">
            Every feature is designed to help you study smarter, not harder.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ValueItem
              icon={<FaChartBar />}
              title="Track Your Progress"
              desc="Every quiz contributes to a personal journey. See how much you improve over time with detailed history."
            />
            <ValueItem
              icon={<FaUsers />}
              title="Compete & Connect"
              desc="Challenge friends, climb the leaderboard, and join a community of driven students."
            />
            <ValueItem
              icon={<FaLightbulb />}
              title="Multiple Study Modes"
              desc="Objective, Theory, Fill-in-the-Blank, and Flashcards — every format your exam uses."
            />
            <ValueItem
              icon={<FaBolt />}
              title="Instant Feedback"
              desc="Get results immediately after every quiz, making learning fast and effective."
            />
          </div>
        </div>
      </section>

      {/* PREMIUM FEATURES */}
      <section className="py-24 px-6 bg-white dark:bg-gray-900/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/50 px-4 py-2 rounded-full mb-4">
              <FaCrown className="text-amber-500 text-xs" />
              <span className="text-amber-700 dark:text-amber-300 text-[10px] font-black uppercase tracking-[0.2em]">
                Premium Access
              </span>
            </div>
            <h2 className="text-4xl font-black tracking-tight mb-4">
              Everything Premium Unlocks
            </h2>
            <p className="text-slate-500 dark:text-gray-400 font-medium max-w-xl mx-auto">
              One payment. Full semester access. No limits.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {PREMIUM_FEATURES.map((f, i) => (
              <div
                key={i}
                className="flex items-center gap-4 bg-slate-50 dark:bg-gray-900 border border-slate-100 dark:border-gray-800 rounded-2xl px-6 py-4"
              >
                <div className="size-10 rounded-xl bg-amber-50 dark:bg-amber-900/20 text-amber-500 flex items-center justify-center text-base shrink-0">
                  {f.icon}
                </div>
                <p className="font-bold text-slate-700 dark:text-slate-200 text-sm">
                  {f.text}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button
              onClick={() => navigate("/login")}
              className="inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-600 text-white px-10 py-5 rounded-[2rem] font-black text-lg shadow-xl shadow-amber-200 dark:shadow-none transition-all active:scale-95"
            >
              <FaCrown /> Get Premium — ₦2,000
            </button>
            <p className="text-xs text-slate-400 mt-3 font-medium">
              Full semester access · Confirmed within minutes
            </p>
          </div>
        </div>
      </section>

      {/* VALUES & CONTACT */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-16 items-start">
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-4xl font-black tracking-tight">
              Our Core Values
            </h2>
            <ul className="space-y-6">
              <ValueList
                title="Fun"
                desc="Learning should never feel boring. We make it competitive and engaging."
              />
              <ValueList
                title="Transparency"
                desc="Scores and leaderboard positions are always clear and honest."
              />
              <ValueList
                title="Community"
                desc="We thrive by connecting knowledge seekers across universities."
              />
              <ValueList
                title="Growth"
                desc="Every quiz is an opportunity to improve. We celebrate progress."
              />
              <ValueList
                title="Accessibility"
                desc="Free access for all students, with premium features for those who want more."
              />
            </ul>
          </div>
          <div className="lg:col-span-3 bg-white dark:bg-gray-900 p-12 rounded-[3rem] border border-slate-100 dark:border-gray-800 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <FaWhatsapp className="text-[120px]" />
            </div>
            <h2 className="text-3xl font-black mb-6">Reach Out to Us</h2>
            <p className="text-slate-500 dark:text-gray-400 font-medium mb-8 leading-relaxed">
              Have questions, suggestions, or just want to say hi? We love
              connecting with our users. Reach the founder directly on WhatsApp
              for quick support or feedback.
            </p>
            <div className="space-y-4">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                Founder
              </p>
              <div className="flex items-center gap-4 mb-8">
                <div className="size-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center font-black text-blue-600">
                  JA
                </div>
                <div>
                  <p className="font-bold text-slate-800 dark:text-white">
                    Jeffrey Austin
                  </p>
                  <p className="text-xs text-slate-400 font-medium italic">
                    We aim to respond within 24 hours.
                  </p>
                </div>
              </div>
              <a
                href="https://wa.me/2347015585397"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-2xl font-black text-lg shadow-xl shadow-green-200 dark:shadow-none transition-all active:scale-95"
              >
                <FaWhatsapp className="text-xl" /> Message on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto bg-blue-600 rounded-[3rem] p-12 lg:p-20 text-white relative overflow-hidden shadow-2xl shadow-blue-200 dark:shadow-none">
          <div className="absolute top-0 right-0 opacity-10">
            <FaBolt className="text-white text-[200px]" />
          </div>
          <h2 className="text-4xl font-black mb-6 relative z-10">
            Join QuizBolt ⚡️ Today
          </h2>
          <p className="text-blue-100 font-medium mb-10 relative z-10">
            Ready to challenge yourself, track your results, and compete with
            the best?
          </p>
          <button
            onClick={() => navigate("/login")}
            className="relative z-10 bg-white text-blue-600 px-10 py-5 rounded-[2rem] font-black text-xl hover:bg-blue-50 transition-all active:scale-95"
          >
            Sign Up — It's Free
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 border-t border-slate-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Logo className="w-6 h-6 text-blue-600" />
              <span className="text-lg font-black tracking-tighter">
                QuizBolt
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              The ultimate academic companion for university students mastering
              their courses through interactive CBT preparation.
            </p>
            <div className="flex flex-wrap gap-3">
              <SocialLink
                url="https://www.instagram.com/codejeffrey18/"
                icon={<FaInstagram />}
                color="hover:bg-pink-600"
              />
              <SocialLink
                url="https://x.com/Jappy682"
                icon={<SiX />}
                color="hover:bg-gray-900"
              />
              <SocialLink
                url="https://whatsapp.com/channel/0029Vb6t7rnKrWQx4oL6m31f"
                icon={<FaWhatsapp />}
                color="hover:bg-green-500"
              />
              <SocialLink
                url="https://www.tiktok.com/@codejeffrey18"
                icon={<SiTiktok />}
                color="hover:bg-gray-900"
              />
              <SocialLink
                url="https://www.youtube.com/@codejeffrey18"
                icon={<FaYoutube />}
                color="hover:bg-red-500"
              />
              <SocialLink
                url="https://www.linkedin.com/in/jeffrey-austin-110074383"
                icon={<FaLinkedinIn />}
                color="hover:bg-blue-500"
              />
              <SocialLink
                url="https://www.facebook.com/share/17RabkxuWY/"
                icon={<FaFacebookF />}
                color="hover:bg-blue-600"
              />
            </div>
          </div>
          <div>
            <h4 className="font-black text-xs uppercase tracking-widest mb-6 text-slate-400">
              Links
            </h4>
            <ul className="space-y-4 text-sm font-bold text-slate-500">
              <li>
                <button
                  onClick={() => navigate("/landing")}
                  className="hover:text-blue-600"
                >
                  Home
                </button>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-black text-xs uppercase tracking-widest mb-6 text-slate-400">
              Universities
            </h4>
            <ul className="space-y-3 text-sm font-medium text-slate-500">
              {UNIVERSITIES.map((u) => (
                <li key={u.id} className="flex items-center gap-2">
                  <div className="size-1.5 bg-blue-600 rounded-full shrink-0" />
                  {u.name}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-black text-xs uppercase tracking-widest mb-6 text-slate-400">
              Newsletter
            </h4>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter email"
                className="flex-1 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 px-4 py-3 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-5 py-3 rounded-2xl font-black text-sm">
                Go
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-slate-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-400 font-medium">
            © {new Date().getFullYear()} QuizBolt. All rights reserved.
          </p>
          <p className="text-xs text-slate-400 font-medium">
            Built with ❤️ for Nigerian university students.
          </p>
        </div>
      </footer>
    </div>
  );
};

/* SUB-COMPONENTS */
const ValueItem = ({ icon, title, desc }) => (
  <div className="text-center space-y-4 group">
    <div className="size-16 mx-auto bg-slate-100 dark:bg-gray-800 text-slate-900 dark:text-white rounded-3xl flex items-center justify-center text-2xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 group-hover:rotate-6">
      {icon}
    </div>
    <h3 className="text-lg font-black tracking-tight">{title}</h3>
    <p className="text-sm text-slate-400 font-medium leading-relaxed">{desc}</p>
  </div>
);

const ValueList = ({ title, desc }) => (
  <li className="flex gap-4 items-start">
    <div className="size-2 bg-blue-600 rounded-full mt-2.5 flex-shrink-0" />
    <div>
      <p className="font-black text-slate-800 dark:text-white leading-tight">
        {title}
      </p>
      <p className="text-sm text-slate-500 dark:text-gray-400 font-medium">
        {desc}
      </p>
    </div>
  </li>
);

const SocialLink = ({ url, icon, color }) => (
  <a
    href={url}
    target="_blank"
    rel="noreferrer"
    className={`size-10 bg-slate-100 dark:bg-gray-800 rounded-xl flex items-center justify-center text-slate-600 dark:text-gray-400 ${color} hover:text-white transition-all`}
  >
    {icon}
  </a>
);

export default AboutPage;
