import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1]; // Except "Bearer <token>"
    if(!token) return res.status(401).json("You are not authenticated!");

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) return res.status(403).json("Token is not valid!");
        req.user = user;
        next();
    });
};