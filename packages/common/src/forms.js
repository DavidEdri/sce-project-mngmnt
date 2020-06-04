import * as Yup from "yup";
import {
  requiredField,
  email,
  passwordConfirm,
  rank,
  boolField,
} from "./inputs";

export const noValidate = Yup.object().shape({});

export const register = requiredField("name")
  .concat(email)
  .concat(passwordConfirm);

export const login = requiredField("password").concat(email);

export const adminAddUser = register.concat(rank).concat(boolField("active"));

export const adminEditUser = requiredField("name")
  .concat(rank)
  .concat(boolField("active"));

export const adminAssignFacility = requiredField("user").concat(
  requiredField("facility")
);

export const editFacility = requiredField("name")
  .concat(requiredField("activity"))
  .concat(requiredField("condition"))
  .concat(boolField("fencing"))
  .concat(boolField("handicappe"))
  .concat(boolField("ligthing"))
  .concat(
    Yup.object().shape({
      gallery: Yup.array().of(
        Yup.lazy((item) =>
          typeof item === "string"
            ? Yup.string()
            : Yup.mixed()
                .test(
                  "fileFormat",
                  "Image only",
                  (value) =>
                    value &&
                    (["image/jpeg", "image/png"].includes(value.mimetype) ||
                      ["image/jpeg", "image/png"].includes(value.type))
                )
                .test(
                  "fileSize",
                  "File too big: max 2 MB",
                  (value) => value && value.size / 1024 / 1024 <= 2
                )
        )
      ),
    })
  );

export const message = requiredField("from")
  .concat(requiredField("to"))
  .concat(requiredField("message"));

export const report = requiredField("to").concat(requiredField("message"));
