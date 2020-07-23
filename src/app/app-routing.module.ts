import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* Modulos Rutas Secundarias */
import { AuthRoutingModule } from './auth/auth-routing.module';
import { PagesRoutingModule } from './pages/pages-routing.module';

/* Components */
import { NotpagefoundComponent } from './notpagefound/notpagefound.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  /*  Si es cualquier otro path que no sea de los existentes, en las rutas; entonces muestra la pagina Not Found */
  { path: '**', component: NotpagefoundComponent },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    AuthRoutingModule,
    PagesRoutingModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
