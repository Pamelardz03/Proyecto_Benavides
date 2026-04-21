import { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { ArrowLeft, Shield } from 'lucide-react';
import imgBenavides from '../../imports/Logo-BenavidesAzul.png';

export function RecoveryCode() {
  const [code, setCode] = useState<string[]>(['', '', '', '', '', '']);
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';
  const navigate = useNavigate();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }

    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6).split('');
    const newCode = [...code];
    pastedData.forEach((char, index) => {
      if (/^\d$/.test(char) && index < 6) {
        newCode[index] = char;
      }
    });
    setCode(newCode);
    const nextEmptyIndex = newCode.findIndex((digit) => !digit);
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus();
    } else {
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const recoveryCode = code.join('');
    console.log('Recovery code:', recoveryCode, 'Email:', email);
    
    // Ir a la pantalla de restablecer contraseña
    navigate(`/reset-password?email=${email}`);
  };

  const handleResend = () => {
    console.log('Resending code to:', email);
    setCode(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E6E8F5] via-white to-[#E6E8F5] flex items-center justify-center p-4">
      {/* Liquid Glass Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#001389] rounded-full opacity-10 blur-3xl animate-pulse" 
             style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#D52A1D] rounded-full opacity-10 blur-3xl animate-pulse" 
             style={{ animationDuration: '6s', animationDelay: '1s' }}></div>
      </div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-md">
        {/* Back Button */}
        <button
          onClick={() => navigate('/forgot-password')}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-[#001389] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Volver</span>
        </button>

        {/* Glass Card */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/60 p-8">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img src={imgBenavides} alt="Benavides" className="h-16 w-auto" />
          </div>

          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#001389]/20 to-[#D52A1D]/20 flex items-center justify-center">
              <Shield className="w-10 h-10 text-[#001389]" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-center mb-2">
            Código de Recuperación
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Ingresa el código de 6 dígitos que enviamos a<br />
            <span className="font-medium text-[#001389]">{email}</span>
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Code Input */}
            <div className="flex gap-2 justify-center">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="w-12 h-14 text-center text-xl font-bold rounded-xl bg-white/50 backdrop-blur-sm border-2 border-white/60 focus:border-[#001389] focus:ring-2 focus:ring-[#001389]/20 transition-all duration-300 outline-none"
                />
              ))}
            </div>

            {/* Resend Code */}
            <div className="text-center">
              <button
                type="button"
                onClick={handleResend}
                className="text-sm text-gray-600 hover:text-[#001389] transition-colors"
              >
                ¿No recibiste el código?{' '}
                <span className="font-medium text-[#D52A1D]">Reenviar</span>
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={code.some((digit) => !digit)}
              className="w-full py-4 bg-gradient-to-r from-[#001389] to-[#001389]/90 text-white rounded-xl font-medium hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              Verificar Código
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}