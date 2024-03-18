// src/services/SeasonService.ts

import firestore from "../config/firestoreInit";
import { Season } from "../models/Season";

export const createSeason = async (seasonData: Season): Promise<string> => {
  const seasonRef = await firestore.collection("Seasons").add(seasonData);
  return seasonRef.id;
};

export const getSeason = async (seasonId: string): Promise<Season> => {
  const seasonDoc = await firestore.collection("Seasons").doc(seasonId).get();
  if (!seasonDoc.exists) {
    throw new Error("Season not found");
  }
  return seasonDoc.data() as Season;
};

export const listSeasons = async (): Promise<Season[]> => {
  const snapshot = await firestore
    .collection("Seasons")
    .where("isActive", "==", true)
    .get();
  return snapshot.docs.map((doc) => doc.data() as Season);
};

export const getSeasonsByLeague = async (
  leagueId: string
): Promise<Season[]> => {
  const snapshot = await firestore
    .collection("Seasons")
    .where("leagueId", "==", leagueId)
    .get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Season));
};

export const updateSeason = async (
  seasonId: string,
  seasonData: Partial<Season>
): Promise<void> => {
  await firestore.collection("Seasons").doc(seasonId).update(seasonData);
};

export const deleteSeason = async (seasonId: string): Promise<void> => {
  await firestore.collection("Seasons").doc(seasonId).update({
    isActive: false,
  });
};
