import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, Shield, Check } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

type Permiso = {
  id: string;
  nombre: string;
  descripcion: string;
  activo: boolean;
};

export function AdministrarPermisos() {
  const navigate = useNavigate();
  const { medicoId } = useParams();

  // Datos del médico según el ID
  const medicosData: Record<string, { nombre: string; especialidad: string; imagen: string }> = {
    '1': {
      nombre: 'Dr. Carlos Mendoza',
      especialidad: 'Cardiólogo',
      imagen: 'https://images.unsplash.com/photo-1615177393114-bd2917a4f74a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkb2N0b3IlMjBwb3J0cmFpdCUyMG1hbGV8ZW58MXx8fHwxNzc2MzEwNTQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    '2': {
      nombre: 'Dra. Ana García',
      especialidad: 'Dermatóloga',
      imagen: 'https://images.unsplash.com/photo-1713865467253-ce0ac8477d34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBkb2N0b3IlMjBwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzYyNTI5Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
  };

  const medico = medicosData[medicoId || '1'];

  const [permisos, setPermisos] = useState<Permiso[]>([
    {
      id: 'historial-medico',
      nombre: 'Historial Médico Completo',
      descripcion: 'Acceso a todo tu historial médico y diagnósticos previos',
      activo: true,
    },
    {
      id: 'recetas',
      nombre: 'Recetas y Medicamentos',
      descripcion: 'Ver y gestionar tus recetas médicas actuales y pasadas',
      activo: true,
    },
    {
      id: 'examenes',
      nombre: 'Resultados de Exámenes',
      descripcion: 'Acceso a resultados de laboratorio y estudios médicos',
      activo: true,
    },
    {
      id: 'alergias',
      nombre: 'Alergias y Reacciones',
      descripcion: 'Información sobre alergias conocidas y reacciones adversas',
      activo: true,
    },
    {
      id: 'contacto',
      nombre: 'Información de Contacto',
      descripcion: 'Teléfono, correo electrónico y dirección',
      activo: false,
    },
    {
      id: 'familiar',
      nombre: 'Historial Familiar',
      descripcion: 'Antecedentes médicos de familiares directos',
      activo: false,
    },
  ]);

  const togglePermiso = (id: string) => {
    setPermisos(permisos.map(p => 
      p.id === id ? { ...p, activo: !p.activo } : p
    ));
  };

  const handleGuardar = () => {
    console.log('Permisos guardados:', permisos);
    navigate('/cliente/mis-medicos');
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
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/cliente/mis-medicos')}
              className="p-2 rounded-xl hover:bg-white/10 transition-all"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <h1 className="text-xl font-bold text-white">Administrar Permisos</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 py-6 pb-24">
        {/* Médico Info Card */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-lg border border-white/60 p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg flex-shrink-0">
              <ImageWithFallback
                src={medico.imagen}
                alt={medico.nombre}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-gray-800">{medico.nombre}</h2>
              <p className="text-sm text-[#001389] font-medium">{medico.especialidad}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#001389]/20 to-[#D52A1D]/20 flex items-center justify-center">
              <Shield className="w-6 h-6 text-[#001389]" />
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Gestiona qué información puede ver y acceder este médico en tu perfil de salud.
          </p>
        </div>

        {/* Permisos List */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-lg border border-white/60 p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Permisos de Acceso</h3>
          <div className="space-y-3">
            {permisos.map((permiso) => (
              <div
                key={permiso.id}
                className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 border border-white/60 hover:shadow-md transition-all duration-300"
              >
                <label className="flex items-start gap-4 cursor-pointer">
                  <div className="relative flex-shrink-0 mt-1">
                    <input
                      type="checkbox"
                      checked={permiso.activo}
                      onChange={() => togglePermiso(permiso.id)}
                      className="sr-only peer"
                    />
                    <div className={`w-6 h-6 rounded-lg border-2 transition-all duration-300 flex items-center justify-center ${
                      permiso.activo 
                        ? 'bg-[#001389] border-[#001389]' 
                        : 'bg-white border-gray-300'
                    }`}>
                      {permiso.activo && <Check className="w-4 h-4 text-white" />}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 mb-1">{permiso.nombre}</h4>
                    <p className="text-sm text-gray-600">{permiso.descripcion}</p>
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => navigate('/cliente/mis-medicos')}
            className="flex-1 py-4 bg-white/70 backdrop-blur-sm border border-white/60 text-gray-700 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
          >
            Cancelar
          </button>
          <button
            onClick={handleGuardar}
            className="flex-1 py-4 bg-gradient-to-r from-[#001389] to-[#001389]/90 text-white rounded-xl font-medium hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Guardar Cambios
          </button>
        </div>
      </main>
    </div>
  );
}
