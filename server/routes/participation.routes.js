import { Router } from "express";
import {
  getParticipations,
  getGroups, 
  getParticipationsByGroup, 
  getParticipation,
  createGroup,
  createParticipation,
  updateParticipation,
  deleteParticipation,
} from "../controllers/participation.controllers.js";

const router = Router();

// Obtener todas las participaciones
router.get("/participations", getParticipations);

// Obtener todos los grupos
router.get("/groups", getGroups);

// Obtener participaciones por nombre del grupo
router.get("/participations/group/:id", getParticipationsByGroup);

// Obtener una participación específica por ID de torneo y equipo
router.get("/participation/:id_torneo/:id_equipo", getParticipation);

// Crear un nuevo grupo
router.post("/groups", createGroup);

// Crear una nueva participación
router.post("/participation", createParticipation);

// Actualizar una participación específica por ID de torneo y equipo
router.put("/participation/:id_torneo/:id_equipo", updateParticipation);

// Eliminar una participación específica por ID de torneo y equipo
router.delete("/participation/:id_torneo/:id_equipo", deleteParticipation);

export default router;
