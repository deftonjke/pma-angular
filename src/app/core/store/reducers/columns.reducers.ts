import { createReducer, on } from '@ngrx/store';

import { initialColumnState } from '../state/columns.state';
import * as ColumnsActions from '../actions/columns.actions';

export const columnsReducer = createReducer(
  initialColumnState,
  on(ColumnsActions.getBoardIdToStore, (state, { boardId }) => ({
    columns: [...state.columns],
    boardId: boardId,
    boardUsers: state.boardUsers,
    error: '',
  })),
  on(ColumnsActions.getBoardUsersToStore, (state, { boardUsers }) => ({
    columns: [...state.columns],
    boardId: state.boardId,
    boardUsers: boardUsers,
    error: '',
  })),
  on(ColumnsActions.createNewColumnSuccess, (state, { column }) => ({
    columns: [...state.columns, column],
    boardId: state.boardId,
    boardUsers: state.boardUsers,
    error: '',
  })),
  on(ColumnsActions.getColumnsSuccess, (state, { columns }) => ({
    columns: [...columns],
    boardId: state.boardId,
    boardUsers: state.boardUsers,
    error: '',
  })),
  on(ColumnsActions.deleteColumnSuccess, (state, { _id: id }) => ({
    columns: [...state.columns].filter(column => column._id !== id),
    boardId: state.boardId,
    boardUsers: state.boardUsers,
    error: '',
  })),
  on(ColumnsActions.updateColumnsOrderSuccess, (state, { columns }) => ({
    columns: [...columns],
    boardId: state.boardId,
    boardUsers: state.boardUsers,
    error: '',
  })),
  on(ColumnsActions.updateColumnTitleSuccess, (state, { column }) => ({
    columns: [
      ...state.columns.filter(columnState => columnState._id !== column._id),
      column,
    ],
    boardId: state.boardId,
    boardUsers: state.boardUsers,
    error: '',
  })),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  on(ColumnsActions.clearColumnsStore, state => initialColumnState),
  on(ColumnsActions.catchColumnsError, (state, action) => ({
    columns: [...state.columns],
    boardId: state.boardId,
    boardUsers: state.boardUsers,
    error: action.message,
  }))
);
