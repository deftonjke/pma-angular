import * as fromBoards from '../state/boards.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const getBaordsSelector =
  createFeatureSelector<fromBoards.BoardsState>('boards');

export const getBoards = createSelector(
  getBaordsSelector,
  boards => boards.boards
);

export const getErrorMessage = createSelector(
  getBaordsSelector,
  boards => boards.error
);
