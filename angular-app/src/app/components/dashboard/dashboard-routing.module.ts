import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { ListaPaqueteComponent } from './lista-paquete/lista-paquete.component';
import { VentaPaqueteComponent } from './venta-paquete/venta-paquete.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: InicioComponent },
      { path: 'venta-paquete', component: VentaPaqueteComponent },
      { path: 'inicio', component: InicioComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
