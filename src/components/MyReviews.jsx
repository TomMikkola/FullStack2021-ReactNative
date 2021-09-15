import React from "react";
import { FlatList, Pressable, View, Alert } from "react-native";
import Text from './Text';
import { GET_USER, DELETE_REVIEW } from '../graphql/queries';
import { useMutation, useQuery } from "@apollo/client";
import { ReviewItem } from "./SingleRepository";
import theme from "../theme";
import { useHistory } from 'react-router';

const ItemSeparator = () => <View style={theme.separator} />;

const MyReviews = () => {
  const history = useHistory();
  const { data, refetch } = useQuery(GET_USER, {
    fetchPolicy: 'cache-and-network',
    variables: { includeReviews: true }
  });

  const [deleteReview, { }] = useMutation(DELETE_REVIEW);

  const result = data
    ? data.authorizedUser.reviews.edges
    : []

  const myReviews = result.map(r => r.node);

  const handleDelete = (item) => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          onPress: () => {
            try {
              deleteReview({ variables: { id: item.id } });
              refetch();
            } catch (error) {
              console.log(error);
            }
          },
        }
      ])
  };

  const viewRepository = (item) => {
    history.push(`/${item.repositoryId}`);
  };

  const styles = {
    footer: {
      backgroundColor: theme.colors.cardBgColor,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingBottom: 15,
    },
    delete: {
      ...theme.buttons,
      backgroundColor: theme.colors.delete,
    }
  }

  return (
    <FlatList
      data={myReviews}
      renderItem={({ item }) => (
        <>
          <ReviewItem review={item} />
          <View style={styles.footer}>
            <Pressable onPress={() => viewRepository(item)}><Text style={theme.buttons}>View repository</Text></Pressable>
            <Pressable onPress={() => handleDelete(item)}><Text style={styles.delete}>Delete review</Text></Pressable>
          </View>
        </>
      )}
      keyExtractor={(item) => item.repository.fullName}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReviews;