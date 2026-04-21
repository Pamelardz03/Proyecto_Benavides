import { useState } from 'react';
import { Search, User, Bell, Home as HomeIcon, FileText, Users, Phone, Mail, ChevronRight, X } from 'lucide-react';
import { useNavigate } from 'react-router';
import imgBenavides from '../../imports/logo-anterior-convertido-de-svg.png';

type Paciente = {
    id: string;
    nombre: string;
    edad: number;
    telefono: string;
    email: string;
    ultimaVisita: string;
    condicion: string;
};

const pacientes: Paciente[] = [
    { id: '1', nombre: 'Ana García Martínez', edad: 34, telefono: '555-123-4567', email: 'ana.garcia@email.com', ultimaVisita: '14 Abr 2026', condicion: 'Hipertensión' },
    { id: '2', nombre: 'Roberto Sánchez López', edad: 52, telefono: '555-234-5678', email: 'roberto.sanchez@email.com', ultimaVisita: '10 Abr 2026', condicion: 'Diabetes tipo 2' },
    { id: '3', nombre: 'María Fernanda Torres', edad: 28, telefono: '555-345-6789', email: 'mf.torres@email.com', ultimaVisita: '08 Abr 2026', condicion: 'Control general' },
    { id: '4', nombre: 'Jorge Luis Ramírez', edad: 61, telefono: '555-456-7890', email: 'jorge.ramirez@email.com', ultimaVisita: '05 Abr 2026', condicion: 'Cardiopatía' },
    { id: '5', nombre: 'Sofía Mendoza Ríos', edad: 19, telefono: '555-567-8901', email: 'sofia.mendoza@email.com', ultimaVisita: '02 Abr 2026', condicion: 'Control general' },
    { id: '6', nombre: 'Carlos Herrera Vega', edad: 45, telefono: '555-678-9012', email: 'carlos.herrera@email.com', ultimaVisita: '28 Mar 2026', condicion: 'Asma' },
    { id: '7', nombre: 'Laura Castillo Núñez', edad: 37, telefono: '555-789-0123', email: 'laura.castillo@email.com', ultimaVisita: '25 Mar 2026', condicion: 'Migraña crónica' },
    { id: '8', nombre: 'Diego Morales Fuentes', edad: 70, telefono: '555-890-1234', email: 'diego.morales@email.com', ultimaVisita: '20 Mar 2026', condicion: 'Artritis' },
    { id: '9', nombre: 'Valeria Ortiz Peña', edad: 24, telefono: '555-901-2345', email: 'valeria.ortiz@email.com', ultimaVisita: '17 Mar 2026', condicion: 'Anemia' },
    { id: '10', nombre: 'Héctor Villanueva Cruz', edad: 48, telefono: '555-012-3456', email: 'hector.villanueva@email.com', ultimaVisita: '12 Mar 2026', condicion: 'Hipotiroidismo' },
];

export function ColaboradorHome() {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    // Swipe state
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const [swipeOffset, setSwipeOffset] = useState<number>(0);
    const [activeSwipeId, setActiveSwipeId] = useState<string | null>(null);

    // Modals
    const [showCallModal, setShowCallModal] = useState(false);
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [selectedPaciente, setSelectedPaciente] = useState<Paciente | null>(null);
    const [emailMessage, setEmailMessage] = useState('');

    const filteredPacientes = pacientes.filter((p) =>
        p.nombre.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getInitials = (nombre: string) =>
        nombre.split(' ').map((n) => n[0]).slice(0, 2).join('');

    const minSwipeDistance = 50;
    const maxOffset = 120;

    const onTouchStart = (e: React.TouchEvent, id: string) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
        setActiveSwipeId(id);
        setSwipeOffset(0);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        if (!touchStart) return;
        const current = e.targetTouches[0].clientX;
        setTouchEnd(current);
        const offset = current - touchStart;
        setSwipeOffset(Math.max(-maxOffset, Math.min(maxOffset, offset)));
    };

    const onTouchEnd = (paciente: Paciente) => {
        if (!touchStart || !touchEnd) {
            setActiveSwipeId(null);
            setSwipeOffset(0);
            return;
        }
        const distance = touchStart - touchEnd;
        if (distance > minSwipeDistance) {
            // Swipe izquierda → correo
            setSelectedPaciente(paciente);
            setShowEmailModal(true);
        } else if (distance < -minSwipeDistance) {
            // Swipe derecha → llamada
            setSelectedPaciente(paciente);
            setShowCallModal(true);
        }
        setActiveSwipeId(null);
        setSwipeOffset(0);
        setTouchStart(null);
        setTouchEnd(null);
    };

    const resetSwipe = () => {
        setActiveSwipeId(null);
        setSwipeOffset(0);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#E6E8F5] via-white to-[#E6E8F5]">
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#001389] rounded-full opacity-10 blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#D52A1D] rounded-full opacity-10 blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
            </div>

            <header className="sticky top-0 z-40 bg-[#001389] border-b border-[#001389]/60 shadow-lg">
                <div className="max-w-4xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between mb-4">
                        <img src={imgBenavides} alt="Benavides" className="h-10 md:h-12 w-auto" />
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
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar paciente por nombre..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/95 border border-white/60 focus:ring-2 focus:ring-[#001389]/20 transition-all outline-none text-gray-700"
                        />
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 py-10 space-y-6">
                <div className="flex items-center justify-between px-2">
                    <h2 className="text-2xl font-bold text-gray-800">Mis Pacientes</h2>
                    <span className="text-sm text-gray-500 font-medium">{filteredPacientes.length} pacientes</span>
                </div>

                <div className="grid grid-cols-1 gap-4 pb-24 md:pb-10">
                    {filteredPacientes.map((paciente) => {
                        const isActive = activeSwipeId === paciente.id;
                        const offset = isActive ? swipeOffset : 0;
                        return (
                            <div key={paciente.id} className="relative overflow-hidden rounded-[2rem]">
                                {/* Swipe derecha → llamada (verde) */}
                                <div className="absolute left-0 top-0 bottom-0 right-0 bg-green-500 rounded-[2rem] flex items-center justify-start pl-8"
                                    style={{ opacity: offset > 10 ? 1 : 0, transition: 'opacity 0.2s' }}>
                                    <Phone className="w-8 h-8 text-white" />
                                </div>
                                {/* Swipe izquierda → correo (azul) */}
                                <div className="absolute left-0 top-0 bottom-0 right-0 bg-blue-500 rounded-[2rem] flex items-center justify-end pr-8"
                                    style={{ opacity: offset < -10 ? 1 : 0, transition: 'opacity 0.2s' }}>
                                    <Mail className="w-8 h-8 text-white" />
                                </div>

                                <div
                                    onTouchStart={(e) => onTouchStart(e, paciente.id)}
                                    onTouchMove={onTouchMove}
                                    onTouchEnd={() => onTouchEnd(paciente)}
                                    onClick={() => !activeSwipeId && navigate(`/colaborador/paciente/${paciente.id}`)}
                                    className="group flex items-center gap-4 p-5 rounded-[2rem] bg-white shadow-md border border-white hover:shadow-xl hover:scale-[1.01] transition-all duration-300 cursor-pointer"
                                    style={{ transform: `translateX(${offset}px)`, transition: isActive ? 'none' : 'transform 0.3s ease-out' }}
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#001389] to-[#001389]/80 flex items-center justify-center text-white font-bold text-base flex-shrink-0">
                                        {getInitials(paciente.nombre)}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-base font-bold text-gray-900 group-hover:text-[#001389] transition-colors">
                                            {paciente.nombre}
                                        </h3>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <p className="text-sm text-gray-500">{paciente.edad} años</p>
                                            <span className="w-1 h-1 rounded-full bg-gray-300" />
                                            <p className="text-sm font-medium text-[#001389]/70">{paciente.condicion}</p>
                                        </div>
                                        <p className="text-[10px] text-gray-400 mt-0.5 uppercase tracking-widest">
                                            Última visita: {paciente.ultimaVisita}
                                        </p>
                                    </div>
                                    <button onClick={(e) => { e.stopPropagation(); navigate(`/colaborador/paciente/${paciente.id}`); }}
                                        className="p-2.5 rounded-2xl bg-[#001389] text-white hover:bg-[#001389]/90 shadow-lg transition-all flex-shrink-0">
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>

            {/* Bottom nav móvil */}
            <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#001389] border-t border-white/10 shadow-2xl md:hidden">
                <div className="max-w-4xl mx-auto px-4 py-3">
                    <div className="grid grid-cols-4 gap-2">
                        <button className="flex flex-col items-center gap-1 py-2 text-white">
                            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                                <HomeIcon className="w-5 h-5" />
                            </div>
                            <span className="text-xs font-medium">Inicio</span>
                        </button>
                        <button className="flex flex-col items-center gap-1 py-2 text-white/70">
                            <Users className="w-5 h-5" />
                            <span className="text-xs font-medium">Pacientes</span>
                        </button>
                        <button className="flex flex-col items-center gap-1 py-2 text-white/70">
                            <FileText className="w-5 h-5" />
                            <span className="text-xs font-medium">Recetas</span>
                        </button>
                        <button onClick={() => navigate('/')} className="flex flex-col items-center gap-1 py-2 text-white/70">
                            <User className="w-5 h-5" />
                            <span className="text-xs font-medium">Perfil</span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Modal Llamada */}
            {showCallModal && selectedPaciente && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="relative bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl text-center">
                        <button onClick={() => { setShowCallModal(false); resetSwipe(); }} className="absolute top-4 right-4 p-2 rounded-xl hover:bg-gray-100">
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                            <Phone className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-1">Llamar</h3>
                        <p className="text-gray-600 mb-1">{selectedPaciente.nombre}</p>
                        <p className="text-lg font-semibold text-[#001389] mb-6">{selectedPaciente.telefono}</p>
                        <div className="flex gap-3">
                            <button onClick={() => { setShowCallModal(false); resetSwipe(); }}
                                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-2xl font-semibold hover:bg-gray-200 transition-all">
                                Cancelar
                            </button>
                            <a href={`tel:${selectedPaciente.telefono}`}
                                className="flex-1 py-3 bg-green-500 text-white rounded-2xl font-semibold hover:bg-green-600 transition-all flex items-center justify-center gap-2">
                                <Phone className="w-4 h-4" /> Llamar
                            </a>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Correo */}
            {showEmailModal && selectedPaciente && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="relative bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl">
                        <button onClick={() => { setShowEmailModal(false); setEmailMessage(''); resetSwipe(); }} className="absolute top-4 right-4 p-2 rounded-xl hover:bg-gray-100">
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                                <Mail className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-800">Enviar Correo</h3>
                                <p className="text-sm text-gray-500">{selectedPaciente.email}</p>
                            </div>
                        </div>
                        <textarea
                            value={emailMessage}
                            onChange={(e) => setEmailMessage(e.target.value)}
                            placeholder="Escribe tu mensaje..."
                            rows={4}
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-200 outline-none resize-none mb-4 text-sm"
                        />
                        <div className="flex gap-3">
                            <button onClick={() => { setShowEmailModal(false); setEmailMessage(''); resetSwipe(); }}
                                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-2xl font-semibold hover:bg-gray-200 transition-all">
                                Cancelar
                            </button>
                            <button onClick={() => { setShowEmailModal(false); setEmailMessage(''); resetSwipe(); }}
                                disabled={!emailMessage.trim()}
                                className="flex-1 py-3 bg-blue-500 text-white rounded-2xl font-semibold hover:bg-blue-600 transition-all disabled:opacity-50">
                                Enviar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}