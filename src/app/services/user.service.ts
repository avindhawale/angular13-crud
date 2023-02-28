import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { API } from '../shared/constants/api';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(API.USERS).pipe(catchError(this.errorHandler));
  }

  getUserById(id: string): Observable<User> {
    return this.http
      .get<User>(API.USER + 'user_id=' + id)
      .pipe(catchError(this.errorHandler));
  }

  deleteUser(id: string): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({ user_id: id }),
    };
    return this.http
      .delete<any>(API.DELETE_USER, options)
      .pipe(catchError(this.errorHandler));
  }

  updateUser(data: User): Observable<User> {
    return this.http
      .put<User>(API.UPDATE_USER, data)
      .pipe(catchError(this.errorHandler));
  }

  registerUser(data: User): Observable<User> {
    return this.http
      .post<User>(API.REGISTER, data)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = 'Something went wrong, try again.';
    }
    return throwError(() => errorMessage);
  }
}
