import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { API_URL, APPLICATION_ERROR } from '../../Config/constants';
import { photoService } from './Photo.service';
import { Photo } from './Photo.types';

describe('photo service tests', () => {
  jest.spyOn(global.console, 'error').mockImplementation();

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

  describe('successful tests', () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it(`should fetch data successfully from '${photosUrl}'`, async () => {
      expect.assertions(1);
      const photos = await photoService.getAll();

      expect(photos).toStrictEqual(photosData);
    });

    it(`should fetch filtered data successfully from '${getPhotosByAlbumIdUrl(
      '{albumId}'
    )}`, async () => {
      expect.assertions(3);
      const photos1 = await photoService.getByAlbumId(1);
      const photos2 = await photoService.getByAlbumId(2);
      const photos3 = await photoService.getByAlbumId(3);

      expect(photos1).toStrictEqual(filterDataByAlbumId(1));
      expect(photos2).toStrictEqual(filterDataByAlbumId(2));
      expect(photos3).toStrictEqual(filterDataByAlbumId(3));
    });

    it(`should fetch no data successfully from '${getPhotosByAlbumIdUrl(
      '{albumId}'
    )} when '{albumId}' doesn't exists`, async () => {
      expect.assertions(1);
      const photos = await photoService.getByAlbumId(unexistentAlbumId);

      expect(photos).toStrictEqual(filterDataByAlbumId(unexistentAlbumId));
    });
  });

  describe('unsuccessful tests', () => {
    beforeAll(() => serverError.listen());
    afterEach(() => serverError.resetHandlers());
    afterAll(() => serverError.close());

    it(`should throw error when server returns status 500 when trying to fetch '${photosUrl}'`, async () => {
      expect.assertions(1);
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
      expect.assertions(3);
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
