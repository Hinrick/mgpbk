// src/services/PlayerService.ts
import firestore from "../config/firestoreInit";
import { Player } from "../models/Player";

export const addPlayer = async (playerData: Player): Promise<string> => {
  const playerRef = await firestore.collection("Players").add(playerData);
  return playerRef.id;
};

export const getPlayer = async (id: string): Promise<Player> => {
  const playerDoc = await firestore.collection("Players").doc(id).get();
  if (!playerDoc.exists) {
    throw new Error("Player not found");
  }
  return playerDoc.data() as Player;
};

export const updatePlayer = async (
  id: string,
  playerData: Partial<Player>
): Promise<void> => {
  await firestore.collection("Players").doc(id).update(playerData);
};

export const listPlayers = async (): Promise<Player[]> => {
  const snapshot = await firestore.collection("Players").get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Player));
};
