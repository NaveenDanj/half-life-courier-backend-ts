import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "devsecret";
export const requireAuth = (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth)
        return res.status(401).json({ error: "Authorization header missing" });
    const parts = auth.split(" ");
    if (parts.length < 2)
        return res.status(401).json({ error: "Invalid authorization header" });
    const token = parts[1];
    if (!token || Array.isArray(token))
        return res.status(401).json({ error: "Invalid token" });
    try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.user = payload;
        next();
    }
    catch (err) {
        return res.status(401).json({ error: "Invalid token" });
    }
};
export const requireAdmin = (req, res, next) => {
    const user = req.user;
    if (!user || !user.isAdmin)
        return res.status(403).json({ error: "Admin required" });
    next();
};
//# sourceMappingURL=auth.js.map