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
export const screenBreakpointRanges: Record<ScreenBreakpoint, string> = {
  xs: `only screen and (max-width: ${screenBreakpoints.xs}px)`,
  sm: `only screen and (min-width: ${screenBreakpoints.xs}px) and (max-width: ${screenBreakpoints.sm}px)`,
  md: `only screen and (min-width: ${screenBreakpoints.sm}px) and (max-width: ${screenBreakpoints.md}px)`,
  lg: `only screen and (min-width: ${screenBreakpoints.md}px) and (max-width: ${screenBreakpoints.lg}px)`,
  xl: `only screen and (min-width: ${screenBreakpoints.lg}px)`,
};

export const availableIconSizes = ['sm', 'md', 'lg'] as const;
export type IconSize = typeof availableIconSizes[number];
export const iconSizes: Record<IconSize, string> = {
  sm: '1rem',
  md: '1.67rem',
  lg: '2.33rem',
};
