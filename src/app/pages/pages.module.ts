import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/* Para Utilizar El Router-Outlet En El Module De Pages; De Dos Formas
(POR QUE AQUI, ESTOY UTILIZANDO EL router-outlet)*/
import { RouterModule } from '@angular/router';
// import { AppRoutingModule } from '../app-routing.module';

// tslint:disable-next-line: max-line-length
/* Es Necesario Por q Aqui Estoy Utilizando el header, sidebar, etc, por ende debo llamar a lo componentes para incluirlos en este modulo */
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

/* Components */
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

@NgModule({
  declarations: [
    DashboardComponent,
    Grafica1Component,
    ProgressComponent,
    PagesComponent,
    AccountSettingsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule /* AppRoutingModule */,
    FormsModule,
    ComponentsModule,
  ],
  exports: [
    DashboardComponent,
    Grafica1Component,
    ProgressComponent,
    PagesComponent,
    AccountSettingsComponent,
    RouterModule,
  ],
})
export class PagesModule {}
