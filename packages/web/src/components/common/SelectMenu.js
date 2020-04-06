import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import { isFunction } from "util";

export default function SelectMenu({ buttonText = "", links = [] }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {typeof buttonText === "object" ? (
        <IconButton
          color="inherit"
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          {buttonText}
        </IconButton>
      ) : (
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
          color="inherit"
        >
          {buttonText}
        </Button>
      )}

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {links.map((link, i) => (
          <MenuItem
            key={`${i}.${link.name}`}
            onClick={() => {
              handleClose();
              if (isFunction(link.func)) {
                link.func();
              }
            }}
          >
            {link.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

SelectMenu.propTypes = {
  links: PropTypes.array.isRequired,
  buttonText: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};
