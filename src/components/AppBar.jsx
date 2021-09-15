import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import AppBarTab from './AppBarTab';
import Constants from 'expo-constants';
import theme from '../theme';
import { Link } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../graphql/queries';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 20,
    backgroundColor: theme.colors.appBarBg,
  }
});

const AppBar = () => {

  const { data } = useQuery(GET_USER);
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link>
          <AppBarTab title='Repositories' />
        </Link>
        {
          data && data.authorizedUser === null
            ? <>
              <Link>
                <AppBarTab title='Sign in' action='logIn' />
              </Link>
              <Link>
                <AppBarTab title='Sign up' action='signUp' />
              </Link>
            </>
            :
            <>
              <Link>
                <AppBarTab title='Create a review' action='createReview' />
              </Link>
              <Link>
                <AppBarTab title='My reviews' action='myReviews' />
              </Link>
              <Link>
                <AppBarTab title='Sign out' action='logOut' />
              </Link>
            </>
        }
      </ScrollView>
    </View>
  );
};

export default AppBar;