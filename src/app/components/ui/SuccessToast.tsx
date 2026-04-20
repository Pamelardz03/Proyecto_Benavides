import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';

type SuccessToastProps = {
  message: string;
  visible: boolean;
  onHide: () => void;
  duration?: number;
};

export function SuccessToast({ message, visible, onHide, duration = 1400 }: SuccessToastProps) {
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (visible) {
      setAnimating(true);
      const timer = setTimeout(() => {
        setAnimating(false);
        setTimeout(onHide, 300);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [visible, duration, onHide]);

  if (!visible && !animating) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
      <div
        className="relative"
        style={{
          opacity: animating ? 1 : 0,
          transform: animating ? 'scale(1) translateY(0)' : 'scale(0.92) translateY(12px)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
        }}
      >
        {/* Glow exterior */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 rounded-3xl blur-xl" />

        {/* Card liquid glass */}
        <div
          className="relative px-10 py-8 rounded-3xl flex flex-col items-center gap-4 min-w-[220px]"
          style={{
            background: 'rgba(255,255,255,0.55)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
            border: '1.5px solid rgba(255,255,255,0.7)',
            boxShadow: '0 8px 40px rgba(0,19,137,0.10), 0 2px 12px rgba(0,0,0,0.08)',
          }}
        >
          <p className="text-gray-800 font-medium text-center text-base leading-snug">
            {message}
          </p>

          <div className="relative flex items-center justify-center">
            <div
              className="absolute w-14 h-14 rounded-full border-2 border-green-400 opacity-30"
              style={{
                animation: animating ? 'ping 1.2s ease-out infinite' : 'none',
              }}
            />
            <div className="w-11 h-11 rounded-full bg-white border-2 border-green-400 flex items-center justify-center shadow-sm">
              <Check className="w-5 h-5 text-green-500" strokeWidth={2.5} />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ping {
          0% { transform: scale(1); opacity: 0.3; }
          70% { transform: scale(1.5); opacity: 0; }
          100% { transform: scale(1.5); opacity: 0; }
        }
      `}</style>
    </div>
  );
}