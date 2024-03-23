// src/services/PlayerService.ts
import firestore from "../config/firestoreInit";
import { Player } from "../models/Player";

export const addPlayer = async (playerData: Player): Promise<string> => {
  const dataWithTimestamps = {
    ...playerData,
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
  };

  const playerRef = await firestore
    .collection("Players")
    .add(dataWithTimestamps);
  return playerRef.id;
};

export const getPlayer = async (id: string): Promise<Player> => {
  const playerDoc = await firestore.collection("Players").doc(id).get();
  if (!playerDoc.exists) {
    throw new Error("Player not found");
  }
  return {
    ...playerDoc.data(),
    createdAt: new Date(playerDoc.data()?.createdAt?._seconds * 1000),
    updatedAt: new Date(playerDoc.data()?.updatedAt?._seconds * 1000),
  } as Player;
};

export const updatePlayer = async (
  id: string,
  playerData: Partial<Player>
): Promise<void> => {
  const player = await firestore.collection("Players").doc(id).get();
  if (!player.exists) {
    throw new Error("Player not found");
  } else {
    const dataWithTimestamps = {
      ...playerData,
      updatedAt: new Date(),
      isActive: true,
    };

    await firestore.collection("Players").doc(id).update(dataWithTimestamps);
  }
};

export const listPlayers = async (): Promise<Player[]> => {
  const snapshot = await firestore.collection("Players").get();
  return snapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        name: doc.data().firstName + " " + doc.data().lastName,
        height: doc.data().height,
        weight: doc.data().weight,
        position: doc.data().position,
        jerseyNumbers: doc.data().jerseyNumbers,
        createdAt: new Date(doc.data()?.createdAt?._seconds * 1000),
        updatedAt: new Date(doc.data()?.updatedAt?._seconds * 1000),
        isLeader: doc.data().isLeader,
      } as Player)
  );
};

export const listPlayersByTeam = async (teamId: string): Promise<Player[]> => {
  const snapshot = await firestore
    .collection("Players")
    .where("teamIds", "array-contains", teamId)
    .get();
  return snapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        name: doc.data().firstName + " " + doc.data().lastName,
        height: doc.data().height,
        weight: doc.data().weight,
        position: doc.data().position,
        jerseyNumbers: doc.data().jerseyNumbers,
        createdAt: new Date(doc.data()?.createdAt?._seconds * 1000),
        updatedAt: new Date(doc.data()?.updatedAt?._seconds * 1000),
        isLeader: doc.data().isLeader,
      } as Player)
  );
};
