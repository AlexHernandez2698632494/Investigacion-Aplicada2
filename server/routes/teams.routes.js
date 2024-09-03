import { Router } from "express";
import {
  getTeam,
  getTeams,
  createTeams,
  updateTeams,
  deleteTeams,
} from "../controllers/teams.controllers.js";

const router = Router();

router.get("/team", getTeams);

router.get("/team/:id", getTeam);

router.post("/team", createTeams);

router.put("/team/:id", updateTeams);

router.delete("/team/:id", deleteTeams);
export default router;
