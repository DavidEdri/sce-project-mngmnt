import React, { useState } from "react";
import PropTypes from "prop-types";
// import axios from "axios";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Collapse from "@material-ui/core/Collapse";
import { useSelector } from "react-redux";
import Axios from "axios";

export default function AddComment({ classes, updateComments, facilityID }) {
  const [comment, setComment] = useState("");
  const [error, setError] = useState(false);
  const [showActions, setShowhowActions] = useState(false);
  const auth = useSelector((state) => state.auth);
  const { user, isLoggedin } = auth;

  const toggleShowActions = () => setShowhowActions(true);

  const cancelComment = () => {
    setShowhowActions(false);
    setComment("");
  };

  const handleChange = (e) => {
    if (error) {
      setError(false);
    }
    setComment(e.target.value);
  };

  const onSubmit = async (comment) => {
    try {
      if (comment === "") {
        setError(true);
        return;
      }
      const res = await Axios.post("/users/facility/comment", {
        comment,
        facilityID,
      });
      cancelComment();
      updateComments((old) => [
        {
          comment,
          date: res.date,
          user: { name: user.name, avatar: user.avatar },
        },
        ...old,
      ]);
    } catch (error) {}
  };

  if (!isLoggedin) return <></>;
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar
          className={classes.primaryColor}
          src={user.avatar ? user.avatar : undefined}
        >
          {user.name[0].toUpperCase()}
        </Avatar>
      </ListItemAvatar>
      <Container>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              placeholder={`comment as ${user.name}`}
              multiline
              rowsMax={3}
              fullWidth
              value={comment}
              onChange={handleChange}
              error={error}
              onFocus={toggleShowActions}
            />
          </Grid>

          <Grid item xs={12}>
            <Collapse in={showActions}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-around"
                flexWrap="wrap"
              >
                <Box display="flex" justifyContent="flex-end">
                  <Button
                    variant="contained"
                    color="default"
                    style={{ margin: "0 10px" }}
                    onClick={cancelComment}
                  >
                    cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onSubmit(comment)}
                  >
                    submit
                  </Button>
                </Box>
              </Box>
            </Collapse>
          </Grid>
        </Grid>
      </Container>
    </ListItem>
  );
}

AddComment.propTypes = {
  classes: PropTypes.object.isRequired,
  updateComments: PropTypes.func.isRequired,
  facilityID: PropTypes.string.isRequired,
};
