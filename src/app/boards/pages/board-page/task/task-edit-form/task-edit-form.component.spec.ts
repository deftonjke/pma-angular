import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskEditFormComponent } from './task-edit-form.component';

describe('TaskPageComponent', () => {
  let component: TaskEditFormComponent;
  let fixture: ComponentFixture<TaskEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskEditFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
