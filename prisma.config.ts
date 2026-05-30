import { defineConfig, env } from "prisma/config";
import "dotenv/config";

export default defineConfig({
 schema: "prisma/schema.prisma",

  migrations: {
    // if you use tsx
    seed: "tsx ./prisma/seed.ts",

    // or, if using ts-node, use:
    // seed: "ts-node ./prisma/seed.ts",

    // or bun:
    // seed: "bun ./prisma/seed.ts",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
