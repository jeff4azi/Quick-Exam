import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronLeft, FiCheckCircle } from "react-icons/fi";
import { supabase } from "../supabaseClient";
import useDocumentTitle from "../hooks/useDocumentTitle";

const SubmitReview = ({ userProfile }) => {
  useDocumentTitle("Submit a Review | QuizBolt");
  const navigate = useNavigate();
  const [reviewText, setReviewText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reviewText.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
        return;
      }

      const { error: insertError } = await supabase
        .from("reviews")
        .insert([
          {
            user_id: session.user.id,
            review_text: reviewText.trim(),
          },
        ]);

      if (insertError) throw insertError;
      setIsSuccess(true);
    } catch (err) {
      console.error("Error submitting review:", err);
      setError("Failed to submit your review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-[100dvh] bg-gray-50 dark:bg-slate-950 flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-md w-full text-center">
          <div className="mx-auto mb-6 w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
            <FiCheckCircle className="text-4xl text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-3">
            Thank You!
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
            Your review has been submitted and will be reviewed for approval soon.
          </p>
          <button
            onClick={() => navigate("/")}
            className="w-full py-4 rounded-2xl font-black text-white bg-blue-600 hover:bg-blue-700 transition-all active:scale-95"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-gray-50 dark:bg-slate-950 flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gray-50/90 dark:bg-slate-950/90 backdrop-blur-md px-6 pt-6 pb-4 border-b border-gray-100 dark:border-slate-800">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-700 shadow-sm active:scale-90 transition-all"
          >
            <FiChevronLeft className="size-5 text-slate-600 dark:text-slate-300" />
          </button>
          <div>
            <h1 className="text-xl font-black text-slate-900 dark:text-white">
              Submit a Review
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Share your experience with QuizBolt
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 px-6 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* User Info Card */}
          <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 shadow-sm border border-gray-100 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">
              Your Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1">
                  Name
                </p>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  {userProfile?.user_name || userProfile?.full_name || "Scholar"}
                </p>
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1">
                  University
                </p>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  {userProfile?.university || "Not set"}
                </p>
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1">
                  Year
                </p>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Year {userProfile?.year || "1"}
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 shadow-sm border border-gray-100 dark:border-slate-800">
              <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3">
                Your Review
              </label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Tell us what you think about QuizBolt..."
                rows={6}
                className="w-full rounded-2xl border-2 border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-medium p-4 text-sm resize-none focus:outline-none focus:border-blue-500 transition-colors disabled:opacity-70"
                disabled={isSubmitting}
              />
            </div>

            {error && (
              <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                <p className="text-sm text-red-700 dark:text-red-400 font-medium">
                  {error}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || !reviewText.trim()}
              className="w-full py-4 rounded-2xl font-black text-white bg-blue-600 hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100"
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubmitReview;
