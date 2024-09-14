import React from 'react'
import "./CartItem.css";
import { Link } from 'react-router-dom';


const CartItem = ({item, removeItems}) => {
  return (
    <div className="CartItem">
      <img src={item.image} alt="sss" />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price: ${item.price}`}</span>
        <p onClick={()=>removeItems(item.product)}>Remove</p>
      </div>

    </div>
  )
}

export default CartItem
