import firestore from "../config/firestoreInit";

import { GameEvent } from "../models/GameEvents";
import { Team } from "../models/Team";
import { Player } from "../models/Player";
import { Game } from "../models/Game";

import { getTeamDetails, updateTeamDetails } from "./team";
import { getPlayer, updatePlayer } from "./player";
import { getGame, updateGame } from "./game";

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

  //handle update team data
  const teamId = gameEvent.teamId;
  const team: Team = await getTeamDetails(teamId);

  if (team.gameEvents) {
    const updateGameEventsData = team.gameEvents[gameEvent.gameId] || [];
    updateGameEventsData.push(gameEvent);

    const teamData: Team = {
      ...team,
      gameEvents: {
        ...team.gameEvents,
        [gameEvent.gameId]: updateGameEventsData,
      },
    };

    updateTeamDetails(teamId, teamData);
  } else {
    const teamData: Team = {
      ...team,
      gameEvents: {
        [gameEvent.gameId]: [gameEvent],
      },
    };

    updateTeamDetails(teamId, teamData);
  }

  //handle update player data
  const playerId = gameEvent.playerId;
  const player: Player = await getPlayer(playerId);

  if (player.gameEvents) {
    const updateGameEventsData = player.gameEvents[gameEvent.gameId] || [];
    updateGameEventsData.push(gameEvent);

    const playerData: Player = {
      ...player,
      gameEvents: {
        ...player.gameEvents,
        [gameEvent.gameId]: updateGameEventsData,
      },
    };

    updatePlayer(playerId, playerData);
  } else {
    const playerData: Player = {
      ...player,
      gameEvents: {
        [gameEvent.gameId]: [gameEvent],
      },
    };

    updatePlayer(playerId, playerData);
  }

  //handle update game data
  const gameId = gameEvent.gameId;
  const game: Game = await getGame(gameId);

  if (game.gameEvents) {
    const updateGameEventsData = [...game.gameEvents];
    updateGameEventsData.push(gameEvent);
    const gameData: Game = {
      ...game,
      gameEvents: updateGameEventsData,
    };

    updateGame(gameId, gameData);
  } else {
    const gameData: Game = {
      ...game,
      gameEvents: [gameEvent],
    };

    updateGame(gameId, gameData);
  }

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

export const getGameEventStatsByGame = async (gameId: string): Promise<any> => {
  const gameEvents = await listGameEventsByGame(gameId);
  const stats = {
    twoPoints: { goals: 0, attempts: 0 },
    threePoints: { goals: 0, attempts: 0 },
    rebounds: { offensive: 0, defensive: 0 },
    averageAssistsPerGame: 0,
    averageStealsPerGame: 0,
    averageBlocksPerGame: 0,
    fouls: 0,
    turnovers: 0,
  };

  console.log(gameEvents);

  // gameEvents.forEach((event) => {
  //   if (event.eventType === "twoPoints") {
  //     stats.twoPoints.attempts++;
  //     if (event.successful) {
  //       stats.twoPoints.goals++;
  //     }
  //   } else if (event.eventType === "threePoints") {
  //     stats.threePoints.attempts++;
  //     if (event.successful) {
  //       stats.threePoints.goals++;
  //     }
  //   } else if (event.eventType === "rebound") {
  //     if (event.reboundType === "offensive") {
  //       stats.rebounds.offensive++;
  //     } else {
  //       stats.rebounds.defensive++;
  //     }
  //   } else if (event.eventType === "assist") {
  //     stats.averageAssistsPerGame++;
  //   } else if (event.eventType === "steal") {
  //     stats.averageStealsPerGame++;
  //   } else if (event.eventType === "block") {
  //     stats.averageBlocksPerGame++;
  //   } else if (event.eventType === "foul") {
  //     stats.fouls++;
  //   } else if (event.eventType === "turnover") {
  //     stats.turnovers++;
  //   }
  // });

  // stats.averageAssistsPerGame = stats.averageAssistsPerGame / gameEvents.length;
  // stats.averageStealsPerGame = stats.averageStealsPerGame / gameEvents.length;
  // stats.averageBlocksPerGame = stats.averageBlocksPerGame / gameEvents.length;

  // return stats;
};

// {
//     "twoPoints": {
//         "goals": 0,
//         "attempts": 0
//     },
//     "threePoints": {
//         "goals": 0,
//         "attempts": 0
//     },
//     "rebounds": {
//         "offensive": 0,
//         "defensive": 0
//     },
//     "averageAssistsPerGame": 0,
//     "averageStealsPerGame": 0,
//     "averageBlocksPerGame": 0,
//     "fouls": 0,
//     "turnovers": 0
// }
