import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  symbol: string = "O";
  currentPlayer!: string;
  playerOneScore: number = 0;
  playerTwoScore: number = 0;

  elements: string[] = [];
  array: number[] = [];

  lastPlayer!: string;

  isWinner: boolean = false;
  win: boolean = false;
  notWin: boolean = false;
  isClicked: boolean = false;

  firstPosition!: number;
  secondPosition!: number;
  thirdPosition!: number;

  symbolSubject = new Subject<string>();
  winnerSubject = new Subject<boolean>();
  gameOverSubject = new Subject<boolean>();
  lastPlayerSubject = new Subject<string>();
  winSubject = new Subject<boolean>();
  elementsSubject = new Subject<string[]>();
  arraySubject = new Subject<number[]>();
  playerOneSubject = new Subject<boolean>();
  playerTwoSubject = new Subject<boolean>();
  isClickableSubject = new Subject<boolean>();
  isClickedSubject = new Subject<boolean>();
  firstPositioSubject = new Subject<number>();
  secondPositioSubject = new Subject<number>();
  thirdPositioSubject = new Subject<number>();

  playerOne?: boolean;
  playerTwo?: boolean;
  isClickable!: boolean;

  constructor() { }

  emitArrays(): void {
    this.elementsSubject.next(this.elements);
    this.arraySubject.next(this.array);
  }

  emitPositions(): void {
    this.firstPositioSubject.next(this.firstPosition);
    this.secondPositioSubject.next(this.secondPosition);
    this.thirdPositioSubject.next(this.thirdPosition);
  }

  emitSymbol(): void {
    this.symbolSubject.next(this.symbol);
  }

  emitWinner(): void {
    this.winnerSubject.next(this.isWinner);
  }

  emitGameOver(): void {
    this.gameOverSubject.next(this.notWin);
  }

  emitLastPlayer(): void {
    this.lastPlayerSubject.next(this.lastPlayer);
  }

  emitWin(): void {
    this.winSubject.next(this.win);
  }

  emitPlayerOne(): void {
    this.playerOneSubject.next(this.playerOne);
  }

  emitPlayerTwo(): void {
    this.playerTwoSubject.next(this.playerTwo);
  }

  emitIsClickable(): void {
    this.isClickableSubject.next(this.isClickable);
  }

  setWinner(currentPlayer: string): void {
    setTimeout(() => {
      if (currentPlayer === 'X') {
        this.playerOneScore++;
      } else if (currentPlayer === 'O') {
        this.playerTwoScore++;
      }
      this.isWinner = true;
      this.emitWinner();
      this.win = false;
      this.emitWin();
      this.isClickable = true;
      this.emitIsClickable();
      this.playerOne = false;
      this.emitPlayerOne();
      this.playerTwo = false;
      this.emitPlayerTwo(); 
    }, 2000); 
  }

  gameOver(array: number[], isClickable: boolean): void {
    if(array.length === 9 && isClickable === true) {
      this.win = true;
      this.isClickable = false;
      this.emitIsClickable(); 
      setTimeout(() => {
        this.notWin = true;  
        this.emitGameOver();
        this.win = false;     
        this.playerOne = false;
        this.emitPlayerOne();
        this.playerTwo = false;
        this.emitPlayerTwo();   
      }, 2000); 
    }
  }

  restartGame(elements: string[], array: number[]): void{
    elements.splice(0,elements.length);
    array.splice(0,array.length);
    this.firstPosition = -1;
    this.secondPosition = -1;
    this.thirdPosition = -1;
    this.emitPositions();
    this.playerOne = true;
    this.playerTwo = false;
    this.isClickable = true;
    this.emitIsClickable(); 
    this.isWinner = false;
    this.emitWinner();
    this.notWin = false;
    this.emitGameOver();
    this.currentPlayer = 'X';
    this.playerOne = true;
    this.emitPlayerOne();
    this.symbol = 'X';
    this.emitSymbol();
    this.isClicked = false;
    this.isClickedSubject.next(this.isClicked);
  }

}
