import { Component, OnInit } from '@angular/core';
import { Package } from 'src/app/interfaces/package';
import { Sell } from 'src/app/interfaces/sell';
import { UserService } from '../../../services/user.service';

export interface ListElements {
  nombre_cliente:string;
  paquete:string;
  cantidad_mayores:number;
  cantidad_menores:number;
  precio_final:number;
}

@Component({
  selector: 'app-top-destino',
  templateUrl: './top-destino.component.html',
  styleUrls: ['./top-destino.component.css']
})
export class TopDestinoComponent implements OnInit {
  sells:Sell[] = [];
  packages:Package[] = [];
  displaySell:Array<any>=[];

  displayedColumns: string[] = ['destino', 'ventas'];

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
       
        // Genero array de cada destino posible
        const unique = ids.filter((v, i, a) => a.indexOf(v) === i);

        let topDestinationsIds : Array<any>=[];
        // Para cada destino posible
        unique.forEach(idUnique=>{
          let count = 0;
          // Recorro la lista de los destinos y cuento cuantas veces figura
          ids.forEach((v) => (v === idUnique && count++))

          if(count>=3){
            topDestinationsIds.push({id:idUnique, count});
          }
        })

         this.loadPackages(topDestinationsIds);

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

  generateList(destinations:Array<any>):Array<any>{
    const list : Array<any>=[];
   destinations.forEach(destination=>{
      const destino = this.packages.filter(p=>p.id===destination.id)[0];
     
     list.push({
       destino:destino.nombre,
       ventas:destination.count
     });
      });

    return list;
  }


}
