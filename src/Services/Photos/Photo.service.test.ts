import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { API_URL, APPLICATION_ERROR } from '../../Config/constants';
import { photoService } from './Photo.service';
import { Photo } from './Photo.types';

describe(`Photo service tests`, () => {
  global.console.error = jest.fn();

  const photosUrl = `${API_URL}/photos`;
  const getPhotosByAlbumIdUrl = (id: number | string) =>
    `${API_URL}/albums/${id}/photos`;
  const unexistentAlbumId = 9999;

  const photosData: Photo[] = [
    {
      albumId: 1,
      id: 1,
      title: 'accusamus beatae ad facilis cum similique qui sunt',
      url: 'https://via.placeholder.com/600/92c952',
      thumbnailUrl: 'https://via.placeholder.com/150/92c952',
    },
    {
      albumId: 2,
      id: 51,
      title: 'non sunt voluptatem placeat consequuntur rem incidunt',
      url: 'https://via.placeholder.com/600/8e973b',
      thumbnailUrl: 'https://via.placeholder.com/150/8e973b',
    },
    {
      albumId: 3,
      id: 101,
      title: 'incidunt alias vel enim',
      url: 'https://via.placeholder.com/600/e743b',
      thumbnailUrl: 'https://via.placeholder.com/150/e743b',
    },
  ];

  const filterDataByAlbumId = (id: number) =>
    photosData.filter((photo) => photo.albumId === id);

  const server = setupServer(
    rest.get(photosUrl, (_req, res, ctx) => res(ctx.json(photosData))),
    rest.get(getPhotosByAlbumIdUrl(1), (_req, res, ctx) =>
      res(ctx.json(filterDataByAlbumId(1)))
    ),
    rest.get(getPhotosByAlbumIdUrl(2), (_req, res, ctx) =>
      res(ctx.json(filterDataByAlbumId(2)))
    ),
    rest.get(getPhotosByAlbumIdUrl(3), (_req, res, ctx) =>
      res(ctx.json(filterDataByAlbumId(3)))
    ),
    rest.get(getPhotosByAlbumIdUrl(unexistentAlbumId), (_req, res, ctx) =>
      res(ctx.json([]))
    )
  );
  const serverError = setupServer(
    rest.get(photosUrl, (_req, res, ctx) => res(ctx.status(500))),
    rest.get(getPhotosByAlbumIdUrl(1), (_req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get(getPhotosByAlbumIdUrl(2), (_req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get(getPhotosByAlbumIdUrl(3), (_req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get(getPhotosByAlbumIdUrl(unexistentAlbumId), (_req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  describe(`Successful tests`, () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it(`should fetch data successfully from '${photosUrl}'`, async () => {
      const photos = await photoService.getAll();

      expect(photos).toEqual(photosData);
    });

    it(`should fetch filtered data successfully from '${getPhotosByAlbumIdUrl(
      '{albumId}'
    )}`, async () => {
      const photos1 = await photoService.getByAlbumId(1);
      expect(photos1).toEqual(filterDataByAlbumId(1));

      const photos2 = await photoService.getByAlbumId(2);
      expect(photos2).toEqual(filterDataByAlbumId(2));

      const photos3 = await photoService.getByAlbumId(3);
      expect(photos3).toEqual(filterDataByAlbumId(3));
    });

    it(`should fetch no data successfully from '${getPhotosByAlbumIdUrl(
      '{albumId}'
    )} when '{albumId}' doesn't exists`, async () => {
      const photos = await photoService.getByAlbumId(unexistentAlbumId);
      expect(photos).toEqual(filterDataByAlbumId(unexistentAlbumId));
    });
  });

  describe(`Unsuccessful tests`, () => {
    beforeAll(() => serverError.listen());
    afterEach(() => serverError.resetHandlers());
    afterAll(() => serverError.close());

    it(`should throw error when server returns status 500 when trying to fetch '${photosUrl}'`, async () => {
      try {
        await photoService.getAll();
      } catch (e) {
        expect(() => {
          throw new Error(APPLICATION_ERROR);
        }).toThrow(Error);
      }
    });

    it(`should throw error when server returns status 500 when trying to fetch '${getPhotosByAlbumIdUrl(
      '{albumId}'
    )}`, async () => {
      try {
        await photoService.getByAlbumId(1);
      } catch (e) {
        expect(() => {
          throw new Error(APPLICATION_ERROR);
        }).toThrow(Error);
      }
      try {
        await photoService.getByAlbumId(2);
      } catch (e) {
        expect(() => {
          throw new Error(APPLICATION_ERROR);
        }).toThrow(Error);
      }
      try {
        await photoService.getByAlbumId(3);
      } catch (e) {
        expect(() => {
          throw new Error(APPLICATION_ERROR);
        }).toThrow(Error);
      }
    });
  });
});
