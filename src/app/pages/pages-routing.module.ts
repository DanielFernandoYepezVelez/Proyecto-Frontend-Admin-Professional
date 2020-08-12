import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* Components */
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxJSComponent } from './rx-js/rx-js.component';
import { PerfilComponent } from './perfil/perfil.component';

/* Components Administracion */
import { UsersComponent } from './administracion/users/users.component';

/* Guards */
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent, data: { titulo: 'Dasboard' } },
      {
        path: 'progress',
        component: ProgressComponent,
        data: { titulo: 'Progress' },
      },
      {
        path: 'grafica1',
        component: Grafica1Component,
        data: { titulo: 'Graficas' },
      },
      {
        path: 'account-settings',
        component: AccountSettingsComponent,
        data: { titulo: 'Temas' },
      },
      {
        path: 'promesas',
        component: PromesasComponent,
        data: { titulo: 'Promesas' },
      },
      { path: 'rxjs', component: RxJSComponent, data: { titulo: 'RxJs' } },
      {
        path: 'perfil',
        component: PerfilComponent,
        data: { titulo: 'Perfil De Usuario' },
      },

      /* Administracion */
      {
        path: 'usuarios',
        component: UsersComponent,
        data: { titulo: 'Usuarios De Aplicacion' },
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
