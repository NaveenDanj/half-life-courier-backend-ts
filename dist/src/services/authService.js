import { prisma } from "../lib/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "devsecret";
export const register = async ({ email, password, name, address }) => {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing)
        throw new Error("Email already registered");
    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ data: { email, password: hashed, name, address } });
    return { id: user.id, email: user.email, name: user.name, address: user.address };
};
export const login = async ({ email, password }) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
        throw new Error("Invalid credentials");
    const ok = await bcrypt.compare(password, user.password);
    if (!ok)
        throw new Error("Invalid credentials");
    const token = jwt.sign({ id: user.id, email: user.email, isAdmin: user.isAdmin }, JWT_SECRET, { expiresIn: "7d" });
    return token;
};
export const getMe = async (userId) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, email: true, name: true, address: true, isAdmin: true },
    });
    if (!user)
        throw new Error("User not found");
    return user;
};
//# sourceMappingURL=authService.js.map