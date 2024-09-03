-- Crear la base de datos
CREATE DATABASE iad;

-- Usar la base de datos
USE iad;

-- Crear la tabla equipos
CREATE TABLE equipos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    ciudad VARCHAR(100),
    fechaFundacion DATE
);

-- Crear la tabla jugadores
CREATE TABLE jugadores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    posicion VARCHAR(50),
    fechaNacimiento DATE,
    equipoId INT,
    FOREIGN KEY (equipoId) REFERENCES equipos(id) ON DELETE SET NULL
);

-- Crear la tabla torneo
CREATE TABLE torneo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    anio INT NOT NULL
);

-- Crear la tabla partidos
CREATE TABLE partidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE NOT NULL,
    equipoLocalId INT,
    equipoVisitanteId INT,
    golesLocal INT,
    golesVisitante INT,
    torneoId INT,
    FOREIGN KEY (equipoLocalID) REFERENCES equipos(id) ON DELETE CASCADE,
    FOREIGN KEY (equipoVisitanteId) REFERENCES equipos(id) ON DELETE CASCADE,
    FOREIGN KEY (torneoId) REFERENCES torneo(id) ON DELETE CASCADE
);

