import { useState } from 'react';
import { Eye, EyeOff, User } from 'lucide-react';
import { useNavigate } from 'react-router';
import imgBenavides from '../../imports/logo-anterior-convertido-de-svg.png';

type UserType = 'cliente' | 'empleado' | 'admin';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState<UserType>('cliente');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login:', { email, password, userType: selectedUserType });
    
    // Todos los perfiles van a verificación
    navigate(`/verification?userType=${selectedUserType}`);
  };

  const getUserTypeLabel = (type: UserType) => {
    const labels = {
      cliente: 'Cliente',
      empleado: 'Empleado',
      admin: 'Administrador'
    };
    return labels[type];
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

      {/* Profile Selector - Top Right */}
      <div className="absolute top-6 right-6 z-50">
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/40 backdrop-blur-xl border border-white/60 shadow-lg hover:bg-white/60 transition-all duration-300"
          >
            <User className="w-4 h-4 text-[#001389]" />
            <span className="text-sm font-medium text-gray-700">{getUserTypeLabel(selectedUserType)}</span>
          </button>

          {showUserMenu && (
            <div className="absolute top-full right-0 mt-2 w-48 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/60 shadow-2xl overflow-hidden">
              {(['cliente', 'empleado', 'admin'] as UserType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setSelectedUserType(type);
                    setShowUserMenu(false);
                  }}
                  className={`w-full px-4 py-3 text-left text-sm transition-all duration-200 ${
                    selectedUserType === type
                      ? 'bg-[#001389]/10 text-[#001389] font-medium'
                      : 'text-gray-700 hover:bg-[#001389]/5'
                  }`}
                >
                  {getUserTypeLabel(type)}
                </button>
              ))}
            </div>
          )}
        </div>
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
                      className="w-40 h-auto"
                    />
                  </div>
                </div>
              </div>

              {/* Title */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-semibold text-gray-800 mb-2">
                  Bienvenido
                </h1>
                <p className="text-gray-600">
                  Inicia sesión como {getUserTypeLabel(selectedUserType).toLowerCase()}
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

                {/* Password Input */}
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 ml-1">
                    Contraseña
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl bg-white/50 backdrop-blur-sm border border-gray-200/60 focus:border-[#001389] focus:ring-2 focus:ring-[#001389]/20 transition-all duration-300 outline-none pr-12"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-[#001389] transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Remember & Forgot */}
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300 text-[#001389] focus:ring-[#001389]/20"
                    />
                    <span className="text-gray-600">Recordarme</span>
                  </label>
                  <button
                    type="button"
                    className="text-[#001389] hover:text-[#000D5C] transition-colors font-medium"
                    onClick={() => navigate('/forgot-password')}
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#001389] to-[#000D5C] text-white font-medium shadow-lg shadow-[#001389]/30 hover:shadow-xl hover:shadow-[#001389]/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                >
                  Iniciar Sesión
                </button>

                {/* Divider */}
                <div className="relative py-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white/70 text-gray-500">o continúa con</span>
                  </div>
                </div>

                {/* Social Login */}
                <div className="w-full">
                  <button
                    type="button"
                    className="w-full py-3 px-4 rounded-xl bg-white/50 backdrop-blur-sm border border-gray-200/60 hover:bg-white/80 hover:border-[#001389]/30 transition-all duration-300 flex items-center justify-center gap-2 text-gray-700 font-medium"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google
                  </button>
                </div>
              </form>

              {/* Sign Up Link */}
              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  ¿No tienes cuenta?{' '}
                  <button 
                    onClick={() => navigate('/register')}
                    className="text-[#001389] hover:text-[#000D5C] font-medium transition-colors"
                  >
                    Regístrate
                  </button>
                </p>
              </div>
            </div>
          </div>

          {/* Footer Text */}
          <p className="text-center mt-6 text-sm text-gray-600">
            Al continuar, aceptas nuestros{' '}
            <button className="text-[#001389] hover:underline">Términos</button>
            {' '}y{' '}
            <button className="text-[#001389] hover:underline">Política de Privacidad</button>
          </p>
        </div>
      </div>
    </div>
  );
}