import chai from "chai";
import chaiHttp from "chai-http";
import { describe, test, expect, vi, afterAll } from "vitest";

import app from "../../src/server";

chai.use(chaiHttp);

vi.mock("ioredis", () => {
  const Redis = vi.fn();
  Redis.prototype.flushall = vi.fn();
  Redis.prototype.mset = vi.fn();

  return {
    default: Redis,
  };
});

describe("/auth", () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  describe("POST /login", () => {
    test("failed login", async () => {
      const response = await chai.request(app).post("/auth/login");

      expect(response.status).toEqual(401);
      expect(response.body).toEqual({
        message: "Invalid username or password",
      });
    });

    test("successful login", async () => {
      const response = await chai.request(app).post("/auth/login").send({
        username: "lutfifadlan",
        password: "Dummy123!",
      });

      expect(response.status).toEqual(200);
      expect(response.body).toContain({
        username: "lutfifadlan",
        full_name: "Mochamad Lutfi Fadlan",
      });
    });
  });
});
