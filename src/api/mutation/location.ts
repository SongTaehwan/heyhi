import gql from 'graphql-tag';

export const MUTATION_LOCATION = gql`
  mutation UPDATE_LOCATION($data: MemberLocationUpdateInput!) {
    updateMyLocation(data: $data) {
      distance
      latitude
      longitude
    }
  }
`;
