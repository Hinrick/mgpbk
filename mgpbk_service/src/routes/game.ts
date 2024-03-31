import express from "express";
import * as GameController from "../controller/game";

const router = express.Router();

router.post("/", GameController.createGame);
router.get("/season/:seasonId", GameController.getGamesBySeason);
router.get("/season/:seasonId/:teamId", GameController.getGameByTeamAndSeason);
router.get("/:id", GameController.getGameDetails);
router.put("/:id", GameController.updateGameDetails);
router.delete("/:id", GameController.deleteGame);
router.get("/checkin/:gameId/:teamId", GameController.getGameCheckInListByTeam);
router.post("/checkin/:gameId/:teamId", GameController.checkInGame);
router.put("/:gameId/:teamId", GameController.updateGamePlayerData);

export default router;
