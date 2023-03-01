import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { catchError, finalize, throwError } from 'rxjs';
import { SnackBarService } from '../../../core/services/snack-bar.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  loginForm = new FormGroup(
    {
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    },
    { updateOn: 'submit' }
  );

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBarService: SnackBarService,
    private translateService: TranslateService
  ) {}

  submited = false;

  handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      this.snackBarService.openSnackBar(
        this.translateService.instant('API_ERRORS.authError')
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
    if (this.loginForm.valid) {
      this.submited = true;
      this.authService
        .login({
          login: this.loginForm.controls.login.value as string,
          password: this.loginForm.controls.password.value as string,
        })
        .pipe(
          finalize(() => {
            this.submited = false;
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
