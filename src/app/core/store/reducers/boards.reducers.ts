import { createReducer, on } from '@ngrx/store';

import { initialBoardState } from '../state/boards.state';
import * as BoardsActions from '../actions/boards.actions';

export const boardsReducer = createReducer(
  initialBoardState,
  on(BoardsActions.createNewBoardSuccess, (state, { board }) => ({
    boards: [...state.boards, board],
    error: state.error,
  })),
  on(BoardsActions.getBoardsSuccess, (state, boards) => ({
    boards: [...boards.boards],
    error: '',
  })),
  on(BoardsActions.deleteBoardsSuccess, (state, { _id: id }) => ({
    boards: [...state.boards].filter(board => board._id !== id),
    error: '',
  })),
  on(BoardsActions.upadteBoardSuccess, (state, { board }) => ({
    boards: [...state.boards.filter(b => b._id !== board._id), board],
    error: state.error,
  })),
  on(BoardsActions.catchBoardsError, (state, action) => ({
    boards: [...state.boards],
    error: action.message,
  }))
);
