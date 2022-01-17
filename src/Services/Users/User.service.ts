import axios from 'axios';

import { API_URL } from '../../Config/constants';
import { requestErrorHandler } from '../ErrorHandler.service';
import { User } from './User.types';

const getAll = async () => {
  const users = await axios
    .get<User[]>(`${API_URL}/users`)
    .then((res) => res.data)
    .catch(requestErrorHandler);

  return users;
};

const getById = async (userId: number) => {
  const user = await axios
    .get<User>(`${API_URL}/users/${userId}`)
    .then((res) => res.data)
    .catch(requestErrorHandler);

  return user;
};

export const userService = {
  getAll,
  getById,
};
