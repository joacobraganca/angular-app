import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private router: Router) {
    this.form = this.fb.group({
      user: ["", Validators.required],
      password: ["", Validators.required],
    })
  }

  ngOnInit(): void {
  }


  doLogin() {
    console.log(this.form)
    const user = this.form.value.user;
    const password = this.form.value.password;

    if (user == "admin" && password == "admin") {
      // Redirect 
      this.fakeLoading();
    } else {
      // Error
      this.error();
      this.form.reset;
    }
  }

  error() {
    this._snackBar.open("Debe ingresar datos válidos.", "", {
      horizontalPosition: "center",
      verticalPosition: "bottom",
      duration: 5000
    })
  }

  fakeLoading() {
    this._snackBar.open("Usuario registrado correctamente. Redirigiendo a inicio de sesión", "", {
      horizontalPosition: "center",
      verticalPosition: "bottom",
      duration: 3000
    })
    setTimeout(() => {
      this.router.navigate(['login'])
    }, 3000)
  }

}
