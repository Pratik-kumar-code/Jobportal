import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies?.token;
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            })
        }
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        if (!decode || typeof decode !== "object" || !decode.userId) {
            return res.status(401).json({
                message: "Invalid token",
                success: false
            })
        };
        req.id = decode.userId;
        return next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError || error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({
                message: "Invalid or expired token",
                success: false
            });
        }
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}
export default isAuthenticated;