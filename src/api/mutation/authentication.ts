import gql from 'graphql-tag';

const SIGN_IN = gql`
  mutation SIGN_IN($data: PasswordAuthenticationInput!) {
    passwordAuthentication(data: $data) {
      accessToken
      refreshToken
    }
  }
`;

const SEND_EMAIL = gql`
  mutation SEND_EMAIL($data: SendEmailInput!) {
    sendEmail(data: $data) {
      expiredAt
    }
  }
`;

const VERIFY_CODE = gql`
  mutation VERIFY_CODE($data: VerifyEmailInput!) {
    verifyCode(data: $data) {
      id
      email
      lastName
      firstName
    }
  }
`;

export default {
  SIGN_IN,
  SEND_EMAIL,
  VERIFY_CODE,
};
