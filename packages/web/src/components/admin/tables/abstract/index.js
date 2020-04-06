import React, { useEffect, useState } from "react";
import Axios from "axios";
import PropTypes from "prop-types";
import MaterialTable from "material-table";
import { useDispatch } from "react-redux";
import {
  openSnackbar,
  openDialog,
  closeDialog
} from "../../../../redux/actions/utilsActions";
import { isRTL } from "../../../../utils/constants";
import text from "../../../../utils/_text";
import hebrewBody from "./hebrew";

function TableAbstract({
  title,
  urls,
  columns,
  AddForm = null,
  addFormFullWidth = false
}) {
  const [tableData, setTableData] = useState();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const tableActions = {
    setTableData,
    closeDialog: () => {
      dispatch(closeDialog());
    }
  };

  useEffect(() => {
    const getData = async () => {
      if (urls.mount) {
        setLoading(true);
        const res = await Axios(urls.mount);
        setTableData(res.data);
        setLoading(false);
      }
    };
    getData();
  }, [urls.mount]);

  return (
    <MaterialTable
      title={title}
      data={tableData}
      localization={isRTL ? hebrewBody : undefined}
      isLoading={loading}
      options={{
        selection: false,
        maxBodyHeight: "100vh",
        filtering: true,
        exportButton: true,
        sorting: true,
        columnsButton: true,
        pageSize: 10,
        pageSizeOptions: [10, 100, 1000],
        padding: "dense"
      }}
      columns={columns(tableActions)}
      editable={{
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            Axios.put(urls.update(oldData._id), newData)
              .then(res => {
                const d = [...tableData];
                const index = tableData.indexOf(oldData);
                d[index] = newData;
                setTableData(d);

                resolve();
              })
              .catch(e => {
                dispatch(openSnackbar(text.serverError, "error"));
                reject();
              });
          }),
        onRowDelete: oldData =>
          new Promise((resolve, reject) => {
            Axios.delete(urls.delete(oldData._id))
              .then(res => {
                const d = [...tableData];
                const index = d.indexOf(oldData);
                d.splice(index, 1);
                setTableData(d);
                resolve();
              })
              .catch(e => {
                dispatch(openSnackbar(text.serverError, "error"));
                reject();
              });
          }),
        onRowAdd: urls.add
          ? newData =>
              new Promise((resolve, reject) => {
                Axios.post(urls.add, newData)
                  .then(res => {
                    setTableData(old => [...old, res.data]);
                    resolve();
                  })
                  .catch(err => {
                    const errObj = err.response.data;
                    const errors = (
                      <div>
                        {Object.keys(errObj).map((e, i) => (
                          <p key={i}>{`${e} : ${errObj[e]}\n`}</p>
                        ))}
                      </div>
                    );

                    dispatch(openSnackbar(errors, "error"));
                    reject();
                  });
              })
          : undefined
      }}
      actions={
        AddForm
          ? [
              {
                icon: "add",
                tooltip: text.tableAdd,
                isFreeAction: true,
                onClick: () =>
                  dispatch(
                    openDialog(
                      title,
                      <AddForm tableActions={tableActions} />,
                      "",
                      addFormFullWidth
                    )
                  )
              }
            ]
          : null
      }
    />
  );
}

TableAbstract.propTypes = {
  title: PropTypes.string.isRequired,
  columns: PropTypes.func.isRequired,
  AddForm: PropTypes.func,
  urls: PropTypes.object.isRequired,
  addFormFullWidth: PropTypes.bool
};

export default TableAbstract;
