import { Dialog } from '@angular/cdk/dialog';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs/operators';
import { ColumnsState } from '../../../core/store/state/columns.state';
import * as boardsActions from '../../../core/store/actions/boards.actions';
import * as columnsActions from '../../../core/store/actions/columns.actions';
import * as tasksActions from '../../../core/store/actions/tasks.actions';
import { getBoards } from '../../../core/store/selectors/boards.selectors';
import { BoardsState } from '../../../core/store/state/boards.state';
import { CreateColumnModalComponent } from '../../components/create-column-modal/create-column-modal.component';
import { Board } from '../../models/board.interface';
import { Column, ColumnsOrder } from '../../models/column.interface';
import {
  getColumns,
  getErrorMessage,
} from '../../../core/store/selectors/columns.selectors';
import { Subscription } from 'rxjs';
import { TasksState } from 'src/app/core/store/state/tasks.state';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { AssignUsersComponent } from '../../components/assign-users/assign-users.component';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent implements OnInit, OnDestroy {
  board: Board = {} as Board;

  boardId: string = '';

  columns: Column[] = [];

  boardUsers: User[] = [];

  subscriptionBoard!: Subscription;

  subscriptionColumns!: Subscription;

  errorsSubscrBoards!: Subscription;

  errorsSubscrColumns!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private boardsStore: Store<BoardsState>,
    private columnStore: Store<ColumnsState>,
    private tasksStore: Store<TasksState>,
    public dialog: Dialog,
    private snackBarService: SnackBarService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => (this.boardId = params['id']));
    this.subscriptionBoard = this.boardsStore
      .select(getBoards)
      .pipe(map(b => b.find(board => board._id === this.boardId) as Board))
      .subscribe(boards => {
        this.board = boards;
        this.getBoardUsers();
      });
    this.errorsSubscrBoards = this.boardsStore
      .select(getErrorMessage)
      .subscribe(message => {
        if (message !== '') {
          this.snackBarService.openSnackBar(message);
        }
      });

    this.columnStore.dispatch(
      columnsActions.getColumns({ boardId: this.boardId })
    );
    this.columnStore.dispatch(
      columnsActions.getBoardIdToStore({
        boardId: this.boardId,
      })
    );
    this.tasksStore.dispatch(
      tasksActions.getAllTasks({ boardId: this.boardId })
    );
    this.getAllColumns();
  }

  getBoardUsers() {
    return this.userService
      .getUsers()
      .pipe(filter(users => !!users))
      .subscribe(users => {
        this.boardUsers = [...users].filter(user =>
          this.board?.users?.includes(user._id)
        );
        this.columnStore.dispatch(
          columnsActions.getBoardUsersToStore({
            boardUsers: this.boardUsers,
          })
        );
      });
  }

  onColumnCreateClick(): void {
    this.dialog.open(CreateColumnModalComponent, {
      data: { id: this.boardId },
    });
  }

  openAssignUsersDialog() {
    this.dialog.open(AssignUsersComponent, {
      data: { board: this.board, existingUsers: this.boardUsers },
    });
  }

  getAllColumns(): void {
    this.subscriptionColumns = this.columnStore
      .select(getColumns)
      .pipe(map(columns => [...columns].sort((a, b) => a.order - b.order)))
      .subscribe(columns => (this.columns = columns));

    this.errorsSubscrColumns = this.columnStore
      .select(getErrorMessage)
      .subscribe(message => {
        if (message !== '') {
          this.snackBarService.openSnackBar(message);
        }
      });
  }

  dropColumns(event: CdkDragDrop<Column[]>): void {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
    const newColumnsOrder: ColumnsOrder[] = [];
    this.columns.map((column, index) =>
      newColumnsOrder.push({ _id: column._id!, order: index })
    );
    this.columnStore.dispatch(
      columnsActions.updateColumnsOrder({ columns: newColumnsOrder })
    );
  }

  deleteUserFromBoard(userId: string) {
    const users = this.boardUsers
      .filter(user => user._id !== userId)
      .map(usr => usr._id);
    const updatedBoard: Board = {
      title: this.board.title,
      owner: this.board.owner,
      users: users,
    };
    this.boardsStore.dispatch(
      boardsActions.upadteBoard({ board: updatedBoard, boardId: this.boardId })
    );
  }

  backToMain() {
    this.router.navigateByUrl('');
  }

  ngOnDestroy(): void {
    this.boardId = '';
    this.columns = [];
    this.subscriptionColumns.unsubscribe();
    this.subscriptionBoard.unsubscribe();
    this.columnStore.dispatch(columnsActions.clearColumnsStore());
    this.errorsSubscrBoards.unsubscribe();
    this.errorsSubscrColumns.unsubscribe();
  }
}
