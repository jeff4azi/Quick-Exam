import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBolt,
  FaChartLine,
  FaTrophy,
  FaUserCheck,
  FaWhatsapp,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaFacebookF,
  FaInfoCircle,
  FaCrown,
  FaBookmark,
  FaRedo,
  FaLayerGroup,
  FaBrain,
} from "react-icons/fa";
import Logo from "../images/Logo";
import { SiX, SiTiktok } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";
import { FiCheckCircle, FiShuffle, FiZap } from "react-icons/fi";
import { supabase } from "../supabaseClient";
import { useUniversities } from "../hooks/useUniversities";

const PREMIUM_FEATURES = [
  { icon: <FiZap />, text: "Unlimited Questions in Every Exam" },
  { icon: <FaLayerGroup />, text: "Full Flashcard Decks + Shuffle" },
  { icon: <FaBrain />, text: "Theory Exam Mode" },
  { icon: <FaBookmark />, text: "Bookmark Questions" },
  { icon: <FaRedo />, text: "Retake Exams" },
  { icon: <FaChartLine />, text: "Review Answers & See Failures" },
  { icon: <FaCrown />, text: "More Question Count Options (30, 50+)" },
  { icon: <FiCheckCircle />, text: "Auto-Advance Questions" },
  { icon: <FaBolt />, text: "No Ads" },
];

const LandingPage = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const { universities } = useUniversities();

  const [stats, setStats] = useState([
    { label: "Quizzes Taken", value: "..." },
    { label: "Active Scholars", value: "..." },
    { label: "Course Modules", value: "..." },
    { label: "Universities", value: "..." },
  ]);

  const fetchStats = useCallback(async () => {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    try {
      const [coursesRes, usersRes, quizzesRes] = await Promise.all([
        fetch(`${BASE_URL}/courses/count`).then((r) => r.json()),
        fetch(`${BASE_URL}/api/stats/users/count`).then((r) => r.json()),
        fetch(`${BASE_URL}/api/stats/quizzes/count`).then((r) => r.json()),
      ]);
      const fmt = (n) => `${n.toLocaleString()}+`;
      setStats([
        { label: "Quizzes Taken", value: fmt(quizzesRes.count || 0) },
        { label: "Active Scholars", value: fmt(usersRes.count || 0) },
        { label: "Course Modules", value: fmt(coursesRes.count || 0) },
        { label: "Universities", value: `${universities.length}+` },
      ]);
    } catch (err) {
      console.error("Error fetching landing stats:", err);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const [topPlayers, setTopPlayers] = useState([]);

  const fetchGlobalLeaderboard = useCallback(async () => {
    try {
      const { data: attemptsData, error } = await supabase
        .from("exam_attempts")
        .select("user_id, score, total_questions, date_taken")
        .eq("is_retake", false);
      if (error) throw error;

      const userBestMap = new Map();
      attemptsData.forEach((att) => {
        const percent = Math.round((att.score / att.total_questions) * 100);
        const existing = userBestMap.get(att.user_id);
        if (!existing || percent > existing.score)
          userBestMap.set(att.user_id, {
            score: percent,
            date: att.date_taken,
          });
      });

      const topUserIds = Array.from(userBestMap.keys());
      const { data: profilesData } = await supabase
        .from("profiles")
        .select("id, full_name, user_name, university")
        .in("id", topUserIds);

      const profileMap = {};
      profilesData?.forEach(
        (p) =>
          (profileMap[p.id] = {
            name: p.user_name || p.full_name,
            university: p.university || "—",
          }),
      );

      const formatted = Array.from(userBestMap.entries())
        .map(([userId, data]) => ({
          name: profileMap[userId]?.name || "Scholar",
          university: profileMap[userId]?.university || "—",
          score: data.score,
          date: new Date(data.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 5)
        .map((p, i) => ({ rank: i + 1, ...p }));

      setTopPlayers(formatted);
    } catch (err) {
      console.error("Error fetching leaderboard:", err);
    }
  }, []);

  useEffect(() => {
    fetchGlobalLeaderboard();
  }, [fetchGlobalLeaderboard]);
  useEffect(() => {
    localStorage.setItem("visited", "true");
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const testimonials = [
    {
      name: "Tolu A.",
      role: "TASUED · Year 2",
      comment:
        "QuizBolt helped me ace my CBT exams. The theory mode is a game changer!",
      color: "bg-blue-600",
    },
    {
      name: "Emeka R.",
      role: "LASU · Year 3",
      comment:
        "I love competing on the leaderboard. Flashcards make revision so much faster.",
      color: "bg-slate-900",
    },
    {
      name: "Fatima K.",
      role: "TASUED · Year 1",
      comment:
        "The bookmark feature saves me so much time during revision week.",
      color: "bg-violet-600",
    },
    {
      name: "David O.",
      role: "LASU · Year 4",
      comment:
        "Retaking exams and reviewing my failures helped me improve by 30%.",
      color: "bg-green-600",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 text-slate-900 dark:text-gray-100 selection:bg-blue-100 dark:selection:bg-blue-900/30 transition-colors duration-300">
      {/* NAV */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white/80 dark:bg-gray-950/80 backdrop-blur-md shadow-sm border-b border-slate-100 dark:border-gray-800 py-3" : "bg-transparent py-5"}`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Logo className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-black tracking-tighter text-slate-900 dark:text-white">
              QuizBolt
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-gray-400">
            <a
              onClick={() => navigate("/about")}
              className="hover:text-blue-600 cursor-pointer"
            >
              About
            </a>
            <a href="#features" className="hover:text-blue-600">
              Features
            </a>
            <a href="#premium" className="hover:text-blue-600">
              Premium
            </a>
            <a href="#leaderboard" className="hover:text-blue-600">
              Rankings
            </a>
          </div>
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-2xl font-bold text-sm transition-all active:scale-95 shadow-lg shadow-blue-200 dark:shadow-none"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 px-4 py-2 rounded-full">
              <FaBolt className="text-blue-600 dark:text-blue-400 text-xs" />
              <span className="text-blue-700 dark:text-blue-300 text-[10px] font-black uppercase tracking-[0.2em]">
                The University Standard
              </span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]">
              Challenge Your Mind. <br />
              <span className="text-blue-600 dark:text-blue-400">
                Earn Your Glory.
              </span>
            </h1>
            <p className="text-lg text-slate-500 dark:text-gray-400 font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Test your knowledge, track your progress, and compete with friends
              on interactive quizzes built for university CBT mastery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() => navigate("/login")}
                className="flex items-center justify-center gap-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-4 rounded-2xl font-black text-lg hover:opacity-90 transition-all active:scale-95"
              >
                <FcGoogle className="text-lg" /> Sign in with Google
              </button>
              <button
                onClick={() =>
                  window.open("https://wa.me/2347015585397", "_blank")
                }
                className="px-8 py-4 rounded-2xl font-black text-lg border-2 border-slate-200 dark:border-gray-800 hover:bg-slate-50 dark:hover:bg-gray-900 transition-all"
              >
                Learn More
              </button>
            </div>
            {/* University badges */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {universities.map((u) => (
                <span
                  key={u.id}
                  className="text-[10px] font-black uppercase tracking-wider bg-white dark:bg-gray-900 border border-slate-100 dark:border-gray-800 text-slate-500 dark:text-gray-400 px-3 py-1.5 rounded-full"
                >
                  {u.name} ({u.id})
                </span>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 blur-3xl rounded-full" />
            <div className="relative bg-white dark:bg-gray-900 border border-slate-100 dark:border-gray-800 p-4 rounded-[2.5rem] shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
              <img
                src="https://images.unsplash.com/photo-1610484826967-09c5720778c7?q=80&w=1000&auto=format&fit=crop"
                alt="Quiz Preview"
                className="rounded-[2rem] w-full object-cover aspect-[4/5]"
              />
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="size-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600">
                    <FaTrophy />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">
                      New High Score
                    </p>
                    <p className="text-sm font-black text-slate-800 dark:text-white">
                      Mastery: 98%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 bg-blue-600 dark:bg-blue-700">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <div key={i} className="space-y-2">
              <p className="text-4xl font-black text-white">{s.value}</p>
              <p className="text-blue-100 font-bold uppercase tracking-widest text-xs">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 bg-white dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-3">
            What We Offer
          </p>
          <h2 className="text-4xl font-black mb-4 tracking-tight">
            Why Choose QuizBolt ⚡️?
          </h2>
          <p className="text-slate-500 dark:text-gray-400 font-medium mb-16 max-w-xl mx-auto">
            Everything you need to prepare, practice, and perform at your best.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={<FaBolt />}
              title="Multiple Exam Modes"
              desc="Objective, Theory, and Fill-in-the-Blank — all the formats your CBT throws at you."
            />
            <FeatureCard
              icon={<FaLayerGroup />}
              title="Flashcard Study"
              desc="Flip through course flashcards, rate your confidence, and track mastery."
            />
            <FeatureCard
              icon={<FaChartLine />}
              title="Track Progress"
              desc="Detailed results after every quiz. See your history and spot weak areas."
            />
            <FeatureCard
              icon={<FaTrophy />}
              title="Leaderboards"
              desc="Compete with students across your university and beyond."
            />
            <FeatureCard
              icon={<FaBookmark />}
              title="Bookmark Questions"
              desc="Save tricky questions and revisit them before your exam."
            />
            <FeatureCard
              icon={<FaRedo />}
              title="Retake Exams"
              desc="Didn't like your score? Retake and beat your personal best."
            />
            <FeatureCard
              icon={<FiBrain />}
              title="Review Failures"
              desc="See exactly which questions you got wrong and learn from them."
            />
            <FeatureCard
              icon={<FaUserCheck />}
              title="One-Tap Login"
              desc="Google sign-in gets you straight into studying — no friction."
            />
          </div>
        </div>
      </section>

      {/* PREMIUM SECTION */}
      <section id="premium" className="py-24 px-6 bg-slate-50 dark:bg-gray-950">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/50 px-4 py-2 rounded-full mb-4">
              <FaCrown className="text-amber-500 text-xs" />
              <span className="text-amber-700 dark:text-amber-300 text-[10px] font-black uppercase tracking-[0.2em]">
                Premium Access
              </span>
            </div>
            <h2 className="text-4xl font-black tracking-tight mb-4">
              Unlock the Full Experience
            </h2>
            <p className="text-slate-500 dark:text-gray-400 font-medium max-w-xl mx-auto">
              One payment. Full semester access. Everything unlocked.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {PREMIUM_FEATURES.map((f, i) => (
              <div
                key={i}
                className="flex items-center gap-4 bg-white dark:bg-gray-900 border border-slate-100 dark:border-gray-800 rounded-2xl px-6 py-4"
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

      {/* ABOUT BRIDGE */}
      <section className="py-12 px-6 bg-white dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="relative group overflow-hidden bg-slate-50 dark:bg-gray-900 border border-slate-100 dark:border-gray-800 p-8 md:p-12 rounded-[3rem] hover:shadow-md transition-all duration-500">
            <div className="absolute -right-20 -top-20 size-64 bg-blue-500/5 blur-[100px] group-hover:bg-blue-500/10 transition-colors" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 max-w-2xl text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 text-blue-600 dark:text-blue-400">
                  <FaInfoCircle className="text-sm" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                    The QuizBolt Story
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black tracking-tight">
                  More than just a quiz app. <br />
                  <span className="text-slate-400 dark:text-gray-500">
                    A university standard.
                  </span>
                </h2>
                <p className="text-slate-500 dark:text-gray-400 font-medium leading-relaxed">
                  Built by students who understand the hustle of CBT exams.
                  QuizBolt bridges the gap between lecture halls and digital
                  mastery — making study time competitive, interactive, and
                  effective.
                </p>
              </div>
              <button
                onClick={() => navigate("/about")}
                className="group/btn flex items-center gap-3 bg-white dark:bg-gray-800 hover:bg-blue-600 hover:text-white px-8 py-5 rounded-2xl font-black text-sm transition-all active:scale-95 whitespace-nowrap border border-slate-100 dark:border-gray-700"
              >
                Learn Our Story{" "}
                <span className="group-hover/btn:translate-x-1 transition-transform">
                  &rarr;
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center md:text-left">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 text-center mb-3">
            Simple Process
          </p>
          <h2 className="text-4xl font-black text-center mb-16 tracking-tight">
            How It Works
          </h2>
          <div className="space-y-12">
            <Step
              number="01"
              title="Sign Up or Login"
              desc="Use your Google account to secure your progress instantly — no passwords needed."
            />
            <Step
              number="02"
              title="Pick a Course & Mode"
              desc="Choose from Objective, Theory, FIB, or Flashcard mode across university-standard courses."
            />
            <Step
              number="03"
              title="Answer & Submit"
              desc="Complete the challenge and get instant, detailed feedback on every question."
            />
            <Step
              number="04"
              title="Track, Retake & Compete"
              desc="Review your failures, retake exams, climb the leaderboard, and unlock premium features."
            />
          </div>
        </div>
      </section>

      {/* LEADERBOARD */}
      <section
        id="leaderboard"
        className="py-24 px-6 bg-white dark:bg-gray-900/50"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-3">
              Global Rankings
            </p>
            <h2 className="text-4xl font-black mb-4 tracking-tight">
              Top Players
            </h2>
            <p className="text-slate-500 dark:text-gray-400 font-medium">
              See who's dominating the platform and aim for the top.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-gray-800 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-gray-800/50">
                  {["Rank", "Username", "Score", "Date", "University"].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400"
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-gray-800">
                {topPlayers.map((p) => (
                  <tr
                    key={p.rank}
                    className="hover:bg-blue-50/30 dark:hover:bg-blue-900/5 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span
                        className={`size-8 flex items-center justify-center rounded-full font-black text-sm ${p.rank === 1 ? "bg-amber-100 text-amber-600" : p.rank === 2 ? "bg-slate-100 text-slate-600" : p.rank === 3 ? "bg-orange-100 text-orange-600" : "text-slate-400"}`}
                      >
                        {p.rank}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold">{p.name}</td>
                    <td className="px-6 py-4 font-black text-blue-600 dark:text-blue-400">
                      {p.score}%
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-400 font-medium">
                      {p.date}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-400 font-medium">
                      {p.university}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 px-6 bg-slate-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 text-center mb-3">
            Student Reviews
          </p>
          <h2 className="text-4xl font-black text-center mb-16 tracking-tight">
            What Our Users Say
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-gray-800 shadow-sm relative flex flex-col justify-between"
              >
                <div className="absolute -top-3 left-8 size-7 bg-blue-600 rounded-full flex items-center justify-center text-white text-base leading-none">
                  "
                </div>
                <p className="text-sm font-medium text-slate-600 dark:text-gray-300 italic mb-6 leading-relaxed">
                  "{t.comment}"
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className={`size-9 ${t.color} rounded-full flex items-center justify-center text-white font-black text-xs`}
                  >
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-black text-sm text-slate-800 dark:text-white">
                      {t.name}
                    </p>
                    <p className="text-[10px] text-slate-400 font-medium">
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto bg-slate-900 dark:bg-white rounded-[3rem] p-12 lg:p-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10">
            <FaBolt className="text-white dark:text-black text-[200px]" />
          </div>
          <h2 className="text-4xl font-black text-white dark:text-slate-950 mb-6 leading-tight">
            Ready to Start Your <br />
            Quiz Journey?
          </h2>
          <p className="text-slate-400 dark:text-slate-500 font-medium mb-10">
            Join thousands of students challenging themselves every day.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 text-white px-10 py-5 rounded-[2rem] font-black text-xl shadow-xl shadow-blue-500/20 transition-transform active:scale-95"
          >
            Sign Up Now — It's Free
          </button>
        </div>
      </section>

      {/* PWA DOWNLOAD */}
      <section
        id="pwa-download"
        className="py-24 px-6 bg-white dark:bg-gray-900/30"
      >
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden bg-slate-50 dark:bg-gray-900 border border-slate-100 dark:border-gray-800 rounded-[3rem] p-8 md:p-16 flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg text-[10px] font-black uppercase tracking-widest">
                Optimized for Android
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                QuizBolt is better <br />
                <span className="text-blue-600">on your Home Screen.</span>
              </h2>
              <p className="text-slate-500 dark:text-gray-400 font-medium text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
                Install our official PWA for a full-screen experience, faster
                loading, and instant access to your academic dashboard —
                anytime, anywhere.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <a
                  href="https://ujuvxzbywmsmprtvmvtk.supabase.co/storage/v1/object/public/PWA/quiz-bolt-v1.0.2.apk"
                  download="QuizBolt.apk"
                  className="group flex items-center gap-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-4 rounded-2xl font-black text-sm hover:scale-[1.02] transition-all active:scale-95 shadow-xl shadow-slate-200 dark:shadow-none"
                >
                  <FaBolt className="group-hover:text-blue-500 transition-colors" />{" "}
                  Download Android PWA
                </a>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                  V1.0.2 · Fast & Lightweight
                </p>
              </div>
            </div>
            <div className="w-full lg:w-1/2 relative flex justify-center">
              <div className="absolute inset-0 bg-blue-500/10 blur-[120px] rounded-full" />
              <div className="relative w-64 h-[500px] bg-slate-900 rounded-[3rem] border-[8px] border-slate-800 dark:border-gray-700 shadow-2xl overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-6 bg-slate-800 flex justify-center items-end pb-1">
                  <div className="w-16 h-1 bg-slate-700 rounded-full" />
                </div>
                <div className="p-4 pt-10 space-y-4">
                  <div className="size-10 bg-white rounded-xl flex items-center justify-center">
                    <Logo className="w-8 h-8 brightness-75" />
                  </div>
                  <div className="h-4 w-3/4 bg-slate-800 rounded-full animate-pulse" />
                  <div className="h-4 w-1/2 bg-slate-800 rounded-full animate-pulse" />
                  <div className="mt-8 space-y-3">
                    <div className="h-24 w-full bg-slate-800/50 rounded-2xl border border-slate-700/50" />
                    <div className="h-24 w-full bg-slate-800/50 rounded-2xl border border-slate-700/50" />
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 right-10 md:right-20 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-gray-700 rotate-6">
                <div className="flex items-center gap-3">
                  <div className="size-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600">
                    <FaUserCheck size={14} />
                  </div>
                  <p className="text-xs font-black">Verified APK</p>
                </div>
              </div>
            </div>
          </div>
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
            <h4 className="font-black text-xs uppercase tracking-[0.2em] mb-6">
              Links
            </h4>
            <ul className="space-y-4 text-sm font-bold text-slate-500 dark:text-gray-400">
              <li>
                <a
                  onClick={() => navigate("/about")}
                  className="hover:text-blue-600 cursor-pointer"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  onClick={() => navigate("/faq")}
                  className="hover:text-blue-600 cursor-pointer"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  onClick={() => navigate("/terms")}
                  className="hover:text-blue-600 cursor-pointer"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  onClick={() => navigate("/privacy")}
                  className="hover:text-blue-600 cursor-pointer"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-black text-xs uppercase tracking-[0.2em] mb-6">
              Universities
            </h4>
            <ul className="space-y-3 text-sm font-medium text-slate-500 dark:text-gray-400">
              {universities.map((u) => (
                <li key={u.id} className="flex items-center gap-2">
                  <div className="size-1.5 bg-blue-600 rounded-full shrink-0" />
                  {u.name}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-black text-xs uppercase tracking-[0.2em] mb-6">
              Newsletter
            </h4>
            <p className="text-sm text-slate-400 mb-4">
              Stay updated with new quizzes and features.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
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

// SUB-COMPONENTS
const FiBrain = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
  </svg>
);

const FeatureCard = ({ icon, title, desc }) => (
  <div className="group p-8 bg-white dark:bg-gray-900 border border-slate-100 dark:border-gray-800 rounded-[2.5rem] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-center">
    <div className="size-14 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
      {icon}
    </div>
    <h3 className="text-lg font-black mb-3">{title}</h3>
    <p className="text-sm text-slate-400 font-medium leading-relaxed">{desc}</p>
  </div>
);

const Step = ({ number, title, desc }) => (
  <div className="flex gap-8 items-start">
    <span className="text-4xl font-black text-slate-200 dark:text-gray-800 leading-none shrink-0">
      {number}
    </span>
    <div>
      <h3 className="text-xl font-black mb-2">{title}</h3>
      <p className="text-slate-500 dark:text-gray-400 font-medium">{desc}</p>
    </div>
  </div>
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

export default LandingPage;
