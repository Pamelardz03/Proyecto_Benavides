import { useState } from 'react';
import { ArrowLeft, Mail } from 'lucide-react';
import { useNavigate } from 'react-router';
import imgBenavides from '../../imports/logo-anterior-convertido-de-svg.png';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Recovery email sent to:', email);
    // Ir a la pantalla de código de recuperación
    navigate(`/recovery-code?email=${email}`);
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
                    <Mail className="w-8 h-8 text-[#001389]" />
                  </div>
                </div>
              </div>

              {/* Title */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-semibold text-gray-800 mb-2">
                  ¿Olvidaste tu contraseña?
                </h1>
                <p className="text-gray-600">
                  No te preocupes, te enviaremos instrucciones para recuperarla
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email Input */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 ml-1">
                    Correo electrónico
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl bg-white/50 backdrop-blur-sm border border-gray-200/60 focus:border-[#001389] focus:ring-2 focus:ring-[#001389]/20 transition-all duration-300 outline-none"
                      placeholder="tu@email.com"
                      required
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#001389] to-[#000D5C] text-white font-medium shadow-lg shadow-[#001389]/30 hover:shadow-xl hover:shadow-[#001389]/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                >
                  Enviar instrucciones
                </button>

                {/* Back to Login */}
                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => navigate('/')}
                    className="text-gray-600 hover:text-[#001389] transition-colors inline-flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Volver al inicio de sesión
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Info Text */}
          <div className="mt-6 text-center">
            <div className="bg-white/40 backdrop-blur-xl rounded-2xl p-4 border border-white/60">
              <p className="text-sm text-gray-600">
                💡 Recibirás un correo con un enlace para restablecer tu contraseña
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}