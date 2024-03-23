import express from "express";
import * as TeamController from "../controller/team";

const router = express.Router();

router.get("/:leagueId", TeamController.getTeamsByLeague);
router.get("/detail/:teamId", TeamController.getTeamDetails);
router.post("/create", TeamController.createTeam);
router.put("/:teamId", TeamController.updateTeamDetails);
router.delete("/delete/:teamId", TeamController.deleteTeam);

export default router;
