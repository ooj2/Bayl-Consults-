import React from 'react';

const Logo: React.FC<{ variant?: 'light' | 'dark' }> = ({ variant = 'light' }) => {
  const textColor = variant === 'light' ? 'text-white' : 'text-slate-900';
  const subTextColor = variant === 'light' ? 'text-zinc-500' : 'text-slate-400';
  const borderColor = variant === 'light' ? 'bg-white' : 'bg-slate-900';

  return (
    <div className="flex flex-col select-none group">
      <div className="flex items-baseline gap-4">
        {/* Main Text with Underline */}
        <div className="flex flex-col">
          <span className={`text-4xl font-bold tracking-[0.15em] ${textColor} uppercase leading-none transition-transform duration-500 group-hover:scale-x-[1.02]`}>
            Bayl
          </span>
          <div className={`h-[3px] w-full mt-2 ${borderColor} transition-all duration-500 group-hover:h-[4px]`}></div>
        </div>
        
        {/* Sub Text */}
        <span className={`text-[10px] font-bold tracking-[0.6em] uppercase ${subTextColor} mb-1`}>
          Consults
        </span>
      </div>
    </div>
  );
};

export default Logo;