import { GameEvent } from "./GameEvents";

export interface Game {
  id: string;
  teamAId: string;
  teamBId: string;
  startedDateTime?: Date;
  endedDateTime?: Date;
  seasonId: string;
  createdAt?: Date;
  updatedAt?: Date;
  isActive: boolean;
  updateBy?: string;
  createdBy?: string;
  gameEvents?: GameEvent[];
}

export interface GameList {
  id: string;
  name: string;
  updatedAt: Date;
  createdAt: Date;
  players: [];
}
