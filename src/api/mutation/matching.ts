import gql from 'graphql-tag';

export const MUTATION_REQUEST_MATCHING = gql`
  mutation REQUEST_MATCHING($data: RequestMatchingInput!) {
    requestMatching(data: $data) {
      id
      state
    }
  }
`;

export const MUTATION_ACCEPT_MATCHING = gql`
  mutation ACCEPT_MATCHING(
    $data: AcceptMatchingInput!
    $where: MatchingWhereUniqueInput!
  ) {
    acceptMatching(data: $data, where: $where) {
      id
      state
    }
  }
`;
