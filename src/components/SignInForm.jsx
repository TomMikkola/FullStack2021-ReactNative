import React from "react";
import { Formik } from "formik";
import * as yup from 'yup';
import FormikTextInput from "./FormikTextInput";
import { Pressable, Text, View } from "react-native";
import theme from "../theme";

const SignInForm = ({ onSubmit }) => {

  const initialValues = {
    username: '',
    password: ''
  }

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .required('Username is required'),
    password: yup
      .string()
      .required('Password is required'),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) =>
        <View style={theme.forms}>
          <FormikTextInput name='username' placeholder='Username' testID='usernameInput' />
          <FormikTextInput name='password' placeholder='Password' testID='passwordInput' />
          <Pressable onPress={handleSubmit} testID='submitButton'>
            <Text style={theme.buttons}>Sign in</Text>
          </Pressable>
        </View>
      }
    </Formik>
  )
};

export default SignInForm;