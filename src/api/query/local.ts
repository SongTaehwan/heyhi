import gql from 'graphql-tag';

export const LOCAL_QUERY_PERSONAL_INFO = gql`
  query QUERY_PERSONAL_INFO {
    user @client {
      email
      firstName
      lastName
      gender
      nationality
      password
      birthDate
      thumbnail
      bestShots
    }
  }
`;
