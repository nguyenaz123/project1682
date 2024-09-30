import React, { Fragment } from 'react';
import CheckOutSteps from './CheckOutSteps';
import { useSelector } from 'react-redux';
import MetaData from '../layout/MetaData';
import "./ConfirmOrder.css";
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const ConfirmOrder = () => {
  const navigate = useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const subTotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

  const shippingCharges = subTotal > 1000 ? 0 : 200;
  const tax = subTotal * 0.18;
  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;


  const totalPrice = subTotal + shippingCharges + tax;
  const proceedToPayment = () => {
    const data = {
      subTotal,
      shippingCharges,
      tax,
      totalPrice,
    }
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/process/payment");
}


  return <Fragment>
    <MetaData title="Confirm Order"/>
    <CheckOutSteps activeStep={1} />
    <div className='confirmOrderPage'>
      <div>
        <div className='confirmShippingArea'>
          <Typography>Shipping Information</Typography>
          <div className="confirmShippingAreaBox">
              <div>
              <p>Name</p>
              <span>{user.name}</span>
            </div>
              <div>
              <p>Phone Number</p>
              <span>{shippingInfo.phoneNo}</span>
            </div>
              <div>
              <p>Address</p>
              <span>{address}</span>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>{" "}
                    <span>
                      {item.quantity} X ${item.price} ={" "}
                      <b>${item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className='orderSummary'>
          <Typography>Order Summary</Typography>
          <div>
            <div>
              <p>Subtotal: </p>
              <span>${subTotal}</span>
            </div>
            <div>
              <p>Shipping Charges: </p>
              <span>${shippingCharges}</span>
            </div>
            <div>
              <p>GST: </p>
              <span>${tax}</span>
            </div>
          </div>
          <div className='orderSummaryTotal'>
            <p>
              <b>Total: </b>
            </p>
            <span>${totalPrice}</span>
          </div>
          <button onClick={proceedToPayment}>Proceed to Payment</button>
          </div>
</div>
    </div>

  </Fragment>
}

export default ConfirmOrder
