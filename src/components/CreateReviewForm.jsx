import React from "react";
import { Pressable, View } from "react-native";
import Text from "./Text";
import { Formik } from "formik";
import FormikTextInput from "./FormikTextInput";
import * as yup from 'yup';
import theme from "../theme";
import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/queries";
import { useHistory } from "react-router";

const CreateReviewForm = () => {
  const [createReview] = useMutation(CREATE_REVIEW);
  const history = useHistory();

  const initialValues = {
    ownerName: '',
    repositoryName: '',
    rating: '',
    text: ''
  };

  const validationSchema = yup.object().shape({
    ownerName: yup
      .string()
      .required('Repository owner name is required'),
    repositoryName: yup
      .string()
      .required('Repository name is required'),
    rating: yup
      .number()
      .typeError('Rating must be a number')
      .min(0, 'Rating must be greater than 0')
      .max(100, 'Rating must be less than 100')
      .required('Rating is required'),
    text: yup
      .string()
  });

  const onSubmit = async (values) => {
    const formattedValues = {
      review: {
        ...values,
        rating: parseInt(values.rating)
      }
    }
    try {
      const { data } = await createReview({ variables: formattedValues });
      history.push(`/${data.createReview.repositoryId}`);
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
          <FormikTextInput name='ownerName' placeholder='Repository owner name' />
          <FormikTextInput name='repositoryName' placeholder='Repository name' />
          <FormikTextInput name='rating' placeholder='Rating between 0 and 100' />
          <FormikTextInput name='text' placeholder='Review' multiline={true} />
          <Pressable onPress={handleSubmit}>
            <Text style={theme.buttons}>Create a review</Text>
          </Pressable>
        </View>
      }
    </Formik>
  );
};

export default CreateReviewForm;
