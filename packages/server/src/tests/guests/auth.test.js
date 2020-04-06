import request from "supertest";
import app from "../../app";
import User from "../../models/User";
import { existingUser, firstUser, newUser, tearup } from "../data/users";

beforeAll(tearup);

describe("POST /guests/auth/register", () => {
  it("should register a user", async () => {
    await request(app).post("/guests/auth/register").send(newUser).expect(200);
  });

  it("should get email exists error", async () => {
    const response = await request(app)
      .post("/guests/auth/register")
      .send(existingUser)
      .expect(400);

    expect(response.body).toMatchObject({
      email: expect.any(String),
    });
  });
});
