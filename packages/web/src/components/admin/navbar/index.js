import React from "react";
import PropTypes from "prop-types";
import LinksAbstract from "../../common/NavbarAbstract/LinksAbstract";
import NavbarAbstract from "../../common/NavbarAbstract";
import navLinks from "./navLinks";

export default function AdminNavbar() {
  return <NavbarAbstract links={[{ type: "admin", component: AdminLinks }]} />;
}

function AdminLinks({ closeMenu }) {
  return <LinksAbstract closeMenu={closeMenu} links={navLinks} />;
}

AdminLinks.propTypes = {
  closeMenu: PropTypes.func.isRequired
};
