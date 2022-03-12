export const hexToRgb = (hex: string) => {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])([a-f\d])?$/i;
  const formatedHex = hex.replace(
    shorthandRegex,
    (_m, r: string, g: string, b: string, c: string) =>
      r + r + g + g + b + b + (c ? c + c : '')
  );

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(
    formatedHex
  );

  return result && result.length >= 3
    ? `rgb(${parseInt(result[1] || '0', 16)}, ${parseInt(
        result[2] || '0',
        16
      )}, ${parseInt(result[3] || '0', 16)}${
        result[4] ? `, ${parseInt(result[4] || '0', 16) / 255}}` : ''
      })`
    : 'rgb(0,0,0)';
};
