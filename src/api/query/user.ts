import gql from 'graphql-tag';

const GET_USER = gql`
  query GET_USER($id: Int!) {
    user(where: { id: $id }) {
      id
      name
    }
  }
`;

const GET_USERS = gql`
  query GET_USERS {
    users {
      id
      name
    }
  }
`;

export default {
  GET_USER,
  GET_USERS,
};
