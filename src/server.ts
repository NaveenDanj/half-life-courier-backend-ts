import "dotenv/config";
import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import seedAdminUser from "./seeder/adminSeeder.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", routes);

app.use((err: any, _req: any, res: any, _next: any) => {
    console.error(err);
    res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
});

seedAdminUser().catch((err: any) => {
    console.error("Failed to seed admin user:", err);
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on port ${port}`));

export default app;
