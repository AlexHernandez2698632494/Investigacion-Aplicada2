-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS iad;
USE iad;

-- Crear la tabla de Equipos
CREATE TABLE Equipos (
    id_equipo INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    ciudad VARCHAR(255),
    fechaFundacion DATE
);

-- Crear la tabla de Torneos
CREATE TABLE Torneos (
    id_torneo INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    anio INT NOT NULL
);

-- Crear la tabla de Grupos
CREATE TABLE Grupos (
    id_grupo INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(10) NOT NULL
);

-- Crear la tabla de Participaciones (Torneo-Equipo)
CREATE TABLE Participaciones (
	id_participaciones INT AUTO_INCREMENT PRIMARY KEY, 
    id_torneo INT,
    id_equipo INT,
    id_grupo INT,
    FOREIGN KEY (id_torneo) REFERENCES Torneos(id_torneo),
    FOREIGN KEY (id_equipo) REFERENCES Equipos(id_equipo),
    FOREIGN KEY (id_grupo) REFERENCES Grupos(id_grupo)
);

-- Crear la tabla de Partidos
CREATE TABLE Partidos (
    id_partido INT AUTO_INCREMENT PRIMARY KEY,
    equipo_local INT,
    equipo_visitante INT,
    goles_local INT NOT NULL,
    goles_visitante INT NOT NULL,
    fecha DATE NOT NULL,
    id_torneo INT,
    FOREIGN KEY (equipo_local) REFERENCES Equipos(id_equipo),
    FOREIGN KEY (equipo_visitante) REFERENCES Equipos(id_equipo),
    FOREIGN KEY (id_torneo) REFERENCES Torneos(id_torneo)
);

-- Crear la tabla de Resultados
CREATE TABLE Resultados (
    id_resultado INT AUTO_INCREMENT PRIMARY KEY,
    id_torneo INT,
    id_equipo INT,
    posicion INT,
    pj INT,
    v INT,
    e INT,
    d INT,
    gf INT,
    gc INT,
    dg INT,
    pts INT,
    FOREIGN KEY (id_torneo) REFERENCES Torneos(id_torneo),
    FOREIGN KEY (id_equipo) REFERENCES Equipos(id_equipo)
);

-- Crear la tabla de Jugadores
CREATE TABLE Jugadores (
    id_jugador INT AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(100) NOT NULL,
    posicion VARCHAR(50),
    fechaNacimiento DATE,
    id_equipo INT,
    FOREIGN KEY (id_equipo) REFERENCES Equipos(id_equipo)
);

-- Crear la tabla de Estadísticas de Jugadores
CREATE TABLE Estadisticas_Jugadores (
    id_estadistica INT AUTO_INCREMENT PRIMARY KEY,
    id_jugador INT,
    id_torneo INT,
    goles_marcados INT DEFAULT 0,
    asistencias INT DEFAULT 0,
    tarjetas_amarillas INT DEFAULT 0,
    tarjetas_rojas INT DEFAULT 0,
    partidos_jugados INT DEFAULT 0,
    FOREIGN KEY (id_jugador) REFERENCES Jugadores(id_jugador),
    FOREIGN KEY (id_torneo) REFERENCES Torneos(id_torneo)
);

-- Insertar equipos
INSERT INTO Equipos (nombre, ciudad, fechaFundacion) VALUES 
('Equipo A', 'Ciudad A', '2000-01-01'),
('Equipo B', 'Ciudad B', '2001-05-15'),
('Equipo C', 'Ciudad C', '2002-09-20');

-- Insertar torneos
INSERT INTO Torneos (nombre, anio) VALUES 
('Torneo 1', 2024),
('Torneo 2', 2024);


-- Insertar grupos
INSERT INTO Grupos (nombre) VALUES 
('Grupo 1'),
('Grupo A');

-- Insertar participaciones
INSERT INTO Participaciones (id_torneo, id_equipo, id_grupo) VALUES
(1, 1, 1),
(1, 2, 1),
(1, 3, 1),
(2, 1, 2),
(2, 2, 2);

-- Insertar partidos
INSERT INTO Partidos (equipo_local, equipo_visitante, goles_local, goles_visitante, fecha, id_torneo) VALUES
(1, 2, 2, 1, '2024-01-15', 1),
(1, 3, 1, 1, '2024-01-22', 1),
(2, 3, 0, 2, '2024-01-29', 1),
(1, 2, 3, 2, '2024-06-15', 2),
(2, 1, 1, 1, '2024-06-22', 2);

-- Insertar jugadores
INSERT INTO Jugadores (nombre, posicion, fechaNacimiento, id_equipo) VALUES
('Jugador 1', 'Delantero', '1999-12-10', 1),
('Jugador 2', 'Defensa', '1998-07-20', 1),
('Jugador 3', 'Centrocampista', '2000-11-05', 2),
('Jugador 4', 'Portero', '1997-03-25', 3);

-- Insertar estadísticas de jugadores
INSERT INTO Estadisticas_Jugadores (id_jugador, id_torneo, goles_marcados, asistencias, tarjetas_amarillas, tarjetas_rojas, partidos_jugados) VALUES
(1, 1, 5, 2, 1, 0, 5),
(2, 1, 2, 1, 2, 0, 5),
(3, 2, 3, 3, 0, 1, 4),
(4, 2, 0, 1, 1, 0, 4);

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


