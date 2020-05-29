import gql from 'graphql-tag';

const CREATE_MEMBER = gql`
  query CREATE_USER($data: createMemberInput, $id: Int!) {
    createMember(where: { id: $id }, data: $data) {
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
  CREATE_MEMBER,
  CHANGE_PASSWORD,
};
