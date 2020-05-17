import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { Box, Button } from "@material-ui/core";
import Axios from "axios";
import AddComment from "./AddComment";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxHeight: "60vh",
    overflowY: "scroll",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
  primaryColor: {
    backgroundColor: theme.palette.primary.main,
  },
}));

export default function Comments({ facilityComments, facilityID }) {
  const classes = useStyles();
  const [comments, setComments] = useState(facilityComments);
  const user = useSelector((state) => state.auth.user);
  const isManager = user.manages && user.manages === facilityID;

  const delComment = async (i) => {
    try {
      await Axios.delete(`/managers/edit/comment/${i}`);
      setComments((old) => old.filter((_, index) => index !== i));
    } catch (error) {}
  };

  return (
    <List className={classes.root}>
      <AddComment
        classes={classes}
        user={user}
        updateComments={setComments}
        facilityID={facilityID}
      />

      <Divider variant="inset" component="li" />
      {comments.map((c, i) => (
        <React.Fragment key={i}>
          <Box display="flex" alignItems="center" justifyContent="space-around">
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar className={classes.primaryColor}>
                  {c.user.name[0].toUpperCase()}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={c.user.name}
                secondary={
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {c.comment}
                  </Typography>
                }
              />
            </ListItem>
            {isManager && (
              <Button color="secondary" onClick={() => delComment(i)}>
                Delete
              </Button>
            )}
          </Box>
          <Divider variant="inset" component="li" />
        </React.Fragment>
      ))}
    </List>
  );
}

Comments.propTypes = {
  facilityComments: PropTypes.array.isRequired,
  facilityID: PropTypes.string.isRequired,
};
