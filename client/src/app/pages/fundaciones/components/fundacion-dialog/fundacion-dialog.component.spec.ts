import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundacionDialogComponent } from './fundacion-dialog.component';

describe('FundacionDialogComponent', () => {
  let component: FundacionDialogComponent;
  let fixture: ComponentFixture<FundacionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FundacionDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FundacionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
