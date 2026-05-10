import { defineConfig } from "@prisma/internals";

export default defineConfig({
  datasources: {
    db: {
      provider: "postgresql",
      url: process.env.DATABASE_URL || "postgresql://user:password@localhost:5432/smarthealth?schema=public",
    },
  },
  generator: {
    provider: "prisma-client",
    output: "../src/generated/prisma",
  },
});
