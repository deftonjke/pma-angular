import { createReducer, on } from '@ngrx/store';

import { initialUserState, UserState } from '../state/user.state';
import * as UserActions from '../actions/user.actions';

export const userReducer = createReducer(
  initialUserState,
  on(
    UserActions.setUser,
    (state, { user }): UserState => ({
      ...state,
      user,
      isAuth: true,
    })
  ),
  on(
    UserActions.removeUser,
    (state): UserState => ({
      ...state,
      user: null,
      isAuth: false,
    })
  )
);
