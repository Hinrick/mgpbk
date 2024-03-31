import { Request, Response } from "express";
import * as GameService from "../services/game";

export const createGame = async (req: Request, res: Response) => {
  try {
    const gameId = await GameService.addGame(req.body);
    res.status(201).json({ message: "Game created successfully", gameId });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getGamesBySeason = async (req: Request, res: Response) => {
  try {
    const games = await GameService.listGamesBySeason(req.params.seasonId);
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getGameByTeamAndSeason = async (req: Request, res: Response) => {
  try {
    const { teamId, seasonId } = req.params;

    const games = await GameService.listGamesByTeamAndSeason(seasonId, teamId);
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getGameDetails = async (req: Request, res: Response) => {
  try {
    const game = await GameService.getGame(req.params.id);
    res.json(game);
  } catch (error) {
    res.status(404).json({ message: (error as Error).message });
  }
};

export const updateGameDetails = async (req: Request, res: Response) => {
  try {
    await GameService.updateGame(req.params.id, req.body);
    res.json({ message: "Game updated successfully" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const deleteGame = async (req: Request, res: Response) => {
  try {
    await GameService.deleteGame(req.params.id);
    res.json({ message: "Game deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getGameCheckInListByTeam = async (req: Request, res: Response) => {
  try {
    const { teamId, gameId } = req.params;
    const games = await GameService.getGameCheckInListByTeam(gameId, teamId);
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const checkInGame = async (req: Request, res: Response) => {
  try {
    const { teamId, gameId } = req.params;
    await GameService.updateGameCheckInListByTeam(teamId, gameId, req.body);
    res.json({ message: "Game checked in successfully", gameId });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const updateGamePlayerData = async (req: Request, res: Response) => {
  try {
    const { teamId, gameId } = req.params;
    await GameService.updateGamePlayerData(teamId, gameId, req.body);
    res.json({ message: "Game player data updated successfully", gameId });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
