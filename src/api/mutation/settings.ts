import gql from 'graphql-tag';

const CHANGE_PASSWORD = gql`
  query CREATE_USER($data: createUserInput, $id: Int!) {
    createUser(where: { id: $id }, data: $data) {
      id
      name
    }
  }
`;

export default {
  CHANGE_PASSWORD,
};
