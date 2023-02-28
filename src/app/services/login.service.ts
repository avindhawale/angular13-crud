import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { User, UserCred } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  isUserLoggedIn: boolean = false;
  constructor(private http: HttpClient) {}

  login(cred: UserCred): Observable<any> {
    return this.http.get<UserCred>(
      `https://devrunner.co.in/machine_test/index.php/web_api/Users/login?user_email=${cred.user_email}&user_pwd=${cred.user_pwd}`
    );
  }
}
