import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { API_URL, APPLICATION_ERROR } from '../../Config/constants';
import { userService } from './User.service';
import { User } from './User.types';

describe('user service tests', () => {
  jest.spyOn(global.console, 'error').mockImplementation();

  const usersUrl = `${API_URL}/users`;
  const getUsersByIdUrl = (id: number | string) => `${API_URL}/users/${id}`;
  const unexistentUserId = 9999;

  const usersData: User[] = [
    {
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
    },
    {
      id: 3,
      name: 'Clementine Bauch',
      username: 'Samantha',
    },
  ];

  const filterDataByUserId = (id: number) =>
    usersData.filter((user) => user.id === id);

  const server = setupServer(
    rest.get(usersUrl, (_req, res, ctx) => res(ctx.json(usersData))),
    rest.get(getUsersByIdUrl(1), (_req, res, ctx) =>
      res(ctx.json(filterDataByUserId(1)))
    ),
    rest.get(getUsersByIdUrl(2), (_req, res, ctx) =>
      res(ctx.json(filterDataByUserId(2)))
    ),
    rest.get(getUsersByIdUrl(3), (_req, res, ctx) =>
      res(ctx.json(filterDataByUserId(3)))
    ),
    rest.get(getUsersByIdUrl(unexistentUserId), (_req, res, ctx) =>
      res(ctx.json([]))
    )
  );
  const serverError = setupServer(
    rest.get(usersUrl, (_req, res, ctx) => res(ctx.status(500))),
    rest.get(getUsersByIdUrl(1), (_req, res, ctx) => res(ctx.status(500))),
    rest.get(getUsersByIdUrl(2), (_req, res, ctx) => res(ctx.status(500))),
    rest.get(getUsersByIdUrl(3), (_req, res, ctx) => res(ctx.status(500))),
    rest.get(getUsersByIdUrl(unexistentUserId), (_req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  describe('successful tests', () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it(`should fetch data successfully from '${usersUrl}'`, async () => {
      expect.assertions(1);
      const users = await userService.getAll();

      expect(users).toStrictEqual(usersData);
    });

    it(`should fetch filtered data successfully from '${getUsersByIdUrl(
      '{userId}'
    )}`, async () => {
      expect.assertions(3);
      const users1 = await userService.getById(1);
      const users2 = await userService.getById(2);
      const users3 = await userService.getById(3);

      expect(users1).toStrictEqual(filterDataByUserId(1));
      expect(users2).toStrictEqual(filterDataByUserId(2));
      expect(users3).toStrictEqual(filterDataByUserId(3));
    });

    it(`should fetch no data successfully from '${getUsersByIdUrl(
      '{userId}'
    )} when '{userId}' doesn't exists`, async () => {
      expect.assertions(1);
      const users = await userService.getById(unexistentUserId);

      expect(users).toStrictEqual(filterDataByUserId(unexistentUserId));
    });
  });

  describe('unsuccessful tests', () => {
    beforeAll(() => serverError.listen());
    afterEach(() => serverError.resetHandlers());
    afterAll(() => serverError.close());

    it(`should throw error when server returns status 500 when trying to fetch '${usersUrl}'`, async () => {
      expect.assertions(1);
      try {
        await userService.getAll();
      } catch (e) {
        expect(() => {
          throw new Error(APPLICATION_ERROR);
        }).toThrow(Error);
      }
    });

    it(`should throw error when server returns status 500 when trying to fetch '${getUsersByIdUrl(
      '{userId}'
    )}`, async () => {
      expect.assertions(3);
      try {
        await userService.getById(1);
      } catch (e) {
        expect(() => {
          throw new Error(APPLICATION_ERROR);
        }).toThrow(Error);
      }
      try {
        await userService.getById(2);
      } catch (e) {
        expect(() => {
          throw new Error(APPLICATION_ERROR);
        }).toThrow(Error);
      }
      try {
        await userService.getById(3);
      } catch (e) {
        expect(() => {
          throw new Error(APPLICATION_ERROR);
        }).toThrow(Error);
      }
    });
  });
});
