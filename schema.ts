import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type Query {
    user: PersonalInformation
  }

  extend type Mutation {
    setSelfie(data: String!): PersonalInformation
    setBestPictures(data: [String]!): PersonalInformation
    setPersonalInfo(data: PersonalInformation!): PersonalInformation
  }

  input PersonalInformation {
    email: String!
    firstName: String!
    lastName: String!
    gender: GenderEnum!
    nationality: Nationality!
    password: String!
    birthDate: DateTime!
    thumbnail: String!
    bestShots: [MemberPhoto!]
  }
`;
