import React from "react";
import PropTypes from "prop-types";
import { Typography, Box, Icon, Tooltip } from "@material-ui/core";
import { Accessible, WbIncandescent, GridOn } from "@material-ui/icons";
import HeaderCard from "../../common/HeaderCard";

export default function Info({
  activity,
  condition,
  fencing,
  handicappe,
  ligthing,
  neighborhood,
  operator,
  type,
}) {
  return (
    <HeaderCard
      style={{ height: "100%", alignItems: "center" }}
      header="Info"
      content={
        <Box display="flex" flexDirection="column" alignItems="center">
          <InfoRow title="Activity" text={activity} />
          <InfoRow title="Neighborhood" text={neighborhood} />
          <InfoRow title="Condition" text={condition} />
          <InfoRow title="Type" text={type} />
          <InfoRow title="Operator" text={operator} />

          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-around"
            style={{ width: "100%" }}
          >
            <InfoIcon bool={fencing} text="Fencing" icon={GridOn} />
            <InfoIcon bool={handicappe} text="Accessibilty" icon={Accessible} />
            <InfoIcon bool={ligthing} text="Lighning" icon={WbIncandescent} />
          </Box>
        </Box>
      }
    />
  );
}

Info.propTypes = {
  activity: PropTypes.string.isRequired,
  condition: PropTypes.string.isRequired,
  fencing: PropTypes.bool.isRequired,
  handicappe: PropTypes.bool.isRequired,
  ligthing: PropTypes.bool.isRequired,
  neighborhood: PropTypes.string.isRequired,
  operator: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

function InfoRow({ title, text }) {
  return (
    <Box display="flex" alignItems="center" style={{ marginBottom: 10 }}>
      <Typography variant="h6" color="primary">
        {`${title} : `}
      </Typography>
      <Typography variant="body1">{text}</Typography>
    </Box>
  );
}

InfoRow.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

function InfoIcon({ bool, icon: PropIcon, text }) {
  return (
    <Tooltip title={`${bool ? "" : "No "}${text}`}>
      <Icon color={bool ? "primary" : "inherit"}>
        <PropIcon />
      </Icon>
    </Tooltip>
  );
}

InfoIcon.propTypes = {
  bool: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
};
