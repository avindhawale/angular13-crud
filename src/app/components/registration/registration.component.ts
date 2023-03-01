import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  form: FormGroup;
  loginForm: FormGroup;
  pswMismatch: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      user_name: ['', Validators.required],
      user_email: ['', [Validators.required, Validators.email]],
      user_contact_no: [
        '',
        [Validators.required, Validators.pattern('[0-9 ]{10}')],
      ],
      user_gender: ['male', Validators.required],
      user_password: ['', [Validators.minLength(6), Validators.required]],
      user_confirm_password: [
        '',
        [Validators.minLength(6), Validators.required],
      ],
    });
    this.checkPasswordValidation();
  }

  checkPasswordValidation(): void {
    this.form.get('user_confirm_password')?.valueChanges.subscribe((value) => {
      if (value !== this.form.controls['user_password'].value) {
        this.form.controls['user_confirm_password'].setErrors({
          mismatch: true,
        });
        this.pswMismatch = true;
      } else {
        this.form.controls['user_confirm_password'].setErrors(null);
        this.pswMismatch = false;
      }
    });
  }

  goToLogin(): void {
    this.router.navigate(['login']);
  }

  onSubmit(): void | boolean {
    if (this.form.invalid) {
      return true;
    }

    this.userService.registerUser(this.form.value).subscribe({
      next: (res: any) => {
        alert(res.message);
        if (res.status) this.router.navigate(['login']);
      },
      error: (err) => {
        alert(err);
      },
    });
  }
}
