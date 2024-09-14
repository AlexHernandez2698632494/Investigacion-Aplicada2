import { pool } from "../db.js";

// Obtener todos los equipos
export const getTeams = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM Equipos");
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Obtener un equipo por id
export const getTeam = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM Equipos WHERE id_equipo = ?", [
      req.params.id,
    ]);

    if (result.length == 0)
      return res.status(404).json({ message: "El equipo no fue encontrado" });

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Crear un equipo
export const createTeams = async (req, res) => {
  try {
    const { nombre, ciudad, fechaFundacion } = req.body;
    const [result] = await pool.query(
      "INSERT INTO Equipos (nombre, ciudad, fechaFundacion) VALUES (?, ?, ?)",
      [nombre, ciudad, fechaFundacion]
    );
    res.json({
      id_equipo: result.insertId,
      nombre,
      ciudad,
      fechaFundacion,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Actualizar un equipo por id
export const updateTeams = async (req, res) => {
  try {
    const result = await pool.query("UPDATE Equipos SET ? WHERE id_equipo = ?", [
      req.body,
      req.params.id,
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Eliminar un equipo por id
export const deleteTeams = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM Equipos WHERE id_equipo = ?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "El equipo no fue encontrado" });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
