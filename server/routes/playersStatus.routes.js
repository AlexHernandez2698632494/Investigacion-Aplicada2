import { Router } from "express";
import {
  getPlayerStats,
  getPlayerStat,
  createPlayerStat,
  updatePlayerStat,
  deletePlayerStat,
} from "../controllers/playersStatus.controllers.js";
const router = Router();

router.get("/statistic", getPlayerStats);

router.get("/statistic/:id", getPlayerStat);

router.post("/statistic", createPlayerStat);

router.put("/statistic/:id", updatePlayerStat);

router.delete("/statistic/:id", deletePlayerStat);
export default router;
