import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { Typography } from "@mui/material";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import axios from "axios";
import React, { Fragment, useEffect, useRef } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart, getCart } from "../../actions/cartAction";
import { clearErrors, createOrder } from "../../actions/orderAction";
import MetaData from "../layout/MetaData";
import CheckOutSteps from "./CheckOutSteps";
import "./Payment.css";

const Payment = () => {
  const navigate = useNavigate();
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const dispatch = useDispatch();
  const alert = useAlert();
  const stripe = useStripe();
  const element = useElements();

  // Lấy dữ liệu từ Redux state
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const payBtn = useRef(null);

  // Tính toán thông tin thanh toán
  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100), // Chuyển sang đơn vị cents
  };

  // Tạo danh sách order items từ cartItems.products
  const orderItems = cartItems.products.map((item) => ({
    name: item.productId.name,
    price: item.productId.price,
    quantity: item.quantity,
    image: item.productId.images[0]?.url,
    product: item.productId._id,
  }));

  // Cấu trúc order
  const order = {
    shippingInfo,
    orderItems,
    itemsPrice: orderInfo.subTotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };
  useEffect(() => {
dispatch(getCart())
}, [dispatch]);
useEffect(() => {
  // Kiểm tra xem có orderInfo không
  if (!orderInfo) {
    navigate("/cart");
    return;
  }

  // Kiểm tra xem giỏ hàng có trống không
  if (cartItems.products.length === 0) {
    navigate("/cart");
    return;
  }

  // Kiểm tra lỗi
  if (error) {
    alert.error(error);
    dispatch(clearErrors());
  }
}, [orderInfo, cartItems.products, navigate, error, dispatch, alert]);

const submitHandler = async (e) => {
  e.preventDefault();
  payBtn.current.disabled = true;

  try {
    // Kiểm tra stock trước khi gọi Stripe
    const hasInsufficientStock = cartItems.products.some(item => {
      if (item.quantity > item.productId.Stock) {
        alert.error(`${item.productId.name} has insufficient stock. Available: ${item.productId.Stock}, Required: ${item.quantity}`);
        return true;
      }
      return false;
    });

    if (hasInsufficientStock) {
      payBtn.current.disabled = false;
      return;
    }

    // Nếu stock đủ, tiếp tục với Stripe
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/v1/payment/process",
      paymentData,
      config
    );

    const client_secret = data.client_secret;
    if (!stripe || !element) return;

    const result = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: element.getElement(CardNumberElement),
        billing_details: {
          name: user.name,
          email: user.email,
          address: {
            line1: shippingInfo.address,
            city: shippingInfo.city,
            state: shippingInfo.state,
            postal_code: shippingInfo.pinCode,
            country: shippingInfo.country,
          },
        },
      },
    });

    if (result.error) {
      payBtn.current.disabled = false;
      alert.error(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        order.paymentInfo = {
          id: result.paymentIntent.id,
          status: result.paymentIntent.status,
        };

        try {
          dispatch(createOrder(order));
          navigate("/success");
          dispatch(clearCart());
        } catch (error) {
          payBtn.current.disabled = false;
          alert.error(error.response?.data?.message || "Error creating order");
        }
      } else {
        payBtn.current.disabled = false;
        alert.error("There was an issue with the payment");
      }
    }
  } catch (error) {
    payBtn.current.disabled = false;
    alert.error(error.response?.data?.message || "Payment failed");
  }
};


  return (
    <Fragment>
      <MetaData title="Payment" />
      <CheckOutSteps activeStep={2} />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={submitHandler}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCardIcon />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <EventIcon />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput" />
          </div>
          <input
            type="submit"
            value={`Pay - $ ${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>
    </Fragment>
  );
};

export default Payment;
