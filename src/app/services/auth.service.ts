import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../environment/environment';
import { IUser } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(user: IUser): Observable<any> {
    return this.http
      .post(`${environment.BASE_URL + 'api/register'}`, user)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  login(user: IUser): Observable<any> {
    return this.http.post(`${environment.BASE_URL + 'api/login'}`, user).pipe(
      map((response) => {
        return response;
      })
    );
  }

  getToken(): string | null {
    return sessionStorage.getItem('access-token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
