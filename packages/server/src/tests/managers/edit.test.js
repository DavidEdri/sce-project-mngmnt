import request from "supertest";
import app from "../../app";
import { tearup, managerToken, testFacility } from "../data/facility";

beforeAll(tearup);

describe("GET /managers/edit/", () => {
  it("should get a managers facility", async () => {
    await request(app)
      .get("/managers/edit/")
      .set("Authorization", `Bearer ${managerToken}`)
      .expect(200);
  });

  it("should get unauthorized", async () => {
    await request(app)
      .get("/managers/edit/")
      .expect(401);
  });
});

describe("PUT /managers/edit/", () => {
  it("should edit managers facility", async () => {
    await request(app)
      .put("/managers/edit/")
      .set("Authorization", `Bearer ${managerToken}`)
      .send(testFacility)
      .expect(200);
  });

  it("should get error", async () => {
    await request(app)
      .put("/managers/edit/")
      .set("Authorization", `Bearer ${managerToken}`)
      .expect(400);
  });
});
