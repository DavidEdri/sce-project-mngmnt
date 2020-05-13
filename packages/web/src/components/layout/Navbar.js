import React from "react";
import { GuestLinks, AdminLinks, UserLinks, ManagerLinks } from "./NavbarLinks";
import NavbarAbstract from "../common/NavbarAbstract";

export default function Navbar() {
  return (
    <NavbarAbstract
      links={[
        { type: "loggedout", component: GuestLinks },
        { type: "loggedin", component: UserLinks },
        { type: "admin", component: AdminLinks },
        { type: "manager", component: ManagerLinks },
      ]}
    />
  );
}
