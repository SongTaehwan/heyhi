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

const GET_REVIEW = gql`
  query GET_REVIEW($id: Int!) {
    review(where: { id: $id }) {
      ...review
    }
  }
  ${REVIEW_FRAGMENT}
`;

const GET_REVIEWS = gql`
  query GET_REVIEWS {
    reviews {
      ...review
    }
  }
  ${REVIEW_FRAGMENT}
`;

export default {
  GET_REVIEW,
  GET_REVIEWS,
};
