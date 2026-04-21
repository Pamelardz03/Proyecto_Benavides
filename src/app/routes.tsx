import { createHashRouter } from "react-router";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { ForgotPassword } from "./components/ForgotPassword";
import { RecoveryCode } from "./components/RecoveryCode";
import { ResetPassword } from "./components/ResetPassword";
import { Verification } from "./components/Verification";
import { ClienteHome } from "./components/ClienteHome";
import { MisMedicos } from "./components/MisMedicos";
import { AdministrarPermisos } from "./components/AdministrarPermisos";
import { AdminHome } from "./components/AdminHome";
import { UsuariosAdmin } from "./components/UsuariosAdmin";
import { DetalleUsuario } from "./components/DetalleUsuario";
import { colaboradorHome } from "./components/colaboradorHome";
import { DetallePaciente } from "./components/DetallePaciente";
import { ApartadoPaciente } from "./components/ApartadoPaciente";
import { ArchivosAdjuntos } from "./components/ArchivosAdjuntos";

export const router = createHashRouter([
  { path: "/", Component: Login },
  { path: "/register", Component: Register },
  { path: "/forgot-password", Component: ForgotPassword },
  { path: "/recovery-code", Component: RecoveryCode },
  { path: "/reset-password", Component: ResetPassword },
  { path: "/verification", Component: Verification },
  { path: "/cliente/home", Component: ClienteHome },
  { path: "/cliente/mis-medicos", Component: MisMedicos },
  { path: "/cliente/administrar-permisos/:medicoId", Component: AdministrarPermisos },
  { path: "/colaborador/home", Component: colaboradorHome },
  { path: "/colaborador/paciente/:id", Component: DetallePaciente },
  { path: "/colaborador/paciente/:id/:apartado", Component: ApartadoPaciente },
  { path: "/colaborador/paciente/:id/:apartado/:itemId/archivos", Component: ArchivosAdjuntos },
  { path: "/admin", Component: AdminHome },
  { path: "/admin/home", Component: AdminHome },
  { path: "/admin/usuarios", Component: UsuariosAdmin },
  { path: "/admin/usuarios/:id", Component: DetalleUsuario },
]);