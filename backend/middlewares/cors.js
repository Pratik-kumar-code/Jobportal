import cors from "cors";

const createCorsMiddleware = (allowedOrigins) => (req, res, next) => {
    const origin = req.get("origin");
    const requestOrigin = `${req.protocol}://${req.get("host")}`;

    if (!origin || origin === requestOrigin) {
        return next();
    }

    if (!allowedOrigins.includes(origin)) {
        return res.status(403).json({
            message: "Origin is not allowed by CORS.",
            success: false
        });
    }

    return cors({ origin, credentials: true })(req, res, next);
};

export default createCorsMiddleware;
