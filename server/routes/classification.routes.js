import { Router } from "express";
import {
  getClassifications,
  getClassification,
  createClassification,
  updateClassification,
  deleteClassification,
} from "../controllers/classification.controllers.js";

const router = Router();

router.get("/classification", getClassifications);

router.get("/classification/:id", getClassification);

router.post("/classification", createClassification);

router.put("/classification/:id", updateClassification);

router.delete("/classification/:id", deleteClassification);
export default router;
