import { useState } from 'react';
import { Search, User, MapPin, Bell, Home as HomeIcon, Clock, ChevronRight, Stethoscope, ClipboardList, FileText, History } from 'lucide-react';
import { useNavigate } from 'react-router';
import imgBenavides from '../../imports/logo-anterior-convertido-de-svg.png';
import imgNoticias from '../../imports/Screenshot_2026-04-16_080747-removebg-preview.png';

type Category = {
  id: string;
  name: string;
  icon: React.ReactNode;
};

export function ClienteHome() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const categories: Category[] = [
    { id: 'mis-medicos', name: 'Mis médicos', icon: <Stethoscope className="w-10 h-10" /> },
    { id: 'mis-consultas', name: 'Mis Consultas', icon: <ClipboardList className="w-10 h-10" /> },
    { id: 'mis-recetas', name: 'Mis recetas', icon: <FileText className="w-10 h-10" /> },
    { id: 'mi-historial', name: 'Mi historial', icon: <History className="w-10 h-10" /> },
  ];

  const handleCategoryClick = (categoryId: string) => {
    if (categoryId === 'mis-medicos') {
      navigate('/cliente/mis-medicos');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E6E8F5] via-white to-[#E6E8F5]">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#001389] rounded-full opacity-10 blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#D52A1D] rounded-full opacity-10 blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#001389] backdrop-blur-xl border-b border-[#001389]/60 shadow-lg">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <img src={imgBenavides} alt="Benavides" className="h-12 w-auto" />
            <div className="flex items-center gap-3">
              <button className="relative p-2 rounded-xl hover:bg-white/10 transition-all">
                <Bell className="w-6 h-6 text-white" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#D52A1D] rounded-full" />
              </button>
              <button onClick={() => navigate('/')} className="p-2 rounded-xl hover:bg-white/10 transition-all">
                <User className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm mb-4">
            <MapPin className="w-4 h-4 text-[#D52A1D]" />
            <span className="text-white/90">Entregar en:</span>
            <button className="font-medium text-white hover:underline flex items-center gap-1">
              Av. Principal 123, Col. Centro <span className="text-white">→</span>
            </button>
            <Clock className="w-4 h-4 text-white/70 ml-2" />
            <span className="text-white/90">25-35 min</span>
          </div>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar medicamentos, vitaminas, cuidado personal..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/90 backdrop-blur-sm border border-white/60 focus:border-white focus:ring-2 focus:ring-white/20 transition-all outline-none"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-md mx-auto px-4 py-6 pb-24 md:pb-6 min-h-[calc(100vh-200px)]">

        {/* Servicios */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 px-2">Servicios</h2>
          <div className="grid grid-cols-2 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className="relative p-6 rounded-3xl bg-white/50 backdrop-blur-sm border border-white/60 transition-all duration-300 hover:shadow-xl hover:scale-105 flex flex-col items-center justify-center gap-4 min-h-[200px]"
              >
                <div className="text-[#001389]">{category.icon}</div>
                <span className="text-sm font-medium text-gray-800 text-center">{category.name}</span>
                <div className="absolute bottom-4 right-4 text-[#001389]">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Noticias */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 px-2">Noticias</h2>
          <div className="flex justify-center items-center px-2">
            <img src={imgNoticias} alt="Noticias Benavides" className="max-w-full h-auto rounded-2xl shadow-lg" />
          </div>
        </section>

      </main>

      {/* Bottom Navigation — solo en móvil */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#001389] backdrop-blur-xl border-t border-[#001389]/60 shadow-2xl">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="grid grid-cols-4 gap-2">
            <button className="flex flex-col items-center gap-1 py-2 text-white">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <HomeIcon className="w-6 h-6" />
              </div>
              <span className="text-xs font-medium">Inicio</span>
            </button>
            <button className="flex flex-col items-center gap-1 py-2 text-white/70 hover:text-white transition-colors">
              <div className="w-12 h-12 rounded-xl hover:bg-white/20 flex items-center justify-center transition-colors">
                <FileText className="w-6 h-6" />
              </div>
              <span className="text-xs font-medium">Recetas</span>
            </button>
            <button className="flex flex-col items-center gap-1 py-2 text-white/70 hover:text-white transition-colors">
              <div className="w-12 h-12 rounded-xl hover:bg-white/20 flex items-center justify-center transition-colors">
                <History className="w-6 h-6" />
              </div>
              <span className="text-xs font-medium">Historial</span>
            </button>
            <button onClick={() => navigate('/')} className="flex flex-col items-center gap-1 py-2 text-white/70 hover:text-white transition-colors">
              <div className="w-12 h-12 rounded-xl hover:bg-white/20 flex items-center justify-center transition-colors">
                <User className="w-6 h-6" />
              </div>
              <span className="text-xs font-medium">Perfil</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}