import gql from 'graphql-tag';

const REVIEW_FRAGMENT = gql`
  fragment review on Review {
    id
    contents
    reviewer {
      birthday
      thumbnail
      lastName
      firstName
      nationality {
        code
      }
      gender
    }
  }
`;

export const QUERY_REVIEW = gql`
  query QUERY_REVIEW($id: Int!) {
    review(where: { id: $id }) {
      ...review
    }
  }
  ${REVIEW_FRAGMENT}
`;

export const QUERY_REVIEWS = gql`
  query QUERY_REVIEWS {
    reviews {
      ...review
    }
  }
  ${REVIEW_FRAGMENT}
`;
