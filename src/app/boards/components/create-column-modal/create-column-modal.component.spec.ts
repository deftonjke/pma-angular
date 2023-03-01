import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateColumnModalComponent } from './create-column-modal.component';

describe('CreateColumnModalComponent', () => {
  let component: CreateColumnModalComponent;
  let fixture: ComponentFixture<CreateColumnModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateColumnModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateColumnModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
