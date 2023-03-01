import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalsService } from '../../services/modals-services/modals.service';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';

import * as fromUser from '../../store/selectors/user.selectors';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isUserAuthorized: boolean = false;

  private subs!: Subscription;

  userId: string = '';

  languageList = {
    EN: 'ru',
    RU: 'en',
  };

  switchLangTo = '';

  constructor(
    private modalsService: ModalsService,
    private store: Store,
    private userService: UserService,
    private translate: TranslateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.switchLangTo =
      this.languageList[
        (localStorage.getItem('pma-lang') ||
          'EN') as keyof typeof this.languageList
      ].toUpperCase();
    this.translate.setDefaultLang(this.switchLangTo === 'RU' ? 'en' : 'ru');
    this.subs = this.store.select(fromUser.getIsAuth).subscribe(status => {
      this.isUserAuthorized = status;
    });
  }

  onCreateNewBoard() {
    this.router.navigateByUrl('/');
    this.modalsService.showCreateBoardModal = true;
  }

  logout(): void {
    this.userService.logout();
  }

  changeLang() {
    this.translate.use(this.switchLangTo === 'RU' ? 'ru' : 'en');
    localStorage.setItem('pma-lang', this.switchLangTo);
    this.switchLangTo =
      this.languageList[
        this.switchLangTo as keyof typeof this.languageList
      ].toUpperCase();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
