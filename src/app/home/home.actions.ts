import {Action} from "@ngrx/store";
import {PageParams, User} from "./home.model";

export const GET_USERS_ACTION = 'GET_USERS_ACTION';
export const GET_USERS_SUCCESS_ACTION = 'GET_USERS_SUCCESS_ACTION';
export const GET_USERS_FAILURE_ACTION = 'GET_USERS_FAILURE_ACTION';
export const SET_USERS_PARAMS_ACTION = 'SET_USERS_PARAMS_ACTION';
export const FILTER_BY_PARAMS_ACTION = 'FILTER_BY_PARAMS_ACTION';
export const UPDATE_USER_ACTION = 'UPDATE_USER_ACTION';
export const DELETE_USER_ACTION = 'DELETE_USER_ACTION';
export const ADD_USER_ACTION = 'ADD_USER_ACTION';
export const UPDATE_COLLECTION_ACTION = 'UPDATE_COLLECTION_ACTION';

export class GetUsersAction implements Action {
  readonly type = GET_USERS_ACTION;

  constructor (public payload: PageParams){}
}

export class GetUsersSuccessAction implements Action {
  readonly type = GET_USERS_SUCCESS_ACTION;

  constructor (public payload: any){}
}

export class GetUsersFailureAction implements Action {
  readonly type = GET_USERS_FAILURE_ACTION;

  constructor (public payload: any){}
}

export class SetUsersParamsAction implements Action {
  readonly type = SET_USERS_PARAMS_ACTION;

  constructor (public payload: PageParams){}
}

export class FilterByParamsAction implements Action {
  readonly type = FILTER_BY_PARAMS_ACTION;

  constructor (public payload: PageParams){}
}

export class UpdateUserAction implements Action {
  readonly type = UPDATE_USER_ACTION;

  constructor (public payload: User){}
}

export class DeleteUserAction implements Action {
  readonly type = DELETE_USER_ACTION;

  constructor (public payload: User){}
}

export class AddUserAction implements Action {
  readonly type = ADD_USER_ACTION;

  constructor (public payload: User){}
}

export class UpdateCollectionAction implements Action {
  readonly type = UPDATE_COLLECTION_ACTION;

  constructor (public payload: User[]){}
}

export type HomeActions = GetUsersAction
  | GetUsersSuccessAction
  | GetUsersFailureAction
  | SetUsersParamsAction
  | FilterByParamsAction
  | UpdateUserAction
  | DeleteUserAction
  | AddUserAction
  | UpdateCollectionAction;
