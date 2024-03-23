import firestore from "../config/firestoreInit";
import { GameEvent } from "../models/GameEvents";

export const addGameEvent = async (gameEvent: GameEvent): Promise<string> => {
  const dataWithTimestamps = {
    ...gameEvent,
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
  };

  const gameEventRef = await firestore
    .collection("GameEvents")
    .add(dataWithTimestamps);
  return gameEventRef.id;
};

export const getGameEvent = async (gameEventId: string): Promise<GameEvent> => {
  const doc = await firestore.collection("GameEvents").doc(gameEventId).get();
  if (!doc.exists) {
    throw new Error("Game event not found.");
  }
  return { id: doc.id, ...doc.data() } as GameEvent;
};

export const listGameEventsByGame = async (
  gameId: string
): Promise<GameEvent[]> => {
  const snapshot = await firestore
    .collection("GameEvents")
    .where("gameId", "==", gameId)
    .where("isActive", "==", true)
    .get();
  return snapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
        createdAt: new Date(doc.data()?.createdAt?._seconds * 1000),
        updatedAt: new Date(doc.data()?.updatedAt?._seconds * 1000),
      } as GameEvent)
  );
};

//list game events by player and group by game
export const listGameEventsByPlayer = async (
  playerId: string
): Promise<GameEvent[]> => {
  const snapshot = await firestore
    .collection("GameEvents")
    .where("playerId", "==", playerId)
    .where("isActive", "==", true)
    .get();
  return snapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
        createdAt: new Date(doc.data()?.createdAt?._seconds * 1000),
        updatedAt: new Date(doc.data()?.updatedAt?._seconds * 1000),
      } as GameEvent)
  );
};

export const updateGameEvent = async (
  gameEventId: string,
  gameEvent: GameEvent
): Promise<void> => {
  const dataWithTimestamps = {
    ...gameEvent,
    updatedAt: new Date(),
  };

  await firestore
    .collection("GameEvents")
    .doc(gameEventId)
    .update(dataWithTimestamps);
};

export const deleteGameEvent = async (
  gameEventId: string,
  gameEvent: GameEvent
): Promise<void> => {
  const dataWithTimestamps = {
    ...gameEvent,
    updatedAt: new Date(),
    isActive: false,
  };
  await firestore
    .collection("GameEvents")
    .doc(gameEventId)
    .update(dataWithTimestamps);
};
