import { describe, expect, it, beforeAll } from "vitest";
import { AuthController } from "../../src/controllers/AuthController";

describe("Auth Controller", () => {
  let authController: AuthController;

  beforeAll(() => {
    authController = new AuthController();
  });

  describe("login", () => {
    it("should return user data given the username and password are correct", () => {
      const userData = authController.login({
        username: "lutfifadlan",
        password: "Dummy123!",
      });

      expect(userData).toContain({
        username: "lutfifadlan",
        full_name: "Mochamad Lutfi Fadlan",
      });
    });

    it("should return null given the username and password are correct", () => {
      const userData = authController.login({
        username: "lutfifadlan",
        password: "Dummy123",
      });

      expect(userData).toEqual(null);
    });
  });
});
