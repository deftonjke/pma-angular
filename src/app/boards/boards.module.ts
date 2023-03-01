import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MainPageComponent } from './pages/main-page/main-page.component';
import { BoardPageComponent } from './pages/board-page/board-page.component';
import { CreateBoardComponent } from './components/create-board/create-board.component';
import { BoardComponent } from './pages/main-page/board/board.component';

import { ExpCheckGuard } from '../core/guards/exp-check.guard';
import { CreateColumnModalComponent } from './components/create-column-modal/create-column-modal.component';
import { ColumnComponent } from './pages/board-page/column/column.component';
import { TaskComponent } from './pages/board-page/task/task.component';
import { NotAuthGuard } from '../core/guards/not-auth.guard';
import { CreateTaskModalComponent } from './components/create-task-modal/create-task-modal.component';
import { TaskEditFormComponent } from './pages/board-page/task/task-edit-form/task-edit-form.component';
import { SharedModule } from '../shared/shared.module';
import { AssignUsersComponent } from './components/assign-users/assign-users.component';

@NgModule({
  declarations: [
    MainPageComponent,
    BoardPageComponent,
    CreateBoardComponent,
    BoardComponent,
    CreateColumnModalComponent,
    ColumnComponent,
    TaskComponent,
    CreateTaskModalComponent,
    TaskEditFormComponent,
    AssignUsersComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: MainPageComponent,
        canActivate: [NotAuthGuard, ExpCheckGuard],
      },
      {
        path: 'board/:id',
        component: BoardPageComponent,
        canActivate: [NotAuthGuard, ExpCheckGuard],
      },
      {
        path: 'board/:id/task/:id',
        component: TaskEditFormComponent,
        canActivate: [NotAuthGuard, ExpCheckGuard],
      },
    ]),
  ],
})
export class BoardsModule {}
