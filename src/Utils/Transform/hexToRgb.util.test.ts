import { hexToRgb } from './hexToRgb.util';

describe('test the hexadecimal to RGB transformation', () => {
  it("should transform '#09071a' to 'rgb(9, 7, 26)'", () => {
    expect.assertions(1);

    expect(hexToRgb('#09071a')).toBe('rgb(9, 7, 26)');
  });

  it("should transform '#123' to 'rgb(17, 34, 51)'", () => {
    expect.assertions(1);

    expect(hexToRgb('#123')).toBe('rgb(17, 34, 51)');
  });

  it("should transform '#1234' to 'rgb(17, 34, 51, 0.26666666666666666})'", () => {
    expect.assertions(1);

    expect(hexToRgb('#1234')).toBe('rgb(17, 34, 51, 0.26666666666666666})');
  });

  it("should transform '#01020304' to 'rgb(1, 2, 3, 0.01568627450980392})'", () => {
    expect.assertions(1);

    expect(hexToRgb('#01020304')).toBe('rgb(1, 2, 3, 0.01568627450980392})');
  });

  it("should return 'rgb(0,0,0)' when the string is not a valid hexadecimal", () => {
    expect.assertions(1);

    expect(hexToRgb('#invalid 123')).toBe('rgb(0,0,0)');
  });

  it("should return '' when the string is not a valid hexadecimal", () => {
    expect.assertions(1);

    expect(hexToRgb('')).toBe('rgb(0,0,0)');
  });
});
