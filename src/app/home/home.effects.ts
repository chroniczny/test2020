import {Injectable} from '@angular/core';
import {Effect, ofType, Actions} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {
  GET_USERS_ACTION,
  GetUsersSuccessAction,
  GetUsersFailureAction,
  SetUsersParamsAction,
  FILTER_BY_PARAMS_ACTION,
  UPDATE_USER_ACTION,
  UpdateUserAction, ADD_USER_ACTION, AddUserAction, DELETE_USER_ACTION, DeleteUserAction
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
    map((action: any) => action.payload),
    withLatestFrom(this.store.pipe(select(getParamsSelector))),
    switchMap(([payload, params]: [PageParams, PageParams]) => {
      const completeParams = {...params, ...payload};
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
    map((action: any) => action.payload),
    withLatestFrom(this.store.pipe(select(getUsersSelector))),
    map(([payload, usersList]: [PageParams, User[]]) => {
      const completeParams = payload;
          const sortedUsers = usersList.sort(this.homeService.compareElements(completeParams.sortBy, completeParams.sortOrder))

          return [
            new GetUsersSuccessAction(sortedUsers),
            new SetUsersParamsAction(completeParams)
          ];
        }),
        catchError(error => of(new GetUsersFailureAction(error)))
  );

  @Effect()
  updateUserDetails$: Observable<any> = this.actions$.pipe(
    ofType(UPDATE_USER_ACTION),
    map((action: UpdateUserAction) => action.payload),
    withLatestFrom(this.store.pipe(select(getUsersSelector))),
    map(([payload, users]: [User, User[]]) => {
      const updatedUsers = users.map(item => {
        if (item.userName === payload.userName) {
          return payload;
        } else {
          return item;
        }
      });

      return new GetUsersSuccessAction(updatedUsers);
    }),
    catchError(error => of(new GetUsersFailureAction(error)))
  );

  @Effect()
  addUser$: Observable<any> = this.actions$.pipe(
    ofType(ADD_USER_ACTION),
    map((action: AddUserAction) => action.payload),
    withLatestFrom(this.store.pipe(select(getUsersSelector))),
    map(([payload, users]: [User, User[]]) => {
      let extendedUsers;
      const userNamesExisting = users.map(element => element.userName);
      if (!userNamesExisting.includes(payload.userName)) {
        extendedUsers = [...users, payload];
      } else {
        extendedUsers = users;
      }
      return new GetUsersSuccessAction(extendedUsers);
    }),
    catchError(error => of(new GetUsersFailureAction(error)))
  );

  @Effect()
  deleteUser$: Observable<any> = this.actions$.pipe(
    ofType(DELETE_USER_ACTION),
    map((action: DeleteUserAction) => action.payload),
    withLatestFrom(this.store.pipe(select(getUsersSelector))),
    map(([payload, users]: [User, User[]]) => {
      let cutUsers = users.filter(userItem => userItem.userName !== payload.userName);

      return new GetUsersSuccessAction(cutUsers);
    }),
    catchError(error => of(new GetUsersFailureAction(error)))
  );

  constructor(
    private actions$: Actions,
    private homeService: HomeService,
    private store: Store<HomeState>
  ) {}
}
