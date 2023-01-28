const calcRem = (size: number) => `${size / 16}rem`;

const fontSizes = {
  xs: calcRem(12),
  small: calcRem(14),
  base: calcRem(16),
  lg: calcRem(18),
  xl: calcRem(20),
  xxl: calcRem(24),
  titleSize: calcRem(32),
};

const theme = {
  fontSizes,
};

export default theme;
