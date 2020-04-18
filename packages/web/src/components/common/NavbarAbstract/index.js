import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import UserIcon from "@material-ui/icons/Person";
import { functions } from "@project/common";
import { logoutUser } from "../../../redux/actions/authActions";
import { isRTL } from "../../../utils/constants";
import text from "../../../utils/_text";
import SelectMenu from "../SelectMenu";
import useStyles from "./style";

export default function NavbarAbstract({ links }) {
  const classes = useStyles();
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const { isLoggedin } = auth;
  const isAdmin = isLoggedin && functions.isAdmin(auth.user);

  const typeToState = type => {
    switch (type) {
      case "admin":
        return isAdmin;
      case "loggedin":
        return isLoggedin;
      case "loggedout":
        return !isLoggedin;
      default:
        return true;
    }
  };

  const logout = e => {
    dispatch(logoutUser());
    history.push("/");
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(
          classes.appBar,
          open && classes.appBarShift,
          classes.tabtopcolor
        )}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
            component={Link}
            to="/"
          >
            {text.logo}
          </Typography>

          {isLoggedin && (
            <SelectMenu
              buttonText={<UserIcon color="inherit" />}
              links={[
                {
                  name: text.profile,
                  func: () => {
                    history.push("/dashboard/profile/home");
                  }
                },
                {
                  name: text.logout,
                  func: logout
                }
              ]}
            />
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            {text.menu}
          </Typography>

          <IconButton onClick={handleDrawerClose}>
            {isRTL ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {links.map((link, i) => {
            return (
              <React.Fragment key={i}>
                {typeToState(link.type) && (
                  <link.component closeMenu={handleDrawerClose} />
                )}
              </React.Fragment>
            );
          })}
        </List>
      </Drawer>
    </div>
  );
}

NavbarAbstract.propTypes = {
  links: PropTypes.array.isRequired
};
