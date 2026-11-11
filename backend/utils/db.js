import mongoose from "mongoose";

export const isDbConnected = () => mongoose.connection.readyState === 1;

export function validateMongoUri(value) {
    if (typeof value !== "string" || !value.trim()) {
        throw new Error("MONGO_URI is required to start the server.");
    }

    const uri = value.trim();
    if (/\s/.test(uri)) {
        throw new Error("MONGO_URI must be a valid MongoDB connection string.");
    }

    let parsed;
    try {
        parsed = new URL(uri);
    } catch {
        throw new Error("MONGO_URI must be a valid MongoDB connection string.");
    }

    if (
        !["mongodb:", "mongodb+srv:"].includes(parsed.protocol) ||
        !parsed.hostname
    ) {
        throw new Error("MONGO_URI must start with mongodb:// or mongodb+srv:// and include a host.");
    }

    return uri;
}

export function safeErrorMessage(error, uri) {
    const message = error instanceof Error ? error.message : "Unknown connection error";
    return message
        .replaceAll(uri, "[REDACTED_MONGO_URI]")
        .replace(/mongodb(?:\+srv)?:\/\/[^\s"'<>]+/gi, "[REDACTED_MONGO_URI]");
}

const connectDB = async () => {
    const uri = validateMongoUri(process.env.MONGO_URI);

    try {
        await mongoose.connect(uri, {
            bufferCommands: false,
            serverSelectionTimeoutMS: 10000
        });
        console.log("MongoDB connected successfully");
    } catch (error) {
        const message = safeErrorMessage(error, uri);
        console.error(`MongoDB connection failed (${error.name}): ${message}`);
        throw new Error(`MongoDB connection failed (${error.name}): ${message}`);
    }
};

export default connectDB;