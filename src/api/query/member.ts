import gql from 'graphql-tag';

// TODO: Fragment

export const QUERY_MEMBER = gql`
  query QUERY_MEMBER($id: Int!) {
    member(where: { id: $id }) {
      id
      firstName
      lastName
    }
  }
`;

export const QUERY_MEMBERS = gql`
  query QUERY_MEMBERS {
    members {
      id
      firstName
      lastName
    }
  }
`;

export const QUERY_MEMBER_AROUND_ME = gql`
  query QUERY_MEMBER_AROUND_ME {
    getAroundPeople {
      id
      email
      firstName
      lastName
      gender
      birthday
      status
      thumbnail
      withdrawalMessage
      role {
        id
        role
      }
      photos {
        id
        photo
        type
      }
      reviews {
        id
        contents
        rate
        updatedAt
        reviewer {
          id
          firstName
          lastName
          email
          gender
        }
      }
      requestMatchings {
        requestMessage
        requestMember {
          id
          email
          firstName
          lastName
          gender
        }
        state
      }
    }
  }
`;
