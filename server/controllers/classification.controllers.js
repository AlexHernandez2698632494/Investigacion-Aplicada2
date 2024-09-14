import { pool } from "../db.js";

export const getClassifications = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM clasificacion");
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getClassification = async (req, res) => {
    try {
      const [result] = await pool.query("SELECT * FROM clasificacion WHERE id = ?", [req.params.id]);
      
      if (result.length == 0)
        return res.status(404).json({ message: "Clasificación no encontrada" });
  
      res.json(result[0]);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  export const createClassification = async (req, res) => {
    try {
      const insertQuery = `
        INSERT INTO clasificacion (equipoId, torneoId, partidosJugados, partidosGanados, partidosEmpatados, partidosPerdidos, golesFavor, golesContra, diferenciaGoles, puntos)
        SELECT 
            e.id AS equipoId,
            p.torneoId,
            COUNT(p.id) AS partidosJugados,
            SUM(CASE 
                WHEN p.golesLocal > p.golesVisitante AND p.equipoLocalId = e.id THEN 1
                WHEN p.golesVisitante > p.golesLocal AND p.equipoVisitanteId = e.id THEN 1
                ELSE 0
            END) AS partidosGanados,
            SUM(CASE 
                WHEN p.golesLocal = p.golesVisitante THEN 1
                ELSE 0
            END) AS partidosEmpatados,
            SUM(CASE 
                WHEN p.golesLocal < p.golesVisitante AND p.equipoLocalId = e.id THEN 1
                WHEN p.golesVisitante < p.golesLocal AND p.equipoVisitanteId = e.id THEN 1
                ELSE 0
            END) AS partidosPerdidos,
            SUM(CASE 
                WHEN p.equipoLocalId = e.id THEN p.golesLocal
                ELSE p.golesVisitante
            END) AS golesFavor,
            SUM(CASE 
                WHEN p.equipoLocalId = e.id THEN p.golesVisitante
                ELSE p.golesLocal
            END) AS golesContra,
            SUM(CASE 
                WHEN p.equipoLocalId = e.id THEN p.golesLocal - p.golesVisitante
                ELSE p.golesVisitante - p.golesLocal
            END) AS diferenciaGoles,
            SUM(CASE 
                WHEN p.golesLocal > p.golesVisitante AND p.equipoLocalId = e.id THEN 3
                WHEN p.golesVisitante > p.golesLocal AND p.equipoVisitanteId = e.id THEN 3
                WHEN p.golesLocal = p.golesVisitante THEN 1
                ELSE 0
            END) AS puntos
        FROM equipos e
        LEFT JOIN partidos p ON e.id = p.equipoLocalId OR e.id = p.equipoVisitanteId
        GROUP BY e.id, p.torneoId;
      `;
      
      const [result] = await pool.query(insertQuery);
      res.json({ message: "Clasificaciones creadas correctamente" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  export const updateClassification = async (req, res) => {
    try {
      const updateQuery = `
        UPDATE clasificacion c
        JOIN (
            SELECT 
                e.id AS equipoId,
                p.torneoId,
                COUNT(p.id) AS partidosJugados,
                SUM(CASE 
                    WHEN p.golesLocal > p.golesVisitante AND p.equipoLocalId = e.id THEN 1
                    WHEN p.golesVisitante > p.golesLocal AND p.equipoVisitanteId = e.id THEN 1
                    ELSE 0
                END) AS partidosGanados,
                SUM(CASE 
                    WHEN p.golesLocal = p.golesVisitante THEN 1
                    ELSE 0
                END) AS partidosEmpatados,
                SUM(CASE 
                    WHEN p.golesLocal < p.golesVisitante AND p.equipoLocalId = e.id THEN 1
                    WHEN p.golesVisitante < p.golesLocal AND p.equipoVisitanteId = e.id THEN 1
                    ELSE 0
                END) AS partidosPerdidos,
                SUM(CASE 
                    WHEN p.equipoLocalId = e.id THEN p.golesLocal
                    ELSE p.golesVisitante
                END) AS golesFavor,
                SUM(CASE 
                    WHEN p.equipoLocalId = e.id THEN p.golesVisitante
                    ELSE p.golesLocal
                END) AS golesContra,
                SUM(CASE 
                    WHEN p.equipoLocalId = e.id THEN p.golesLocal - p.golesVisitante
                    ELSE p.golesVisitante - p.golesLocal
                END) AS diferenciaGoles,
                SUM(CASE 
                    WHEN p.golesLocal > p.golesVisitante AND p.equipoLocalId = e.id THEN 3
                    WHEN p.golesVisitante > p.golesLocal AND p.equipoVisitanteId = e.id THEN 3
                    WHEN p.golesLocal = p.golesVisitante THEN 1
                    ELSE 0
                END) AS puntos
            FROM equipos e
            LEFT JOIN partidos p ON e.id = p.equipoLocalId OR e.id = p.equipoVisitanteId
            GROUP BY e.id, p.torneoId
        ) AS subquery
        ON c.equipoId = subquery.equipoId AND c.torneoId = subquery.torneoId
        SET 
            c.partidosJugados = subquery.partidosJugados,
            c.partidosGanados = subquery.partidosGanados,
            c.partidosEmpatados = subquery.partidosEmpatados,
            c.partidosPerdidos = subquery.partidosPerdidos,
            c.golesFavor = subquery.golesFavor,
            c.golesContra = subquery.golesContra,
            c.diferenciaGoles = subquery.diferenciaGoles,
            c.puntos = subquery.puntos;
      `;
      
      const [result] = await pool.query(updateQuery);
      res.json({ message: "Clasificaciones actualizadas correctamente" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  export const deleteClassification = async (req, res) => {
    try {
      const [result] = await pool.query("DELETE FROM clasificacion WHERE id = ?", [req.params.id]);
      
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Clasificación no encontrada" });
  
      return res.sendStatus(204);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  