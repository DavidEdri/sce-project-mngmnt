/* eslint-disable react/prop-types */
import React from "react";
import Axios from "axios";
import { validation } from "@project/common";
import { Grid, Button, TextField, Box } from "@material-ui/core";
import { useFetch } from "../../utils/hooks";
import Loading from "../common/Loading";
import MyFormik from "../common/MyFormik/index";

const Edit = () => {
  const { data, loading } = useFetch("/managers/edit");
  const fields = [
    {
      fieldName: "name",
      label: "name",
      type: "text",
      options: "text",
      initialValue: data ? data.name : "",
    },
    {
      fieldName: "activity",
      label: "activity",
      type: "text",
      options: "text",
      initialValue: data ? data.activity : "",
    },
    {
      fieldName: "condition",
      label: "condition",
      type: "text",
      options: "text",
      initialValue: data ? data.condition : "",
    },
    {
      fieldName: "fencing",
      label: "fencing",
      type: "switch",
      initialValue: data ? data.fencing : false,
    },
    {
      fieldName: "handicappe",
      label: "handicappe",
      type: "switch",
      initialValue: data ? data.handicappe : false,
    },
    {
      fieldName: "ligthing",
      label: "ligthing",
      type: "switch",
      initialValue: data ? data.ligthing : false,
    },
    {
      fieldName: "gallery",
      label: "Gallery",
      type: "other",
      component: ({ value, setValue, errorMsg }) => {
        const addItem = () => setValue([...value, undefined]);
        const removeItem = (index) => {
          const tmp = [...value];
          tmp.splice(index, 1);
          setValue(tmp);
        };
        const setFile = (e, i) => {
          const newState = [...value];
          // eslint-disable-next-line prefer-destructuring
          newState[i] = e.currentTarget.files[0];
          setValue(newState);
        };

        return (
          <div>
            {value.length < 5 && <Button onClick={addItem}>add image</Button>}
            {value.map((img, index) => {
              const isError =
                errorMsg && errorMsg[index] && errorMsg[index] !== "";
              const errMsg = isError ? errorMsg[index] : undefined;
              const isUrl = typeof img === "string";
              return (
                <Box display="flex" alignItems="center" key={index}>
                  {isUrl ? (
                    <img style={{ height: 200 }} src={img} alt="img" />
                  ) : (
                    <TextField
                      type="file"
                      error={isError}
                      inputProps={{ accept: "image/*" }}
                      name={`gallery.${index}`}
                      helperText={errMsg}
                      fullWidth
                      onChange={(e) => setFile(e, index)}
                    />
                  )}
                  <Button onClick={() => removeItem(index)}>x</Button>
                </Box>
              );
            })}
          </div>
        );
      },
      initialValue: data ? data.gallery : [],
    },
  ];

  const onSubmit = async (values) => {
    try {
      const formData = new FormData();

      Object.keys(values).forEach((k) => {
        if (k !== "gallery") formData.append(k, values[k]);
      });

      for (const key of Object.keys(values.gallery)) {
        formData.append("gallery", values.gallery[key]);
      }
      await Axios.put("/managers/edit", formData);
    } catch (error) {}
  };

  if (loading) return <Loading />;

  return (
    <Grid container justify="center">
      <Grid item md={6} xs={12}>
        <MyFormik
          fields={fields}
          title="Edit facility"
          onSubmit={onSubmit}
          validationSchema={validation.forms.editFacility}
        />
      </Grid>
    </Grid>
  );
};

export default Edit;
