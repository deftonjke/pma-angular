import { ActionReducerMap } from '@ngrx/store';

import { AppState } from '../state/app.state';

import { boardsReducer } from './boards.reducers';
import { columnsReducer } from './columns.reducers';
import { tasksReducer } from './tasks.reducers';
import { userReducer } from './user.reducers';
import { loaderReducer } from './loader.reducers';

export const appReducers: ActionReducerMap<AppState> = {
  loader: loaderReducer,
  boards: boardsReducer,
  columns: columnsReducer,
  tasks: tasksReducer,
  user: userReducer,
};
