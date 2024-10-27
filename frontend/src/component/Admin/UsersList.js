import React, { Fragment, useEffect } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers, clearErrors, deleteUser } from "../../actions/userAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import  MetaData  from "../layout/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Sidebar from "./Sidebar.js";
import { useNavigate } from 'react-router-dom';
import { DELETE_USER_RESET } from '../../constants/userConstants';


const UsersList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { users, error } = useSelector((state) => state.allUsers);
  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);
  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  }
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
        alert.error(deleteError);
        dispatch(clearErrors());
      }
    if (isDeleted) {
      alert.success(message);
      // navigate("/admin/dashboard");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, alert, error, navigate, deleteError, isDeleted, message]);
  const columns = [
    { field: "id", headerName: "User ID", minWidth: 250, flex: 0.5 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 350,
      flex: 1,
    },

    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 150,
      flex: 0.3,
    },



    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return ( <Fragment>
            <Link to={`/admin/user/${params.row.id}`}>
              <EditIcon />
            </Link>

            <Button onClick={()=>deleteUserHandler(params.row.id)}
            >
            <DeleteIcon />

            </Button>
        </Fragment>
        )

      }
    },
  ];
  const rows = [];

  users && users.forEach((item) => {
  rows.push({
        id: item._id,
        name: item.name,
        email: item.email,
        role: item.role,
      });
    });
  return (
    <Fragment>
      <MetaData title={`ALL User - Admin`} />

      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};



export default UsersList
