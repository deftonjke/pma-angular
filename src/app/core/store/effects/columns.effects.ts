/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';

import * as columnsActions from '../actions/columns.actions';

import { ColumnService } from '../../../boards/services/column-service/column.service';
import { Column, ColumnsOrder } from '../../../boards/models/column.interface';
import { Store } from '@ngrx/store';
import { ColumnsState } from '../state/columns.state';
import { of } from 'rxjs';
import { ErrorService } from 'src/app/boards/services/error-service/error.service';
import * as LoaderActions from '../actions/loader.actions';

@Injectable()
export class ColumnsEffects {
  createColumn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(columnsActions.CREATE_COLUMN),
      mergeMap((action: Column) => {
        return this.columnsService
          .createColumn(action.title, action.order, action.boardId!)
          .pipe(
            map(column => {
              window.location.reload();
              return columnsActions.createNewColumnSuccess({ column });
            }),
            catchError(resp => {
              const errorMessage: string = this.errorService.getErrorMessage(
                resp.error
              );
              return of(
                columnsActions.catchColumnsError({ message: errorMessage })
              );
            })
          );
      })
    );
  });

  getColumns$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(columnsActions.GET_COLUMNS),
      mergeMap((action: ColumnsState) => {
        this.store.dispatch(LoaderActions.setIsLoading({ isLoading: true }));
        return this.columnsService.getColumns(action.boardId).pipe(
          map(columns => {
            this.store.dispatch(
              LoaderActions.setIsLoading({ isLoading: false })
            );
            return columnsActions.getColumnsSuccess({ columns });
          }),
          catchError(resp => {
            const errorMessage: string = this.errorService.getErrorMessage(
              resp.error
            );
            this.store.dispatch(
              LoaderActions.setIsLoading({ isLoading: false })
            );
            return of(
              columnsActions.catchColumnsError({ message: errorMessage })
            );
          })
        );
      })
    );
  });

  deleteColumns$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(columnsActions.DELETE_COLUMN),
      mergeMap((action: Column) => {
        return this.columnsService
          .deleteColumn(action._id!, action.boardId!)
          .pipe(
            map(() => {
              return columnsActions.deleteColumnSuccess({ _id: action._id! });
            })
          );
      })
    );
  });

  updateColumnsOrder$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(columnsActions.UPDATE_COLUMNS_ORDER),
      mergeMap((action: { columns: ColumnsOrder[]; type: string }) => {
        return this.columnsService.updateColumns(action.columns).pipe(
          map(columns => {
            return columnsActions.updateColumnsOrderSuccess({ columns });
          }),
          catchError(resp => {
            const errorMessage: string = this.errorService.getErrorMessage(
              resp.error
            );
            return of(
              columnsActions.catchColumnsError({ message: errorMessage })
            );
          })
        );
      })
    );
  });

  updateColumnTitle$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(columnsActions.UPDATE_COLUMN_TITLE),
      mergeMap(
        (action: {
          boardId: string;
          column: Column;
          columnId: string;
          type: string;
        }) => {
          return this.columnsService
            .updateColumnTitle(action.boardId!, action.column, action.columnId)
            .pipe(
              map(column => {
                return columnsActions.updateColumnTitleSuccess({ column });
              }),
              catchError(resp => {
                const errorMessage: string = this.errorService.getErrorMessage(
                  resp.error
                );
                return of(
                  columnsActions.catchColumnsError({ message: errorMessage })
                );
              })
            );
        }
      )
    );
  });

  constructor(
    private actions$: Actions,
    private columnsService: ColumnService,
    private errorService: ErrorService,
    private store: Store
  ) {}
}
