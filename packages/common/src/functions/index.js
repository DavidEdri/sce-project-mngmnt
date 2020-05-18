import { adminRank } from "../constants";

export const pick = (obj, keys) => {
  const res = {};

  keys.forEach((k) => {
    try {
      if (k in obj) res[k] = obj[k];
    } catch (error) {
      console.log(`pick function: error:${error}`);
    }
  });

  return res;
};

export const ignore = (obj, keys) => {
  const res = {};

  try {
    Object.keys(obj).forEach((k) => {
      if (!keys.includes(k)) res[k] = obj[k];
    });
  } catch (error) {
    console.log(`ignore error: ${error}`);
  }

  return res;
};

export const isAdmin = (user) => user && user.rank >= adminRank;

export const isActive = (user) => user && (user.active || isAdmin(user));

export const isYupObj = (o) =>
  typeof o === "object" && o.name === "ValidationError";

export const yupErrorsToObj = (e) => {
  const errors = {};
  try {
    e.inner.forEach((err) => {
      errors[err.path] = err.message;
    });
  } catch (error) {
    console.log(`YupErrorsToObj : convertion error`);
  }
  return errors;
};

export const isManager = (user) => user && user.manages !== undefined;
