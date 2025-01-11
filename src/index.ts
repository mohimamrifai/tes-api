import express, { Application } from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();
const API_PREFIX = "/api/v1";

const MONGO_URI = process.env.MONGO_URI || "";
const PORT = process.env.PORT || 3000;

app.use(`${API_PREFIX}/users`, userRoutes);

mongoose.connect(MONGO_URI,).then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err) => {
    console.log("Error connecting to MongoDB", err);
});