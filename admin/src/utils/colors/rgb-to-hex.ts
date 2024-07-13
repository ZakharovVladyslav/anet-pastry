import { extractRgbCode } from './extract-rgb';
import { isColorRgb } from './is-rgb';

export const rgbToHex = (r: number, g: number, b: number) => {
   const red = r.toString(16).padStart(2, '0');
   const green = g.toString(16).padStart(2, '0');
   const blue = b.toString(16).padStart(2, '0');
   return `#${red}${green}${blue}`;
};

export const rgbStringToHex = (rgb: string) => {
   const isRgb = isColorRgb(rgb);

   if (!isRgb) return rgb;

   const [r, g, b] = extractRgbCode(rgb);

   const red = r.toString(16).padStart(2, '0');
   const green = g.toString(16).padStart(2, '0');
   const blue = b.toString(16).padStart(2, '0');

   const hex = `#${red}${green}${blue}`;

   return hex;
};
