import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {HttpParams} from "@angular/common/http";
import {map} from "rxjs/internal/operators";
import {User} from "./home.model";

@Injectable({
  providedIn: 'root'
})


export class HomeService {

  constructor(private http: HttpClient) { }


  findUsers(params):  Observable<User[]> {

    return this.http.get<User[]>('https://69aa6ac7-a007-4a98-bc3c-6d2552a2f53e.mock.pstmn.io/users', {
      params: new HttpParams()
        .set('userId', params.userId ? params.userId.toString() : '')
        .set('filter', params.filter)
        .set('sortOrder', params.sortOrder)
        .set('pageNumber', params.pageNumber ? params.pageNumber.toString() : '0')
        .set('pageSize', params.pageSize ? params.pageSize.toString() : '3')
    }).pipe(
      map(res =>  res['users'])
    );
  }
}
