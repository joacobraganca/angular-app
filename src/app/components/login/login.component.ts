import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  errMsg: any;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private userService: UserService
  ) {
    this.form = this.fb.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  doLogin() {
    const { user, password } = this.form.value;

    this.userService.login(user, password).subscribe(
      (user) => {
        this.userService.setUser(user);
        this.redirect();
      },
      ({ error: { mensaje } }) => {
        this.error(mensaje);
      }
    );
  }

  error(err: any) {
    this._snackBar.open(err, '', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 5000,
    });
  }

  redirect() {
    this.loading = true;
    this.router.navigate(['dashboard']);
  }
}
