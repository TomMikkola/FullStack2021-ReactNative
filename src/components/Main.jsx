import React from 'react';
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-native';
import { StyleSheet, View } from 'react-native';

import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import theme from '../theme';
import SignIn from './SignIn';
import SignUpForm from './SignUpForm';
import RepositoryItem from './RepositoryItem';
import CreateReviewForm from './CreateReviewForm';
import MyReviews from './MyReviews';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainBgColor
  },
});

const Main = () => {
  const match = useRouteMatch('/:id');

  return (
    <View style={styles.container}>
      <AppBar />
      <Switch >

        <Route exact path='/'>
          <RepositoryList />
        </Route>

        <Route path='/signIn'>
          <SignIn />
        </Route>

        <Route path='/signUp'>
          <SignUpForm />
        </Route>

        <Route path='/createReview'>
          <CreateReviewForm />
        </Route>

        <Route path='/myReviews'>
          <MyReviews />
        </Route>

        <Route path='/:id'>
          <RepositoryItem inDetail={true} id={match && match.params.id} />
        </Route>

        <Redirect to='/' />

      </Switch>
    </View>
  );
};

export default Main;