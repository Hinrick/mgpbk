import firestore from "../config/firestoreInit";
import { Game } from "../models/Game";
import { listPlayersByTeam } from "./player";
import { getTeamDetails } from "./team";
import { QuerySnapshot, DocumentData } from "@google-cloud/firestore";
// import validateGameEventDetails from "../utils/validation";

export const addGame = async (game: Game): Promise<string> => {
  //handle team and player
  //get team and player
  const teamAPlyers = await listPlayersByTeam(game.teamAId);
  const teamBPlyers = await listPlayersByTeam(game.teamBId);
  const teamA = await getTeamDetails(game.teamAId);
  const teamB = await getTeamDetails(game.teamBId);

  const dataWithTimestamps = {
    ...game,
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
    [game.teamAId]: {
      ...teamA,
      players: teamAPlyers.map((player) => ({
        ...player,
        isSigned: false,
      })),
    },
    [game.teamBId]: {
      ...teamB,
      players: teamBPlyers.map((player) => ({
        ...player,
        isSigned: false,
      })),
    },
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

export const listGamesBySeason = async (seasonId: string): Promise<Game[]> => {
  const snapshot = await firestore
    .collection("Games")
    .where("seasonId", "==", seasonId)
    .where("isActive", "==", true)
    .get();
  return snapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        createdAt: new Date(doc.data()?.createdAt?._seconds * 1000),
        updatedAt: new Date(doc.data()?.updatedAt?._seconds * 1000),
        ...doc.data(),
      } as Game)
  );
};

export const listGamesByTeamAndSeason = async (
  seasonId: string,
  teamId: string
): Promise<(Game | null)[]> => {
  const teamAGamesSnapshot = await firestore
    .collection("Games")
    .where("seasonId", "==", seasonId)
    .where("teamAId", "==", teamId)
    .get();
  const teamBGamesSnapshot = await firestore
    .collection("Games")
    .where("seasonId", "==", seasonId)
    .where("teamBId", "==", teamId)
    .get();

  let resultDocs: QuerySnapshot<DocumentData, DocumentData>;
  if (teamAGamesSnapshot.empty) {
    resultDocs = teamBGamesSnapshot;
  } else {
    resultDocs = teamAGamesSnapshot;
  }

  return resultDocs.docs.map(
    (doc) =>
      ({
        ...doc.data(),
        createdAt: new Date(doc.data()?.createdAt?._seconds * 1000),
        updatedAt: new Date(doc.data()?.updatedAt?._seconds * 1000),
      } as Game)
  );
};

export const updateGame = async (
  gameId: string,
  updateData: Partial<Game>
): Promise<void> => {
  const game = await getGame(gameId);
  if (game.startedDateTime && updateData.startedDateTime) {
    throw new Error("Game has already started.");
  } else if (game.endedDateTime && updateData.endedDateTime) {
    throw new Error("Game has already ended.");
  } else if (!game) {
    throw new Error("Game not found.");
  } else {
    await firestore
      .collection("Games")
      .doc(gameId)
      .update({
        ...updateData,
        updatedAt: new Date(),
      });
  }
};

export const deleteGame = async (gameId: string): Promise<void> => {
  const game = await getGame(gameId);
  //TODO: make sure the type of startedDateTime and endedDateTime is Date and then make this collumns as required
  if (game.startedDateTime && game.endedDateTime) {
    if (game.startedDateTime < new Date()) {
      throw new Error("Game has already started.");
    } else if (game.endedDateTime > new Date()) {
      throw new Error("Game has already ended.");
    } else if (!game) {
      throw new Error("Game not found.");
    } else {
      await firestore.collection("Games").doc(gameId).update({
        isActive: false,
        updatedAt: new Date(),
      });
    }
  }
};

// export const getGameCheckInListByTeam = async (
//   gameId: string,
//   teamId: string
// ) => {
//   const game = await getGame(gameId);
//   if (game[teamId]) {
//     return game[teamId].players;
//   } else {
//     throw new Error("Team not found.");
//   }
// };
