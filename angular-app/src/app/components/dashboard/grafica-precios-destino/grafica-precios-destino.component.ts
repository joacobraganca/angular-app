import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  Input,
} from '@angular/core';
import { Package } from 'src/app/interfaces/package';
import { Sell } from 'src/app/interfaces/sell';

@Component({
  selector: 'app-grafica-precios-destino',
  templateUrl: './grafica-precios-destino.component.html',
  styleUrls: ['./grafica-precios-destino.component.css'],
})
export class GraficaPreciosDestinoComponent implements OnChanges {
  @Input() sells: Sell[] = [];
  @Input() packages: Package[] = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.sells.length > 0 && this.packages.length > 0) {
      this.loadGraph();
    }
  }

  loadGraph() {}
}
