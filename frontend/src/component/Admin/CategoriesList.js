import React, { Fragment, useEffect } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategories, clearErrors, deleteCategory } from "../../actions/categoryAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Sidebar from "./Sidebar.js";
import { useNavigate } from 'react-router-dom';
import { DELETE_CATEGORY_RESET } from '../../constants/categoryConstants';

const CategoriesList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { categories, error } = useSelector((state) => state.categories);
  const { error: deleteError, isDeleted } = useSelector((state) => state.category);

  const deleteCategoryHandler = (id) => {
    dispatch(deleteCategory(id));
  };

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
      alert.success("Category deleted successfully");
      dispatch({ type: DELETE_CATEGORY_RESET });
    }

    dispatch(getAllCategories());
  }, [dispatch, alert, error, navigate, deleteError, isDeleted]);

  const columns = [
    { field: "id", headerName: "Category ID", minWidth: 250, flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "description",
      headerName: "Description",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/category/${params.row.id}`}>
              <EditIcon />
            </Link>
            <Button onClick={() => deleteCategoryHandler(params.row.id)}>
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  categories && categories.forEach((item) => {
    rows.push({
      id: item._id,
      name: item.name,
      description: item.description
    });
  });

  return (
    <Fragment>
      <MetaData title={`ALL CATEGORIES - Admin`} />
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL CATEGORIES</h1>
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

export default CategoriesList;
