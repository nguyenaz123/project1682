import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import {thunk} from "redux-thunk";
import { createProductReducer, newReviewReducer, productDetalsReducer, productReducer, productsReducer, reviewReducer, reviewsReducer } from "./reducers/productReducer";
import { allUsersReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, userReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import {allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer} from "./reducers/orderReducer";

// Combine reducers
const reducer = combineReducers({
    products: productsReducer,
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
    product: productReducer,
    allOrders: allOrdersReducer,
    order: orderReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    reviews: reviewsReducer,
    review: reviewReducer,


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
