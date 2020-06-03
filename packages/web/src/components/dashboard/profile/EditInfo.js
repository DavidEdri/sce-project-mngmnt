import React, { useState } from "react";
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { validation } from "@project/common";
import { Grid, TextField, Button } from "@material-ui/core";
import { isProduction } from "../../../utils/functions";
import { refreshJwt } from "../../../redux/actions/authActions";
import MyFormik from "../../common/MyFormik/index";
import text from "../../../utils/_text";

const fields = (user) => [
  {
    fieldName: "email",
    type: "other",
    props: { label: text.emailLabel },
    component: DisabledField,
    initialValue: user.email,
  },
  {
    fieldName: "name",
    label: text.fullNameLabel,
    type: "text",
    options: "text",
    initialValue: user.name,
  },
  {
    fieldName: "avatar",
    label: "Change profile image",
    type: "upload",
  },
  {
    fieldName: "passwords",
    type: "other",
    component: EditPassword,
    initialValue: { password: "", password2: "" },
  },
];

const onSubmit = (dispatch) => async (values, actions, resetCaptcha) => {
  try {
    const formData = new FormData();

    Object.keys(values).forEach((k) => {
      if (k !== "passwords") formData.append(k, values[k]);
    });

    formData.append("passwords", JSON.stringify(values.passwords));

    await Axios.post("/users/userActions/editInfo", formData);
    await refreshJwt(dispatch);
    window.location.href = "/dashboard/profile/home";
  } catch (error) {
    console.log(error.response.data);
    if (isProduction()) {
      resetCaptcha(error);
    }
    actions.setErrors(error);
  }
};

export default function EditInfo() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  return (
    <Grid container justify="center" alignItems="center">
      <Grid item md={6} xs={12}>
        <MyFormik
          fields={fields(user)}
          title={text.editProfileInfo}
          onSubmit={onSubmit(dispatch)}
          validationSchema={validation.inputs.requiredField("name")}
          useCaptcha={isProduction()}
        />
      </Grid>
    </Grid>
  );
}

// eslint-disable-next-line react/prop-types
function DisabledField({ value, errorMsg, setValue, ...other }) {
  return <TextField {...other} fullWidth value={value} disabled />;
}

// eslint-disable-next-line react/prop-types
function EditPassword({ value, errorMsg, setValue }) {
  const [editPass, setEditPass] = useState(false);

  return (
    <div style={{ marginBottom: 10 }}>
      {!editPass ? (
        <Button onClick={() => setEditPass(true)}>
          {text.clickToEditPass}
        </Button>
      ) : (
        <>
          <TextField
            error={errorMsg !== undefined && "password" in errorMsg}
            label={text.passLabel}
            margin="dense"
            // eslint-disable-next-line react/prop-types
            helperText={errorMsg !== undefined ? errorMsg.password : ""}
            name="password"
            type="password"
            // eslint-disable-next-line react/prop-types
            value={value.password}
            onChange={(e) => setValue({ ...value, password: e.target.value })}
            fullWidth
          />
          <TextField
            error={errorMsg !== undefined && "password2" in errorMsg}
            label={text.passConfirmLabel}
            margin="dense"
            // eslint-disable-next-line react/prop-types
            helperText={errorMsg !== undefined ? errorMsg.password2 : ""}
            name="password2"
            type="password"
            // eslint-disable-next-line react/prop-types
            value={value.password2}
            onChange={(e) => setValue({ ...value, password2: e.target.value })}
            fullWidth
          />
        </>
      )}
    </div>
  );
}
