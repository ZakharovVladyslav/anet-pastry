export const formatHexColor = (hex: string): string => {
   // Remove any leading #
   hex = hex.replace(/^#/, '');

   // Check if the hex color is valid
   if (!/^([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(hex)) {
      throw new Error('Invalid hex color');
   }

   // If the hex color is in the three-digit format, convert it to six digits
   if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
   }

   return '#' + hex;
}
