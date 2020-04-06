import * as Yup from "yup";
import { ranks } from "../constants";
import messages from "./text.json";

export const requiredField = fieldName =>
  Yup.object().shape({
    [`${fieldName}`]: Yup.string().required(messages.requiredField)
  });

export const boolField = fieldName =>
  Yup.object().shape({
    [`${fieldName}`]: Yup.boolean().required(messages.requiredField)
  });

export const email = Yup.object().shape({
  email: Yup.string()
    .required(messages.requiredField)
    .email(messages.invalidEmail)
});

export const passwordConfirm = Yup.object().shape({
  password: Yup.string()
    .required(messages.requiredField)
    .matches(
      /^(?:(?=.*[a-z])|(?=.*[A-Z])(?:(?=.*[A-Z])(?=.*[\d])|(?=.*\d))|(?=.*[A-Z])(?=.*[a-z])(?=.*\d)).{8,16}$/,
      messages.weakPassword
    ),
  password2: Yup.string()
    .required(messages.requiredField)
    .oneOf([Yup.ref("password"), null], messages.passwordsDontMatch)
});

export const rank = Yup.object().shape({
  rank: Yup.number()
    .typeError(messages.rankInteger)
    .required(messages.requiredField)
    .integer(messages.rankInteger)
    .min(ranks[0].value, messages.rankOutOfRange)
    .max(ranks[ranks.length - 1].value, messages.rankOutOfRange)
});
