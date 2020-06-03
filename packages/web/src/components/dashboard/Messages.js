import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import Divider from "@material-ui/core/Divider";
import { useFetch } from "../../utils/hooks";
import Loading from "../common/Loading";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

const Messages = () => {
  const classes = useStyles();
  const { loading, data: messages } = useFetch("/users/messages");

  if (loading) return <Loading />;

  return (
    <List className={classes.root}>
      {messages.map((m, i) => (
        <React.Fragment key={i}>
          <ListItem>
            <ListItemAvatar>
              <Avatar src={m.from.avatar ? m.from.avatar : undefined}>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={m.from.name} secondary={m.message} />
          </ListItem>
          <Divider variant="inset" component="li" />
        </React.Fragment>
      ))}
    </List>
  );
};

export default Messages;
