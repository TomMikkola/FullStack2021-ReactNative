import React from "react";
import { Pressable, View } from "react-native";
import Text from "./Text";
import * as yup from 'yup';
import { Formik } from "formik";
import FormikTextInput from "./FormikTextInput";
import theme from "../theme";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/queries";
import useSignIn from "../hooks/useSignIn";
import { useHistory } from "react-router";

const SignUpForm = () => {

  const [createUser] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();
  const history = useHistory();

  const initialValues = {
    username: '',
    password: '',
    passwordConfirm: ''
  };

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .min(1, 'Username must be at least 1 character long')
      .max(30, 'Username can contain at most 30 characters')
      .required('Username is required'),
    password: yup
      .string()
      .min(5, 'Password must be at least 5 characters')
      .max(50, 'Password can contain at most 50 characters')
      .required('Password is required'),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref('password'), null], `Passwords don't match`)
      .required('Password confirm is required')
  });

  const onSubmit = async ({ username, password }) => {
    const credentials = {
      user: {
        username,
        password
      }

    };
    try {
      await createUser({ variables: credentials });
      await signIn({ username, password });
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) =>
        <View style={theme.forms}>
          <FormikTextInput name='username' placeholder='Username' />
          <FormikTextInput name='password' placeholder='Password' />
          <FormikTextInput name='passwordConfirm' placeholder='Password confirmation' />
          <Pressable onPress={handleSubmit}>
            <Text style={theme.buttons}>Sign up</Text>
          </Pressable>
        </View>
      }
    </Formik>
  )
};

export default SignUpForm;