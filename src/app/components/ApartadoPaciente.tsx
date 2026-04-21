import { ArrowLeft, Search, FileText, ChevronRight, Plus, Pencil, X, Check } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { pacientesData } from './DetallePaciente';

// ── Datos de prueba por apartado ──
const datosApartadosIniciales: Record<string, Record<string, Item[]>> = {
  tratamientos: {
    '1': [
      { id: 't1', titulo: 'Enalapril 10 mg', subtitulo: 'Diagnóstico: Hipertensión esencial', extras: ['Estado: Activo', 'Inicio: 01 Ene 2026', 'Fin estimado: 01 Ene 2027', 'Médico: Dr. Pérez Olvera'] },
      { id: 't2', titulo: 'Hidroclorotiazida 25 mg', subtitulo: 'Diagnóstico: Retención de líquidos', extras: ['Estado: Activo', 'Inicio: 15 Feb 2026', 'Fin estimado: 15 Ago 2026', 'Médico: Dr. Pérez Olvera'] },
    ],
    '2': [
      { id: 't1', titulo: 'Metformina 850 mg', subtitulo: 'Diagnóstico: Diabetes tipo 2', extras: ['Estado: Activo', 'Inicio: 10 Mar 2025', 'Fin estimado: Indefinido', 'Médico: Dra. Torres Vega'] },
    ],
    default: [
      { id: 't1', titulo: 'Amoxicilina 500 mg VO', subtitulo: 'Diagnóstico: Infección vías respiratorias', extras: ['Estado: Activo', 'Inicio: 02 Oct 2025', 'Fin estimado: 09 Oct 2025', 'Médico: Dra. Laura Martínez'] },
      { id: 't2', titulo: 'Paracetamol 500 mg', subtitulo: 'Diagnóstico: Control de fiebre', extras: ['Estado: Completado', 'Inicio: 01 Sep 2025', 'Fin estimado: 07 Sep 2025', 'Médico: Dra. Laura Martínez'] },
    ],
  },
  enfermedades: {
    '1': [
      { id: 'e1', titulo: 'Hipertensión esencial', subtitulo: 'Estado: Controlado', extras: ['Última revisión: 14 Abr 2026', 'Presión: 130/85 mmHg', 'Tratamiento: Enalapril 10 mg'] },
    ],
    '2': [
      { id: 'e1', titulo: 'Diabetes tipo 2', subtitulo: 'Estado: Controlado', extras: ['Última revisión: 10 Abr 2026', 'Glucosa: 110 mg/dL', 'Tratamiento: Metformina 850 mg cada 8 h'] },
      { id: 'e2', titulo: 'Dislipidemia', subtitulo: 'Estado: En seguimiento', extras: ['Última revisión: 10 Abr 2026', 'Colesterol: 220 mg/dL', 'Tratamiento: Atorvastatina 20 mg'] },
    ],
    default: [
      { id: 'e1', titulo: 'Diabetes tipo 2', subtitulo: 'Estado: Controlado', extras: ['Última revisión: 02 Oct 2025', 'Glucosa: 110 mg/dL', 'Tratamiento: Metformina 850 mg cada 8 h'] },
    ],
  },
  alergias: {
    '1': [
      { id: 'a1', titulo: 'Alergia a la Penicilina', subtitulo: 'Gravedad: Severa', extras: ['Tratamiento: Epinefrina autoinyectable', 'Reacción: Anafilaxia'] },
    ],
    '3': [
      { id: 'a1', titulo: 'Alergia a las cefalosporinas', subtitulo: 'Gravedad: Moderada', extras: ['Tratamiento: Antihistamínico oral', 'Reacción: Urticaria'] },
    ],
    default: [
      { id: 'a1', titulo: 'Alergia a la penicilina', subtitulo: 'Gravedad: Leve', extras: ['Tratamiento: Antihistamínico oral', 'Reacción: Erupción cutánea'] },
      { id: 'a2', titulo: 'Alergia a las cefalosporinas', subtitulo: 'Gravedad: Moderada', extras: ['Tratamiento: Epinefrina autoinyectable', 'Reacción: Urticaria generalizada'] },
    ],
  },
  cirugias: {
    '4': [
      { id: 'c1', titulo: 'Bypass coronario', subtitulo: 'Fecha: 10 Jun 2020', extras: ['Centro: Hospital Ángeles', 'Doctor: Dr. Ramírez Rodríguez', 'Estado actual: Recuperado', 'Tratamiento actual: Aspirina 100 mg'] },
    ],
    default: [
      { id: 'c1', titulo: 'Apendicectomía', subtitulo: 'Fecha: 12 Mar 2022', extras: ['Centro: Hospital Zambrano Hellion', 'Doctor: Dr. Ramírez Rodríguez', 'Estado actual: Recuperado', 'Tratamiento actual: Ninguno'] },
      { id: 'c2', titulo: 'Artroscopia de rodilla derecha', subtitulo: 'Fecha: 20 Ago 2023', extras: ['Centro: Hospital La Conchita', 'Doctor: Dr. Galván Navarro', 'Estado actual: En tratamiento', 'Tratamiento actual: Paracetamol'] },
    ],
  },
  antecedentes: {
    '2': [
      { id: 'an1', titulo: 'Diabetes tipo 2', subtitulo: 'Parentesco: Padre', extras: ['Riesgo: Alto', 'Edad de diagnóstico: 50 años'] },
      { id: 'an2', titulo: 'Hipertensión', subtitulo: 'Parentesco: Madre', extras: ['Riesgo: Moderado', 'Edad de diagnóstico: 55 años'] },
    ],
    default: [
      { id: 'an1', titulo: 'Alzheimer', subtitulo: 'Parentesco: Padre', extras: ['Riesgo: Moderado', 'Edad de diagnóstico: 52 años'] },
      { id: 'an2', titulo: 'Diabetes tipo 2', subtitulo: 'Parentesco: Madre', extras: ['Riesgo: Alto', 'Edad de diagnóstico: 42 años'] },
    ],
  },
};

type Item = {
  id: string;
  titulo: string;
  subtitulo: string;
  extras: string[];
};

const apartadoConfig: Record<string, { label: string; accentColor: string; btnColor: string }> = {
  tratamientos:  { label: 'Tratamientos',  accentColor: 'text-[#001389]', btnColor: 'bg-[#D52A1D] hover:bg-[#D52A1D]/90' },
  enfermedades:  { label: 'Enfermedades',  accentColor: 'text-[#001389]', btnColor: 'bg-[#D52A1D] hover:bg-[#D52A1D]/90' },
  alergias:      { label: 'Alergias',      accentColor: 'text-amber-700', btnColor: 'bg-amber-500 hover:bg-amber-600' },
  cirugias:      { label: 'Cirugías',      accentColor: 'text-[#001389]', btnColor: 'bg-[#D52A1D] hover:bg-[#D52A1D]/90' },
  antecedentes:  { label: 'Antecedentes',  accentColor: 'text-[#001389]', btnColor: 'bg-[#001389] hover:bg-[#001389]/90' },
};

// ── Modal de editar/agregar ──
function ItemModal({
  item,
  onClose,
  onSave,
  isNew,
}: {
  item: Item;
  onClose: () => void;
  onSave: (item: Item) => void;
  isNew: boolean;
}) {
  const [form, setForm] = useState<Item>({ ...item });

  const updateExtra = (index: number, value: string) => {
    const newExtras = [...form.extras];
    newExtras[index] = value;
    setForm({ ...form, extras: newExtras });
  };

  const addExtra = () => setForm({ ...form, extras: [...form.extras, 'Campo: Valor'] });
  const removeExtra = (index: number) => setForm({ ...form, extras: form.extras.filter((_, i) => i !== index) });

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Modal header */}
        <div className="bg-[#001389] px-5 py-4 flex items-center justify-between">
          <h2 className="text-white font-bold text-base">{isNew ? 'Agregar registro' : 'Editar registro'}</h2>
          <button onClick={onClose} className="p-1.5 rounded-xl hover:bg-white/10 transition-all">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Modal body */}
        <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Título</label>
            <input
              value={form.titulo}
              onChange={(e) => setForm({ ...form, titulo: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#001389]/40 focus:ring-2 focus:ring-[#001389]/10 outline-none text-sm"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Subtítulo</label>
            <input
              value={form.subtitulo}
              onChange={(e) => setForm({ ...form, subtitulo: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#001389]/40 focus:ring-2 focus:ring-[#001389]/10 outline-none text-sm"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Detalles</label>
              <button onClick={addExtra} className="text-xs text-[#001389] font-semibold flex items-center gap-1 hover:underline">
                <Plus className="w-3 h-3" /> Agregar campo
              </button>
            </div>
            {form.extras.map((extra, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  value={extra}
                  onChange={(e) => updateExtra(i, e.target.value)}
                  className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:border-[#001389]/40 outline-none text-sm"
                />
                <button onClick={() => removeExtra(i)} className="p-2 rounded-xl hover:bg-red-50 transition-all">
                  <X className="w-4 h-4 text-red-400" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Modal footer */}
        <div className="px-5 pb-5 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition-all"
          >
            Cancelar
          </button>
          <button
            onClick={() => onSave(form)}
            className="flex-1 py-2.5 rounded-xl bg-[#001389] text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#001389]/90 transition-all"
          >
            <Check className="w-4 h-4" /> Guardar
          </button>
        </div>
      </div>
    </div>
  );
}

export function ApartadoPaciente() {
  const navigate = useNavigate();
  const { id, apartado } = useParams<{ id: string; apartado: string }>();
  const [searchQuery, setSearchQuery] = useState('');

  // Estado local de los items (inicializado desde los datos de prueba)
  const grupoInicial = datosApartadosIniciales[apartado ?? ''] ?? {};
  const itemsIniciales: Item[] = grupoInicial[id ?? ''] ?? grupoInicial['default'] ?? [];
  const [items, setItems] = useState<Item[]>(itemsIniciales);

  // Estado del modal
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [isNew, setIsNew] = useState(false);

  const config = apartadoConfig[apartado ?? ''] ?? { label: apartado, accentColor: 'text-[#001389]', btnColor: 'bg-[#D52A1D]' };
  const paciente = pacientesData[id ?? ''] ?? pacientesData['1'];

  const filteredItems = items.filter(
    (item) =>
      item.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitulo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (item: Item) => {
    setEditingItem(item);
    setIsNew(false);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setEditingItem({ id: `new-${Date.now()}`, titulo: '', subtitulo: '', extras: [] });
    setIsNew(true);
    setModalOpen(true);
  };

  const handleSave = (updated: Item) => {
    if (isNew) {
      setItems([...items, updated]);
    } else {
      setItems(items.map((i) => (i.id === updated.id ? updated : i)));
    }
    setModalOpen(false);
    setEditingItem(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E6E8F5] via-white to-[#E6E8F5]">
      {/* BG blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#001389] rounded-full opacity-10 blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#D52A1D] rounded-full opacity-10 blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#001389] backdrop-blur-xl shadow-lg">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
          <button onClick={() => navigate(`/colaborador/paciente/${id}`)} className="p-2 rounded-xl hover:bg-white/10 transition-all">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-lg font-bold text-white flex-1">{config.label}</h1>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 transition-all text-white text-sm font-semibold"
          >
            <Plus className="w-4 h-4" />
            Agregar
          </button>
        </div>
      </header>

      <main className="relative z-10 max-w-3xl mx-auto px-4 py-5 pb-10 space-y-4">
        {/* Mini patient chip */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/60 shadow">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#001389] to-[#001389]/70 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {paciente.nombre.split(' ').map((n: string) => n[0]).slice(0, 2).join('')}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-800 truncate">{paciente.nombre}</p>
            <p className="text-xs text-gray-500">{paciente.edad} años · {paciente.condicion}</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/80 backdrop-blur-sm border border-white/60 focus:border-[#001389]/40 focus:ring-2 focus:ring-[#001389]/10 transition-all outline-none shadow"
          />
        </div>

        {/* Items list */}
        <div className="space-y-3">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div key={item.id} className="p-5 rounded-3xl bg-white/60 backdrop-blur-sm border border-white/60 shadow-xl">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className={`font-bold text-base ${config.accentColor}`}>{item.titulo}</h3>
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-1.5 rounded-lg hover:bg-gray-100 transition-all flex-shrink-0"
                    title="Editar"
                  >
                    <Pencil className="w-4 h-4 text-gray-400 hover:text-[#001389]" />
                  </button>
                </div>
                <p className="text-sm text-gray-600 mb-2">{item.subtitulo}</p>
                {item.extras.map((extra, i) => (
                  <p key={i} className="text-xs text-gray-500 leading-relaxed">
                    <span className="font-medium text-gray-600">{extra.split(':')[0]}:</span>
                    {extra.includes(':') ? extra.substring(extra.indexOf(':') + 1) : ''}
                  </p>
                ))}
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => navigate(`/colaborador/paciente/${id}/${apartado}/${item.id}/archivos`)}
                    className={`flex items-center gap-2 px-5 py-2 rounded-full text-white text-sm font-semibold shadow transition-all ${config.btnColor}`}
                  >
                    <FileText className="w-4 h-4" />
                    Ver Detalles
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-14">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-white/50 border border-white/60 flex items-center justify-center">
                <ChevronRight className="w-8 h-8 text-gray-300" />
              </div>
              <p className="text-gray-500 font-medium">Sin registros encontrados</p>
              <button
                onClick={handleAdd}
                className="mt-4 flex items-center gap-2 mx-auto px-5 py-2 rounded-full bg-[#001389] text-white text-sm font-semibold"
              >
                <Plus className="w-4 h-4" /> Agregar primero
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Modal */}
      {modalOpen && editingItem && (
        <ItemModal
          item={editingItem}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
          isNew={isNew}
        />
      )}
    </div>
  );
}