import { Game } from "./Game";

export class GameResponse{
    responseCode: string;
    responseMessage: string;
    responseStatus: string;
    game: Game;
}