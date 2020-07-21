import {Injectable} from '@angular/core';
import {Effect, ofType, Actions} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {
  GET_USERS_ACTION,
  GetUsersAction,
  GetUsersSuccessAction,
  GetUsersFailureAction,
  SetUsersParamsAction, FILTER_BY_PARAMS_ACTION
} from './home.actions';
import {map, withLatestFrom, switchMap, catchError} from 'rxjs/internal/operators';
import {select, Store} from '@ngrx/store';
import {HomeService} from './home.service';
import {getParamsSelector, getUsersSelector} from './home.reducer';
import {HomeState, PageParams, User} from './home.model';


@Injectable()
export class HomeEffects {

  @Effect()
  getUsers$: Observable<any> = this.actions$.pipe(
    ofType(GET_USERS_ACTION),
    map((action: GetUsersAction) => action.payload),
    withLatestFrom(this.store.pipe(select(getParamsSelector))),
    switchMap(([payload, params]: [PageParams, PageParams]) => {
      const completeParams = { ...params, ...payload };
      return this.homeService.findUsers(completeParams).pipe(
        switchMap((response: any) => {
          return [new GetUsersSuccessAction(response), new SetUsersParamsAction(completeParams)];
        }),
        catchError(error => of(new GetUsersFailureAction(error)))
      );
    })
  );
  @Effect()
  getFilteredUsers$: Observable<any> = this.actions$.pipe(
    ofType(FILTER_BY_PARAMS_ACTION),
    map((action: GetUsersAction) => action.payload),
    withLatestFrom(this.store.pipe(select(getUsersSelector))),
    switchMap(([payload, users]: [PageParams, User[]]) => {
      const completeParams = payload;
      return this.homeService.findUsers(completeParams).pipe(
        switchMap((response: any) => {
          console.log('FETCHED USERS: ', response);

          const sortedUsers = response.sort(this.compareElements(completeParams.sortBy, completeParams.sortOrder))






          return [
            new GetUsersSuccessAction(sortedUsers),
            new SetUsersParamsAction(completeParams)
          ];
        }),
        catchError(error => of(new GetUsersFailureAction(error)))
      );
    })
  );

  compareElements(key: string, order: string = 'asc') {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }

      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }

  constructor(
    private actions$: Actions,
    private homeService: HomeService,
    private store: Store<HomeState>
  ) {}
}
