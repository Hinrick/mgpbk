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
}
