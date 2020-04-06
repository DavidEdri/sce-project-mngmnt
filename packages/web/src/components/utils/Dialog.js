import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { closeDialog } from "../../redux/actions/utilsActions";
import text from "../../utils/_text";

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    minWidth: "300px"
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

export default function AlertDialogSlide() {
  const dispatch = useDispatch();
  const dialogState = useSelector(state => state.utils.dialog);
  const { title, body, buttonText, fullscreen, isOpen } = dialogState;

  const handleClose = () => {
    dispatch(closeDialog());
  };

  return (
    <>
      <Dialog
        open={isOpen}
        fullScreen={fullscreen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle onClose={handleClose}>{title}</DialogTitle>
        <DialogContent>{body}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {buttonText === "" ? text.dialogClose : buttonText}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
