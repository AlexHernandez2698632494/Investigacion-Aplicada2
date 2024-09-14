import { pool } from "../db.js";

// Obtener todos los resultados
export const getResults = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM Resultados");
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getResult = async (req, res) => {
    try {
      const [result] = await pool.query("SELECT * FROM Resultados WHERE id_resultado = ?", [
        req.params.id,
      ]);
  
      if (result.length == 0)
        return res.status(404).json({ message: "El resultado no fue encontrado" });
  
      res.json(result[0]);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  export const createResults = async (req, res) => {
    try {
      // Aquí recalculas todos los resultados basados en los partidos y equipos
      const [result] = await pool.query(`
        INSERT INTO Resultados (id_torneo, id_equipo, posicion, pj, v, e, d, gf, gc, dg, pts)
        SELECT
          p.id_torneo,
          e.id_equipo,
          ROW_NUMBER() OVER (PARTITION BY p.id_torneo ORDER BY
              SUM(CASE 
                  WHEN (p.equipo_local = e.id_equipo AND p.goles_local > p.goles_visitante) 
                  OR (p.equipo_visitante = e.id_equipo AND p.goles_visitante > p.goles_local) 
                  THEN 3 ELSE 0 END) +
              SUM(CASE 
                  WHEN p.goles_local = p.goles_visitante THEN 1 ELSE 0 END) DESC, 
              SUM(CASE 
                  WHEN (p.equipo_local = e.id_equipo AND p.goles_local > p.goles_visitante) 
                  OR (p.equipo_visitante = e.id_equipo AND p.goles_visitante > p.goles_local) 
                  THEN 3 ELSE 0 END) DESC, 
              (SUM(CASE 
                  WHEN p.equipo_local = e.id_equipo THEN p.goles_local 
                  ELSE p.goles_visitante END) - 
              SUM(CASE 
                  WHEN p.equipo_local = e.id_equipo THEN p.goles_visitante 
                  ELSE p.goles_local END)) DESC) AS posicion,
          COUNT(p.id_partido) AS pj,
          SUM(CASE 
              WHEN (p.equipo_local = e.id_equipo AND p.goles_local > p.goles_visitante) 
              OR (p.equipo_visitante = e.id_equipo AND p.goles_visitante > p.goles_local) 
              THEN 1 ELSE 0 END) AS v,
          SUM(CASE 
              WHEN p.goles_local = p.goles_visitante 
              THEN 1 ELSE 0 END) AS e,
          SUM(CASE 
              WHEN (p.equipo_local = e.id_equipo AND p.goles_local < p.goles_visitante) 
              OR (p.equipo_visitante = e.id_equipo AND p.goles_visitante < p.goles_local) 
              THEN 1 ELSE 0 END) AS d,
          SUM(CASE 
              WHEN p.equipo_local = e.id_equipo THEN p.goles_local 
              ELSE p.goles_visitante END) AS gf,
          SUM(CASE 
              WHEN p.equipo_local = e.id_equipo THEN p.goles_visitante 
              ELSE p.goles_local END) AS gc,
          (SUM(CASE 
              WHEN p.equipo_local = e.id_equipo THEN p.goles_local 
              ELSE p.goles_visitante END) - 
          SUM(CASE 
              WHEN p.equipo_local = e.id_equipo THEN p.goles_visitante 
              ELSE p.goles_local END)) AS dg,
          (SUM(CASE 
              WHEN (p.equipo_local = e.id_equipo AND p.goles_local > p.goles_visitante) 
              OR (p.equipo_visitante = e.id_equipo AND p.goles_visitante > p.goles_local) 
              THEN 3 ELSE 0 END) + 
          SUM(CASE 
              WHEN p.goles_local = p.goles_visitante THEN 1 ELSE 0 END)) AS pts
        FROM Equipos e
        LEFT JOIN Partidos p
          ON (e.id_equipo = p.equipo_local OR e.id_equipo = p.equipo_visitante)
        GROUP BY e.id_equipo, p.id_torneo
        ORDER BY p.id_torneo, pts DESC, dg DESC;
      `);
      
      res.json({ message: "Resultados recalculados e insertados correctamente" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  

  