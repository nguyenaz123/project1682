import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import {thunk} from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Lưu trữ trong localStorage
import { createProductReducer, newReviewReducer, productDetalsReducer, productReducer, productsReducer, reviewReducer, reviewsReducer } from "./reducers/productReducer";
import { categoriesReducer, categoryReducer, createCategoryReducer, categoryDetailsReducer } from "./reducers/categoryReducer";
import { allUsersReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, userReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer } from "./reducers/orderReducer";

// Combine reducers
const rootReducer = combineReducers({
    products: productsReducer,
    productDetails: productDetalsReducer,
    categories: categoriesReducer,
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
    category: categoryReducer,
    newCategory: createCategoryReducer,
    categoryDetails: categoryDetailsReducer,
    allOrders: allOrdersReducer,
    order: orderReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    reviews: reviewsReducer,
    review: reviewReducer,
});

// Cấu hình redux-persist
const persistConfig = {
    key: "root",
    storage,
    whitelist: [ "user"], // Chỉ lưu trữ `cart` và `user`
};

// Tạo persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Initial state
let initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems")
            ? JSON.parse(localStorage.getItem("cartItems"))
            : [],
        shippingInfo: localStorage.getItem("shippingInfo")
            ? JSON.parse(localStorage.getItem("shippingInfo"))
            : {}
    },
};

// Middleware
const middleware = [thunk];

// Tạo store với persisted reducer
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Tắt kiểm tra tuần tự hóa do redux-persist có thể gây ra lỗi
        }).concat(middleware),
    preloadedState: initialState,
    devTools: process.env.NODE_ENV !== "production",
});

// Tạo persistor
const persistor = persistStore(store);

export  { store, persistor };
