import { functions } from "@project/common";
import { logError } from "./logger";
import returnText from "../routes/api/_text";

export const errorHandler = (error, req) => {
  let json;
  let status;

  if (functions.isYupObj(error)) {
    json = functions.yupErrorsToObj(error);
    status = 400;

    return { json, status };
  }

  logError(error, req);

  json = { msg: returnText.serverError };
  status = 500;

  return { json, status };
};

export const userToPayload = (user) => ({
  id: user._id,
  rank: user.rank,
  active: user.active,
  name: user.name,
  email: user.email,
  avatar: user.avatar,
  manages: user.manages,
  favorites: user.favorites,
});

export const userToApi = (user) => ({
  name: user.name,
  rank: user.rank,
  _id: user._id,
  email: user.email,
  active: user.active,
  avatar: user.avatar,
  manages: user.manages,
  favorites: user.favorites,
});
