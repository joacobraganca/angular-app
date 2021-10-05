import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  Input,
  ViewChild,
} from '@angular/core';
import { Package } from 'src/app/interfaces/package';
import { Sell } from 'src/app/interfaces/sell';
import {
  ApexChart,
  ApexAxisChartSeries,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexGrid,
} from 'ng-apexcharts';

type ApexXAxis = {
  type?: 'category' | 'datetime' | 'numeric';
  categories?: any;
  labels?: {
    style?: {
      colors?: string | string[];
      fontSize?: string;
    };
  };
};

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  colors: string[];
  legend: ApexLegend;
};

@Component({
  selector: 'app-grafica-personas-destino',
  templateUrl: './grafica-personas-destino.component.html',
  styleUrls: ['./grafica-personas-destino.component.css'],
})
export class GraficaPersonasDestinoComponent implements OnChanges {
  @Input() sells: Sell[] = [];
  @Input() packages: Package[] = [];
  ids: Array<any> = [];
  destinos: Array<any> = [];
  pasajeros: Array<any> = [];

  @ViewChild('chart-personas-destino', { static: false })
  chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions> | any;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: 'Pasajeros por destino',
          data: [],
        },
      ],
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: [],
      },
      yaxis: {
        title: {
          text: 'Pasajeros',
        },
      },
    };
  }
  ngOnChanges(changes: SimpleChanges) {
    if (this.sells.length > 0 && this.packages.length > 0) {
      this.loadSells();
    }
  }

  loadSells() {
    this.sells.forEach((venta) => {
      const itemIndex = this.ids.findIndex((item) => item === venta.id_paquete);
      if (itemIndex !== -1) {
        this.pasajeros[itemIndex] +=
          venta.cantidad_mayores + venta.cantidad_menores;
      } else {
        const paquete = this.packages.find((p) => p.id === venta.id_paquete);
        const nombre = paquete ? paquete.nombre : '';
        this.ids.push(venta.id_paquete);
        this.destinos.push(nombre);
        this.pasajeros.push(venta.cantidad_mayores + venta.cantidad_menores);
      }
    });

    this.chartOptions.series = [
      {
        data: this.pasajeros,
      },
    ];
    this.chartOptions.xaxis = { categories: this.destinos };
  }
}
