import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  @ViewChild("contactForm", {static: false}) contactForm:NgForm | undefined;

  elements: string[] = [];
  array: number[] = [];

  resultArray: any[] = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [6,4,2]
  ];

  currentPlayer: string = 'X';

  observer?: Observable<number>;

  mode: number = 1;
  playerOneScore: number = 0;
  playerTwoScore: number = 0;
  generatedNumber: number = 0;

  playerOne: boolean = true;
  playerTwo: boolean = false;
  win: boolean = false;

  isClicked: boolean = false;

  isWinner: boolean = false;
  notWin: boolean = false;


  isClickable: boolean = true;

  modeForm!: FormGroup;

  count: number = 0;

  modes = [
    { id: 1, name: "Computer" },
    { id: 2, name: "Normal" }
  ];

  constructor(private formBulder: FormBuilder) { }

  ngOnInit(): void {
    this.modeForm = this.formBulder.group({
      value: [1]
    });
    this.modeForm.get("value")?.valueChanges
      .subscribe(f => {
        this.onModeChanged(f);
      });
  }

  addSymbol(index: number):void {
    if(this.isClicked === false) {
      if(this.elements[index] !== 'X' && this.elements[index] !== 'O' && this.isClickable) {
        this.elements[index] = 'X';
        this.isClicked = true;
        this.playerOne = false;
        this.playerTwo = true;
        this.currentPlayer = 'O';
      }
    } else {
      if(this.elements[index] !== 'X' && this.elements[index] !== 'O' && this.isClickable) {
        this.elements[index] = 'O';
        this.isClicked = false;
        this.playerOne = true;
        this.playerTwo = false;
        this.currentPlayer = 'X';
      }
    }
  }

  handleClick(index: number) {
    this.addSymbol(index);
    this.array.push(index);
    this.checkResult(this.elements[index]);
    if(this.array.length < 9 && this.mode === 1) { 
      setTimeout(() => {
        this.getComputerIndex();
         // on doit ajouter le nombre généré avant de l'utiliser pour vérifier s'il n'a pas encore été généré
        this.addSymbol(this.generatedNumber);
        this.checkResult(this.elements[this.generatedNumber]);
      }, 500);
    }
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
          this.isClickable = false;
          this.win = true;
          this.currentPlayer = currentPlayer;
          this.setWinner(currentPlayer);
      } 
    } 
    if(this.array.length === 9 && this.isClickable === true) {
      this.win = true;
      setTimeout(() => {
        this.notWin = true;  
        this.win = false;      
      }, 2000); 
    }
  }

  getComputerIndex(): void { 
    do{
      this.generatedNumber = Math.floor(Math.random() * 9);
    }while(this.array.includes(this.generatedNumber));
    this.array.push(this.generatedNumber);
  }

  setWinner(currentPlayer: string) {
    setTimeout(() => {
      if (currentPlayer === 'X') {
        this.playerOneScore++;
      } else if (currentPlayer === 'O') {
        this.playerTwoScore++;
      }
      this.isWinner = true;
      this.win = false;
    }, 2000); 
  }

  restartGame(): void{
    this.elements.splice(0,this.elements.length);
    this.array.splice(0,this.array.length);
    this.playerOne = true;
    this.playerTwo = false;
    this.isClicked = false;
    this.isClickable = true;
    this.isWinner = false;
    this.notWin = false;
    this.count = 0;
    this.currentPlayer = 'X';
  }

  onModeChanged(value: any) {
    this.restartGame();
    this.mode = value;
  }

  counter(i: number) {
    return new Array(i);
  }

}