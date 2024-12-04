import {
    ADD_TO_CART_REQUEST,
    ADD_TO_CART_SUCCESS,
    ADD_TO_CART_FAIL,
    GET_CART_REQUEST,
    GET_CART_SUCCESS,
    GET_CART_FAIL,
    UPDATE_CART_ITEM_REQUEST,
    UPDATE_CART_ITEM_SUCCESS,
    UPDATE_CART_ITEM_FAIL,
    REMOVE_CART_ITEM_REQUEST,
    REMOVE_CART_ITEM_SUCCESS,
    REMOVE_CART_ITEM_FAIL,
    CLEAR_CART_REQUEST,
    CLEAR_CART_SUCCESS,
  CLEAR_CART_FAIL,
    SAVE_SHIPPING_INFO,
    CLEAR_ERRORS,
} from "../constants/cartConstants";
import axios from "axios";

// Thêm sản phẩm vào giỏ hàng
export const addToCart = (productId, quantity) => async (dispatch) => {
    try {
        dispatch({ type: ADD_TO_CART_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post(
            `/api/v1/cart`,
            { productId, quantity },
            config
        );
        dispatch({ type: ADD_TO_CART_SUCCESS, payload: data.cart });
    } catch (error) {
        dispatch({
            type: ADD_TO_CART_FAIL,
            payload: error.response.data.message || error.message,
        });
    }
};

// Lấy giỏ hàng của người dùng
export const getCart = (userId) => async (dispatch) => {
    try {
        dispatch({ type: GET_CART_REQUEST });

        const { data } = await axios.get(`/api/v1/cart/${userId}`);

        dispatch({ type: GET_CART_SUCCESS, payload: data.cart });
    } catch (error) {
        dispatch({
            type: GET_CART_FAIL,
            payload: error.response.data.message || error.message,
        });
    }
};

// Cập nhật số lượng sản phẩm trong giỏ hàng
export const updateCartItem = (productId, quantity) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_CART_ITEM_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.put(
            `/api/v1/cart/item`,
            { productId, quantity },
            config
        );

        dispatch({ type: UPDATE_CART_ITEM_SUCCESS, payload: data.cart });
    } catch (error) {
        dispatch({
            type: UPDATE_CART_ITEM_FAIL,
            payload: error.response.data.message || error.message,
        });
    }
};

// Xóa sản phẩm khỏi giỏ hàng
export const removeCartItem = (productId) => async (dispatch) => {
    try {
        dispatch({ type: REMOVE_CART_ITEM_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.delete(`/api/v1/cart/item`, {
            data: { productId },
            headers: config.headers,
        });

        dispatch({ type: REMOVE_CART_ITEM_SUCCESS, payload: data.cart });
    } catch (error) {
        dispatch({
            type: REMOVE_CART_ITEM_FAIL,
            payload: error.response.data.message || error.message,
        });
    }
};

// Xóa toàn bộ giỏ hàng
export const clearCart = (userId) => async (dispatch) => {
    try {
        dispatch({ type: CLEAR_CART_REQUEST });

        const { data } = await axios.delete(`/api/v1/cart/clear/${userId}`);

        dispatch({ type: CLEAR_CART_SUCCESS, payload: data.message });
    } catch (error) {
        dispatch({
            type: CLEAR_CART_FAIL,
            payload: error.response.data.message || error.message,
        });
    }
};
//save shipping information
export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data));

}
// Xóa lỗi
export const clearCartErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
