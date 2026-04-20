import { ArrowLeft, Pill, Stethoscope, AlertCircle, Scissors, ClipboardList, Phone, Mail, Calendar, MapPin, Droplets, Ruler, Weight } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';

export type PacienteDetalle = {
  nombre: string;
  edad: number;
  condicion: string;
  ultimaVisita: string;
  fechaNacimiento: string;
  telefono: string;
  email: string;
  sexo: string;
  tipoSangre: string;
  peso: string;
  altura: string;
  direccion: string;
  alergias: string;
  seguro: string;
};

export const pacientesData: Record<string, PacienteDetalle> = {
  '1': {
    nombre: 'Ana García Martínez', edad: 34, condicion: 'Hipertensión', ultimaVisita: '14 Abr 2026',
    fechaNacimiento: '12 Mar 1992', telefono: '555-123-4567', email: 'ana.garcia@email.com',
    sexo: 'Femenino', tipoSangre: 'A+', peso: '62 kg', altura: '1.65 m',
    direccion: 'Av. Insurgentes 1200, CDMX', alergias: 'Penicilina', seguro: 'IMSS',
  },
  '2': {
    nombre: 'Roberto Sánchez López', edad: 52, condicion: 'Diabetes tipo 2', ultimaVisita: '10 Abr 2026',
    fechaNacimiento: '08 Jun 1973', telefono: '555-234-5678', email: 'roberto.sanchez@email.com',
    sexo: 'Masculino', tipoSangre: 'O+', peso: '88 kg', altura: '1.75 m',
    direccion: 'Calle Reforma 450, Monterrey', alergias: 'Ninguna conocida', seguro: 'ISSSTE',
  },
  // ... puedes agregar los demás pacientes aquí
};

type Bloque = {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  colorBg: string;
};

const bloques: Bloque[] = [
  { id: 'tratamientos', label: 'Tratamientos', icon: <Pill className="w-9 h-9" />, color: 'text-[#001389]', colorBg: 'bg-[#001389]/10' },
  { id: 'enfermedades', label: 'Enfermedades', icon: <Stethoscope className="w-9 h-9" />, color: 'text-[#D52A1D]', colorBg: 'bg-[#D52A1D]/10' },
  { id: 'alergias', label: 'Alergias', icon: <AlertCircle className="w-9 h-9" />, color: 'text-amber-600', colorBg: 'bg-amber-50' },
  { id: 'cirugias', label: 'Cirugías', icon: <Scissors className="w-9 h-9" />, color: 'text-[#001389]', colorBg: 'bg-[#001389]/10' },
  { id: 'antecedentes', label: 'Antecedentes', icon: <ClipboardList className="w-9 h-9" />, color: 'text-[#D52A1D]', colorBg: 'bg-[#D52A1D]/10' },
];

export function DetallePaciente() {
  const navigate = useNavigate();
  const { id } = useParams();
  const p = pacientesData[id ?? ''] ?? pacientesData['1'];

  const getInitials = (n: string) => n.split(' ').map((x) => x[0]).slice(0, 2).join('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E6E8F5] via-white to-[#E6E8F5]">
      {/* BG blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#001389] rounded-full opacity-10 blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#D52A1D] rounded-full opacity-10 blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
      </div>

      {/* Header Sólido - Corrección para la sombra al hacer scroll */}
      <header className="sticky top-0 z-[100] bg-[#001389] shadow-md border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
          <button
            onClick={() => navigate('/empleado/home')}
            className="p-2 rounded-xl hover:bg-white/10 transition-all"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-lg font-bold text-white truncate">Detalle del Paciente</h1>
        </div>
      </header>

      <main className="relative z-10 max-w-3xl mx-auto px-4 py-6 pb-10 space-y-5">
        {/* Tarjeta principal */}
        <div className="p-6 rounded-3xl bg-white border border-white/60 shadow-lg space-y-5">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#001389] to-[#001389]/70 flex items-center justify-center text-white font-bold text-2xl flex-shrink-0 shadow-lg">
              {getInitials(p.nombre)}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold text-gray-800 leading-tight">{p.nombre}</h2>
              <span className="inline-block mt-1 px-3 py-0.5 rounded-full text-xs font-semibold bg-[#001389]/10 text-[#001389]">
                {p.condicion}
              </span>
              <p className="text-xs text-gray-400 mt-1">Última visita: <span className="font-medium text-gray-600">{p.ultimaVisita}</span></p>
            </div>
          </div>

          <div className="border-t border-gray-100" />

          <div className="grid grid-cols-2 gap-3">
            <InfoChip icon={<Calendar className="w-4 h-4" />} label="Nacimiento" value={p.fechaNacimiento} />
            <InfoChip icon={<span className="text-sm font-bold">♂♀</span>} label="Sexo" value={p.sexo} />
            <InfoChip icon={<Droplets className="w-4 h-4" />} label="Tipo de sangre" value={p.tipoSangre} accent />
            <InfoChip icon={<span className="text-xs font-semibold">Seg.</span>} label="Seguro" value={p.seguro} />
            <InfoChip icon={<Weight className="w-4 h-4" />} label="Peso" value={p.peso} />
            <InfoChip icon={<Ruler className="w-4 h-4" />} label="Altura" value={p.altura} />
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-amber-50 border border-amber-100">
            <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
            <div>
              <p className="text-xs font-semibold text-amber-700">Alergias conocidas</p>
              <p className="text-sm text-amber-800">{p.alergias}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-gray-600">{p.direccion}</p>
          </div>

          <div className="flex gap-3">
            <a href={`tel:${p.telefono}`} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-[#001389]/10 hover:bg-[#001389]/20 transition-all text-[#001389] text-sm font-medium">
              <Phone className="w-4 h-4" /> {p.telefono}
            </a>
            <a href={`mailto:${p.email}`} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-[#D52A1D]/10 hover:bg-[#D52A1D]/20 transition-all text-[#D52A1D] text-sm font-medium">
              <Mail className="w-4 h-4" /> Correo
            </a>
          </div>
        </div>

        <h3 className="text-base font-bold text-gray-700 px-1">Expediente médico</h3>
        <div className="grid grid-cols-2 gap-4">
          {bloques.map((bloque, index) => {
            const isLast = index === bloques.length - 1;
            const isOddTotal = bloques.length % 2 !== 0;
            return (
              <button
                key={bloque.id}
                onClick={() => navigate(`/empleado/paciente/${id}/${bloque.id}`)}
                className={`relative p-6 rounded-3xl bg-white/50 border border-white/60 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex flex-col items-center justify-center gap-4 min-h-[160px]
                  ${isLast && isOddTotal ? 'col-span-2 max-w-[calc(50%-8px)] mx-auto w-full' : ''}`}
              >
                <div className={`${bloque.colorBg} p-4 rounded-2xl ${bloque.color}`}>
                  {bloque.icon}
                </div>
                <span className="text-sm font-medium text-gray-800 text-center">{bloque.label}</span>
                <div className={`absolute bottom-4 right-4 ${bloque.color}`}>
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                </div>
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
}

function InfoChip({ icon, label, value, accent }: { icon: React.ReactNode; label: string; value: string; accent?: boolean }) {
  return (
    <div className={`flex items-center gap-2.5 p-3 rounded-2xl ${accent ? 'bg-red-50 border border-red-100' : 'bg-gray-50 border border-gray-100'}`}>
      <span className={accent ? 'text-[#D52A1D]' : 'text-gray-400'}>{icon}</span>
      <div className="min-w-0">
        <p className="text-xs text-gray-400 leading-none mb-0.5">{label}</p>
        <p className={`text-sm font-semibold truncate ${accent ? 'text-[#D52A1D]' : 'text-gray-700'}`}>{value}</p>
      </div>
    </div>
  );
}