import { useState } from 'react';
import { User, Bell, Search, UserPlus, Edit2, Trash2, ArrowLeft, Mail, X, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router';
import imgBenavides from '../../imports/logo-anterior-convertido-de-svg.png';
import { SuccessToast } from './ui/SuccessToast';

type Usuario = {
  id: string;
  nombre: string;
  email: string;
  tipo: 'Cliente' | 'Médico' | 'Colaborador';
  estado: 'Activo' | 'Inactivo';
  fechaRegistro: string;
};

export function UsuariosAdmin() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [swipedUserId, setSwipedUserId] = useState<string | null>(null);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [swipeOffset, setSwipeOffset] = useState<number>(0);
  const [activeSwipeUserId, setActiveSwipeUserId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<Usuario | null>(null);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [userToMessage, setUserToMessage] = useState<Usuario | null>(null);
  const [message, setMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const usuarios: Usuario[] = [
    { id: '1', nombre: 'Ana García Martínez', email: 'ana.garcia@email.com', tipo: 'Cliente', estado: 'Activo', fechaRegistro: '15/03/2026' },
    { id: '2', nombre: 'Dr. Carlos Rodríguez', email: 'carlos.rodriguez@benavides.com', tipo: 'Médico', estado: 'Activo', fechaRegistro: '10/02/2026' },
    { id: '3', nombre: 'María López Silva', email: 'maria.lopez@email.com', tipo: 'Cliente', estado: 'Activo', fechaRegistro: '20/03/2026' },
    { id: '4', nombre: 'Dra. Laura Fernández', email: 'laura.fernandez@benavides.com', tipo: 'Médico', estado: 'Activo', fechaRegistro: '05/01/2026' },
    { id: '5', nombre: 'Pedro Sánchez Díaz', email: 'pedro.sanchez@benavides.com', tipo: 'Colaborador', estado: 'Activo', fechaRegistro: '12/03/2026' },
    { id: '6', nombre: 'Isabel Torres Ruiz', email: 'isabel.torres@email.com', tipo: 'Cliente', estado: 'Inactivo', fechaRegistro: '08/02/2026' },
    { id: '7', nombre: 'Dr. Miguel Ángel Morales', email: 'miguel.morales@benavides.com', tipo: 'Médico', estado: 'Activo', fechaRegistro: '18/01/2026' },
    { id: '8', nombre: 'Carmen Jiménez Pérez', email: 'carmen.jimenez@benavides.com', tipo: 'Colaborador', estado: 'Activo', fechaRegistro: '25/02/2026' },
  ];

  const filteredUsuarios = usuarios.filter(usuario =>
    usuario.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    usuario.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    usuario.tipo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'Cliente': return 'bg-[#001389]/10 text-[#001389]';
      case 'Médico': return 'bg-[#D52A1D]/10 text-[#D52A1D]';
      case 'Colaborador': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent, userId: string) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setActiveSwipeUserId(userId);
    setSwipeOffset(0);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;

    const currentTouch = e.targetTouches[0].clientX;
    setTouchEnd(currentTouch);

    const offset = currentTouch - touchStart;
    // Limitar el offset máximo
    const maxOffset = 120;
    const limitedOffset = Math.max(-maxOffset, Math.min(maxOffset, offset));
    setSwipeOffset(limitedOffset);
  };

  const onTouchEnd = (usuario: Usuario) => {
    if (!touchStart || !touchEnd) {
      setActiveSwipeUserId(null);
      setSwipeOffset(0);
      return;
    }

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setUserToDelete(usuario);
      setShowDeleteModal(true);
    } else if (isRightSwipe) {
      setUserToMessage(usuario);
      setShowMessageModal(true);
    }

    // Reset swipe state
    setActiveSwipeUserId(null);
    setSwipeOffset(0);
    setTouchStart(null);
    setTouchEnd(null);
  };

  const handleCardClick = (usuario: Usuario) => {
    // Solo navegar en desktop o si no hay swipe activo
    if (!activeSwipeUserId) {
      navigate(`/admin/usuarios/${usuario.id}`);
    }
  };

  const handleDeleteUser = () => {
  const nombre = userToDelete?.nombre ?? 'el usuario';
  setShowDeleteModal(false);
  setUserToDelete(null);
  setActiveSwipeUserId(null);
  setSwipeOffset(0);
  setTimeout(() => {
    setToastMessage(`${nombre} eliminado correctamente`);
    setToastVisible(true);
  }, 150);
};

  const handleSendMessage = () => {
    console.log('Enviando mensaje a:', userToMessage?.email, message);
    setShowMessageModal(false);
    setUserToMessage(null);
    setMessage('');
    setActiveSwipeUserId(null);
    setSwipeOffset(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E6E8F5] via-white to-[#E6E8F5]">
      {/* Liquid Glass Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#001389] rounded-full opacity-10 blur-3xl animate-pulse"
          style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#D52A1D] rounded-full opacity-10 blur-3xl animate-pulse"
          style={{ animationDuration: '6s', animationDelay: '1s' }}></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#001389] backdrop-blur-xl border-b border-[#001389]/60 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            {/* Logo y Back Button */}
            <div className="flex items-center gap-2 md:gap-3">
              <button
                onClick={() => navigate('/admin')}
                className="p-2 rounded-xl hover:bg-white/10 transition-all"
              >
                <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </button>
              <img src={imgBenavides} alt="Benavides" className="h-10 md:h-12 w-auto" />
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 md:gap-3">
              <button className="relative p-2 rounded-xl hover:bg-white/10 transition-all">
                <Bell className="w-5 h-5 md:w-6 md:h-6 text-white" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#D52A1D] rounded-full"></span>
              </button>
              <button
                onClick={() => navigate('/')}
                className="p-2 rounded-xl hover:bg-white/10 transition-all"
              >
                <User className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6 pb-20 md:pb-24">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">Gestión de Usuarios</h1>
            <p className="text-sm md:text-base text-gray-600">Administra todos los usuarios del sistema</p>
          </div>
          <button
            onClick={() => navigate('/admin/usuarios/nuevo')}
            className="flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-gradient-to-br from-[#001389] to-[#001389]/80 text-white rounded-2xl hover:shadow-xl transition-all whitespace-nowrap"
          >
            <UserPlus className="w-4 h-4 md:w-5 md:h-5" />
            <span className="text-sm md:text-base font-semibold">Nuevo Usuario</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nombre, email o tipo de usuario..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/70 backdrop-blur-sm border border-white/60 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-[#001389]/30 transition-all"
            />
          </div>
        </div>

        {/* Users List */}
        <div className="space-y-3">
          {filteredUsuarios.map((usuario) => {
            const isActiveSwipe = activeSwipeUserId === usuario.id;
            const offset = isActiveSwipe ? swipeOffset : 0;

            return (
              <div
                key={usuario.id}
                className="relative overflow-hidden rounded-3xl"
              >
                {/* Background Panels - Revealed on Swipe */}
                {/* Right swipe - Blue message panel */}
                <div
                  className="absolute left-0 top-0 bottom-0 right-0 bg-blue-500 rounded-3xl flex items-center justify-start pl-8"
                  style={{
                    opacity: offset > 10 ? 1 : 0,
                    transition: 'opacity 0.2s'
                  }}
                >
                  <Mail className="w-8 h-8 md:w-9 md:h-9 text-white" />
                </div>

                {/* Left swipe - Red delete panel */}
                <div
                  className="absolute left-0 top-0 bottom-0 right-0 bg-[#D52A1D] rounded-3xl flex items-center justify-end pr-8"
                  style={{
                    opacity: offset < -10 ? 1 : 0,
                    transition: 'opacity 0.2s'
                  }}
                >
                  <Trash2 className="w-8 h-8 md:w-9 md:h-9 text-white" />
                </div>

                {/* User Card - Swipeable */}
                <div
                  onTouchStart={(e) => onTouchStart(e, usuario.id)}
                  onTouchMove={onTouchMove}
                  onTouchEnd={() => onTouchEnd(usuario)}
                  onClick={() => handleCardClick(usuario)}
                  className="relative p-5 rounded-3xl bg-white/50 backdrop-blur-sm border border-white/60 shadow-xl hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
                  style={{
                    transform: `translateX(${offset}px)`,
                    transition: isActiveSwipe ? 'none' : 'transform 0.3s ease-out'
                  }}
                >
                  <div className="flex items-center justify-between gap-3 md:gap-4">
                    {/* User Info */}
                    <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#001389] to-[#001389]/70 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                        {usuario.nombre.split(' ').map(n => n[0]).slice(0, 2).join('')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-800 truncate">{usuario.nombre}</h3>
                        <p className="text-sm text-gray-600 truncate">{usuario.email}</p>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <span className={`text-xs px-3 py-1 rounded-full font-medium ${getTipoColor(usuario.tipo)}`}>
                            {usuario.tipo}
                          </span>
                          <span className="text-xs text-gray-500 hidden sm:inline">Registrado: {usuario.fechaRegistro}</span>
                        </div>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className={`hidden sm:block px-3 md:px-4 py-1.5 md:py-2 rounded-xl font-medium text-xs md:text-sm ${usuario.estado === 'Activo'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-600'
                        }`}>
                        {usuario.estado}
                      </div>

                      {/* Action Buttons - Siempre visibles */}
                      <div className="flex items-center gap-1.5 md:gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setUserToMessage(usuario);
                            setShowMessageModal(true);
                          }}
                          className="p-2 md:p-3 rounded-xl bg-blue-50 hover:bg-blue-100 transition-all"
                        >
                          <Mail className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/admin/usuarios/${usuario.id}`, { state: { editMode: true } });
                          }}
                          className="p-2 md:p-3 rounded-xl bg-[#001389]/10 hover:bg-[#001389]/20 transition-all"
                        >
                          <Edit2 className="w-4 h-4 md:w-5 md:h-5 text-[#001389]" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setUserToDelete(usuario);
                            setShowDeleteModal(true);
                          }}
                          className="p-2 md:p-3 rounded-xl bg-[#D52A1D]/10 hover:bg-[#D52A1D]/20 transition-all"
                        >
                          <Trash2 className="w-4 h-4 md:w-5 md:h-5 text-[#D52A1D]" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredUsuarios.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <User className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No se encontraron usuarios</h3>
            <p className="text-gray-500">Intenta con otro término de búsqueda</p>
          </div>
        )}
      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && userToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl mx-4">
            <button
              onClick={() => {
                setShowDeleteModal(false);
                setUserToDelete(null);
                setActiveSwipeUserId(null);
                setSwipeOffset(0);
              }}
              className="absolute top-4 right-4 p-2 rounded-xl hover:bg-gray-100 transition-all"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#D52A1D]/10 flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-[#D52A1D]" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">¿Eliminar Usuario?</h3>
              <p className="text-gray-600 mb-4">
                ¿Estás seguro de que deseas eliminar a <span className="font-semibold">{userToDelete.nombre}</span>?
                Esta acción no se puede deshacer.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setUserToDelete(null);
                    setActiveSwipeUserId(null);
                    setSwipeOffset(0);
                  }}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-2xl font-semibold hover:bg-gray-200 transition-all"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleDeleteUser}
                  className="flex-1 px-6 py-3 bg-gradient-to-br from-[#D52A1D] to-[#D52A1D]/80 text-white rounded-2xl font-semibold hover:shadow-xl transition-all"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Message Modal */}
      {showMessageModal && userToMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl mx-4">
            <button
              onClick={() => {
                setShowMessageModal(false);
                setUserToMessage(null);
                setMessage('');
                setActiveSwipeUserId(null);
                setSwipeOffset(0);
              }}
              className="absolute top-4 right-4 p-2 rounded-xl hover:bg-gray-100 transition-all"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#001389] to-[#001389]/70 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Enviar Mensaje</h3>
                  <p className="text-sm text-gray-600">{userToMessage.email}</p>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Para: {userToMessage.nombre}
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Escribe tu mensaje aquí..."
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#001389]/30 transition-all outline-none resize-none"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowMessageModal(false);
                    setUserToMessage(null);
                    setMessage('');
                    setActiveSwipeUserId(null);
                    setSwipeOffset(0);
                  }}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-2xl font-semibold hover:bg-gray-200 transition-all"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSendMessage}
                  className="flex-1 px-6 py-3 bg-gradient-to-br from-[#001389] to-[#001389]/80 text-white rounded-2xl font-semibold hover:shadow-xl transition-all"
                  disabled={!message.trim()}
                >
                  Enviar
                </button>

                {/* Success Toast */}
                <SuccessToast
                  message={toastMessage}
                  visible={toastVisible}
                  onHide={() => setToastVisible(false)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
