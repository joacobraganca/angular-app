import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar) {
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
    this._snackBar.open("Usuario y/o contraseña incorrectos.", "", {
      horizontalPosition: "center",
      verticalPosition: "bottom",
      duration: 5000
    })
  }

  fakeLoading() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 3000)
  }

}
