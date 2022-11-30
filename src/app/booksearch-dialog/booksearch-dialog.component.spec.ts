import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksearchDialogComponent } from './booksearch-dialog.component';

describe('BooksearchDialogComponent', () => {
  let component: BooksearchDialogComponent;
  let fixture: ComponentFixture<BooksearchDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooksearchDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksearchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
