import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(id: any): Observable<any> {
    return this.http.get(`${environment.BASE_URL + 'api/users/'}${id}`).pipe(
      map((response) => {
        return response;
      })
    );
  }

  editUser(id: any, updatedData: any): Observable<any> {
    return this.http
      .put(`${environment.BASE_URL + 'api/users/'}${id}`, updatedData)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  deleteUser(id: any,): Observable<any> {
    return this.http
      .delete(`${environment.BASE_URL + 'api/users/'}${id}`, )
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
