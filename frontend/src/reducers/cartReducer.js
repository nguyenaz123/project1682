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
    CLEAR_CART_FAIL,
    CLEAR_CART_SUCCESS,
    ADD_TO_CART_RESET,
    SAVE_SHIPPING_INFO,

    CLEAR_ERRORS,
} from "../constants/cartConstants";

// Trạng thái ban đầu của giỏ hàng
const initialState = {
    cartItems: { products: [] },
    shippingInfo: {}, // Thông tin giao hàng
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART_REQUEST:
        case GET_CART_REQUEST:
        case UPDATE_CART_ITEM_REQUEST:
        case REMOVE_CART_ITEM_REQUEST:
        case CLEAR_CART_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case ADD_TO_CART_SUCCESS:
        case GET_CART_SUCCESS:
        case UPDATE_CART_ITEM_SUCCESS:
        case REMOVE_CART_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                cartItems: action.payload,
                success: true,

            };

        case CLEAR_CART_SUCCESS:
        return {
            ...state,
            loading: false,
            message: action.payload,
            cartItems: { products: [] },
        };

        case ADD_TO_CART_FAIL:
        case GET_CART_FAIL:
        case UPDATE_CART_ITEM_FAIL:
        case REMOVE_CART_ITEM_FAIL:
        case CLEAR_CART_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false,

            };
        case ADD_TO_CART_RESET:
        return {
            ...state,
            success: false,
        }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        case SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo: action.payload,
            }
            default:
                return state;
        }
};
