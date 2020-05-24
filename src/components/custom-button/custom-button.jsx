import React from "react";

import "./custom-button-styles.scss";

const CustomButton = ({ children, customThemeClasses, ...otherProps }) => (
  <button className={`custom-button ${customThemeClasses}`} {...otherProps}>
    {children}
  </button>
);

export default CustomButton;
