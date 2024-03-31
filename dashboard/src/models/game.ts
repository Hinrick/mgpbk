export interface Game {
  id: string;
  title: string;
  description?: string; // Optional property
  date: Date;
  seasonId: string;
  teamIds: string[];
  isSigned?: boolean; // Optional property
}

// If you have specific statuses for games, you can use an enum
export enum GameStatus {
  Scheduled = "SCHEDULED",
  Ongoing = "ONGOING",
  Finished = "FINISHED",
  Cancelled = "CANCELLED",
}

// Include the status in the Game interface
export interface Game {
  id: string;
  title: string;
  description?: string;
  date: Date;
  seasonId: string;
  teamIds: string[];
  isSigned?: boolean;
  status: GameStatus;
}
