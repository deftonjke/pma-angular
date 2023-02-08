import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { TokenModel, NewUser } from '../models/auth.model';
import { Store } from '@ngrx/store';
import { UserState } from '../../core/store/state/user.state';
import { User } from '../../core/models/user.model';

import * as UserActions from '../../core/store/actions/user.actions';
import { UserService } from 'src/app/core/services/user.service';

import * as BoardsActions from '../../core/store/actions/boards.actions';
import { BoardsState } from 'src/app/core/store/state/boards.state';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private store: Store<UserState>,
    private boardsStore: Store<BoardsState>,
    private userService: UserService
  ) {}

  signup(user: NewUser): Observable<User> {
    return this.http.post<User>('/auth/signup', user);
  }

  login(user: NewUser): Observable<void> {
    return this.http.post<TokenModel>('/auth/signin', user).pipe(
      map(({ token }) => {
        localStorage.setItem('team4-token', token);
        const { id, login } = this.userService.getInfoFromToken(token)!;
        this.store.dispatch(UserActions.setUser({ user: { _id: id, login } }));
        this.boardsStore.dispatch(BoardsActions.getBoards({ id: id }));
      })
    );
  }
}
