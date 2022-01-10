const availableTypographyTags = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'p',
  'span',
  'a',
] as const;
export type TypographyTag = typeof availableTypographyTags[number];

const availableTypographyVariants = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'subtitle1',
  'subtitle2',
  'subtitle3',
  'body1',
  'body2',
  'link',
  'button',
] as const;
export type TypographyVariant = typeof availableTypographyVariants[number];

export const typographyVariantToTag: Record<TypographyVariant, TypographyTag> =
  {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
    subtitle1: 'h3',
    subtitle2: 'h4',
    subtitle3: 'h5',
    body1: 'span',
    body2: 'span',
    link: 'a',
    button: 'span',
  };

const availableTypographyStyles = [
  'fontFamily',
  'fontSize',
  'fontWeight',
  'lineHeight',
] as const;
export type TypographyStyle = typeof availableTypographyStyles[number];

export type TypographyStyles = Record<TypographyStyle, string>;

export type Typographies = Record<TypographyVariant, TypographyStyles>;
