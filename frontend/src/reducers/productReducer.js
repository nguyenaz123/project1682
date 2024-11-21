import {
  ALL_PRODUCTS_REQUEST, ALL_PRODUCTS_SUCCESS, ALL_PRODUCTS_FAIL, CLEAR_ERRORS,
  PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL,
  NEW_REVIEW_REQUEST, NEW_REVIEW_SUCCESS, NEW_REVIEW_FAIL, NEW_REVIEW_RESET,
  ADMIN_PRODUCT_REQUEST, ADMIN_PRODUCT_SUCCESS, ADMIN_PRODUCT_FAIL,
  CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, CREATE_PRODUCT_FAIL, CREATE_PRODUCT_RESET,
  DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAIL, DELETE_PRODUCT_RESET,
  UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAIL, UPDATE_PRODUCT_RESET,
  ALL_REVIEWS_REQUEST, ALL_REVIEWS_SUCCESS, ALL_REVIEWS_FAIL,
  DELETE_REVIEW_REQUEST, DELETE_REVIEW_SUCCESS, DELETE_REVIEW_FAIL, DELETE_REVIEW_RESET,
} from "../constants/productConstants";


export const productsReducer = (state = { products: [] }, action) => {
    switch (action.type) {
      case ALL_PRODUCTS_REQUEST:
        case ADMIN_PRODUCT_REQUEST:
        return {
          loading: true,
          products: [],
        }
      case ALL_PRODUCTS_SUCCESS:
        return {
          loading: false,
          products: action.payload.products,
          productsCount: action.payload.productsCount,
          resultPerPage: action.payload.resultPerPage,
          filteredProductsCount: action.payload.filteredProductsCount,
        }
      case ADMIN_PRODUCT_SUCCESS:
        return {
          loading: false,
          products: action.payload
        }
      case ALL_PRODUCTS_FAIL:
        case ADMIN_PRODUCT_FAIL:
        return {
          loading: false,
          err: action.payload
        }
          case CLEAR_ERRORS:
        return {
          ...state,
          err:null
          }

      default:
        return state
    }
};
export const productDetalsReducer = (state = { product: [] }, action) => {
    switch (action.type) {
      case PRODUCT_DETAILS_REQUEST:
        return {
          loading: true,
          ...state,
        }
      case PRODUCT_DETAILS_SUCCESS:
        return {
          loading: false,
          product: action.payload

        }
      case PRODUCT_DETAILS_FAIL:
        return {
          loading: false,
          err: action.payload
        }
          case CLEAR_ERRORS:
        return {
          ...state,
          err:null
          }

      default:
        return state
    }
};
export const createProductReducer = (state = {product: {} }, action) => {
    switch (action.type) {
      case CREATE_PRODUCT_REQUEST:
        return {
          ...state,
          loading: true,
        }
      case CREATE_PRODUCT_SUCCESS:
        return {
          loading: false,
          success: action.payload.success,
          product: action.payload.product

        }
      case CREATE_PRODUCT_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload
        }
      case CREATE_PRODUCT_RESET:
        return {
          ...state,
          success: false,
        }
          case CLEAR_ERRORS:
        return {
          ...state,
          error:null
          }

      default:
        return state
    }
};


export const productReducer = (state = { }, action) => {
    switch (action.type) {
      case DELETE_PRODUCT_REQUEST:
        case UPDATE_PRODUCT_REQUEST:
        return {
          ...state,
          loading: true,
        }
      case DELETE_PRODUCT_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload
        }
      case UPDATE_PRODUCT_SUCCESS:
        return {
          ...state,
          loading: false,
          isUpdated: action.payload
        }
      case DELETE_PRODUCT_FAIL:
        case UPDATE_PRODUCT_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload
        }

    case DELETE_PRODUCT_RESET:
        return {
          ...state,
          isDeleted: false,
        }
        case UPDATE_PRODUCT_RESET:
        return {
          ...state,
          isUpdated: false,
        }
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
          }
      default:
        return state
    }
};

export const newReviewReducer = (state = { }, action) => {
    switch (action.type) {
      case NEW_REVIEW_REQUEST:
        return {
          ...state,
          loading: true,
        }
      case NEW_REVIEW_SUCCESS:
        return {
          loading: false,
          success: action.payload

        }
      case NEW_REVIEW_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload
        }
      case NEW_REVIEW_RESET:
        return {
          ...state,
          success: false,
        }
          case CLEAR_ERRORS:
        return {
          ...state,
          error:null
          }

      default:
        return state
    }
};
export const reviewsReducer = (state = { reviews: [] }, action) => {
    switch (action.type) {
      case ALL_REVIEWS_REQUEST:
        return {
          ...state,
          loading: true,
        }
      case ALL_REVIEWS_SUCCESS:
        return {
          loading: false,
          reviews: action.payload

        }
      case ALL_REVIEWS_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload
        }
        case CLEAR_ERRORS:
        return {
          ...state,
          error:null
          }

      default:
        return state
    }
};
export const reviewReducer = (state = {}, action) => {
    switch (action.type) {
      case DELETE_REVIEW_REQUEST:
        return {
          ...state,
          loading: true,
        }
      case DELETE_REVIEW_SUCCESS:
        return {
          loading: false,
          isDeleted: action.payload

        }
      case DELETE_REVIEW_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload
        }
      case DELETE_REVIEW_RESET:
        return {
          ...state,
          isDeleted: false,
        }
        case CLEAR_ERRORS:
        return {
          ...state,
          error:null
          }

      default:
        return state
    }
};