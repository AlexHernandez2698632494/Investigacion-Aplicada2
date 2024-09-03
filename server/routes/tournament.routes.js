import { Router } from "express";
import {
  gettournament,
  gettournaments,
  updatetournament,
  createtournament,
  deletetournament,
} from "../controllers/tournaments.controllers.js";

const router = Router();

router.get("/tournament", gettournaments);

router.get("/tournament/:id", gettournament);

router.post("/tournament", createtournament);

router.put("/tournament/:id", updatetournament);

router.delete("/tournament/:id", deletetournament);
export default router;
