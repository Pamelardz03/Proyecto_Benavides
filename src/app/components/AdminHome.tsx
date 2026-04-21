import { useState } from 'react';
import { User, Bell, Users, Activity, TrendingUp, FileText, Settings, BarChart3, Calendar, UserCheck, UserPlus, Stethoscope } from 'lucide-react';
import { useNavigate } from 'react-router';
import imgBenavides from '../../imports/logo-anterior-convertido-de-svg.png';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function AdminHome() {
  const navigate = useNavigate();

  // Datos de ejemplo para las gráficas
  const loginData = [
    { name: 'Lun', medicos: 45, colaboradors: 32, clientes: 189 },
    { name: 'Mar', medicos: 52, colaboradors: 38, clientes: 210 },
    { name: 'Mié', medicos: 48, colaboradors: 35, clientes: 198 },
    { name: 'Jue', medicos: 61, colaboradors: 42, clientes: 234 },
    { name: 'Vie', medicos: 55, colaboradors: 40, clientes: 221 },
    { name: 'Sáb', medicos: 38, colaboradors: 28, clientes: 167 },
    { name: 'Dom', medicos: 30, colaboradors: 22, clientes: 145 },
  ];

  const doctoresRegistradosData = [
    { hora: '08:00', doctores: 5 },
    { hora: '09:00', doctores: 12 },
    { hora: '10:00', doctores: 18 },
    { hora: '11:00', doctores: 22 },
    { hora: '12:00', doctores: 25 },
    { hora: '13:00', doctores: 20 },
    { hora: '14:00', doctores: 23 },
    { hora: '15:00', doctores: 28 },
    { hora: '16:00', doctores: 24 },
    { hora: '17:00', doctores: 19 },
  ];

  const consultasData = [
    { name: 'Ene', consultas: 420 },
    { name: 'Feb', consultas: 485 },
    { name: 'Mar', consultas: 510 },
    { name: 'Abr', consultas: 478 },
  ];

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
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <img src={imgBenavides} alt="Benavides" className="h-12 w-auto" />
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <button className="relative p-2 rounded-xl hover:bg-white/10 transition-all">
                <Bell className="w-6 h-6 text-white" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#D52A1D] rounded-full"></span>
              </button>
              <button 
                onClick={() => navigate('/')}
                className="p-2 rounded-xl hover:bg-white/10 transition-all"
              >
                <User className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 py-6">
        {/* Welcome Section */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Panel de Administración</h1>
          <p className="text-gray-600">Gestiona usuarios, consultas y monitorea métricas del sistema</p>
        </div>

        {/* Top Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Card 1 - Usuarios Activos */}
          <div className="relative p-6 rounded-3xl bg-white/50 backdrop-blur-sm border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 rounded-xl bg-[#001389]/10">
                    <Users className="w-8 h-8 text-[#001389]" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Usuarios Activos Hoy</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Clientes</span>
                    <span className="text-2xl font-bold text-[#001389]">1,543</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Médicos</span>
                    <span className="text-xl font-bold text-[#D52A1D]">89</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">colaboradors</span>
                    <span className="text-xl font-bold text-green-600">156</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="p-2 rounded-lg bg-green-100">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-xs font-medium text-green-600">+12.5%</span>
              </div>
            </div>
          </div>

          {/* Card 2 - Consultas y Actividad */}
          <div className="relative p-6 rounded-3xl bg-white/50 backdrop-blur-sm border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 rounded-xl bg-[#D52A1D]/10">
                    <Activity className="w-8 h-8 text-[#D52A1D]" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Actividad del Sistema</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Consultas hoy</span>
                    <span className="text-2xl font-bold text-[#001389]">234</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Recetas procesadas</span>
                    <span className="text-xl font-bold text-[#D52A1D]">187</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Pedidos completados</span>
                    <span className="text-xl font-bold text-green-600">312</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="p-2 rounded-lg bg-blue-100">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-xs font-medium text-blue-600">+8.3%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 px-2">Métricas del Sistema</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Gráfica de Inicios de Sesión */}
            <div className="p-6 rounded-3xl bg-white/50 backdrop-blur-sm border border-white/60 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Inicios de Sesión (7 días)</h3>
                <Calendar className="w-5 h-5 text-gray-400" />
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={loginData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="name" stroke="#666" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#666" style={{ fontSize: '12px' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #e0e0e0',
                      borderRadius: '12px',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Area key="area-clientes" type="monotone" dataKey="clientes" stackId="1" stroke="#001389" fill="#001389" fillOpacity={0.6} />
                  <Area key="area-medicos" type="monotone" dataKey="medicos" stackId="1" stroke="#D52A1D" fill="#D52A1D" fillOpacity={0.6} />
                  <Area key="area-colaboradors" type="monotone" dataKey="colaboradors" stackId="1" stroke="#4CAF50" fill="#4CAF50" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
              <div className="flex items-center justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#001389]"></div>
                  <span className="text-xs text-gray-600">Clientes</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#D52A1D]"></div>
                  <span className="text-xs text-gray-600">Médicos</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#4CAF50]"></div>
                  <span className="text-xs text-gray-600">colaboradors</span>
                </div>
              </div>
            </div>

            {/* Doctores Registrados (Check-in) */}
            <div className="p-6 rounded-3xl bg-white/50 backdrop-blur-sm border border-white/60 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Doctores Registrados Hoy</h3>
                <Stethoscope className="w-5 h-5 text-gray-400" />
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={doctoresRegistradosData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="hora" stroke="#666" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#666" style={{ fontSize: '12px' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #e0e0e0',
                      borderRadius: '12px',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Line key="line-doctores" type="monotone" dataKey="doctores" stroke="#D52A1D" strokeWidth={3} dot={{ fill: '#D52A1D', r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
              <div className="flex items-center justify-between mt-4 px-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#D52A1D]"></div>
                  <span className="text-xs text-gray-600">Check-ins por hora</span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-[#D52A1D]">28</span>
                  <span className="text-xs text-gray-600 ml-1">doctores activos</span>
                </div>
              </div>
            </div>

            {/* Consultas por Mes */}
            <div className="p-6 rounded-3xl bg-white/50 backdrop-blur-sm border border-white/60 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Consultas Mensuales</h3>
                <FileText className="w-5 h-5 text-gray-400" />
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={consultasData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="name" stroke="#666" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#666" style={{ fontSize: '12px' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #e0e0e0',
                      borderRadius: '12px',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Bar key="bar-consultas" dataKey="consultas" fill="#001389" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Quick Actions */}
            <div className="p-6 rounded-3xl bg-white/50 backdrop-blur-sm border border-white/60 shadow-xl">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Acciones Rápidas</h3>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => navigate('/admin/usuarios')}
                  className="p-4 rounded-xl bg-[#001389]/10 hover:bg-[#001389]/20 transition-all flex flex-col items-center gap-2"
                >
                  <Users className="w-6 h-6 text-[#001389]" />
                  <span className="text-xs font-medium text-gray-700">Gestionar Usuarios</span>
                </button>
                <button className="p-4 rounded-xl bg-[#D52A1D]/10 hover:bg-[#D52A1D]/20 transition-all flex flex-col items-center gap-2">
                  <FileText className="w-6 h-6 text-[#D52A1D]" />
                  <span className="text-xs font-medium text-gray-700">Ver Reportes</span>
                </button>
                <button className="p-4 rounded-xl bg-green-100 hover:bg-green-200 transition-all flex flex-col items-center gap-2">
                  <Activity className="w-6 h-6 text-green-600" />
                  <span className="text-xs font-medium text-gray-700">Monitoreo en Vivo</span>
                </button>
                <button className="p-4 rounded-xl bg-blue-100 hover:bg-blue-200 transition-all flex flex-col items-center gap-2">
                  <Settings className="w-6 h-6 text-blue-600" />
                  <span className="text-xs font-medium text-gray-700">Configuración</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
