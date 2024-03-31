// src/models/player.ts

export interface Player {
  id: string;
  name: string;
  number: number;
  position: PlayerPosition;
  teamId: string;
  isSigned: boolean; // Assuming this is a property indicating whether the player has signed for a game
}

// If players have specific positions, you can define them as an enum
export enum PlayerPosition {
  Goalkeeper = "GOALKEEPER",
  Defender = "DEFENDER",
  Midfielder = "MIDFIELDER",
  Forward = "FORWARD",
}

// For more detailed models, you might include additional properties:
export interface PlayerStats {
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
}

// Then include PlayerStats in the Player interface
export interface Player {
  id: string;
  name: string;
  number: number;
  position: PlayerPosition;
  teamId: string;
  isSigned: boolean;
  stats: PlayerStats;
}
