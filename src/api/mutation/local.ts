import gql from 'graphql-tag';

export const LOCAL_SET_PERSONAL_INFO = gql`
  mutation SET_PERSON_INFO($user: PersonalInformation!) {
    setPersonalInfo(data: $user) @client
  }
`;

export const LOCAL_SET_BEST_PICTURES = gql`
  mutation SET_BEST_SHOTS($pics: [String]!) {
    setBestPictures(data: $pics) @client
  }
`;

export const LOCAL_SET_SELFIE = gql`
  mutation SET_SELFIE($thumbnail: String!) {
    setSelfie(data: $thumbnail) @client
  }
`;
