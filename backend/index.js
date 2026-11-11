import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB, { isDbConnected } from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import path from "path";

dotenv.config();
const _dirname = path.resolve();
const app = express();

const allowedOrigins = (process.env.FRONTEND_URLS || process.env.FRONTEND_URL || "http://localhost:5173")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean)
    .map((origin) => new URL(origin).origin);

const corsOption = {
    origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        const error = new Error("Origin is not allowed by CORS");
        error.status = 403;
        return callback(error);
    },
    credentials: true
};

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 8000;

app.get("/health", (req, res) => {
    const databaseReady = isDbConnected();
    return res.status(databaseReady ? 200 : 503).json({
        status: databaseReady ? "ok" : "unavailable",
        database: databaseReady ? "connected" : "disconnected"
    });
});

app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.use("/api", (req, res) => {
    return res.status(404).json({ message: "API route not found.", success: false });
});

app.use(express.static(path.join(_dirname, "fronted", "fronted", "dist")));
app.get("/{*splat}", (req, res) => {
    res.sendFile(path.resolve(_dirname, "fronted", "fronted", "dist", "index.html"));
});

app.use((error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }

    console.error(error);
    const status = error.code === "LIMIT_FILE_SIZE" ? 413 : error.status || 500;
    const message = error.code === "LIMIT_FILE_SIZE"
        ? "Uploaded file must be 10 MB or smaller."
        : status === 403
            ? error.message
            : "Internal server error";
    return res.status(status).json({ message, success: false });
});

const startServer = async () => {
    const requiredVariables = ["SECRET_KEY", "CLOUD_NAME", "API_KEY", "API_SECRET"];
    const missingVariables = requiredVariables.filter((name) => !process.env[name]);
    if (missingVariables.length) {
        throw new Error(`Missing required environment variables: ${missingVariables.join(", ")}`);
    }

    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server running at port ${PORT}`);
    });
};

startServer().catch((error) => {
    console.error("Unable to start server:", error);
    process.exit(1);
});