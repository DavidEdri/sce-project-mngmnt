import request from "supertest";
import app from "../../app";
import { adminUser, loggedinToken, tearup } from "../data/users";

beforeAll(async () => {
  await tearup(true);
});

describe("GET /users/messages", () => {
  it("should get all messages", async () => {
    await request(app)
      .get("/users/messages")
      .set("Authorization", `Bearer ${loggedinToken}`)
      .expect(200);
  });
});

describe("POST /users/messages", () => {
  it("should create a new message", async () => {
    const newInfo = {
      from: adminUser._id,
      to: adminUser._id,
      message: "test",
    };
    await request(app)
      .post("/users/messages")
      .set("Authorization", `Bearer ${loggedinToken}`)
      .send(newInfo)
      .expect(200);
  });
});
