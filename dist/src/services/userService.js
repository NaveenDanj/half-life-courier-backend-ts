import { prisma } from "../lib/prisma.js";
export const updateUserRole = async (userId, isAdmin) => {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user)
        throw new Error("User not found");
    const updated = await prisma.user.update({
        where: { id: userId },
        data: { isAdmin },
        select: { id: true, email: true, name: true, address: true, isAdmin: true },
    });
    return updated;
};
export const getAllUsers = async () => {
    const users = await prisma.user.findMany({
        select: { id: true, email: true, name: true, address: true, isAdmin: true, createdAt: true },
        orderBy: { createdAt: "desc" },
    });
    return users;
};
export const getUserById = async (userId) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, email: true, name: true, address: true, isAdmin: true },
    });
    if (!user)
        throw new Error("User not found");
    return user;
};
//# sourceMappingURL=userService.js.map