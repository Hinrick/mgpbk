// // src/controllers/LeagueMembershipController.ts

// import { Request, Response } from "express";
// import * as LeagueService from "../services/league"; // Assumes implementation of league service methods

// export const addPlayerToLeague = async (req: Request, res: Response) => {
//   try {
//     const { leagueId, playerId } = req.body;
//     await LeagueService.addPlayerToLeague(leagueId, playerId);
//     res.status(201).json({ message: "Player added to league successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const getPlayersByLeague = async (req: Request, res: Response) => {
//   try {
//     const { leagueId } = req.params;
//     const players = await LeagueService.getPlayersByLeague(leagueId);
//     res.json(players);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Implement additional methods as necessary, such as removePlayerFromLeague
