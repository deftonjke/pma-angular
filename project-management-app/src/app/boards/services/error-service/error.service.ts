import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as UserActions from '../../../core/store/actions/user.actions';

export interface ErrorMessage {
  message: string;
  statusCode: number;
}

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(
    private translateService: TranslateService,
    private store: Store
  ) {}

  getErrorMessage(message: ErrorMessage) {
    switch (message.statusCode) {
      case 400:
        return this.translateService.instant('API_ERRORS.badRequest');
      case 403:
        this.store.dispatch(UserActions.userLogout());
        return this.translateService.instant('API_ERRORS.invalidToken');
      case 404:
        return this.translateService.instant('API_ERRORS.notFounded');
      default:
        return this.translateService.instant('API_ERRORS.unknowError');
    }
  }
}
