import { ArrowLeft, FileText, ImageIcon, Download, Eye } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';

type Archivo = {
  id: string;
  nombre: string;
  tipo: 'pdf' | 'imagen';
  fecha: string;
  tamano: string;
};

const archivosMuestra: Archivo[] = [
  { id: '1', nombre: 'Resultados_sangre_Abr2026.pdf', tipo: 'pdf', fecha: '14 Abr 2026', tamano: '1.2 MB' },
  { id: '2', nombre: 'Radiografia_torax_Mar2026.png', tipo: 'imagen', fecha: '20 Mar 2026', tamano: '3.5 MB' },
  { id: '3', nombre: 'Electrocardiograma_Feb2026.pdf', tipo: 'pdf', fecha: '08 Feb 2026', tamano: '0.8 MB' },
  { id: '4', nombre: 'Ultrasonido_abdominal.png', tipo: 'imagen', fecha: '15 Ene 2026', tamano: '4.1 MB' },
  { id: '5', nombre: 'Receta_medica_Dic2025.pdf', tipo: 'pdf', fecha: '02 Dic 2025', tamano: '0.3 MB' },
];

export function ArchivosAdjuntos() {
  const navigate = useNavigate();
  // Capturamos id (paciente), apartado (tratamientos, etc.) e itemId (la receta/enfermedad específica)
  const { id, apartado, itemId } = useParams();

  // Función para capitalizar el título del apartado (ej: tratamientos -> Tratamientos)
  const tituloApartado = apartado ? apartado.charAt(0).toUpperCase() + apartado.slice(1) : 'Archivos';

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E6E8F5] via-white to-[#E6E8F5]">
      {/* Efectos de fondo dinámicos */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#001389] rounded-full opacity-10 blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#D52A1D] rounded-full opacity-10 blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
      </div>

      {/* Header con navegación dinámica */}
      <header className="sticky top-0 z-40 bg-[#001389] backdrop-blur-xl shadow-lg">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
          <button
            onClick={() => navigate(`/colaborador/paciente/${id}/${apartado}`)}
            className="p-2 rounded-xl hover:bg-white/10 transition-all"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-white">Archivos Adjuntos</h1>
            <p className="text-[10px] text-white/60 uppercase tracking-widest">{tituloApartado}</p>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-3xl mx-auto px-4 py-6 pb-10 space-y-4">
        {/* Contador dinámico */}
        <div className="flex items-center justify-between px-1">
          <p className="text-sm text-gray-500">
            {archivosMuestra.length} archivos encontrados
          </p>
          <span className="text-[10px] bg-gray-200 text-gray-600 px-2 py-0.5 rounded-md font-mono">
            ID: {itemId}
          </span>
        </div>

        {/* Lista de archivos */}
        <div className="space-y-3">
          {archivosMuestra.map((archivo) => (
            <div
              key={archivo.id}
              className="flex items-center gap-4 p-4 rounded-3xl bg-white/60 backdrop-blur-sm border border-white/60 shadow-xl hover:shadow-2xl transition-all group"
            >
              {/* Icono según tipo */}
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 ${
                archivo.tipo === 'pdf' ? 'bg-[#D52A1D]/10' : 'bg-[#001389]/10'
              }`}>
                {archivo.tipo === 'pdf' 
                  ? <FileText className="w-6 h-6 text-[#D52A1D]" /> 
                  : <ImageIcon className="w-6 h-6 text-[#001389]" />
                }
              </div>

              {/* Información del archivo */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">{archivo.nombre}</p>
                <p className="text-xs text-gray-400 mt-0.5">{archivo.fecha} · {archivo.tamano}</p>
                <span className={`inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                  archivo.tipo === 'pdf' ? 'bg-[#D52A1D]/10 text-[#D52A1D]' : 'bg-[#001389]/10 text-[#001389]'
                }`}>
                  {archivo.tipo}
                </span>
              </div>

              {/* Acciones */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 transition-all" title="Ver archivo">
                  <Eye className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-2.5 rounded-xl bg-[#001389]/10 hover:bg-[#001389]/20 transition-all" title="Descargar">
                  <Download className="w-4 h-4 text-[#001389]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}