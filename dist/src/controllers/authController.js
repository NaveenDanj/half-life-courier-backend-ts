import * as authService from "../services/authService.js";
export const register = async (req, res) => {
    try {
        const { email, password, name, address } = req.body;
        // Additional backend validation (defense in depth)
        if (!email || !password || !name || !address) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const user = await authService.register({ email, password, name, address });
        res.status(201).json({ user });
    }
    catch (error) {
        const message = error?.message || 'Registration failed';
        if (message.includes('Email already registered')) {
            return res.status(400).json({ error: message });
        }
        if (message.includes('Unique constraint failed')) {
            return res.status(400).json({ error: 'Email already registered' });
        }
        return res.status(500).json({ error: 'Registration failed' });
    }
};
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Basic validation
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }
        const token = await authService.login({ email, password });
        res.json({ token });
    }
    catch (error) {
        const message = error?.message || 'Login failed';
        if (message.includes('Invalid credentials')) {
            return res.status(400).json({ error: message });
        }
        return res.status(500).json({ error: 'Login failed' });
    }
};
export const me = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const user = await authService.getMe(userId);
        res.json({ user });
    }
    catch (error) {
        const message = error?.message || 'Failed to fetch user';
        return res.status(404).json({ error: message });
    }
};
//# sourceMappingURL=authController.js.map