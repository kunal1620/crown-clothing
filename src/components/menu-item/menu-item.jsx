import React from "react";

import "./menu-item.scss";

const MenuItem = ({ title, subtitle, imageUrl, linkUrl, size }) => (
  <div className={`menu-item ${size}`}>
    <div
      style={{ backgroundImage: `url(${imageUrl})` }}
      className="background-image"
    />
    <div className="content">
      <h1 className="title">{title}</h1>
      <span className="subtitle">{subtitle}</span>
    </div>
  </div>
);

export default MenuItem;
