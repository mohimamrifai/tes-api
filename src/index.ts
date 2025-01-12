import express, { Application } from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes";
import dotenv from "dotenv";
import morgan from "morgan";
import fs from "fs";
import path from "path";
import swaggerUi from "swagger-ui-express";
import cors from "cors";

dotenv.config();

const app: Application = express();
const API_PREFIX = "/api/v1";

const MONGO_URI = process.env.MONGO_URI || "";
const PORT = process.env.PORT || 3000;

// not working in vercel
// const logStream = fs.createWriteStream(path.join(__dirname, "..", "requests.log"), { flags: "a" });

// working in vercel
const logStream = fs.createWriteStream(path.join("/tmp", "requests.log"), { flags: "a" });

// read docs/version.1.0.0.json
const swaggerFile = path.resolve(__dirname, "../docs/version.1.0.0.json");
const swaggerData = JSON.parse(fs.readFileSync(swaggerFile, "utf-8"));

// serve docs/version.1.0.0.json
app.use(`/docs`, express.static(path.join(__dirname, "../docs")));

// middleware
app.use(express.json());
app.use(`${API_PREFIX}/docs`, swaggerUi.serve, swaggerUi.setup(swaggerData));
app.use(morgan("combined", { stream: logStream }));
app.use(cors());
// routes
app.use(`${API_PREFIX}/users`, userRoutes);

mongoose.connect(MONGO_URI,).then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err) => {
    console.log("Error connecting to MongoDB", err);
});

export default app;