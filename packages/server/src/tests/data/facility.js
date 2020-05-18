import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Facility from "../../models/Facility";
import User from "../../models/User";
import { userToPayload } from "../../utils/functions";

export const facilityID = new mongoose.Types.ObjectId();
export const managerID = new mongoose.Types.ObjectId();

export const testFacility = {
  _id: facilityID,
  manager: managerID,
  name: "test",
  activity: "פתוח ללא הגבלה",
  condition: "תקין ופעיל",
  fencing: true,
  handicappe: true,
  lat: 31.25755279400005,
  lon: 34.763918827000055,
  ligthing: true,
  neighborhood: "יא",
  operator: "ניהול עצמי",
  type: "מגרש כדורסל – 19X32 מ'",
};

export const manager = {
  _id: managerID,
  name: "david",
  email: "admin22@dummyMail.com",
  rank: 2,
  password: "a123456b",
  manages: facilityID,
};

export const managerToken = jwt.sign(
  userToPayload(manager),
  process.env.JWT_SECRET,
  { expiresIn: process.env.JWT_EXPIRE }
);

export const tearup = async () => {
  await User.deleteMany();
  await Facility.deleteMany();

  await new Facility(testFacility).save();
  await new User(manager).save();
};
