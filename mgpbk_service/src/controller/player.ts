// src/controllers/PlayerController.ts
import { Request, Response } from "express";
import * as PlayerService from "../services/player";

export const createPlayer = async (req: Request, res: Response) => {
  try {
    const playerId = await PlayerService.addPlayer(req.body);
    res.status(201).json({ message: "Player added successfully", playerId });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getPlayerDetails = async (req: Request, res: Response) => {
  try {
    const player = await PlayerService.getPlayer(req.params.id);
    res.json(player);
  } catch (error) {
    res.status(404).json({ message: (error as Error).message });
  }
};

export const updatePlayerDetails = async (req: Request, res: Response) => {
  try {
    await PlayerService.updatePlayer(req.params.id, req.body);
    res.json({ message: "Player updated successfully" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getAllPlayers = async (req: Request, res: Response) => {
  try {
    const players = await PlayerService.listPlayers();
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
