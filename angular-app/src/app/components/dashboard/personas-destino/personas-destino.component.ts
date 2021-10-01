import { Component, OnInit } from '@angular/core';
import { Package } from 'src/app/interfaces/package';
import { Sell } from 'src/app/interfaces/sell';
import { UserService } from '../../../services/user.service';

export interface PersonasDestino {
  id_paquete: number;
  nombre_paquete: string;
  cantidad: number;
}

@Component({
  selector: 'app-personas-destino',
  templateUrl: './personas-destino.component.html',
  styleUrls: ['./personas-destino.component.css'],
})
export class PersonasDestinoComponent implements OnInit {
  sells: Sell[] = [];
  packages: Package[] = [];
  displaySell: Array<any> = [];

  list: Array<PersonasDestino> = [];

  displayedColumns: string[] = ['paquete', 'personas'];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadPackages();
  }

  loadSells() {
    this.userService.getSells().subscribe((response) => {
      const array: Array<any> = [];
      response.ventas.forEach((venta) => {
        const itemIndex = array.findIndex(
          (item) => item.id_paquete === venta.id_paquete
        );
        if (itemIndex !== -1) {
          array[itemIndex].cantidad +=
            venta.cantidad_mayores + venta.cantidad_menores;
        } else {
          const paquete = this.packages.find((p) => p.id === venta.id_paquete);
          const nombre = paquete ? paquete.nombre : '';
          const new_item = {
            id_paquete: venta.id_paquete,
            cantidad: venta.cantidad_mayores + venta.cantidad_menores,
            nombre_paquete: nombre,
          };
          array.push(new_item);
        }
      });
      this.displaySell = array;
    });
  }
  loadPackages() {
    this.userService.getPackages().subscribe((response) => {
      this.packages = response.destinos;
      this.loadSells();
    });
  }
}
