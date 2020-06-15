import gql from 'graphql-tag';

interface Resolvers {
  [field: string]: (
    rootValue?: any,
    args?: any,
    context?: any,
    info?: any,
  ) => any;
}

const Mutation: Resolvers = {
  setPersonalInfo: (_, variables, { cache, getCacheKey }) => {},
};
const Query: Resolvers = {
  getPersonalInfo: (_, variables, { cache }) => {},
};

export default {
  Mutation,
  Query,
};
