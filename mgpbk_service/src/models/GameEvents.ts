interface Location {
  x: number; // X-coordinate on the court
  y: number; // Y-coordinate on the court
}

export interface GameEvent {
  id?: string;
  gameId: string;
  playerId: string;
  teamId: string;
  eventType: string;
  details?: {
    success: boolean;
  };
  location?: Location;
  createdAt?: Date;
  updatedAt?: Date;
  isActive: boolean;
  updateBy?: string;
  createdBy?: string;
}

export interface State {
  twoPoints: {
    goals: number;
    attempts: number;
  };
  threePoints: {
    goals: number;

    attempts: number;
  };
  penalty: {
    goals: number;
    attempts: number;
  };
  rebounds: {
    offensive: number;
    defensive: number;
  };
  assists: number;
  steals: number;
  blocks: number;
  fouls: number;
  turnovers: number;
}
