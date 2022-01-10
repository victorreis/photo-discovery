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

export const availableScreenBreakpoints = [
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
] as const;
export type ScreenBreakpoint = typeof availableScreenBreakpoints[number];

export const screenBreakpoints: Record<ScreenBreakpoint, number> = {
  xs: 320,
  sm: 481,
  md: 769,
  lg: 1025,
  xl: 1201,
};
