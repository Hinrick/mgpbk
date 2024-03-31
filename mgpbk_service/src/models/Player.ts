import { GameEvent } from "./GameEvents";

export interface Player {
  id?: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  height?: number; // In centimeters
  weight?: number; // In kilograms
  position: PlayerPosition;
  teamIds?: string[];
  jerseyNumbers: string;
  isRetired: boolean;
  address?: Address;
  jobType?: JobType;
  // stats?: PlayerStats;
  createdAt?: Date;
  updatedAt?: Date;
  isActive: boolean;
  updateBy?: string;
  createdBy?: string;
  lineId?: string;
  facebookId?: string;
  instagramId?: string;
  phoneNumber?: string;
  isLeader?: boolean;
  avatarUrl?: string;
  name?: string;
  isSigned?: boolean;
  isStarting?: boolean;
  isCheckIn?: boolean;
  gameEvents?: {
    [gameId: string]: GameEvent[];
  };
}

export enum PlayerPosition {
  PointGuard = "Point Guard",
  ShootingGuard = "Shooting Guard",
  SmallForward = "Small Forward",
  PowerForward = "Power Forward",
  Center = "Center",
}

// Updated PlayerStats interface with additional performance metrics
export interface PlayerStats {
  twoPoints?: {
    goals: number; // Made 2-point shots
    attempts: number; // Total 2-point attempts
  };
  threePoints?: {
    goals: number; // Made 3-point shots
    attempts: number; // Total 3-point attempts
  };
  rebounds?: {
    offensive: number; // Offensive rebounds
    defensive: number; // Defensive rebounds
  };
  averageAssistsPerGame?: number;
  averageStealsPerGame?: number;
  averageBlocksPerGame?: number;
  fouls?: number; // Total fouls committed
  turnovers?: number; // Total turnovers (mistakes leading to loss of ball)
}

export interface Address {
  city?: string;
  dist?: string;
}

export enum JobType {
  ProfessionalAthlete = "Professional Athlete",
  Coach = "Coach",
  Analyst = "Analyst",
  Other = "Other",
}
