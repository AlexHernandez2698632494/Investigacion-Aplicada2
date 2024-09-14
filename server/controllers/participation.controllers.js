import { pool } from "../db.js";

// Obtener todas las participaciones
export const getParticipations = async (req, res) => {
  try {
    const [result] = await pool.query(`
      SELECT 
        g.nombre AS grupo,
        t.nombre AS torneo,
        e.nombre AS equipo
      FROM 
        Participaciones p
        LEFT JOIN Torneos t ON p.id_torneo = t.id_torneo
        LEFT JOIN Equipos e ON p.id_equipo = e.id_equipo
        LEFT JOIN Grupos g ON p.id_grupo = g.id_grupo
    `);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Obtener todos los grupos
export const getGroups = async (req, res) => {
  try {
    const [result] = await pool.query(`
      SELECT 
        id_grupo AS id,
        nombre AS grupo
      FROM 
        Grupos
    `);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Obtener las participaciones por ID de grupo
export const getParticipationsByGroup = async (req, res) => {
  try {
    const { id } = req.params; // Obtener el ID del grupo de los parámetros de la solicitud

    const [result] = await pool.query(`
      SELECT 
        g.nombre AS grupo,
        t.nombre AS torneo,
        e.nombre AS equipo
      FROM 
        Participaciones p
        LEFT JOIN Torneos t ON p.id_torneo = t.id_torneo
        LEFT JOIN Equipos e ON p.id_equipo = e.id_equipo
        LEFT JOIN Grupos g ON p.id_grupo = g.id_grupo
      WHERE g.id_grupo = ?
    `, [id]);

    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// Obtener una participación por ID
export const getParticipation = async (req, res) => {
  try {
    const [result] = await pool.query(`
      SELECT 
        p.id_torneo,
        p.id_equipo,
        p.id_grupo,
        g.nombre AS grupo,
        t.nombre AS torneo,
        e.nombre AS equipo
      FROM Participaciones p
      LEFT JOIN Torneos t ON p.id_torneo = t.id_torneo
      LEFT JOIN Equipos e ON p.id_equipo = e.id_equipo
      LEFT JOIN Grupos g ON p.id_grupo = g.id_grupo
      WHERE p.id_torneo = ? AND p.id_equipo = ?
    `, [req.params.id_torneo, req.params.id_equipo]);

    if (result.length === 0)
      return res
        .status(404)
        .json({ message: "La participación no fue encontrada" });

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo grupo
export const createGroup = async (req, res) => {
  try {
    const { nombre } = req.body;

    // Validar que el nombre del grupo no esté vacío
    if (!nombre) {
      return res.status(400).json({ message: "El nombre del grupo es requerido" });
    }

    // Insertar el nuevo grupo en la base de datos
    const [result] = await pool.query(
      "INSERT INTO Grupos (nombre) VALUES (?)",
      [nombre]
    );

    res.status(201).json({
      id: result.insertId,
      nombre,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// Crear una nueva participación
export const createParticipation = async (req, res) => {
  try {
    const { id_torneo, id_equipo, id_grupo } = req.body;

    // Validar que el torneo, el equipo y el grupo existan
    const [tournament] = await pool.query(
      "SELECT * FROM Torneos WHERE id_torneo = ?",
      [id_torneo]
    );
    const [team] = await pool.query(
      "SELECT * FROM Equipos WHERE id_equipo = ?",
      [id_equipo]
    );
    const [group] = await pool.query(
      "SELECT * FROM Grupos WHERE id_grupo = ?",
      [id_grupo]
    );

    if (tournament.length === 0 || team.length === 0 || group.length === 0) {
      return res.status(400).json({ message: "El equipo, torneo o grupo no existen" });
    }

    const [result] = await pool.query(
      "INSERT INTO Participaciones (id_torneo, id_equipo, id_grupo) VALUES (?, ?, ?)",
      [id_torneo, id_equipo, id_grupo]
    );

    res.json({
      id_torneo,
      id_equipo,
      id_grupo,
      id: result.insertId
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Actualizar una participación por ID
export const updateParticipation = async (req, res) => {
  try {
    const { id_torneo, id_equipo, id_grupo } = req.body;

    // Validar que el torneo, el equipo y el grupo existan si se proporcionan
    if (id_torneo || id_equipo || id_grupo) {
      if (id_torneo) {
        const [tournament] = await pool.query("SELECT * FROM Torneos WHERE id_torneo = ?", [id_torneo]);
        if (tournament.length === 0) {
          return res.status(400).json({ message: "El torneo no existe" });
        }
      }
      if (id_equipo) {
        const [team] = await pool.query("SELECT * FROM Equipos WHERE id_equipo = ?", [id_equipo]);
        if (team.length === 0) {
          return res.status(400).json({ message: "El equipo no existe" });
        }
      }
      if (id_grupo) {
        const [group] = await pool.query("SELECT * FROM Grupos WHERE id_grupo = ?", [id_grupo]);
        if (group.length === 0) {
          return res.status(400).json({ message: "El grupo no existe" });
        }
      }
    }

    const [result] = await pool.query(
      "UPDATE Participaciones SET id_torneo = ?, id_equipo = ?, id_grupo = ? WHERE id_torneo = ? AND id_equipo = ?",
      [id_torneo, id_equipo, id_grupo, req.params.id_torneo, req.params.id_equipo]
    );

    if (result.affectedRows === 0)
      return res
        .status(404)
        .json({ message: "La participación no fue encontrada" });

    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Eliminar una participación por ID
export const deleteParticipation = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM Participaciones WHERE id_torneo = ? AND id_equipo = ?",
      [req.params.id_torneo, req.params.id_equipo]
    );

    if (result.affectedRows === 0)
      return res
        .status(404)
        .json({ message: "La participación no fue encontrada" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
