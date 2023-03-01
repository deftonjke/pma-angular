/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Board } from '../../models/board.interface';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { deleteBoards } from '../../../core/store/actions/boards.actions';
import { BoardsState } from '../../../core/store/state/boards.state';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  constructor(private http: HttpClient, private store: Store<BoardsState>) {}

  createNewBoard(newBoard: Board): Observable<Board> {
    return this.http.post<Board>('/boards', newBoard);
  }

  getBoards(id: string): Observable<Board[]> {
    return this.http.get<Board[]>(`/boardsSet/${id}`);
  }

  updateBoard(board: Board, boardId: string): Observable<Board> {
    return this.http.put<Board>(`/boards/${boardId}`, board);
  }

  deleteBoard(id: string) {
    return this.http.delete(`/boards/${id}`).pipe(
      tap(res => {
        return this.store.dispatch(deleteBoards({ _id: id }));
      })
    );
  }
}
