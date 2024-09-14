import { pool } from "../db.js";

export const getPlayerStats = async (req, res) => {
  try {
    const [result] = await pool.query(`
      SELECT 
        e.id_estadistica AS id,
        e.id_jugador,
        j.nombre AS jugador,
        e.id_torneo,
        t.nombre AS torneo,
        e.goles_marcados,
        e.asistencias,
        e.tarjetas_amarillas,
        e.tarjetas_rojas,
        e.partidos_jugados
      FROM Estadisticas_Jugadores e
      LEFT JOIN Jugadores j ON e.id_jugador = j.id_jugador
      LEFT JOIN Torneos t ON e.id_torneo = t.id_torneo
    `);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPlayerStat = async (req, res) => {
    try {
      const [result] = await pool.query(`
        SELECT 
          e.id_estadistica AS id,
          e.id_jugador,
          j.nombre AS jugador,
          e.id_torneo,
          t.nombre AS torneo,
          e.goles_marcados,
          e.asistencias,
          e.tarjetas_amarillas,
          e.tarjetas_rojas,
          e.partidos_jugados
        FROM Estadisticas_Jugadores e
        LEFT JOIN Jugadores j ON e.id_jugador = j.id_jugador
        LEFT JOIN Torneos t ON e.id_torneo = t.id_torneo
        WHERE e.id_estadistica = ?
      `, [req.params.id]);
  
      if (result.length === 0)
        return res.status(404).json({ message: "Estadística no encontrada" });
  
      res.json(result[0]);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  export const createPlayerStat = async (req, res) => {
    try {
      const { id_jugador, id_torneo, goles_marcados, asistencias, tarjetas_amarillas, tarjetas_rojas, partidos_jugados } = req.body;
  
      const [player] = await pool.query("SELECT * FROM Jugadores WHERE id_jugador = ?", [id_jugador]);
      const [tournament] = await pool.query("SELECT * FROM Torneos WHERE id_torneo = ?", [id_torneo]);
  
      if (player.length === 0 || tournament.length === 0) {
        return res.status(400).json({ message: "Jugador o torneo no existen" });
      }
  
      const [result] = await pool.query(
        `INSERT INTO Estadisticas_Jugadores (id_jugador, id_torneo, goles_marcados, asistencias, tarjetas_amarillas, tarjetas_rojas, partidos_jugados)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [id_jugador, id_torneo, goles_marcados || 0, asistencias || 0, tarjetas_amarillas || 0, tarjetas_rojas || 0, partidos_jugados || 0]
      );
  
      res.json({
        id: result.insertId,
        id_jugador,
        id_torneo,
        goles_marcados,
        asistencias,
        tarjetas_amarillas,
        tarjetas_rojas,
        partidos_jugados,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  export const updatePlayerStat = async (req, res) => {
    try {
      const { id_jugador, id_torneo } = req.body;
  
      if (id_jugador || id_torneo) {
        const [player] = id_jugador ? await pool.query("SELECT * FROM Jugadores WHERE id_jugador = ?", [id_jugador]) : [null];
        const [tournament] = id_torneo ? await pool.query("SELECT * FROM Torneos WHERE id_torneo = ?", [id_torneo]) : [null];
  
        if ((id_jugador && player.length === 0) || (id_torneo && tournament.length === 0)) {
          return res.status(400).json({ message: "Jugador o torneo no existen" });
        }
      }
  
      const [result] = await pool.query("UPDATE Estadisticas_Jugadores SET ? WHERE id_estadistica = ?", [
        req.body,
        req.params.id,
      ]);
  
      res.json(result);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  export const deletePlayerStat = async (req, res) => {
    try {
      const [result] = await pool.query("DELETE FROM Estadisticas_Jugadores WHERE id_estadistica = ?", [
        req.params.id,
      ]);
  
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Estadística no encontrada" });
  
      return res.sendStatus(204);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  