import React from 'react';

interface MockupProps {
  type: 'tshirt' | 'mug' | 'journal' | 'tote' | 'tumbler' | 'wallart';
  baseColor: string;
  graphicId: string;
  text?: string;
  textColor?: string;
  fontFamily?: string;
  className?: string;
}

export const ProductMockup: React.FC<MockupProps> = ({
  type,
  baseColor,
  graphicId,
  text = '',
  textColor = '#ffffff',
  fontFamily = 'font-sans',
  className = '',
}) => {
  // Translate design graphic into inline SVG overlays
  const renderGraphicContent = () => {
    switch (graphicId) {
      case 'retro-sunset':
        return (
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="retroGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="40%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#eab308" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="40" fill="url(#retroGrad)" />
            {/* Retro horizon cut line overlays */}
            <rect x="10" y="52" width="80" height="2" fill="#1e293b" opacity="0.3" />
            <rect x="10" y="58" width="80" height="3" fill="#1e293b" opacity="0.4" />
            <rect x="10" y="65" width="80" height="4" fill="#1e293b" opacity="0.5" />
            <rect x="10" y="73" width="80" height="6" fill="#1e293b" opacity="0.6" />
            <rect x="10" y="83" width="80" height="8" fill="#1e293b" opacity="0.7" />
          </svg>
        );
      case 'cute-flower':
        return (
          <svg className="w-full h-full animate-spin-slow" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Outer Petals */}
            <circle cx="50" cy="28" r="14" fill="#f472b6" />
            <circle cx="50" cy="72" r="14" fill="#f472b6" />
            <circle cx="28" cy="50" r="14" fill="#f2f" />
            <circle cx="72" cy="50" r="14" fill="#f2f" />
            <circle cx="34" cy="34" r="14" fill="#fb7185" />
            <circle cx="66" cy="66" r="14" fill="#fb7185" />
            <circle cx="34" cy="66" r="14" fill="#c084fc" />
            <circle cx="66" cy="34" r="14" fill="#c084fc" />
            {/* Center pistil */}
            <circle cx="50" cy="50" r="15" fill="#facc15" stroke="#f59e0b" strokeWidth="2" />
          </svg>
        );
      case 'lightning':
        return (
          <svg className="w-full h-full filter drop-shadow-[0_4px_8px_rgba(234,179,8,0.5)]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M58 8L28 54H48L38 92L72 42H50L58 8Z"
              fill="#facc15"
              stroke="#fbbf24"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        );
      case 'waves':
        return (
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
            </defs>
            <path d="M10 40 C 30 25, 40 45, 60 30 C 80 15, 90 35, 90 35 L 90 85 L 10 85 Z" fill="url(#waveGrad)" opacity="0.6" />
            <path d="M10 48 C 30 35, 40 55, 60 40 C 80 25, 90 45, 90 45 L 90 85 L 10 85 Z" fill="url(#waveGrad)" opacity="0.8" />
            <path d="M10 57 C 25 45, 45 61, 65 50 C 75 42, 90 55, 90 55 L 90 85 L 10 85 Z" fill="url(#waveGrad)" />
          </svg>
        );
      case 'cosmic-star':
        return (
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Large central sparkly diamond star */}
            <path d="M50 15 L55 45 L85 50 L55 55 L50 85 L45 55 L15 50 L45 45 Z" fill="#67e8f9" />
            {/* Small offset stars */}
            <path d="M22 22 L24 30 L32 32 L24 34 L22 42 L20 34 L12 32 L20 30 Z" fill="#c084fc" opacity="0.8" />
            <path d="M78 72 L79 77 L84 78 L79 79 L78 84 L77 79 L72 78 L77 77 Z" fill="#f472b6" opacity="0.9" />
            <circle cx="75" cy="25" r="3" fill="#ffffff" />
            <circle cx="28" cy="74" r="2.5" fill="#facc15" />
          </svg>
        );
      case 'heart':
        return (
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
            <path
              d="M12 35 C 12 18, 38 10, 50 30 C 62 10, 88 18, 88 35 C 88 60, 50 85, 50 85 C 50 85, 12 60, 12 35 Z"
              fill="url(#heartGrad)"
            />
            {/* Shiny highlight reflection */}
            <path d="M22 30 C 22 24, 30 20, 38 22" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
          </svg>
        );
      case 'smile':
        return (
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Face */}
            <circle cx="50" cy="50" r="40" fill="#facc15" stroke="#d97706" strokeWidth="3" />
            {/* Left Eye */}
            <ellipse cx="37" cy="40" rx="4" ry="7" fill="#1e293b" />
            {/* Right Eye */}
            <ellipse cx="63" cy="40" rx="4" ry="7" fill="#1e293b" />
            {/* Smile path */}
            <path d="M28 55 C 32 72, 68 72, 72 55" stroke="#1e293b" strokeWidth="4.5" strokeLinecap="round" fill="none" />
            {/* Rosy cheeks */}
            <circle cx="26" cy="52" r="5" fill="#ec4899" opacity="0.5" />
            <circle cx="74" cy="52" r="5" fill="#ec4899" opacity="0.5" />
          </svg>
        );
      default:
        return null;
    }
  };

  // Font class dynamic map
  const getFontFamilyClass = () => {
    switch (fontFamily) {
      case 'font-mono':
        return 'font-mono tracking-wider uppercase';
      case 'font-serif':
        return 'font-serif italic';
      case 'font-cursive':
        return 'font-cursive tracking-wide leading-tight font-extrabold';
      default:
        return 'font-sans font-bold tracking-tight';
    }
  };

  // Render product mockups based on selection
  const renderProductBase = () => {
    switch (type) {
      case 'tshirt':
        return (
          <div className="relative w-full h-full flex items-center justify-center p-4">
            {/* T-Shirt SVG mask */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
              <path
                d="M 50,4 Q 35,4 32,10 L 15,14 Q 10,15 11,22 L 18,34 Q 21,37 25,32 L 26,26 L 27,92 Q 28,96 32,96 L 68,96 Q 72,96 73,92 L 74,26 L 75,32 Q 79,37 82,34 L 89,22 Q 90,15 85,14 L 68,10 Q 65,4 50,4 Z"
                fill={baseColor}
                stroke="#d1d5db"
                strokeWidth="0.5"
                filter="drop-shadow(0 10px 15px rgba(0,0,0,0.15))"
              />
              {/* Collar shadow layer */}
              <path d="M 32,10 Q 50,18 68,10 Q 65,4 50,4 Q 35,4 32,10" fill="rgba(0,0,0,0.2)" />
              {/* Sleeve inner folds */}
              <path d="M 26,26 L 25,32 Z M 74,26 L 75,32 Z" fill="#000" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
              {/* Light folds highlights (vertical shadows) */}
              <path d="M 32,25 C 33,50 31,70 34,92" stroke="rgba(0,0,0,0.06)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M 68,25 C 67,50 69,70 66,92" stroke="rgba(255,255,255,0.08)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            </svg>

            {/* Print Area inside T-shirt */}
            <div className="absolute top-[25%] left-[30%] w-[40%] h-[40%] flex flex-col items-center justify-center text-center z-10 pointer-events-none">
              <div className="w-[60%] h-[60%] max-w-[120px] max-h-[120px] mb-2 flex items-center justify-center opacity-90 transition-all duration-300">
                {renderGraphicContent()}
              </div>
              {text && (
                <p 
                  className={`text-[9px] sm:text-[11px] font-bold px-1 py-0.5 rounded break-words max-w-[120px] select-none ${getFontFamilyClass()}`}
                  style={{ color: textColor }}
                >
                  {text}
                </p>
              )}
            </div>
          </div>
        );

      case 'mug':
        return (
          <div className="relative w-full h-full flex items-center justify-center p-8">
            <div className="relative w-3/4 aspect-[4/5] max-w-[200px] flex items-center justify-center">
              {/* Mug Handle (drawn behind) */}
              <div 
                className="absolute right-[-18%] top-1/4 w-[35%] h-[50%] rounded-r-[50px] border-[12px] z-0 shadow-lg"
                style={{ borderColor: baseColor, filter: 'brightness(0.9) drop-shadow(4px 4px 6px rgba(0,0,0,0.1))' }}
              />
              {/* Mug Body */}
              <div 
                className="w-full h-full rounded-t-[10px] rounded-b-[40px] z-10 relative overflow-hidden flex flex-col items-center justify-center border-t-2 border-white/20 shadow-2xl"
                style={{ backgroundColor: baseColor }}
              >
                {/* 3D cylindrical reflection */}
                <div className="absolute top-0 bottom-0 left-2 w-4 bg-white/20 blur-[1px] rounded-full z-20 pointer-events-none" />
                <div className="absolute top-0 bottom-0 right-4 w-6 bg-black/15 blur-[2px] rounded-full z-20 pointer-events-none" />
                <div className="absolute top-1 left-2 right-2 h-3 bg-white/10 rounded-full border border-white/20 z-0" />

                {/* Print area on front */}
                <div className="w-[65%] h-[60%] flex flex-col items-center justify-center text-center z-10 p-2">
                  <div className="w-[70%] h-[65%] max-h-[100px] max-w-[100px] mb-1.5 flex items-center justify-center opacity-90">
                    {renderGraphicContent()}
                  </div>
                  {text && (
                    <p 
                      className={`text-[8px] sm:text-[10px] break-words line-clamp-2 max-w-[100px] select-none ${getFontFamilyClass()}`}
                      style={{ color: textColor }}
                    >
                      {text}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 'journal':
        return (
          <div className="relative w-full h-full flex items-center justify-center p-6">
            <div 
              className="w-3/4 aspect-[3/4] max-w-[220px] rounded-r-[24px] rounded-l-[4px] relative overflow-hidden flex flex-col justify-start p-6 shadow-2xl border-l-[8px] border-black/35"
              style={{ backgroundColor: baseColor }}
            >
              {/* Spine shadow lines */}
              <div className="absolute left-0 top-0 bottom-0 w-3 bg-white/10 blur-[1px] pointer-events-none" />
              <div className="absolute left-[3px] top-0 bottom-0 w-[1px] bg-black/40 pointer-events-none" />
              {/* Gold marker ribbon */}
              <div className="absolute right-[20%] top-0 h-10 w-2.5 bg-yellow-400 shadow-md transform -skew-x-12 z-0 origin-top" />
              {/* Hardcover tactile edge highlights */}
              <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/10 pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-black/15 pointer-events-none" />

              {/* Print design centering */}
              <div className="w-full h-full flex flex-col items-center justify-center text-center z-10 z-relative mt-2">
                <div className="w-[60%] h-[55%] max-h-[110px] mb-3 flex items-center justify-center opacity-95">
                  {renderGraphicContent()}
                </div>
                {text && (
                  <p 
                    className={`text-[10px] sm:text-[12px] p-1 bg-black/10 backdrop-blur-[1px] rounded leading-snug break-words max-w-[130px] select-none ${getFontFamilyClass()}`}
                    style={{ color: textColor }}
                  >
                    {text}
                  </p>
                )}
              </div>
            </div>
          </div>
        );

      case 'tote':
        return (
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <div className="relative w-[75%] max-w-[210px] aspect-square flex flex-col items-center">
              {/* Tote Straps */}
              <svg className="w-full h-[35%] absolute top-[-30%] left-0 z-0 drop-shadow-md" viewBox="0 0 100 40" fill="none">
                <path d="M 25,40 C 25,10 40,5 50,5 C 60,5 75,10 75,40" stroke="#d4d4d8" strokeWidth="6" strokeLinecap="round" fill="none" />
                <path d="M 25,40 C 25,10 40,5 50,5 C 60,5 75,10 75,40" stroke={baseColor} strokeWidth="3.5" strokeLinecap="round" fill="none" opacity="0.9" />
              </svg>

              {/* Canvas Tote Bag Body */}
              <div 
                className="w-full h-full rounded-[4px] relative overflow-hidden flex flex-col items-center justify-center border border-black/10 shadow-xl p-4"
                style={{ backgroundColor: baseColor }}
              >
                {/* Natural textile fabric canvas grid overlay texture */}
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />
                {/* Vertical fold shade */}
                <div className="absolute left-[30%] top-0 bottom-0 w-8 bg-black/5 blur-[3px] pointer-events-none" />
                <div className="absolute right-[30%] top-0 bottom-0 w-8 bg-white/5 blur-[3px] pointer-events-none" />

                {/* Print Graphic overlay */}
                <div className="w-[65%] h-[60%] flex flex-col items-center justify-center text-center z-10">
                  <div className="w-[70%] h-[70%] max-h-[100px] mb-2 flex items-center justify-center opacity-85">
                    {renderGraphicContent()}
                  </div>
                  {text && (
                    <p 
                      className={`text-[8px] sm:text-[10px] tracking-wide break-words max-w-[120px] select-none ${getFontFamilyClass()}`}
                      style={{ color: textColor }}
                    >
                      {text}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 'tumbler':
        return (
          <div className="relative w-full h-full flex items-center justify-center p-8">
            <div className="relative w-[35%] max-w-[100px] aspect-[1/3] flex flex-col items-center">
              {/* Straw */}
              <div className="absolute top-[-15%] left-[45%] w-2 h-[20%] bg-blue-100 border border-blue-200 rounded-full z-0 transform -rotate-12" />
              {/* Cap / Lid */}
              <div className="w-[108%] h-7 bg-zinc-300 rounded-md border-b-4 border-zinc-400 shadow-md relative z-20 flex flex-col justify-center items-center">
                <div className="w-4 h-2 bg-zinc-400 rounded-t-sm" />
                <div className="w-[90%] h-1.5 bg-zinc-100 rounded-full opacity-55" />
              </div>
              {/* Tumbler Body tapering down */}
              <div 
                className="w-full flex-grow relative overflow-hidden shadow-2xl clip-taper border-t-2 border-white/20"
                style={{ 
                  backgroundColor: baseColor,
                  clipPath: 'polygon(0% 0%, 100% 0%, 82% 100%, 18% 100%)'
                }}
              >
                {/* Shiny gloss overlays */}
                <div className="absolute inset-y-0 left-2 w-3 bg-white/25 blur-[1px] rounded-full z-10" />
                <div className="absolute inset-y-0 right-3 w-5 bg-black/20 blur-[2px] rounded-full z-10" />

                {/* Print area */}
                <div className="absolute inset-x-0 top-[20%] bottom-[20%] flex flex-col items-center justify-center text-center p-3 z-20">
                  <div className="w-[85%] h-[55%] max-h-[100px] mb-2 flex items-center justify-center opacity-90">
                    {renderGraphicContent()}
                  </div>
                  {text && (
                    <p 
                      className={`text-[8px] sm:text-[9px] font-extrabold max-w-[80px] break-words line-clamp-2 select-none ${getFontFamilyClass()}`}
                      style={{ color: textColor }}
                    >
                      {text}
                    </p>
                  )}
                </div>
              </div>
              {/* Metallic Base Rim */}
              <div className="w-[66%] h-3 bg-zinc-300 rounded-b-md shadow-md z-10 border-t border-zinc-400" />
            </div>
          </div>
        );

      case 'wallart':
        return (
          <div className="relative w-full h-full flex items-center justify-center p-6">
            <div className="relative w-[85%] max-w-[240px] aspect-[4/3] bg-stone-100 p-2 rounded-sm shadow-2xl border-[12px] border-stone-800 flex items-center justify-center">
              {/* Wall Frame shadow */}
              <div className="absolute inset-0 border border-stone-900 shadow-inner z-20 pointer-events-none" />
              
              {/* Canvas Content */}
              <div 
                className="w-full h-full relative overflow-hidden flex flex-col items-center justify-center p-4 transition-all duration-300"
                style={{ backgroundColor: baseColor }}
              >
                {/* Canvas canvas texture */}
                <div className="absolute inset-0 bg-stone-200/50 blend-overlay" />
                
                {/* Visual Graphics and Text */}
                <div className="w-[65%] h-[65%] flex flex-col items-center justify-center text-center z-10">
                  <div className="w-[65%] h-[65%] max-h-[110px] mb-2 flex items-center justify-center opacity-95">
                    {renderGraphicContent()}
                  </div>
                  {text && (
                    <p 
                      className={`text-[9px] sm:text-[11px] leading-snug break-words max-w-[140px] select-none ${getFontFamilyClass()}`}
                      style={{ color: textColor }}
                    >
                      {text}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`relative select-none ease-in-out duration-300 ${className}`}>
      {renderProductBase()}
    </div>
  );
};
