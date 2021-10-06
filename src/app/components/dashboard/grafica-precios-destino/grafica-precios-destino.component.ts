import {
  Component,
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
  selector: 'app-grafica-precios-destino',
  templateUrl: './grafica-precios-destino.component.html',
  styleUrls: ['./grafica-precios-destino.component.css'],
})
export class GraficaPreciosDestinoComponent implements OnChanges {
  @Input() sells: Sell[] = [];
  @Input() packages: Package[] = [];
  destinations: Array<any> = [];
  prices: Array<any> = [];

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
    this.packages.forEach((p) => {
      const avgPrice = (p.precio_mayor + p.precio_menor) / 2;
      this.prices.push(avgPrice);
      this.destinations.push(p.nombre);
    });

    this.chartOptions.series = [
      {
        data: this.prices,
      },
    ];
    this.chartOptions.xaxis = { categories: this.destinations };
  }
}
