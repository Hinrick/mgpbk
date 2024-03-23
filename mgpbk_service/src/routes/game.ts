import express from "express";
import * as GameController from "../controller/game";

const router = express.Router();

router.post("/", GameController.createGame);
router.get("/:seasonId", GameController.getGamesBySeason);
router.get("/:seasonId/:teamId", GameController.getGameByTeamAndSeason);
router.get("/:id", GameController.getGameDetails);
router.put("/:id", GameController.updateGameDetails);
router.delete("/:id", GameController.deleteGame);
router.get("/checkin/:teamId", GameController.getGameCheckInListByTeam);
router.post("/checkin/:teamId", GameController.checkInGame);

export default router;
