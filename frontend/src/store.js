import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import {thunk} from "redux-thunk";
import { createProductReducer, newReviewReducer, productDetalsReducer, productReducer } from "./reducers/productReducer";
import { forgotPasswordReducer, profileReducer, userReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import {myOrdersReducer, newOrderReducer, orderDetailsReducer} from "./reducers/orderReducer";

// Combine reducers
const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetalsReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
    newProduct: createProductReducer,

});
// Initial state
let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        shippingInfo: localStorage.getItem('shippingInfo')
            ? JSON.parse(localStorage.getItem('shippingInfo'))
            : {}

    },
};
// Middleware
const middleware = [thunk];
// Configure store with reducer, middleware, and devtools
const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
    preloadedState: initialState,
    devTools: process.env.NODE_ENV !== 'production'
});

export default store;
