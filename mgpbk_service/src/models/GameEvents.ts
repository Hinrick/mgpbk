interface Location {
  x: number; // X-coordinate on the court
  y: number; // Y-coordinate on the court
}

export interface GameEvent {
  id?: string;
  gameId: string;
  playerId: string;
  eventType: string; // "TWO_POINTS_ATTEMPT" or "THREE_POINTS_ATTEMPT"
  details: {
    success: boolean;
  };
  timestamp: Date;
  location?: Location;
  createdAt?: Date;
  updatedAt?: Date;
  isActive: boolean;
  updateBy?: string;
  createdBy?: string;
}
