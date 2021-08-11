import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GameService } from '../game.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit, OnDestroy {

  @ViewChild("contactForm", {static: false}) contactForm:NgForm | undefined;

  elements: string[] = [];
  array: number[] = [];

  elementsSubscription?: Subscription;
  arraySubscription?: Subscription;

  currentPlayer: string = 'X';

  mode: number = 1;
  playerOneScore: number = 0;
  playerTwoScore: number = 0;

  playerOne: boolean = true;
  playerTwo: boolean = false;
  win: boolean = false;

  isWinner: boolean = false;
  notWin: boolean = false;

  isClickable: boolean = true;

  modeForm!: FormGroup;

  player!: string;

  symbolSubscription?: Subscription;
  winnerSubscription?: Subscription;
  gameOverSubscription?: Subscription;
  lastPlayerSubscription?: Subscription;
  winSubscription?: Subscription;
  playerOneSubscription?: Subscription;
  playerTwoSubscription?: Subscription;
  isClickableSubscription?: Subscription;

  hideCurrentPlayer: boolean = true;

  modes = [
    { id: 1, name: "Computer" },
    { id: 2, name: "Normal" }
  ];

  constructor(private formBulder: FormBuilder,
              private gameService: GameService) { }

  ngOnDestroy(): void {
    this.symbolSubscription?.unsubscribe();
    this.winnerSubscription?.unsubscribe();
    this.gameOverSubscription?.unsubscribe();
    this.lastPlayerSubscription?.unsubscribe();
    this.winSubscription?.unsubscribe();
    this.playerOneSubscription?.unsubscribe();
    this.playerTwoSubscription?.unsubscribe();
    this.isClickableSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.symbolSubscription = this.gameService.symbolSubject.subscribe(
      (data) => {
        this.currentPlayer = data;
      }
    );

    this.lastPlayerSubscription = this.gameService.lastPlayerSubject.subscribe(
      (data) => {
        this.player = data;
      }
    );

    this.winnerSubscription = this.gameService.winnerSubject.subscribe(
      (data) => {
        // console.log(data);

        this.playerOneScore = this.gameService.playerOneScore;
        this.playerTwoScore = this.gameService.playerTwoScore;
        this.isWinner = data;
      }
    );

    this.gameOverSubscription = this.gameService.gameOverSubject.subscribe(
      (data) => {
        this.notWin = data;
      }
    );

    this.winSubscription = this.gameService.winSubject.subscribe(
      (data) => {
        this.win = data;
      }
    );

    this.elementsSubscription = this.gameService.elementsSubject.subscribe(
      (data) => {
        this.elements = data;
      }
    );

    this.arraySubscription = this.gameService.arraySubject.subscribe(
      (data) => {
        this.array = data;
      }
    );

    this.playerOneSubscription = this.gameService.playerOneSubject.subscribe(
      (data) => {
        this.playerOne = data;
      }
    );

    this.playerTwoSubscription = this.gameService.playerTwoSubject.subscribe(
      (data) => {
        this.playerTwo = data;
      }
    );

    this.isClickableSubscription = this.gameService.isClickableSubject.subscribe(
      (data) => {
        this.hideCurrentPlayer = data;
      }
    )

    this.modeForm = this.formBulder.group({
      value: [1]
    });

    this.modeForm.get("value")?.valueChanges.subscribe(f => {
      this.onModeChanged(f);
    });
  }

  restartGame(): void{
    this.gameService.restartGame(this.elements,this.array);
  }

  onModeChanged(value: any) {
    this.restartGame();
    this.mode = value;
  }

}