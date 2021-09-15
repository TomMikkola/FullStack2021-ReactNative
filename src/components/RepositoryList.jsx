import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';
import Filter from './Filter'
import theme from '../theme';
import SearchBar from './SearchBar';
import { useDebounce } from 'use-debounce';

const ItemSeparator = () => <View style={theme.separator} />;

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { sortBy, setSortBy, searchKeyword, setSearchKeyword } = this.props;

    return (
      <>
        <SearchBar searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} />
        <Filter sortBy={sortBy} setSortBy={setSortBy} />
      </>
    );
  };

  render() {
    const repositoryNodes = this.props.repositories
      ? this.props.repositories.edges.map(edge => edge.node)
      : [];

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <RepositoryItem item={item} />}
        keyExtractor={item => item.id}
        ListHeaderComponent={this.renderHeader}
        onEndReached={this.props.onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

const RepositoryList = () => {
  const [sortBy, setSortBy] = useState('latest');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debounce] = useDebounce(searchKeyword, 500);
  const { repositories, fetchMore } = useRepositories({ first: 10, sortBy, debounce });

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <RepositoryListContainer
      sortBy={sortBy}
      setSortBy={setSortBy}
      repositories={repositories}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
      onEndReach={onEndReach}
    />
  )
};

export default RepositoryList;