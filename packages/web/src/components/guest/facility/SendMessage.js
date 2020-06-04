import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Box } from "@material-ui/core";
import MyFormik from "../../common/MyFormik";

export default function SendMessage({ managerID }) {
  const [show, setShow] = useState(false);

  const afterDefaultSubmit = () => {
    setShow(false);
  };

  return (
    <Box display="flex" justifyContent="center" style={{ width: "100%" }}>
      {!show ? (
        <Button color="secondary" onClick={() => setShow(true)}>
          message facility manager
        </Button>
      ) : (
        <MessageForm to={managerID} afterDefaultSubmit={afterDefaultSubmit} />
      )}
    </Box>
  );
}

SendMessage.propTypes = {
  managerID: PropTypes.string.isRequired,
};

export function MessageForm({ to, afterDefaultSubmit = undefined }) {
  return (
    <MyFormik
      afterDefualtSubmit={afterDefaultSubmit}
      onSubmit="/users/messages"
      fields={[
        {
          fieldName: "to",
          type: "invisible",
          initialValue: to,
        },
        {
          fieldName: "message",
          type: "textarea",
          label: "Message",
          initialValue: "",
          rows: 2,
          rowsMax: 4,
        },
      ]}
    />
  );
}

MessageForm.propTypes = {
  to: PropTypes.string.isRequired,
  afterDefaultSubmit: PropTypes.func,
};
