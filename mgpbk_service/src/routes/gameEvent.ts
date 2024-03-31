import express from "express";
import * as GameEventController from "../controller/gameEvent";

const router = express.Router();

router.post("/", GameEventController.createGameEvent);
router.get("/game/:gameId", GameEventController.listGameEventsByGame);
router.get("/player/:playerId", GameEventController.listGameEventsByPlayer);
router.get("/:id", GameEventController.getGameEvent);
router.put("/:id", GameEventController.updateGameEvent);
router.delete("/:id", GameEventController.deleteGameEvent);

export default router;
