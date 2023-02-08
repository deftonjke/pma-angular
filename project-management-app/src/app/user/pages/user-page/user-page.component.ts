import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { catchError, finalize, throwError } from 'rxjs';
import { UserService } from '../../../core/services/user.service';
import { SnackBarService } from '../../../core/services/snack-bar.service';
import { getUser } from '../../../core/store/selectors/user.selectors';

import * as UserAction from '../../../core/store/actions/user.actions';
import { User } from 'src/app/core/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { openDialog } from '../../../core/components/confirm-modal/confirm-modal.component';
import { UtilsService } from 'src/app/core/services/utils.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
})
export class UserPageComponent implements OnInit {
  currentUser!: User;

  submited = false;

  isSuccessSubmited = false;

  ProfileForm = new FormGroup(
    {
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
        this.utilsService.ownValidator(
          /^([A-Za-zА-ЯЁа-яё]+)( ?)([A-Za-zА-ЯЁа-яё]+)?$/i
        ),
      ]),
      login: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
        this.utilsService.ownValidator(/^([A-Za-z0-9]+)$/i),
      ]),
      password: new FormControl('', [
        Validators.required,
        this.utilsService.passValidator(),
      ]),
    },
    { updateOn: 'submit' }
  );

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private snackBarService: SnackBarService,
    private store: Store,
    private utilsService: UtilsService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.store.select(getUser).subscribe(user => {
      if (user) {
        this.currentUser = user;
        this.ProfileForm.setValue({
          name: user.name || '',
          login: user.login,
          password: '',
        });

        if (!user.name) {
          this.store.dispatch(UserAction.fetchUser());
        }
      }
    });
  }

  handleError(error: HttpErrorResponse) {
    if (error.status === 409) {
      this.snackBarService.openSnackBar(
        this.translateService.instant('API_ERRORS.loginExist')
      );
    } else if (error.status === 400) {
      this.snackBarService.openSnackBar(
        this.translateService.instant('API_ERRORS.bodyRequest')
      );
    } else {
      this.snackBarService.openSnackBar(
        this.translateService.instant('API_ERRORS.unknowError')
      );
    }

    return throwError(() => error);
  }

  onSubmit(formDirective: FormGroupDirective) {
    if (this.ProfileForm.valid) {
      this.submited = true;
      this.userService
        .updateUser(
          {
            name: this.ProfileForm.controls.name.value!,
            login: this.ProfileForm.controls.login.value!,
            password: this.ProfileForm.controls.password.value!,
          },
          this.currentUser._id
        )
        .pipe(
          finalize(() => {
            this.submited = false;
          }),
          catchError(err => this.handleError(err))
        )
        .subscribe({
          next: () => {
            this.isSuccessSubmited = true;
            formDirective.resetForm();
            this.ProfileForm.setValue({
              name: this.currentUser.name!,
              login: this.currentUser.login,
              password: '',
            });

            setTimeout(() => {
              this.isSuccessSubmited = false;
            }, 3000);
          },
          error: () => {},
        });
    }
  }

  openConfirmModal() {
    openDialog(
      this.dialog,
      this.userService.deleteUser(this.currentUser._id),
      this.translateService.instant('CONFIRM_MODAL.targetAccount')
    );
  }
}
