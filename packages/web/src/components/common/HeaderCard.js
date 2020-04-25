import React from "react";
import PropTypes from "prop-types";
import { Card, CardHeader, CardContent } from "@material-ui/core";

export default function HeaderCard({ header, content }) {
  return (
    <Card>
      <CardHeader
        titleTypographyProps={{ align: "center", color: "primary" }}
        title={header}
      />
      <CardContent>{content}</CardContent>
    </Card>
  );
}

HeaderCard.propTypes = {
  header: PropTypes.string.isRequired,
  content: PropTypes.object.isRequired,
};
