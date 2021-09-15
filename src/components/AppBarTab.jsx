import React from "react";
import { Pressable } from "react-native";
import { useHistory } from "react-router";
import useAuthStorage from "../hooks/useAuthStorage";
import { useApolloClient } from "@apollo/client";
import Text from './Text';

const styles = {
  padding: 20
}

const AppBarTab = ({ title, action = '' }) => {
  const history = useHistory();
  const authStorage = useAuthStorage();
  const client = useApolloClient();

  const handlePress = () => {
    switch (action) {
      case 'logIn':
        history.push('/signIn');
        break;

      case 'logOut':
        authStorage.removeAccessToken();
        client.resetStore();
        history.push('/');
        break;

      case 'createReview':
        history.push('/createReview');
        break;

      case 'myReviews':
        history.push('/myReviews');
        break;

      case 'signUp':
        history.push('/signUp');
        break;

      default:
        history.push('/');
        break;
    }
  }


  return (
    <Pressable onPress={handlePress}>
      <Text fontSize='subheading' color='appBarText' style={styles}>
        {title}
      </Text>
    </Pressable>
  );
};

export default AppBarTab;