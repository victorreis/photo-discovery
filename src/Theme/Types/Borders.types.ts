import { Size } from './Sizes.types';

export const availableBorderWidths: ReadonlyArray<
  Extract<Size, 'MD' | 'LG' | 'XL' | 'XL2'>
> = ['MD', 'LG', 'XL', 'XL2'] as const;
export type BorderWidth = typeof availableBorderWidths[number];
export type BorderWidths = Record<BorderWidth, number>;

export const availableBorderRadiuses: ReadonlyArray<
  Extract<Size, 'SM' | 'MD' | 'LG' | 'XL'> | 'pill' | 'rounded'
> = ['SM', 'MD', 'LG', 'pill', 'rounded'] as const;
export type BorderRadius = typeof availableBorderRadiuses[number];
export type BorderRadiuses = Record<
  Exclude<BorderRadius, 'rounded'>,
  number
> & { rounded: string };

export const availableBorderStyles = ['width', 'radius'] as const;
export type BorderStyle = typeof availableBorderStyles[number];

export type Borders = {
  width: BorderWidths;
  radius: BorderRadiuses;
};
