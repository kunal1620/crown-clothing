import React from "react";

import "./checkout-item-styles.scss";

const CheckoutItem = ({ cartItem: { imageUrl, name, quantity, price } }) => (
  <div className="checkout-item">
    <div className="image-container">
      <img alt="item" src={imageUrl} />
    </div>
    <span className="name">{name}</span>
    <span className="quantity">{quantity}</span>
    <span className="price">{price}</span>
    <div className="remove-button" onClick={removeItem}>
      &#10005;
    </div>
  </div>
);

const removeItem = () => {
  console.log(name, "removed");
};

export default CheckoutItem;
