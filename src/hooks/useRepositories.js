import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const queryVariables = (first, sortBy, debounce) => {

  switch (sortBy) {
    case 'latest':
      return { orderBy: 'CREATED_AT', orderDirection: 'DESC', searchKeyword: debounce, first: first };

    case 'highest':
      return { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC', searchKeyword: debounce, first: first };

    case 'lowest':
      return { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC', searchKeyword: debounce, first: first };

    default:
      break;
  }
}

const useRepositories = ({ first, sortBy, debounce }) => {

  const variables = queryVariables(first, sortBy, debounce);

  const { data, error, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables
      }
    });
  };

  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
    ...result
  };
};

export default useRepositories;