import firestore from "../config/firestoreInit";
import { Player } from "../models/Player";
import { Game, GameList } from "../models/Game";
import { GameEvent } from "../models/GameEvents";
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
        isCheckIn: false,
      })),
    },
    [game.teamBId]: {
      ...teamB,
      players: teamBPlyers.map((player) => ({
        ...player,
        isSigned: false,
        isStarting: false,
        isCheckIn: false,
      })),
    },
  };

  const gameRef = await firestore.collection("Games").add(dataWithTimestamps);
  return gameRef.id;
};

export const getGame = async (gameId: string): Promise<Game> => {
  const doc = await firestore.collection("Games").doc(gameId).get();
  const doc_events = await firestore
    .collection("GameEvents")
    .where("gameId", "==", gameId)
    .get();

  const events = doc_events.docs.map((doc) => doc.data());

  if (!doc.exists) {
    throw new Error("Game not found.");
  }

  const teamAData = doc.data()?.[doc.data()?.teamAId];
  const teamBData = doc.data()?.[doc.data()?.teamBId];

  // teamAData.players.map((player: any) => {
  //   const playerEvents = events.filter((e) => e.playerId === player.id);
  //   const playerState = {
  //     twoPoints: {
  //       goals: playerEvents.filter(
  //         (event) =>
  //           event.eventType === "TWO_POINTS_ATTEMPT" && event.details?.success
  //       ).length,
  //       attempts: playerEvents.filter(
  //         (event) => event.eventType === "TWO_POINTS_ATTEMPT"
  //       ).length,
  //     },
  //     threePoints: {
  //       goals: playerEvents.filter(
  //         (event) =>
  //           event.eventType === "THREE_POINTS_ATTEMPT" && event.details?.success
  //       ).length,
  //       attempts: playerEvents.filter(
  //         (event) => event.eventType === "THREE_POINTS_ATTEMPT"
  //       ).length,
  //     },
  //     penalty: {
  //       goals: playerEvents.filter(
  //         (event) =>
  //           event.eventType === "PENALTY_ATTEMPT" && event.details?.success
  //       ).length,
  //       attempts: playerEvents.filter(
  //         (event) => event.eventType === "PENALTY_ATTEMPT"
  //       ).length,
  //     },
  //     rebounds: {
  //       offensive: playerEvents.filter(
  //         (event) => event.eventType === "OFFENSIVE_REBOUND"
  //       ).length,
  //       defensive: playerEvents.filter(
  //         (event) => event.eventType === "DEFENSIVE_REBOUND"
  //       ).length,
  //     },
  //     assists: playerEvents.filter((event) => event.eventType === "ASSIST")
  //       .length,
  //     steals: playerEvents.filter((event) => event.eventType === "STEAL")
  //       .length,
  //     blocks: playerEvents.filter((event) => event.eventType === "BLOCK")
  //       .length,
  //     fouls: playerEvents.filter((event) => event.eventType === "FOUL").length,
  //     turnovers: playerEvents.filter((event) => event.eventType === "TURNOVER")
  //       .length,
  //   };

  //   return {
  //     ...player,
  //     state: playerState,
  //   };
  // });

  // teamBData.players.map((player: any) => {
  //   const playerEvents = events.filter((e) => e.playerId === player.id);
  //   const playerState = {
  //     twoPoints: {
  //       goals: playerEvents.filter(
  //         (event) =>
  //           event.eventType === "TWO_POINTS_ATTEMPT" && event.details?.success
  //       ).length,
  //       attempts: playerEvents.filter(
  //         (event) => event.eventType === "TWO_POINTS_ATTEMPT"
  //       ).length,
  //     },
  //     threePoints: {
  //       goals: playerEvents.filter(
  //         (event) =>
  //           event.eventType === "THREE_POINTS_ATTEMPT" && event.details?.success
  //       ).length,
  //       attempts: playerEvents.filter(
  //         (event) => event.eventType === "THREE_POINTS_ATTEMPT"
  //       ).length,
  //     },
  //     penalty: {
  //       goals: playerEvents.filter(
  //         (event) =>
  //           event.eventType === "PENALTY_ATTEMPT" && event.details?.success
  //       ).length,
  //       attempts: playerEvents.filter(
  //         (event) => event.eventType === "PENALTY_ATTEMPT"
  //       ).length,
  //     },
  //     rebounds: {
  //       offensive: playerEvents.filter(
  //         (event) => event.eventType === "OFFENSIVE_REBOUND"
  //       ).length,
  //       defensive: playerEvents.filter(
  //         (event) => event.eventType === "DEFENSIVE_REBOUND"
  //       ).length,
  //     },
  //     assists: playerEvents.filter((event) => event.eventType === "ASSIST")
  //       .length,
  //     steals: playerEvents.filter((event) => event.eventType === "STEAL")
  //       .length,
  //     blocks: playerEvents.filter((event) => event.eventType === "BLOCK")
  //       .length,
  //     fouls: playerEvents.filter((event) => event.eventType === "FOUL").length,
  //     turnovers: playerEvents.filter((event) => event.eventType === "TURNOVER")
  //       .length,
  //   };

  //   return {
  //     ...player,
  //     state: playerState,
  //   };
  // });

  // const teamAScore = doc
  //   .data()
  //   ?.[doc.data()?.teamAId].players.map(
  //     (player: any) =>
  //       player.state.twoPoints.goals * 2 +
  //       player.state.threePoints.goals * 3 +
  //       player.state.penalty.goals
  //   )
  //   .reduce((a: number, b: number) => a + b, 0);
  // const teamBScore = doc
  //   .data()
  //   ?.[doc.data()?.teamBId].players.map(
  //     (player: any) =>
  //       player.state.twoPoints.goals * 2 +
  //       player.state.threePoints.goals * 3 +
  //       player.state.penalty.goals
  //   )
  //   .reduce((a: number, b: number) => a + b, 0);

  // doc.data()?.[doc.data()?.teamAId].players.map((player: any) => {
  //   console.log(player.state);
  // });

  return {
    id: doc.id,
    ...doc.data(),
    [doc.data()?.teamAId]: {
      ...teamAData,
      // score: teamAScore,
      players: doc.data()?.[doc.data()?.teamAId].players.map((player: any) => ({
        ...player,
        state: {
          twoPoints: {
            goals: 0,
            attempts: 0,
          },
          threePoints: {
            goals: 0,
            attempts: 0,
          },
          penalty: {
            goals: 0,
            attempts: 0,
          },
          rebounds: {
            offensive: 0,
            defensive: 0,
          },
          assists: 0,
          steals: 0,
          blocks: 0,
          fouls: 0,
          turnovers: 0,
        },
      })),
    },
    [doc.data()?.teamBId]: {
      ...teamBData,
      // score: teamBScore,
      players: doc.data()?.[doc.data()?.teamBId].players.map((player: any) => ({
        ...player,
        state: {
          twoPoints: {
            goals: events
              .filter((e) => e.playerId === player.id)
              .filter(
                (event) =>
                  event.eventType === "TWO_POINTS_ATTEMPT" &&
                  event.details?.success
              ).length,
            attempts: events
              .filter((e) => e.playerId === player.id)
              .filter((event) => event.eventType === "TWO_POINTS_ATTEMPT")
              .length,
          },
          threePoints: {
            goals: events
              .filter((e) => e.playerId === player.id)
              .filter(
                (event) =>
                  event.eventType === "THREE_POINTS_ATTEMPT" &&
                  event.details?.success
              ).length,
            attempts: events
              .filter((e) => e.playerId === player.id)
              .filter((event) => event.eventType === "THREE_POINTS_ATTEMPT")
              .length,
          },
          penalty: {
            goals: events
              .filter((e) => e.playerId === player.id)
              .filter(
                (event) =>
                  event.eventType === "PENALTY_ATTEMPT" &&
                  event.details?.success
              ).length,
            attempts: events
              .filter((e) => e.playerId === player.id)
              .filter((event) => event.eventType === "PENALTY_ATTEMPT").length,
          },
          rebounds: {
            offensive: events
              .filter((e) => e.playerId === player.id)
              .filter((event) => event.eventType === "OFFENSIVE_REBOUND")
              .length,
            defensive: events
              .filter((e) => e.playerId === player.id)
              .filter((event) => event.eventType === "DEFENSIVE_REBOUND")
              .length,
          },
          averageAssistsPerGame: events
            .filter((e) => e.playerId === player.id)
            .filter((event) => event.eventType === "ASSIST").length,
          averageStealsPerGame: events
            .filter((e) => e.playerId === player.id)
            .filter((event) => event.eventType === "STEAL").length,
          averageBlocksPerGame: events
            .filter((e) => e.playerId === player.id)
            .filter((event) => event.eventType === "BLOCK").length,
          fouls: events
            .filter((e) => e.playerId === player.id)
            .filter((event) => event.eventType === "FOUL").length,
          turnovers: events
            .filter((e) => e.playerId === player.id)
            .filter((event) => event.eventType === "TURNOVER").length,
        },
      })),
    },
  } as Game;
};

export const listGamesBySeason = async (seasonId: string): Promise<Game[]> => {
  const snapshot = await firestore
    .collection("Games")
    .where("seasonId", "==", seasonId)
    .where("isActive", "==", true)
    .get();

  return snapshot.docs
    .sort(
      (a, b) =>
        b.data()?.startedDateTime._seconds - a.data()?.startedDateTime._seconds
    )
    .map(
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
      isCheckedIn: player.isCheckIn,
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
              isCheckedIn: filteredPlayer.isCheckIn,
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

export const updateGamePlayerData = async (
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
              isCheckedIn: filteredPlayer.isCheckIn,
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
