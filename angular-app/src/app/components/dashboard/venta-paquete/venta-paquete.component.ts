import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Package } from 'src/app/interfaces/package';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-venta-paquete',
  templateUrl: './venta-paquete.component.html',
  styleUrls: ['./venta-paquete.component.css'],
})
export class VentaPaqueteComponent implements OnInit {
  form: FormGroup;
  errMsg: any;
  loading = false;
  packages: Package[] = [];
  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private userService: UserService
  ) {
    this.form = this.fb.group({
      clientName: ['', Validators.required],
      idpackage: [''],
      quantityAdults: ['', Validators.required],
      quantityKids: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadPackages();
  }

  loadPackages() {
    this.userService.getPackages().subscribe((response) => {
      this.packages = response.destinos;
    });
  }

  doPurchase() {
    const { clientName, idpackage, quantityAdults, quantityKids } =
      this.form.value;
    if (Number(idpackage)) {
      if (Number(quantityAdults) && Number(quantityKids)) {
        if (quantityAdults + quantityKids <= 10) {
          this.userService
            .doSell(clientName, +idpackage, quantityAdults, quantityKids)
            .subscribe((resp) => {
              this.message('✅ Compra realizada con exito');
            });
        } else {
          this.message('⚠ La cantidad de personas no pude ser mayor a 10.');
        }
      } else {
        this.message('⚠ Verificar valores ingresados.');
      }
    } else {
      this.message('⚠ Seleccione un paquete.');
    }
  }

  message(err: any) {
    this._snackBar.open(err, '', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 5000,
    });
  }
  redirect() {}
}
