export interface Season {
  id: string;
  leagueId: string;
  name: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  updateBy?: string;
  createdBy?: string;
}
