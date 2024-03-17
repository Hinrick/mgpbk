import express from "express";
import bodyParser from "body-parser";
import { errorMiddleware } from "./utils/errorHandler";
import leagueRoutes from "./routes/league";

const app = express();
const PORT = process.env.PORT || 5500;

app.use(bodyParser.json());

app.use("/api/leagues", leagueRoutes);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
