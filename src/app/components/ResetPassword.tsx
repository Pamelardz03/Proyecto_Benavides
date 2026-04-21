import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { ArrowLeft, Lock, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import imgBenavides from '../../imports/Logo-BenavidesAzul.png';

export function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';
  const navigate = useNavigate();

  const passwordRequirements = [
    { text: 'Mínimo 8 caracteres', met: newPassword.length >= 8 },
    { text: 'Una letra mayúscula', met: /[A-Z]/.test(newPassword) },
    { text: 'Una letra minúscula', met: /[a-z]/.test(newPassword) },
    { text: 'Un número', met: /\d/.test(newPassword) },
  ];

  const isPasswordValid = passwordRequirements.every((req) => req.met);
  const passwordsMatch = newPassword && confirmPassword && newPassword === confirmPassword;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isPasswordValid && passwordsMatch) {
      console.log('Password reset for:', email);
      // Redirigir al login
      navigate('/');
    }
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
          onClick={() => navigate(-1)}
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
              <Lock className="w-10 h-10 text-[#001389]" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-center mb-2">
            Restablecer Contraseña
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Ingresa tu nueva contraseña para<br />
            <span className="font-medium text-[#001389]">{email}</span>
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* New Password */}
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Nueva Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="newPassword"
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 rounded-xl bg-white/50 backdrop-blur-sm border border-white/60 focus:border-[#001389] focus:ring-2 focus:ring-[#001389]/20 transition-all duration-300 outline-none"
                  placeholder="Ingresa tu nueva contraseña"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Password Requirements */}
            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 space-y-2">
              <p className="text-sm font-medium text-gray-700 mb-2">La contraseña debe contener:</p>
              {passwordRequirements.map((req, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle2 
                    className={`w-4 h-4 transition-colors ${
                      req.met ? 'text-green-500' : 'text-gray-300'
                    }`} 
                  />
                  <span className={`text-sm ${req.met ? 'text-green-600' : 'text-gray-500'}`}>
                    {req.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirmar Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 rounded-xl bg-white/50 backdrop-blur-sm border border-white/60 focus:border-[#001389] focus:ring-2 focus:ring-[#001389]/20 transition-all duration-300 outline-none"
                  placeholder="Confirma tu nueva contraseña"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {confirmPassword && !passwordsMatch && (
                <p className="mt-2 text-sm text-[#D52A1D]">Las contraseñas no coinciden</p>
              )}
              {passwordsMatch && (
                <p className="mt-2 text-sm text-green-600">Las contraseñas coinciden</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isPasswordValid || !passwordsMatch}
              className="w-full py-4 bg-gradient-to-r from-[#001389] to-[#001389]/90 text-white rounded-xl font-medium hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              Restablecer Contraseña
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}