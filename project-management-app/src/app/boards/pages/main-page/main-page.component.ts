import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalsService } from '../../../core/services/modals-services/modals.service';
import {
  getBoards,
  getErrorMessage,
} from '../../../core/store/selectors/boards.selectors';
import { Board } from '../../models/board.interface';
import { Store } from '@ngrx/store';
import { BoardsState } from '../../../core/store/state/boards.state';
import { Subscription } from 'rxjs';
import { SnackBarService } from 'src/app/core/services/snack-bar.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit, OnDestroy {
  boards!: Board[];

  userId: string = '';

  boardsSubscription!: Subscription;

  errorsSubscription!: Subscription;

  constructor(
    public modalsService: ModalsService,
    private boardsStore: Store<BoardsState>,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {
    this.boardsSubscription = this.boardsStore
      .select(getBoards)
      .subscribe(boards => (this.boards = boards));

    this.errorsSubscription = this.boardsStore
      .select(getErrorMessage)
      .subscribe(message => {
        if (message !== '') {
          this.snackBarService.openSnackBar(message);
        }
      });
  }

  onCreateNewBoard() {
    this.modalsService.showCreateBoardModal = true;
  }

  ngOnDestroy(): void {
    this.boardsSubscription.unsubscribe();
    this.errorsSubscription.unsubscribe();
  }
}
