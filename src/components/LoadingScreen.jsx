import Logo from "../images/Logo";

/**
 * LoadingScreen - Reusable loading animation component
 * Used across the app for consistent loading states
 */
const LoadingScreen = ({ text = "Loading" }) => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-[#F8FAFC] dark:bg-[#0F172A]">
      {/* Bar animation */}
      <div className="flex gap-1.5">
        <div className="h-8 w-1.5 animate-[loading_1s_ease-in-out_infinite] rounded-full bg-blue-600"></div>
        <div className="h-8 w-1.5 animate-[loading_1s_ease-in-out_0.1s_infinite] rounded-full bg-blue-500"></div>
        <div className="h-8 w-1.5 animate-[loading_1s_ease-in-out_0.2s_infinite] rounded-full bg-blue-400"></div>
      </div>
      <h2 className="mt-6 text-sm font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase">
        {text}
      </h2>

      {/* Bottom branding */}
      <div className="absolute bottom-10 flex flex-col items-center gap-1 opacity-30">
        <Logo className="h-6 w-auto" />
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white">
          Quiz Bolt⚡
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
