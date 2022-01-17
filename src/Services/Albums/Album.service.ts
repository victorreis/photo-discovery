import axios from 'axios';

import { API_URL } from '../../Config/constants';
import { requestErrorHandler } from '../ErrorHandler.service';
import { Album } from './Album.types';

const getAll = async () => {
  const albums = await axios
    .get<Album[]>(`${API_URL}/albums`)
    .then((res) => res.data)
    .catch(requestErrorHandler);

  return albums;
};

const getByUserId = async (userId: number) => {
  const albums = await axios
    .get<Album[]>(`${API_URL}/users/${userId}/albums`)
    .then((res) => res.data)
    .catch(requestErrorHandler);

  return albums;
};

export const albumService = {
  getAll,
  getByUserId,
};
