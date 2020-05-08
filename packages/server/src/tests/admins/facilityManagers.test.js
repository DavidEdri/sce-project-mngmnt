import request from "supertest";
import app from "../../app";
import { firstUser, adminToken, tearup as usersTearup } from "../data/users";
import Facility from "../../models/Facility";

const facility = new Facility({
  name: "test",
  activity: "test",
  condition: "good",
  fencing: true,
  handicappe: true,
  lat: 0,
  lon: 0,
  ligthing: true,
  neighborhood: "bla",
  operator: "admin",
  type: "Tennis",
});

beforeAll(async () => {
  await usersTearup();
  await Facility.deleteMany();
  await facility.save();
});

describe("GET /admins/facilityManagers/", () => {
  it("should get all facility managers", async () => {
    await request(app)
      .get("/admins/facilityManagers/")
      .set("Authorization", `Bearer ${adminToken}`)
      .expect(200);
  });
});

describe("POST /admins/facilityManagers/", () => {
  it("should assign user to manage facility", async () => {
    const res = await request(app)
      .post("/admins/facilityManagers/")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ user: firstUser._id, facility: facility._id })
      .expect(200);

    expect(res.body.manages).toBeDefined();
  });
});

describe("DEL /admins/facilityManagers/:id", () => {
  it("should remove user from facility", async () => {
    const res = await request(app)
      .delete(`/admins/facilityManagers/${firstUser._id}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .expect(200);

    expect(res.body.manages).toBeUndefined();
  });
});
