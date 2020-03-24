import gql from 'graphql-tag';

const SIGN_IN = gql`
  mutation SIGN_IN($data: PasswordAuthenticationInput!) {
    passwordAuthentication(data: $data) {
      accessToken
      refreshToken
    }
  }
`;

export default {
  SIGN_IN,
};
