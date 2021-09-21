import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form: FormGroup;
  loading = false;
  errMsg: any;

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private router: Router,
    private userService: UserService
  ) {
    this.form = this.fb.group({
      user: ["", Validators.required],
      password: ["", Validators.required],
    })
  }

  ngOnInit(): void {
  }


  doSignup() {
    const { user, password } = this.form.value;

    this.userService.signup(user, password).subscribe(
      user => {
        this.userService.setUser(user);
        this.redirect();

      },
      ({ error: { mensaje } }) => {
        this.error(mensaje);
        //  this.errMsg = mensaje;
      }
    );
  }

  error(err: any) {
    this._snackBar.open(err, "", {
      horizontalPosition: "center",
      verticalPosition: "bottom",
      duration: 5000
    })
  }

  redirect() {
    this.loading = true;
    setTimeout(() => {
      this.router.navigate(['main'])
    }, 3000)
  }

}
