import gql from 'graphql-tag';

export const MUTATION_CREATE_MEMBER = gql`
  mutation CREATE_USER($data: MemberCreateInput!) {
    createMember(data: $data) {
      id
      email
      password
      firstName
      lastName
      gender
      birthday
      status
      thumbnail
      withdrawalMessage
      # createdAt
      # updatedAt
      # deletedAt
      # loginAt
      # role {
      #   id
      #   role
      # }
      # nationality {
      #   id
      #   code
      #   name
      # }
      # photos {
      #   id
      #   photo
      #   type
      # }
      # refreshToken {
      #   token
      # }
      # requestMatchings {
      #   id
      #   requestMessage
      #   acceptMessage
      #   rejectMessage
      #   state
      #   createdAt
      #   updatedAt
      #   deletedAt
      #   requestMember {
      #     id
      #     email
      #     firstName
      #     lastName
      #   }
      #   requestedMember {
      #     id
      #     email
      #     firstName
      #     lastName
      #   }
      #   chatRoom {
      #     id
      #     title
      #     messages {
      #       id
      #     }
      #     createdAt
      #     updatedAt
      #     deletedAt
      #   }
      # }
      # requestedMatchings {
      #   id
      #   requestMessage
      #   acceptMessage
      #   rejectMessage
      #   state
      #   createdAt
      #   updatedAt
      #   deletedAt
      #   requestMember {
      #     id
      #     email
      #     firstName
      #     lastName
      #   }
      #   requestedMember {
      #     id
      #     email
      #     firstName
      #     lastName
      #   }
      #   chatRoom {
      #     id
      #     title
      #     messages {
      #       id
      #     }
      #     createdAt
      #     updatedAt
      #     deletedAt
      #   }
      # }
      # writeReviews {
      #   id
      #   contents
      #   rate
      #   reviewer {
      #     id
      #     email
      #     firstName
      #     lastName
      #   }
      #   reviewee {
      #     id
      #     email
      #     firstName
      #     lastName
      #   }
      # }
      # reviews {
      #   id
      #   contents
      #   rate
      #   reviewer {
      #     id
      #     email
      #     firstName
      #     lastName
      #   }
      #   reviewee {
      #     id
      #     email
      #     firstName
      #     lastName
      #   }
      # }
      # reports {
      #   id
      #   contents
      #   category
      #   writerId
      #   target {
      #     id
      #   }
      #   targetMatching {
      #     id
      #     requestMessage
      #     rejectMessage
      #     state
      #   }
      # }
      # payment {
      #   id
      #   paymentType
      # }
      # location {
      #   id
      #   distance
      #   latitude
      #   longitude
      # }
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
