const request = require("supertest");
const app = require("../api/index");
const { describe, it, expect } = require("jest");

describe("API Tests", () => {
  it("should register a new user", async () => {
    const response = await request(app).post("/api/register").send({
      username: "john_doe",
      password: "secretpassword",
    });

    expect(response.statusCode).toBe(200);
  });
});
