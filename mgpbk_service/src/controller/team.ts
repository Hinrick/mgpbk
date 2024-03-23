import { Request, Response } from "express";
import * as TeamService from "../services/team";

export const createTeam = async (req: Request, res: Response) => {
  try {
    const teamId = await TeamService.addTeam(req.body);
    res.status(201).json({ message: "Team created successfully", teamId });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getTeamDetails = async (req: Request, res: Response) => {
  try {
    const team = await TeamService.getTeamDetails(req.params.teamId);
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getTeamsByLeague = async (req: Request, res: Response) => {
  try {
    const teams = await TeamService.getTeamsByLeague(req.params.leagueId);
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const updateTeamDetails = async (req: Request, res: Response) => {
  try {
    await TeamService.updateTeamDetails(req.params.teamId, req.body);
    res.json({ message: "Team updated successfully" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const deleteTeam = async (req: Request, res: Response) => {
  try {
    await TeamService.deleteTeam(req.params.teamId);
    res.json({ message: "Team deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
