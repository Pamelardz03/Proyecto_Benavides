import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Shield } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router';
import imgBenavides from '../../imports/logo-anterior-convertido-de-svg.png';

export function Verification() {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userType = searchParams.get('userType') || 'cliente';

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single digit
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Move to next input if value entered
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
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    const newCode = [...code];
    
    for (let i = 0; i < pastedData.length; i++) {
      if (i < 6 && /^\d$/.test(pastedData[i])) {
        newCode[i] = pastedData[i];
      }
    }
    
    setCode(newCode);
    
    // Focus last filled input or next empty
    const lastFilledIndex = Math.min(pastedData.length, 5);
    inputRefs.current[lastFilledIndex]?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const verificationCode = code.join('');
    console.log('Verification code:', verificationCode, 'User type:', userType);
    
    // Redirigir según el tipo de usuario
    if (userType === 'cliente') {
      navigate('/cliente/home');
    } else if (userType === 'colaborador') {
      navigate('/colaborador/home');
    } else if (userType === 'admin') {
      navigate('/admin/home');
    }
  };

  const handleResend = () => {
    console.log('Resending code...');
    setCode(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
  };

  const getUserTypeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      cliente: 'Cliente',
      colaborador: 'Colaborador',
      admin: 'Administrador'
    };
    return labels[type] || 'Cliente';
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#E6E8F5] via-white to-[#E6E8F5]">
      {/* Liquid Glass Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#001389] rounded-full opacity-10 blur-3xl animate-pulse" 
             style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#D52A1D] rounded-full opacity-10 blur-3xl animate-pulse" 
             style={{ animationDuration: '6s', animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#001389] rounded-full opacity-5 blur-3xl animate-pulse" 
             style={{ animationDuration: '5s', animationDelay: '2s' }}></div>
      </div>

      {/* Back Button - Top Left */}
      <div className="absolute top-6 left-6 z-50">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/40 backdrop-blur-xl border border-white/60 shadow-lg hover:bg-white/60 transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4 text-[#001389]" />
          <span className="text-sm font-medium text-gray-700">Volver</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Glass Card */}
          <div className="relative">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#001389]/20 to-[#D52A1D]/20 rounded-3xl blur-xl"></div>
            
            {/* Main Card */}
            <div className="relative bg-white/70 backdrop-blur-2xl rounded-3xl p-8 md:p-10 shadow-2xl border border-white/60">
              {/* Logo */}
              <div className="flex justify-center mb-8">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-[#001389] rounded-xl blur-md opacity-30"></div>
                  <div className="relative bg-white rounded-xl p-3 shadow-lg">
                    <img 
                      src={imgBenavides} 
                      alt="Benavides" 
                      className="w-24 h-auto"
                    />
                  </div>
                </div>
              </div>

              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#001389] rounded-full blur-lg opacity-20"></div>
                  <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#001389]/10 to-[#001389]/20 flex items-center justify-center">
                    <Shield className="w-8 h-8 text-[#001389]" />
                  </div>
                </div>
              </div>

              {/* Title */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-semibold text-gray-800 mb-2">
                  Verificación de seguridad
                </h1>
                <p className="text-gray-600">
                  Ingresa el código de 6 dígitos enviado a tu correo
                </p>
                <p className="text-sm text-[#001389] mt-2 font-medium">
                  Acceso: {getUserTypeLabel(userType)}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* OTP Input */}
                <div className="flex gap-2 justify-center" onPaste={handlePaste}>
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value.replace(/\D/g, ''))}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-12 h-14 md:w-14 md:h-16 text-center text-2xl font-semibold rounded-xl bg-white/50 backdrop-blur-sm border border-gray-200/60 focus:border-[#001389] focus:ring-2 focus:ring-[#001389]/20 transition-all duration-300 outline-none"
                    />
                  ))}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={code.some(digit => !digit)}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#001389] to-[#000D5C] text-white font-medium shadow-lg shadow-[#001389]/30 hover:shadow-xl hover:shadow-[#001389]/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  Verificar código
                </button>

                {/* Resend Code */}
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">
                    ¿No recibiste el código?
                  </p>
                  <button
                    type="button"
                    onClick={handleResend}
                    className="text-[#001389] hover:text-[#000D5C] font-medium transition-colors text-sm"
                  >
                    Reenviar código
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Info Text */}
          <div className="mt-6 text-center">
            <div className="bg-white/40 backdrop-blur-xl rounded-2xl p-4 border border-white/60">
              <p className="text-sm text-gray-600">
                🔒 Este código es válido por 10 minutos
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}