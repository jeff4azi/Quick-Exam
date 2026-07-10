import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiCheckCircle, FiSend } from "react-icons/fi";
import { supabase } from "../supabaseClient";
import useDocumentTitle from "../hooks/useDocumentTitle";

const MAX_LENGTH = 500;

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
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
        return;
      }

      const { error: insertError } = await supabase.from("reviews").insert([
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
      <div className="min-h-[100dvh] bg-[#F8FAFC] dark:bg-[#0F172A] text-slate-900 dark:text-slate-100 flex flex-col items-center justify-center px-6 py-12 transition-colors duration-500">
        <div className="max-w-sm w-full text-center">
          <div className="mx-auto mb-6 size-16 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
            <FiCheckCircle className="text-3xl text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-xl font-black tracking-tight mb-2">Thank you</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
            Your review has been submitted and will be visible once it's
            approved.
          </p>
          <button
            onClick={() => navigate("/")}
            className="w-full py-3.5 rounded-2xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-700 transition-all active:scale-95"
          >
            Back to home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-[#F8FAFC] dark:bg-[#0F172A] text-slate-900 dark:text-slate-100 transition-colors duration-500">
      <header className="sticky top-0 z-40 border-b border-slate-200/70 dark:border-slate-800 bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-5 py-4 lg:px-8">
          <button
            type="button"
            onClick={() =>
              window.history.length > 1 ? navigate(-1) : navigate("/")
            }
            className="size-11 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 active:scale-95 transition-transform"
            aria-label="Go back"
          >
            <FiArrowLeft size={20} />
          </button>
          <div className="text-center">
            <h1 className="text-lg font-black tracking-tight">
              Submit a Review
            </h1>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
              Share your experience
            </p>
          </div>
          <div className="size-11" />
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-5 pb-16 pt-6 lg:px-8">
        {/* Your info */}
        <section className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden mb-6">
          <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
              Your information
            </h2>
          </div>
          <div className="grid grid-cols-3 divide-x divide-slate-100 dark:divide-slate-800">
            <div className="px-5 py-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
                Name
              </p>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">
                {userProfile?.full_name || userProfile?.user_name || "Scholar"}
              </p>
            </div>
            <div className="px-5 py-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
                University
              </p>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">
                {userProfile?.university || "Not set"}
              </p>
            </div>
            <div className="px-5 py-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
                Year
              </p>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                Year {userProfile?.year || "1"}
              </p>
            </div>
          </div>
        </section>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <section className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden mb-4">
            <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                Your review
              </h2>
              <span
                className={`text-[11px] font-bold ${
                  reviewText.length > MAX_LENGTH
                    ? "text-red-500"
                    : "text-slate-300 dark:text-slate-600"
                }`}
              >
                {reviewText.length}/{MAX_LENGTH}
              </span>
            </div>
            <div className="p-5">
              <textarea
                value={reviewText}
                onChange={(e) =>
                  setReviewText(e.target.value.slice(0, MAX_LENGTH))
                }
                placeholder="How has QuizBolt helped you study, revise, or perform better?"
                rows={6}
                className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-[#F8FAFC] dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-medium p-4 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-colors disabled:opacity-70"
                disabled={isSubmitting}
              />
            </div>
          </section>

          {error && (
            <div className="mb-4 p-4 rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
              <p className="text-sm text-red-700 dark:text-red-400 font-medium">
                {error}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || !reviewText.trim()}
            className="w-full py-3.5 rounded-2xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              "Submitting..."
            ) : (
              <>
                <FiSend size={15} />
                Submit review
              </>
            )}
          </button>
        </form>
      </main>
    </div>
  );
};

export default SubmitReview;
