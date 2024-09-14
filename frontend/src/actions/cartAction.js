import { ADD_TO_CART, DELETE_CART_ITEM } from "../constants/cartConstants";
import axios from "axios";



//Add ro cart

export const addToCart = (id, quantity) => async (dispatch, getState) => {

    const {data} = await axios.get(`/api/v1/product/${id}` )
    dispatch({
      type: ADD_TO_CART,
      payload: {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
        stock: data.product.Stock,
        quantity,
      }
    });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}


//Delete cart item

export const deleteCartItem = (id) => async (dispatch, getState) => {
  dispatch({
    type: DELETE_CART_ITEM,
    payload: id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));

};