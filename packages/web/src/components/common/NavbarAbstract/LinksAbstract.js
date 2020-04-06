import React from "react";
import PropTypes from "prop-types";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  textCenter: {
    textAlign: "center"
  }
}));

export default function LinksAbstract({ closeMenu, links }) {
  const classes = useStyles();

  return (
    <>
      {links.map((link, i) => (
        <ListItem
          alignItems="center"
          onClick={closeMenu}
          button
          component={Link}
          to={link.to}
          key={i + link.to}
        >
          <ListItemText className={classes.textCenter} primary={link.text} />
        </ListItem>
      ))}
    </>
  );
}

LinksAbstract.propTypes = {
  closeMenu: PropTypes.func.isRequired,
  links: PropTypes.array.isRequired
};
