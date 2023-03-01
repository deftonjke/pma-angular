import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, finalize, switchMap, throwError } from 'rxjs';
import { NewUser } from '../../models/auth.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SnackBarService } from '../../../core/services/snack-bar.service';
import { UtilsService } from 'src/app/core/services/utils.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
})
export class SignupPageComponent {
  submited = false;

  signUpForm = new FormGroup(
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
    private authService: AuthService,
    private router: Router,
    private snackBarService: SnackBarService,
    private utilsService: UtilsService,
    private translateService: TranslateService
  ) {}

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

  onSubmit() {
    if (this.signUpForm.valid) {
      this.submited = true;
      this.authService
        .signup(this.signUpForm.value as NewUser)
        .pipe(
          finalize(() => {
            this.submited = false;
          }),
          switchMap(() => {
            return this.authService.login({
              login: this.signUpForm.controls.login.value as string,
              password: this.signUpForm.controls.password.value as string,
            });
          }),
          catchError(err => this.handleError(err))
        )
        .subscribe({
          next: () => this.router.navigateByUrl('/'),
          error: () => {},
        });
    }
  }
}
