import { pool } from "../db.js";

// Obtener todos los torneos
export const gettournaments = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM torneo");
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Obtener un torneo por ID
export const gettournament = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM torneo WHERE id = ?", [
      req.params.id,
    ]);

    if (result.length == 0)
      return res.status(404).json({ message: "El torneo no fue encontrado" });

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo torneo
export const createtournament = async (req, res) => {
  try {
    const { nombre, anio } = req.body;
    const [result] = await pool.query(
      "INSERT INTO torneo (nombre, anio) VALUES (?, ?)",
      [nombre, anio]
    );

    res.json({
      id: result.insertId,
      nombre,
      anio,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Actualizar un torneo por ID
export const updatetournament = async (req, res) => {
  try {
    const [result] = await pool.query("UPDATE torneo SET ? WHERE id = ?", [
      req.body,
      req.params.id,
    ]);

    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Eliminar un torneo por ID
export const deletetournament = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM torneo WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "El torneo no fue encontrado" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
