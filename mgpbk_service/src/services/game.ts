import firestore from "../config/firestoreInit";
import { GameEvent } from "../models/GameEvents";
import { Game } from "../models/Game";
import { Request, Response } from "express";
// import validateGameEventDetails from "../utils/validation";

export const addGameEvent = async (event: GameEvent): Promise<string> => {
  //   if (!validateGameEventDetails(event)) {
  //     throw new Error("Invalid game event details.");
  //   }
  // Logic to save the event to the database
  const dataWithTimestamps = {
    ...event,
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
  };
  const eventRef = await firestore
    .collection("GameEvent")
    .add(dataWithTimestamps);

  return eventRef.id;
};

// export const getGameEvent = async (eventId: string): Promise<GameEvent> {
//     const doc = await firestore.collection("GameEvents").doc(eventId).get();
//     if (!doc.exists) {
//       throw new Error("Game event not found.");
//     }
//     return { id: doc.id, ...doc.data() } as GameEvent;
//   }

// export const updateGameEvent= async (eventId: string, updateData: Partial<GameEvent>): Promise<void> {
//     await firestore.collection("GameEvents").doc(eventId).update({
//       ...updateData,
//       updatedAt: new Date(),
//     });
//   }

// export const softDeleteGameEvent = async(eventId: string): Promise<void> {
//     await firestore.collection("GameEvents").doc(eventId).update({
//       isActive: false,
//       updatedAt: new Date(),
//     });
//   }

// export const listGameEvents = async(): Promise<GameEvent[]> {
//     const snapshot = await firestore.collection("GameEvents").where("isActive", "==", true).get();
//     return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as GameEvent);
//   }

export const addGame = async (game: Game): Promise<string> => {
  //handle team and player

  const dataWithTimestamps = {
    ...game,
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
  };
  const gameRef = await firestore.collection("Games").add(dataWithTimestamps);

  return gameRef.id;
};

export const getGame = async (gameId: string): Promise<Game> => {
  const doc = await firestore.collection("Games").doc(gameId).get();
  if (!doc.exists) {
    throw new Error("Game not found.");
  }
  return { id: doc.id, ...doc.data() } as Game;
};

export const listGames = async (): Promise<Game[]> => {
  const snapshot = await firestore
    .collection("Games")
    .where("isActive", "==", true)
    .get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Game));
};

export const updateGame = async (
  gameId: string,
  updateData: Partial<Game>
): Promise<void> => {
  await firestore
    .collection("Games")
    .doc(gameId)
    .update({
      ...updateData,
      updatedAt: new Date(),
    });
};

export const softDeleteGame = async (gameId: string): Promise<void> => {
  await firestore.collection("Games").doc(gameId).update({
    isActive: false,
    updatedAt: new Date(),
  });
};

export const getGameByTeam = async (req: Request, res: Response) => {
  const { teamId } = req.params;

  await firestore.collection("Games").where("teamAId", "==", teamId).where("isActive", "==", true).get().then((snapshot) => {;
};
