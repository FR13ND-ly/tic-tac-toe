import { placeholderValue } from "./placeholder-value.type";
import { user } from "./user.model";

export interface Game {
    id: string;
    user1: user;
    user2: user;
    turn: string;
    firstPlayer: string;
    winner: string;
    winLength: number;
    extendable: boolean;
    moveNumber: number;
    connections: Array<any>,
    board: placeholderValue[][];
}