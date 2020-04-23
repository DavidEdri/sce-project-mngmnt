import React, { useEffect, useState } from "react";
import Axios from "axios";
import PropTypes from "prop-types";
import { validation } from "@project/common";
import TableAbstract from "./abstract";
import MyFormik from "../../common/MyFormik";
import Loading from "../../common/Loading";

const urls = {
  mount: "/admins/facilityManagers/",
  delete: (id) => `/admins/facilityManagers/${id}`,
};

export default function FacilityManagers() {
  const columns = () => [
    { title: "Manager Name", field: "name", filtering: false },
    { title: "Facility Name", field: "manages.name", filtering: false },
  ];

  return (
    <TableAbstract
      title="Facility Manager"
      columns={columns}
      urls={urls}
      AddForm={AddManager}
    />
  );
}

function AddManager({ tableActions }) {
  const [canManage, setCanManage] = useState({ users: [], facilities: [] });
  const [loading, setLoading] = useState(true);

  const afterDefualtSubmit = (res) => {
    tableActions.setTableData((old) => [...old, res.data]);
    tableActions.closeDialog();
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await Axios("/admins/facilityManagers/canManage");

        setCanManage(res.data);
        setLoading(false);
      } catch (error) {}
    };

    fetch();
  }, []);

  if (loading) return <Loading />;

  return (
    <MyFormik
      fields={[
        {
          fieldName: "user",
          label: "Select User",
          type: "select",
          options: canManage.users.map((u) => ({
            label: u.name,
            value: u._id,
          })),
          isMulti: false,
          initialValue: "",
        },
        {
          fieldName: "facility",
          label: "Select Facility",
          type: "select",
          options: canManage.facilities.map((f) => ({
            label: f.name,
            value: f._id,
          })),
          isMulti: false,
          initialValue: "",
        },
      ]}
      onSubmit="/admins/facilityManagers/"
      title="Add Manager"
      validationSchema={validation.forms.adminAssignFacility}
      afterDefualtSubmit={afterDefualtSubmit}
    />
  );
}

AddManager.propTypes = {
  tableActions: PropTypes.object.isRequired,
};
