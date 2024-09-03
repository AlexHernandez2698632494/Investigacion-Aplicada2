import { pool } from "../db.js";

export const getTeams = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM equipos");
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTeam = async (req, res) => {
 try {
     const [result] = await pool.query("SELECT * FROM equipos WHERE id = ?", [
       req.params.id,
     ]);
   
     if (result.length == 0)
       return res.status(404).json({ message: "El equipo no fue encontrado" });
     res.json(result[0]);
 } catch (error) {
    return res.status(500).json({ message: error.message });
 }
};

export const createTeams = async (req, res) => {
  try {
    const { nombre, ciudad, fechaFundacion } = req.body;
    const [result] = await pool.query(
      "INSERT INTO equipos (nombre, ciudad, fechaFundacion) VALUES (?, ?, ?)",
      [nombre, ciudad, fechaFundacion]
    );
    console.log(result);
    res.json({
      id: result.insertId,
      nombre,
      ciudad,
      fechaFundacion,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateTeams = async (req, res) => {
  try {
    const result = await pool.query("UPDATE equipos SET ? WHERE id = ?", [
      req.body,
      req.params.id,
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteTeams = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM equipos WHERE id = ?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "El equipo no fue encontrado" });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
