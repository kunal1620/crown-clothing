import React from "react";
import { Switch, Route } from "react-router-dom";

import Header from "./components/header/header";
import Homepage from "./pages/homepage/homepage";
import ShopPage from "./pages/shop/shop-page";
import SignInPage from "./pages/sign-in-page/sign-in-page";
import { auth, createUserProfileDocument } from "./firebase/firebase-utils";

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
    // Subscribe to state changes in firebase auth
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // Get document reference object for users from firestore
        const userRef = await createUserProfileDocument(user);

        userRef.onSnapshot((snapShot) => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data(),
            },
          });
        });
      } else {
        // If the user hasn't signed in, set current user to null
        this.setState({ currentUser: user });
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
