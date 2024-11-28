import React, { Fragment, useEffect, useState } from 'react';
import Carousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearErrors, getProductDetails, newReview } from '../../actions/productAction';
import "./ProductDetails.css";
import ReviewCard from "./ReviewCart.js";
import Loader from '../layout/Loader/Loader';
import { useAlert } from "react-alert";
import MetaData from '../layout/MetaData';
import { addToCart } from "../../actions/cartAction";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import { Rating } from '@mui/material'
import { NEW_REVIEW_RESET } from '../../constants/productConstants';
import { ADD_TO_CART_RESET } from '../../constants/cartConstants';

const ProductDetails = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();
  const { product, loading, error } = useSelector((state) => state.productDetails);
  const { success, error: reviewError } = useSelector((state) => state.newReview);
  const {error: errorAddToCart, success: successAddToCart } = useSelector((state) => state.cart);
  const [quantity, setQuantity] = useState(1)
  const [open, setOpen] = useState(false)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")





  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;
    const qty = quantity + 1;
    setQuantity(qty);
  }

  const decreaseQuantity = () => {
    if (quantity <= 1) return;

    const qty = quantity - 1;
    setQuantity(qty);
  }


  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  }


  const reviewSubmitHandler = () => {
    const myForm = new FormData();
    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);
    dispatch(newReview(myForm));
    setOpen(false)
  }
  const addToCartProcess = () => {
    dispatch(addToCart(id, quantity))
  }

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (errorAddToCart) {
      alert.error(errorAddToCart);
      dispatch(clearErrors());
    }
    if (successAddToCart) {
    alert.success("Add to cart successfully");
    dispatch({ type: ADD_TO_CART_RESET });
  }

    if (success) {
      alert.success("review submitted successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert,errorAddToCart,successAddToCart, reviewError, success]);
  if (!product || !product.images) return <p>No product details available</p>;
  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
}
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
          <Fragment>
      <MetaData title={`${product.name}---DETAILS`}/>
      <div className="ProductDetails">
          <div className="imageGrid">
        {product.images &&
          product.images.map((item, i) => (
            <img
              className="CarouselImage"
              key={i}
              src={item.url}
              alt={`${i} Slide`}
            />
      ))}
  </div>
        <div>
          <div className="detailsBlock-1">
            <h2>{product.name}</h2>
            <p>Product # {product._id}</p>
          </div>
          <div className="detailsBlock-2">
                  <Rating {...options} />
                  <span className='detailsBlock-2-span'>
                    {" "}
                    ({product.numOfReviews} Reviews)
                  </span>

          </div>
          <div className="detailsBlock-3">
            <h1>$ {product.price}</h1>
            <div className="detailsBlock-3-1">
              <div className="detailsBlock-3-1-1">
                <button onClick={decreaseQuantity}>-</button>
                <input readOnly type="number" value={quantity} />
                <button onClick={increaseQuantity}>+</button>
              </div>
              <button disabled={product.Stock < 1 ? true : false} onClick={addToCartProcess}>Add to cart</button>
            </div>
            <p>
              Status:
              <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                {product.Stock < 1 ? "OutOfStock" : "InStock"}
              </b>
            </p>
          </div>
          <div className="detailsBlock-4">
            Description: <p>{product.description}</p>
          </div>
          <button onClick={submitReviewToggle} className="submitReview">Submit Review</button>
        </div>
      </div>
            <h3 className="reviewsHeading">REVIEWS</h3>
            <Dialog aria-labelledby='simple-dialog-title' open={open} onClose={submitReviewToggle}>
              <DialogTitle >Submit Review</DialogTitle>
              <DialogContent className='submitDialog'>
                <Rating onChange={(e) => setRating(e.target.value)}
                  value={rating}
                size="large"/>
                <textarea
                  className='submitDialogTextArea'
                  cols="30"
                  rows="5"
                  value={comment}
                  onChange={(e)=> setComment(e.target.value)}
                >
              </textarea>
              </DialogContent>
              <DialogActions>
                <Button onClick={submitReviewToggle} color="secondary">Cancel </Button>
                <Button onClick={reviewSubmitHandler}>Submit </Button>
              </DialogActions>
            </Dialog>
      {product.reviews && product.reviews[0] ? (
        <div className="reviews">
          {product.reviews && product.reviews.map((review)=> <ReviewCard review={review} />)}
        </div>
      ) : (
          <p className= "noReviews">No Reviews Yet</p>
      )}
    </Fragment>
      )}
    </Fragment>
  );
}

export default ProductDetails