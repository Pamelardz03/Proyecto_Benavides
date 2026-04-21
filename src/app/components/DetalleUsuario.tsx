import { useState, useEffect } from 'react';
import { ArrowLeft, Edit2, Save } from 'lucide-react';
import { useNavigate, useParams, useLocation } from 'react-router';
import { SuccessToast } from './ui/SuccessToast';

export function DetalleUsuario() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);

  // Toast state
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const [formData, setFormData] = useState({
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    email: '',
    telefono: '',
    nombreUsuario: '',
    contrasena: '',
    rol: '',
  });

  useEffect(() => {
    if (id === 'nuevo') {
      setIsNewUser(true);
      setIsEditMode(true);
    } else {
      setFormData({
        nombre: 'Ana',
        apellidoPaterno: 'García',
        apellidoMaterno: 'Martínez',
        email: 'ana.garcia@email.com',
        telefono: '5512345678',
        nombreUsuario: 'anagarcia',
        contrasena: '********',
        rol: 'cliente',
      });

      const state = location.state as { editMode?: boolean };
      if (state?.editMode) {
        setIsEditMode(true);
      }
    }
  }, [id, location]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Guardando usuario:', formData);
    if (isNewUser) {
      showToast('¡Registro exitoso!');
    } else {
      showToast('Información actualizada correctamente');
      setIsEditMode(false);
    }
  };

  const handleSave = () => {
    console.log('Guardando cambios:', formData);
    showToast('Información actualizada correctamente');
    setIsEditMode(false);
  };

  const handleToastHide = () => {
    setToastVisible(false);
    // Después de que desaparece el toast, navegar a la lista
    navigate('/admin/usuarios');
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
      <header className="sticky top-0 z-40 bg-[#001389] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/admin/usuarios')}
              className="p-2 rounded-xl hover:bg-white/10 transition-all"
            >
              <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </button>
            <h1 className="text-base md:text-lg lg:text-xl font-semibold text-white truncate px-2">
              {isNewUser ? 'Alta de Usuario' : 'Detalles de Usuario'}
            </h1>
            {!isNewUser && (
              <button
                onClick={() => {
                  if (isEditMode) {
                    handleSave();
                  } else {
                    setIsEditMode(true);
                  }
                }}
                className="p-2 rounded-xl hover:bg-white/10 transition-all"
              >
                {isEditMode ? (
                  <Save className="w-5 h-5 md:w-6 md:h-6 text-white" />
                ) : (
                  <Edit2 className="w-5 h-5 md:w-6 md:h-6 text-white" />
                )}
              </button>
            )}
            {isNewUser && <div className="w-10 md:w-11"></div>}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-3xl mx-auto px-4 md:px-6 py-4 md:py-6 pb-8">
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          {/* Card 1 - Datos Personales */}
          <div className="p-5 md:p-6 rounded-3xl bg-white/70 backdrop-blur-sm border border-white/60 shadow-xl">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre(s)</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  disabled={!isEditMode}
                  className={`w-full px-4 py-3 rounded-xl border-0 transition-all outline-none ${
                    isEditMode
                      ? 'bg-gray-100 focus:ring-2 focus:ring-[#001389]/30'
                      : 'bg-gray-50 text-gray-700 cursor-default'
                  }`}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Apellido Paterno</label>
                  <input
                    type="text"
                    name="apellidoPaterno"
                    value={formData.apellidoPaterno}
                    onChange={handleChange}
                    disabled={!isEditMode}
                    className={`w-full px-4 py-3 rounded-xl border-0 transition-all outline-none ${
                      isEditMode
                        ? 'bg-gray-100 focus:ring-2 focus:ring-[#001389]/30'
                        : 'bg-gray-50 text-gray-700 cursor-default'
                    }`}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Apellido Materno</label>
                  <input
                    type="text"
                    name="apellidoMaterno"
                    value={formData.apellidoMaterno}
                    onChange={handleChange}
                    disabled={!isEditMode}
                    className={`w-full px-4 py-3 rounded-xl border-0 transition-all outline-none ${
                      isEditMode
                        ? 'bg-gray-100 focus:ring-2 focus:ring-[#001389]/30'
                        : 'bg-gray-50 text-gray-700 cursor-default'
                    }`}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditMode}
                  className={`w-full px-4 py-3 rounded-xl border-0 transition-all outline-none ${
                    isEditMode
                      ? 'bg-gray-100 focus:ring-2 focus:ring-[#001389]/30'
                      : 'bg-gray-50 text-gray-700 cursor-default'
                  }`}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  disabled={!isEditMode}
                  className={`w-full px-4 py-3 rounded-xl border-0 transition-all outline-none ${
                    isEditMode
                      ? 'bg-gray-100 focus:ring-2 focus:ring-[#001389]/30'
                      : 'bg-gray-50 text-gray-700 cursor-default'
                  }`}
                  required
                />
              </div>
            </div>
          </div>

          {/* Card 2 - Datos de Cuenta */}
          <div className="p-5 md:p-6 rounded-3xl bg-white/70 backdrop-blur-sm border border-white/60 shadow-xl">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre De Usuario</label>
                <input
                  type="text"
                  name="nombreUsuario"
                  value={formData.nombreUsuario}
                  onChange={handleChange}
                  disabled={!isEditMode}
                  className={`w-full px-4 py-3 rounded-xl border-0 transition-all outline-none ${
                    isEditMode
                      ? 'bg-gray-100 focus:ring-2 focus:ring-[#001389]/30'
                      : 'bg-gray-50 text-gray-700 cursor-default'
                  }`}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
                <input
                  type="password"
                  name="contrasena"
                  value={formData.contrasena}
                  onChange={handleChange}
                  disabled={!isEditMode}
                  className={`w-full px-4 py-3 rounded-xl border-0 transition-all outline-none ${
                    isEditMode
                      ? 'bg-gray-100 focus:ring-2 focus:ring-[#001389]/30'
                      : 'bg-gray-50 text-gray-700 cursor-default'
                  }`}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rol</label>
                <select
                  name="rol"
                  value={formData.rol}
                  onChange={handleChange}
                  disabled={!isEditMode}
                  className={`w-full px-4 py-3 rounded-xl border-0 transition-all outline-none ${
                    isEditMode
                      ? 'bg-gray-100 focus:ring-2 focus:ring-[#001389]/30'
                      : 'bg-gray-50 text-gray-700 cursor-default'
                  }`}
                  required
                >
                  <option value="">Seleccionar</option>
                  <option value="cliente">Cliente</option>
                  <option value="medico">Médico</option>
                  <option value="colaborador">Colaborador</option>
                  <option value="administrador">Administrador</option>
                </select>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          {isEditMode && (
            <div className="flex justify-center pb-8">
              <button
                type="submit"
                className="w-full md:w-auto px-12 md:px-16 py-3 md:py-3.5 bg-gradient-to-br from-[#001389] to-[#001389]/80 text-white rounded-2xl font-semibold hover:shadow-xl transition-all"
              >
                {isNewUser ? 'Crear Usuario' : 'Guardar Cambios'}
              </button>
            </div>
          )}
        </form>
      </main>

      {/* Success Toast */}
      <SuccessToast
        message={toastMessage}
        visible={toastVisible}
        onHide={handleToastHide}
      />
    </div>
  );
}