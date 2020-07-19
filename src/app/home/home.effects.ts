import {Injectable} from '@angular/core';
import {Effect, ofType, Actions} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {
  GET_USERS_ACTION,
  GetUsersAction,
  GetUsersSuccessAction,
  GetUsersFailureAction,
  SetUsersParamsAction
} from './home.actions';
import {map, withLatestFrom, switchMap, catchError} from 'rxjs/internal/operators';
import {select, Store} from '@ngrx/store';
import {HomeService} from './home.service';
import {getParamsSelector} from './home.reducer';
import {HomeState, PageParams} from './home.model';


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

  constructor(
    private actions$: Actions,
    private homeService: HomeService,
    private store: Store<HomeState>
  ) {}
}
