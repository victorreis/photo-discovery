import { Photo } from '../Photos/Photo.types';
import { User } from '../Users/User.types';

export interface Album {
  id: number;
  userId: number;
  user?: User;
  title: string;
  photos?: Photo[];
}
