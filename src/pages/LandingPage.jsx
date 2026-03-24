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
} from "react-icons/fa";
import Logo from "../images/Logo";
import { SiX, SiTiktok } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";
import { supabase } from "../supabaseClient";

const LandingPage = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  const [stats, setStats] = useState([
    { label: "Quizzes Taken", value: "..." },
    { label: "Active Scholars", value: "..." },
    { label: "Course Modules", value: "..." },
  ]);

  const fetchStats = useCallback(async () => {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    try {
      // Fetch all counts in parallel
      const [coursesRes, usersRes, quizzesRes] = await Promise.all([
        fetch(`${BASE_URL}/courses/count`).then((res) => res.json()),
        fetch(`${BASE_URL}/api/stats/users/count`).then((res) => res.json()),
        fetch(`${BASE_URL}/api/stats/quizzes/count`).then((res) => res.json()),
      ]);

      // Format numbers with a "+" and commas (e.g., 1,250+)
      const formatValue = (num) => `${num.toLocaleString()}+`;

      setStats([
        {
          label: "Quizzes Taken",
          value: formatValue(quizzesRes.count || 0),
        },
        {
          label: "Active Scholars",
          value: formatValue(usersRes.count || 0),
        },
        {
          label: "Course Modules",
          value: formatValue(coursesRes.count || 0),
        },
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
     // 1. Fetch all unique, non-retake attempts
     const { data: attemptsData, error: attemptsError } = await supabase
       .from("exam_attempts")
       .select("user_id, score, total_questions, date_taken")
       .eq("is_retake", false);

     if (attemptsError) throw attemptsError;

     // 2. Group by User to find their All-Time Best
     const userBestMap = new Map();
     attemptsData.forEach((att) => {
       const percent = Math.round((att.score / att.total_questions) * 100);
       const existing = userBestMap.get(att.user_id);

       if (!existing || percent > existing.score) {
         userBestMap.set(att.user_id, {
           score: percent,
           date: att.date_taken,
         });
       }
     });

     // 3. Fetch Profiles for the top users
     const topUserIds = Array.from(userBestMap.keys());
     const { data: profilesData } = await supabase
       .from("profiles")
       .select("id, full_name, user_name")
       .in("id", topUserIds);

     const profileMap = {};
     profilesData?.forEach(
       (p) => (profileMap[p.id] = p.user_name || p.full_name),
     );

     // 4. Sort and Format to match your Landing Page Table
     const formattedPlayers = Array.from(userBestMap.entries())
       .map(([userId, data]) => ({
         name: profileMap[userId] || "Scholar",
         score: data.score,
         // Format date to "Mar 22" style
         date: new Date(data.date).toLocaleDateString("en-US", {
           month: "short",
           day: "numeric",
         }),
       }))
       .sort((a, b) => b.score - a.score) // Sort by highest score
       .slice(0, 5) // Get top 5
       .map((player, index) => ({
         rank: index + 1,
         ...player,
       }));

     setTopPlayers(formattedPlayers);
   } catch (err) {
     console.error("Error fetching landing leaderboard:", err);
   }
 }, []);

 useEffect(() => {
   fetchGlobalLeaderboard();
 }, [fetchGlobalLeaderboard]);

  const testimonials = [
    {
      name: "Jane D.",
      comment: "QuizBolt keeps me sharp and motivated every day!",
      color: "bg-blue-600",
    },
    {
      name: "Mark L.",
      comment:
        "I love competing with friends and seeing my progress over time.",
      color: "bg-slate-900",
    },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 text-slate-900 dark:text-gray-100 selection:bg-blue-100 dark:selection:bg-blue-900/30 transition-colors duration-300">
      {/* --- NAVIGATION --- */}
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
            <a onClick={() => navigate("/about")} className="hover:text-blue-600 cursor-pointer">
              About
            </a>
            <a href="#features" className="hover:text-blue-600">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-blue-600">
              How it works
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

      {/* --- HERO SECTION --- */}
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
              on fun, interactive quizzes designed for university mastery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() => navigate("/login")}
                className="flex items-center justify-center gap-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-4 rounded-2xl font-black text-lg hover:opacity-90 transition-all active:scale-95"
              >
                <FcGoogle className="text-lgl" /> Sign in with Google
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
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 blur-3xl rounded-full" />
            <div className="relative bg-white dark:bg-gray-900 border border-slate-100 dark:border-gray-800 p-4 rounded-[2.5rem] shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
              <img
                src="https://images.unsplash.com/photo-1610484826967-09c5720778c7?q=80&w=1000&auto=format&fit=crop"
                alt="Quiz Preview"
                className="rounded-[2rem] w-full object-cover aspect-[4/5]"
              />
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-gray-700 animate-bounce-slow">
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

      {/* --- FEATURES SECTION --- */}
      <section id="features" className="py-24 bg-white dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-black mb-16 tracking-tight">
            Why Choose QuizBolt ⚡️?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<FaBolt />}
              title="Interactive Quizzes"
              desc="Play quizzes designed to challenge your brain and keep you engaged."
            />
            <FeatureCard
              icon={<FaChartLine />}
              title="Track Progress"
              desc="Detailed results after every quiz to see exactly how far you've come."
            />
            <FeatureCard
              icon={<FaTrophy />}
              title="Leaderboards"
              desc="Compete with global users and earn your spot at the top."
            />
            <FeatureCard
              icon={<FaUserCheck />}
              title="Easy Access"
              desc="One-tap Google login. Jump straight into learning immediately."
            />
          </div>
        </div>
      </section>

      {/* --- MINIMAL BRIDGE ABOUT SECTION --- */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative group overflow-hidden bg-white dark:bg-gray-900 border border-slate-100 dark:border-gray-800 p-8 md:p-12 rounded-[3rem] shadow-sm hover:shadow-md transition-all duration-500">
            {/* Decorative Glow */}
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
                  We’re bridging the gap between lecture halls and digital
                  mastery. Built by students who understand the hustle of CBT
                  exams, QuizBolt is designed to make your study time
                  competitive, interactive, and effective.
                </p>
              </div>

              <button
                onClick={() => navigate("/about")}
                className="group/btn flex items-center gap-3 bg-slate-50 dark:bg-gray-800 hover:bg-blue-600 hover:text-white px-8 py-5 rounded-2xl font-black text-sm transition-all active:scale-95 whitespace-nowrap"
              >
                Learn Our Story
                <span className="group-hover/btn:translate-x-1 transition-transform">
                  &rarr;
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS --- */}
      <section id="how-it-works" className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center md:text-left">
          <h2 className="text-3xl font-black text-center mb-16">
            How It Works
          </h2>
          <div className="space-y-12">
            <Step
              number="01"
              title="Sign Up or Login"
              desc="Use your Google account to secure your progress instantly."
            />
            <Step
              number="02"
              title="Pick a Quiz"
              desc="Browse university-standard courses or general categories."
            />
            <Step
              number="03"
              title="Answer & Submit"
              desc="Complete the challenge and get instant, detailed feedback."
            />
            <Step
              number="04"
              title="Track & Compete"
              desc="Earn points, climb the ranks, and unlock premium features."
            />
          </div>
        </div>
      </section>

      {/* --- NUMBERS SECTION --- */}
      <section className="py-16 bg-blue-600 dark:bg-blue-700">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12 text-center">
          {stats.map((s, idx) => (
            <div key={idx} className="space-y-2">
              <p className="text-4xl font-black text-white">{s.value}</p>
              <p className="text-blue-100 font-bold uppercase tracking-widest text-xs">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* --- LEADERBOARD SECTION --- */}
      <section id="leaderboard" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black mb-4">Top Players</h2>
            <p className="text-slate-500 dark:text-gray-400 font-medium">
              See who’s dominating the platform and aim for the top!
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-gray-800 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-gray-800/50">
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Rank
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Username
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Score
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-gray-800">
                {topPlayers.map((player) => (
                  <tr
                    key={player.rank}
                    className="hover:bg-blue-50/30 dark:hover:bg-blue-900/5 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span
                        className={`size-8 flex items-center justify-center rounded-full font-black text-sm ${player.rank === 1 ? "bg-amber-100 text-amber-600" : player.rank === 2 ? "bg-slate-100 text-slate-600" : player.rank === 3 ? "bg-orange-100 text-orange-600" : "text-slate-400"}`}
                      >
                        {player.rank}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold">{player.name}</td>
                    <td className="px-6 py-4 font-black text-blue-600 dark:text-blue-400">
                      {player.score.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-400 font-medium">
                      {player.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS SECTION --- */}
      <section className="py-24 bg-slate-50 dark:bg-gray-950 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-16">
            What Our Users Say
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-900 p-10 rounded-[2.5rem] border border-slate-100 dark:border-gray-800 shadow-sm relative"
              >
                <div className="absolute -top-4 left-10 size-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl">
                  “
                </div>
                <p className="text-lg font-medium text-slate-600 dark:text-gray-300 italic mb-6">
                  "{t.comment}"
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className={`size-10 ${t.color} rounded-full flex items-center justify-center text-white font-black text-xs`}
                  >
                    {t.name[0]}
                  </div>
                  <p className="font-black text-sm uppercase tracking-widest">
                    {t.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CALL TO ACTION --- */}
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
            Join thousands of users challenging themselves every day.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 text-white px-10 py-5 rounded-[2rem] font-black text-xl shadow-xl shadow-blue-500/20 transition-transform active:scale-95"
          >
            Sign Up Now
          </button>
        </div>
      </section>

      {/* --- FOOTER --- */}
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
              The ultimate academic companion for university students looking to
              master their courses through interactive CBT preparation.
            </p>
            <div className="flex gap-4">
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
          <div className="md:col-span-2">
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
                className="flex-1 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 px-6 py-4 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-4 rounded-2xl font-black text-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="group p-8 bg-white dark:bg-gray-900 border border-slate-100 dark:border-gray-800 rounded-[2.5rem] hover:shadow-2xl transition-all duration-300 text-center">
    <div className="size-14 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-6 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-lg font-black mb-3">{title}</h3>
    <p className="text-sm text-slate-400 font-medium leading-relaxed">{desc}</p>
  </div>
);

const Step = ({ number, title, desc }) => (
  <div className="flex gap-8 items-start">
    <span className="text-4xl font-black text-slate-200 dark:text-gray-800 leading-none">
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
    className={`size-10 bg-slate-100 dark:bg-gray-800 rounded-xl flex items-center justify-center text-slate-600 dark:text-gray-400 ${color} hover:text-white transition-all`}
  >
    {icon}
  </a>
);

export default LandingPage;
