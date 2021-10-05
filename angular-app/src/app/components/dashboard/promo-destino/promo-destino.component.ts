import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';
import { Package } from 'src/app/interfaces/package';
import { Sell } from 'src/app/interfaces/sell';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-promo-destino',
  templateUrl: './promo-destino.component.html',
  styleUrls: ['./promo-destino.component.css'],
})
export class PromoDestinoComponent implements OnChanges {
  @Input() sells: Sell[] = [];
  @Input() packages: Package[] = [];
  displaySell: Array<string> = [];

  displayedColumns: string[] = ['destino'];

  constructor(private userService: UserService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.sells.length > 0 && this.packages.length > 0) {
      this.loadSells();
    }
  }
  loadSells() {
    let ids: Array<number> = [];
    this.sells.forEach((venta) => {
      ids.push(venta.id_paquete);
    });

    const unique = ids.filter((v, i, a) => a.indexOf(v) === i);

    this.displaySell = this.generateList(unique);
  }

  generateList(destinations: Array<any>): Array<string> {
    const idsNotFound: Array<string> = [];
    this.packages.forEach((p) => {
      if (destinations.indexOf(p.id) === -1) {
        idsNotFound.push(p.nombre);
      }
    });
    return idsNotFound;
  }
}
