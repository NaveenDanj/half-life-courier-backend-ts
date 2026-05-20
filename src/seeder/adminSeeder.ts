import { prisma } from "../lib/prisma.js";
import bcrypt from "bcryptjs";


async function seedAdminUser() {
    console.log("Starting database seed...");

    const adminEmail = process.env.ADMIN_EMAIL || "admin@courier.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123456";
    const adminName = "Admin User";
    const adminAddress = "123 Admin Street, Admin City";

    try {
        const existingAdmin = await prisma.user.findUnique({
            where: { email: adminEmail },
        });

        if (existingAdmin) {
            console.log(`✓ Admin user already exists: ${adminEmail}`);
            return;
        }

        const hashedPassword = await bcrypt.hash(adminPassword, 10);
        const adminUser = await prisma.user.create({
            data: {
                email: adminEmail,
                password: hashedPassword,
                name: adminName,
                address: adminAddress,
                isAdmin: true,
            },
        });

        console.log(`  Email: ${adminUser.email}`);
        console.log(`  Name: ${adminUser.name}`);
        console.log(`  Password: ${adminPassword} (change in production!)`);
    } catch (error) {
        console.error("Error seeding admin user:", error);
        throw error;
    }
}


export default seedAdminUser;