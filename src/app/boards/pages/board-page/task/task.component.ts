import { Dialog } from '@angular/cdk/dialog';
import { Component, Input } from '@angular/core';
import { Task } from '../../../models/task.interface';
import { TaskEditFormComponent } from './task-edit-form/task-edit-form.component';
import { Store } from '@ngrx/store';
import { TasksState } from '../../../../core/store/state/tasks.state';
import { MatDialog } from '@angular/material/dialog';
import { openDialog } from '../../../../core/components/confirm-modal/confirm-modal.component';
import { TranslateService } from '@ngx-translate/core';

import * as tasksActions from '../../../../core/store/actions/tasks.actions';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input() currentTask!: Task;

  isDeleted: boolean = false;

  constructor(
    public dialog: Dialog,
    private tasksStore: Store<TasksState>,
    private matDialog: MatDialog,
    private translateService: TranslateService
  ) {}

  onTaskOpen() {
    this.dialog.open(TaskEditFormComponent, {
      data: this.currentTask,
    });
  }

  openConfirmModal() {
    openDialog(
      this.matDialog,
      () => {
        this.tasksStore.dispatch(
          tasksActions.deleteTask({ task: this.currentTask })
        );
      },
      this.translateService.instant('CONFIRM_MODAL.targetTask')
    );
  }
}
