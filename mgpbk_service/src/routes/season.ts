import express from "express";
import * as SeasonController from "../controller/season";

const router = express.Router();

router.post("/", SeasonController.createSeason);
router.get("/:seasonId", SeasonController.getSeasonDetails);
router.put("/:seasonId", SeasonController.updateSeasonDetails);
router.delete("/:seasonId", SeasonController.deleteSeason);
router.get("/", SeasonController.listSeasons);
router.get("/by-league/:leagueId", SeasonController.getSeasonsByLeague);

export default router;
