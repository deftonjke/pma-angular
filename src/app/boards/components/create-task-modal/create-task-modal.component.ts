import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { TasksState } from '../../../core/store/state/tasks.state';
import * as tasksActions from '../../../core/store/actions/tasks.actions';
import { UserState } from '../../../core/store/state/user.state';
import { getUser } from '../../../core/store/selectors/user.selectors';

import { FormErrors } from '../../models/form-errors-enum';
import { Task } from '../../models/task.interface';
import { ColumnsState } from 'src/app/core/store/state/columns.state';
import { getCurrentBoardUsers } from 'src/app/core/store/selectors/columns.selectors';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-create-task-modal',
  templateUrl: './create-task-modal.component.html',
  styleUrls: ['./create-task-modal.component.scss'],
})
export class CreateTaskModalComponent implements OnInit, OnDestroy {
  createTaskForm!: FormGroup;

  userId: string = '';

  userIdSubscription!: Subscription;

  taskOrder!: number;

  assignedUsers: User[] = [];

  constructor(
    @Inject(DIALOG_DATA)
    public data: { columnId: string; boardId: string; taskOrder: number },
    public dialogRef: DialogRef,
    private userStore: Store<UserState>,
    private tasksStore: Store<TasksState>,
    private columnsStore: Store<ColumnsState>
  ) {}

  ngOnInit(): void {
    this.userIdSubscription = this.userStore
      .select(getUser)
      .subscribe(user => (this.userId = user?._id!));
    this.columnsStore
      .select(getCurrentBoardUsers)
      .subscribe(users => (this.assignedUsers = users));
    this.createTaskForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      usersSelect: new FormControl(''),
    });
    this.taskOrder = this.data.taskOrder;
  }

  get title() {
    return this.createTaskForm.get('title');
  }

  get description() {
    return this.createTaskForm.get('description');
  }

  get usersSelect() {
    return this.createTaskForm.get('usersSelect');
  }

  get descriptionErrorMessage() {
    return this.description!.hasError('required')
      ? FormErrors.DESCRIPTION_REQUIRED
      : '';
  }

  onSubmit() {
    if (this.createTaskForm.valid) {
      const task: Task = {
        title: this.title?.value,
        order: this.taskOrder,
        description: this.description?.value,
        userId: this.userId,
        users: this.usersSelect?.value,
      };
      this.tasksStore.dispatch(
        tasksActions.createNewTask({
          task: task,
          boardId: this.data.boardId,
          columnId: this.data.columnId,
        })
      );
      this.dialogRef.close();
    }
  }

  onClose() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.userIdSubscription.unsubscribe();
  }
}
