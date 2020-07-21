import gql from 'graphql-tag';

export const LOCAL_QUERY_PERSONAL_INFO = gql`
  query QUERY_PERSONAL_INFO {
    user @client {
      firstName
      lastName
      gender
      country
      password
      birthDate
      interests
      selfie
      bestShots
      __typename
    }
  }
`;
