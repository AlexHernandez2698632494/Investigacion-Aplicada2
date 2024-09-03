import { pool } from "../db.js";

// Obtener todos los partidos
export const getmatches = async (req, res) => {
  try {
    const [result] = await pool.query(`
      SELECT 
        partidos.id, 
        partidos.fecha, 
        equipoLocal.nombre AS equipoLocal, 
        equipoVisitante.nombre AS equipoVisitante, 
        partidos.golesLocal, 
        partidos.golesVisitante, 
        torneo.nombre AS torneo, 
        torneo.anio 
      FROM partidos
      LEFT JOIN equipos AS equipoLocal ON partidos.equipoLocalId = equipoLocal.id
      LEFT JOIN equipos AS equipoVisitante ON partidos.equipoVisitanteId = equipoVisitante.id
      LEFT JOIN torneo ON partidos.torneoId = torneo.id
    `);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Obtener un partido por ID
export const getmatch = async (req, res) => {
  try {
    const [result] = await pool.query(`
      SELECT 
        partidos.id, 
        partidos.fecha, 
        equipoLocal.nombre AS equipoLocal, 
        equipoVisitante.nombre AS equipoVisitante, 
        partidos.golesLocal, 
        partidos.golesVisitante, 
        torneo.nombre AS torneo, 
        torneo.anio 
      FROM partidos
      LEFT JOIN equipos AS equipoLocal ON partidos.equipoLocalId = equipoLocal.id
      LEFT JOIN equipos AS equipoVisitante ON partidos.equipoVisitanteId = equipoVisitante.id
      LEFT JOIN torneo ON partidos.torneoId = torneo.id
      WHERE partidos.id = ?
    `, [req.params.id]);

    if (result.length === 0)
      return res.status(404).json({ message: "El partido no fue encontrado" });

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo partido
export const creatematch = async (req, res) => {
  try {
    const { fecha, equipoLocalId, equipoVisitanteId, golesLocal, golesVisitante, torneoId } = req.body;

    // Validar que los equipos y el torneo existan
    const [teamLocal] = await pool.query("SELECT * FROM equipos WHERE id = ?", [equipoLocalId]);
    const [teamVisitante] = await pool.query("SELECT * FROM equipos WHERE id = ?", [equipoVisitanteId]);
    const [tournament] = await pool.query("SELECT * FROM torneo WHERE id = ?", [torneoId]);

    if (teamLocal.length === 0 || teamVisitante.length === 0 || tournament.length === 0) {
      return res.status(400).json({ message: "Equipo(s) o torneo no existen" });
    }

    const [result] = await pool.query(
      "INSERT INTO partidos (fecha, equipoLocalId, equipoVisitanteId, golesLocal, golesVisitante, torneoId) VALUES (?, ?, ?, ?, ?, ?)",
      [fecha, equipoLocalId, equipoVisitanteId, golesLocal, golesVisitante, torneoId]
    );

    res.json({
      id: result.insertId,
      fecha,
      equipoLocalId,
      equipoVisitanteId,
      golesLocal,
      golesVisitante,
      torneoId,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Actualizar un partido por ID
export const updatematch = async (req, res) => {
  try {
    const { equipoLocalId, equipoVisitanteId, torneoId } = req.body;

    // Validar que los equipos y el torneo existan si se proporcionan
    if (equipoLocalId || equipoVisitanteId || torneoId) {
      const [teamLocal] = equipoLocalId ? await pool.query("SELECT * FROM equipos WHERE id = ?", [equipoLocalId]) : [null];
      const [teamVisitante] = equipoVisitanteId ? await pool.query("SELECT * FROM equipos WHERE id = ?", [equipoVisitanteId]) : [null];
      const [tournament] = torneoId ? await pool.query("SELECT * FROM torneo WHERE id = ?", [torneoId]) : [null];

      if ((equipoLocalId && teamLocal.length === 0) || (equipoVisitanteId && teamVisitante.length === 0) || (torneoId && tournament.length === 0)) {
        return res.status(400).json({ message: "Equipo(s) o torneo no existen" });
      }
    }

    const [result] = await pool.query("UPDATE partidos SET ? WHERE id = ?", [
      req.body,
      req.params.id,
    ]);

    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Eliminar un partido por ID
export const deletematch = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM partidos WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "El partido no fue encontrado" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
