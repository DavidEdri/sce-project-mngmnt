import React, { Fragment } from "react";
import Axios from "axios";
import PropTypes from "prop-types";
import ReCAPTCHA from "react-google-recaptcha";
import { Formik, Form } from "formik";
import { validation } from "@project/common";
import { CircularProgress, Button, Typography } from "@material-ui/core";
import {
  MyCheckboxGroup,
  MyRadioGroup,
  MyTextField,
  MySelect,
  MySwitch,
  OtherInput,
  MyTextarea,
  DateSelect
} from "./inputs";
import { fieldsToInitialValues } from "./functions";
import { captchaKey } from "../../../utils/constants";
import text from "../../../utils/_text";

export default function MyFormik({
  fields,
  validationSchema = validation.forms.noValidate,
  onSubmit,
  title = null,
  paragraph = null,
  useCaptcha = false,
  afterDefualtSubmit = null
}) {
  const initialValues = fieldsToInitialValues(fields);
  const recaptchaRef = React.useRef();

  const defaultOnSubmit = (url, afterDefualtSubmit) => async data => {
    const res = await Axios.post(url, data);

    if (afterDefualtSubmit) {
      afterDefualtSubmit(res);
    }
  };

  if (useCaptcha) {
    initialValues.captcha = "";
    validationSchema = validationSchema.concat(
      validation.inputs.requiredField("captcha")
    );
  }

  if (typeof onSubmit === "string") {
    onSubmit = defaultOnSubmit(onSubmit, afterDefualtSubmit);
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (data, actions) => {
        if (useCaptcha && recaptchaRef.current.getValue() === "") {
          actions.setFieldValue("captcha", "");
        } else {
          try {
            await onSubmit(data, actions);
          } catch (error) {
            if (useCaptcha) {
              recaptchaRef.current.reset();
            }
            actions.setErrors(error.response.data);
          }
        }
      }}
    >
      {({ errors, touched, setFieldValue, isSubmitting }) => (
        <>
          {title && (
            <Typography align="center" variant="h3" paragraph gutterBottom>
              {title}
            </Typography>
          )}

          {paragraph && (
            <Typography
              align="center"
              variant="subtitle1"
              color="textSecondary"
            >
              {paragraph}
            </Typography>
          )}
          <Form>
            {errors.general && (
              <Typography align="center" color="error" paragraph gutterBottom>
                {errors.general}
              </Typography>
            )}
            {fields.map((f, i) => {
              switch (f.type) {
                case "text":
                  return (
                    <MyTextField
                      key={f.fieldName}
                      name={f.fieldName}
                      type={f.options}
                      label={f.label}
                      margin="normal"
                      fullWidth
                    />
                  );

                case "textarea":
                  return (
                    <MyTextarea
                      key={f.fieldName}
                      name={f.fieldName}
                      placeholder={f.label}
                      rows={f.rows}
                      rowsMax={f.rowsMax || 999}
                      margin="normal"
                      fullWidth
                    />
                  );

                case "radio":
                  return (
                    <MyRadioGroup
                      key={f.fieldName}
                      name={f.fieldName}
                      options={f.options}
                      label={f.label}
                    />
                  );

                case "checkbox":
                  return (
                    <MyCheckboxGroup
                      key={f.fieldName}
                      name={f.fieldName}
                      options={f.options}
                      label={f.label}
                    />
                  );

                case "select":
                  return (
                    <MySelect
                      key={f.fieldName}
                      name={f.fieldName}
                      options={f.options}
                      isMulti={f.isMulti}
                      label={f.label}
                    />
                  );

                case "switch":
                  return (
                    <MySwitch
                      key={f.fieldName}
                      name={f.fieldName}
                      label={f.label}
                    />
                  );
                case "date":
                  return (
                    <DateSelect
                      type="date"
                      key={f.fieldName}
                      name={f.fieldName}
                      label={f.label}
                      setValue={value => setFieldValue(f.fieldName, value)}
                    />
                  );

                case "time":
                  return (
                    <DateSelect
                      type="time"
                      key={f.fieldName}
                      name={f.fieldName}
                      label={f.label}
                      setValue={value => setFieldValue(f.fieldName, value)}
                    />
                  );

                case "datetime":
                  return (
                    <DateSelect
                      type="datetime"
                      key={f.fieldName}
                      name={f.fieldName}
                      label={f.label}
                      setValue={value => setFieldValue(f.fieldName, value)}
                    />
                  );

                case "other":
                  return (
                    <OtherInput
                      key={f.fieldName}
                      component={f.component}
                      name={f.fieldName}
                      setValue={value => setFieldValue(f.fieldName, value)}
                      other={f.props}
                    />
                  );

                default:
                  return <Fragment key={i} />;
              }
            })}

            {useCaptcha && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 5
                }}
              >
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={captchaKey}
                  onChange={e => {
                    setFieldValue("captcha", e);
                  }}
                />
                <Typography
                  color="error"
                  hidden={!(errors.captcha && touched.captcha)}
                >
                  {text.checkCaptcha}
                </Typography>
              </div>
            )}

            <Button
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              type="submit"
              fullWidth
              endIcon={isSubmitting && <CircularProgress size={20} />}
            >
              {text.submit}
            </Button>
          </Form>
        </>
      )}
    </Formik>
  );
}

MyFormik.propTypes = {
  onSubmit: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
  fields: PropTypes.array.isRequired,
  title: PropTypes.string,
  paragraph: PropTypes.string,
  validationSchema: PropTypes.any,
  useCaptcha: PropTypes.bool,
  afterDefualtSubmit: PropTypes.func
};
