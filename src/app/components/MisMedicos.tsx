import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Calendar, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

type Cita = {
  id: string;
  fecha: string;
  hora: string;
  estado: 'completada' | 'cancelada' | 'proxima';
  motivo: string;
};

type Medico = {
  id: string;
  nombre: string;
  especialidad: string;
  imagen: string;
  ultimasCitas: Cita[];
};

export function MisMedicos() {
  const navigate = useNavigate();

  const medicos: Medico[] = [
    {
      id: '1',
      nombre: 'Dr. Carlos Mendoza',
      especialidad: 'Cardiólogo',
      imagen: 'https://images.unsplash.com/photo-1615177393114-bd2917a4f74a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkb2N0b3IlMjBwb3J0cmFpdCUyMG1hbGV8ZW58MXx8fHwxNzc2MzEwNTQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      ultimasCitas: [
        {
          id: 'c1',
          fecha: '25 Abr 2026',
          hora: '10:00 AM',
          estado: 'proxima',
          motivo: 'Control anual',
        },
        {
          id: 'c2',
          fecha: '15 Mar 2026',
          hora: '10:00 AM',
          estado: 'completada',
          motivo: 'Chequeo general',
        },
        {
          id: 'c3',
          fecha: '10 Feb 2026',
          hora: '3:30 PM',
          estado: 'completada',
          motivo: 'Seguimiento',
        },
      ],
    },
    {
      id: '2',
      nombre: 'Dra. Ana García',
      especialidad: 'Dermatóloga',
      imagen: 'https://images.unsplash.com/photo-1713865467253-ce0ac8477d34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBkb2N0b3IlMjBwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzYyNTI5Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      ultimasCitas: [
        {
          id: 'c4',
          fecha: '20 Mar 2026',
          hora: '2:00 PM',
          estado: 'completada',
          motivo: 'Consulta de piel',
        },
        {
          id: 'c5',
          fecha: '5 Ene 2026',
          hora: '11:00 AM',
          estado: 'cancelada',
          motivo: 'Revisión acné',
        },
      ],
    },
  ];

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case 'completada':
        return (
          <div className="flex items-center gap-1 text-green-600">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-xs font-medium">Completada</span>
          </div>
        );
      case 'cancelada':
        return (
          <div className="flex items-center gap-1 text-red-600">
            <XCircle className="w-4 h-4" />
            <span className="text-xs font-medium">Cancelada</span>
          </div>
        );
      case 'proxima':
        return (
          <div className="flex items-center gap-1 text-yellow-600">
            <Clock className="w-4 h-4" />
            <span className="text-xs font-medium">Próxima</span>
          </div>
        );
      default:
        return null;
    }
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
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/cliente/home')}
              className="p-2 rounded-xl hover:bg-white/10 transition-all"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <h1 className="text-xl font-bold text-white">Mis Médicos</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 py-6 pb-24">
        <div className="space-y-4">
          {medicos.map((medico) => (
            <div
              key={medico.id}
              className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-lg border border-white/60 p-6 hover:shadow-2xl transition-all duration-300"
            >
              {/* Médico Info */}
              <div className="flex items-center gap-4 mb-6">
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
              </div>

              {/* Últimas Citas */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Citas</h3>
                {medico.ultimasCitas.map((cita) => (
                  <div
                    key={cita.id}
                    className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 border border-white/60"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#001389]" />
                        <span className="text-sm font-medium text-gray-800">{cita.fecha}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{cita.hora}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm text-gray-600 flex-1">{cita.motivo}</p>
                      <div className="flex-shrink-0">
                        {getEstadoBadge(cita.estado)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <button 
                onClick={() => navigate(`/cliente/administrar-permisos/${medico.id}`)}
                className="w-full mt-4 py-3 bg-gradient-to-r from-[#001389] to-[#001389]/90 text-white rounded-xl font-medium hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Administrar Permisos
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}