import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tic-tac-toe-grid',
  templateUrl: './tic-tac-toe-grid.component.html',
  styleUrls: ['./tic-tac-toe-grid.component.css']
})
export class TicTacToeGridComponent implements OnInit {

  @Input() symbol: string = '';
  @Output() isClicked = new EventEmitter<string>();


  constructor() { }

  ngOnInit(): void {
  }

  showItem() {
    this.isClicked.emit();
  }
  

}