import gql from 'graphql-tag';

export const MUTATION_CREATE_MEMBER = gql`
  mutation CREATE_USER($data: MemberCreateInput!) {
    createMember(data: $data) {
      id
    }
  }
`;

export const MUTATION_UPDATE_MEMBER_EMAIL = gql`
  mutation UpdateMemberEmail($data: UpdateMemberEmailInput!) {
    updateMemberEmail(data: $data) {
      email
    }
  }
`;

export const MUTATION_UPDATE_MEMBER_LOCATION = gql`
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
