import { pool } from "../db.js";

// Obtener todos los jugadores
export const getPlayers = async (req, res) => {
  try {
    const [result] = await pool.query(`
      SELECT jugadores.id, jugadores.nombre, jugadores.posicion, jugadores.fechaNacimiento, equipos.nombre AS equipo
      FROM jugadores
      LEFT JOIN equipos ON jugadores.equipoId = equipos.id
    `);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Obtener un jugador por ID
export const getPlayer = async (req, res) => {
  try {
    const [result] = await pool.query(`
      SELECT jugadores.id, jugadores.nombre, jugadores.posicion, jugadores.fechaNacimiento, equipos.nombre AS equipo
      FROM jugadores
      LEFT JOIN equipos ON jugadores.equipoId = equipos.id
      WHERE jugadores.id = ?
    `, [
      req.params.id,
    ]);

    if (result.length == 0)
      return res.status(404).json({ message: "El jugador no fue encontrado" });

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo jugador
export const createPlayers = async (req, res) => {
  try {
    const { nombre, posicion, fechaNacimiento, equipoId } = req.body;

    // Validar que el equipo existe
    const [team] = await pool.query("SELECT * FROM equipos WHERE id = ?", [equipoId]);
    if (team.length === 0) {
      return res.status(400).json({ message: "El equipo no existe" });
    }

    const [result] = await pool.query(
      "INSERT INTO jugadores (nombre, posicion, fechaNacimiento, equipoId) VALUES (?, ?, ?, ?)",
      [nombre, posicion, fechaNacimiento, equipoId]
    );

    res.json({
      id: result.insertId,
      nombre,
      posicion,
      fechaNacimiento,
      equipoId,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Actualizar un jugador por ID
export const updatePlayers = async (req, res) => {
  try {
    const { equipoId } = req.body;

    // Validar que el equipo existe si equipoId es parte del cuerpo de la solicitud
    if (equipoId) {
      const [team] = await pool.query("SELECT * FROM equipos WHERE id = ?", [equipoId]);
      if (team.length === 0) {
        return res.status(400).json({ message: "El equipo no existe" });
      }
    }

    const result = await pool.query("UPDATE jugadores SET ? WHERE id = ?", [
      req.body,
      req.params.id,
    ]);

    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Eliminar un jugador por ID
export const deletePlayers = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM jugadores WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "El jugador no fue encontrado" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};