import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    testTimeout: 10000,
    coverage: {
      reporter: ["text", "json", "html"],
      provider: "istanbul",
    },
    sequence: {
      hooks: "stack",
    },
  },
});
