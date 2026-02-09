import { InlineMath } from "react-katex";

const looksLikeMath = (text) => {
  // More comprehensive pattern that detects common LaTeX/math patterns
  return /\\[a-zA-Z]+|\\[\\\{\}\[\]\(\)]|[=^_+\-*/<>|]|\\frac|\\sum|\\pi|\\sqrt|\\sin|\\cos|\\tan|\\begin|\\end/.test(text);
};

export const RenderMathText = ({ text, courseId }) => {
  if (typeof text !== "string") return text;

  if (
    typeof courseId !== "string" ||
    !courseId.toUpperCase().startsWith("MTH101") ||
    !courseId.toUpperCase().startsWith("PHY101")
  ) {
    return <span>{text}</span>;
  }

  // Split by space, but keep punctuation attached
  const parts = text.split(" ");

  return (
    <>
      {parts.map((part, i) => {
        const isMath = looksLikeMath(part);

        return (
          <span key={i}>
            {isMath ? (
              <InlineMath math={part} />
            ) : (
              <span>{part}</span>
            )}
            {i < parts.length - 1 ? " " : ""}
          </span>
        );
      })}
    </>
  );
};