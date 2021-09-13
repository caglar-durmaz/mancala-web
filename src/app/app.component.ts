import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { Coordinate } from './model/Coordinate';
import { Pit } from './model/Pit';
import { Player } from './model/Player';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'mancala-web';

  player1Pits: Pit[] = [];
  player2Pits: Pit[] = [];
  player1Mancala: Pit;
  player2Mancala: Pit;
  initialX = 70;
  initialY = 90;
  playerTurn: number;

  stoneCoordinates: Coordinate[] = [];
  constructor(private appService: AppService) {

  }

  ngOnInit(): void {
    this.generateCoordinatesForStones();
    this.appService.createGame().subscribe(resp => {
      let players: Player[] = resp.game.players;
      this.player1Pits = players[0].playerBoard.pits;
      this.player2Pits = players[1].playerBoard.pits;
      this.player1Mancala = players[0].playerBoard.mancala;
      this.player2Mancala = players[1].playerBoard.mancala;
    });

    this.appService.startGame(this.appService.getStoredGameId()).subscribe(resp => {
      let players: Player[] = resp.game.players;
      this.player1Pits = players[0].playerBoard.pits;
      this.player2Pits = players[1].playerBoard.pits;
      this.player1Mancala = players[0].playerBoard.mancala;
      this.player2Mancala = players[1].playerBoard.mancala;
      this.playerTurn = resp.game.playerTurn;
    });
  }

  counter(i: number) {
    return new Array(i);
  }

  generateCoordinatesForStones() {

    for (let i = 0; i < 50; i++) {
      let coordinate: Coordinate = new Coordinate();
      coordinate.x = this.initialX;
      coordinate.y = this.initialY;
      this.stoneCoordinates.push(coordinate);
      if(i % 2 === 0){
        this.initialX = this.initialX + Math.floor(Math.random() * 40);
        this.initialY = this.initialY + Math.floor(Math.random() * 40);
      }else{
        this.initialX = this.initialX - Math.floor(Math.random() * 40);
        this.initialY = this.initialY - Math.floor(Math.random() * 40);
      }



    }
  }

  private selectPit(playerIndex: number, pitIndex: number){
    console.log(playerIndex, pitIndex);
    if(playerIndex !== this.playerTurn){
      return;
    }
    this.appService.makeMove(this.appService.getStoredGameId(), playerIndex, pitIndex).subscribe(resp => {
      let players: Player[] = resp.game.players;
      this.player1Pits = players[0].playerBoard.pits;
      this.player2Pits = players[1].playerBoard.pits;
      this.player1Mancala = players[0].playerBoard.mancala;
      this.player2Mancala = players[1].playerBoard.mancala;
      this.playerTurn = resp.game.playerTurn;
    });
  }


}
