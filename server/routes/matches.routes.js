import { Router } from "express";
import { getmatch,getmatches,creatematch,updatematch,deletematch } from "../controllers/matches.controllers.js";

const router = Router();

router.get("/match", getmatches);

router.get("/match/:id", getmatch);

router.post("/match", creatematch);

router.put("/match/:id", updatematch);

router.delete("/match/:id", deletematch);
export default router;
