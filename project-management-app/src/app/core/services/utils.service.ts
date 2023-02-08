import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(private translateService: TranslateService) {}

  ownValidator(regex: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value || (value && value.length < 2)) {
        return null;
      }

      const allowed = regex.test(value);
      return allowed ? null : { errorMsg: true };
    };
  }

  passValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const errorMessage = {
        errorMsg: {
          hasMinLength: '',
          hasUpperCase: '',
          hasNumeric: '',
          hasSpecSymbol: '',
        },
      };

      if (!value) {
        return null;
      }

      const hasMinLength = /^.{8,}$/.test(value);

      if (!hasMinLength) {
        errorMessage.errorMsg.hasMinLength =
          this.translateService.instant('FORM.passMinL');
      }

      const hasUpperCase = /[A-Z]/.test(value);

      if (!hasUpperCase) {
        errorMessage.errorMsg.hasUpperCase = this.translateService.instant(
          'FORM.passHasUpperCase'
        );
      }

      const hasNumeric = /[0-9]/.test(value);

      if (!hasNumeric) {
        errorMessage.errorMsg.hasNumeric = this.translateService.instant(
          'FORM.passHasNumeric'
        );
      }
      const hasSpecSymbol = /[!@#?\]]/.test(value);

      if (!hasSpecSymbol) {
        errorMessage.errorMsg.hasSpecSymbol =
          this.translateService.instant('FORM.passHasSymbol');
      }

      return hasMinLength && hasUpperCase && hasNumeric && hasSpecSymbol
        ? null
        : errorMessage;
    };
  }
}
