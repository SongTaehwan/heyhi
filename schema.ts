import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type Query {
    getPersonalInfo: User
  }

  extend type Mutation {
    setPersonalInfo(data: PersonalInformation): null
  }

  input PersonalInformation {
    firstName: String!
    lastName: String!
    gender: GenderEnum!
    nationality: Nationality!
    password: String!
    birthDate: DateTime!
    interests: [String]
    thumbnail: String!
    bestShots: [MemberPhoto!]
  }
`;
