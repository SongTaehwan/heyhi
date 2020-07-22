import { LOCAL_QUERY_PERSONAL_INFO } from '@api/query/local';

interface Resolvers {
  [field: string]: (
    rootValue?: any,
    args?: any,
    context?: any,
    info?: any,
  ) => any;
}

const Mutation: Resolvers = {
  setPersonalInfo: (_, { data }, { cache }) => {
    const prev = cache.readQuery({
      query: LOCAL_QUERY_PERSONAL_INFO,
    });

    const updatedUser = {
      ...prev.user,
      ...data,
    };

    cache.writeQuery({
      query: LOCAL_QUERY_PERSONAL_INFO,
      data: {
        user: updatedUser,
      },
    });

    return updatedUser;
  },
  setBestPictures: (_, { data }, { cache }) => {
    const prev = cache.readQuery({
      query: LOCAL_QUERY_PERSONAL_INFO,
    });

    const updatedUser = {
      ...prev.user,
      bestShots: [...prev.user.bestShots, ...data],
    };

    cache.writeQuery({
      query: LOCAL_QUERY_PERSONAL_INFO,
      data: {
        user: updatedUser,
      },
    });

    return updatedUser;
  },
  setSelfie: (_, { data }, { cache }) => {
    const prev = cache.readQuery({
      query: LOCAL_QUERY_PERSONAL_INFO,
    });

    const updatedUser = {
      ...prev.user,
      thumbnail: data,
    };

    cache.writeQuery({
      query: LOCAL_QUERY_PERSONAL_INFO,
      data: {
        user: updatedUser,
      },
    });

    return updatedUser;
  },
};

const Query: Resolvers = {};

export default {
  Mutation,
  Query,
};
