import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { API_URL, APPLICATION_ERROR } from '../../Config/constants';
import { albumService } from './Album.service';
import { Album } from './Album.types';

describe(`Album service tests`, () => {
  global.console.error = jest.fn();

  const albumsUrl = `${API_URL}/albums`;
  const getAlbumsByUserIdUrl = (id: number | string) =>
    `${API_URL}/users/${id}/albums`;
  const unexistentUserId = 9999;

  const albumsData: Album[] = [
    {
      userId: 1,
      id: 1,
      title: 'quidem molestiae enim',
    },
    {
      userId: 2,
      id: 11,
      title: 'quam nostrum impedit mollitia quod et dolor',
    },
    {
      userId: 3,
      id: 21,
      title:
        'repudiandae voluptatem optio est consequatur rem in temporibus et',
    },
  ];

  const filterDataByUserId = (id: number) =>
    albumsData.filter((album) => album.userId === id);

  const server = setupServer(
    rest.get(albumsUrl, (_req, res, ctx) => res(ctx.json(albumsData))),
    rest.get(getAlbumsByUserIdUrl(1), (_req, res, ctx) =>
      res(ctx.json(filterDataByUserId(1)))
    ),
    rest.get(getAlbumsByUserIdUrl(2), (_req, res, ctx) =>
      res(ctx.json(filterDataByUserId(2)))
    ),
    rest.get(getAlbumsByUserIdUrl(3), (_req, res, ctx) =>
      res(ctx.json(filterDataByUserId(3)))
    ),
    rest.get(getAlbumsByUserIdUrl(unexistentUserId), (_req, res, ctx) =>
      res(ctx.json([]))
    )
  );
  const serverError = setupServer(
    rest.get(albumsUrl, (_req, res, ctx) => res(ctx.status(500))),
    rest.get(getAlbumsByUserIdUrl(1), (_req, res, ctx) => res(ctx.status(500))),
    rest.get(getAlbumsByUserIdUrl(2), (_req, res, ctx) => res(ctx.status(500))),
    rest.get(getAlbumsByUserIdUrl(3), (_req, res, ctx) => res(ctx.status(500))),
    rest.get(getAlbumsByUserIdUrl(unexistentUserId), (_req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  describe(`Successful tests`, () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it(`should fetch data successfully from '${albumsUrl}'`, async () => {
      const albums = await albumService.getAll();

      expect(albums).toEqual(albumsData);
    });

    it(`should fetch filtered data successfully from '${getAlbumsByUserIdUrl(
      '{userId}'
    )}`, async () => {
      const albums1 = await albumService.getByUserId(1);
      expect(albums1).toEqual(filterDataByUserId(1));

      const albums2 = await albumService.getByUserId(2);
      expect(albums2).toEqual(filterDataByUserId(2));

      const albums3 = await albumService.getByUserId(3);
      expect(albums3).toEqual(filterDataByUserId(3));
    });

    it(`should fetch no data successfully from '${getAlbumsByUserIdUrl(
      '{userId}'
    )} when '{userId}' doesn't exists`, async () => {
      const albums1 = await albumService.getByUserId(unexistentUserId);
      expect(albums1).toEqual(filterDataByUserId(unexistentUserId));
    });
  });

  describe(`Unsuccessful tests`, () => {
    beforeAll(() => serverError.listen());
    afterEach(() => serverError.resetHandlers());
    afterAll(() => serverError.close());

    it(`should throw error when server returns status 500 when trying to fetch '${albumsUrl}'`, async () => {
      try {
        await albumService.getAll();
      } catch (e) {
        expect(() => {
          throw new Error(APPLICATION_ERROR);
        }).toThrow(Error);
      }
    });

    it(`should throw error when server returns status 500 when trying to fetch '${getAlbumsByUserIdUrl(
      '{userId}'
    )}`, async () => {
      try {
        await albumService.getByUserId(1);
      } catch (e) {
        expect(() => {
          throw new Error(APPLICATION_ERROR);
        }).toThrow(Error);
      }
      try {
        await albumService.getByUserId(2);
      } catch (e) {
        expect(() => {
          throw new Error(APPLICATION_ERROR);
        }).toThrow(Error);
      }
      try {
        await albumService.getByUserId(3);
      } catch (e) {
        expect(() => {
          throw new Error(APPLICATION_ERROR);
        }).toThrow(Error);
      }
    });
  });
});
