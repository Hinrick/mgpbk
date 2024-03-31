import express from "express";
import * as LivesController from "../controller/lives";

const router = express.Router();

router.get("/", LivesController.geLiveData);

export default router;
