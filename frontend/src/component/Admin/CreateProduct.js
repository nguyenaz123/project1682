import React, { Fragment, useEffect, useState } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import "./CreateProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { createProduct, clearErrors } from "../../actions/productAction";
import { getAllCategories } from "../../actions/categoryAction";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar.js";
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { CREATE_PRODUCT_RESET } from '../../constants/productConstants';

const CreateProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.newProduct);
  const { categories } = useSelector((state) => state.categories);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  useEffect(() => {
    dispatch(getAllCategories());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Product created successfully");
      navigate("/admin/products");
      dispatch({ type: CREATE_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, success, navigate]);

  const createProductHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("categoryId", categoryId);
    myForm.set("Stock", Stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });

    dispatch(createProduct(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <Sidebar />
        <div className="createProductContainer">
          <form
            className='createProductForm'
            encType='multipart/form-data'
            onSubmit={createProductHandler}>
            <h1>Create New Product</h1>
            <div>
              <SpellcheckIcon />
              <input type="text" placeholder='Product Name' required value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <AttachMoneyIcon />
              <input type="number" placeholder='Price' required onChange={(e) => setPrice(e.target.value)} />
            </div>
            <div>
              <DescriptionIcon />
              <textarea placeholder='Product Description' value={description}
                onChange={(e) => setDescription(e.target.value)} cols="30" rows="1">
              </textarea>
            </div>

            <div>
              <AccountTreeIcon />
              <select
                onChange={(e) => setCategoryId(e.target.value)}
                value={categoryId}>
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate._id} value={cate._id}>
                    {cate.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <StorageIcon />
              <input
                type='number'
                placeholder='Stock'
                required
                onChange={(e) => setStock(e.target.value)} />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
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

export default CreateProduct;
