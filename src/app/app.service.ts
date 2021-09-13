import { Injectable } from "@angular/core";
import { Utils } from "./utils";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { GameResponse } from "./model/GameResponse";
import { Game } from "./model/Game";
import { Player } from "./model/Player";
import { PlayerBoard } from "./model/PlayerBoard";

@Injectable()
export class AppService {

    headers = new HttpHeaders(Utils.CONTENT_TYPE);
    options = {
        headers: this.headers
    }
    constructor(private http: HttpClient) { }

    public createGame(): Observable<GameResponse> {

        let method: string = "/create"
            , requestURL: string = Utils.baseURL + method
            , asyncRequest: any = this.http.post(requestURL, this.options);

        return asyncRequest.pipe(map((data: any) => {
            let response: any = data;
            let gameResponse: GameResponse = new GameResponse;
            gameResponse.responseCode = response.responseCode;
            gameResponse.responseMessage = response.responseMessage;
            gameResponse.responseStatus = response.responseStatus;
            gameResponse.game = this.fillGameInfo(response.game);
            this.storeGameId(gameResponse.game.gameId);
            return gameResponse;

        }));
    }

    public startGame(gameId?: string): Observable<GameResponse> {

        let method: string = "/start"
            , requestURL: string = Utils.baseURL + method
            , body: any = "gameId=" + gameId
            , asyncRequest: any = this.http.post(requestURL, body, this.options);

        return asyncRequest.pipe(map((data: any) => {
            let response: any = data;
            let gameResponse: GameResponse = new GameResponse;
            gameResponse.responseCode = response.responseCode;
            gameResponse.responseMessage = response.responseMessage;
            gameResponse.responseStatus = response.responseStatus;
            gameResponse.game = this.fillGameInfo(response.game);
            return gameResponse;
        }));
    }

    public makeMove(gameId: string, playerNumber: number, pitIndexToUse: number): Observable<GameResponse> {

        let method: string = "/makeMove"
            , requestURL: string = Utils.baseURL + method
            , body: any = {
                "gameId": gameId,
                "playerNumber" : playerNumber,
                "pitIndexToUse": pitIndexToUse
            }
            , asyncRequest: any = this.http.post(requestURL, body);

        return asyncRequest.pipe(map((data: any) => {
            let response: any = data;
            let gameResponse: GameResponse = new GameResponse;
            gameResponse.responseCode = response.responseCode;
            gameResponse.responseMessage = response.responseMessage;
            gameResponse.responseStatus = response.responseStatus;
            gameResponse.game = this.fillGameInfo(response.game);
            return gameResponse;
        }));
    }

    private fillGameInfo(gameEl: any): Game {
        let game: Game = new Game();
        game.gameId = gameEl.gameId;
        game.gameStatus = gameEl.gameStatus;
        game.playerTurn = gameEl.playerTurn;
        let playersEl: Player[] = gameEl.players;
        let players: Player[] = [];
        for (let playerEl of playersEl) {
            let player: Player = new Player();
            player.score = playerEl.score;
            player.playerBoard = playerEl.playerBoard;
            player.score = playerEl.score;
            players.push(player);
        }
        game.players = players;
        return game;
    }

    public storeGameId(gameId: string): void {
        localStorage.setItem("gameId", gameId);
    }

    public getStoredGameId(): string {
        return localStorage.getItem("gameId")
    }

}