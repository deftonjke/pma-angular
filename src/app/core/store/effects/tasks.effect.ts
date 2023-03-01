import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Task, TaskForUpdateInSet } from 'src/app/boards/models/task.interface';
import { ErrorService } from 'src/app/boards/services/error-service/error.service';

import { TaskService } from '../../../boards/services/task-service/task.service';
import * as tasksActions from '../actions/tasks.actions';

@Injectable()
export class TasksEffects {
  createTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(tasksActions.CREATE_TASK),
      mergeMap(
        (action: {
          task: Task;
          boardId: string;
          columnId: string;
          type: string;
        }) => {
          return this.tasksService
            .createTask(action.task, action.boardId, action.columnId)
            .pipe(
              map(task => {
                return tasksActions.createNewTaskSuccess({ task });
              }),
              catchError(resp => {
                const errorMessage: string = this.errorService.getErrorMessage(
                  resp.error
                );
                return of(
                  tasksActions.catchTasksError({ message: errorMessage })
                );
              })
            );
        }
      )
    );
  });

  getAllTasks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(tasksActions.GET_ALL_TASKS),
      mergeMap(
        (action: { boardId: string; columnId: string; type: string }) => {
          return this.tasksService.getAllTasks(action.boardId).pipe(
            map(tasks => {
              return tasksActions.getAllTasksSuccess({ tasks: tasks });
            })
          );
        }
      )
    );
  });

  updateTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(tasksActions.UPADTE_TASK),
      mergeMap(
        (action: {
          task: Task;
          taskId: string;
          boardId: string;
          type: string;
        }) => {
          return this.tasksService
            .updateTask(action.task, action.taskId, action.boardId)
            .pipe(
              map(task => {
                return tasksActions.updateTaskSuccess({ task });
              }),
              catchError(resp => {
                const errorMessage: string = this.errorService.getErrorMessage(
                  resp.error
                );
                return of(
                  tasksActions.catchTasksError({ message: errorMessage })
                );
              })
            );
        }
      )
    );
  });

  updateSetOfTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(tasksActions.UPADTE_TASK_SET),
      mergeMap((action: { tasks: TaskForUpdateInSet[]; type: string }) => {
        return this.tasksService.updateSetOfTasks(action.tasks).pipe(
          map(tasks => {
            return tasksActions.updateTaskSetSuccess({ tasks });
          }),
          catchError(resp => {
            const errorMessage: string = this.errorService.getErrorMessage(
              resp.error
            );
            return of(tasksActions.catchTasksError({ message: errorMessage }));
          })
        );
      })
    );
  });

  deleteTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(tasksActions.DELETE_TASK),
      mergeMap((action: { task: Task; type: string }) => {
        return this.tasksService
          .deleteTask(
            action.task._id!,
            action.task.boardId!,
            action.task.columnId!
          )
          .pipe(
            map(() => {
              return tasksActions.deleteTaskSuccess({ _id: action.task._id! });
            })
          );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private tasksService: TaskService,
    private errorService: ErrorService
  ) {}
}
