import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { constants, validation } from "@project/common";
import { Button } from "@material-ui/core";
import TableAbstract from "./abstract";
import MyFormik from "../../common/MyFormik";
import text from "../../../utils/_text";
import { isProduction } from "../../../utils/functions";
import { openDialog } from "../../../redux/actions/utilsActions";

const ranksToLookup = (ranks) => {
  const res = {};
  ranks.forEach((r) => {
    res[r.value] = r.label;
  });

  return res;
};

const urls = {
  mount: "/admins/usersMangement/",
  delete: (id) => `/admins/usersMangement/${id}`,
  update: (id) => `/admins/usersMangement/${id}`,
  changePass: (id) => `/admins/usersMangement/changePass/${id}`,
  // add: "/admins/usersMangement/adduser", add if want to use default add
};

export default function Users() {
  const dispatch = useDispatch();

  const onChangePassClick = (rowData, tableActions) => {
    dispatch(
      openDialog(
        text.adminUsers,
        <ChangePassword rowData={rowData} tableActions={tableActions} />
      )
    );
  };

  const columns = (tableActions) => [
    { title: text.usersNameTitle, field: "name", filtering: false },
    {
      title: text.usersEmailTitle,
      field: "email",
      filtering: false,
      editable: "never",
    },
    {
      title: text.usersRankTitle,
      field: "rank",
      lookup: ranksToLookup(constants.ranks),
    },
    {
      title: text.usersChangePassTitle,
      filtering: false,
      render: (rowData) => (
        <Button onClick={() => onChangePassClick(rowData, tableActions)}>
          {text.clickToEditPass}
        </Button>
      ),
    },
    {
      title: text.usersActiveTitle,
      field: "active",
      type: "boolean",
      filtering: true,
    },
  ];

  return (
    <TableAbstract
      title={text.adminUsers}
      columns={columns}
      urls={urls}
      AddForm={AddUser}
    />
  );
}

function AddUser({ tableActions }) {
  const afterDefualtSubmit = (res) => {
    tableActions.setTableData((old) => [...old, res.data]);
    tableActions.closeDialog();
  };

  return (
    <MyFormik
      fields={[
        {
          fieldName: "name",
          label: text.fullNameLabel,
          type: "text",
          options: "text",
          initialValue: "",
        },
        {
          fieldName: "email",
          label: text.emailLabel,
          type: "text",
          options: "email",
          initialValue: "",
        },
        {
          fieldName: "password",
          label: text.passLabel,
          type: "text",
          options: "password",
          initialValue: "",
        },
        {
          fieldName: "password2",
          label: text.passConfirmLabel,
          type: "text",
          options: "password",
          initialValue: "",
        },
        {
          fieldName: "rank",
          label: text.rankLabel,
          type: "select",
          options: constants.ranks,
          isMulti: false,
          initialValue: constants.ranks[0].value,
        },
        {
          fieldName: "active",
          label: text.isActiveLabel,
          type: "switch",
          initialValue: false,
        },
      ]}
      onSubmit="/admins/usersMangement/"
      title={text.adminUsers}
      validationSchema={validation.forms.adminAddUser}
      afterDefualtSubmit={afterDefualtSubmit}
      useCaptcha={isProduction()}
    />
  );
}

AddUser.propTypes = {
  tableActions: PropTypes.object.isRequired,
};

function ChangePassword({ rowData, tableActions }) {
  const afterDefualtSubmit = () => {
    tableActions.closeDialog();
  };

  return (
    <MyFormik
      fields={[
        {
          fieldName: "password",
          label: text.passLabel,
          type: "text",
          options: "password",
          initialValue: "",
        },
        {
          fieldName: "password2",
          label: text.passConfirmLabel,
          type: "text",
          options: "password",
          initialValue: "",
        },
      ]}
      onSubmit={urls.changePass(rowData._id)}
      paragraph={text.usersChangePassFor(rowData.email)}
      validation={validation.inputs.password}
      useCaptcha={isProduction()}
      afterDefualtSubmit={afterDefualtSubmit}
    />
  );
}

ChangePassword.propTypes = {
  rowData: PropTypes.object.isRequired,
  tableActions: PropTypes.object.isRequired,
};
