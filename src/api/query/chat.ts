import gql from 'graphql-tag';
export const QUERY_CHAT_LIST = gql`
  query QUERY_CHAT_LIST($email: String!) {
    matchings(
      where: {
        OR: [
          { requestMember: { email: $email } }
          { requestedMember: { email: $email } }
        ]
        AND: [{ state_in: [ACCEPTED, COMPLETED, BLOCKED] }]
      }
    ) {
      id
      state
      chatRoom {
        id
        title
        updatedAt
        createdAt
      }
      requestedMember {
        id
        firstName
        lastName
        thumbnail
      }
    }
  }
`;
