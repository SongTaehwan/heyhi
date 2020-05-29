import gql from 'graphql-tag';

const CREATE_MEMBER = gql`
  query CREATE_USER($data: createMemberInput, $id: Int!) {
    createMember(where: { id: $id }, data: $data) {
      id
      name
    }
  }
`;

export default {
  CREATE_MEMBER,
};
