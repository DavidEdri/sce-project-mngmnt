import request from "supertest";
import app from "../../app";
import { loggedinToken, tearup } from "../data/users";
import { facilityID, tearup as facilityTearup } from "../data/facility";

beforeAll(async () => {
  await facilityTearup();
  await tearup(true);
});

describe("POST /users/facility/comment", () => {
  it("should post a comment on facility", async () => {
    await request(app)
      .post("/users/facility/comment")
      .set("Authorization", `Bearer ${loggedinToken}`)
      .send({ facilityID, comment: "test" })
      .expect(200);
  });

  it("should get error", async () => {
    await request(app)
      .post("/users/facility/comment")
      .set("Authorization", `Bearer ${loggedinToken}`)
      .expect(400);
  });

  it("should get unauthorized", async () => {
    await request(app)
      .post("/users/facility/comment")
      .expect(401);
  });
});

describe("POST /users/facility/rate", () => {
  it("should rate a facility", async () => {
    await request(app)
      .post("/users/facility/rate")
      .set("Authorization", `Bearer ${loggedinToken}`)
      .send({ facilityID, rate: "4" })
      .expect(200);
  });

  it("should get error", async () => {
    await request(app)
      .post("/users/facility/rate")
      .set("Authorization", `Bearer ${loggedinToken}`)
      .expect(400);
  });
});

describe("POST /users/facility/favorite", () => {
  it("should add a facility to favorites", async () => {
    await request(app)
      .put("/users/facility/favorite")
      .set("Authorization", `Bearer ${loggedinToken}`)
      .send({ facilityID })
      .expect(200);
  });

  it("should get error", async () => {
    await request(app)
      .put("/users/facility/favorite")
      .set("Authorization", `Bearer ${loggedinToken}`)
      .expect(400);
  });
});

describe("DELETE /users/facility/favorite/:id", () => {
  it("should remove a facility from favorites", async () => {
    await request(app)
      .delete(`/users/facility/favorite/${facilityID}`)
      .set("Authorization", `Bearer ${loggedinToken}`)
      .expect(200);
  });
});
