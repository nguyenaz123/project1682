import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import {thunk} from "redux-thunk";
import { productDetalsReducer, productReducer } from "./reducers/productReducer";
import { forgotPasswordReducer, profileReducer, userReducer } from "./reducers/userReducer";
import {cartReducer} from "./reducers/cartReducer";

// Combine reducers
const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetalsReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
});
// Initial state
let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
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
