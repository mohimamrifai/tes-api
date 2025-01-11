import express, { Application } from "express";
import userRoutes from "./routes/userRoutes";

const app: Application = express();
const API_PREFIX = "/api/v1";

const PORT = process.env.PORT || 3000;

app.use(`${API_PREFIX}/users`, userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});