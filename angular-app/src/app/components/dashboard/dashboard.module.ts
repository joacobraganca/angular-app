import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { NavbarComponent } from './navbar/navbar.component';
import { VentaPaqueteComponent } from './venta-paquete/venta-paquete.component';
import { ListaPaqueteComponent } from './lista-paquete/lista-paquete.component';
import { TopDestinoComponent } from './top-destino/top-destino.component';
import { PromoDestinoComponent } from './promo-destino/promo-destino.component';
import { PersonasDestinoComponent } from './personas-destino/personas-destino.component';

@NgModule({
  declarations: [
    DashboardComponent,
    InicioComponent,
    NavbarComponent,
    VentaPaqueteComponent,
    ListaPaqueteComponent,
    TopDestinoComponent,
    PromoDestinoComponent,
    PersonasDestinoComponent,
  ],
  imports: [CommonModule, DashboardRoutingModule, SharedModule],
})
export class DashboardModule {}
