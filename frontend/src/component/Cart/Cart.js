import { Typography } from "@mui/material";
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart, getCart, removeCartItem } from "../../actions/cartAction";
import "./Cart.css";
import { useAlert } from "react-alert";
import CartItem from "./CartItem";
import { ADD_TO_CART_RESET } from "../../constants/cartConstants";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems, success: successAddToCart, loading } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.user);

  const increaseQuantity = (id, currentQuantity, stock) => {
    if (currentQuantity >= stock) {
      return;
    }
    const quantityToAdd = 1;
    dispatch(addToCart(id, quantityToAdd));

  };

  const decreaseQuantity = (id, currentQuantity) => {
    if (currentQuantity <= 1) {
      return;
    }
    const quantityToAdd = -1;
    dispatch(addToCart(id, quantityToAdd));
  };
  const removeItems = (id) => {
    dispatch(removeCartItem(id));
  };

  const checkoutHandler = () => {
    if (isAuthenticated) {
      navigate("/shipping");
    } else {
      navigate("/login?redirect=shipping");
    }
  };
  useEffect(() => {
    if (loading==false) {
      dispatch({ type: ADD_TO_CART_RESET });
    }
  },[loading])
  return (
    <Fragment>
      {cartItems.products.length === 0 ? (
        <div className="emptyCart">
          <Typography>Cart is Empty</Typography>
          <Link to="/products">Shop now</Link>
        </div>
      ) : (
        <Fragment>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>SubTotal</p>
            </div>
            {cartItems.products.map((item) => (
              <div className="cartContainer" key={item._id}>
                <CartItem
                  item={{
                    name: item.productId.name,
                    image: item.productId.images[0]?.url,
                    price: item.productId.price,
                    productId: item.productId._id,
                  }}
                  removeItems={removeItems}
                />
                <div className="cartInput">
                  <button
                    onClick={() =>
                      decreaseQuantity(item.productId._id, item.quantity)
                    }
                  >
                    -
                  </button>
                  <input type="number" value={item.quantity} readOnly />
                  <button
                    onClick={() =>
                      increaseQuantity(
                        item.productId._id,
                        item.quantity,
                        item.productId.Stock
                      )
                    }
                  >
                    +
                  </button>
                </div>
                <p className="cartSubtotal">
                  ₹{item.quantity * item.productId.price}
                </p>
              </div>
            ))}
            <div className="cartGrossTotal">
              <div></div>
              <div className="cartGrossTotalBox">
                <p>Gross Total</p>
                <p>{`₹${cartItems.products.reduce(
                  (acc, item) => acc + item.quantity * item.productId.price,
                  0
                )}`}</p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button onClick={checkoutHandler}>Check Out</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
