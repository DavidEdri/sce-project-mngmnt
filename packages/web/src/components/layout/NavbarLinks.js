import React from "react";
import LinksAbstract from "../common/NavbarAbstract/LinksAbstract";
import text from "../../utils/_text";

export function GuestLinks({ closeMenu }) {
  return (
    <LinksAbstract
      closeMenu={closeMenu}
      links={[{ text: text.registerLink, to: "/register" }]}
    />
  );
}

export function UserLinks({ closeMenu }) {
  return <LinksAbstract closeMenu={closeMenu} links={[]} />;
}

export function AdminLinks({ closeMenu }) {
  return <LinksAbstract closeMenu={closeMenu} links={[]} />;
}
