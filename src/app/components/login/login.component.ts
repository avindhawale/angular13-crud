import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  errorMessage: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      user_email: ['', [Validators.required, Validators.email]],
      user_pwd: ['', [Validators.required]],
    });
  }

  onRegister(): void {
    this.router.navigate(['register']);
  }
  onSubmit(): void {
    if (this.form.valid) {
      this.loginService.login(this.form.value).subscribe(
        (response) => {
          if (response.status) {
            this.errorMessage = '';
            this.loginService.isUserLoggedIn = true;
            this.router.navigate(['dashboard']);
          } else {
            this.errorMessage = response.message;
          }
        },
        (error) => {
          this.errorMessage = error.message;
        }
      );
    }
  }
}
