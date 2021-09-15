import React from "react";
import { useHistory } from "react-router";
import useSignIn from "../hooks/useSignIn";

import SignInForm from "./SignInForm";

const SignIn = () => {

  const [signIn] = useSignIn();
  const history = useHistory();

  const onSubmit = async (values) => {
    try {
      await signIn(values);
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SignInForm onSubmit={onSubmit} />
  )
};

export default SignIn;