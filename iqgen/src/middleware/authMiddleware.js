const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header("Authorization");

        if (!token) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
        req.user = decoded; // This should contain { id: user._id }

        next();
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

module.exports = authMiddleware;
