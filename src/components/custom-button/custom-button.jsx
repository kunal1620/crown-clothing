import React from "react";

import "./custom-button-styles.scss";

const CustomButton = ({ children, customThemeClass, ...otherProps }) => (
  <button className={`custom-button ${customThemeClass}`} {...otherProps}>
    {children}
  </button>
);

export default CustomButton;
