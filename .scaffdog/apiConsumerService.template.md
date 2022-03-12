---
name: 'API consumer service'
root: '.'
output: 'src/Services/'
ignore: ['.', 'src/Services/**/*']
questions:
  value: 'Please, enter the service name:'
---

# `{{ inputs.value | pascal }}/{{ inputs.value | pascal }}.types.ts`

```ts:
export interface {{ inputs.value | pascal }} {
  id: number;
  albumId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

```

# `{{ inputs.value | pascal }}/{{ inputs.value | pascal }}.service.ts`

```ts:
import axios from 'axios';

import { API_URL } from '../../Config/constants';
import { requestErrorHandler } from '../ErrorHandler.service';
import { {{ inputs.value | pascal }} } from './{{ inputs.value | pascal }}.types';

const getAll = async () => {
  const {{ inputs.value | camel }}s = await axios
    .get<{{ inputs.value | pascal }}[]>(`${API_URL}/{{ inputs.value | camel }}s`)
    .then((res) => res.data)
    .catch(requestErrorHandler);

  return {{ inputs.value | camel }}s;
};

const getByAlbumId = async (albumId: number) => {
  const {{ inputs.value | camel }}s = await axios
    .get<{{ inputs.value | pascal }}[]>(`${API_URL}/albums/${albumId}/{{ inputs.value | camel }}s`)
    .then((res) => res.data)
    .catch(requestErrorHandler);

  return {{ inputs.value | camel }}s;
};

export const {{ inputs.value | camel }}Service = {
  getAll,
  getByAlbumId,
};

```

# `{{ inputs.value | pascal }}/{{ inputs.value | pascal }}.service.test.ts`

```ts:
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { API_URL, APPLICATION_ERROR } from '../../Config/constants';
import { {{ inputs.value | camel }}Service } from './{{ inputs.value | pascal }}.service';
import { {{ inputs.value | pascal }} } from './{{ inputs.value | pascal }}.types';

describe('{{ inputs.value | pascal }} service tests', () => {
  jest.spyOn(global.console, 'error').mockImplementation();

  const {{ inputs.value | camel }}sUrl = `${API_URL}/{{ inputs.value | camel }}s`;
  const get{{ inputs.value | pascal }}sByAlbumIdUrl = (id: number | string) =>
    `${API_URL}/albums/${id}/{{ inputs.value | camel }}s`;
  const unexistentAlbumId = 9999;

  const {{ inputs.value | camel }}sData: {{ inputs.value | pascal }}[] = [
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
    {{ inputs.value | camel }}sData.filter(({{ inputs.value | camel }}) => {{ inputs.value | camel }}.albumId === id);

  const server = setupServer(
    rest.get({{ inputs.value | camel }}sUrl, (_req, res, ctx) => res(ctx.json({{ inputs.value | camel }}sData))),
    rest.get(get{{ inputs.value | pascal }}sByAlbumIdUrl(1), (_req, res, ctx) =>
      res(ctx.json(filterDataByAlbumId(1)))
    ),
    rest.get(get{{ inputs.value | pascal }}sByAlbumIdUrl(2), (_req, res, ctx) =>
      res(ctx.json(filterDataByAlbumId(2)))
    ),
    rest.get(get{{ inputs.value | pascal }}sByAlbumIdUrl(3), (_req, res, ctx) =>
      res(ctx.json(filterDataByAlbumId(3)))
    ),
    rest.get(get{{ inputs.value | pascal }}sByAlbumIdUrl(unexistentAlbumId), (_req, res, ctx) =>
      res(ctx.json([]))
    )
  );
  const serverError = setupServer(
    rest.get({{ inputs.value | camel }}sUrl, (_req, res, ctx) => res(ctx.status(500))),
    rest.get(get{{ inputs.value | pascal }}sByAlbumIdUrl(1), (_req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get(get{{ inputs.value | pascal }}sByAlbumIdUrl(2), (_req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get(get{{ inputs.value | pascal }}sByAlbumIdUrl(3), (_req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get(get{{ inputs.value | pascal }}sByAlbumIdUrl(unexistentAlbumId), (_req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  describe('Successful tests', () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it(`should fetch data successfully from '${ {{ inputs.value | camel }}sUrl}'`, async () => {
      expect.assertions(1);
      const {{ inputs.value | camel }}s = await {{ inputs.value | camel }}Service.getAll();

      expect({{ inputs.value | camel }}s).toEqual({{ inputs.value | camel }}sData);
    });

    it(`should fetch filtered data successfully from '${get{{ inputs.value | pascal }}sByAlbumIdUrl(
      '{albumId}'
    )}`, async () => {
      expect.assertions(3);
      const {{ inputs.value | camel }}s1 = await {{ inputs.value | camel }}Service.getByAlbumId(1);
      const {{ inputs.value | camel }}s2 = await {{ inputs.value | camel }}Service.getByAlbumId(2);
      const {{ inputs.value | camel }}s3 = await {{ inputs.value | camel }}Service.getByAlbumId(3);

      expect({{ inputs.value | camel }}s1).toEqual(filterDataByAlbumId(1));
      expect({{ inputs.value | camel }}s2).toEqual(filterDataByAlbumId(2));
      expect({{ inputs.value | camel }}s3).toEqual(filterDataByAlbumId(3));
    });

    it(`should fetch no data successfully from '${get{{ inputs.value | pascal }}sByAlbumIdUrl(
      '{albumId}'
    )} when '{albumId}' doesn't exists`, async () => {
      expect.assertions(1);
      const {{ inputs.value | camel }}s = await {{ inputs.value | camel }}Service.getByAlbumId(unexistentAlbumId);

      expect({{ inputs.value | camel }}s).toEqual(filterDataByAlbumId(unexistentAlbumId));
    });
  });

  describe('Unsuccessful tests', () => {
    beforeAll(() => serverError.listen());
    afterEach(() => serverError.resetHandlers());
    afterAll(() => serverError.close());

    it(`should throw error when server returns status 500 when trying to fetch '${ {{ inputs.value | camel }}sUrl}'`, async () => {
      expect.assertions(1);
      try {
        await {{ inputs.value | camel }}Service.getAll();
      } catch (e) {
        expect(() => {
          throw new Error(APPLICATION_ERROR);
        }).toThrow(Error);
      }
    });

    it(`should throw error when server returns status 500 when trying to fetch '${get{{ inputs.value | pascal }}sByAlbumIdUrl(
      '{albumId}'
    )}`, async () => {
      expect.assertions(3);
      try {
        await {{ inputs.value | camel }}Service.getByAlbumId(1);
      } catch (e) {
        expect(() => {
          throw new Error(APPLICATION_ERROR);
        }).toThrow(Error);
      }
      try {
        await {{ inputs.value | camel }}Service.getByAlbumId(2);
      } catch (e) {
        expect(() => {
          throw new Error(APPLICATION_ERROR);
        }).toThrow(Error);
      }
      try {
        await {{ inputs.value | camel }}Service.getByAlbumId(3);
      } catch (e) {
        expect(() => {
          throw new Error(APPLICATION_ERROR);
        }).toThrow(Error);
      }
    });
  });
});

```
