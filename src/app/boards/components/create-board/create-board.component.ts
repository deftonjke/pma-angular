import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { BoardsState } from '../../../core/store/state/boards.state';
import { ModalsService } from '../../../core/services/modals-services/modals.service';
import * as BoardActions from '../../../core/store/actions/boards.actions';

import { UserState } from 'src/app/core/store/state/user.state';
import { getUser } from 'src/app/core/store/selectors/user.selectors';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { Observable, Subscription } from 'rxjs';
import { getErrorMessage } from 'src/app/core/store/selectors/boards.selectors';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.scss'],
})
export class CreateBoardComponent implements OnInit, OnDestroy {
  createBoardForm!: FormGroup;

  userId: string | undefined = '';

  userSubscription!: Subscription;

  users!: Observable<User[]>;

  constructor(
    private store: Store<BoardsState>,
    private userStore: Store<UserState>,
    private modalsService: ModalsService,
    private userService: UserService,
    public snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.userStore
      .select(getUser)
      .subscribe(user => (this.userId = user?._id));
    this.users = this.userService.getUsers();
    this.createBoardForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      usersSelect: new FormControl(''),
    });
  }

  get title() {
    return this.createBoardForm.get('title');
  }

  get usersSelect() {
    return this.createBoardForm.get('usersSelect');
  }

  onSubmit(formDirective: FormGroupDirective) {
    if (this.createBoardForm.valid) {
      this.store.dispatch(
        BoardActions.createNewBoard({
          title: this.title?.value,
          owner: this.userId!,
          users: this.usersSelect?.value,
        })
      );
      this.store.select(getErrorMessage).subscribe(message => {
        if (message !== '') {
          this.snackBarService.openSnackBar(message);
        }
      });
      this.createBoardForm.reset();
      formDirective.resetForm();
      this.modalsService.showCreateBoardModal = false;
    }
  }

  onCloseModal() {
    this.modalsService.showCreateBoardModal = false;
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
