import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../images/Logo";
import { FiBookOpen, FiNavigation, FiCalendar, FiCheckCircle } from "react-icons/fi";
import { supabase } from "../supabaseClient"; // Import your supabase client

const OnboardingScreen = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    college: "",
    department: "",
    year: "",
  });

  const collegeSuggestions = ["COSIT", "COVTED", "COSPED", "COHUM", "COSMAS", "COAHM"];
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Ensure user exists
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        throw new Error("No authenticated user found. Please sign in again.");
      }

      // 2. Save onboarding data + mark complete
      const { error: upsertError } = await supabase
        .from("profiles")
        .upsert({
          id: user.id,
          college: formData.college,
          department: formData.department,
          year: parseInt(formData.year, 10) || null,
          onboarding_complete: true,
          is_premium: false,
          updated_at: new Date().toISOString(),
        });

      if (upsertError) throw upsertError;

      // 3. Let auth listener catch up (small but important)
      await supabase.auth.getSession();

      // 4. Exit onboarding permanently
      navigate("/login", { replace: true });

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center bg-gray-50 dark:bg-slate-900 transition-colors duration-500 p-6">

      <div className="w-full max-w-sm animate-in fade-in slide-in-from-bottom-4 duration-700">

        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <div className="mb-6">
            <Logo className="w-36 h-36" />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-1">
            Almost there!
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Help us personalize your learning path.
          </p>
        </div>

        {/* Error Message Display */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-2xl text-red-600 dark:text-red-400 text-sm font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 mt-6">

          {/* College with Autocomplete Logic */}
          <div className="relative group">
            <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-4 mb-1 block">
              College
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiNavigation className="text-xl text-slate-400 group-focus-within:text-blue-600 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search your college..."
                value={formData.college}
                onChange={(e) => {
                  setFormData({ ...formData, college: e.target.value });
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all shadow-sm"
                required
              />
            </div>

            {showSuggestions && formData.college.length > 1 && (
              <div className="absolute z-10 w-full mt-2 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden">
                {collegeSuggestions.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, college: item });
                      setShowSuggestions(false);
                    }}
                    className="w-full text-left px-5 py-3 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Department / Course */}
          <div className="group">
            <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-4 mb-1 block">
              Department
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiBookOpen className="text-xl text-slate-400 group-focus-within:text-blue-600 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="e.g. Computer Science"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all shadow-sm"
                required
              />
            </div>
          </div>

          {/* Year of Study */}
          <div className="group">
            <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-4 mb-1 block">
              Year of Study
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiCalendar className="text-xl text-slate-400 group-focus-within:text-blue-600 transition-colors" />
              </div>
              <select
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all shadow-sm appearance-none"
                required
              >
                <option value="" disabled>Select Level</option>
                <option value="1">Year 1 (Fresher)</option>
                <option value="2">Year 2 (Sophomore)</option>
                <option value="3">Year 3 (Junior)</option>
                <option value="4">Year 4 (Senior)</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-4 bg-blue-600 py-4 rounded-2xl font-bold text-white text-lg shadow-lg shadow-blue-200 dark:shadow-none transition-all flex items-center justify-center gap-2 ${loading
                ? "opacity-70 cursor-not-allowed"
                : "hover:bg-blue-700 hover:-translate-y-1 active:scale-95"
              }`}
          >
            <span>{loading ? "Saving..." : "Complete Setup"}</span>
            {!loading && <FiCheckCircle className="text-xl" />}
          </button>

        </form>
      </div>
    </div>
  );
};

export default OnboardingScreen;