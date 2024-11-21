import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { updateCategory, clearErrors, getCategoryDetails } from "../../actions/categoryAction";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar.js";
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import { UPDATE_CATEGORY_RESET } from '../../constants/categoryConstants';

const UpdateCategory = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { id } = useParams();

  const { loading, error: updateError, isUpdated } = useSelector((state) => state.category);
  const { error, category } = useSelector((state) => state.categoryDetails);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");



    useEffect(() => {
    dispatch(getCategoryDetails(id));
    }, [dispatch, id]);

    useEffect(() => {
    if (category) {
      setName(category.name);
      setDescription(category.description);
    }

    if (error) {  
      alert.error(error);
      dispatch(clearErrors());
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Category Updated Successfully");
      navigate("/admin/categories");
      dispatch({ type: UPDATE_CATEGORY_RESET });
    }
  }, [dispatch, alert, error, isUpdated, navigate, category, id, updateError]);

  const updateCategoryHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("description", description);
    dispatch(updateCategory(id, myForm));
  };

  return (
    <Fragment>
      <MetaData title="Update Category" />
      <div className="dashboard">
        <Sidebar />
        <div className="createProductContainer">
          <form
            className='createProductForm'
            onSubmit={updateCategoryHandler}
          >
            <h1>Update Category</h1>
            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder='Category Name'
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder='Description'
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Update
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateCategory;
