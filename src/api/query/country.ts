import gql from 'graphql-tag';

export const QUERY_COUNTRY = gql`
  query QUERY_COUNTRY {
    nationalities {
      id
      code
      name
    }
  }
`;
