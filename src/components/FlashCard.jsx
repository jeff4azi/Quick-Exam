import { useState } from "react";
import { RenderMathText } from "../utils/RenderMathText";

/**
 * A single flip card.
 * Front: question
 * Back: answer / modal_answer (theory) or correct option (objective)
 */
const FlashCard = ({ question, courseId, isFlipped, onFlip }) => {
  const isTheory = question?.type === "theory" || Array.isArray(question?.keywords);

  const answer = isTheory
    ? (question?.modal_answer || question?.correct || "No answer provided")
    : question?.correct || "No answer provided";

  return (
    <div
      className="w-full cursor-pointer"
      style={{ perspective: "1200px" }}
      onClick={onFlip}
    >
      <div
        className="relative w-full transition-transform duration-500"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          minHeight: "320px",
        }}
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-xl shadow-slate-200/60 dark:shadow-none p-8 flex flex-col"
          style={{ backfaceVisibility: "hidden" }}
        >
          <span className="text-[10px] font-black uppercase tracking-widest text-violet-500 mb-4">
            Question
          </span>
          <div className="flex-1 flex items-center justify-center">
            <p className="text-center text-lg font-bold text-slate-800 dark:text-slate-100 leading-relaxed">
              <RenderMathText text={question?.question ?? ""} courseId={courseId} />
            </p>
          </div>
          <p className="text-center text-xs text-slate-400 mt-4">Tap to reveal answer</p>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 rounded-2xl bg-violet-50 dark:bg-violet-900/20 border border-violet-100 dark:border-violet-800 shadow-xl shadow-violet-100/60 dark:shadow-none p-8 flex flex-col"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <span className="text-[10px] font-black uppercase tracking-widest text-violet-500 mb-4">
            Answer
          </span>
          <div className="flex-1 flex items-center justify-center">
            <p className="text-center text-lg font-bold text-slate-800 dark:text-slate-100 leading-relaxed">
              <RenderMathText text={answer} courseId={courseId} />
            </p>
          </div>

          <p className="text-center text-xs text-slate-400 mt-4">Tap to flip back</p>
        </div>
      </div>
    </div>
  );
};

export default FlashCard;
