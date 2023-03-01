import { createReducer, on } from '@ngrx/store';

import { initialTasksState } from '../state/tasks.state';
import * as TasksActions from '../actions/tasks.actions';

export const tasksReducer = createReducer(
  initialTasksState,
  on(TasksActions.createNewTaskSuccess, (state, { task }) => ({
    tasks: [...state.tasks, task],
    error: '',
  })),
  on(TasksActions.getAllTasksSuccess, (state, { tasks }) => ({
    tasks: [...tasks],
    error: '',
  })),
  on(TasksActions.updateTaskSuccess, (state, { task }) => ({
    tasks: [...state.tasks.filter(t => t._id !== task._id), task],
    error: '',
  })),
  on(TasksActions.updateTaskSetSuccess, (state, { tasks }) => ({
    tasks: [
      ...state.tasks.map(obj => tasks.find(o => o._id === obj._id) || obj),
    ],
    error: '',
  })),
  on(TasksActions.deleteTaskSuccess, (state, { _id: id }) => ({
    tasks: [...state.tasks].filter(task => task._id !== id),
    error: '',
  })),
  on(TasksActions.catchTasksError, (state, action) => ({
    tasks: [...state.tasks],
    error: action.message,
  }))
);
