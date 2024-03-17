import firestore from "../config/firestoreInit";
import { League } from "../models/League";

// Add a league
export const addLeague = async (leagueData: League): Promise<string> => {
  const dataWithTimestamps = {
    ...leagueData,
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
  };
  const leagueRef = await firestore
    .collection("Leagues")
    .add(dataWithTimestamps);
  return leagueRef.id;
};

// Get all active leagues
export const getLeagues = async (): Promise<League[]> => {
  const snapshot = await firestore
    .collection("Leagues")
    .where("isActive", "==", true)
    .get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as League));
};

// Get a single league detail
export const getLeagueDetail = async (
  id: string
): Promise<League | undefined> => {
  const doc = await firestore.collection("Leagues").doc(id).get();
  if (!doc.exists) {
    throw new Error("League not found");
  }
  return { id: doc.id, ...doc.data() } as League;
};

// Update a league
export const updateLeague = async (
  id: string,
  leagueData: Partial<League>
): Promise<void> => {
  await firestore
    .collection("Leagues")
    .doc(id)
    .update({
      ...leagueData,
      updatedAt: new Date(),
    });
};

// Soft delete a league
export const deleteLeague = async (id: string): Promise<void> => {
  await firestore.collection("Leagues").doc(id).update({
    isActive: false,
    updatedAt: new Date(),
  });
};
