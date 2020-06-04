import React from "react";
import LinksAbstract from "../common/NavbarAbstract/LinksAbstract";
import text from "../../utils/_text";

export function ToAll({ closeMenu }) {
  return <LinksAbstract closeMenu={closeMenu} links={[]} />;
}
export function GuestLinks({ closeMenu }) {
  return (
    <LinksAbstract
      closeMenu={closeMenu}
      links={[
        { text: text.loginLink, to: "/login" },
        { text: text.registerLink, to: "/register" },
      ]}
    />
  );
}

export function UserLinks({ closeMenu }) {
  return (
    <LinksAbstract
      closeMenu={closeMenu}
      links={[
        { text: text.dashboardLink, to: "/dashboard" },
        {
          text: "Messages",
          to: "/dashboard/messages",
        },
      ]}
    />
  );
}

export function AdminLinks({ closeMenu }) {
  return (
    <LinksAbstract
      closeMenu={closeMenu}
      links={[{ text: text.adminLink, to: "/admin" }]}
    />
  );
}

export function ManagerLinks({ closeMenu }) {
  return (
    <LinksAbstract
      closeMenu={closeMenu}
      links={[
        { text: "Manage Facility", to: "/manager/edit" },
        { text: "Facility Reports", to: "/manager/reports" },
      ]}
    />
  );
}
