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

export const getGames = async (req: Request, res: Response) => {
  try {
    const games = await GameService.listGames();
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
