import { useState } from 'react';
import { Search, User, Bell, Home as HomeIcon, FileText, Users, Phone, Mail, ChevronRight } from 'lucide-react';
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

export function colaboradorHome() {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const filteredPacientes = pacientes.filter((p) =>
        p.nombre.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getInitials = (nombre: string) =>
        nombre.split(' ').map((n) => n[0]).slice(0, 2).join('');

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#E6E8F5] via-white to-[#E6E8F5]">
            {/* Liquid Glass Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#001389] rounded-full opacity-10 blur-3xl animate-pulse"
                    style={{ animationDuration: '4s' }}></div>
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#D52A1D] rounded-full opacity-10 blur-3xl animate-pulse"
                    style={{ animationDuration: '6s', animationDelay: '1s' }}></div>
            </div>

            {/* Header - Ajustado para que el buscador no sea infinito en PC */}
            <header className="sticky top-0 z-40 bg-[#001389] border-b border-[#001389]/60 shadow-lg">
                <div className="max-w-4xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between mb-4">
                        <img src={imgBenavides} alt="Benavides" className="h-10 md:h-12 w-auto" />
                        <div className="flex items-center gap-3">
                            <button className="relative p-2 rounded-xl hover:bg-white/10 transition-all">
                                <Bell className="w-6 h-6 text-white" />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-[#D52A1D] rounded-full"></span>
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

            {/* Main Content - Centrado y con ancho máximo para PC */}
            <main className="max-w-4xl mx-auto px-6 py-10 space-y-6">
                <div className="flex items-center justify-between px-2">
                    <h2 className="text-2xl font-bold text-gray-800">Mis Pacientes</h2>
                    <span className="text-sm text-gray-500 font-medium">{filteredPacientes.length} pacientes</span>
                </div>

                {/* Lista de tarjetas */}
                <div className="grid grid-cols-1 gap-4 pb-24 md:pb-10">
                    {filteredPacientes.map((paciente) => (
                        <div
                            key={paciente.id}
                            className="group flex items-center gap-6 p-5 rounded-[2rem] bg-white shadow-md border border-white hover:shadow-xl hover:scale-[1.01] transition-all duration-300 cursor-pointer"
                        >
                            {/* Avatar */}
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#001389] to-[#001389]/80 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                                {getInitials(paciente.nombre)}
                            </div>

                            {/* Información */}
                            <div className="flex-1 min-w-0">
                                <h3 className="text-base font-bold text-gray-900 group-hover:text-[#001389] transition-colors truncate">
                                    {paciente.nombre}
                                </h3>
                                <div className="flex items-center gap-3 mt-1">
                                    <p className="text-sm text-gray-500">{paciente.edad} años</p>
                                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                                    <p className="text-sm font-medium text-[#001389]/70">{paciente.condicion}</p>
                                </div>
                                <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest">
                                    Última visita: {paciente.ultimaVisita}
                                </p>
                            </div>

                            {/* Acciones */}
                            <div className="flex items-center gap-2">
                                <a href={`tel:${paciente.telefono}`} className="p-3 rounded-2xl bg-gray-50 text-gray-400 hover:bg-[#001389]/10 hover:text-[#001389] transition-all">
                                    <Phone className="w-5 h-5" />
                                </a>
                                <button className="p-3 rounded-2xl bg-gray-50 text-gray-400 hover:bg-[#D52A1D]/10 hover:text-[#D52A1D] transition-all">
                                    <Mail className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => navigate(`/colaborador/paciente/${paciente.id}`)}
                                    className="ml-2 p-3 rounded-2xl bg-[#001389] text-white hover:bg-[#001389]/90 shadow-lg transition-all"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Bottom Navigation - Se oculta en PC para no estorbar el diseño */}
            <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#001389] border-t border-white/10 shadow-2xl md:hidden">
                <div className="max-w-7xl mx-auto px-4 py-3">
                    <div className="grid grid-cols-4 gap-2">
                        <button className="flex flex-col items-center gap-1 py-2 text-white">
                            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                                <HomeIcon className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-medium">Inicio</span>
                        </button>
                        <button className="flex flex-col items-center gap-1 py-2 text-white/70">
                            <Users className="w-6 h-6" />
                            <span className="text-xs font-medium">Pacientes</span>
                        </button>
                        <button className="flex flex-col items-center gap-1 py-2 text-white/70">
                            <FileText className="w-6 h-6" />
                            <span className="text-xs font-medium">Recetas</span>
                        </button>
                        <button onClick={() => navigate('/')} className="flex flex-col items-center gap-1 py-2 text-white/70">
                            <User className="w-6 h-6" />
                            <span className="text-xs font-medium">Perfil</span>
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    );
}