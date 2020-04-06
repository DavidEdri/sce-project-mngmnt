import { functions } from "@project/common";

export const isActive = (req, res, next) => {
  if (functions.isActive(req.user)) {
    next();
  } else {
    res.status(400).json({ msg: "Activate your account" });
  }
};

export const isAdmin = (req, res, next) => {
  if (functions.isAdmin(req.user)) {
    next();
  } else {
    res.status(401).json({ msg: "Unauthorized" });
  }
};
