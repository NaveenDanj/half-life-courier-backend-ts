import * as userService from "../services/userService.js";
export const updateUserRole = async (req, res) => {
    try {
        const targetUserId = req.params.id;
        const { isAdmin } = req.body;
        if (!targetUserId) {
            return res.status(400).json({ error: "User ID is required" });
        }
        if (typeof isAdmin !== "boolean") {
            return res.status(400).json({ error: "isAdmin must be a boolean" });
        }
        const user = await userService.updateUserRole(targetUserId, isAdmin);
        res.json({ user });
    }
    catch (error) {
        const message = error?.message || "Failed to update user role";
        if (message.includes("not found")) {
            return res.status(404).json({ error: message });
        }
        return res.status(500).json({ error: message });
    }
};
export const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json({ users });
    }
    catch (error) {
        return res.status(500).json({ error: error?.message || "Failed to fetch users" });
    }
};
export const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }
        const user = await userService.getUserById(userId);
        res.json({ user });
    }
    catch (error) {
        const message = error?.message || "Failed to fetch user";
        if (message.includes("not found")) {
            return res.status(404).json({ error: message });
        }
        return res.status(500).json({ error: message });
    }
};
//# sourceMappingURL=userController.js.map