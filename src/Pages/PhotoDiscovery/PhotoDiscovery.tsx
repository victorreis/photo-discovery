import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

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
  FeedbackMessage,
  PhotoDiscoveryContainer,
  SearchContainer,
} from './PhotoDiscovery.styles';
import { SearchValues } from './PhotoDiscovery.types';

export const photoDiscoveryDefaults: Required<TestProps> = {
  testID: 'PhotoDiscovery',
};

export const PhotoDiscovery: React.FC = (): JSX.Element => {
  const baseNumberOfLoadedAlbums = 3;

  const textInputRef = useRef<HTMLInputElement>(null);

  const [users, setUsers] = useState<User[]>([]);

  const [albums, setAlbums] = useState<Album[]>([]);
  const [loadedAlbums, setLoadedAlbums] = useState<Album[]>([]);
  const [numberOfLoadedAlbums, setNumberOfLoadedAlbums] = useState<number>(
    baseNumberOfLoadedAlbums
  );

  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<User>();
  const [selectedAlbum, setSelectedAlbum] = useState<Album>();
  const [currentSearchValues, setCurrentSearchValues] = useState<SearchValues>({
    searchValue: '',
  });

  const [showLoadMore, setShowLoadMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const findUserById = (usersToSearchIn: User[], userId: number) =>
    usersToSearchIn.find((sortedUser) => sortedUser.id === userId);

  useEffect(() => {
    (async () => {
      const fetchedUsers = await userService.getAll();
      const sortedUsers = fetchedUsers.sort((user1, user2) =>
        user1.name < user2.name ? -1 : 0
      );
      setUsers(() => sortedUsers);

      const fetchedAlbums = await albumService.getAll();
      const fetchedAlbumsWithUserData = fetchedAlbums.map((album) => {
        const user = findUserById(sortedUsers, album.userId);
        return { ...album, user };
      });
      const sortedAlbums = fetchedAlbumsWithUserData.sort((album1, album2) =>
        album1.title < album2.title ? -1 : 0
      );
      setAlbums(() => sortedAlbums);

      if (textInputRef.current) {
        textInputRef.current.focus();
      }
    })();
  }, []);

  const hasPhotos = (album: Album) => album.photos && album.photos.length > 0;

  const isValidAlbum = useCallback(
    (album: Album) => {
      if (currentSearchValues.selectedAlbum) {
        return album.id === currentSearchValues.selectedAlbum.id;
      }
      if (currentSearchValues.selectedUser) {
        return album.userId === currentSearchValues.selectedUser.id;
      }
      return album;
    },
    [currentSearchValues.selectedAlbum, currentSearchValues.selectedUser]
  );

  const getAlbumWithFilteredPhotosByTitle = useCallback(
    (album: Album) => {
      if (!album.photos) {
        return album;
      }

      const photos = album.photos.filter((photo) => {
        return photo.title.includes(
          currentSearchValues.searchValue.trimStart().trimEnd()
        );
      });
      return { ...album, photos };
    },
    [currentSearchValues]
  );

  const loadPhotosFromAlbum = useCallback(async (album: Album) => {
    if (hasPhotos(album)) {
      return album;
    }

    const photos = await photoService.getByAlbumId(album.id);
    return { ...album, photos };
  }, []);

  const loadPhotosFromAlbums = useCallback(async () => {
    setLoading(() => true);
    setShowLoadMore(() => false);
    const validAlbums = albums.filter(isValidAlbum);

    const currentLoadedAlbums: Album[] = await Promise.all(
      validAlbums.slice(0, numberOfLoadedAlbums).map(loadPhotosFromAlbum)
    );
    const currentLoadedAlbumsFilteredByTitle = currentLoadedAlbums
      .map(getAlbumWithFilteredPhotosByTitle)
      .filter(hasPhotos);

    let sizeDifference =
      numberOfLoadedAlbums - currentLoadedAlbumsFilteredByTitle.length;
    let index = numberOfLoadedAlbums - sizeDifference + 1;

    while (sizeDifference !== 0 && index < validAlbums.length) {
      const album = validAlbums.at(index);
      if (album) {
        // eslint-disable-next-line no-await-in-loop
        const loadedAlbum = await loadPhotosFromAlbum(album);

        const albumWithPhotosFiltered =
          getAlbumWithFilteredPhotosByTitle(loadedAlbum);

        if (hasPhotos(albumWithPhotosFiltered)) {
          if (
            !currentLoadedAlbumsFilteredByTitle.some(
              ({ id }) => id === albumWithPhotosFiltered.id
            )
          ) {
            currentLoadedAlbumsFilteredByTitle.push(albumWithPhotosFiltered);
            sizeDifference--;
          }
        }
      }
      index++;
    }

    if (index < validAlbums.length) {
      setShowLoadMore(() => true);
    }

    setLoading(() => false);

    return [...currentLoadedAlbumsFilteredByTitle];
  }, [
    albums,
    getAlbumWithFilteredPhotosByTitle,
    isValidAlbum,
    loadPhotosFromAlbum,
    numberOfLoadedAlbums,
  ]);

  useEffect(() => {
    (async () => {
      const newLoadedAlbums = await loadPhotosFromAlbums();
      setLoadedAlbums(() => newLoadedAlbums);
    })();
  }, [loadPhotosFromAlbums]);

  const handleChangeSearchValue = (newValue: string) => {
    setSearchValue(() => newValue);
  };

  const handleSelectUser = (selectedUserId: string) => {
    const selectedOption = findUserById(users, Number(selectedUserId));
    if (selectedUserId) {
      setSelectedAlbum(() => undefined);
    }
    setSelectedUser(() => selectedOption);
  };

  const handleSelectAlbum = (selectedAlbumId: string) => {
    const selectedOption = albums.find(
      (album) => album.id === Number(selectedAlbumId)
    );
    setSelectedAlbum(() => selectedOption);
  };

  const handleLoadMore = () => {
    setNumberOfLoadedAlbums((prevState) => {
      return Math.min(albums.length, prevState + baseNumberOfLoadedAlbums);
    });
  };

  const handleSearch = () => {
    const nonSubmitedSearchValues = {
      searchValue,
      selectedAlbum,
      selectedUser,
    };
    if (
      JSON.stringify(nonSubmitedSearchValues) ===
      JSON.stringify(currentSearchValues)
    ) {
      return;
    }

    setCurrentSearchValues(() => ({
      searchValue,
      selectedUser,
      selectedAlbum,
    }));
    setNumberOfLoadedAlbums(() => baseNumberOfLoadedAlbums);
    setLoadedAlbums(() => []);
  };

  const handleKeyPressSearchValue = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const renderAlbums = () =>
    loadedAlbums
      .filter(hasPhotos)
      .slice(0, numberOfLoadedAlbums)
      .map((album) => {
        const renderImageCard = () =>
          album.photos?.map(({ id, title, url, thumbnailUrl }) => (
            <ImageCard
              key={id}
              id={String(id)}
              imageUrl={url}
              italicizedWord={currentSearchValues.searchValue}
              thumbnailUrl={thumbnailUrl}
              title={title}
            />
          ));

        return (
          <div key={album.id}>
            <Typography variant="h4">
              {album.title} - {album.user?.name}
            </Typography>
            <PhotoDiscoveryContainer>
              {renderImageCard()}
            </PhotoDiscoveryContainer>
          </div>
        );
      });

  const renderLoadMore = () => {
    if (loading) {
      return undefined;
    }

    if (showLoadMore) {
      return (
        <Button onClick={handleLoadMore} style={{ marginTop: '3rem' }}>
          Load more...
        </Button>
      );
    }
    if (loadedAlbums.length === 0) {
      return (
        <FeedbackMessage>
          There is no photo title that matches the given keyword, user and
          album.
        </FeedbackMessage>
      );
    }
    return (
      <FeedbackMessage>
        There isn&apos;t any more albums to be loaded.
      </FeedbackMessage>
    );
  };

  const usersOptions = useMemo(
    () =>
      users.map(({ id, name }) => ({
        id,
        value: id,
        text: name,
      })),
    [users]
  );

  const albumsOptions = albums
    .filter((album) =>
      selectedUser ? album.userId === selectedUser.id : album
    )
    .map(({ id, title }) => ({
      id,
      value: id,
      text: title,
    }));

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
          ref={textInputRef}
          filterInputRegex={/[^A-Za-z]/gi}
          onChange={handleChangeSearchValue}
          onKeyPress={handleKeyPressSearchValue}
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

        <Button onClick={handleSearch}>Search </Button>
      </SearchContainer>

      {renderAlbums()}
      {loading && <FeedbackMessage>Loading...</FeedbackMessage>}
      {renderLoadMore()}
    </PageContainer>
  );
};
