import { Component, Inject, OnInit } from '@angular/core';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ColumnsState } from 'src/app/core/store/state/columns.state';
import { select, Store } from '@ngrx/store';
import * as ColumnsActions from '../../../core/store/actions/columns.actions';
import { getColumnsQuantity } from '../../../core/store/selectors/columns.selectors';

@Component({
  selector: 'app-create-column-modal',
  templateUrl: './create-column-modal.component.html',
  styleUrls: ['./create-column-modal.component.scss'],
})
export class CreateColumnModalComponent implements OnInit {
  createColumnFrom!: FormGroup;

  order!: number;

  constructor(
    @Inject(DIALOG_DATA) public data: { id: string },
    public dialogRef: DialogRef,
    private columnStore: Store<ColumnsState>
  ) {}

  ngOnInit(): void {
    this.columnStore
      .pipe(select(getColumnsQuantity))
      .subscribe(quantity => (this.order = quantity));
    this.createColumnFrom = new FormGroup({
      title: new FormControl('', [Validators.required]),
    });
  }

  get title() {
    return this.createColumnFrom.get('title');
  }

  onSubmit() {
    if (this.createColumnFrom.valid) {
      this.columnStore.dispatch(
        ColumnsActions.createNewColumn({
          title: this.title?.value,
          order: this.order,
          boardId: this.data.id,
        })
      );
      this.dialogRef.close();
    }
  }

  onClose() {
    this.dialogRef.close();
  }
}
