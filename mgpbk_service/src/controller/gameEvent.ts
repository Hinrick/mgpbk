import e, { Request, Response } from "express";
import * as GameEventService from "../services/gameEvent";
import * as PlayerService from "../services/player";

export const listGameEventsByGame = async (req: Request, res: Response) => {
  try {
    const gameEvents = await GameEventService.listGameEventsByGame(
      req.params.gameId
    );
    res.json(gameEvents);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const listGameEventsByPlayer = async (req: Request, res: Response) => {
  try {
    const events = await GameEventService.listGameEventsByPlayer(
      req.params.playerId
    );
    const player = await PlayerService.getPlayer(req.params.playerId);

    res.json({
      name: `${player.lastName}${player.firstName}`,
      state: {
        twoPoints: {
          goals: events.filter(
            (event) =>
              event.eventType === "TWO_POINTS_ATTEMPT" && event.details?.success
          ).length,
          attempts: events.filter(
            (event) => event.eventType === "TWO_POINTS_ATTEMPT"
          ).length,
        },
        threePoints: {
          goals: events.filter(
            (event) =>
              event.eventType === "THREE_POINTS_ATTEMPT" &&
              event.details?.success
          ).length,
          attempts: events.filter(
            (event) => event.eventType === "THREE_POINTS_ATTEMPT"
          ).length,
        },
        penalty: {
          goals: events
            .filter((e) => e.playerId === player.id)
            .filter(
              (event) =>
                event.eventType === "PENALTY_ATTEMPT" && event.details?.success
            ).length,
          attempts: events
            .filter((e) => e.playerId === player.id)
            .filter((event) => event.eventType === "PENALTY_ATTEMPT").length,
        },
        rebounds: {
          offensive: events.filter(
            (event) => event.eventType === "OFFENSIVE_REBOUND"
          ).length,
          defensive: events.filter(
            (event) => event.eventType === "DEFENSIVE_REBOUND"
          ).length,
        },
        averageAssistsPerGame: events.filter(
          (event) => event.eventType === "ASSIST"
        ).length,
        averageStealsPerGame: events.filter(
          (event) => event.eventType === "STEAL"
        ).length,
        averageBlocksPerGame: events.filter(
          (event) => event.eventType === "BLOCK"
        ).length,
        fouls: events.filter((event) => event.eventType === "FOUL").length,
        turnovers: events.filter((event) => event.eventType === "TURNOVER")
          .length,
      },
      data: events,
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getGameEvent = async (req: Request, res: Response) => {
  try {
    const gameEvent = await GameEventService.getGameEvent(req.params.id);
    res.json(gameEvent);
  } catch (error) {
    res.status(404).json({ message: (error as Error).message });
  }
};

export const createGameEvent = async (req: Request, res: Response) => {
  try {
    const gameEventId = await GameEventService.addGameEvent(req.body);
    res.status(201).json({
      message: "Game event created successfully",
      gameEventId,
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const updateGameEvent = async (req: Request, res: Response) => {
  try {
    await GameEventService.updateGameEvent(req.params.id, req.body);
    res.json({ message: "Game event updated successfully" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const deleteGameEvent = async (req: Request, res: Response) => {
  try {
    await GameEventService.deleteGameEvent(req.params.id, req.body);
    res.json({ message: "Game event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
