const availableColorTypes = [
  'main',
  'feedback',
  'grayscale',
  'common',
  'background',
  'font',
] as const;
export type ColorType = typeof availableColorTypes[number];

const availableColorIntensities = [
  'lightest',
  'lighter',
  'light',
  'normal',
  'dark',
  'darker',
  'darkest',
] as const;
export type ColorIntensity = typeof availableColorIntensities[number];
export type ColorIntensities = Record<ColorIntensity, string>;

export const availableMainColors = [
  'primary',
  'secondary',
  'detail',
  'effect',
] as const;
export type MainColor = typeof availableMainColors[number];
export type MainColors = Record<MainColor, ColorIntensities>;

const availableFeedbackColors = [
  'error',
  'warning',
  'info',
  'success',
] as const;
export type FeedbackColor = typeof availableFeedbackColors[number];
export type FeedbackColors = Record<FeedbackColor, ColorIntensities>;

const availableCommonColors = ['black', 'white'] as const;
export type CommonColor = typeof availableCommonColors[number];
export type CommonColors = Record<CommonColor, string>;

const availableBackgroundColors = ['default', 'highContrast'] as const;
export type BackgroundColor = typeof availableBackgroundColors[number];
export type BackgroundColors = {
  default: ColorIntensities;
  highContrast: ColorIntensities;
};

const availableFontColors = [
  ...availableMainColors,
  ...availableFeedbackColors,
  ...availableCommonColors,
  'default',
  'disabled',
  'caption',
  'hint',
] as const;
export type FontColor = typeof availableFontColors[number];
export type FontColors = Record<FontColor, string>;

export type Colors = {
  main: MainColors;
  feedback: FeedbackColors;
  grayscale: ColorIntensities;
  common: CommonColors;
  background: BackgroundColors;
  font: FontColors;
};
