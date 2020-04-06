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

describe("POST /guests/auth/login", () => {
  it("should login user", async () => {
    await request(app)
      .post("/guests/auth/login")
      .send({ email: firstUser.email, password: firstUser.password })
      .expect(200);
  });

  it("should not login user", async () => {
    await request(app)
      .post("/guests/auth/login")
      .send({ email: firstUser.email, password: "asdasd" })
      .expect(400);
  });
});

describe("POST /guests/auth/activate/:token", () => {
  it("should get bad token error", async () => {
    await request(app)
      .post(`/guests/auth/activate/badToken`)
      .send()
      .expect(400);
  });

  it("should activate user", async () => {
    await request(app)
      .post(`/guests/auth/activate/${firstUser.activateToken}`)
      .expect(200);

    const user = await User.findOne({ email: firstUser.email });
    expect(user.active).toBe(true);
    expect(user.activateToken).toBeUndefined();
  });
});

describe("POST /guests/auth/resendActivateMail/:id", () => {
  it("should get user dont exists", async () => {
    await request(app)
      .post(`/guests/auth/resendActivateMail/5e668c02907c4a0fcaeb30dc`)
      .expect(500);
  });

  it("should resend activation mail", async () => {
    await request(app)
      .post(`/guests/auth/resendActivateMail/${firstUser._id}`)
      .expect(200);
  });
});
