import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import * as http from "http";

import { WebSocketService } from "./utils/WebSocketService";
import { errorMiddleware } from "./utils/errorHandler";
import { listenForDatabaseChanges } from "./utils/realTimeUpdate";

import leagueRoutes from "./routes/league";
import playerRoutes from "./routes/player";
import seasonRoutes from "./routes/season";
import teamRoutes from "./routes/team";
import gameRoutes from "./routes/game";
import gameEventRoutes from "./routes/gameEvent";
import liveRoutes from "./routes/lives";

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5500;
app.use(
  cors({
    origin: ["http://localhost:3000", "https://yourapp.com"], // Specify allowed origins
    credentials: true,
  })
);
app.use(bodyParser.json());

app.use("/api/leagues", leagueRoutes);
app.use("/api/players", playerRoutes);
app.use("/api/seasons", seasonRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/record", gameEventRoutes);
app.use("/api/live", liveRoutes);
app.use(errorMiddleware);

const ws = new WebSocketService(server);

listenForDatabaseChanges(ws);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
