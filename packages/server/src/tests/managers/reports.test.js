import request from "supertest";
import app from "../../app";
import { tearup, managerToken, testFacility } from "../data/facility";

beforeAll(tearup);

describe("GET /managers/reports/", () => {
  it("should get all facility reports", async () => {
    await request(app)
      .get("/managers/reports/")
      .set("Authorization", `Bearer ${managerToken}`)
      .expect(200);
  });
});
