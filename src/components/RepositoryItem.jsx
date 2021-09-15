import React from "react";
import { View, Image, StyleSheet, Pressable } from "react-native";
import { useHistory } from 'react-router';

import theme from "../theme";
import Text from "./Text";
import { GET_REPO } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import SingleRepository from "./SingleRepository";

export const ItemHeader = ({ item }) => {

  const styles = {
    header: {
      display: 'flex',
      flexDirection: 'row'
    },
    img: {
      height: theme.thumbnails.height,
      width: theme.thumbnails.width,
      borderRadius: 5
    },
    infoWrap: {
      flexShrink: 1,
      paddingLeft: 20
    },
    language: {
      backgroundColor: theme.colors.primary,
      padding: 5,
      borderRadius: 5,
      alignSelf: 'flex-start'
    }
  };

  return (
    <View style={styles.header}>
      <Image style={styles.img} source={{ uri: item.ownerAvatarUrl }} />
      <View style={styles.infoWrap}>
        <Text fontWeight='bold' fontSize='subheading' color='textPrimary' testID='name'>{item.fullName}</Text>
        <Text color='textSecondary' testID='description'>{item.description}</Text>
        <Text style={styles.language} color='appBarText' testID='language'>{item.language}</Text>
      </View>
    </View>
  )
};

export const ItemFooter = ({ item }) => {

  const styles = {
    footer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingTop: 10
    },
    footerItem: {
      alignItems: 'center'
    }
  }

  const formatNumber = (value) => {
    let count = parseInt(value);
    if (value >= 1000) {
      count = (value / 1000).toFixed(1);
      return count + 'k';
    }
    return count;
  };

  return (
    <View style={styles.footer}>
      <View style={styles.footerItem}>
        <Text fontWeight='bold' testID='starCount'>{formatNumber(item.stargazersCount)}</Text>
        <Text color='textSecondary' >Stars</Text>
      </View>

      <View style={styles.footerItem}>
        <Text fontWeight='bold' testID='forkCount'>{formatNumber(item.forksCount)}</Text>
        <Text color='textSecondary' >Forks</Text>
      </View>

      <View style={styles.footerItem}>
        <Text fontWeight='bold' testID='reviewCount'>{formatNumber(item.reviews.totalCount)}</Text>
        <Text color='textSecondary' >Reviews</Text>
      </View>

      <View style={styles.footerItem}>
        <Text fontWeight='bold' testID='rating'>{item.ratingAverage}</Text>
        <Text color='textSecondary' >Rating</Text>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 15,
    backgroundColor: theme.colors.cardBgColor
  }
});

const RepositoryItem = ({ item = null, inDetail = false, id = null }) => {
  const history = useHistory();

  if (inDetail) {
    const { data } = useQuery(GET_REPO, {
      variables: { id: id },
      fetchPolicy: 'cache-and-network'
    });
    if (data) {
      item = data.repository;

      return (
        <SingleRepository item={item} />
      )
    } else {
      return <View></View>;
    }
  } else {
    return (
      <Pressable onPress={() => history.push(`/${item.id}`)}>
        <View style={styles.wrapper} testID='repositoryItem'>
          <ItemHeader item={item} />
          <ItemFooter item={item} />
        </View>
      </Pressable>
    )
  }
};

export default RepositoryItem;