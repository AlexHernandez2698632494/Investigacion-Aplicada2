import { pool } from "../db.js";

// Obtener todos los jugadores
export const getPlayers = async (req, res) => {
  try {
    const [result] = await pool.query(`
      SELECT Jugadores.id_jugador, Jugadores.nombre, Jugadores.posicion, Jugadores.fechaNacimiento, Equipos.nombre AS equipo
      FROM Jugadores
      LEFT JOIN Equipos ON Jugadores.id_equipo = Equipos.id_equipo
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
      SELECT Jugadores.id_jugador, Jugadores.nombre, Jugadores.posicion, Jugadores.fechaNacimiento, Equipos.nombre AS equipo
      FROM Jugadores
      LEFT JOIN Equipos ON Jugadores.id_equipo = Equipos.id_equipo
      WHERE Jugadores.id_jugador = ?
    `, [req.params.id]);

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
    const { nombre, posicion, fechaNacimiento, id_equipo } = req.body;

    // Validar que el equipo existe
    const [team] = await pool.query("SELECT * FROM Equipos WHERE id_equipo = ?", [id_equipo]);
    if (team.length === 0) {
      return res.status(400).json({ message: "El equipo no existe" });
    }

    const [result] = await pool.query(
      "INSERT INTO Jugadores (nombre, posicion, fechaNacimiento, id_equipo) VALUES (?, ?, ?, ?)",
      [nombre, posicion, fechaNacimiento, id_equipo]
    );

    res.json({
      id_jugador: result.insertId,
      nombre,
      posicion,
      fechaNacimiento,
      id_equipo,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Actualizar un jugador por ID
export const updatePlayers = async (req, res) => {
  try {
    const { id_equipo } = req.body;

    // Validar que el equipo existe si id_equipo es parte del cuerpo de la solicitud
    if (id_equipo) {
      const [team] = await pool.query("SELECT * FROM Equipos WHERE id_equipo = ?", [id_equipo]);
      if (team.length === 0) {
        return res.status(400).json({ message: "El equipo no existe" });
      }
    }

    const result = await pool.query("UPDATE Jugadores SET ? WHERE id_jugador = ?", [
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
    const [result] = await pool.query("DELETE FROM Jugadores WHERE id_jugador = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "El jugador no fue encontrado" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
