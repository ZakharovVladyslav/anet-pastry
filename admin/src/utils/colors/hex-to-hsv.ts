import { hexToRgba } from './hex-to-rgb';

export const rgbToHsv = ({
   r,
   g,
   b,
}: {
   r: number;
   g: number;
   b: number;
}): THsv => {
   (r /= 255), (g /= 255), (b /= 255);

   const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
   let h: number = 0,
      s: number,
      v = max;

   const d = max - min;
   s = max === 0 ? 0 : d / max;

   if (max === min) {
      h = 0;
   } else {
      switch (max) {
         case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
         case g:
            h = (b - r) / d + 2;
            break;
         case b:
            h = (r - g) / d + 4;
            break;
      }
      h /= 6;
   }

   return { h, s, v };
};

export const hexToHsv = (hex: string) => {
   const rgb = hexToRgba(hex);
   return rgb ? rgbToHsv(rgb) : null;
};
