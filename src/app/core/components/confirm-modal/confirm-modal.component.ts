import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { SnackBarService } from '../../services/snack-bar.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
})
export class ConfirmModalComponent {
  title!: string;

  callback!: Observable<void> | (() => void);

  constructor(
    private userService: UserService,
    private snackBarService: SnackBarService,
    private dialogRef: MatDialogRef<ConfirmModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    data: { target: string; callback: Observable<void> | (() => void) }
  ) {
    this.title = data.target;
    this.callback = data.callback;
  }

  OK() {
    if (this.callback instanceof Observable) {
      this.callback.subscribe({ error: e => this.handleError(e) });
    } else {
      this.callback();
    }

    this.dialogRef.close();
  }

  cancel() {
    this.dialogRef.close();
  }

  handleError(error: HttpErrorResponse) {
    this.snackBarService.openSnackBar(
      `${error.error.statusCode}: ${error.error.message}`
    );

    this.userService.logout();
  }
}

export const openDialog = (
  dialog: MatDialog,
  cb: Observable<void> | (() => void),
  target: string
) => {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.data = {
    target: target,
    callback: cb,
  };

  dialog.open(ConfirmModalComponent, dialogConfig);
};
