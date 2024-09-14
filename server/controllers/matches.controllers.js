import { pool } from "../db.js";

// Obtener todos los partidos
export const getmatches = async (req, res) => {
  try {
    const [result] = await pool.query(`
      SELECT 
        p.id_partido AS id, 
        p.fecha, 
        el.nombre AS equipo_local, 
        ev.nombre AS equipo_visitante, 
        p.goles_local, 
        p.goles_visitante, 
        t.nombre AS torneo, 
        t.anio 
      FROM Partidos p
      LEFT JOIN Equipos el ON p.equipo_local = el.id_equipo
      LEFT JOIN Equipos ev ON p.equipo_visitante = ev.id_equipo
      LEFT JOIN Torneos t ON p.id_torneo = t.id_torneo
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
        p.id_partido AS id, 
        p.fecha, 
        el.nombre AS equipo_local, 
        ev.nombre AS equipo_visitante, 
        p.goles_local, 
        p.goles_visitante, 
        t.nombre AS torneo, 
        t.anio 
      FROM Partidos p
      LEFT JOIN Equipos el ON p.equipo_local = el.id_equipo
      LEFT JOIN Equipos ev ON p.equipo_visitante = ev.id_equipo
      LEFT JOIN Torneos t ON p.id_torneo = t.id_torneo
      WHERE p.id_partido = ?
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
    const { fecha, equipo_local, equipo_visitante, goles_local, goles_visitante, id_torneo } = req.body;

    // Validar que los equipos y el torneo existan
    const [teamLocal] = await pool.query("SELECT * FROM Equipos WHERE id_equipo = ?", [equipo_local]);
    const [teamVisitante] = await pool.query("SELECT * FROM Equipos WHERE id_equipo = ?", [equipo_visitante]);
    const [tournament] = await pool.query("SELECT * FROM Torneos WHERE id_torneo = ?", [id_torneo]);

    if (teamLocal.length === 0 || teamVisitante.length === 0 || tournament.length === 0) {
      return res.status(400).json({ message: "Equipo(s) o torneo no existen" });
    }

    const [result] = await pool.query(
      "INSERT INTO Partidos (fecha, equipo_local, equipo_visitante, goles_local, goles_visitante, id_torneo) VALUES (?, ?, ?, ?, ?, ?)",
      [fecha, equipo_local, equipo_visitante, goles_local, goles_visitante, id_torneo]
    );

    res.json({
      id: result.insertId,
      fecha,
      equipo_local,
      equipo_visitante,
      goles_local,
      goles_visitante,
      id_torneo,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Actualizar un partido por ID
export const updatematch = async (req, res) => {
  try {
    const { equipo_local, equipo_visitante, id_torneo } = req.body;

    // Validar que los equipos y el torneo existan si se proporcionan
    if (equipo_local || equipo_visitante || id_torneo) {
      const [teamLocal] = equipo_local ? await pool.query("SELECT * FROM Equipos WHERE id_equipo = ?", [equipo_local]) : [null];
      const [teamVisitante] = equipo_visitante ? await pool.query("SELECT * FROM Equipos WHERE id_equipo = ?", [equipo_visitante]) : [null];
      const [tournament] = id_torneo ? await pool.query("SELECT * FROM Torneos WHERE id_torneo = ?", [id_torneo]) : [null];

      if ((equipo_local && teamLocal.length === 0) || (equipo_visitante && teamVisitante.length === 0) || (id_torneo && tournament.length === 0)) {
        return res.status(400).json({ message: "Equipo(s) o torneo no existen" });
      }
    }

    const [result] = await pool.query("UPDATE Partidos SET ? WHERE id_partido = ?", [
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
    const [result] = await pool.query("DELETE FROM Partidos WHERE id_partido = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "El partido no fue encontrado" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
