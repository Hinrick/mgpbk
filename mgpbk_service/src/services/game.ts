import firestore from "../config/firestoreInit";
import { Player } from "../models/Player";
import { Game, GameList } from "../models/Game";
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
        isStarting: false,
      })),
    },
    [game.teamBId]: {
      ...teamB,
      players: teamBPlyers.map((player) => ({
        ...player,
        isSigned: false,
        isStarting: false,
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
        ...doc.data(),
        createdAt: new Date(doc.data()?.createdAt?._seconds * 1000),
        updatedAt: new Date(doc.data()?.updatedAt?._seconds * 1000),
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
  const game = await firestore.collection("Games").doc(gameId).get();
  if (!game) {
    throw new Error("Game not found.");
  } else {
    await firestore
      .collection("Games")
      .doc(gameId)
      .update({
        ...game.data(),
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

export const getGameCheckInListByTeam = async (
  gameId: string,
  teamId: string
) => {
  const doc = await firestore.collection("Games").doc(gameId).get();
  if (!doc.exists) {
    throw new Error("Game not found.");
  }
  return {
    id: doc.data()?.[teamId].id,
    name: doc.data()?.[teamId].name,
    updatedAt: new Date(doc.data()?.[teamId].updatedAt?._seconds * 1000),
    createdAt: new Date(doc.data()?.[teamId].createdAt?._seconds * 1000),
    players: doc.data()?.[teamId].players.map((player: any) => ({
      id: player.id,
      name: player.name,
      number: player.number,
      isSigned: player.isSigned,
      isStarting: player.isStarting,
      jerseyNumbers: player.jerseyNumbers,
      updatedAt: new Date(player.updatedAt?._seconds * 1000),
    })),
  } as GameList;
};

//function that update CheckInListByTeam
export const updateGameCheckInListByTeam = async (
  teamId: string,
  gameId: string,
  data: Player[]
) => {
  const doc = await firestore.collection("Games").doc(gameId).get();
  if (!doc.exists) {
    throw new Error("Game not found.");
  }
  const team = doc.data()?.[teamId];
  const players = team.players;

  await firestore
    .collection("Games")
    .doc(gameId)
    .update({
      [teamId]: {
        ...team,
        players: players.map((player: any) => {
          const filteredPlayer = data.filter((d) => d.id === player.id)[0];
          if (player.id === filteredPlayer.id) {
            return {
              ...player,
              isSigned: filteredPlayer.isSigned,
              isStarting: filteredPlayer.isStarting,
              jerseyNumbers: filteredPlayer.jerseyNumbers,
              updatedAt: new Date(),
            };
          } else {
            return player;
          }
        }),
      },
    });
};
