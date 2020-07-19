import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { map, take } from 'rxjs/operators';
import {GET_USERS_SUCCESS_ACTION, GET_USERS_FAILURE_ACTION, GetUsersAction} from "./home.actions";
import {HomeState, PageParams} from "./home.model";

@Injectable()
export class HomeResolve implements Resolve<any> {

  public defaultPage: PageParams = {
    userId: 0,
    filter: '',
    sortOrder: 'asc',
    pageNumber: 0,
    pageSize: 3
  };
  constructor(private store: Store<HomeState>, private action$: Actions) {}

  resolve(route: ActivatedRouteSnapshot) {
    this.store.dispatch(new GetUsersAction(this.defaultPage));
    return this.action$.pipe(
      ofType(GET_USERS_SUCCESS_ACTION, GET_USERS_FAILURE_ACTION),
      map((action: any) => action.payload),
      take(1)
    );
  }
}

