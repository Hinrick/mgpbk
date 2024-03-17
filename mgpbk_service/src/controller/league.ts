import { Request, Response } from "express";
import * as LeagueService from "../services/league";

export const createLeague = async (req: Request, res: Response) => {
  try {
    const leagueId = await LeagueService.addLeague(req.body);
    res.status(201).json({ message: "League created successfully", leagueId });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getLeagues = async (req: Request, res: Response) => {
  try {
    const leagues = await LeagueService.getLeagues();
    res.json(leagues);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getLeagueDetail = async (req: Request, res: Response) => {
  try {
    const league = await LeagueService.getLeagueDetail(req.params.id);
    if (league) {
      res.json(league);
    } else {
      res.status(404).json({ message: "League not found" });
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const updateLeague = async (req: Request, res: Response) => {
  try {
    await LeagueService.updateLeague(req.params.id, req.body);
    res.json({ message: "League updated successfully" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const deleteLeague = async (req: Request, res: Response) => {
  try {
    await LeagueService.deleteLeague(req.params.id);
    res.json({ message: "League deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
