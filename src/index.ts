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

// serve swagger files statically
app.use(express.static(path.join(__dirname, "../docs")));
app.use(express.static(path.join(__dirname, "../node_modules/swagger-ui-dist")));

// middleware
app.use(express.json());
app.use(morgan("combined", { stream: logStream }));
app.use(cors());

// swagger docs endpoint
app.use(`${API_PREFIX}/docs`, swaggerUi.serve);
app.get(`${API_PREFIX}/docs`, swaggerUi.setup(swaggerData, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: "API Documentation"
}));

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