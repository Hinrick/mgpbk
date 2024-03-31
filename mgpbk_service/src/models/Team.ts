import { GameEvent } from "./GameEvents";

export interface Team {
  id?: string;
  name: string;
  city?: string;
  dist?: string;
  establishmentYear?: string;
  establishmentMonth?: string;
  establishmentDate?: string;
  leagueIds?: string[];
  coach?: string;
  createdAt?: Date;
  updatedAt?: Date;
  isActive: boolean;
  updateBy?: string;
  createdBy?: string;
  gameEvents?: {
    [gameId: string]: GameEvent[];
  };
}
