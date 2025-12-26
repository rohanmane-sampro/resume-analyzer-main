import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { Sun, Moon } from "lucide-react";

const Switch = () => {
  const { isDark } = useContext(ThemeContext);

  return (
    <div className={`
      relative w-14 h-8 rounded-full p-1 transition-colors duration-300 ease-in-out cursor-pointer shadow-inner
      ${isDark ? 'bg-slate-700' : 'bg-blue-100'}
    `}>
      {/* Moving Circle */}
      <div className={`
        absolute top-1 w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ease-spring
        flex items-center justify-center
        ${isDark ? 'translate-x-6 bg-slate-900' : 'translate-x-0 bg-white'}
      `}>
        {isDark ? (
          <Moon size={14} className="text-yellow-400" fill="currentColor" />
        ) : (
          <Sun size={14} className="text-orange-500" fill="currentColor" />
        )}
      </div>
    </div>
  );
};

export default Switch;
