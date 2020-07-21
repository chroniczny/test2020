import {HomeState, User, PageParams} from './home.model';
import {HomeActions, GET_USERS_SUCCESS_ACTION, SET_USERS_PARAMS_ACTION} from './home.actions';
import {createSelector} from '@ngrx/store';


export const initialState: HomeState = {
  users: [
    {
      userName: "kdoe666XXXXXX",
      name: "KatrinXXXX",
      surname: "DoeXXXX",
      email: "kdoe@gmail.com",
      role: "AGENTXXXX",
      date: "13.11.2017",
      enabled: "NOXX"
    }
  ],
  params: {
    userId: 0,
    filter: '',
    sortOrder: 'asc',
    pageNumber: 0,
    pageSize: 3,
    sortBy: ''
  }
};

export function homeReducer(
  state: HomeState = initialState,
  action: HomeActions
): HomeState {
    switch (action.type) {
      case GET_USERS_SUCCESS_ACTION:
        return {
          ...state,
          users: action.payload
        };

      case SET_USERS_PARAMS_ACTION:
        return {
          ...state,
          params: action.payload
        };

      default: {
        return state;
      }
    }
}


export const getHomeState = (state): HomeState => state.users;
export const getUsers = (homeState: HomeState):  User[] => homeState.users;
export const getParams = (homeState: HomeState):  PageParams => homeState.params;
export const getUsersSelector = createSelector( getHomeState, getUsers);
export const getParamsSelector = createSelector( getHomeState, getParams);
