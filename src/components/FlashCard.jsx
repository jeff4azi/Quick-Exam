import { RenderMathText } from "../utils/RenderMathText";

const splitBlanks = (text) => text.split(/_{2,}/g);

/**
 * A single flip card.
 * Front: question
 * Back: answer / modal_answer (theory) / filled-in sentence (fib)
 */
const FlashCard = ({ question, courseId, isFlipped, onFlip }) => {
  const isTheory = question?.type === "theory" || Array.isArray(question?.keywords);
  const isFib = question?.type === "fib";

  const answer = isTheory
    ? (question?.model_answer || question?.correct || "No answer provided")
    : question?.correct || "No answer provided";

  // For FIB: build the filled-in sentence using the first accepted value per blank
  const fibFilledSentence = isFib ? (() => {
    const parts = splitBlanks(question.question);
    const groups = Array.isArray(question.answers) ? question.answers : [];
    return parts.map((part, i) => (
      <span key={i}>
        {part}
        {i < parts.length - 1 && (
          <span className="font-black text-violet-700 dark:text-violet-300 border-b-2 border-violet-400 px-1 mx-0.5">
            {groups[i]?.[0] ?? "___"}
          </span>
        )}
      </span>
    ));
  })() : null;

  // For FIB front: show blanks as underlined empty spans
  const fibQuestionWithBlanks = isFib ? (() => {
    const parts = splitBlanks(question.question);
    return parts.map((part, i) => (
      <span key={i}>
        {part}
        {i < parts.length - 1 && (
          <span className="inline-block border-b-2 border-slate-400 dark:border-slate-500 min-w-[3rem] mx-1" />
        )}
      </span>
    ));
  })() : null;

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
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-violet-500">
              Question
            </span>
            {isFib && (
              <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                Fill in the Blank
              </span>
            )}
          </div>
          <div className="flex-1 flex items-center justify-center">
            <p className="text-center text-lg font-bold text-slate-800 dark:text-slate-100 leading-relaxed">
              {isFib
                ? fibQuestionWithBlanks
                : <RenderMathText text={question?.question ?? ""} courseId={courseId} />
              }
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
              {isFib
                ? fibFilledSentence
                : <RenderMathText text={answer} courseId={courseId} />
              }
            </p>
          </div>
          <p className="text-center text-xs text-slate-400 mt-4">Tap to flip back</p>
        </div>
      </div>
    </div>
  );
};

export default FlashCard;
