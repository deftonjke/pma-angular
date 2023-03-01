import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Board } from '../../../models/board.interface';
import { ColumnsState } from '../../../../core/store/state/columns.state';
import * as columnsActions from '../../../../core/store/actions/columns.actions';
import { BoardsState } from '../../../../core/store/state/boards.state';
import * as boardsActions from '../../../../core/store/actions/boards.actions';
import { openDialog } from '../../../../core/components/confirm-modal/confirm-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  @Input() board!: Board;

  constructor(
    private router: Router,
    private columnsStore: Store<ColumnsState>,
    private boardsStore: Store<BoardsState>,
    private matDialog: MatDialog,
    private translateService: TranslateService
  ) {}

  navigateToBoard(boardId: string) {
    this.router.navigate(['/board', boardId]);
    this.columnsStore.dispatch(
      columnsActions.getBoardIdToStore({
        boardId: boardId,
      })
    );
  }

  openConfirmModal() {
    openDialog(
      this.matDialog,
      () => {
        this.boardsStore.dispatch(
          boardsActions.deleteBoards({ _id: this.board._id! })
        );
      },
      this.translateService.instant('CONFIRM_MODAL.targetBoard')
    );
  }
}
