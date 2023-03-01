import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../services/user.service';

import * as UserActions from '../actions/user.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { BoardsState } from '../state/boards.state';
import * as BaordsActions from '../actions/boards.actions';
import { Store } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackBarService } from '../../services/snack-bar.service';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private BoardsStore: Store<BoardsState>,
    private snackBarService: SnackBarService
  ) {}

  fetchUserOnInitApp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.fetchUser),
      mergeMap(() => {
        return this.userService.fetchUser().pipe(
          map(currentUser => {
            this.BoardsStore.dispatch(
              BaordsActions.getBoards({ id: currentUser._id })
            );
            return UserActions.setUser({ user: currentUser });
          }),
          catchError(err => {
            if (err instanceof HttpErrorResponse) {
              this.snackBarService.openSnackBar(
                `${err.error.statusCode}: ${err.error.message}`
              );
            }

            return of(UserActions.userLogout());
          })
        );
      })
    );
  });

  clearData$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.userLogout),
        tap(() => {
          this.userService.logout();
        })
      ),
    { dispatch: false }
  );
}
