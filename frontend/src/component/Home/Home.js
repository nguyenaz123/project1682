import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction.js";
import Loader from '../layout/Loader/Loader';
import MetaData from '../layout/MetaData';
import "./Home.css";
import ProductCard from "./ProductCard.js";
import { useAlert } from "react-alert";





const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());

    }
    dispatch(getProduct())
  }, [dispatch, error])

  return  <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="TechShopping" />

          <div className="banner">
            <p>Welcome to my Store</p>
            <h1>Having happy shopping</h1>

            <a href="#container">
              <button>
                Scroll
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <ProductCard product={product} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
};


export default Home;
