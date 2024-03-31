interface User {
  id: string; // Unique identifier for the user, typically the UID from Firebase Auth
  email: string; // User's email address
  displayName?: string; // User's display name, optional
  profilePicture?: string; // URL to the user's profile picture, optional
  role: "admin" | "team_leader" | "player"; // User role for RBAC
  createdAt: Date; // Timestamp when the user account was created
  updatedAt: Date; // Timestamp when the user account was last updated
  isActive: boolean; // Flag to indicate if the user account is active
  playerIds?: string[]; // Array of player IDs associated with this user, for one-to-many relationship
  // OR for a one-to-one relationship:
  playerId?: string; // The player ID associated with this user
  // Additional fields depending on your application's needs
}
