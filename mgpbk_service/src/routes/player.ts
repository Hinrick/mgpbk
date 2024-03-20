import express from "express";
import * as PlayerController from "../controller/player";

const router = express.Router();

router.post("/", PlayerController.createPlayer);
router.get("/", PlayerController.getAllPlayers);
router.get("/:teamId", PlayerController.getPlayersByTeam);
router.get("/:id", PlayerController.getPlayerDetails);
router.put("/:id", PlayerController.updatePlayerDetails);

export default router;
