import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["tests/**/*.test.ts", "agents/**/*.test.ts", "ops/**/*.test.ts"],
    environment: "node",
    pool: "forks",
    globalSetup: ["tests/pg-global-setup.ts"],
  },
});
