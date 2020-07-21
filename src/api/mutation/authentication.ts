import gql from 'graphql-tag';

export const MUTATION_SIGN_IN = gql`
  mutation SIGN_IN($data: PasswordAuthenticationInput!) {
    passwordAuthentication(data: $data) {
      accessToken
      refreshToken
    }
  }
`;

export const MUTATION_SEND_EMAIL = gql`
  mutation SEND_EMAIL($data: SendEmailInput!) {
    sendEmail(data: $data) {
      expiredAt
    }
  }
`;

export const MUTATION_VERIFY_CODE = gql`
  mutation VERIFY_CODE($data: VerifyEmailInput!) {
    verifyCode(data: $data) {
      verified
    }
  }
`;

export const MUTATION_CHANGE_PW = gql`
  mutation CHANGE_PW($data: ChangePasswordInput) {
    changePassword(data: $data) {
      updated
    }
  }
`;

export const MUTATION_RESET_PASSWORD = gql`
  mutation RESET_PASSWORD(
    $data: ResetPasswordInput!
    $where: MemberWhereUniqueInput!
  ) {
    resetPassword(data: $data, where: $where) {
      accessToken
      refreshToken
    }
  }
`;
