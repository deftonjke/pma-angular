import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../state/user.state';

export const getUserSelector = createFeatureSelector<UserState>('user');

export const getIsAuth = createSelector(getUserSelector, user => user.isAuth);

export const getUser = createSelector(getUserSelector, user => user.user);

export const getUserId = createSelector(
  getUserSelector,
  user => user.user?._id
);
