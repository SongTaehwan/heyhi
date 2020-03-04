import gql from 'graphql-tag';

const CREATE_USER = gql`
  query CREATE_USER($data: createUserInput, $id: Int!) {
    createUser(where: { id: $id }, data: $data) {
      id
      name
    }
  }
`;

export default {
  CREATE_USER,
};
