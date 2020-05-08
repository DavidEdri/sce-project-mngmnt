import { setDialog, setSnackbar } from "../slices/utils";

export const openDialog = (title, body, buttonText = "", fullscreen = false) =>
  setDialog({
    title,
    body,
    buttonText,
    fullscreen,
    isOpen: true
  });

export const closeDialog = () =>
  setDialog({
    title: "",
    body: "",
    buttonText: "",
    fullscreen: false,
    isOpen: false
  });

export const openSnackbar = (msg, variant) =>
  setSnackbar({
    msg,
    variant,
    isOpen: true
  });

export const closeSnackbar = variant => setSnackbar({ msg: "", variant });
