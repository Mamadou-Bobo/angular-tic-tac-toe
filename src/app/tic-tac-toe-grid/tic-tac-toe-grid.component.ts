import { Component, Input, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { GameService } from '../game.service';

@Component({
  selector: 'app-tic-tac-toe-grid',
  templateUrl: './tic-tac-toe-grid.component.html',
  styleUrls: ['./tic-tac-toe-grid.component.css']
})
export class TicTacToeGridComponent implements OnInit {

  @Input() modeValue?: number = 1;
  
  elements: string[] = [];
  array: number[] = [];

  firstPosition!: number;
  secondPosition!: number;
  thirdPosition!: number;

  resultArray: any[] = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [6,4,2]
  ];

  player!: string;

  currentPlayer: string = 'X';

  generatedNumber: number = 0;

  @Input() isClicked: boolean = false;

  notWin: boolean = false;
  isWinner: boolean = false;

  isClickable: boolean = true;

  symbolSubscription?: Subscription;
  winnerSubscription?: Subscription;
  gameOverSubscription?: Subscription;
  isClickableSubscription?: Subscription;
  isClickedSubscription?: Subscription;
  firstPositionSubscription?: Subscription;
  secondPositionSubscription?: Subscription;
  thirdPositionSubscription?: Subscription;

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.winnerSubscription = this.gameService.winnerSubject.subscribe(
      (data) => {
        this.isWinner = data;
      }
    );

    this.gameOverSubscription = this.gameService.gameOverSubject.subscribe(
      (data) => {
        this.notWin = data;
      }
    );

    this.isClickableSubscription = this.gameService.isClickableSubject.subscribe(
      (data) => {
        this.isClickable = data;
      }
    );

    this.firstPositionSubscription = this.gameService.firstPositioSubject.subscribe(
      (data) => {
        this.firstPosition = data;
      }
    );

    this.secondPositionSubscription = this.gameService.secondPositioSubject.subscribe(
      (data) => {
        this.secondPosition = data;
      }
    );

    this.thirdPositionSubscription = this.gameService.thirdPositioSubject.subscribe(
      (data) => {
        this.thirdPosition = data;
      }
    );

    this.isClickedSubscription = this.gameService.isClickedSubject.subscribe(
      (data) => {
        this.isClicked = data;
      }
    );
  }
  
  addSymbol(index: number):void {
    if(this.isClicked === false) {
      if(this.elements[index] !== 'X' && this.elements[index] !== 'O' && this.isClickable) {
        this.elements[index] = 'X';
        this.isClicked = true;
        this.gameService.playerOne = false;
        this.gameService.emitPlayerOne();
        this.gameService.playerTwo = true;
        this.gameService.emitPlayerTwo();
        this.currentPlayer = 'O';
      }
    } else {
      if(this.elements[index] !== 'X' && this.elements[index] !== 'O' && this.isClickable) {
        this.elements[index] = 'O';
        this.isClicked = false;
        this.gameService.playerOne = true;
        this.gameService.emitPlayerOne();
        this.gameService.playerTwo = false;
        this.gameService.emitPlayerTwo();
        this.currentPlayer = 'X';
      }
    }
  }

  handleClick(index: number) {
    this.addSymbol(index);
    this.array.push(index);// on ajoute chaque index dans le tableau pour pouvoir vérifier si la case n'a pas déjà été sélectionnée
    this.checkResult(this.elements[index]);
    this.addSymbolToService(index);
    this.addSymbolToService(index);
    if(this.array.length < 9 && this.modeValue === 1) { 
      setTimeout(() => {
        this.getComputerIndex();
        this.addSymbolToService(this.generatedNumber);
        this.addSymbolToService(index);
        this.addSymbol(this.generatedNumber);
        this.checkResult(this.elements[this.generatedNumber]);
      }, 500);
    }
    this.gameService.elements = this.elements;
    this.gameService.array = this.array;
    this.gameService.emitArrays();
  }

  checkResult(currentPlayer: string): void{
    for(let i = 0; i < this.resultArray.length; i++) {
      let position = this.resultArray[i];
      if(this.elements[position[0]] === currentPlayer
         && this.elements[position[1]] === currentPlayer
         && this.elements[position[2]] === currentPlayer
         && this.elements[position[0]] !== undefined
         && this.elements[position[1]] !== undefined
         && this.elements[position[2]] !== undefined) {
          setTimeout(() => {
            this.firstPosition = position[0];
            this.secondPosition = position[1];
            this.thirdPosition = position[2];
          }, 200);

          this.isClickable = false;
          this.gameService.isClickable = this.isClickable;
          this.gameService.emitIsClickable();
          this.gameService.win = true;
          this.gameService.emitWin();
          this.currentPlayer = currentPlayer;
          this.gameService.lastPlayer = this.currentPlayer;
          this.gameService.emitLastPlayer();
          this.gameService.setWinner(currentPlayer);
          this.isClicked = false;
          break;
        } 
    } 

    this.gameService.gameOver(this.array, this.isClickable);
  }

  getComputerIndex(): void { 
    do{
      this.generatedNumber = Math.floor(Math.random() * 9);
    }while(this.array.includes(this.generatedNumber));
    this.array.push(this.generatedNumber);
  }

  counter(i: number) {
    return new Array(i);
  }

  addSymbolToService(index: number): void {
    this.symbolSubscription = this.gameService.symbolSubject.subscribe(
      () => {
        if(this.elements[index] === 'X') {
          this.gameService.symbol = 'O';
        } else {
          this.gameService.symbol = 'X';
        }
      }
    );
    this.gameService.emitSymbol();
  }
  
}