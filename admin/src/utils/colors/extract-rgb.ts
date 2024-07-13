import { formatRgbaStringFromHex, formatRgbStringFromHex } from './format-rgb-string';
import { isColorRgb } from './is-rgb';

export const extractRgbCode = (color: string) => {
   const rgb = isColorRgb(color) ? color : formatRgbStringFromHex(color);

   return rgb
      .substring(4, rgb.length - 1)
      .split(',')
      .map(value => parseInt(value));
};

export const extractRgbaCode = (color: string) => {
   const rgb = isColorRgb(color) ? color : formatRgbaStringFromHex(color);

   return rgb
      .substring(4, rgb.length - 1)
      .split(',')
      .map(value => parseInt(value));
};
