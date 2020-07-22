import { ApolloError } from 'apollo-client';
import { Dispatch } from 'react';

export const logError = (cb: Dispatch<any>) => (error: ApolloError): void => {
  console.log('Error while processing: ', error);
  const message = error.message.split(': ').pop() as string;
  cb(message);
};
