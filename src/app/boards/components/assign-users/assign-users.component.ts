import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { BoardsState } from 'src/app/core/store/state/boards.state';
import { Board } from '../../models/board.interface';
import * as boardsActions from '../../../core/store/actions/boards.actions';

@Component({
  selector: 'app-assign-users',
  templateUrl: './assign-users.component.html',
  styleUrls: ['./assign-users.component.scss'],
})
export class AssignUsersComponent implements OnInit, OnDestroy {
  userId: string = '';

  assignUsersForm!: FormGroup;

  restUsers: User[] = [];

  userSubscription!: Subscription;

  constructor(
    @Inject(DIALOG_DATA) public data: { board: Board; existingUsers: User[] },
    public dialogRef: DialogRef,
    private userService: UserService,
    private boardsStore: Store<BoardsState>
  ) {}

  ngOnInit(): void {
    this.userId = this.data.board.owner;
    this.userSubscription = this.userService
      .getUsers()
      .pipe(map(users => users.filter(u => u._id !== this.data.board.owner)))
      .subscribe(
        users =>
          (this.restUsers = users.filter(
            user => !this.data.board.users.includes(user._id)
          ))
      );
    this.createAssignUserForm();
  }

  get usersSelect() {
    return this.assignUsersForm.get('usersSelect');
  }

  createAssignUserForm() {
    this.assignUsersForm = new FormGroup({
      usersSelect: new FormControl(''),
    });
  }

  onAssignUserToBoardClick() {
    if (this.usersSelect?.value) {
      const updatedBoard: Board = {
        title: this.data.board.title,
        owner: this.data.board.owner,
        users: [...this.data.board.users, ...this.usersSelect?.value],
      };
      this.boardsStore.dispatch(
        boardsActions.upadteBoard({
          board: updatedBoard,
          boardId: this.data.board._id!,
        })
      );
    }
    this.dialogRef.close();
  }

  onClose() {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
