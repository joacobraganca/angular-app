import { Component, OnInit, ViewChild, Directive, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Package } from 'src/app/interfaces/package';
import { Sell } from 'src/app/interfaces/sell';
import { UserService } from '../../services/user.service';

import { ListaPaqueteComponent } from './lista-paquete/lista-paquete.component';
import { TopDestinoComponent } from './top-destino/top-destino.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router, private userService: UserService) {}
  sells: Sell[] = [];
  packages: Package[] = [];

  // @ViewChild(ListaPaqueteComponent) listaPaquete!: ListaPaqueteComponent;
  // @ViewChild(TopDestinoComponent) topDestino!: TopDestinoComponent;

  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.loadSells();
  }

  loadSells() {
    this.userService.getSells().subscribe((response) => {
      this.sells = response.ventas;
      this.loadPackages();
    });
  }
  loadPackages() {
    this.userService.getPackages().subscribe((response) => {
      this.packages = response.destinos;
    });
  }
}
