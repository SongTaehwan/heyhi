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

const UPDATE_MEMBER_LOCATION = gql`
  mutation UpdateMemberLocation(
    $data: MemberLocationUpdateInput!
    $where: MemberLocationWhereUniqueInput!
  ) {
    updateMemberLocation(data: $data, where: $where) {
      distance
      latitude
      longitude
    }
  }
`;

export default {
  CREATE_MEMBER,
  CHANGE_PASSWORD,
  UPDATE_MEMBER_LOCATION,
};
