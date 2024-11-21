import React, { Fragment, useEffect, useState } from 'react';
import "./CreateProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { createCategory, clearErrors } from "../../actions/categoryAction";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar.js";
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import { CREATE_CATEGORY_RESET } from '../../constants/categoryConstants';

const CreateCategory = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.newCategory);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Category created successfully");
      navigate("/admin/categories");
      dispatch({ type: CREATE_CATEGORY_RESET });
    }
  }, [dispatch, alert, error, success, navigate]);

  const createCategoryHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("description", description);

    dispatch(createCategory(myForm));
  };

  return (
    <Fragment>
      <MetaData title="Create Category" />
      <div className="dashboard">
        <Sidebar />
        <div className="createProductContainer">
          <form
            className='createProductForm'
            encType='multipart/form-data'
            onSubmit={createCategoryHandler}>
            <h1>Create New Category</h1>

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
              <textarea
                placeholder='Category Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1">
              </textarea>
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default CreateCategory;
