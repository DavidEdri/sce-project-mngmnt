import request from "supertest";
import app from "../../app";
import { tearup } from "../data/users";

beforeAll(tearup);

describe("GET /guests/facility/:id", () => {
  it("should get a facility", async () => {
    await request(app)
      .get("/guests/facility/123")
      .expect(400);
  });
});

describe("GET /guests/facility/", () => {
  it("should get all facilities", async () => {
    await request(app)
      .get("/guests/facility/")
      .expect(200);
  });
});
