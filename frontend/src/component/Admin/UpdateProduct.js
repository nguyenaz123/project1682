import React, { Fragment, useEffect, useState } from 'react';
import "./UpdateProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { updateProduct, clearErrors, getProductDetails } from "../../actions/productAction";
import { getAllCategories } from '../../actions/categoryAction';
import { Link, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import  MetaData  from "../layout/MetaData";
import Sidebar from "./Sidebar.js";
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

import { UPDATE_PRODUCT_RESET} from '../../constants/productConstants';


const UpdateProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error: updateError, isUpdated } = useSelector((state) => state.product);
  const {categories} = useSelector((state) => state.categories)
  const {error, product} = useSelector((state) => state.productDetails);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();



    useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);
    useEffect(() => {
    dispatch(getProductDetails(id));
    }, [dispatch, id]);

  useEffect(() => {

    if (product){
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setStock(product.Stock);
      setOldImages(product.images);
      if (product.category) {
      setCategoryId(product.category._id);
    }
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
      alert.success("Product Updated successfully")
      navigate("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }

  }, [dispatch, alert, error,isUpdated, navigate,categories,  product, id, updateError]);

  const updateProductHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("categoryId", categoryId);
    myForm.set("Stock", Stock);

    images.forEach((image) => {
      myForm.append("images", image);
    })
    dispatch(updateProduct(id, myForm))
  }
    const updateProductImagesChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
      setImagesPreview([]);
      setOldImages([]);

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
      <MetaData title="Update Product" />
      <div className="dashboard">
        <Sidebar />
        <div className="createProductContainer">
          <form
            className='createProductForm'
            encType='multipart/form-data'
            onSubmit={updateProductHandler}>
            <h1>Update Product</h1>
            <div>
              <SpellcheckIcon />
              <input type="text" placeholder='Product Name' required value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <AttachMoneyIcon />
              <input type="number" value={price} placeholder='Price' required onChange={(e) => setPrice(e.target.value)} />
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
                value={Stock}
                placeholder='Stock'
                required
                onChange={(e) => setStock(e.target.value)} />
            </div>

                <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateProductImagesChange}
                multiple
              />
            </div>
              <div id="createProductFormImage">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Product Preview" />
                ))}
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
              Update
            </Button>

          </form>
        </div>
      </div>
    </Fragment>
  )
}

export default UpdateProduct
