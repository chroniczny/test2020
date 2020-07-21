import {Action} from "@ngrx/store";
import {PageParams} from "./home.model";

export const GET_USERS_ACTION = 'GET_USERS_ACTION';
export const GET_USERS_SUCCESS_ACTION = 'GET_USERS_SUCCESS_ACTION';
export const GET_USERS_FAILURE_ACTION = 'GET_USERS_FAILURE_ACTION';
export const SET_USERS_PARAMS_ACTION = 'SET_USERS_PARAMS_ACTION';
export const FILTER_BY_PARAMS_ACTION = 'FILTER_BY_PARAMS_ACTION';

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

export type HomeActions = GetUsersAction
  | GetUsersSuccessAction
  | GetUsersFailureAction
  | SetUsersParamsAction
  | FilterByParamsAction;
