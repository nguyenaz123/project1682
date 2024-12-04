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
  const alert = useAlert();
  const { cartItems, success: successAddToCart, loading } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.user);

  // Hàm để đảm bảo quantity không vượt quá stock
  const getValidQuantity = (quantity, stock) => {
    return Math.min(quantity, stock);
  };

  useEffect(() => {
    if (successAddToCart) {
      dispatch({ type: ADD_TO_CART_RESET });
    }
  }, [successAddToCart, dispatch]);
  const increaseQuantity = (id, currentQuantity, stock) => {
    const newQuantity = currentQuantity + 1;
    if (newQuantity > stock) {
      return;
    }
    dispatch(addToCart(id, 1));

  };

  const decreaseQuantity = (id, currentQuantity) => {
    if (currentQuantity <= 1) {
      return;
    }
    dispatch(addToCart(id, -1));

  };

  const removeItems = (id) => {
    dispatch(removeCartItem(id));
  };

  const checkoutHandler = () => {
    if (isAuthenticated) {
      navigate("/shipping");
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    dispatch(getCart());

  cartItems.products.forEach(item => {
    const validQuantity = getValidQuantity(item.quantity, item.productId.Stock);
    if (validQuantity !== item.quantity) {
      if (validQuantity === 0) {
        dispatch(removeCartItem(item.productId._id));
        alert.info(`Product ${item.productId.name} is out of stock and has been removed from your cart.`);
      } else {
        alert.info(`Updated quantity of Product ${item.productId.name} to match remaining products in stock`);
        dispatch(addToCart(item.productId._id, validQuantity - item.quantity));

      }
    }
  });
}, [ dispatch, alert]);

  const calculateSubtotal = (quantity, stock, price) => {
    const validQuantity = getValidQuantity(quantity, stock);
    return validQuantity * price;
  };

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
            {cartItems.products.map((item) => {
              const validQuantity = getValidQuantity(item.quantity, item.productId.Stock);

              return (
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
                        decreaseQuantity(item.productId._id, validQuantity)
                      }
                      disabled={validQuantity <= 1}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={validQuantity}
                      readOnly
                    />
                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.productId._id,
                          validQuantity,
                          item.productId.Stock
                        )
                      }
                      disabled={validQuantity >= item.productId.Stock}
                    >
                      +
                    </button>
                  </div>
                  <p className="cartSubtotal">
                    $ {calculateSubtotal(
                      item.quantity,
                      item.productId.Stock,
                      item.productId.price
                    )}
                  </p>

                </div>
              );
            })}
            <div className="cartGrossTotal">
              <div></div>
              <div className="cartGrossTotalBox">
                <p>Gross Total</p>
                <p>{`$ ${cartItems.products.reduce(
                  (acc, item) => acc + calculateSubtotal(
                    item.quantity,
                    item.productId.Stock,
                    item.productId.price
                  ),
                  0
                )}`}</p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button
                  onClick={checkoutHandler}
                  disabled={cartItems.products.some(
                    item => item.productId.Stock === 0 || getValidQuantity(item.quantity, item.productId.Stock) === 0
                  )}
                >
                  Check Out
                </button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;