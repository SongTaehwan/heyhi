import gql from 'graphql-tag';

export const MUTATION_SEND_MESSAGE = gql`
  mutation SEND_MESSAGE($data: ChatMessageCreateInput!) {
    createChatMessage(data: $data) {
      id
      message
      createdAt
    }
  }
`;
