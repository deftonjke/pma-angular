import * as fromTasks from '../state/tasks.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const getTasksSelector =
  createFeatureSelector<fromTasks.TasksState>('tasks');

export const selectTasks = (state: fromTasks.TasksState) => state.tasks;

export const getTasksQuantity = createSelector(
  getTasksSelector,
  (tasks: fromTasks.TasksState) => tasks.tasks.length
);

export const getTasks = createSelector(
  getTasksSelector,
  (tasks: fromTasks.TasksState) => tasks.tasks
);

export const getErrorMessage = createSelector(
  getTasksSelector,
  tasks => tasks.error
);
