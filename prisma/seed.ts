import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcrypt";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const plainPassword = "Test1234!";
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  // Create User + nested Account + Product
  const user = await prisma.user.create({
    data: {
      email: "eric@test.com",
      name: "Eric Seed User",
      username: "eric_seed",
      bio: "Test user for seeding relations",
      accounts: {
        create: {
          providerId: "credentials",
          accountId: "eric@test.com",
          password: hashedPassword,
        },
      },
      products: {
        create: [
          {
            name: "Ugreen Nexode 20W Charger",
            description: "Compact PD fast charger",
            price: 25000,
          },
        ],
      },
    },
    include: {
      accounts: true,
      products: true,
    },
  });

  console.log("✅ User with relations created:", user);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error("❌ Seed error:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
