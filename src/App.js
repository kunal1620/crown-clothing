import React from "react";
import { Switch, Route } from "react-router-dom";

import Header from "./components/header/header";
import Homepage from "./pages/homepage/homepage";
import ShopPage from "./pages/shop/shop-page";
import SignInPage from "./pages/sign-in-page/sign-in-page";
import { auth } from "./firebase/firebase-utils";

import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null, // The user object returned by Firebase after signin
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    console.log("App component mounted");

    this.unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
      this.setState({ currentUser: user });
      console.log(user);
    });
  }

  componentWillUnmount() {
    console.log("App component will unmount");
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
