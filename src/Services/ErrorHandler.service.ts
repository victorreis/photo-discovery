import { APPLICATION_ERROR } from '../Config/constants';

export const requestErrorHandler = (error: { message?: string }) => {
  console.error(error?.message || APPLICATION_ERROR);
  throw new Error(error?.message || APPLICATION_ERROR);
};
