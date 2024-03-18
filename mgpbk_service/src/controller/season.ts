// src/controllers/SeasonController.ts

import { Request, Response } from "express";
import * as SeasonService from "../services/season";

export const createSeason = async (req: Request, res: Response) => {
  try {
    const seasonId = await SeasonService.createSeason(req.body);
    res.status(201).json({ message: "Season created successfully", seasonId });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getSeasonDetails = async (req: Request, res: Response) => {
  try {
    const season = await SeasonService.getSeason(req.params.seasonId);
    res.json(season);
  } catch (error) {
    res.status(404).json({ message: (error as Error).message });
  }
};

export const getSeasonsByLeague = async (req: Request, res: Response) => {
  try {
    const { leagueId } = req.params;
    const seasons = await SeasonService.getSeasonsByLeague(leagueId);
    const modifiedSeasons = seasons.map(
      ({ leagueId, ...keepAttrs }) => keepAttrs
    );
    res.json(modifiedSeasons);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const updateSeasonDetails = async (req: Request, res: Response) => {
  try {
    await SeasonService.updateSeason(req.params.seasonId, req.body);
    res.json({ message: "Season updated successfully" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const deleteSeason = async (req: Request, res: Response) => {
  try {
    await SeasonService.deleteSeason(req.params.seasonId);
    res.json({ message: "Season deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const listSeasons = async (req: Request, res: Response) => {
  try {
    const seasons = await SeasonService.listSeasons();
    const modifiedSeasons = seasons.map(
      ({ leagueId, ...keepAttrs }) => keepAttrs
    );
    res.json(modifiedSeasons);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
