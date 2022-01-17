import axios from 'axios';

import { API_URL } from '../../Config/constants';
import { requestErrorHandler } from '../ErrorHandler.service';
import { Photo } from './Photo.types';

const getAll = async () => {
  const photos = await axios
    .get<Photo[]>(`${API_URL}/photos`)
    .then((res) => res.data)
    .catch(requestErrorHandler);

  return photos;
};

const getByAlbumId = async (albumId: number) => {
  const photos = await axios
    .get<Photo[]>(`${API_URL}/albums/${albumId}/photos`)
    .then((res) => res.data)
    .catch(requestErrorHandler);

  return photos;
};

export const photoService = {
  getAll,
  getByAlbumId,
};
