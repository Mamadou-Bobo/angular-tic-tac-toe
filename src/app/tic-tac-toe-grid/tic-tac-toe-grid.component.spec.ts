import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicTacToeGridComponent } from './tic-tac-toe-grid.component';

describe('TicTacToeGridComponent', () => {
  let component: TicTacToeGridComponent;
  let fixture: ComponentFixture<TicTacToeGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicTacToeGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicTacToeGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
