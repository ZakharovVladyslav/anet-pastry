import { hexToRgb, hexToRgba } from './hex-to-rgb';

export const formatRgbString = ({ r, g, b }: TRgb) => {
   return `rgb(${r}, ${g}, ${b})`;
};

export const formatRgbStringFromHex = (hex: string) => {
   const { r, g, b } = hexToRgb(hex) as TRgb;

   return `rgb(${r}, ${g}, ${b})`;
};

export const formatRgbaString = ({ r, g, b, a }: TRgba) => {
   return `rgba(${r}, ${g}, ${b}, ${a})`;
};

export const formatRgbaStringFromHex = (hex: string) => {
   const { r, g, b, a } = hexToRgba(hex) as TRgba;

   return `rgb(${r}, ${g}, ${b}, ${a})`;
};
