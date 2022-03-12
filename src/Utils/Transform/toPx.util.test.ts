import { toPx } from './toPx.util';

describe('test the hexadecimal to RGB transformation', () => {
  it("should transform the number 123 into the string '123px'", () => {
    expect.assertions(1);

    expect(toPx(123)).toBe('123px');
  });
});
