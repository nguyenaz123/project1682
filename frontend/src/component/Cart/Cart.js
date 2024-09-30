import React, {Fragment, useState} from 'react';
import "./Cart.css";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart,deleteCartItem } from '../../actions/cartAction';
import { Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';


const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state => state.cart));
    const { isAuthenticated } = useSelector((state) => state.user); 
  const increaseQuantity = (id, quantity, stock) => {
    const newQuantity = quantity + 1;
    if (stock <= quantity) { return };
    dispatch(addToCart(id, newQuantity))
  }

  const decreaseQuantity = (id, quantity) => {
    const newQuantity = quantity - 1;
    if (1 >= quantity) { return };
    dispatch(addToCart(id, newQuantity))
  }

  const removeItems = (id) => {
  dispatch(deleteCartItem(id))
  }
  const checkoutHandler = () => {
  if (isAuthenticated) {
      navigate("/shipping");
  }
  else {
      navigate("/login?redirect=shipping");
    }
  }


  return (
    <Fragment>
      {cartItems.length === 0 ?(
        <div className="emptyCart">
          <Typography>Cart Empty</Typography>
          <Link to="/products">Shop now</Link>
      </div>
      ) : <Fragment>
    <div className="cartPage">
      <div className="cartHeader">
        <p>Product</p>
        <p>Quantity</p>
        <p>SubTotal</p>
      </div>
      {cartItems && cartItems.map((item) => (
      <div className="cartContainer" key={item.product}>
          <CartItem item={item} removeItems={removeItems} />
        <div className="cartInput">
          <button onClick={()=>decreaseQuantity(item.product, item.quantity)}>-</button>
          <input type="number" value={item.quantity} readOnly/>
          <button onClick={()=>increaseQuantity(item.product, item.quantity, item.stock)}>+</button>
        </div>
        <p className="cartSubtotal">${item.quantity * item.price}</p>
      </div>
    ))}
      <div className="cartGrossTotal">
        <div>

        </div>
        <div className="cartGrossTotalBox">
          <p>Gross Total</p>
          <p>{`₹${cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}`}</p>
        </div>
        <div></div>
        <div className="checkOutBtn">
          <button onClick={checkoutHandler}>Check Out</button>
        </div>
      </div>
    </div>
  </Fragment>}
    </Fragment>
  )
}

export default Cart
