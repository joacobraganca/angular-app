import { Component, OnInit } from '@angular/core';
import { Package } from 'src/app/interfaces/package';
import { Sell } from 'src/app/interfaces/sell';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-promo-destino',
  templateUrl: './promo-destino.component.html',
  styleUrls: ['./promo-destino.component.css']
})
export class PromoDestinoComponent implements OnInit {
  sells:Sell[] = [];
  packages:Package[] = [];
  displaySell:Array<string>=[];

  displayedColumns: string[] = ['destino'];

  constructor( private userService: UserService) {
    
   }

  ngOnInit(): void {
    this.loadSells();
  }

  loadSells(){
    this.userService.getSells().subscribe(
      response => {

       // Genero array con todos los id de los destinos
        let ids : Array<number> =[];
        response.ventas.forEach(venta=>{
          ids.push(venta.id_paquete);
        })
       
        // Genero array de cada id de destino compradp
        const unique = ids.filter((v, i, a) => a.indexOf(v) === i);

         this.loadPackages(unique);

       }
    )
  }
  loadPackages(destinations:Array<any>){
    this.userService.getPackages().subscribe(
      response => {
        this.packages= response.destinos;    
        this.displaySell=this.generateList(destinations);  
      }
    )
  }

  generateList(destinations:Array<any>):Array<string>{
    const idsNotFound : Array<string>=[];
    this.packages.forEach(p=>{

      if(destinations.indexOf(p.id)===-1){
        idsNotFound.push(p.nombre);
      }

    });
    return idsNotFound;
  }


}
