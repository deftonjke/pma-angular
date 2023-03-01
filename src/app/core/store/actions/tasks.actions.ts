import { createAction, props } from '@ngrx/store';
import {
  Task,
  TaskForUpdateInSet,
} from '../../../boards/models/task.interface';

export const CREATE_TASK = '[Column] Create New Task';
export const CREATE_TASK_SUCCESS = '[Column] New Task Created';

export const GET_ALL_TASKS = '[Column] Get all tasks';
export const GET_ALL_TASKS_SUCCESS = '[Column] Get all tasks success';

export const GET_TASK = '[Task card in column] Get task by id';
export const GET_TASK_SUCCESS = '[Task card in column]] Get task success';

export const UPADTE_TASK = '[Task Modal] Update task';
export const UPADTE_TASK_SUCCESS = '[Task Modal] Update task success';

export const UPADTE_TASK_SET = '[Dragging form Column] Update tasks set';
export const UPADTE_TASK_SET_SUCCESS =
  '[Dragged to new Column] Update tasks set success';

export const DELETE_TASK = '[Task in column] Delete Task';
export const DELETE_TASK_SUCCESS = '[Task in column] Delete Task Success';
export const CATCH_ERROR = '[Board Page Errors] Catch errors with tasks';

export const createNewTask = createAction(
  CREATE_TASK,
  props<{ task: Task; boardId: string; columnId: string }>()
);
export const createNewTaskSuccess = createAction(
  CREATE_TASK_SUCCESS,
  props<{ task: Task }>()
);

export const getAllTasks = createAction(
  GET_ALL_TASKS,
  props<{ boardId: string }>()
);
export const getAllTasksSuccess = createAction(
  GET_ALL_TASKS_SUCCESS,
  props<{ tasks: Task[] }>()
);

export const updateTask = createAction(
  UPADTE_TASK,
  props<{ task: Task; taskId: string; boardId: string }>()
);
export const updateTaskSuccess = createAction(
  UPADTE_TASK_SUCCESS,
  props<{ task: Task }>()
);

export const updateTaskSet = createAction(
  UPADTE_TASK_SET,
  props<{ tasks: TaskForUpdateInSet[] }>()
);
export const updateTaskSetSuccess = createAction(
  UPADTE_TASK_SET_SUCCESS,
  props<{ tasks: Task[] }>()
);

export const deleteTask = createAction(DELETE_TASK, props<{ task: Task }>());

export const deleteTaskSuccess = createAction(
  DELETE_TASK_SUCCESS,
  props<{ _id: string }>()
);

export const catchTasksError = createAction(
  CATCH_ERROR,
  props<{ message: string }>()
);
