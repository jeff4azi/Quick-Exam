import React, { useId } from "react";
import { FiChevronDown } from "react-icons/fi";

const AccordionItem = ({
  question,
  answer,
  isOpen,
  onClick,
  style = {},
}) => {
  const panelId = useId();
  const buttonId = useId();

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      style={style}
      className={`group rounded-2xl border transition-all duration-300 ${
        isOpen
          ? "bg-white dark:bg-gray-900 border-blue-100 dark:border-blue-800/50 shadow-lg shadow-blue-50/50 dark:shadow-none"
          : "bg-white dark:bg-gray-900/50 border-slate-100 dark:border-gray-800 hover:border-slate-200 dark:hover:border-gray-700"
      }`}
    >
      <button
        id={buttonId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        className="w-full flex items-center justify-between gap-6 px-6 py-5 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-950 rounded-2xl"
      >
        <h3
          className={`font-black text-sm md:text-base transition-colors duration-300 ${
            isOpen
              ? "text-blue-600 dark:text-blue-400"
              : "text-slate-800 dark:text-slate-100 group-hover:text-slate-900 dark:group-hover:text-white"
          }`}
        >
          {question}
        </h3>
        <div
          className={`size-8 shrink-0 rounded-xl flex items-center justify-center transition-all duration-300 ${
            isOpen
              ? "bg-blue-600 text-white rotate-180"
              : "bg-slate-100 dark:bg-gray-800 text-slate-400 group-hover:bg-slate-200 dark:group-hover:bg-gray-700"
          }`}
        >
          <FiChevronDown className="text-base" />
        </div>
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0 pointer-events-none"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-6 -mt-2">
            <p className="text-sm md:text-base text-slate-500 dark:text-gray-400 font-medium leading-relaxed">
              {answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Accordion = ({
  items,
  allowMultiple = false,
  className = "",
  gapClass = "gap-3",
}) => {
  const [openIds, setOpenIds] = React.useState(new Set());

  const toggle = (id) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (allowMultiple) {
        if (next.has(id)) next.delete(id);
        else next.add(id);
      } else {
        if (next.has(id)) next.clear();
        else {
          next.clear();
          next.add(id);
        }
      }
      return next;
    });
  };

  return (
    <div className={`flex flex-col ${gapClass} ${className}`}>
      {items.map((item, idx) => (
        <AccordionItem
          key={item.id ?? idx}
          question={item.question}
          answer={item.answer}
          isOpen={openIds.has(item.id ?? idx)}
          onClick={() => toggle(item.id ?? idx)}
        />
      ))}
    </div>
  );
};

export default Accordion;
