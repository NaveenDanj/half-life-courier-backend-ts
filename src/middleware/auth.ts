import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "devsecret";

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ error: "Authorization header missing" });
    const parts = auth.split(" ");
    if (parts.length < 2) return res.status(401).json({ error: "Invalid authorization header" });
    const token = parts[1];
    if (!token || Array.isArray(token)) return res.status(401).json({ error: "Invalid token" });
    try {
        const payload = jwt.verify(token, JWT_SECRET) as any;
        (req as any).user = payload;
        next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid token" });
    }
};

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user || !user.isAdmin) return res.status(403).json({ error: "Admin required" });
    next();
};
