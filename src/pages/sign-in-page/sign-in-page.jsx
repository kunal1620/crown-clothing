import React from "react";
import SignIn from "../../components/sign-in/sign-in";
import SignUp from "../../components/sign-up/sign-up";

import "./sign-in-page-styles.scss";

const SignInPage = (props) => (
  <div className="sign-in-page">
    <SignIn />
    <SignUp />
  </div>
);

export default SignInPage;
