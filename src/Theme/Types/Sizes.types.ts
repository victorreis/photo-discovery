const availableSizes = [
  'XS2',
  'XS',
  'SM',
  'MD',
  'LG',
  'XL',
  'XL2',
  'XL3',
  'XL4',
  'XL5',
] as const;
export type Size = typeof availableSizes[number];
export type Sizes = Record<Size, number>;
