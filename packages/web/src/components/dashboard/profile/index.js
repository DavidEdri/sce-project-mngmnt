import React from "react";
import PropTypes from "prop-types";
import { Container } from "@material-ui/core";
import ProfileCard from "./ProfileCard";
import EditInfo from "./EditInfo";

export default function index({ match }) {
  const showCollapse =
    window.location.pathname.replace("/dashboard/profile/", "") === "home";

  const matchToComponent = match => {
    switch (match) {
      case "info":
        return <EditInfo />;
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="xl">
      <ProfileCard showCollapse={showCollapse} />
      {matchToComponent(match.params.field)}
    </Container>
  );
}

index.propTypes = {
  match: PropTypes.object.isRequired
};
