import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  form: FormGroup;
  user: User;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editUserData: any,
    private dialogRef: MatDialogRef<UserFormComponent>,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      user_name: ['', Validators.required],
      user_email: ['', [Validators.required, Validators.email]],
      user_phone_no: [
        '',
        [Validators.required, Validators.pattern('[0-9 ]{10}')],
      ],
      user_gender: ['male', Validators.required],
    });

    this.userService
      .getUserById(this.editUserData.user_id)
      .pipe(first())
      .subscribe((x: any) => {
        this.user = x.data[0];
        this.form.patchValue(this.user);
      });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  getErrorMessage() {
    if (this.form.value.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.form.value.email.hasError('email') ? 'Not a valid email' : '';
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.updateUser();
  }

  updateUser(): void {
    const dataToPost = {
      user_id: this.user.user_id,
      user_name: this.form.controls['user_name'].value,
      user_email: this.form.controls['user_email'].value,
      user_contact_no: this.form.controls['user_phone_no'].value,
      user_password: this.user.user_pwd,
      user_gender: this.form.controls['user_gender'].value,
    };

    this.userService.updateUser(dataToPost).subscribe({
      next: (res) => {
        alert('User updated successfully');
        this.dialogRef.close(true);
      },
      error: (err) => {
        alert(err);
      },
    });
  }
}
