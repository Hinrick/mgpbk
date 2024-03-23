export interface League {
  id?: string;
  name: string;
  description: string;
  location: string;
  imageUrl: string;
  establishDate: Date;
  type: string;
  createdAt?: Date;
  updatedAt?: Date;
  isActive: boolean;
  updateBy?: string;
  createdBy?: string;
}
