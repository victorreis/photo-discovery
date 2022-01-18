import { useEffect, useMemo, useState } from 'react';

import { PageContainer } from '../../App.styles';
import { Button } from '../../Components/Button';
import { ImageCard } from '../../Components/ImageCard';
import { Select } from '../../Components/Select';
import { TextInput } from '../../Components/TextInput';
import { Typography } from '../../Components/Typography';
import { TestProps } from '../../Config/Tests/Test.types';
import { albumService } from '../../Services/Albums/Album.service';
import { Album } from '../../Services/Albums/Album.types';
import { photoService } from '../../Services/Photos/Photo.service';
import { userService } from '../../Services/Users/User.service';
import { User } from '../../Services/Users/User.types';
import {
  PhotoDiscoveryContainer,
  SearchContainer,
} from './PhotoDiscovery.styles';

export const photoDiscoveryDefaults: Required<TestProps> = {
  testID: 'PhotoDiscovery',
};

export const PhotoDiscovery: React.FC = (): JSX.Element => {
  const baseNumberOfLoadedAlbums = 3;

  const [albums, setAlbums] = useState<Album[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [numberOfLoadedAlbums, setNumberOfLoadedAlbums] = useState<number>(3);
  const [loadedAlbums, setLoadedAlbums] = useState<Album[]>([]);

  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<User>();
  const [selectedAlbum, setSelectedAlbum] = useState<Album>();

  // eslint-disable-next-line no-console
  console.log({ selectedUser, selectedAlbum });

  useEffect(() => {
    (async () => {
      const fetchedUsers = await userService.getAll();
      setUsers(() => fetchedUsers);

      const fetchedAlbums = await albumService.getAll();
      setAlbums(() => fetchedAlbums);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const newLoadedAlbums: Album[] = await Promise.all(
        albums.slice(0, numberOfLoadedAlbums).map(async (album) => {
          if (album.photos && album.photos.length > 0) {
            return album;
          }

          const user = users.find(
            (fetchedUser) => fetchedUser.id === album.userId
          );
          const photos = await photoService.getByAlbumId(album.id);
          return { ...album, user, photos };
        })
      );

      setLoadedAlbums(() => newLoadedAlbums);
    })();
  }, [albums, numberOfLoadedAlbums, users]);

  const handleChangeSearchValue = (newValue: string) => {
    setSearchValue(newValue);
  };

  const handleSelectUser = (selectedUserId: string) => {
    const selectedOption = users.find(
      (user) => user.id === Number(selectedUserId)
    );
    setSelectedUser(() => selectedOption);
  };

  const handleSelectAlbum = (selectedAlbumId: string) => {
    const selectedOption = albums.find(
      (user) => user.id === Number(selectedAlbumId)
    );
    setSelectedAlbum(() => selectedOption);
  };

  const handleLoadMore = () =>
    setNumberOfLoadedAlbums(
      (prevState) => prevState + baseNumberOfLoadedAlbums
    );

  const renderAlbums = () =>
    loadedAlbums.map((album) => {
      const renderImageCard = () =>
        album.photos?.map(({ id, title, url, thumbnailUrl }) => (
          <ImageCard
            key={id}
            id={String(id)}
            imageUrl={url}
            thumbnailUrl={thumbnailUrl}
            title={title}
          />
        ));

      return (
        <div key={album.id}>
          <Typography variant="h4">
            {album.title} - {album.user?.name}
          </Typography>
          <PhotoDiscoveryContainer>{renderImageCard()}</PhotoDiscoveryContainer>
        </div>
      );
    });

  const usersOptions = useMemo(
    () =>
      users.map(({ id, name }) => ({
        id,
        value: id,
        text: name,
      })),
    [users]
  );
  const albumsOptions = useMemo(
    () =>
      albums.map(({ id, title }) => ({
        id,
        value: id,
        text: title,
      })),
    [albums]
  );

  return (
    <PageContainer
      data-testid={photoDiscoveryDefaults.testID}
      style={{
        display: 'grid',
        justifyItems: 'center',
      }}
    >
      <Typography variant="h4">Discover photos by searching for...</Typography>
      <SearchContainer>
        <TextInput
          onChange={handleChangeSearchValue}
          placeholder="Type some keyword..."
          value={searchValue}
        />
        <Select
          onChange={handleSelectUser}
          options={usersOptions}
          placeholder="Select an user..."
        />
        <Select
          onChange={handleSelectAlbum}
          options={albumsOptions}
          placeholder="Select an album..."
        />

        <Button onClick={() => {}}>Search </Button>
      </SearchContainer>

      {renderAlbums()}

      <Button onClick={handleLoadMore}>Load more...</Button>
    </PageContainer>
  );
};
