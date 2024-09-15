import { Routes } from '@angular/router';

import { CorreosComponent} from './modules/pages/correos/correos.component';
import { NotificacionesComponent } from './modules/pages/notificaciones/notificaciones.component';
import { AdminComponent } from './modules/pages/admin/admin.component';
import { LoginComponent } from './modules/pages/login/login.component';
import { AboutComponent } from './modules/pages/about/about.component';
import { ControladorGuard as guard } from './core/guards/controlador.guard';




export const routes: Routes = [
  {
    path: "",
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: "enviar-correos",
    component: CorreosComponent,
    canActivate: [guard], data: { requiredRoles: ['sociedad'] }
  },

  {
    path: "enviar-notificacion",
    component: NotificacionesComponent,
    canActivate: [guard], data: { requiredRoles: ['sociedad'] }
  },

  {
    path: "admin",
    component: AdminComponent,
    canActivate: [guard], data: { requiredRoles: ['sociedad'] }
  },

  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "about",
    component: AboutComponent,
  },
];
