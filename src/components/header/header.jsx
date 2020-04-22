import React from "react";
import CartIcon from "../cart-icon/cart-icon";
import CartDropdown from "../cart-dropdown/cart-dropdown";

import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebase-utils";
import { connect } from "react-redux";
import { ReactComponent as Logo } from "../../assets/crown-logo.svg";

import "./header-styles.scss";

const Header = ({ currentUser, isCartHidden }) => (
  <div className="header">
    <Link to="/" className="logo-container">
      <Logo className="logo" />
    </Link>

    <div className="option-container">
      <Link className="option" to="/shop">
        SHOP
      </Link>
      <Link className="option" to="/shop">
        CONTACT
      </Link>

      {currentUser ? (
        <div className="option" onClick={() => auth.signOut()}>
          SIGN OUT
        </div>
      ) : (
        <Link className="option" to="/signin">
          SIGN IN
        </Link>
      )}

      <CartIcon />
    </div>

    {!isCartHidden && <CartDropdown />}
  </div>
);

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  isCartHidden: state.cart.isCartHidden,
});

export default connect(mapStateToProps)(Header);
