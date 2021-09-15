import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query GET_REPOSITORIES(
      $orderBy: AllRepositoriesOrderBy 
      $orderDirection: OrderDirection 
      $searchKeyword: String 
      $after: String 
      $first: Int
    ){
    repositories(
      orderBy: $orderBy,
      orderDirection: $orderDirection,
      searchKeyword: $searchKeyword,
      after: $after,
      first: $first
    ){
      edges{
        node{
          fullName,
          description,
          language,
          stargazersCount,
          forksCount,
          reviews{
            totalCount
          },
          ratingAverage,
          ownerAvatarUrl,
          id
        }
      },
      pageInfo{
        hasNextPage,
        startCursor,
        endCursor
      }
    }
  }
`;

export const GET_REPO = gql`
  query GET_REPO($id: ID!){
    repository(id: $id){
      id,
      fullName,
      description,
      language,
      stargazersCount,
      forksCount,
      reviews{
        totalCount
      },
      ratingAverage,
      ownerAvatarUrl,
      url
    }
  }
`

export const GET_REVIEWS = gql`
  query GET_REVIEWS(
      $id: ID! 
      $first: Int 
      $after: String
    ){
    repository(id: $id) {
      id
      fullName
      reviews(first: $first after: $after) {
        edges {
          node {
            id
            text
            rating
            createdAt
            repositoryId
            user {
              id
              username
            }
          },
          cursor
        },
        pageInfo{
          hasNextPage,
          startCursor,
          endCursor
        }
      }
    }
  }
`

export const GET_USER = gql`
  query GET_USER($includeReviews: Boolean = false){
    authorizedUser {
      id,
      username,
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            rating,
            repository{
              fullName
            }
            repositoryId,
            createdAt,
            text
          },
          cursor
        }
        pageInfo {
          startCursor,
          endCursor,
          hasNextPage
        }
      }
    }
  }
`

export const GET_TOKEN = gql`
  mutation GET_TOKEN( $credentials: AuthorizeInput ){
    authorize(credentials: $credentials) {
      accessToken
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation CREATE_REVIEW($review: CreateReviewInput){
    createReview(review: $review){
      id,
      user{
        id,
        username
      },
      repository{
        id,
        name
      },
      userId,
      repositoryId,
      rating,
      createdAt,
      text
    }
  }
`

export const CREATE_USER = gql`
  mutation CREATE_USER($user: CreateUserInput){
    createUser(user: $user){
      id,
      username,
      createdAt
    }
  }
`

export const DELETE_REVIEW = gql`
  mutation DELETE_REVIEW($id: ID!){
    deleteReview(id: $id)
  }
`