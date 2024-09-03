import express from "express";
import cors from "cors";
import { PORT } from "./config.js";
import indexRoutes from "./routes/index.routes.js";
import teamsRoute from "./routes/teams.routes.js";
import playersRoute from "./routes/players.routes.js";
import matchesRoute from "./routes/matches.routes.js";
import tournamentRoute from "./routes/tournament.routes.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use(indexRoutes);
app.use(teamsRoute);
app.use(playersRoute);
app.use(matchesRoute);
app.use(tournamentRoute);
app.listen(PORT);
console.log(`server is listening on port ${PORT}`);
