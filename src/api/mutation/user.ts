import gql from 'graphql-tag';

const CREATE_USER = gql`
  query CREATE_USER($data: createUserInput, $id: Int!) {
    createUser(where: { id: $id }, data: $data) {
      id
      name
    }
  }
`;

const CHANGE_PASSWORD = gql`
  mutation CHANGE_PASSWORD($data: ChangePasswordInput) {
    changePassword(data: $data) {
      updated
    }
  }
`;

export default {
  CREATE_USER,
  CHANGE_PASSWORD,
};
