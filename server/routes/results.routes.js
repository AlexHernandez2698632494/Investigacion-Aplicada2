import { Router } from "express";
import { getResults,getResult,createResults } from "../controllers/results.controllers.js";

const router = Router();

router.get("/result", getResults);

router.get("/result/:id", getResult);

router.post("/result", createResults);

export default router;
