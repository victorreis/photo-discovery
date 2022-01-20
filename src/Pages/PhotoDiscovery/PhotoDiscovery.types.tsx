import { Album } from '../../Services/Albums/Album.types';
import { User } from '../../Services/Users/User.types';

export interface SearchValues {
  searchValue: string;
  selectedUser?: User;
  selectedAlbum?: Album;
}
