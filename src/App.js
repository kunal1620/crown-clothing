import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import Header from "./components/header/header";
import Homepage from "./pages/homepage/homepage";
import ShopPage from "./pages/shop/shop-page";
import SignInPage from "./pages/sign-in-page/sign-in-page";
import CheckoutPage from "./pages/checkout/checkout";

import { auth, createUserProfileDocument } from "./firebase/firebase-utils";

import { setCurrentUser } from "./redux/user/user-actions";
import { selectCurrentUser } from "./redux/user/user-selectors";

import "./App.css";

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    // Get redux action dispatcher from props
    const { dispatchSetCurrentUser } = this.props;

    // Subscribe to state changes in firebase auth
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // Get document reference object for users from firestore
        const userRef = await createUserProfileDocument(user);

        userRef.onSnapshot((snapShot) => {
          dispatchSetCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      } else {
        // If the user hasn't signed in, set current user to null
        dispatchSetCurrentUser(user);
      }
    });
  }

  componentWillUnmount() {
    // Unsubscribe from firebase auth state changes
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route
            path="/signin"
            render={() =>
              this.props.currentUser ? <Redirect to="/" /> : <SignInPage />
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchSetCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
