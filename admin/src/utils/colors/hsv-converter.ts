export const hsvToHex = (h: number, s: number, v: number): string => {
   let r = 0,
      g = 0,
      b = 0;

   const i = Math.floor(h * 6);
   const f = h * 6 - i;
   const p = v * (1 - s);
   const q = v * (1 - f * s);
   const t = v * (1 - (1 - f) * s);

   switch (i % 6) {
      case 0:
         (r = v), (g = t), (b = p);
         break;
      case 1:
         (r = q), (g = v), (b = p);
         break;
      case 2:
         (r = p), (g = v), (b = t);
         break;
      case 3:
         (r = p), (g = q), (b = v);
         break;
      case 4:
         (r = t), (g = p), (b = v);
         break;
      case 5:
         (r = v), (g = p), (b = q);
         break;
   }

   const toHex = (x: number) => {
      const hex = Math.round(x * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
   };

   return '#' + toHex(r) + toHex(g) + toHex(b);
};
