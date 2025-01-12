import express, { Application } from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes";
import dotenv from "dotenv";
import morgan from "morgan";
import fs from "fs";
import path from "path";

dotenv.config();

const app: Application = express();
const API_PREFIX = "/api/v1";

const MONGO_URI = process.env.MONGO_URI || "";
const PORT = process.env.PORT || 3000;
const logStream = fs.createWriteStream(path.join(__dirname, "..", "requests.log"), { flags: "a" });

// middleware
app.use(express.json());
app.use(morgan("combined", { stream: logStream }));

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