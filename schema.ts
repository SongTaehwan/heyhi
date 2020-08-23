import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type Query {
    user: PersonalInformation
  }

  extend type Mutation {
    setSelfie(data: String!): String
    setBestPictures(data: [String]!): PersonalInformation
    setPersonalInfo(data: PersonalInformation!): PersonalInformation
  }

  input PersonalInformation {
    email: String!
    firstName: String!
    lastName: String!
    gender: GenderEnum!
    nationality: Number!
    password: String!
    birthDate: DateTime!

    thumbnail: String!
    photos: [MemberPhoto!]!
  }
`;
