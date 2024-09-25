import { Routes } from '@angular/router';

import { CorreosComponent} from './modules/pages/correos/correos.component';
import { NotificacionesComponent } from './modules/pages/notificaciones/notificaciones.component';
import { AdminComponent } from './modules/pages/admin/admin.component';
import { LoginComponent } from './modules/pages/login/login.component';
import { AboutComponent } from './modules/pages/about/about.component';
import { ControladorGuard as guard } from './core/guards/controlador.guard';
import { RegistroEstudiantesComponent } from './modules/pages/register-student/register-student.component';



export const routes: Routes = [
  {
    path: "",
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: "enviar-correos",
    component: CorreosComponent,
    canActivate: [guard], data: { requiredRoles: ['psicologo','admin'] }
  },

  {
    path: "enviar-notificacion",
    component: NotificacionesComponent,
    canActivate: [guard], data: { requiredRoles: ['psicologo','admin']  }
  },

  {
    path: "admin",
    component: AdminComponent,
    canActivate: [guard], data: { requiredRoles: ['psicologo','admin'] }
  },

  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "about",
    component: AboutComponent,
  },
    {
    path: "forms-register", 
    component: RegistroEstudiantesComponent,
  }
];
