import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type Query {
    user: PersonalInformation
  }

  extend type Mutation {
    setSelfie(data: String!): PersonalInformation
    setInterests(data: [String!]!): PersonalInformation
    setBestPictures(data: [String]!): PersonalInformation
    setPersonalInfo(data: PersonalInformation!): PersonalInformation
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
