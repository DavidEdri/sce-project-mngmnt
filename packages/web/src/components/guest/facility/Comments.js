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
// import axios from "axios";
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
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar className={classes.primaryColor}>
                {c.user.name[0].toUpperCase()}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={c.user.name}
              secondary={
                <>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {c.comment}
                  </Typography>
                </>
              }
            />
          </ListItem>
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
