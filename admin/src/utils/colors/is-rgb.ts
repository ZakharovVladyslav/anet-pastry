export const isColorRgb = (color: string): boolean => {
   return /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/.test(color);
};
