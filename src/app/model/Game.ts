import { Player } from "./Player";

export class Game{
    players: Player[];
    gameId: string;
    gameStatus: string;
    playerTurn: number;
    winnerPlayer: number;
}