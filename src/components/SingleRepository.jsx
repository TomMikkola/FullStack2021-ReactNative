import React from "react";
import { View, Pressable } from "react-native";
import * as WebBrowser from 'expo-web-browser';
import { FlatList, StyleSheet } from "react-native";
import { ItemHeader, ItemFooter } from "./RepositoryItem";
import theme from "../theme";
import Text from "./Text";
import { format } from 'date-fns'
import useReviews from "../hooks/useReviews";

const styles = StyleSheet.create({
  wrapper: {
    padding: 15,
    backgroundColor: theme.colors.cardBgColor,
    marginBottom: 10,
  },
});

const ItemSeparator = () => <View style={theme.separator} />;

const RepositoryInfo = ({ repository }) => {
  return (
    <View style={styles.wrapper}>
      <ItemHeader item={repository} />
      <ItemFooter item={repository} />
      <Pressable onPress={() => WebBrowser.openBrowserAsync(repository.url)}>
        <Text style={theme.buttons}>Open in GitHub</Text>
      </Pressable>
    </View>
  );
};

export const ReviewItem = ({ review }) => {
  const styles = {
    wrapper: {
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: theme.colors.cardBgColor,
      padding: 15
    },
    rating: {
      color: theme.colors.primary,
      fontSize: 20,
      height: 50,
      width: 50,
      borderWidth: 2,
      borderRadius: 50,
      borderColor: theme.colors.primary,
      display: 'flex',
      textAlign: 'center',
      textAlignVertical: 'center',
      marginRight: 15,
    },
    textWrap: {
      display: 'flex',
      flexShrink: 1,
    }
  }

  const formatDate = (date) => {
    return format(new Date(date), 'dd.MM.yyyy')
  }

  return (
    <View style={styles.wrapper}>
      <View>
        <Text fontWeight='bold' style={styles.rating}>{review.rating}</Text>
      </View>
      <View style={styles.textWrap}>
        <Text fontWeight='bold'>{review.user?.username || review.repository?.fullName}</Text>
        <Text color='textSecondary'>{formatDate(review.createdAt)}</Text>
        <Text >{review.text}</Text>
      </View>
    </View>
  );
};

const SingleRepository = ({ item }) => {

  const { reviews, fetchMore } = useReviews({ id: item.id, first: 10 });

  const onEndReached = () => {
    fetchMore();
  };

  const nodes = reviews
    ? reviews.edges.map(edge => edge.node)
    : []

  return (
    <FlatList
      data={nodes}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={item => item.id}
      ListHeaderComponent={() => <RepositoryInfo repository={item} />}
      ItemSeparatorComponent={ItemSeparator}
      onEndReachedThreshold={0.5}
      onEndReached={onEndReached}
    />
  );
};

export default SingleRepository;