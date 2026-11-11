import jwt from "jsonwebtoken";

const optionalAuthentication = (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) {
        return next();
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if (decoded && typeof decoded === "object" && decoded.userId) {
            req.id = decoded.userId;
        }
    } catch (error) {
        if (!(error instanceof jwt.JsonWebTokenError)) {
            return next(error);
        }
    }

    return next();
};

export default optionalAuthentication;
