import express from "express";
import * as LeagueController from "../controller/league";

const router = express.Router();

router.post("/", LeagueController.createLeague);
router.get("/", LeagueController.getLeagues);
router.get("/:id", LeagueController.getLeagueDetail);
router.put("/:id", LeagueController.updateLeague);
router.delete("/:id", LeagueController.deleteLeague);

export default router;
