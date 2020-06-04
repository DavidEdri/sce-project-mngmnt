import React, { useState } from "react";
import { validation } from "@project/common";
import PropTypes from "prop-types";
import { Button, Box } from "@material-ui/core";
import MyFormik from "../../common/MyFormik";

export default function Report({ facilityID }) {
  const [show, setShow] = useState(false);

  const afterDefaultSubmit = () => {
    setShow(false);
  };

  return (
    <Box display="flex" justifyContent="center" style={{ width: "100%" }}>
      {!show ? (
        <Button color="secondary" onClick={() => setShow(true)}>
          report issue
        </Button>
      ) : (
        <MyFormik
          afterDefualtSubmit={afterDefaultSubmit}
          onSubmit="/guests/facility/report"
          fields={[
            {
              fieldName: "to",
              type: "invisible",
              initialValue: facilityID,
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
          validationSchema={validation.forms.report}
        />
      )}
    </Box>
  );
}

Report.propTypes = {
  facilityID: PropTypes.string.isRequired,
};
