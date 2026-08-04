import React from "react";

const LegalSection = ({
  id,
  number,
  title,
  paragraphs = [],
  bullets = [],
  paragraphsAfter = [],
}) => {
  return (
    <section
      id={id}
      className="scroll-mt-28 md:scroll-mt-32 py-8 border-b border-slate-100 dark:border-gray-800 last:border-b-0"
    >
      <div className="flex items-start gap-5">
        <div
          aria-hidden="true"
          className="shrink-0 size-10 md:size-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-black text-sm md:text-base flex items-center justify-center border border-blue-100 dark:border-blue-800/50"
        >
          {number}
        </div>
        <div className="flex-1 min-w-0 space-y-5">
          <h2 className="text-xl md:text-2xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
            {title}
          </h2>

          {paragraphs.map((p, i) => (
            <p
              key={`p-${i}`}
              className="text-sm md:text-base text-slate-600 dark:text-gray-300 font-medium leading-relaxed"
            >
              {p}
            </p>
          ))}

          {bullets.length > 0 && (
            <ul className="space-y-3 pl-1">
              {bullets.map((b, i) => (
                <li
                  key={`b-${i}`}
                  className="flex items-start gap-3 text-sm md:text-base text-slate-600 dark:text-gray-300 font-medium leading-relaxed"
                >
                  <span
                    aria-hidden="true"
                    className="shrink-0 size-2 mt-2.5 rounded-full bg-blue-500"
                  />
                  <span className="flex-1">{b}</span>
                </li>
              ))}
            </ul>
          )}

          {paragraphsAfter.map((p, i) => (
            <p
              key={`pa-${i}`}
              className="text-sm md:text-base text-slate-600 dark:text-gray-300 font-medium leading-relaxed"
            >
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LegalSection;
