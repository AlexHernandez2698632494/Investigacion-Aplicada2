import { Router } from "express";
import {
  getPlayer,
  getPlayers,
  createPlayers,
  updatePlayers,
  deletePlayers,
} from "../controllers/players.controllers.js";

const router = Router();

router.get("/player", getPlayers);

router.get("/player/:id", getPlayer);

router.post("/player", createPlayers);

router.put("/player/:id", updatePlayers);

router.delete("/player/:id", deletePlayers);
export default router;
