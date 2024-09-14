import express from "express";
import cors from "cors";
import { PORT } from "./config.js";
import indexRoutes from "./routes/index.routes.js";
import teamsRoute from "./routes/teams.routes.js";
import playersRoute from "./routes/players.routes.js";
import matchesRoute from "./routes/matches.routes.js";
import tournamentRoute from "./routes/tournament.routes.js";
import classification from "./routes/classification.routes.js";
import participation from "./routes/participation.routes.js"
import playersStatus from "./routes/playersStatus.routes.js"
import result from "./routes/results.routes.js"
const app = express();

app.use(cors());
app.use(express.json());
app.use(indexRoutes);
app.use(teamsRoute);  // /team  tabla equipo
app.use(playersRoute);  // /player  tabla jugador
app.use(matchesRoute);  // /match   tabla partidos
app.use(tournamentRoute); // /tournament   tabla torneos 
app.use(classification); // /classification  tabla clasificaciones 
app.use(participation); //  /participation  tabla participaciones
app.use(playersStatus);  // /statistic tabla estadisticas jugadores 
app.use(result); // /result tabla resultados 
app.listen(PORT);
console.log(`server is listening on port ${PORT}`);
